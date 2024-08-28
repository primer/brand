const {StyleDictionary} = require('../../scripts/style-dictionary')
const {fileHeader, sortByReference} = StyleDictionary.formatHelpers
const createPropertyFormatter = require('style-dictionary/lib/common/formatHelpers/createPropertyFormatter')
const prettier = require('prettier')

/**
 * Custom style dictionary formatter for outputting CSS variables that are
 * compatible with the ThemeProvider component.
 */
function colorModeAttributes({dictionary, file, options}) {
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
    'dark_tritanopia',
  ]
  const defaultMode = supportedModes[0]

  const {outputReferences} = options
  let {allTokens} = dictionary

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
   * Returns alternate color mode tokens by replacing the contents of value with said mode
   */
  const renderAlternateColorMode = mode => {
    if (mode === defaultMode) return renderLightMode()

    const replaceWithAlternateModeValue = token => {
      if (token.hasOwnProperty(mode)) {
        return Object.assign({}, token, {
          value: token[mode],
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
          themeable: false,
        }),
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
