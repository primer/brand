const {StyleDictionary} = require('../../scripts/style-dictionary')
const {fileHeader, sortByReference, createPropertyFormatter} = StyleDictionary.formatHelpers
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

  const getColorScheme = mode => (mode.includes('dark') ? 'dark' : 'light')

  /**
   * Renders token declarations for a given mode.
   * Returns an empty string if no tokens exist for the mode.
   */
  const renderTokenDeclarations = mode => {
    if (mode === defaultMode) {
      return allTokens
        .map(createPropertyFormatter({outputReferences, dictionary, format: 'css', formatter: {}, themeable: false}))
        .filter(Boolean)
        .join('\n')
    }

    const replaceWithAlternateModeValue = token => {
      if (token.hasOwnProperty(mode)) {
        return Object.assign({}, token, {value: token[mode]})
      }
    }

    const newDictionary = JSON.parse(JSON.stringify(dictionary))
    newDictionary.allProperties = newDictionary.allProperties.map(replaceWithAlternateModeValue).filter(Boolean)

    if (!newDictionary.allProperties.length) return ''

    return newDictionary.allTokens
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
      .filter(Boolean)
      .join('\n')
  }

  const renderLightMode = () => {
    const declarations = renderTokenDeclarations(defaultMode)
    return `:root, 
    [data-color-mode="${defaultMode}"],
    [data-color-scheme="${defaultMode}"] { 
      ${declarations}
    }\n`
  }

  /**
   * Returns alternate color mode tokens by replacing the contents of value with said mode
   */
  const renderAlternateColorMode = mode => {
    if (mode === defaultMode) return renderLightMode()

    const declarations = renderTokenDeclarations(mode)
    if (!declarations) return ''

    const colorScheme = getColorScheme(mode)

    return `
    :is([data-color-mode="${mode}"], [data-color-scheme="${colorScheme}"]) {
      ${declarations}
    }\n`
  }

  /**
   * Renders auto mode media query blocks so that tokens respond to
   * prefers-color-scheme when data-color-mode="auto" is set (e.g. by Primer React).
   */
  const renderAutoMode = () => {
    const lightDeclarations = renderTokenDeclarations(defaultMode)
    const darkDeclarations = renderTokenDeclarations('dark')

    let output = ''

    if (lightDeclarations) {
      output += `
      @media (prefers-color-scheme: light) {
        [data-color-mode="auto"] {
          ${lightDeclarations}
        }
      }\n`
    }

    if (darkDeclarations) {
      output += `
      @media (prefers-color-scheme: dark) {
        [data-color-mode="auto"] {
          ${darkDeclarations}
        }
      }\n`
    }

    return output
  }

  const template = `
      ${fileHeader({file})}
 
    ${supportedModes.map(mode => renderAlternateColorMode(mode)).join('')}
    ${renderAutoMode()}
    
    \n`

  return prettier.format(template, {parser: 'css', printWidth: 500})
}

module.exports = colorModeAttributes
