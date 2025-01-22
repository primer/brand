import React, {useContext} from 'react'
import {render, renderHook, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {ColorMode, ThemeContext, ThemeProvider} from './ThemeProvider'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('ThemeProvider', () => {
  beforeAll(() => {
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
    jest.clearAllMocks()
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

  it('can optionally render dark color scheme in auto mode', () => {
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
    const mockId = 'theme-provider'
    const {getByTestId} = render(<ThemeProvider data-testid={mockId} colorMode={mockMode} />)

    const el = getByTestId(mockId)
    const expectedMode = 'dark'

    expect(el).toHaveAttribute('data-color-mode', expectedMode)

    matchMediaSpy.mockRestore()
  })

  it('can optionally render light color scheme in auto mode', () => {
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
    const expectedMode = 'light'

    expect(el).toHaveAttribute('data-color-mode', expectedMode)
  })

  it('supports nested ThemeProviders', () => {
    const rootProviderId = 'root-theme-provider'
    const levelOneProviderId = 'theme-provider-1'
    const levelTwoProviderId = 'theme-provider-2'

    const {getByTestId} = render(
      <ThemeProvider data-testid={rootProviderId}>
        <ThemeProvider data-testid={levelOneProviderId} colorMode="dark">
          <ThemeProvider data-testid={levelTwoProviderId} colorMode="light" />
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
