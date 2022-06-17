const fs = require('fs')
const {buildPrimitives, StyleDictionary} = require('@primer/primitives/build')

const mediaQueryFormat = require('../src/formats/responsive-media-query')
const colorModeFormat = require('../src/formats/color-mode-attributes')

;(function () {
  const namespace = 'brand'
  const outputPath = './lib/design-tokens'
  const src = './src/tokens'
  const dest = 'tokens'

  /**
   * Step 1:
   * Create a temporary directory with JSON files to convert into tokens
   */
  // move over base configs

  fs.cpSync('./node_modules/@primer/primitives/tokens', dest, {recursive: true})

  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, {force: true, recursive: true})
  }

  /**
   * Step 2:
   * Build tokens by running function against the temporary directory
   */

  StyleDictionary.registerFormat({
    name: 'css/color-mode-attributes',
    formatter: colorModeFormat
  })

  StyleDictionary.registerFormat({
    name: 'css/responsive-media-query',
    formatter: mediaQueryFormat
  })

  //build most tokens
  buildPrimitives({
    source: [`tokens/**/*.json`, `!tokens/**/size-*.json`],
    namespace,
    outputPath
  })

  buildPrimitives({
    source: [`tokens/functional/size/size-fine.json`, `tokens/base/size/size.json`], //build size fine
    namespace,
    outputPath
  })

  buildPrimitives({
    source: [`tokens/functional/size/size-coarse.json`, `tokens/base/size/size.json`], //build size coarse
    namespace,
    outputPath
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
              outputReferences: true
            }
          }
        ]
      }
    }
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
              outputReferences: true
            }
          }
        ]
      }
    }
  })

  buildPrimitives({
    source: [`tokens/base/typography/typography.json`, `tokens/functional/typography/typography-responsive.json`], // build the special formats
    namespace,
    platforms: {
      css: {
        buildPath: `${outputPath}/css/`,
        transformGroup: 'css',
        files: [
          {
            destination: `tokens/functional/typography/typography-responsive.css`,
            format: `css/responsive-media-query`,
            options: {
              outputReferences: true
            }
          }
        ]
      }
    }
  })

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
              containsRawHSL: true
            }
          }
        ]
      }
    }
  })

  const filesForColorModes = [
    `tokens/functional/colors/global.json`,
    `tokens/functional/components/button/colors.js`,
    `tokens/functional/components/accordion/colors.js`,
    `tokens/functional/components/faq/colors.js`
  ]

  for (const path of filesForColorModes) {
    const sansExtention = path.replace(/\.[^/.]+$/, '')

    buildPrimitives({
      source: [path], // build the special formats
      namespace,
      platforms: {
        css: {
          buildPath: `${outputPath}/css/`,
          transformGroup: 'css',
          files: [
            {
              destination: `${sansExtention}-with-modes.css`,
              format: `css/color-mode-attributes`,
              options: {
                outputReferences: false,
                containsRawHSL: false
              }
            }
          ]
        }
      }
    })
  }

  /**
   * Step 3:
   * Clean up the temporary directory
   */
  fs.rmdirSync(dest, {recursive: true})
})()
