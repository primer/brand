const {StyleDictionary} = require('@primer/primitives/build')
const {fileHeader, sortByReference} = StyleDictionary.formatHelpers
const createPropertyFormatter = require('style-dictionary/lib/common/formatHelpers/createPropertyFormatter')
const prettier = require('prettier')

const customFormat = {
  name: 'css/responsive-media-query',
  formatter({dictionary, file, options}) {
    const selector = options.selector ? options.selector : `:root`
    const {outputReferences} = options
    let {allTokens} = dictionary

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
        .map(breakpoint => {
          return `
                @media (min-width: ${breakpoint}) {
                  ${selector} {\n
                  ${responsiveTokens[breakpoint]
                    .map(token => {
                      return `--${token.name}: ${token.responsive[breakpoint].value};`
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
}

module.exports = customFormat
