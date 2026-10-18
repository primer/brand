import React, {useContext} from 'react'
import {renderToString} from 'react-dom/server'
import {act, render, renderHook, cleanup, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import {ColorMode, ThemeContext, ThemeProvider} from './ThemeProvider'
import {useTheme} from './useTheme'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('ThemeProvider', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  it('renders a default ThemeProvider correctly', () => {
    const mockId = 'theme-provider'
    const {getByTestId, getByRole} = render(
      <ThemeProvider data-testid={mockId}>
        <h1>mock child node</h1>
      </ThemeProvider>,
    )

    const rootEl = getByTestId(mockId)
    const childEl = getByRole('heading')

    expect(rootEl).toBeInTheDocument()
    expect(rootEl).toHaveAttribute('data-color-mode')
    expect(rootEl).not.toHaveAttribute('data-color-scheme')
    expect(childEl).toBeInTheDocument()
  })

  it('renders light mode by default', () => {
    const mockId = 'theme-provider'
    const {getByTestId} = render(<ThemeProvider data-testid={mockId} />)

    const rootEl = getByTestId(mockId)
    const expectedMode = 'light'

    expect(rootEl).toHaveAttribute('data-color-mode', expectedMode)
  })

  it('can optionally render dark mode', () => {
    const mockMode = 'dark'
    const mockId = 'theme-provider'
    const {getByTestId} = render(<ThemeProvider data-testid={mockId} colorMode={mockMode} />)

    const el = getByTestId(mockId)

    expect(el).toHaveAttribute('data-color-mode', mockMode)
  })

  it('resolves derived dark modes to the dark color mode', () => {
    const mockId = 'theme-provider'
    const {getByTestId} = render(<ThemeProvider data-testid={mockId} colorMode="dark_dimmed" />)

    const el = getByTestId(mockId)

    expect(el).toHaveAttribute('data-color-mode', 'dark')
  })

  it('resolves derived light modes to the light color mode', () => {
    const mockId = 'theme-provider'
    const {getByTestId} = render(<ThemeProvider data-testid={mockId} colorMode="light_high_contrast" />)

    const el = getByTestId(mockId)

    expect(el).toHaveAttribute('data-color-mode', 'light')
  })

  it('preserves automatic mode while resolving dark mode through context', () => {
    const matchMediaSpy = jest.spyOn(window, 'matchMedia').mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    const mockMode = 'auto'
    const wrapper = ({children}: React.PropsWithChildren) => (
      <ThemeProvider colorMode={mockMode} data-testid="automatic-theme">
        {children}
      </ThemeProvider>
    )
    const {result} = renderHook(() => useTheme(), {wrapper})

    expect(screen.getByTestId('automatic-theme')).toHaveAttribute('data-color-mode', 'auto')
    expect(result.current.colorMode).toBe('dark')
    expect(result.current.originalColorMode).toBe('auto')

    matchMediaSpy.mockRestore()
  })

  it('preserves automatic mode while resolving light mode through context', () => {
    jest.spyOn(window, 'matchMedia').mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    const mockMode = 'auto'
    const mockId = 'theme-provider'
    const {getByTestId} = render(<ThemeProvider data-testid={mockId} colorMode={mockMode} />)

    const el = getByTestId(mockId)
    const expectedMode = 'auto'

    expect(el).toHaveAttribute('data-color-mode', expectedMode)
  })

  it('supports nested ThemeProviders with derived modes', () => {
    const rootProviderId = 'root-theme-provider'
    const levelOneProviderId = 'theme-provider-1'
    const levelTwoProviderId = 'theme-provider-2'

    const {getByTestId} = render(
      <ThemeProvider data-testid={rootProviderId}>
        <ThemeProvider data-testid={levelOneProviderId} colorMode="dark_dimmed">
          <ThemeProvider data-testid={levelTwoProviderId} colorMode="light_high_contrast" />
        </ThemeProvider>
      </ThemeProvider>,
    )

    const rootProviderEl = getByTestId(rootProviderId)
    const levelOneProviderEl = getByTestId(levelOneProviderId)
    const levelTwoProviderEl = getByTestId(levelTwoProviderId)

    expect(rootProviderEl).toHaveAttribute('data-color-mode', 'light')
    expect(levelOneProviderEl).toHaveAttribute('data-color-mode', 'dark')
    expect(levelTwoProviderEl).toHaveAttribute('data-color-mode', 'light')
  })

  it('returns the resolved color mode through context', () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ThemeProvider colorMode="dark_dimmed">{children}</ThemeProvider>
    )
    const {result} = renderHook(() => useTheme(), {wrapper})

    expect(result.current.colorMode).toBe('dark')
  })

  it('preserves automatic mode and forwarding in server-rendered markup', () => {
    function ForwardedThemeProvider() {
      const {originalColorMode, colorMode} = useTheme()
      return <ThemeProvider id="forwarded" colorMode={originalColorMode ?? colorMode} />
    }

    const markup = renderToString(
      <ThemeProvider id="automatic" colorMode="auto">
        <ForwardedThemeProvider />
        <ThemeProvider id="explicit-light" colorMode="light" />
      </ThemeProvider>,
    )
    const document = new DOMParser().parseFromString(markup, 'text/html')

    for (const id of ['automatic', 'forwarded']) {
      expect(document.getElementById(id)?.getAttribute('data-color-mode')).toBe('auto')
    }
    expect(document.getElementById('explicit-light')?.getAttribute('data-color-mode')).toBe('light')
  })

  it.each(['auto', 'light', 'dark_dimmed'] as const)('returns the original %s mode through context', colorMode => {
    const wrapper = ({children}: React.PropsWithChildren) => (
      <ThemeProvider colorMode={colorMode}>{children}</ThemeProvider>
    )
    const {result} = renderHook(() => useTheme(), {wrapper})

    expect(result.current.originalColorMode).toBe(colorMode)
    expect(['light', 'dark']).toContain(result.current.colorMode)
  })

  it('uses the closest provider when reading the original mode', () => {
    const wrapper = ({children}: React.PropsWithChildren) => (
      <ThemeProvider colorMode="auto">
        <ThemeProvider colorMode="light">{children}</ThemeProvider>
      </ThemeProvider>
    )
    const {result} = renderHook(() => useTheme(), {wrapper})

    expect(result.current.originalColorMode).toBe('light')
    expect(result.current.colorMode).toBe('light')
  })

  it('keeps automatic markup when matchMedia is unavailable', () => {
    Object.defineProperty(window, 'matchMedia', {writable: true, value: undefined})
    const {getByTestId} = render(<ThemeProvider colorMode="auto" data-testid="theme" />)

    expect(getByTestId('theme')).toHaveAttribute('data-color-mode', 'auto')
  })

  it('unsubscribes when automatic mode changes or unmounts', () => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    jest.spyOn(window, 'matchMedia').mockReturnValue(preference)
    const {rerender, unmount} = render(<ThemeProvider colorMode="auto" />)
    const changeHandler = jest.mocked(preference.addEventListener).mock.calls[0][1]

    expect(preference.addEventListener).toHaveBeenCalledTimes(1)

    rerender(<ThemeProvider colorMode="light" />)

    expect(preference.removeEventListener).toHaveBeenCalledWith('change', changeHandler)

    rerender(<ThemeProvider colorMode="auto" />)
    unmount()

    expect(preference.addEventListener).toHaveBeenCalledTimes(2)
    expect(preference.removeEventListener).toHaveBeenCalledTimes(2)
  })

  it('updates the DOM mode when switching between automatic and explicit modes', () => {
    const {getByTestId, rerender} = render(<ThemeProvider data-testid="theme" colorMode="auto" />)

    expect(getByTestId('theme')).toHaveAttribute('data-color-mode', 'auto')

    rerender(<ThemeProvider data-testid="theme" colorMode="dark" />)

    expect(getByTestId('theme')).toHaveAttribute('data-color-mode', 'dark')

    rerender(<ThemeProvider data-testid="theme" colorMode="auto" />)

    expect(getByTestId('theme')).toHaveAttribute('data-color-mode', 'auto')
  })

  it('updates nested providers when the system preference changes', () => {
    const changeHandlers = new Set<EventListener>()

    jest.spyOn(window, 'matchMedia').mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn((_, handler) => {
        if (typeof handler === 'function') {
          changeHandlers.add(handler)
        }
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    const NestedThemeProvider = () => {
      const {originalColorMode, colorMode} = useTheme()
      return (
        <>
          <output data-testid="resolved-mode">{colorMode}</output>
          <ThemeProvider data-testid="nested-theme-provider" colorMode={originalColorMode ?? colorMode} />
        </>
      )
    }

    const {getByTestId} = render(
      <ThemeProvider data-testid="theme-provider" colorMode="auto">
        <NestedThemeProvider />
      </ThemeProvider>,
    )

    expect(getByTestId('theme-provider')).toHaveAttribute('data-color-mode', 'auto')
    expect(getByTestId('nested-theme-provider')).toHaveAttribute('data-color-mode', 'auto')
    expect(getByTestId('resolved-mode')).toHaveTextContent('light')

    act(() => {
      for (const changeHandler of changeHandlers) changeHandler({matches: true} as MediaQueryListEvent)
    })

    expect(getByTestId('theme-provider')).toHaveAttribute('data-color-mode', 'auto')
    expect(getByTestId('nested-theme-provider')).toHaveAttribute('data-color-mode', 'auto')
    expect(getByTestId('resolved-mode')).toHaveTextContent('dark')

    act(() => {
      for (const changeHandler of changeHandlers) changeHandler({matches: false} as MediaQueryListEvent)
    })

    expect(getByTestId('resolved-mode')).toHaveTextContent('light')
  })

  it('returns all available modes via context', () => {
    const {result} = renderHook(() => useContext(ThemeContext))

    const expectedResult = ['light', 'dark', 'auto']

    expect(result.current.availableColorModes).toStrictEqual(expectedResult)
  })

  it('adapts to changes in theme state via props', () => {
    const mockId = 'theme-provider'
    const MockComponent = ({mode}: {mode: ColorMode}) => {
      return <ThemeProvider data-testid={mockId} colorMode={mode} />
    }

    const {getByTestId, rerender} = render(<MockComponent mode={'light'} />)

    expect(getByTestId(mockId)).toHaveAttribute('data-color-mode', 'light')

    rerender(<MockComponent mode={'dark'} />)

    expect(getByTestId(mockId)).toHaveAttribute('data-color-mode', 'dark')
  })

  test('no a11y violations', async () => {
    const {container} = render(<ThemeProvider />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
