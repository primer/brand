import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {TextCursorAnimation, testIds} from './TextCursorAnimation'

expect.extend(toHaveNoViolations)

describe('TextCursorAnimation', () => {
  const mockText = 'Hello world'

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })
  })

  afterEach(cleanup)

  it('has no a11y violations on initial render', async () => {
    const {container} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const {getByTestId, getByText} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)

    expect(getByTestId(testIds.root)).toBeInTheDocument()
    expect(getByText(mockText)).toBeInTheDocument()
  })

  it('renders with a custom test id', () => {
    const customTestId = 'custom-test-id'
    const {getByTestId} = render(<TextCursorAnimation data-testid={customTestId}>{mockText}</TextCursorAnimation>)

    expect(getByTestId(customTestId)).toBeInTheDocument()
  })

  it('renders the cursor element', () => {
    const {getByTestId} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)

    expect(getByTestId(testIds.cursor)).toBeInTheDocument()
  })

  it('cursor has aria-hidden attribute for accessibility', () => {
    const {getByTestId} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)

    expect(getByTestId(testIds.cursor)).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    const {getByTestId} = render(<TextCursorAnimation className={customClass}>{mockText}</TextCursorAnimation>)

    expect(getByTestId(testIds.root)).toHaveClass(customClass)
  })

  it('renders non-string children correctly', () => {
    const {getByText} = render(
      <TextCursorAnimation>
        <span>Nested content</span>
      </TextCursorAnimation>,
    )

    expect(getByText('Nested content')).toBeInTheDocument()
  })

  it('renders with the muted variant by default', () => {
    const {getByText} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)
    const textEl = getByText(mockText)

    expect(textEl).toHaveClass('Text--muted')
  })

  it('optionally renders with higher contrast text color', () => {
    const {getByText} = render(<TextCursorAnimation variant="default">{mockText}</TextCursorAnimation>)
    const textEl = getByText(mockText)

    expect(textEl).toHaveClass('Text--default')
  })

  it('animation is disabled by default, with cursor at final position', () => {
    const {container} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)
    const innerSpan = container.querySelector('.TextCursorAnimation-inner')

    expect(innerSpan).toHaveStyle({'--brand-TextCursorAnimation-reveal-progress': '1'})
    expect(innerSpan).toHaveStyle({'--brand-TextCursorAnimation-cursor-progress': '1'})
  })

  it('cursor is at final position when animate is false', () => {
    const {container} = render(<TextCursorAnimation animate={false}>{mockText}</TextCursorAnimation>)
    const innerSpan = container.querySelector('.TextCursorAnimation-inner')

    expect(innerSpan).toHaveStyle({'--brand-TextCursorAnimation-reveal-progress': '1'})
    expect(innerSpan).toHaveStyle({'--brand-TextCursorAnimation-cursor-progress': '1'})
  })

  it('cursor is at final position when children is not a string', () => {
    const {container} = render(
      <TextCursorAnimation animate={true}>
        <span>Non-string child</span>
      </TextCursorAnimation>,
    )
    const innerSpan = container.querySelector('.TextCursorAnimation-inner')

    expect(innerSpan).toHaveStyle({'--brand-TextCursorAnimation-reveal-progress': '1'})
    expect(innerSpan).toHaveStyle({'--brand-TextCursorAnimation-cursor-progress': '1'})
  })

  it('renders with monospace font', () => {
    const {getByText} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)
    const textEl = getByText(mockText)

    expect(textEl).toHaveClass('Text-font--monospace')
  })

  it('uses size 100 for the Text component', () => {
    const {getByText} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)
    const textEl = getByText(mockText)

    expect(textEl).toHaveClass('Text--100')
  })
})
