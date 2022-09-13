const {StyleDictionary} = require('@primer/primitives/build')
const {fileHeader, sortByReference} = StyleDictionary.formatHelpers
const createPropertyFormatter = require('style-dictionary/lib/common/formatHelpers/createPropertyFormatter')
const prettier = require('prettier')

/**
 * Custom style dictionary formatter for outputting CSS variables that are
 * compatible with the ThemeProvider component.
 */
function colorModeAttributes({dictionary: origDictionary, file, options}) {
  /**
   * Need to add a new color mode? Add it here!
   */
  const supportedModes = [
    'light',
    'light_high_contrast',
    'light_colorblind',
    'light_tritanopia',
    'dark',
    'dark_dimmed',
    'dark_high_contrast',
    'dark_colorblind',
    'dark_tritanopia'
  ]

  const convertToHSL = value => `hsl(${value.split(' ').join(', ')})`

  const dictionary = options.containsRawHSL ? JSON.parse(JSON.stringify(origDictionary)) : origDictionary

  if (options.containsRawHSL) {
    const reduceProperties = (acc, token) => {
      acc.push({
        ...token,
        name: `${token.name}-hsl`,
        path: [...token.path, 'hsl']
      })

      /**
       * Creates a new token object adjacent to the original
       * This takes the raw HSL values and wraps it in a HSL css function
       */
      const tokenWithHSL = {...token, value: convertToHSL(token.value)}

      /**
       * Checks if the token object contains one of the supported modes
       * If yes; mutate the HSL-specific token object with the converted HSL value for the alternate mode
       */
      for (const mode of supportedModes) {
        if (token.hasOwnProperty(mode)) {
          tokenWithHSL[mode] = convertToHSL(token[mode])
        }
      }

      acc.push(tokenWithHSL)
      return acc
    }

    dictionary.allTokens = dictionary.allTokens.reduce(reduceProperties, [])
    dictionary.allProperties = dictionary.allProperties.reduce(reduceProperties, [])
  }

  const {outputReferences} = options
  let {allTokens} = dictionary

  const defaultMode = supportedModes[0]

  if (outputReferences) {
    allTokens = [...allTokens].sort(sortByReference(dictionary)) // TODO - add a test for this
  }

  const renderLightMode = () =>
    `:root, 
    [data-color-mode=${defaultMode}]  { 
      ${allTokens
        .map(createPropertyFormatter({outputReferences, dictionary, format: 'css', formatter: {}, themeable: false}))
        .filter(function (strVal) {
          return !!strVal
        })
        .join('\n')}
    }\n`

  /**
   * Returns dark mode tokens by replacing the contents of value with dark
   */
  const renderAlternateColorMode = mode => {
    if (mode === defaultMode) return renderLightMode()

    const replaceWithAlternateModeValue = token => {
      if (token.hasOwnProperty(mode)) {
        return Object.assign({}, token, {
          value: token[mode]
        })
      }
    }

    const newDictionary = JSON.parse(JSON.stringify(dictionary))

    newDictionary.allProperties = newDictionary.allProperties.map(replaceWithAlternateModeValue).filter(Boolean)

    // short-circuit if no tokens are found for the supported modes
    if (!newDictionary.allProperties.length) return ''

    const {allTokens: newAllTokens} = newDictionary

    return `
    [data-color-mode="${mode}"]  {
    
    ${newAllTokens
      .map(replaceWithAlternateModeValue)
      .filter(Boolean)
      .map(
        createPropertyFormatter({
          outputReferences: false,
          dictionary: newDictionary,
          format: 'css',
          formatter: {},
          themeable: false
        })
      )
      .filter(function (strVal) {
        return !!strVal
      })
      .join('\n')}
      
    }\n`
  }

  const template = `
      ${fileHeader({file})}
 
    ${supportedModes.map(mode => renderAlternateColorMode(mode)).join('')}
    
    \n`

  return prettier.format(template, {parser: 'css', printWidth: 500})
}

module.exports = colorModeAttributes
