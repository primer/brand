import React from 'react'
import {act, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {axe} from 'jest-axe'
import {CarouselPagination} from './CarouselPagination'

describe('CarouselPagination', () => {
  it('uses zero-based selection and preserves focus when reaching a boundary', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const {getByRole, rerender} = render(
      <CarouselPagination aria-label="Choose item" itemCount={3} activeIndex={1} onChange={onChange} />,
    )
    const next = getByRole('button', {name: 'Next item'})
    act(() => next.focus())
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(2)
    expect(getByRole('button', {name: 'Go to item 2'})).toHaveAttribute('aria-current', 'true')
    expect(getByRole('button', {name: 'Go to item 3'})).not.toHaveAttribute('aria-current')

    rerender(<CarouselPagination aria-label="Choose item" itemCount={3} activeIndex={2} onChange={onChange} />)
    expect(getByRole('button', {name: 'Go to item 3'})).toHaveAttribute('aria-current', 'true')
    expect(getByRole('button', {name: 'Next item'})).toBe(next)
    expect(next).toHaveFocus()
    expect(next).toHaveAttribute('aria-disabled', 'true')
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledTimes(1)
    await user.click(getByRole('button', {name: 'Go to item 1'}))
    expect(onChange).toHaveBeenLastCalledWith(0)
  })

  it('does not activate unavailable previous controls or the current item', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const {getByRole} = render(
      <CarouselPagination aria-label="Choose item" itemCount={3} activeIndex={0} onChange={onChange} />,
    )
    await user.click(getByRole('button', {name: 'Previous item'}))
    await user.click(getByRole('button', {name: 'Go to item 1'}))
    expect(onChange).not.toHaveBeenCalled()
    expect(getByRole('button', {name: 'Go to item 1'})).toHaveAttribute('aria-current', 'true')
  })

  it('reserves strip width from the item count rather than the active transition', () => {
    const {getByRole, rerender} = render(
      <CarouselPagination aria-label="Choose item" itemCount={5} activeIndex={0} onChange={jest.fn()} />,
    )
    const indicators = getByRole('button', {name: 'Go to item 1'}).parentElement as HTMLDivElement
    expect(indicators.style.getPropertyValue('--carousel-pagination-item-count')).toBe('5')

    rerender(<CarouselPagination aria-label="Choose item" itemCount={5} activeIndex={3} onChange={jest.fn()} />)
    expect(indicators.style.getPropertyValue('--carousel-pagination-item-count')).toBe('5')

    rerender(<CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={3} onChange={jest.fn()} />)
    expect(indicators.style.getPropertyValue('--carousel-pagination-item-count')).toBe('30')
  })

  it('loops only when requested', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const {getByRole, rerender} = render(
      <CarouselPagination aria-label="Choose item" itemCount={3} activeIndex={0} loop onChange={onChange} />,
    )
    await user.click(getByRole('button', {name: 'Previous item'}))
    expect(onChange).toHaveBeenLastCalledWith(2)
    rerender(<CarouselPagination aria-label="Choose item" itemCount={3} activeIndex={2} loop onChange={onChange} />)
    await user.click(getByRole('button', {name: 'Next item'}))
    expect(onChange).toHaveBeenLastCalledWith(0)
  })

  it.each([0, 1, -1, 1.5, NaN])('renders no controls for itemCount=%s', itemCount => {
    const {container} = render(
      <CarouselPagination aria-label="Choose item" itemCount={itemCount} activeIndex={0} onChange={jest.fn()} />,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('normalizes out-of-range active indexes without emitting invalid targets', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const {getByRole, rerender} = render(
      <CarouselPagination aria-label="Choose item" itemCount={3} activeIndex={99} onChange={onChange} />,
    )
    expect(getByRole('button', {name: 'Go to item 3'})).toHaveAttribute('aria-current', 'true')
    await user.click(getByRole('button', {name: 'Previous item'}))
    expect(onChange).toHaveBeenLastCalledWith(1)
    rerender(<CarouselPagination aria-label="Choose item" itemCount={3} activeIndex={-1} onChange={onChange} />)
    expect(getByRole('button', {name: 'Go to item 1'})).toHaveAttribute('aria-current', 'true')
  })

  it('keeps the active and adjacent indicators visible in both directions and at the ends', () => {
    const {getByRole, rerender} = render(
      <CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={0} onChange={jest.fn()} />,
    )
    const indicators = getByRole('button', {name: 'Go to item 1'}).parentElement as HTMLDivElement
    Object.defineProperty(indicators, 'clientWidth', {configurable: true, value: 100})
    const containerBounds = jest.spyOn(indicators, 'getBoundingClientRect').mockReturnValue({left: 100} as DOMRect)
    const indicatorBounds = Array.from(indicators.children, (indicator, index) =>
      jest.spyOn(indicator, 'getBoundingClientRect').mockImplementation(() => {
        const selectedIndex = Array.from(indicators.children).findIndex(
          item => item.getAttribute('aria-current') === 'true',
        )
        const left = 100 + index * 12 + (index > selectedIndex ? 9 : 0) - indicators.scrollLeft
        return {left, right: left + (index === selectedIndex ? 15 : 6)} as DOMRect
      }),
    )

    try {
      rerender(<CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={10} onChange={jest.fn()} />)
      expect(indicators.scrollLeft).toBe(47)
      rerender(<CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={2} onChange={jest.fn()} />)
      expect(indicators.scrollLeft).toBe(12)
      rerender(<CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={29} onChange={jest.fn()} />)
      expect(indicators.scrollLeft).toBe(263)
      rerender(<CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={0} onChange={jest.fn()} />)
      expect(indicators.scrollLeft).toBe(0)

      Object.defineProperty(indicators, 'clientWidth', {configurable: true, value: 36})
      rerender(<CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={10} onChange={jest.fn()} />)
      expect(indicators.scrollLeft).toBe(111)

      Object.defineProperty(indicators, 'clientWidth', {configurable: true, value: 20})
      rerender(<CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={11} onChange={jest.fn()} />)
      expect(indicators.scrollLeft).toBe(127)
    } finally {
      containerBounds.mockRestore()
      for (const bounds of indicatorBounds) bounds.mockRestore()
    }
  })

  it('realigns after the width transition or container resize without observing each animation frame', () => {
    const originalResizeObserver = global.ResizeObserver
    const resizeCallbacks = new Map<Element, ResizeObserverCallback>()
    const disconnect = jest.fn()
    global.ResizeObserver = jest.fn(callback => ({
      observe: (element: Element) => resizeCallbacks.set(element, callback),
      disconnect,
      unobserve: jest.fn(),
    })) as unknown as typeof ResizeObserver

    try {
      const {getByRole, unmount} = render(
        <CarouselPagination aria-label="Choose item" itemCount={30} activeIndex={10} onChange={jest.fn()} />,
      )
      const indicator = getByRole('button', {name: 'Go to item 11'})
      const indicators = indicator.parentElement as HTMLDivElement
      let containerWidth = 100
      let indicatorSpacing = 12
      Object.defineProperty(indicators, 'clientWidth', {configurable: true, get: () => containerWidth})
      jest.spyOn(indicators, 'getBoundingClientRect').mockReturnValue({left: 100} as DOMRect)
      for (const [index, item] of Array.from(indicators.children).entries()) {
        jest.spyOn(item, 'getBoundingClientRect').mockImplementation(() => {
          const left = 100 + index * indicatorSpacing + (index > 10 ? 9 : 0) - indicators.scrollLeft
          return {left, right: left + (index === 10 ? 15 : 6)} as DOMRect
        })
      }

      const finishTransition = (propertyName = 'width') => {
        const event = new Event('transitionend', {bubbles: true})
        Object.defineProperty(event, 'propertyName', {value: propertyName})
        act(() => indicator.dispatchEvent(event))
      }

      expect(resizeCallbacks.has(indicator)).toBe(false)
      finishTransition('background-color')
      expect(indicators.scrollLeft).toBe(0)
      finishTransition()
      expect(indicators.scrollLeft).toBe(47)
      indicatorSpacing = 16
      finishTransition()
      expect(indicators.scrollLeft).toBe(91)

      containerWidth = 80
      act(() => resizeCallbacks.get(indicators)?.([], {} as ResizeObserver))
      expect(indicators.scrollLeft).toBe(111)
      unmount()
      expect(disconnect).toHaveBeenCalled()
    } finally {
      global.ResizeObserver = originalResizeObserver
      jest.restoreAllMocks()
    }
  })

  it('forwards item attributes, labels, classes, and consumer activation handlers', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const onClick = jest.fn()
    const {getByRole} = render(
      <CarouselPagination
        aria-label="Choose testimonial"
        itemCount={3}
        activeIndex={0}
        onChange={onChange}
        labels={{
          previous: 'Previous testimonial',
          next: 'Next testimonial',
          item: 'Testimonial {current} of {total}',
        }}
        itemAttributesBuilder={index => ({
          'aria-controls': `testimonial-${index}`,
          'data-analytics-index': index,
          className: 'custom-indicator',
          onClick,
        })}
      />,
    )
    const indicator = getByRole('button', {name: 'Testimonial 2 of 3'})
    expect(indicator).toHaveAttribute('aria-controls', 'testimonial-1')
    expect(indicator).toHaveAttribute('data-analytics-index', '1')
    expect(indicator).toHaveClass('custom-indicator')
    await user.click(indicator)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(1)
    expect(getByRole('button', {name: 'Previous testimonial'})).toHaveAttribute('aria-disabled', 'true')
  })

  it('formats complete item labels with reordered and repeated placeholders', () => {
    const {getByRole} = render(
      <CarouselPagination
        aria-label="Choose item"
        itemCount={3}
        activeIndex={0}
        labels={{item: '{total} items; choose {current}; repeat {current}; {unknown}'}}
        onChange={jest.fn()}
      />,
    )

    expect(getByRole('button', {name: '3 items; choose 2; repeat 2; {unknown}'})).toBeInTheDocument()
  })

  it('forwards root attributes and refs without introducing a navigation landmark', async () => {
    const ref = React.createRef<HTMLDivElement>()
    const {getByRole, queryByRole, container} = render(
      <CarouselPagination
        ref={ref}
        aria-label="Choose item"
        itemCount={3}
        activeIndex={0}
        onChange={jest.fn()}
        id="items"
      />,
    )
    expect(ref.current).toBe(getByRole('group', {name: 'Choose item'}))
    expect(ref.current).toHaveAttribute('data-testid', CarouselPagination.testIds.root)
    expect(ref.current).toHaveAttribute('id', 'items')
    expect(queryByRole('navigation')).not.toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })
})
