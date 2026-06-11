const {describe, it, expect} = require('@jest/globals')
const stylelintColors = require('./stylelint-colors')

const token = (name, value, filePath) => ({name, value, filePath, isSource: true})

describe('json/stylelint-colors format', () => {
  it('is registered under the expected name', () => {
    expect(stylelintColors.name).toBe('json/stylelint-colors')
  })

  it('emits color tokens keyed by custom-property name with a color $type', () => {
    const dictionary = {
      allTokens: [
        token('base-color-scale-green-6', '#1a7f37', 'tokens/base/colors/color-scales.json'),
        token('brand-color-text-default', 'var(--base-color-scale-gray-9)', 'tokens/functional/colors/global.json'),
        token('brand-button-primary-bgColor-rest', '#000000', 'tokens/functional/components/button/colors.json'),
      ],
    }

    const output = JSON.parse(stylelintColors.formatter({dictionary}))

    expect(Object.keys(output)).toEqual([
      '--base-color-scale-green-6',
      '--brand-button-primary-bgColor-rest',
      '--brand-color-text-default',
    ])
    expect(output['--brand-color-text-default']).toEqual({
      name: '--brand-color-text-default',
      value: 'var(--base-color-scale-gray-9)',
      $type: 'color',
      filePath: 'tokens/functional/colors/global.json',
    })
  })

  it('excludes tokens that are not sourced from a color file', () => {
    const dictionary = {
      allTokens: [
        token('base-size-4', '4px', 'tokens/base/size/size.json'),
        token('brand-text-body-default-fontSize', '1rem', 'tokens/functional/typography/typography.json'),
        token('brand-button-primary-borderWidth-rest', '1px', 'tokens/functional/components/button/border.json'),
        token('brand-color-text-default', '#000000', 'tokens/functional/colors/global.json'),
      ],
    }

    const output = JSON.parse(stylelintColors.formatter({dictionary}))

    expect(Object.keys(output)).toEqual(['--brand-color-text-default'])
  })

  it('only treats a component file named colors.(js|json) as a color source', () => {
    const dictionary = {
      allTokens: [
        token('brand-accordion-bgColor', '#fff', 'tokens/functional/components/accordion/colors.js'),
        token('brand-accordion-border', '1px', 'tokens/functional/components/accordion/colors-misc.json'),
      ],
    }

    const output = JSON.parse(stylelintColors.formatter({dictionary}))

    expect(Object.keys(output)).toEqual(['--brand-accordion-bgColor'])
  })

  it('returns valid JSON terminated by a trailing newline', () => {
    const dictionary = {
      allTokens: [token('brand-color-text-default', '#000000', 'tokens/functional/colors/global.json')],
    }

    const output = stylelintColors.formatter({dictionary})

    expect(output.endsWith('\n')).toBe(true)
    expect(() => JSON.parse(output)).not.toThrow()
  })
})
