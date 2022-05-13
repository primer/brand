const {StyleDictionary} = require('@primer/primitives/build')
const {fileHeader, sortByReference} = StyleDictionary.formatHelpers
const createPropertyFormatter = require('style-dictionary/lib/common/formatHelpers/createPropertyFormatter')
const prettier = require('prettier')

/**
 * Custom style dictionary formatter for CSS variables
 */
function colorModeAttributes({dictionary, file, options}) {
  const selector = options.selector ? options.selector : `:root`
  const {outputReferences} = options
  let {allTokens} = dictionary

  if (outputReferences) {
    allTokens = [...allTokens].sort(sortByReference(dictionary))
  }

  const renderDarkMode = () => {
    const callback = token =>
      Object.assign({}, token, {
        value: token.darkValue
      })

    const newDictionary = JSON.parse(JSON.stringify(dictionary))
    // Override each token's `value` with `darkValue`
    newDictionary.allProperties = newDictionary.allProperties.map(callback)

    const {allTokens: newAllTokens} = newDictionary

    return `${newAllTokens
      .map(callback)
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
