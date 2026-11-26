const {describe, it, expect} = require('@jest/globals')
const oneDimensional = require('./json-one-dimensional')

const token = (name, value) => ({name, value, isSource: true})

describe('json/one-dimensional format', () => {
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

  it('sorts keys alphabetically', () => {
    const dictionary = {
      allTokens: [token('brand-z-token', '#fff'), token('brand-a-token', '#000'), token('brand-m-token', '#888')],
    }

    const output = JSON.parse(oneDimensional.formatter({dictionary}))

    expect(Object.keys(output)).toEqual(['--brand-a-token', '--brand-m-token', '--brand-z-token'])
  })

  it('optionally exports light/dark references and falls back to light for invariant tokens', () => {
    const dictionary = {
      allTokens: [
        {...token('brand-color-text-default', 'var(--base-black)'), dark: 'var(--base-white)'},
        token('base-black', '#000000'),
      ],
    }

    expect(JSON.parse(oneDimensional.formatter({dictionary, options: {colorModes: true}}))).toEqual({
      '--base-black': {light: '#000000', dark: '#000000'},
      '--brand-color-text-default': {light: 'var(--base-black)', dark: 'var(--base-white)'},
    })
  })

  it('terminates the output with a trailing newline', () => {
    const dictionary = {
      allTokens: [token('brand-color-text-default', '#000000')],
    }

    const output = oneDimensional.formatter({dictionary})

    expect(output.endsWith('\n')).toBe(true)
  })

  it('can preserve original dimension references in each mode instead of flattened transformed values', () => {
    const dictionary = {
      allTokens: [
        {...token('base-size-4', '0.25rem'), path: ['base', 'size', '4'], original: {$value: '4px'}},
        {...token('base-size-8', '0.5rem'), path: ['base', 'size', '8'], original: {$value: '8px'}},
        {
          ...token('brand-borderRadius-small', '0.25rem'),
          path: ['borderRadius', 'small'],
          dark: '0.5rem',
          original: {value: '{base.size.4}', dark: '{base.size.8}'},
        },
        {
          ...token('brand-borderInset-small', 'inset 0 0 0 0.25rem'),
          path: ['borderInset', 'small'],
          original: {value: 'inset 0 0 0 {borderRadius.small}'},
        },
      ],
    }
    const options = {colorModes: true, preserveReferences: true}
    expect(JSON.parse(oneDimensional.formatter({dictionary, options}))).toEqual({
      '--base-size-4': {light: '4px', dark: '4px'},
      '--base-size-8': {light: '8px', dark: '8px'},
      '--brand-borderInset-small': {
        light: 'inset 0 0 0 var(--brand-borderRadius-small)',
        dark: 'inset 0 0 0 var(--brand-borderRadius-small)',
      },
      '--brand-borderRadius-small': {light: 'var(--base-size-4)', dark: 'var(--base-size-8)'},
    })
    dictionary.allTokens[0].original.$value = '{missing.token}'
    expect(() => oneDimensional.formatter({dictionary, options})).toThrow(/Missing exported reference/)
  })

  it('exports responsive originals with ordered, cascading overrides and preserved references', () => {
    const dictionary = {
      allTokens: [
        {
          ...token('brand-size', '2rem'),
          path: ['size'],
          original: {
            value: '{base.size}',
            responsive: {'1012px': {value: '64px'}, '768px': {value: '56px'}},
          },
        },
        {
          ...token('base-size', '2rem'),
          path: ['base', 'size'],
          original: {value: '40px', responsive: {'768px': {value: '48px'}}},
        },
      ],
    }
    const options = {preserveReferences: true, responsiveModes: {narrow: 0, medium: 768, large: 1012}}
    expect(JSON.parse(oneDimensional.formatter({dictionary, options}))).toEqual({
      '--base-size': {narrow: '40px', medium: '48px', large: '48px'},
      '--brand-size': {narrow: 'var(--base-size)', medium: '56px', large: '64px'},
    })
    dictionary.allTokens[0].original.responsive['80rem'] = {value: '100px'}
    expect(() => oneDimensional.formatter({dictionary, options})).toThrow(/Unsupported responsive breakpoint/)
  })
})
