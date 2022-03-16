/*
 * IMPORTANT: This file generates /lib/css/gh-variables.color.css
 * TODO: Move to a custom style-dictionary formatter inside @primer/primitives
 */

const primitives = require('@primer/primitives').default as IPrimitives
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

interface IScale {
  [name: string]: string[]
}

interface IToken {
  [name: string]: string
}

interface IColorMode {
  [name: string]: IToken | IScale | string
}

interface IPrimitives {
  colors: {
    light: IColorMode
    dark: IColorMode
  }
}

const prefix = '--gh-color'
const supportedModes = ['light', 'dark']

/**
 * Recursively flattens raw Primitive data into a map of CSS variables
 */
function recursivelyFlatten(currentObject, acc, previousKeyName) {
  for (let key in currentObject) {
    let value = currentObject[key]

    if (value.constructor !== Object) {
      if (!previousKeyName) {
        acc[`${prefix}-${key}`] = value
      } else {
        if (!key) {
          acc[previousKeyName] = value
        } else {
          acc[previousKeyName + '-' + key] = value
        }
      }
    } else {
      if (!previousKeyName && value.constructor === Object) {
        recursivelyFlatten(value, acc, `${prefix}-${key}`)
      } else {
        recursivelyFlatten(value, acc, previousKeyName + '-' + key)
      }
    }
  }
}

/**
 * Converts raw Primitives data for color modes to CSS variables
 * @param {IColorMode} a map of color primitives specific to a color mode
 * @return {string} of css variables
 */
function composeCSSVariables(colorModeObject: IColorMode): string {
  const varsMap = {}
  let cssVariables = ''

  // generate a valid map first
  recursivelyFlatten(colorModeObject, varsMap, '')

  // then convert to string
  for (let key in varsMap) {
    cssVariables += `${key}: ${varsMap[key]};\n`
  }

  return cssVariables
}

/**
 *
 * @param {string} any unformatted string of css
 * @returns {string} formatted string of css
 */
async function formatVariables(variables: string): Promise<string> {
  return prettier.format(variables, {semi: false, parser: 'css'})
}

/**
 * Return a string of CSS variables for the default color mode
 * @param {IColorMode} a map of color primitives specific to the default color mode
 * @returns {string} of css variables
 */
function buildRoot(defaultModePrimitives): string {
  const {scale, ...colors} = defaultModePrimitives
  const generatedVariables = composeCSSVariables(colors)
  return `
        :root {
            ${generatedVariables}
        }
    `
}

/**
 * Return a string of CSS variables for all color modes using HTML data attributes
 * @param {IColorMode} a map of color primitives specific to the default color mode
 * @returns {string} of css variables
 */
function buildVarsForDataAttribute(colorModePrimitives: IColorMode, key): string {
  const {scale, ...colors} = colorModePrimitives
  const generatedVariables = composeCSSVariables(colors)
  return `
         [data-color-mode="${key}"] {
              ${generatedVariables}
          }
      `
}

/***
 * Build CSS Variables - Self-invoking
 * @description:
 *   Transforms Primer Primitive colors and outputs them as CSS variables to the file system.
 *   This is temporary until we have a longer-term solution in @primer/primitives.
 */
;(async function buildCSSVars() {
  try {
    const defaultMode = 'light'
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

    const finalCSS = await formatVariables(cssVars)
    const outputDirs = ['../lib/', '../lib/css/']
    const outputDir = path.resolve(__dirname, '../lib/css')
    const outputPath = outputDir + '/gh-variables.color.css'

    /**
     * Create the output dirs in case they haven't been created yet
     */
    for (let dir of outputDirs) {
      const outputDirPath = path.resolve(__dirname, dir)
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath)
      }
    }

    const cb = err => {
      if (err) {
        console.error('\x1b[31m', `Error: writing to ${outputPath} in file: ${path.basename(__filename)}`, '\x1b[31m')
        throw new Error(`error: ${err}`)
      }

      console.log('\x1b[32m', `Success: css variables written to ${outputPath}\n\n`, '\x1b[32m')
    }
    await fs.writeFile(outputPath, finalCSS, 'utf8', cb)
  } catch (err) {
    console.error(
      '\x1b[31m',
      `Error: generating css variables in file: ${path.basename(__filename)},\n\n ${err}`,
      '\x1b[31m'
    )
    throw new Error(`Error: ${err}`)
  }
})()
