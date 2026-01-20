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
import IndexData from '../../../../apps/storybook/storybook-static/index.json'

type StoryIndex = {
  entries: Record<
    string,
    {
      id: string
      title: string
      name: string
      importPath: string
    }
  >
}

declare const __dirname: string

const {describe, beforeAll, afterAll} = test

const allViolations: Result[] = []

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
  'components-subdomainnavbar--skip-to-main-tag', // contains main tag which is in conflict with the default role="main" element
  'components-subdomainnavbar--skip-to-main-tag-with-id', // contains main tag which is in conflict with the default role="main" element
  'components-ide--playground', // presentational component and contains animation
  'components-ide-features--editor-only', // presentational component and contains animation
  'components-ide-features--editor-no-replay-button', // presentational component and contains animation
  'components-ide-features--chat-only', // presentational component and contains animation
  'components-ide-features--with-river', // presentational component and contains animation
  'components-ide-features--perspective-example', // presentational component and contains animation
  'components-ide-features--perspective-example-light', // presentational component and contains animation
  'components-ide-features--all-glass', // presentational component and contains animation
  'components-ide-features--editor-custom-icons', // presentational component and contains animation
]

const ignoreViolations = {
  'landmark-one-main': {except: []}, // on most of the stories we don't have a main landmark
  'page-has-heading-one': {except: ['components-hero', 'recipes-feature-previews']}, // on some stories we dont have a heading,
  region: {except: []}, // on most of the stories we don't have a region landmark
}

function matchesStoryId(storyId: string, fragment: string): boolean {
  return storyId.includes(fragment)
}

function shouldIgnoreViolation(violation: Result, story: {id: string}) {
  const ignoreViolation = ignoreViolations[violation.id]
  if (!ignoreViolation) return false
  return !ignoreViolation.except.some((except: string) => matchesStoryId(story.id, except))
}

function colorViolationImpact(impact: string | null | undefined) {
  let color = '\x1b[37m' // white
  switch (impact) {
    case 'minor':
      color = '\x1b[32m' // green
      break
    case 'moderate':
      color = '\x1b[33m' // yellow
      break
    case 'serious':
      color = '\x1b[35m' // magenta
      break
    case 'critical':
      color = '\x1b[31m' // red
      break
  }
  return `${color}${impact}\x1b[0m`
}

function formatViolation(violation: Result, index: number): string {
  return `${index + 1}.[${violation.impact?.toUpperCase()}] ${violation.id}: ${violation.help}
    Description: ${violation.description}
    Help URL: ${violation.helpUrl}
    Affected elements:
${violation.nodes
  .map(node => {
    const target = node.target.join(', ')
    const html = node.html ? `\n    HTML: ${node.html.substring(0, 500)}${node.html.length > 500 ? '...' : ''}` : ''
    return `  - Element: ${target}${html}`
  })
  .join('\n')}`
}

function formatViolationsForError(violations: Result[]): string {
  return violations.map((v, i) => formatViolation(v, i)).join('\n\n')
}

function printViolations(violations: Result[]) {
  for (let i = 0; i < violations.length; i++) {
    const violation = violations[i]
    // eslint-disable-next-line no-console
    console.log(
      `    🪓 \x1b[90m${i + 1}\x1b[0m \x1b[31mviolation:\x1b[0m ${violation.id} [${colorViolationImpact(
        violation.impact,
      )}] ${violation.help}`,
    )
  }
}

const testsWithCustomDelay = {
  'components-subdomainnavbar--mobile-menu-open': 5000, // takes a while for the menu to open
}
const defaultDelay = 1000

const storybookRoutes = Object.values((IndexData as StoryIndex).entries)
  .map(
    story =>
      ({
        id: story.id,
        path: `/story/${story.id}`,
        name: story.title,
        component: story.importPath,
        story: story.name,
      } as const),
  )
  .filter(({id}) => {
    return !testsToSkip.includes(id)
  })

describe.configure({mode: 'parallel'})

for (const story of storybookRoutes) {
  // eslint-disable-next-line i18n-text/no-en
  describe(`Web page accessibility test for ${story.name} - ${story.story}`, () => {
    let browser: Browser
    let page: Page

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
      await page.evaluate(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const axe = (window as any).axe
        if (axe) {
          axe._running = false
        }
      })

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let violations = await getViolations(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      })

      violations = violations.filter(violation => !shouldIgnoreViolation(violation, story))

      if (violations.length > 0) {
        allViolations.push(...violations)

        printViolations(violations)

        // eslint-disable-next-line i18n-text/no-en
        const errorMessage = `Found ${violations.length} accessibility violation(s):
${formatViolationsForError(violations)}`
        expect(violations.length, errorMessage).toBe(0)
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
