import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Animate} from './Animate'
import {useAnimation} from '../useAnimation'

expect.extend(toHaveNoViolations)

jest.mock('../useAnimation')
const mockUseAnimation = jest.mocked(useAnimation)

describe('Animate', () => {
  beforeEach(() => {
    mockUseAnimation.mockReturnValue({
      classes: 'mock-animation-class',
      styles: {transitionDuration: '300ms'},
    })
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Animate>Test content</Animate>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders children correctly', () => {
    const {getByText} = render(<Animate>Test content</Animate>)

    expect(getByText('Test content')).toBeInTheDocument()
  })

  it('renders multiple children correctly', () => {
    const {getByText} = render(
      <Animate>
        <span>Child 1</span>
        <div>Child 2</div>
        Test text
      </Animate>,
    )

    expect(getByText('Child 1')).toBeInTheDocument()
    expect(getByText('Child 2')).toBeInTheDocument()
    expect(getByText('Test text')).toBeInTheDocument()
  })

  it.each(['div', 'span', 'section'] as const)('renders as %s element when specified with as prop', element => {
    const {container} = render(<Animate as={element}>Content</Animate>)
    expect(container.firstChild?.nodeName).toBe(element.toUpperCase())
  })

  it('falls back to div when invalid as prop is provided', () => {
    // @ts-expect-error Testing invalid prop
    const {container} = render(<Animate as="invalid">Content</Animate>)

    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('applies animation classes from useAnimation hook', () => {
    mockUseAnimation.mockReturnValue({
      classes: 'animation-fade-in animation-active',
      styles: {},
    })

    const {container} = render(<Animate animate="fade-in">Content</Animate>)

    expect(container.firstChild).toHaveClass('animation-fade-in', 'animation-active')
  })

  it('merges custom className with animation classes', () => {
    mockUseAnimation.mockReturnValue({
      classes: 'animation-slide-up',
      styles: {},
    })

    const {container} = render(
      <Animate animate="slide-in-up" className="custom-class">
        Content
      </Animate>,
    )

    expect(container.firstChild).toHaveClass('animation-slide-up', 'custom-class')
  })

  it('applies animation styles from useAnimation hook', () => {
    mockUseAnimation.mockReturnValue({
      classes: '',
      styles: {
        transitionDuration: '500ms',
        transitionDelay: '200ms',
      },
    })

    const {container} = render(<Animate animate="fade-in">Content</Animate>)
    const element = container.firstChild as HTMLElement

    expect(element.style.transitionDuration).toBe('500ms')
    expect(element.style.transitionDelay).toBe('200ms')
  })

  it('merges custom styles with animation styles, with custom styles taking precedence', () => {
    mockUseAnimation.mockReturnValue({
      classes: '',
      styles: {
        transitionDuration: '300ms',
        opacity: '0',
      },
    })

    const customStyles = {
      transitionDuration: '600ms',
      backgroundColor: 'red',
    }

    const {container} = render(
      <Animate animate="fade-in" style={customStyles}>
        Content
      </Animate>,
    )
    const element = container.firstChild as HTMLElement

    expect(element.style.transitionDuration).toBe('600ms') // Custom style overrides
    expect(element.style.backgroundColor).toBe('red') // Custom style applied
    expect(element.style.opacity).toBe('0') // Animation style preserved
  })

  it('forwards HTML attributes to the rendered element', () => {
    const {container} = render(
      <Animate data-testid="animate-element" id="test-id" aria-label="Test label">
        Content
      </Animate>,
    )
    const element = container.firstChild as HTMLElement

    expect(element).toHaveAttribute('data-testid', 'animate-element')
    expect(element).toHaveAttribute('id', 'test-id')
    expect(element).toHaveAttribute('aria-label', 'Test label')
  })

  it('works correctly when no animate prop is provided', () => {
    mockUseAnimation.mockReturnValue({
      classes: '',
      styles: {},
    })

    const {container, getByText} = render(<Animate>Content without animation</Animate>)

    expect(getByText('Content without animation')).toBeInTheDocument()
    expect(container.firstChild?.nodeName).toBe('DIV')
    expect(mockUseAnimation).toHaveBeenCalledWith(undefined)
  })

  it('calls useAnimation hook with correct animate prop', () => {
    const animateProps = {
      variant: 'fade-in' as const,
      duration: 500,
      delay: 200,
    }

    render(<Animate animate={animateProps}>Content</Animate>)

    expect(mockUseAnimation).toHaveBeenCalledWith(animateProps)
  })

  it('calls useAnimation hook with string animate prop', () => {
    render(<Animate animate="slide-in-up">Content</Animate>)

    expect(mockUseAnimation).toHaveBeenCalledWith('slide-in-up')
  })

  it('handles empty children', () => {
    const {container} = render(<Animate></Animate>)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.nodeName).toBe('DIV')
  })
})
