const {StyleDictionary} = require('@primer/primitives/build')
const {fileHeader, sortByReference} = StyleDictionary.formatHelpers
const createPropertyFormatter = require('style-dictionary/lib/common/formatHelpers/createPropertyFormatter')
const prettier = require('prettier')

/**
 * Custom style dictionary formatter for outputting CSS variables that are
 * compatible with the ThemeProvider component.
 */
function colorModeAttributes({dictionary: origDictionary, file, options}) {
  const convertToHSL = value => `hsl(${value.split(' ').join(', ')})`

  const dictionary = options.containsRawHSL ? JSON.parse(JSON.stringify(origDictionary)) : origDictionary

  if (options.containsRawHSL) {
    const reduceProperties = (acc, token) => {
      acc.push({
        ...token,
        name: `${token.name}-hsl`,
        path: [...token.path, 'hsl']
      })
      acc.push({...token, value: convertToHSL(token.value), darkValue: convertToHSL(token.darkValue)})
      return acc
    }

    dictionary.allTokens = dictionary.allTokens.reduce(reduceProperties, [])
    dictionary.allProperties = dictionary.allProperties.reduce(reduceProperties, [])
  }

  const selector = options.selector ? options.selector : `:root`
  const {outputReferences} = options
  let {allTokens} = dictionary

  if (outputReferences) {
    allTokens = [...allTokens].sort(sortByReference(dictionary))
  }

  /**
   * Returns dark mode tokens by replacing the contents of value with darkValue
   */
  const renderDarkMode = () => {
    const replaceWithDarkModeValues = token =>
      Object.assign({}, token, {
        value: token.darkValue
      })

    const newDictionary = JSON.parse(JSON.stringify(dictionary))

    newDictionary.allProperties = newDictionary.allProperties.map(replaceWithDarkModeValues)

    const {allTokens: newAllTokens} = newDictionary

    return `${newAllTokens
      .map(replaceWithDarkModeValues)
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
      .join('\n')}`
  }

  const renderLightMode = () =>
    `${allTokens
      .map(createPropertyFormatter({outputReferences, dictionary, format: 'css', formatter: {}, themeable: false}))
      .filter(function (strVal) {
        return !!strVal
      })
      .join('\n')}`

  const template = `
      ${fileHeader({file})}
      ${selector} {\n
        
      ${renderLightMode()}
      \n
    }\n

    [data-color-mode="light"]  {
      ${renderLightMode()}
    }

    [data-color-mode="dark"]  {
    ${renderDarkMode()}
    }
    \n`

  return prettier.format(template, {parser: 'css', printWidth: 500})
}

module.exports = colorModeAttributes
