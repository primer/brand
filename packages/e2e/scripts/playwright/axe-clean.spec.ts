// eslint-disable-next-line import/no-nodejs-modules
import fs from 'fs'
// eslint-disable-next-line import/no-nodejs-modules
import path from 'path'
import {Result} from 'axe-core'

import {chromium, Browser, Page} from 'playwright'
import {test, expect} from '@playwright/test'
import {injectAxe, getViolations} from 'axe-playwright'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import StoriesData from '../../../../apps/storybook/storybook-static/stories.json'

declare const __dirname: string

type Story = {
  id: string
  title: string
  name: string
  importPath: string
  tags: string[]
  kind: string
  story: string
  parameters: {
    __id: string
    docsOnly: boolean
    fileName: string
  }
}

type StoriesKey = {
  [key: string]: Story
}

type Stories = {
  v: number
  stories: StoriesKey
}

const Stories: Stories = StoriesData

const {describe, beforeAll, afterAll} = test

let browser: Browser
let page: Page

let allViolations: Result[] = []

const hostname = 'http://localhost:6006/iframe.html?viewMode=story'
const testsToSkip = [
  'components-river--video', // video is an example and not an official primer pattern
  'components-subdomainnavbar--search-results-visible', // has been a11y remediated already,
  'components-subdomainnavbar--mobile-search-results-visible', // has been a11y remediated already,
  'components-videoplayer--default', // video makes this too flakey
  'components-videoplayer-features--with-poster', // video makes this too flakey
  'components-videoplayer-features--without-branding', // video makes this too flakey
  'components-videoplayer--playground', // video makes this too flakey
  'recipes-feature-previews-level-1--level-one-side-by-side-enterprise', // video makes this too flakey
  'recipes-feature-previews-level-1--level-one-side-by-side', // custom, unrelated background image
  'components-eyebrowbanner-features--on-custom-background-dark', // custom, unrelated background image
  'components-eyebrowbanner-features--on-custom-background-light', // custom, unrelated background image
]
const testsWithCustomDelay = {
  'components-subdomainnavbar--mobile-menu-open': 5000, // takes a while for the menu to open
}
const ignoreViolations = [
  'landmark-one-main', // on most of the sotries we don't have a main landmark
  'page-has-heading-one', // on some stories we dont have a heading,
  'region', // on some stories we don't have a region
]
const defaultDelay = 1000

const storybookRoutes = Object.values(Stories.stories)
  .map(
    story =>
      ({
        id: story.id,
        path: `/story/${story.id}`,
        name: story.title,
        component: story.parameters.fileName,
        story: story.story,
        parameters: story.parameters,
      } as const),
  )
  .filter(({id}) => {
    return !testsToSkip.includes(id)
  })

for (const story of storybookRoutes) {
  // eslint-disable-next-line i18n-text/no-en
  describe(`Web page accessibility test for ${story.name} - ${story.story}`, () => {
    beforeAll(async () => {
      browser = await chromium.launch()
      page = await browser.newPage()
      const route = `${hostname}&id=${story.id}`
      // eslint-disable-next-line no-console
      console.info(`Navigating to ${route}`)
      await page.goto(route)
      await page.waitForTimeout(testsWithCustomDelay[story.id] ? testsWithCustomDelay[story.id] : defaultDelay)
      await injectAxe(page)
      // inject github house rules
      const configSrc = fs.readFileSync(
        path.resolve(
          __dirname,
          '../../../../node_modules/@github/axe-github/dist/configure-browser/configure-browser.js',
        ),
        'utf8',
      )
      // eslint-disable-next-line @typescript-eslint/no-shadow
      page.evaluate(configSrc => {
        window.eval(configSrc)
      }, configSrc)
    })

    test('it completes AXE page validation', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let violations = await getViolations(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      })

      violations = violations.filter(violation => {
        return !ignoreViolations.includes(violation.id)
      })

      if (violations.length > 0) {
        allViolations = [...allViolations, ...violations]
      }

      expect(violations.length).toBe(0)
    })

    afterAll(async () => {
      await browser.close()
      if (allViolations.length > 0) {
        // eslint-disable-next-line no-console
        console.warn(`${allViolations.length} violations found}`)
        fs.writeFileSync('a11y-violations.json', JSON.stringify(allViolations, null, 2))
      }
    })
  })
}
