import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Text} from './Text'
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
      </Text>
    )
    const el = getByTestId(mockId)

    expect(el.tagName).toBe('P')
  })

  test('renders <div> tag correctly', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <Text as="div" data-testid={mockId}>
        {mockText}
      </Text>
    )
    const el = getByTestId(mockId)

    expect(el.tagName).toBe('DIV')
  })

  test('applies the correct default size', () => {
    const mockId = 'mock-id'
    const expectedDefaultSize = '400'
    const {getByTestId} = render(
      <Text as="div" data-testid={mockId}>
        {mockText}
      </Text>
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
      </Text>
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
      </Text>
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
      </Text>
    )
    const el = getByTestId(mockId)

    expect(el.classList).toContain(`Text--${expectedAlternativeVariant}`)
  })
})
