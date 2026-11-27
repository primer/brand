import React from 'react'
import {act, render, renderHook} from '@testing-library/react'
import '../test-utils/mocks/match-media-mock'
import {BreakpointSize, useWindowSize} from './useWindowSize'

const {renderToString} = jest.requireActual<typeof import('react-dom/server')>('react-dom/server.node')

describe('useWindowSize', () => {
  const sizes = Object.values(BreakpointSize)
  const thresholds = [20, 34, 48, 63.25, 80, 87.5]
  const flags = ['isXSmall', 'isSmall', 'isMedium', 'isLarge', 'isXLarge', 'isXXLarge'] as const
  let defaultFontSize: number
  let mediaQueries: MediaQueryList[]

  beforeEach(() => {
    defaultFontSize = 16
    mediaQueries = []
    jest.replaceProperty(window, 'innerWidth', 1400)
    jest.replaceProperty(window, 'innerHeight', 900)
    jest.mocked(window.matchMedia).mockClear()
    jest.spyOn(window, 'matchMedia').mockImplementation(media => {
      const minWidth = /^\(min-width: ([\d.]+)rem\)$/.exec(media)
      if (!minWidth) throw new Error(`Unexpected media query: ${media}`)
      const target = new EventTarget()
      const query: MediaQueryList = {
        media,
        get matches() {
          return window.innerWidth >= Number(minWidth[1]) * defaultFontSize
        },
        onchange: null,
        addEventListener: jest.fn(target.addEventListener.bind(target)),
        removeEventListener: jest.fn(target.removeEventListener.bind(target)),
        dispatchEvent: target.dispatchEvent.bind(target),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }
      mediaQueries.push(query)
      return query
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it.each([16, 20, 32])('matches inclusive CSS boundaries with a %spx browser default font', fontSize => {
    defaultFontSize = fontSize
    const {result} = renderHook(useWindowSize)

    for (const threshold of thresholds) {
      for (const offset of [-1, 0, 1]) {
        const width = threshold * fontSize + offset
        act(() => {
          jest.replaceProperty(window, 'innerWidth', width)
          window.dispatchEvent(new Event('resize'))
        })
        let expectedBreakpoint = BreakpointSize.XSMALL
        for (const [index, flag] of flags.entries()) {
          const matches = width >= thresholds[index] * fontSize
          expect(result.current[flag]).toBe(matches)
          if (matches) expectedBreakpoint = sizes[index]
        }
        expect(result.current.currentBreakpointSize).toBe(expectedBreakpoint)
        expect(result.current.width).toBe(width)
        expect(result.current.height).toBe(900)
      }
    }
  })

  it('matches browser defaults rather than authored root font size at 1400px', () => {
    defaultFontSize = 20
    const originalFontSize = document.documentElement.style.fontSize
    document.documentElement.style.fontSize = '16px'
    try {
      const {result} = renderHook(useWindowSize)
      expect(result.current).toMatchObject({
        width: 1400,
        isMedium: true,
        isLarge: true,
        isXLarge: false,
        isXXLarge: false,
        currentBreakpointSize: BreakpointSize.LARGE,
      })
    } finally {
      document.documentElement.style.fontSize = originalFontSize
    }
  })

  it('updates matches on media-query change events without a resize', () => {
    const {result} = renderHook(useWindowSize)
    expect(result.current.isXLarge).toBe(true)

    act(() => {
      defaultFontSize = 20
      for (const query of mediaQueries) query.dispatchEvent(new Event('change'))
    })

    expect(result.current.isXLarge).toBe(false)
    expect(result.current.currentBreakpointSize).toBe(BreakpointSize.LARGE)
    expect(result.current.width).toBe(1400)
  })

  it('updates raw dimensions on resizes that do not cross a breakpoint', () => {
    const {result} = renderHook(useWindowSize)
    act(() => {
      jest.replaceProperty(window, 'innerWidth', 1401)
      jest.replaceProperty(window, 'innerHeight', 600)
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toMatchObject({
      width: 1401,
      height: 600,
      currentBreakpointSize: BreakpointSize.XXLARGE,
    })
  })

  it.each([
    {fontSize: 16, width: 300},
    {fontSize: 20, width: 375},
    {fontSize: 32, width: 375},
  ])('uses the smallest responsive range below xsmall with a $fontSize px browser default', ({fontSize, width}) => {
    defaultFontSize = fontSize
    jest.replaceProperty(window, 'innerWidth', width)
    const {result} = renderHook(useWindowSize)
    for (const flag of flags) expect(result.current[flag]).toBe(false)
    expect(result.current.currentBreakpointSize).toBe(BreakpointSize.XSMALL)
  })

  it('cleans up resize and media-query listeners, including StrictMode effect replay', () => {
    const addListener = jest.spyOn(window, 'addEventListener')
    const removeListener = jest.spyOn(window, 'removeEventListener')
    const {unmount} = renderHook(useWindowSize, {reactStrictMode: true})
    unmount()

    const resizeListeners = addListener.mock.calls.filter(([event]) => event === 'resize')
    expect(resizeListeners.length).toBeGreaterThan(0)
    for (const [, listener] of resizeListeners) {
      expect(removeListener).toHaveBeenCalledWith('resize', listener)
    }
    for (const query of mediaQueries) {
      for (const [event, listener] of jest.mocked(query.addEventListener).mock.calls) {
        expect(query.removeEventListener).toHaveBeenCalledWith(event, listener)
      }
    }
  })

  it('hydrates the undefined server state before reading browser dimensions and queries', () => {
    const renders: ReturnType<typeof useWindowSize>[] = []
    const Size = () => {
      const size = useWindowSize()
      renders.push(size)
      return <div>{JSON.stringify(size)}</div>
    }
    const html = renderToString(<Size />)
    expect(renders).toHaveLength(1)
    for (const value of Object.values(renders[0])) expect(value).toBeUndefined()
    expect(window.matchMedia).not.toHaveBeenCalled()
    const serverState = renders[0]
    renders.length = 0
    const container = document.createElement('div')
    container.append(...new DOMParser().parseFromString(html, 'text/html').body.childNodes)
    const onRecoverableError = jest.fn()
    render(<Size />, {container, hydrate: true, onRecoverableError})
    expect(renders[0]).toEqual(serverState)
    expect(renders.at(-1)?.width).toBe(1400)
    expect(onRecoverableError).not.toHaveBeenCalled()
  })
})
