const {describe, it, expect} = require('@jest/globals')
const oneDimensional = require('./json-one-dimensional')

const token = (name, value) => ({name, value, isSource: true})

describe('json/one-dimensional format', () => {
  it('is registered under the expected name', () => {
    expect(oneDimensional.name).toBe('json/one-dimensional')
  })

  it('emits a flat map of custom-property name to literal value', () => {
    const dictionary = {
      allTokens: [
        token('base-color-scale-black-0', '#000000'),
        token('brand-color-text-default', 'var(--base-color-scale-black-0)'),
      ],
    }

    const output = JSON.parse(oneDimensional.formatter({dictionary}))

    expect(output).toEqual({
      '--base-color-scale-black-0': '#000000',
      '--brand-color-text-default': 'var(--base-color-scale-black-0)',
    })
  })

  it('keeps references as-is and does not annotate entries', () => {
    const dictionary = {
      allTokens: [token('brand-color-text-default', 'var(--base-color-scale-black-0)')],
    }

    const output = JSON.parse(oneDimensional.formatter({dictionary}))

    expect(output['--brand-color-text-default']).toBe('var(--base-color-scale-black-0)')
  })

  it('sorts keys alphabetically', () => {
    const dictionary = {
      allTokens: [token('brand-z-token', '#fff'), token('brand-a-token', '#000'), token('brand-m-token', '#888')],
    }

    const output = JSON.parse(oneDimensional.formatter({dictionary}))

    expect(Object.keys(output)).toEqual(['--brand-a-token', '--brand-m-token', '--brand-z-token'])
  })

  it('returns valid JSON terminated by a trailing newline', () => {
    const dictionary = {
      allTokens: [token('brand-color-text-default', '#000000')],
    }

    const output = oneDimensional.formatter({dictionary})

    expect(output.endsWith('\n')).toBe(true)
    expect(() => JSON.parse(output)).not.toThrow()
  })
})
