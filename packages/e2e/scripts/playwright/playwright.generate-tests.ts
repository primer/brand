/* eslint import/no-nodejs-modules: ["error", {"allow": ["path", "fs"]}] */
import fs from 'fs'
import path from 'path'
import prettier from 'prettier'
// import {SUPPORTED_LANGUAGES as languages} from '../../../../apps/storybook/src/constants'

type StoryIndex = {
  entries: Record<
    string,
    {
      id: string
      name: string
      importPath: string
    }
  >
}

// eslint-disable-next-line import/no-commonjs, import/extensions
const prettierOptions = require('../../../../.prettierrc.js')
// eslint-disable-next-line import/no-commonjs, import/extensions
const stories = require('../../../../apps/storybook/storybook-static/index.json') as StoryIndex

const port = 6006

const defaultTimeout = 500 // Storybook 7 introduced a small delay in loading stories. This is to migigate the spinner showing up in screenshots.

/**
 * Manual lookup for tests that need animation or side-effects to complete before tests start
 */
const waitForTimeoutLookup = {
  'components-faq-features--with-prose': 2000, // for the animation
  'components-faq-features--all-open': 1000, // for the animation
  'components-faq-features--reversed-toggles': 4000, // for the animation
  'components-subdomainnavbar-features--search-open': 5500, // for the animation
  'components-subdomainnavbar-features--search-results-visible': 5500, // for the animation
  'components-subdomainnavbar-features--longer-title': 1500, // for the animation
  'components-subdomainnavbar-features--mobile-view': 5500, // for the animation
  'components-subdomainnavbar-features--mobile-menu-open': 5500, // for all staggered animations
  'components-subdomainnavbar-features--mobile-menu-open-many-items': 5500, // for all staggered animations
  'components-subdomainnavbar-features--mobile-search-results-visible': 5500, // for the animation
  'components-subdomainnavbar-features--mobile-no-links': 5500, // for the animation
  'components-subdomainnavbar-features--mobile-leading-component-only-menu-open': 5500, // for the animation
  'components-subdomainnavbar-features--tablet-menu-open': 5500, // for all staggered animations
  'components-subdomainnavbar-features--overflow-menu-open': 1500, // wait for responsive overflow measurement
  'components-subdomainnavbar-features--reversed-button-order-narrow': 5500, // for the animation
  'components-button-features--primary-focus-non-standard-bg': 2000, // for the interaction test
  'components-button-features--primary-focus': 2000, // for the interaction test
  'components-button-features--with-hover-interaction': 2000, // for the interaction test
  'components-button-features--secondary-with-hover-interaction': 2000, // for the interaction test
  'components-button-features--subtle-with-hover-interaction': 2000, // for the interaction test
  'components-anchornav--playground': 2000, // for the animation
  'components-anchornav-features--fewer-anchor-links': 2000, // for the animation
  'components-anchornav-features--custom-background': 2000, // for the animation
  'components-anchornav-features--shorter-labels': 2000, // for the animation
  'components-anchornav-features--narrow-view': 2000, // for the interaction test
  'components-anchornav-features--narrow-view-menu-open': 2000, // for the interaction test
  'components-anchornav-features--regular-view': 2000, // for the interaction test
  'components-anchornav-features--regular-view-menu-open': 2000, // for the interaction test
  'components-anchornav-features--longer-labels': 2000, // for the animation
  'components-minimalfooter--default': 5000, // for external social imagery to load
  'components-minimalfooter--playground': 5000, // for external social imagery to load
  'components-minimalfooter-features--dark-theme': 5000, // for external social imagery to load
  'components-minimalfooter-features--filtered-social-links': 5000, // for external social imagery to load
  'components-minimalfooter-features--default-narrow': 5000, // for external social imagery to load
  'components-minimalfooter-features--maximum-links': 5000, // for external social imagery to load
  'components-actionmenu-features--disabled-item': 1000, // flakey test,
  'components-actionmenu-features--anchored-positioning': 1000, // for the menu to open
  'components-box-features--animation': 6000, // for the animation
  'components-ide--playground': 2000, // for the animation
  'components-ide--default': 2000, // for the animation
  'components-riverstoryscroll--default': 3500, // for the animation
  'components-riverstoryscroll-features--with-timeline': 3500, // for the animation
  'components-riverstoryscroll-features--with-timeline-narrow': 3500, // for the animation
  'components-riverstoryscroll-features--enterprise-example': 3500, // for the animation
  'components-riverstoryscroll-features--enterprise-example-narrow': 3500, // for the animation
  'components-textrevealanimation--playground': 3000, // for the animation
  'components-textrevealanimation-examples--with-large-testimonial': 3000, // for the animation
  'components-textrevealanimation-examples--with-hero': 3000, // for the animation
  'components-textrevealanimation-features--animation-on-scroll': 3000, // for the animation
  'components-footnotes-examples--rivers-with-citations': 3000, // for the images
  'components-pillar-features--frosted-glass-effect': 3000, // for image to load
  'components-testimonial-examples--with-frosted-glass': 4000, // for animation to complete
  'components-testimonial-examples--with-frosted-glass-dark': 4000, // for animation to complete
  'components-prose--playground': 4000, // for videos to load
  'components-prose--default': 4000, // for videos to load,
  'components-hero-examples--custom-background-inline-end-padded-video': 3500, // for animations to complete
  'components-hero-examples--custom-background-block-end-video': 3500, // for animations to complete
  'components-hero-examples--custom-background-inline-end-padded-image': 3500, // for animations to complete
  'components-hero-examples--gridline-expressive-block-end-padded-trailing-component': 4000, // for animations to complete
  'components-hero-examples--custom-background-block-end-image': 4000, // for animations to complete
  'components-hero-examples--with-cards': 4000, // for animations to complete
  'components-hero-features--with-animated-label': 1500, // for the label animation to complete
  'components-hero-features-images-and-videos--with-youtube-video-block-end-default': 2000, // for loading a remote video
  'components-hero-features--with-increased-contrast-label': 3000, // for the label animation to complete
  'components-videoplayer--default': 5000, // for video metadata to load
  'components-videoplayer--playground': 5000, // for video metadata to load
  'components-videoplayer-features--with-poster': 5000, // for video metadata to load
  'components-videoplayer-features--without-branding': 5000, // for video metadata to load
  'components-videoplayer-features--minimal': 5000, // for video metadata to load
  'components-videoplayer-features--with-visually-hidden-title': 5000, // for video metadata to load
  'components-videoplayer-features--controlled-programmatically': 5000, // for video metadata to load
  'components-videoplayer-features--custom-play-icon': 5000, // for video metadata to load
  'components-videoplayer-features--with-some-hidden-controls': 5000, // for video metadata to load
  'components-videoplayer-features--tooltip-visible-on-focus': 5000, // for video metadata to load
  'components-hero-features-images-and-videos--with-video-block-end-default': 5000, // for video metadata to load
  'components-hero-features-images-and-videos--with-video-inline-end': 5000, // for video metadata to load
  'components-textcursoranimation--playground': 4000, // for the animation to complete
  'components-subnav-features--delayed-active-link': 2000, // because the story sets an initial delay,
  'components-logosuite-features--grid-line-expressive-kitchen-sink': 3000, // for the animation to complete
  'components-logosuite-features--takeover-button': 3000, // for the animation to complete
  'components-riverbreakouttabs-examples--with-images': 4000, // for dither bg to complete
  'components-riverbreakouttabs-examples--with-videos': 4000, // for dither bg to complete
  'components-riverbreakouttabs-examples--with-rivers': 4000, // for dither bg to complete
  'recipes-flexsuite-overview--ai': 4000, // for the animation to complete
  'recipes-flexsuite-category--security': 4000, // for the animation to complete,
  'recipes-flexsuite-details--ai': 7000, // for the youtube video posters to load
}

