const {StyleDictionary} = require('../../scripts/style-dictionary')
const {fileHeader} = StyleDictionary.formatHelpers

const tsModuleDeclaration = {
  name: 'typescript/module-declarations-v2',
  formatter({dictionary, options, file}) {
    const {moduleName = `tokens`} = options

    const getType = value => {
      switch (typeof value) {
        case 'string':
          return 'string'
        case 'number':
          return 'number'
        default:
          return 'any'
      }
    }

    const recursiveTypeGeneration = obj => {
      const tree = {}
      const shortHandSizes = ['large', 'medium', 'small']
      if (typeof obj !== 'object' || Array.isArray(obj)) {
        return obj
      }

      if (obj.hasOwnProperty('value') && typeof obj.value === 'string') {
        return getType(obj.value)
      } else {
        for (const name in obj) {
          if ((obj.hasOwnProperty(name) && obj.name === 'shorthand') || shortHandSizes.includes(obj.name)) {
            for (const shorthandKey in obj.value) {
              tree[shorthandKey] = getType(obj.value[shorthandKey])
            }
            return tree
          } else if (obj.hasOwnProperty(name)) {
            tree[name] = recursiveTypeGeneration(obj[name])
          }
        }
      }
      return tree
    }

    const output = `${fileHeader({file})}
    
declare const ${moduleName}: ${JSON.stringify(recursiveTypeGeneration(dictionary.tokens), null, 2)}
export default ${moduleName};`

    return output
      .replace(/"any"/g, 'any')
      .replace(/"string"/g, 'string')
      .replace(/"number"/g, 'number')
  },
}

module.exports = tsModuleDeclaration
