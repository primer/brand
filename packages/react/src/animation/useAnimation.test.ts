import {renderHook} from '@testing-library/react'
import {useAnimation} from './useAnimation'

describe('useAnimation', () => {
  it('returns empty classes and styles when animateProps is undefined', () => {
    const {result} = renderHook(() => useAnimation())
    expect(result.current.classes).toBe('')
    expect(result.current.styles).toEqual({})
  })

  it('returns animation classes and styles when animateProps is defined as an object', () => {
    const {result} = renderHook(() =>
      useAnimation({
        variant: 'fade-in',
        delay: 100,
        duration: 100,
        ease: 'ease-in-out',
      }),
    )

    expect(result.current.classes).toContain('Animation')
    expect(result.current.classes).toContain('Animation--fade-in')
    expect(result.current.styles).toMatchObject({
      transitionDelay: '100ms',
      transitionDuration: '100ms',
      transitionTimingFunction: 'ease-in-out',
    })
  })

  it('returns animation classes when animateProps is defined as a string', () => {
    const {result} = renderHook(() => useAnimation('fade-in'))

    expect(result.current.classes).toContain('Animation')
    expect(result.current.classes).toContain('Animation--fade-in')
    expect(result.current.styles).toMatchObject({})
  })
})