const beforeScreenshotLookup: Partial<Record<string, string>> = {
  'components-subdomainnavbar-features--overflow-menu-open': `
    const moreButton = page.getByRole('button', {name: 'More'})
    if ((await moreButton.getAttribute('aria-expanded')) !== 'true') {
      await moreButton.click()
    }
    const overflowMenu = page.locator(\`[id="\${await moreButton.getAttribute('aria-controls')}"]\`)
    await expect(moreButton).toHaveAttribute('aria-expanded', 'true')
    await expect(overflowMenu).toBeVisible()
    await expect(overflowMenu.getByRole('link', {name: 'Resources'})).toBeVisible()
  `,
}

const screenshotOptionsLookup: Partial<Record<string, string>> = {
  'components-subdomainnavbar-features--overflow-menu-open': `{animations: 'allow'}`,
}

const viewportLookup: Partial<Record<string, {width: number; height: number}>> = {
  'components-subdomainnavbar-features--desktop-pill-states': {width: 1440, height: 900},
  'components-subdomainnavbar-features--overflow-menu-open': {width: 1440, height: 900},
  'components-subdomainnavbar-features--tablet-menu-open': {width: 800, height: 900},
  'components-subdomainnavbar-features--tablet-view': {width: 800, height: 900},
}

// const skipLocalizationsTestsFor = [
//   'components-actionmenu-features--disabled-item', // for the menu to open
//   'components-actionmenu-features--anchored-positioning', // for the menu to open
// ]

