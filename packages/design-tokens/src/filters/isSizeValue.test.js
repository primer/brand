const {describe, it, expect} = require('@jest/globals')
const isSizeValue = require('./isSizeValue')

describe('isSizeValue', () => {
  it('keeps bare length values', () => {
    expect(isSizeValue('2px')).toBe(true)
    expect(isSizeValue('0.125rem')).toBe(true)
    expect(isSizeValue('624.9375rem')).toBe(true)
    expect(isSizeValue('-0.035em')).toBe(true)
    expect(isSizeValue('20rem')).toBe(true)
  })

  it('keeps viewport length units', () => {
    expect(isSizeValue('100vh')).toBe(true)
    expect(isSizeValue('50vw')).toBe(true)
    expect(isSizeValue('2ch')).toBe(true)
  })

  it('keeps math functions', () => {
    expect(isSizeValue('max(1px, 0.0625rem)')).toBe(true)
    expect(isSizeValue('min(2px, 0.125rem)')).toBe(true)
    expect(isSizeValue('clamp(1rem, 2vw, 3rem)')).toBe(true)
    expect(isSizeValue('calc(48rem - 0.02px)')).toBe(true)
  })

  it('excludes unresolved var() references', () => {
    expect(isSizeValue('var(--base-size-16)')).toBe(false)
    expect(isSizeValue('var(--brand-borderWidth-thin)')).toBe(false)
    expect(isSizeValue('var(--brand-animation-easing-glide)')).toBe(false)
    expect(isSizeValue('var(--brand-animation-duration-default)')).toBe(false)
  })

  it('excludes color values', () => {
    expect(isSizeValue('#000000')).toBe(false)
    expect(isSizeValue('rgb(0, 0, 0)')).toBe(false)
    expect(isSizeValue('var(--brand-color-text-default)')).toBe(false)
  })

  it('excludes time values', () => {
    expect(isSizeValue('80ms')).toBe(false)
    expect(isSizeValue('0.6s')).toBe(false)
  })

  it('excludes easing functions', () => {
    expect(isSizeValue('cubic-bezier(0.16, 1, 0.3, 1)')).toBe(false)
  })

  it('excludes inset composites', () => {
    expect(isSizeValue('inset 0 0 0 var(--brand-borderWidth-thin)')).toBe(false)
  })

  it('excludes media-query ranges', () => {
    expect(isSizeValue('(max-width: calc(48rem - 0.02px))')).toBe(false)
    expect(isSizeValue('(orientation: portrait)')).toBe(false)
  })

  it('excludes unitless and keyword values', () => {
    expect(isSizeValue('0')).toBe(false)
    expect(isSizeValue('1.5')).toBe(false)
    expect(isSizeValue('none')).toBe(false)
  })

  it('excludes non-string values', () => {
    expect(isSizeValue(undefined)).toBe(false)
    expect(isSizeValue(null)).toBe(false)
    expect(isSizeValue(4)).toBe(false)
  })
})
