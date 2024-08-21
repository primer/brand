const fs = require('fs')
const {buildPrimitives, StyleDictionary} = require('@primer/primitives/build')

const mediaQueryFormat = require('../src/formats/responsive-media-query')
const colorModeFormat = require('../src/formats/color-mode-attributes')

const lightJson = require('../src/tokens/base/colors/light')
const darkJson = require('../src/tokens/base/colors/dark')

;(function () {
  const namespace = 'brand'
  const outputPath = './lib/design-tokens'
  const src = './src/tokens'
  const dest = 'tokens'

  /**
   * Step 1:
   * Create a temporary directory with JSON files to convert into tokens
   */

  fs.cpSync('../../node_modules/@primer/primitives/tokens', dest, {recursive: true})

  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, {force: true, recursive: true})
  }

  /**
   * Step 2:
   * Produce a color-scales.json src file temporarily
   */

  const mergeLightAndDark = (light, dark) => {
    const merged = {}

    for (const key in dark) {
      if (typeof dark[key] === 'object' && dark[key] !== null) {
        merged[key] = mergeLightAndDark(light[key] || {}, dark[key])
      } else if (key === 'value' && light) {
        merged[key] = light[key]
        merged['dark'] = dark[key]
      }
    }

    return merged
  }

  const mergedColorScales = mergeLightAndDark(lightJson, darkJson)

  fs.writeFileSync(`${dest}/base/colors/color-scales.json`, JSON.stringify(mergedColorScales))

  /**
   * Step 3:
   * Build tokens by running function against the temporary directory
   */

  StyleDictionary.registerFormat({
    name: 'css/color-mode-attributes',
    formatter: colorModeFormat,
  })

  StyleDictionary.registerFormat({
    name: 'css/responsive-media-query',
    formatter: mediaQueryFormat,
  })

  /**
   * Added to replace the same transform in Primer Primitives
   * The upstream transform removes rem from lineheight, but this
   * causes a visual regression in Primer Brand.
   * @see https://github.com/primer/primitives/blob/b51c743a0fe26ab7885a9cc82420f400ad35cce7/build.js#L66
   *
   * TODO: Investigate why unitless lineheight doesn't work
   *
   */
  StyleDictionary.registerTransform({
    name: 'pxToRem',
    type: 'value',
    transformer: token => {
      function isPx(value) {
        return /[\d.]+px$/.test(value)
      }

      if (isPx(token.value)) {
        const baseFontSize = 16
        const floatValue = parseFloat(token.value.replace('px', ''))
        if (isNaN(floatValue)) {
          return token.value
        }
        if (floatValue === 0) {
          return '0'
        }

        return `${floatValue / baseFontSize}rem`
      }
      return token.value
    },
  })

  //build most tokens
  buildPrimitives({
    source: [`tokens/**/*.json`, `!tokens/**/size-*.json`],
    namespace,
    outputPath,
  })

  buildPrimitives({
    source: [`tokens/functional/size/size-fine.json`, `tokens/base/size/size.json`], //build size fine
    namespace,
    outputPath,
  })

  buildPrimitives({
    source: [`tokens/functional/size/size-coarse.json`, `tokens/base/size/size.json`], //build size coarse
    namespace,
    outputPath,
  })

  buildPrimitives({
    source: [`tokens/base/size/size.json`, `tokens/functional/size/size-fine.json`], // build the special formats
    namespace,
    outputPath,
    platforms: {
      css: {
        buildPath: `${outputPath}/css/`,
        transformGroup: 'css',
        files: [
          {
            destination: `tokens/functional/size/size-fine.css`,
            format: `css/touch-target-desktop`,
            filter: token => token.filePath.includes('fine'),
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  })

  buildPrimitives({
    source: [`tokens/base/size/size.json`, `tokens/functional/size/size-coarse.json`], // build the special formats
    namespace,
    platforms: {
      css: {
        buildPath: `${outputPath}/css/`,
        transformGroup: 'css',
        files: [
          {
            destination: `tokens/functional/size/size-coarse.css`,
            format: `css/touch-target-mobile`,
            filter: token => token.filePath.includes('coarse'),
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  })

  const filesForResponsiveTokens = [
    `tokens/base/typography/typography.json`,
    `tokens/functional/typography/typography-responsive.json`,
    `tokens/functional/components/grid/grid.json`,
    `tokens/functional/components/river/river.json`,
    `tokens/functional/components/faq/faq.json`,
    `tokens/functional/components/comparison-table/comparison-table.json`,
    `tokens/functional/components/eyebrow-banner/eyebrow-banner.json`,
    `tokens/functional/components/pricing-options/pricing-options.json`,
    `tokens/functional/components/section/section.json`,
  ]

  for (const path of filesForResponsiveTokens) {
    const sansExtension = path.replace(/\.[^/.]+$/, '')

    buildPrimitives({
      source: [path], // build the special formats
      namespace,
      platforms: {
        css: {
          buildPath: `${outputPath}/css/`,
          transformGroup: 'css',
          files: [
            {
              destination: `${sansExtension}.css`,
              format: `css/responsive-media-query`,
              options: {
                outputReferences: true,
              },
            },
          ],
        },
      },
    })
  }

  buildPrimitives({
    source: [`tokens/base/colors/color-scales.json`], // build the special formats
    namespace,
    platforms: {
      css: {
        buildPath: `${outputPath}/css/`,
        transformGroup: 'css',
        files: [
          {
            destination: `tokens/base/colors/color-scales-with-modes.css`,
            format: `css/color-mode-attributes`,
            options: {
              outputReferences: false,
            },
          },
        ],
      },
    },
  })

  const filesForColorModes = [
    `tokens/functional/colors/global.json`,
    `tokens/functional/components/button/colors.js`,
    `tokens/functional/components/accordion/colors.js`,
    `tokens/functional/components/faq/colors.json`,
    `tokens/functional/components/card/colors.json`,
    `tokens/functional/components/pillar/colors.json`,
    `tokens/functional/components/label/colors.json`,
    `tokens/functional/components/link/colors.json`,
    `tokens/functional/components/inline-link/colors.json`,
    `tokens/functional/components/control/colors.js`,
    `tokens/functional/components/subdomain-nav-bar/colors.js`,
    `tokens/functional/components/comparison-table/colors.js`,
    `tokens/functional/components/anchor-nav/colors.js`,
    `tokens/functional/components/cta-banner/colors.js`,
    `tokens/functional/components/footer/colors.json`,
    `tokens/functional/components/action-menu/colors.js`,
    `tokens/functional/components/grid/colors.json`,
    `tokens/functional/components/logosuite/colors.json`,
    `tokens/functional/components/timeline/colors.json`,
    `tokens/functional/components/video-player/colors.js`,
    `tokens/functional/components/prose/colors.js`,
    `tokens/functional/components/eyebrow-banner/colors.js`,
    `tokens/functional/components/testimonial/colors.json`,
    `tokens/functional/components/sub-nav/colors.js`,
    `tokens/functional/components/pagination/colors.js`,
    `tokens/functional/components/ide/colors.js`,
    `tokens/functional/components/breadcrumbs/colors.js`,
    `tokens/functional/components/tooltip/colors.json`,
    `tokens/functional/components/river-story-scroll/colors.js`,
    `tokens/functional/components/pricing-options/colors.json`,
    `tokens/functional/components/river/colors.json`,
    `tokens/functional/components/bento/colors.json`,
  ]

  for (const path of filesForColorModes) {
    const sansExtension = path.replace(/\.[^/.]+$/, '')

    buildPrimitives({
      source: [path], // build the special formats
      namespace,
      platforms: {
        css: {
          buildPath: `${outputPath}/css/`,
          transformGroup: 'css',
          files: [
            {
              destination: `${sansExtension}-with-modes.css`,
              format: `css/color-mode-attributes`,
              options: {
                outputReferences: false,
              },
            },
          ],
        },
      },
    })
  }

  /**
   * Step 4:
   * Clean up the temporary directory
   */
  fs.rmdirSync(dest, {recursive: true})
})()