/**
 * Manual lookup for tests that we want to skip
 * Only add tests here that aren't suitable for visual regression testing
 */
const skipTestLookup = [
  'components-river--video', // video makes this too flakey
  'components-river--custom-logos', // for external social imagery to load
  'components-actionmenu-features--keyboard-navigation', // interaction test
  'components-actionmenu-examples--keyboard-navigation', // for the interaction test
  'components-actionmenu-features--split-button-mode-open', // for anchored overlay causing unpredictable layout shift
  'components-actionmenu-features--single-selection-small-open', // for anchored overlay causing unpredictable layout shift
  'components-actionmenu-features--open-by-default', // for anchored overlay causing unpredictable layout shift
  'components-actionmenu-features--longer-lists-open', // for anchored overlay causing unpredictable layout shift
  'components-actionmenu-features--menu-alignment', // for anchored overlay causing unpredictable layout shift
  'components-actionmenu-features--split-button-alternative-menu-alignment', // for anchored overlay causing unpredictable layout shift
  'components-animations-examples--discussions-hero', // animation only
  'components-animations-examples--progress-bars', // animation only
  'components-animations-examples--logo-bar', // animation only
  'components-animations-examples--timeline-bar', // animation only
  'components-actionmenu-features--disabled-item', // for the menu to open
  'components-actionmenu-features--anchored-positioning', // for the menu to open
  'components-animations--playground', // animation only
  'components-logosuite-examples--following-hero', // animation only
  'components-logosuite-features--slower-marquee-speed', // animation only
  'components-logosuite-features--mixed-width', // animation only
  'components-logosuite-features--following-hero', // animation only
  'components-logosuite-features--stacked', // animation only
  'components-ide-features--editor-only', // animation too long
  'components-ide-features--editor-no-replay-button', // animation too long
  'components-ide-features--chat-only', // animation too long
  'components-ide-features--with-river', // animation too long
  'components-ide-features--perspective-example', // animation too long
  'components-ide-features--perspective-example-light', // animation too long
  'components-ide-features--all-glass', // animation too long
  'components-ide-features--editor-custom-icons', // animation too long
  'components-statistic-features--animations', // animation only
  'components-riverstoryscroll-features--video-narrow', // video makes this too flakey
  'components-riverstoryscroll-features--video', // video makes this too flakey
  'components-minimalvideoplayer--default', // autoplaying video prevents networkidle from settling
  'components-minimalvideoplayer--playground', // autoplaying video prevents networkidle from settling
  'components-minimalvideoplayer-features--native-source-element', // autoplaying video prevents networkidle from settling
  'components-minimalvideoplayer-features--playing', // actively playing video produces nondeterministic frames
  'components-minimalvideoplayer-features--custom-accessible-labels', // visually duplicates the paused story
  'components-hero-features-images-and-videos--with-native-block-end-default', // for being non-deterministic due to video buffering
  'components-hero-features-images-and-videos--with-youtube-video-block-end-default', // for loading a remote video
  'components-hero-features-images-and-videos--with-youtube-video-inline-end', // for loading a remote video
  'components-logosuite-features--marquee', // for the animation
  'components-subnav-features--anchor-nav-variant-keyboard-navigation', // for being an interaction test-only
  'components-subnav-features--anchor-nav-variant', // for being flakey due to IntersectionObserver timing
  'components-actionmenu-features--single-selection-small-open', // for the menu to open, too flakey, need to fix layout shift
  'components-actionmenu-features--menu-alignment', // for the menu to open, too flakey, need to fix layout shift
]

const touchTestLookup = ['components-card-features--arrow-cta-long-label']

