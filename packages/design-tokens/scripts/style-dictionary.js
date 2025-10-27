/**
 * Ported from primer/primitives, as it was removed in v8 release and we still need it
 */
const glob = require('fast-glob')
const {PrimerStyleDictionary: StyleDictionary} = require('@primer/primitives/dist/build/PrimerStyleDictionary.js')

const {fileHeader} = StyleDictionary.formatHelpers

const namePathToKebabCasePrefix = require('../src/transforms/namePathToKebabCasePrefix')
const colorToModeObject = require('../src/transforms/colorToModeObject')

StyleDictionary.registerTransform(namePathToKebabCasePrefix)
StyleDictionary.registerTransform(colorToModeObject)
//-----
// functions to be extracted
// TODO: extract to a separate files

// REGISTER THE CUSTOM TRANFORM GROUPS

StyleDictionary.registerTransformGroup({
  name: 'css',
  transforms: ['name/pathToKebabCasePrefix', 'dimension/rem', 'typography/css'],
})

// REGISTER A CUSTOM FORMAT
/**
 * Replacement format for javascript/module
 */
StyleDictionary.registerFormat({
  name: 'javascript/module-v2',
  formatter({dictionary, file}) {
    const recursiveleyFlattenDictionary = obj => {
      const tree = {}
      if (typeof obj !== 'object' || Array.isArray(obj)) {
        return obj
      }

      if (obj.hasOwnProperty('value')) {
        return obj.value
      } else {
        for (const name in obj) {
          if (obj.hasOwnProperty(name)) {
            tree[name] = recursiveleyFlattenDictionary(obj[name])
          }
        }
      }
      return tree
    }

    return `${fileHeader({file})}
    
module.exports = ${JSON.stringify(recursiveleyFlattenDictionary(dictionary.tokens), null, 2)}`
  },
})

/**
 * @name build
 * @description
 *   Used to generate design tokens programmatically using StyleDictionary
 *   Called internally to build primitives and exported for self-serve use
 *
 * @param {Object} options
 * @param {string} options.source glob or file path to a JSON object of tokens
 * @param {string} options.outputPath location to write the output files
 * @param {string} options.namespace a custom namespace to use for the output files
 * @param {Platform} options.platforms add custom platform configurations to style-dictionary
 * @example
 *  buildPrimitives({
 *   source: [`src/colors.json`],
 *   outputPath: 'dist',
 *   namespace: 'primer',
 *   platforms: {...}
 *  })
 */
function buildPrimitives(
  {source, outputPath = 'tokens-v2-private', include, platforms, namespace},
  _StyleDictionary = StyleDictionary,
) {
  // eslint-disable-next-line no-console
  console.log('Build started...')
  // eslint-disable-next-line no-console
  console.log('\n==============================================')

  const customParseConfig = {
    parsers: [
      {
        pattern: /\.json$/,
        parse: ({contents, filePath}) => {
          try {
            let mutableContent = JSON.stringify(contents)

            // prettier-ignore
            // eslint-disable-next-line prettier/prettier, no-useless-escape
            mutableContent = mutableContent.replace(/\\"\$value\\"/g, '\\"value\\"')

            if (filePath.includes('/functional/')) {
              mutableContent = mutableContent.replace(/<namespace>/g, namespace)
            }

            const parsed = JSON.parse(mutableContent)

            return JSON.parse(parsed)
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
          }
        },
      },
    ],
  }

  const getConfig = (files, prefix) => {
    const defaultPlatformConfig = {
      css: {
        prefix,
        addPrefix: token => token.isSource,
        buildPath: `${outputPath}/css/`,
        transformGroup: 'css',
        // map the array of token file paths to style dictionary output files
        files: files.map(filePath => {
          return {
            format: `css/variables`,
            destination: filePath.replace(`.json`, `.css`),
            filter: token => token.filePath === filePath && token.isSource,
            options: {
              outputReferences: true,
            },
          }
        }),
      },
      cssViewport: {
        prefix,
        addPrefix: token => token.isSource,
        buildPath: `${outputPath}/css/tokens/functional/size/`,
        transformGroup: 'css',
        files: [
          {
            filter: token => token.filePath.includes('viewport') && token.isSource,
            format: 'css/customMedia',
            destination: 'viewport.css',
          },
        ],
      },
      scss: {
        prefix,
        addPrefix: token => token.isSource,
        buildPath: `${outputPath}/scss/`,
        transformGroup: 'css',
        // map the array of token file paths to style dictionary output files
        files: files.map(filePath => {
          return {
            format: `scss/variables`,
            destination: filePath.replace(`.json`, `.scss`),
            filter: token => token.filePath === filePath && token.isSource,
            options: {
              outputReferences: true,
            },
          }
        }),
      },
      js: {
        prefix,
        buildPath: `${outputPath}/js/`,
        transforms: ['name/pathToPascalCase', 'dimension/rem'],
        // map the array of token file paths to style dictionary output files
        files: files.map(filePath => {
          return {
            format: `javascript/es6`,
            destination: filePath.replace(`.json`, `.js`),
            filter: token => token.filePath === filePath && token.isSource,
          }
        }),
      },
      jsModule: {
        prefix,
        buildPath: `${outputPath}/js/module/`,
        transforms: ['dimension/rem', 'color/modeObject'],
        // map the array of token file paths to style dictionary output files
        files: files.map(filePath => {
          return {
            format: `javascript/commonJs`,
            destination: filePath.replace(`.json`, `.js`),
            filter: token => token.filePath === filePath && token.isSource,
          }
        }),
      },
      tsTypes: {
        prefix,
        buildPath: `${outputPath}/ts/`,
        transforms: ['dimension/rem'],
        // map the array of token file paths to style dictionary output files
        files: files.map(filePath => {
          return {
            format: `typescript/module-declarations-v2`,
            destination: filePath.replace(`.json`, `.d.ts`),
            filter: token => token.filePath === filePath && token.isSource,
          }
        }),
      },
      ts: {
        prefix,
        buildPath: `${outputPath}/ts/`,
        transforms: ['dimension/rem'],
        // map the array of token file paths to style dictionary output files
        files: files.map(filePath => {
          return {
            format: `javascript/commonJs`,
            destination: filePath.replace(`.json`, `.js`),
            filter: token => token.filePath === filePath && token.isSource,
          }
        }),
      },
    }

    const config = {
      include,
      source: files,
      ...customParseConfig,
      platforms: platforms ? platforms : defaultPlatformConfig,
    }

    return config
  }

  //build all tokens
  _StyleDictionary
    .extend({
      ...getConfig(glob.sync([...source]), namespace),
    })
    .buildAllPlatforms()
}

module.exports = {
  buildPrimitives,
  StyleDictionary,
}
