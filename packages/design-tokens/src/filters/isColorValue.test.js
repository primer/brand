const {describe, it, expect} = require('@jest/globals')
const isColorValue = require('./isColorValue')

describe('isColorValue', () => {
  it('keeps hex colors', () => {
    expect(isColorValue('#000000')).toBe(true)
    expect(isColorValue('#D8DEE480')).toBe(true)
  })

  it('keeps rgb / rgba colors', () => {
    expect(isColorValue('rgb(0, 0, 0)')).toBe(true)
    expect(isColorValue('rgba(0, 0, 0, 0.06)')).toBe(true)
  })

  it('keeps hsl / hsla colors', () => {
    expect(isColorValue('hsl(120, 50%, 50%)')).toBe(true)
    expect(isColorValue('hsla(120, 50%, 50%, 0.5)')).toBe(true)
  })

  it('keeps color-mix values', () => {
    expect(isColorValue('color-mix(in srgb, var(--base-color-scale-green-6), #000 16%)')).toBe(true)
  })

  it('keeps var() references', () => {
    expect(isColorValue('var(--base-color-scale-green-6)')).toBe(true)
  })

  it('keeps the transparent and currentColor keywords regardless of casing', () => {
    expect(isColorValue('transparent')).toBe(true)
    expect(isColorValue('currentColor')).toBe(true)
    expect(isColorValue('  TRANSPARENT  ')).toBe(true)
  })

  it('excludes gradients', () => {
    expect(isColorValue('linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), #1a7f37')).toBe(false)
  })

  it('excludes box-shadow strings', () => {
    expect(isColorValue('0px 100px 80px rgba(0, 0, 0, 0.01), 0px 41px 33px rgba(0, 0, 0, 0.02)')).toBe(false)
    expect(isColorValue('0 4px 10px 0 rgba(0, 0, 0, 0.02)')).toBe(false)
  })

  it('excludes filter functions', () => {
    expect(isColorValue('brightness(0) saturate(100%) invert(37%)')).toBe(false)
    expect(isColorValue('brightness(2)')).toBe(false)
  })

  it('excludes the none keyword', () => {
    expect(isColorValue('none')).toBe(false)
  })

  it('excludes non-string values', () => {
    expect(isColorValue(undefined)).toBe(false)
    expect(isColorValue(null)).toBe(false)
    expect(isColorValue(4)).toBe(false)
  })
})
