import React from 'react'
import {render, cleanup, act} from '@testing-library/react'
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

  afterEach(() => {
    cleanup()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('has no a11y violations on initial render', async () => {
    const {container} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('has no a11y violations while animated', async () => {
    const {container} = render(
      <TextCursorAnimation animate delay={10000} waitForPageLoad={false}>
        {mockText}
      </TextCursorAnimation>,
    )
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

  it('animation is disabled by default, with cursor in the complete phase', () => {
    const {getByTestId} = render(<TextCursorAnimation>{mockText}</TextCursorAnimation>)

    expect(getByTestId(testIds.text)).toHaveTextContent(mockText)
    expect(getByTestId(testIds.cursor)).not.toHaveClass('TextCursorAnimation__cursor--animated')
    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--complete')
  })

  it('types the final text once without a correction by default', () => {
    jest.useFakeTimers()
    jest.spyOn(performance, 'now').mockReturnValue(0)

    let nextFrame: FrameRequestCallback | undefined
    let animationFrameId = 0
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      nextFrame = callback
      animationFrameId += 1
      return animationFrameId
    })

    const {getByTestId} = render(
      <TextCursorAnimation animate delay={0} waitForPageLoad={false}>
        {mockText}
      </TextCursorAnimation>,
    )

    act(() => jest.runOnlyPendingTimers())
    act(() => nextFrame?.(100))

    expect(getByTestId(testIds.text)).toHaveTextContent('Hel=')
    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--animated')
    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--initial')

    act(() => nextFrame?.(250))

    expect(getByTestId(testIds.text)).toHaveTextContent('Hello wo%')
    expect(getByTestId(testIds.cursor)).not.toHaveClass('TextCursorAnimation__cursor--correction')

    act(() => nextFrame?.(500))

    expect(getByTestId(testIds.text)).toHaveTextContent(mockText)
    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--complete')
  })

  it('corrects initialText before typing the final text', () => {
    jest.useFakeTimers()
    jest.spyOn(performance, 'now').mockReturnValue(0)

    let nextFrame: FrameRequestCallback | undefined
    let animationFrameId = 0
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      nextFrame = callback
      animationFrameId += 1
      return animationFrameId
    })

    const {getByTestId} = render(
      <TextCursorAnimation animate initialText="Hello there" delay={0} waitForPageLoad={false}>
        {mockText}
      </TextCursorAnimation>,
    )

    act(() => jest.runOnlyPendingTimers())
    act(() => nextFrame?.(500))

    expect(getByTestId(testIds.text)).toHaveTextContent('Hello there')
    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--initial')

    act(() => nextFrame?.(700))

    expect(getByTestId(testIds.text)).toHaveTextContent('Hello ther')
    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--correction')

    act(() => nextFrame?.(850))

    expect(getByTestId(testIds.text)).toHaveTextContent('Hello w')
    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--correction')

    act(() => nextFrame?.(900))

    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--final')

    act(() => nextFrame?.(1000))

    expect(getByTestId(testIds.text)).toHaveTextContent(mockText)
    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--complete')
  })

  it('cancels an in-progress animation when unmounted', () => {
    jest.useFakeTimers()
    jest.spyOn(performance, 'now').mockReturnValue(0)

    let nextFrame: FrameRequestCallback | undefined
    let animationFrameId = 0
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      nextFrame = callback
      animationFrameId += 1
      return animationFrameId
    })
    const cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame')

    const {unmount} = render(
      <TextCursorAnimation animate delay={0} waitForPageLoad={false}>
        {mockText}
      </TextCursorAnimation>,
    )

    act(() => jest.runOnlyPendingTimers())
    act(() => nextFrame?.(100))
    unmount()

    expect(cancelAnimationFrame).toHaveBeenCalledWith(2)
  })

  it('renders the completed state when reduced motion is preferred', () => {
    jest.spyOn(window, 'matchMedia').mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))

    const {getByTestId} = render(<TextCursorAnimation animate>{mockText}</TextCursorAnimation>)

    expect(getByTestId(testIds.text)).toHaveTextContent(mockText)
    expect(getByTestId(testIds.cursor)).toHaveClass('TextCursorAnimation__cursor--complete')
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
