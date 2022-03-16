import primitives from '@primer/primitives'
import fs from 'fs'
import path from 'path'
import prettier from 'prettier'

const prefix = '--gh-color'

function flattenHelper(currentObject, newObject, previousKeyName) {
  for (let key in currentObject) {
    let value = currentObject[key]

    if (value.constructor !== Object) {
      if (previousKeyName === null || previousKeyName === '') {
        newObject[`${prefix}-${key}`] = value
      } else {
        if (key === null || key === '') {
          newObject[previousKeyName] = value
        } else {
          newObject[previousKeyName + '-' + key] = value
        }
      }
    } else {
      if (previousKeyName === null || (previousKeyName === '' && value.constructor === Object)) {
        flattenHelper(value, newObject, `${prefix}-${key}`)
      } else {
        flattenHelper(value, newObject, previousKeyName + '-' + key)
      }
    }
  }
}

function composeCSSVariables(oldObject) {
  const init = {}
  let cssVariables = ''

  flattenHelper(oldObject, init, '')

  for (let key in init) {
    cssVariables += `${key}: ${init[key]};\n`
  }

  return cssVariables
}

async function formatVariables(variables: string) {
  return prettier.format(variables, {semi: false, parser: 'css'})
}

;(async function buildCSSVars() {
  const defaultMode = 'light'
  const supportedModes = ['light', 'dark']
  const cssVars = Object.keys(primitives.colors).reduce((acc: string, key: string) => {
    // adds root variables
    if (key === defaultMode) {
      acc += buildRoot(primitives.colors[key])
    }

    // only add the data-attribute if the mode is supported
    if (supportedModes.includes(key)) {
      acc += buildVarsForDataAttribute(primitives.colors[key], key)
    }
    return acc
  }, '')

  try {
    const finalCSS = await formatVariables(cssVars)
    const filename = path.resolve(__dirname, '../lib/css-variables.css')
    const cb = err => {
      if (err) {
        console.error('\x1b[31m', `error: writing to ${filename}`, '\x1b[31m')
        return
      }

      console.log('\x1b[32m', `success: css variables written to ${filename}`, '\x1b[32m')
    }
    await fs.writeFile(filename, finalCSS, 'utf8', cb)
  } catch (err) {
    console.error('\x1b[31m', `error: generating css variables, ${err}`, '\x1b[31m')
  }

  return cssVars
})()

function buildRoot(defaultModePrimitives) {
  const {scale, ...colors} = defaultModePrimitives
  const generatedVariables = composeCSSVariables(colors)
  return `
        :root {
            ${generatedVariables}
        }
    `
}

function buildVarsForDataAttribute(colorModePrimitives, key) {
  const {scale, ...colors} = colorModePrimitives
  const generatedVariables = composeCSSVariables(colors)
  return `
         [data-color-mode="${key}"] {
              ${generatedVariables}
          }
      `
}
