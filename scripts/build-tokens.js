const fs = require('fs')
const {buildPrimitives} = require('@primer/primitives/build')

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

  buildPrimitives({
    source: [`tokens/**/*.json`, `!tokens/**/size-*.json`], //build all tokens
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

  /**
   * Step 3:
   * Clean up the temporary directory
   */
  fs.rmdirSync(dest, {recursive: true})
})()
