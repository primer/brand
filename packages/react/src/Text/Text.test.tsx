import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Text, TextWeights} from './Text'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Text', () => {
  const mockText = 'This is mock text'

  afterEach(cleanup)

  test('renders correctly into the document', () => {
    const {getByText} = render(<Text>{mockText}</Text>)
    const textEl = getByText(mockText)

    expect(textEl).toBeInTheDocument()
  })

  test('no a11y violations', async () => {
    const {container} = render(<Text>{mockText}</Text>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  test('renders default tag correctly', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(<Text data-testid={mockId}>{mockText}</Text>)
    const el = getByTestId(mockId)

    expect(el.tagName).toBe('SPAN')
  })

  test('renders <p> tag correctly', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <Text as="p" data-testid={mockId}>
        {mockText}
      </Text>,
    )
    const el = getByTestId(mockId)

    expect(el.tagName).toBe('P')
  })

  test('renders <div> tag correctly', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <Text as="div" data-testid={mockId}>
        {mockText}
      </Text>,
    )
    const el = getByTestId(mockId)

    expect(el.tagName).toBe('DIV')
  })

  test('renders <strong> tag correctly', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <Text as="strong" data-testid={mockId}>
        {mockText}
      </Text>,
    )
    const el = getByTestId(mockId)

    expect(el.tagName).toBe('STRONG')
  })

  test('applies the correct default size', () => {
    const mockId = 'mock-id'
    const expectedDefaultSize = '200'
    const {getByTestId} = render(
      <Text as="div" data-testid={mockId}>
        {mockText}
      </Text>,
    )
    const el = getByTestId(mockId)

    expect(el.classList).toContain(`Text--${expectedDefaultSize}`)
  })

  test('applies an optional, alternative size', () => {
    const mockId = 'mock-id'
    const expectedAlternativeSize = '300'
    const {getByTestId} = render(
      <Text as="div" data-testid={mockId} size={expectedAlternativeSize}>
        {mockText}
      </Text>,
    )
    const el = getByTestId(mockId)

    expect(el.classList).toContain(`Text--${expectedAlternativeSize}`)
  })

  test('applies the correct default appearance', () => {
    const mockId = 'mock-id'
    const expectedDefaultApperance = 'default'
    const {getByTestId} = render(
      <Text as="div" data-testid={mockId}>
        {mockText}
      </Text>,
    )
    const el = getByTestId(mockId)

    expect(el.classList).toContain(`Text--${expectedDefaultApperance}`)
  })

  test('applies an optional, alternative variant', () => {
    const mockId = 'mock-id'
    const expectedAlternativeVariant = 'muted'
    const {getByTestId} = render(
      <Text as="div" data-testid={mockId} variant={expectedAlternativeVariant}>
        {mockText}
      </Text>,
    )
    const el = getByTestId(mockId)

    expect(el.classList).toContain(`Text--${expectedAlternativeVariant}`)
  })

  it('can render body text in different fixed font weights', () => {
    const expectedClass = 'Text--weight-'

    for (const weight of TextWeights) {
      const {getByText} = render(
        <Text as="p" weight={weight}>
          {weight}
        </Text>,
      )
      const textEl = getByText(weight)

      expect(textEl.classList).toContain(expectedClass + weight)
    }
  })

  it('can render body text in different responsive font weights', () => {
    const supportedViewports = ['narrow', 'regular', 'wide']

    for (const breakpoint of supportedViewports) {
      const expectedClass = `Text-${breakpoint}--weight-`

      for (const weight of TextWeights) {
        const {getByTestId} = render(
          <Text
            data-testid={`text-${breakpoint}-${weight}`}
            as="p"
            weight={{
              [breakpoint]: weight,
            }}
          >
            {weight}
          </Text>,
        )
        const textEl = getByTestId(`text-${breakpoint}-${weight}`)

        expect(textEl.classList).toContain(expectedClass + weight)
      }
    }
  })
  it('should not apply antialiasing when disabled', () => {
    const mockId = 'mock-id'
    const {getByText} = render(
      <Text data-testid={mockId} weight="light" antialiasing={false}>
        AA disabled
      </Text>,
    )
    const el = getByText('AA disabled')
    expect(el).not.toHaveClass('Text--antialiased')
  })

  it('should not apply antialiasing for light weight and small sizes', () => {
    const {getByText} = render(
      <>
        <Text weight="light" size="100">
          light 100
        </Text>
        <Text weight="light" size="200">
          light 200
        </Text>
        <Text weight="extralight" size="100">
          extralight 100
        </Text>
        <Text weight="extralight" size="200">
          extralight 200
        </Text>
      </>,
    )

    expect(getByText('light 100')).not.toHaveClass('Text--antialiased')
    expect(getByText('light 200')).not.toHaveClass('Text--antialiased')
    expect(getByText('extralight 100')).not.toHaveClass('Text--antialiased')
    expect(getByText('extralight 200')).not.toHaveClass('Text--antialiased')
  })

  it('should not apply antialiasing for size 100', () => {
    const {getByText} = render(<Text size="100">size 100</Text>)
    expect(getByText('size 100')).not.toHaveClass('Text--antialiased')
  })

  it('should apply antialiasing by default for other combinations', () => {
    const {getByText} = render(
      <Text size="300" weight="medium">
        medium 300
      </Text>,
    )
    expect(getByText('medium 300')).toHaveClass('Text--antialiased')
  })
})
