const {StyleDictionary} = require('../../scripts/style-dictionary')
const {fileHeader, sortByReference, createPropertyFormatter} = StyleDictionary.formatHelpers
const prettier = require('prettier')

function mediaQueryFormat({dictionary, file, options}) {
  const selector = options.selector ? options.selector : `:root`
  const {outputReferences} = options
  let {allTokens} = dictionary

  const getRemValue = (name, value) => {
    const baseFont = 16
    const floatVal = parseFloat(value)

    if (isNaN(floatVal)) {
      throw new Error(`${value} in ${name} is not a valid number`)
    }

    if (floatVal === 0) {
      return '0'
    }

    return `${floatVal / baseFont}rem`
  }

  if (outputReferences) {
    allTokens = [...allTokens].sort(sortByReference(dictionary))
  }

  const responsiveTokens = allTokens.reduce((acc, token) => {
    if (token.hasOwnProperty('responsive')) {
      for (const key of Object.keys(token.responsive)) {
        acc[key] = [...(acc[key] || []), token]
      }
    }
    return acc
  }, {})

  const renderMediaQueries = tokenMap => {
    return Object.keys(tokenMap)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .map(breakpoint => {
        return `
              @media (min-width: ${breakpoint}) {
                ${selector} {\n
                ${responsiveTokens[breakpoint]
                  .map(token => {
                    const value = token.responsive[breakpoint].value
                    if (typeof value === 'string' && value.includes('px')) {
                      return `--${token.name}: ${getRemValue(token.name, value)};`
                    }
                    return `--${token.name}: ${value};`
                  })
                  .filter(function (strVal) {
                    return !!strVal
                  })
                  .join('\n')}
                }\n
              }
            
            `
      })
      .join('\n')
  }

  const template = `
      ${fileHeader({file})}
      ${selector} {\n
        
      ${allTokens
        .map(createPropertyFormatter({outputReferences, dictionary, format: 'css', formatter: {}, themeable: false}))
        .filter(function (strVal) {
          return !!strVal
        })
        .join('\n')}
      \n
    }\n
    ${renderMediaQueries(responsiveTokens)}\n`

  return prettier.format(template, {parser: 'css', printWidth: 500})
}

module.exports = mediaQueryFormat