const categorisedStories = Object.keys((stories as StoryIndex).entries).reduce((acc, key) => {
  const {id, name: storyName, importPath} = stories.entries[key]

  const importPathAsArray = importPath.split('/')
  const groupName = importPathAsArray[importPathAsArray.length - 2]
  const storyFolder = importPath.substring(0, importPath.lastIndexOf('/'))

  if (!acc[groupName]) {
    acc[groupName] = {}
  }

  if (!acc[groupName].stories) {
    acc[groupName].stories = []
  }

  if (!acc[groupName].storyFolder) {
    acc[groupName].storyFolder = path.resolve('.', storyFolder)
  }

  acc[groupName].stories.push({
    id,
    groupName,
    storyName,
    timeout: waitForTimeoutLookup[key] ? waitForTimeoutLookup[key] : defaultTimeout,
  })

  return acc
}, {})

for (const key of Object.keys(categorisedStories)) {
  const {stories: componentStories, storyFolder} = categorisedStories[key]

  const validNarrowVieportNames = ['mobile', 'narrow']

  const content = `
    /*
    * Do not modify this file directly.
    * This file was generated by: ${path.basename(__filename)}.
    * Regenerate using: npm run test:visual:generate
    */
    import {test, expect} from '@playwright/test'

    // eslint-disable-next-line i18n-text/no-en
    test.describe('Visual Comparison: ${key}', () => {

      ${
        componentStories.some(({id}) => touchTestLookup.includes(id))
          ? `const touchTest = test.extend({hasTouch: true, viewport: {width: 375, height: 812}})`
          : ''
      }

      ${componentStories.reduce((acc, {id, storyName, groupName, timeout}) => {
        const requiresMobileViewport = validNarrowVieportNames.some(viewportName =>
          storyName.toLowerCase().includes(viewportName),
        )

        const requiresTabletViewport = storyName.toLowerCase().includes('tablet')
        const viewport = viewportLookup[id]
        const requiresTouch = touchTestLookup.includes(id)
        if (skipTestLookup.includes(id)) {
          return acc
        }

        const generateTestForLanguage = (language: string) => {
          const localeParam = language === 'en' ? '' : `globals=${encodeURIComponent(`locale:${language}`)}&`
          const base = `${groupName} / ${storyName}`
          const testName = language === 'en' ? base : `${base} (${language})`

          return `${requiresTouch ? '// eslint-disable-next-line i18n-text/no-en\n          ' : ''}${
            requiresTouch ? 'touchTest' : 'test'
          }('${testName}', async ({page}) => {
            await page.goto('http://localhost:${port}/iframe.html?${localeParam}args=&id=${id}&viewMode=story', { waitUntil: 'networkidle' })
            await page.locator('body.sb-show-main').waitFor({ state: 'visible' })

            ${timeout ? `await page.waitForTimeout(${timeout})` : ''}${beforeScreenshotLookup[id] ?? ''}
            await expect(page).toHaveScreenshot(${screenshotOptionsLookup[id] ?? '{fullPage: true}'})
          });

          `
        }

        const languagesToTest = ['en']
        const allLanguageTests = languagesToTest.map(language => generateTestForLanguage(language)).join('')

        if (viewport) {
          return (acc += `
          // eslint-disable-next-line i18n-text/no-en
          test.describe('Custom viewport test for ${storyName}', () => {
            test.use({ viewport: { width: ${viewport.width}, height: ${viewport.height} } });
            ${allLanguageTests}
          });
          `)
        }

        if (requiresMobileViewport) {
          return (acc += `
          // eslint-disable-next-line i18n-text/no-en
          test.describe('Mobile viewport test for ${storyName}', () => {
            test.use({ viewport: { width: 360, height: 800 } });
            ${allLanguageTests}
          });
          `)
        }

        if (requiresTabletViewport) {
          return (acc += `
          // eslint-disable-next-line i18n-text/no-en
          test.describe('Tablet viewport test for ${storyName}', () => {
            test.use({ viewport: { width: 834, height: 1112 } });
            ${allLanguageTests}
          });
          `)
        }

        return (acc += allLanguageTests)
      }, '')}

    })

    `
  const final = prettier.format(content, {parser: 'typescript', ...prettierOptions})
  const dest = `${path.resolve(__dirname, storyFolder)}/${key}.visual.spec.ts`

  try {
    fs.writeFileSync(dest, final, {
      encoding: 'utf8',
    })
    // eslint-disable-next-line no-console
    console.log('Wrote:', dest)
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message, err)
    }
  }
}
