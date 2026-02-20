const fs = require('fs')
const {buildPrimitives, StyleDictionary} = require('./style-dictionary')

const tsModuleDeclaration = require('../src/formats/typescript-module-declarations-v2')
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

  fs.cpSync('../../node_modules/@primer/primitives/src/tokens', dest, {recursive: true})

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
   * Replacement format for typescript/module-declarations
   * Type schema corresponds to javascript/module-v2 format
   */
  StyleDictionary.registerFormat(tsModuleDeclaration)

  //build most tokens
  buildPrimitives({
    source: [`tokens/functional/**/*.json`, `!tokens/functional/**/size-*.json`],
    include: ['tokens/base/**/*.json'],
    namespace,
    outputPath,
  })
  // build base tokens
  buildPrimitives({
    source: [`tokens/base/**/*.json`],
    namespace: undefined,
    outputPath,
  })

  buildPrimitives({
    source: [`tokens/functional/size/size-fine.json`], //build size fine
    include: ['tokens/base/size/size.json'],
    namespace,
    outputPath,
  })

  buildPrimitives({
    source: [`tokens/functional/size/size-coarse.json`], //build size coarse
    include: ['tokens/base/size/size.json'],
    namespace,
    outputPath,
  })

  buildPrimitives({
    source: [`tokens/functional/size/size-fine.json`], // build the special formats
    include: ['tokens/base/size/size.json'],
    namespace,
    outputPath,
    platforms: {
      css: {
        prefix: namespace,
        addPrefix: token => token.isSource,
        buildPath: `${outputPath}/css/`,
        transformGroup: 'css',
        files: [
          {
            destination: `tokens/functional/size/size-fine.css`,
            format: `css/advanced`,
            filter: token => token.filePath.includes('fine'),
            options: {
              outputReferences: true,
              queries: [
                {
                  query: '@media (pointer: fine)',
                },
              ],
            },
          },
        ],
      },
    },
  })

  buildPrimitives({
    source: [`tokens/functional/size/size-coarse.json`], // build the special formats
    include: ['tokens/base/size/size.json'],
    namespace,
    platforms: {
      css: {
        prefix: namespace,
        addPrefix: token => token.isSource,
        buildPath: `${outputPath}/css/`,
        transformGroup: 'css',
        files: [
          {
            destination: `tokens/functional/size/size-coarse.css`,
            format: `css/advanced`,
            filter: token => token.filePath.includes('coarse'),
            options: {
              outputReferences: true,
              queries: [
                {
                  query: '@media (pointer: coarse)',
                },
              ],
            },
          },
        ],
      },
    },
  })

  const filesForResponsiveTokens = [
    `tokens/functional/typography/typography-responsive.json`,
    `tokens/functional/components/grid/grid.json`,
    `tokens/functional/components/river/river.json`,
    `tokens/functional/components/faq/faq.json`,
    `tokens/functional/components/comparison-table/comparison-table.json`,
    `tokens/functional/components/eyebrow-banner/eyebrow-banner.json`,
    `tokens/functional/components/pricing-options/pricing-options.json`,
    `tokens/functional/components/section/section.json`,
    `tokens/functional/components/logosuite/base.json`,
  ]

  for (const path of filesForResponsiveTokens) {
    const sansExtension = path.replace(/\.[^/.]+$/, '')

    buildPrimitives({
      source: [path], // build the special formats
      include: [`tokens/base/typography/typography.json`],
      namespace,
      platforms: {
        css: {
          prefix: namespace,
          addPrefix: token => token.isSource,
          buildPath: `${outputPath}/css/`,
          transformGroup: 'css',
          files: [
            {
              filter: token => token.isSource,
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
        // prefix: namespace,
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

  // temp fix until prefix is removed from all component files

  buildPrimitives({
    source: [`tokens/functional/colors/global.json`],
    namespace,
    platforms: {
      css: {
        prefix: namespace, // we still need to remove namespace form all component files
        buildPath: `${outputPath}/css/`,
        transformGroup: 'css',
        files: [
          {
            destination: `tokens/functional/colors/global-with-modes.css`,
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
    `tokens/functional/components/icon/colors.json`,
    `tokens/functional/components/frosted-glass-vfx/colors.js`,
    `tokens/functional/components/tabs/colors.json`,
    `tokens/functional/components/blinking-cursor/colors.js`,
    `tokens/functional/components/tiles/colors.js`,
  ]

  for (const path of filesForColorModes) {
    const sansExtension = path.replace(/\.[^/.]+$/, '')

    buildPrimitives({
      include: [`tokens/functional/colors/global.json`],
      source: [path], // build the special formats
      namespace,
      platforms: {
        css: {
          prefix: namespace,
          buildPath: `${outputPath}/css/`,
          transformGroup: 'css',
          files: [
            {
              filter: token => token.isSource,
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
  fs.rmSync(dest, {recursive: true})
})()
