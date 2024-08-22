;(function () {
  /* eslint import/no-nodejs-modules: ["error", {"allow": ["path", "fs"]}] */
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {StoryIndex} = require('@storybook/types')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const stories = require('../../../../apps/storybook/storybook-static/index')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require('path')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const prettier = require('prettier')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const prettierOptions = require('../../../../.prettierrc')

  const port = 6006

  const defaultTimeout = 500 // Storybook 7 introduced a small delay in loading stories. This is to migigate the spinner showing up in screenshots.

  /**
   * Manual lookup for tests that need animation or side-effects to complete before tests start
   */
  const waitForTimeoutLookup = {
    'components-faq-features--all-open': 1000, // for the animation
    'components-subdomainnavbar--search-open': 5500, // for the animation
    'components-subdomainnavbar--search-results-visible': 5500, // for the animation
    'components-subdomainnavbar--longer-title': 1500, // for the animation
    'components-subdomainnavbar--mobile-view': 5500, // for the animation
    'components-subdomainnavbar--mobile-menu-open': 5500, // for all staggered animations
    'components-subdomainnavbar--mobile-menu-open-many-items': 5500, // for all staggered animations
    'components-subdomainnavbar--mobile-search-results-visible': 5500, // for the animation
    'components-subdomainnavbar--mobile-no-links': 5500, // for the animation
    'components-button-features--primary-focus-non-standard-bg': 2000, // for the interaction test
    'components-button-features--primary-focus': 2000, // for the interaction test
    'components-button-features--with-hover-interaction': 2000, // for the interaction test
    'components-button-features--secondary-with-hover-interaction': 2000, // for the interaction test
    'components-button-features--subtle-with-hover-interaction': 2000, // for the interaction test
    'components-anchornav--playground': 1000, // for the animation
    'components-anchornav-features--fewer-anchor-links': 1000, // for the animation
    'components-anchornav-features--custom-background': 1000, // for the animation
    'components-anchornav-features--shorter-labels': 1000, // for the animation
    'components-anchornav-features--narrow-view': 1000, // for the interaction test
    'components-anchornav-features--narrow-view-menu-open': 1000, // for the interaction test
    'components-anchornav-features--regular-view': 1000, // for the interaction test
    'components-anchornav-features--regular-view-menu-open': 1000, // for the interaction test
    'components-anchornav-features--longer-labels': 1000, // for the animation
    'components-minimalfooter--default': 5000, // for external social imagery to load
    'components-minimalfooter--playground': 5000, // for external social imagery to load
    'components-minimalfooter-features--dark-theme': 5000, // for external social imagery to load
    'components-minimalfooter-features--filtered-social-links': 5000, // for external social imagery to load
    'components-minimalfooter-features--default-narrow': 5000, // for external social imagery to load
    'components-minimalfooter-features--maximum-links': 5000, // for external social imagery to load
    'components-actionmenu-features--open-by-default': 1000, // for the menu to open
    'components-actionmenu-features--longer-lists-open': 1000, // for the menu to open
    'components-actionmenu-features--menu-alignment': 1000, // for the menu to open
    'components-actionmenu-features--disabled-item': 1000, // flakey test,
    'components-box-features--animation': 6000, // for the animation
    'components-ide--playground': 2000, // for the animation
    'components-ide--default': 2000, // for the animation
    'recipes-seo-article-page--playground': 5000, // for the animation
    'recipes-seo-article-page--all-headings': 5000, // for the animation
    'recipes-seo-article-page--ai-theme': 5000, // for the animation
    'recipes-seo-article-page--collaboration-theme': 5000, // for the animation
    'recipes-seo-article-page--enterprise-theme': 5000, // for the animation
    'recipes-seo-article-page--security-theme': 5000, // for the animation
    'recipes-seo-article-page--productivity-theme': 5000, // for the animation
    'recipes-seo-article-page--light-hero-image': 5000, // for the animation
    'recipes-seo-article-page--dark-hero-image': 5000, // for the animation
    'recipes-solutions-categorypage--light': 4000, // for the animation
    'recipes-solutions-categorypage--dark': 4000, // for the animation
    'recipes-solutions-solution-industry--maximum': 3500, // for the animation
    'recipes-solutions-solution-industry--maximum-dark': 3500, // for the animation
    'recipes-solutions-solution-industry--minimum': 3500, // for the animation
    'recipes-solutions-solution-industry--minimum-dark': 3500, // for the animation
    'recipes-solutions-solution-org-size--maximum': 3500, // for the animation
    'recipes-solutions-solution-org-size--maximum-dark': 3500, // for the animation
    'recipes-solutions-solution-org-size--minimum': 3500, // for the animation
    'recipes-solutions-solution-org-size--minimum-dark': 3500, // for the animation
    'recipes-solutions-overview--light': 3500, // for the animation
    'recipes-solutions-overview--dark': 3500, // for the animation
    'components-riverstoryscroll-features--with-timeline': 3500, // for the animation
    'components-riverstoryscroll-features--with-timeline-narrow': 3500, // for the animation
    'components-riverstoryscroll-features--enterprise-example': 3500, // for the animation
    'components-riverstoryscroll-features--enterprise-example-narrow': 3500, // for the animation
    'recipes-feature-previews-level-2--level-two-playground': 4000, // for the animation
    'recipes-feature-previews-level-2--level-two-point-one': 4000, // for the animation
    'recipes-feature-previews-level-2--level-two-point-two': 4000, // for the animation
    'recipes-feature-previews-level-2--level-two-point-three': 4000, // for the animation
    'recipes-feature-previews-level-2--level-two-point-four': 4000, // for the animation
    'components-textrevealanimation--playground': 3000, // for the animation
    'components-textrevealanimation-examples--with-large-testimonial': 3000, // for the animation
    'components-textrevealanimation-examples--with-hero': 3000, // for the animation
    'components-textrevealanimation-features--animation-on-scroll': 3000, // for the animation
  }

  /**
   * Manual lookup for tests that we want to skip
   * Only add tests here that aren't suitable for visual regression testing
   */
  const skipTestLookup = [
    'components-river--video', // video makes this too flakey
    'components-river--custom-logos', // for external social imagery to load
    'components-actionmenu-features--keyboard-navigation', // interaction test
    'components-actionmenu-examples--keyboard-navigation', // for the interaction test
    'components-animations-examples--discussions-hero', // animation only
    'components-animations-examples--progress-bars', // animation only
    'components-animations-examples--logo-bar', // animation only
    'components-animations-examples--timeline-bar', // animation only
    'components-animations--playground', // animation only
    'components-logosuite-examples--following-hero', // animation only
    'components-logosuite-features--marquee', // animation only
    'components-logosuite-features--slower-marquee-speed', // animation only
    'components-logosuite-features--mixed-width', // animation only
    'components-logosuite-features--following-hero', // animation only
    'components-logosuite-features--stacked', // animation only
    'recipes-feature-previews-level-1--level-one-side-by-side-enterprise', // video makes this too flakey
    'components-subdomainnavbar--overflow-menu-open', // flakey despite timeout
    'components-ide-features--editor-only', // animation too long
    'components-ide-features--editor-no-replay-button', // animation too long
    'components-ide-features--chat-only', // animation too long
    'components-ide-features--with-river', // animation too long
    'components-ide-features--perspective-example', // animation too long
    'components-ide-features--perspective-example-light', // animation too long
    'components-ide-features--all-glass', // animation too long
    'components-ide-features--editor-custom-icons', // animation too long
    'recipes-seo-category-page--default', // template contains randomisation
    'components-statistic-features--animations', // animation only
    'components-riverstoryscroll-features--video-narrow', // video makes this too flakey
    'components-riverstoryscroll-features--video', // video makes this too flakey
  ]

  const categorisedStories = Object.keys((stories as typeof StoryIndex).entries).reduce((acc, key) => {
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

      ${componentStories.reduce((acc, {id, storyName, groupName, timeout}) => {
        const requiresMobileViewport = validNarrowVieportNames.some(viewportName =>
          storyName.toLowerCase().includes(viewportName),
        )

        const requiresTabletViewport = storyName.toLowerCase().includes('tablet')
        if (skipTestLookup.includes(id)) {
          return acc
        }

        const testCase = `test('${groupName} / ${storyName}', async ({page}) => {
          await page.goto('http://localhost:${port}/iframe.html?args=&id=${id}&viewMode=story')

          ${timeout ? `await page.waitForTimeout(${timeout})` : ''}
          expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
        });

        `

        if (requiresMobileViewport) {
          return (acc += `
          // eslint-disable-next-line i18n-text/no-en
          test.describe('Mobile viewport test for ${storyName}', () => {
            test.use({ viewport: { width: 360, height: 800 } });
            ${testCase}
          });
          `)
        }

        if (requiresTabletViewport) {
          return (acc += `
          // eslint-disable-next-line i18n-text/no-en
          test.describe('Tablet viewport test for ${storyName}', () => {
            test.use({ viewport: { width: 834, height: 1112 } });
            ${testCase}
          });
          `)
        }

        return (acc += testCase)
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
})()
