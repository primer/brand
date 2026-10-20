import React from 'react'
import {act, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {axe} from 'jest-axe'
import {Testimonial} from '../Testimonial'
import {TestimonialGroup} from './TestimonialGroup'
import {useReducedMotion} from '../hooks/useReducedMotion'

jest.mock('../hooks/useReducedMotion')
const mockUseReducedMotion = useReducedMotion as jest.Mock

describe('TestimonialGroup', () => {
  const children = [
    <Testimonial key="first">
      <Testimonial.Quote>First quote</Testimonial.Quote>
      <Testimonial.Avatar src="first.png" alt="" />
      <Testimonial.Name position="Engineer, First company">First author</Testimonial.Name>
    </Testimonial>,
    <Testimonial key="second">
      <Testimonial.Quote>Second quote</Testimonial.Quote>
      <Testimonial.Avatar src="second.png" alt="" />
      <Testimonial.Name position="Engineer, Second company">Second author</Testimonial.Name>
      <Testimonial.Link href="/second">Read story</Testimonial.Link>
    </Testimonial>,
    <Testimonial key="third">
      <Testimonial.Quote>Third quote</Testimonial.Quote>
      <Testimonial.Name>Third author</Testimonial.Name>
    </Testimonial>,
  ]

  beforeEach(() => {
    mockUseReducedMotion.mockReturnValue(false)
    const getComputedStyle = window.getComputedStyle
    jest.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudoElement) => {
      const computedStyle = getComputedStyle(element, pseudoElement)
      if (
        !(element instanceof HTMLElement) ||
        !element.matches('.TestimonialGroup__quoteMark, .TestimonialGroup__quote, .TestimonialGroup__media')
      )
        return computedStyle

      const root = element.closest<HTMLElement>('.TestimonialGroup')
      const outgoing = element.closest('.TestimonialGroup__testimonial--out') !== null
      const quoteMark = element.classList.contains('TestimonialGroup__quoteMark')
      const quote = element.classList.contains('TestimonialGroup__quote')
      const duration = root?.style.getPropertyValue(
        outgoing ? '--brand-TestimonialGroup-fadeOutDuration' : '--brand-TestimonialGroup-fadeInDuration',
      )
      const delay = outgoing ? (quoteMark ? 120 : quote ? 80 : 40) : quoteMark ? 0 : quote ? 100 : 200
      Object.defineProperties(computedStyle, {
        transitionProperty: {value: 'opacity'},
        transitionDuration: {value: duration || (outgoing ? '250ms' : '475ms')},
        transitionDelay: {value: `${delay}ms`},
      })
      return computedStyle
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('renders one accessible slide and keeps inactive links out of the tab order', () => {
    const {container, getAllByRole, getByRole, queryByRole, getByText} = render(
      <TestimonialGroup>{children}</TestimonialGroup>,
    )
    expect(getByRole('region', {name: 'Testimonials'})).toHaveAttribute('aria-roledescription', 'carousel')
    expect(getByRole('region', {name: 'Testimonials'})).toHaveAttribute('data-testid', TestimonialGroup.testIds.root)
    expect(
      getAllByRole('group').filter(element => element.getAttribute('aria-roledescription') === 'slide'),
    ).toHaveLength(1)
    expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
    expect(queryByRole('link', {name: 'Read story'})).not.toBeInTheDocument()
    expect(getByText('Read story').closest('[inert]')).not.toBeNull()
    const slides = container.querySelectorAll('.TestimonialGroup__slide')
    expect(slides[0]).not.toHaveAttribute('inert')
    expect(slides[1]).toHaveAttribute('inert')
    expect(slides[2]).toHaveAttribute('inert')
    expect(getByText('Second quote').closest('figure')).toHaveClass('TestimonialGroup__testimonial--out')
  })

  it('supports label overrides and preserves unspecified defaults', async () => {
    mockUseReducedMotion.mockReturnValue(true)
    const user = userEvent.setup()
    const {getByRole} = render(
      <TestimonialGroup
        aria-label="Customer testimonials"
        labels={{
          controlsPrev: 'Earlier quote',
          controlsNext: undefined,
          indicator: 'Choose quote {current}',
          slide: 'Customer quote {current} out of {total}',
          announcement: 'Customer quote {current} out of {total}: {author}',
        }}
      >
        {children}
      </TestimonialGroup>,
    )

    expect(getByRole('region', {name: 'Customer testimonials'})).toHaveAttribute('aria-roledescription', 'carousel')
    expect(getByRole('group', {name: 'Customer testimonials navigation'})).toBeInTheDocument()
    expect(getByRole('button', {name: 'Earlier quote'})).toBeInTheDocument()
    expect(getByRole('button', {name: 'Next testimonial'})).toBeInTheDocument()
    await user.click(getByRole('button', {name: 'Choose quote 2'}))
    expect(getByRole('group', {name: 'Customer quote 2 out of 3'})).toHaveAttribute('aria-roledescription', 'slide')
    expect(getByRole('status')).toHaveTextContent('Customer quote 2 out of 3: Second author')
  })

  it.each(['default', 'subtle', 'minimal', 'expressive'] as const)('preserves the %s child variant', variant => {
    const {getByRole} = render(
      <TestimonialGroup>
        <Testimonial variant={variant}>
          <Testimonial.Quote>First quote</Testimonial.Quote>
          <Testimonial.Name>First author</Testimonial.Name>
        </Testimonial>
      </TestimonialGroup>,
    )

    expect(getByRole('figure')).toHaveClass(`Testimonial--variant-${variant}`)
    expect(getByRole('region').firstElementChild?.classList.contains('TestimonialGroup__content--expressive')).toBe(
      variant === 'expressive',
    )
  })

  it('forwards custom classes correctly', () => {
    const {getByRole} = render(
      <TestimonialGroup>
        <Testimonial className="custom-testimonial">
          <Testimonial.Quote>First quote</Testimonial.Quote>
          <Testimonial.Name>First author</Testimonial.Name>
        </Testimonial>
      </TestimonialGroup>,
    )

    expect(getByRole('figure')).toHaveClass('Testimonial--variant-minimal', 'custom-testimonial')
  })

  it('localizes complete phrases with reordered numbers and author names', async () => {
    mockUseReducedMotion.mockReturnValue(true)
    const user = userEvent.setup()
    const {getByRole} = render(
      <TestimonialGroup
        labels={{
          carousel: 'お客様の声',
          controlsPrev: '前の体験談',
          controlsNext: '次の体験談',
          controlsNavigation: '{carousel}の操作',
          carouselRoleDescription: 'カルーセル',
          slideRoleDescription: 'スライド',
          indicator: '{current}件目の体験談を表示',
          slide: '全{total}件中{current}件目の体験談',
          announcement: '{author}の体験談。全{total}件中{current}件目',
        }}
      >
        {children}
      </TestimonialGroup>,
    )

    expect(getByRole('region', {name: 'お客様の声'})).toHaveAttribute('aria-roledescription', 'カルーセル')
    expect(getByRole('group', {name: 'お客様の声の操作'})).toBeInTheDocument()
    expect(getByRole('button', {name: '前の体験談'})).toBeInTheDocument()
    expect(getByRole('button', {name: '2件目の体験談を表示'})).toBeInTheDocument()
    await user.click(getByRole('button', {name: '次の体験談'}))
    expect(getByRole('group', {name: '全3件中2件目の体験談'})).toHaveAttribute('aria-roledescription', 'スライド')
    expect(getByRole('status')).toHaveTextContent('Second authorの体験談。全3件中2件目')
  })

  it.each([undefined, 'Platform customer stories'])(
    'uses the carousel label unless aria-label overrides it with %s',
    ariaLabel => {
      const {getByRole} = render(
        <TestimonialGroup aria-label={ariaLabel} labels={{carousel: 'Customer stories'}}>
          {children}
        </TestimonialGroup>,
      )

      const expectedName = ariaLabel ?? 'Customer stories'
      expect(getByRole('region', {name: expectedName})).toBeInTheDocument()
      expect(getByRole('group', {name: `${expectedName} navigation`})).toBeInTheDocument()
      expect(getByRole('button', {name: 'Go to testimonial 2'})).toBeInTheDocument()
    },
  )

  it('updates inert slides when keyed testimonials are reordered', () => {
    const {getByText, rerender} = render(<TestimonialGroup>{children}</TestimonialGroup>)
    const firstSlide = getByText('First quote').closest('[aria-roledescription="slide"]')
    const secondSlide = getByText('Second quote').closest('[aria-roledescription="slide"]')

    expect(firstSlide).not.toHaveAttribute('inert')
    expect(secondSlide).toHaveAttribute('inert')

    rerender(<TestimonialGroup>{[children[1], children[0], children[2]]}</TestimonialGroup>)

    expect(secondSlide).not.toHaveAttribute('inert')
    expect(firstSlide).toHaveAttribute('inert')
  })

  it.each([undefined, '', <em key="author">Second author</em>])(
    'announces the complete slide phrase when the author is not plain text: %s',
    author => {
      mockUseReducedMotion.mockReturnValue(true)
      const {getByRole} = render(
        <TestimonialGroup
          labels={{slide: 'Quote {current} / {total}', announcement: '{author}: quote {current} / {total}'}}
        >
          {children[0]}
          <Testimonial>
            <Testimonial.Quote>Second quote</Testimonial.Quote>
            {author !== undefined && <Testimonial.Name>{author}</Testimonial.Name>}
          </Testimonial>
        </TestimonialGroup>,
      )

      act(() => getByRole('button', {name: 'Go to testimonial 2'}).click())
      expect(getByRole('status')).toHaveTextContent('Quote 2 / 2')
    },
  )

  it('replaces repeated placeholders without interpreting replacement text or unknown placeholders', async () => {
    mockUseReducedMotion.mockReturnValue(true)
    const user = userEvent.setup()
    const {getByRole} = render(
      <TestimonialGroup
        labels={{
          indicator: '{current} / {total}; repeat {current}',
          announcement: '{author}; {current}/{total}; {unknown}',
        }}
      >
        {children[0]}
        <Testimonial>
          <Testimonial.Quote>Second quote</Testimonial.Quote>
          <Testimonial.Name>{'Author $& {total}'}</Testimonial.Name>
        </Testimonial>
      </TestimonialGroup>,
    )

    await user.click(getByRole('button', {name: '2 / 2; repeat 2'}))
    expect(getByRole('status')).toHaveTextContent('Author $& {total}; 2/2; {unknown}')
  })

  it('applies parent-owned CSS Module classes to testimonial parts', () => {
    const {getByRole} = render(<TestimonialGroup>{children}</TestimonialGroup>)
    const slide = getByRole('group', {name: 'Testimonial 1 of 3'})
    expect(slide.querySelector('.TestimonialGroup__quoteMark')).toHaveClass('Testimonial__quoteMark')
    expect(slide.querySelector('.TestimonialGroup__quote')).toHaveClass('Testimonial-quote')
    expect(slide.querySelector('.TestimonialGroup__media')).toHaveClass('Testimonial__media')
    expect(slide.querySelector('.TestimonialGroup__avatar')).toHaveClass('Testimonial-avatar', 'Avatar')
  })

  it.each([NaN, Infinity, -Infinity, 0.5])('normalizes an invalid initial index of %s', defaultActiveIndex => {
    const {getByRole} = render(<TestimonialGroup defaultActiveIndex={defaultActiveIndex}>{children}</TestimonialGroup>)
    expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
  })

  it('uses the latest committed change callback without restarting the pending transition', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const previousOnChange = jest.fn()
    const nextOnChange = jest.fn()
    const {getByRole, rerender} = render(<TestimonialGroup onChange={previousOnChange}>{children}</TestimonialGroup>)

    await user.click(getByRole('button', {name: 'Next testimonial'}))
    act(() => jest.advanceTimersByTime(200))
    rerender(<TestimonialGroup onChange={nextOnChange}>{children}</TestimonialGroup>)
    act(() => jest.advanceTimersByTime(170))
    expect(getByRole('group', {name: 'Testimonial 2 of 3'})).toBeInTheDocument()
    expect(previousOnChange).not.toHaveBeenCalled()
    expect(nextOnChange).toHaveBeenCalledWith(1)
  })

  it('clears an announcement when its selected testimonial is removed', async () => {
    mockUseReducedMotion.mockReturnValue(true)
    const user = userEvent.setup()
    const {getByRole, rerender} = render(<TestimonialGroup>{children}</TestimonialGroup>)

    await user.click(getByRole('button', {name: 'Next testimonial'}))
    expect(getByRole('status')).toHaveTextContent('Testimonial 2 of 3: Second author')
    rerender(<TestimonialGroup>{children[0]}</TestimonialGroup>)

    expect(getByRole('group', {name: 'Testimonial 1 of 1'})).toBeInTheDocument()
    expect(getByRole('status')).toBeEmptyDOMElement()
  })

  it('commits after the prototype fade-out and finishes the fade-in', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const onChange = jest.fn()
    const {getByRole, getByText} = render(<TestimonialGroup onChange={onChange}>{children}</TestimonialGroup>)
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    expect(getByText('First quote').closest('figure')).toHaveClass('TestimonialGroup__testimonial--out')
    expect(getByRole('button', {name: 'Go to testimonial 2'})).toHaveAttribute('aria-current', 'true')
    act(() => jest.advanceTimersByTime(369))
    expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(1))
    expect(getByRole('group', {name: 'Testimonial 2 of 3'})).toBeInTheDocument()
    expect(getByText('Second quote').closest('figure')).toHaveClass('TestimonialGroup__testimonial--in')
    expect(getByRole('status')).toHaveTextContent('Testimonial 2 of 3: Second author')
    expect(onChange).toHaveBeenCalledWith(1)
    act(() => jest.advanceTimersByTime(675))
    expect(getByText('Second quote').closest('figure')).toHaveClass('TestimonialGroup__testimonial--idle')
  })

  it.each([
    ['900ms', '1.2s', 1020, 1400],
    ['0.08s', '50ms', 200, 250],
    ['0ms', '0s', 120, 200],
  ] as const)(
    'synchronizes slide changes with custom fade durations of %s and %s',
    async (fadeOutDuration, fadeInDuration, fadeOutTotal, fadeInTotal) => {
      jest.useFakeTimers()
      const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
      const onChange = jest.fn()
      const {getByRole, getByText} = render(
        <TestimonialGroup
          onChange={onChange}
          style={
            {
              '--brand-TestimonialGroup-fadeOutDuration': fadeOutDuration,
              '--brand-TestimonialGroup-fadeInDuration': fadeInDuration,
            } as React.CSSProperties
          }
        >
          {children}
        </TestimonialGroup>,
      )

      await user.click(getByRole('button', {name: 'Next testimonial'}))
      act(() => jest.advanceTimersByTime(fadeOutTotal - 1))
      expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
      expect(onChange).not.toHaveBeenCalled()
      act(() => jest.advanceTimersByTime(1))
      expect(getByRole('group', {name: 'Testimonial 2 of 3'})).toBeInTheDocument()
      expect(onChange).toHaveBeenCalledWith(1)
      act(() => jest.advanceTimersByTime(fadeInTotal - 1))
      expect(getByText('Second quote').closest('figure')).toHaveClass('TestimonialGroup__testimonial--in')
      act(() => jest.advanceTimersByTime(1))
      expect(getByText('Second quote').closest('figure')).toHaveClass('TestimonialGroup__testimonial--idle')
    },
  )

  it('uses the latest target during rapid navigation and can cancel a pending change', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const {getByRole} = render(<TestimonialGroup>{children}</TestimonialGroup>)
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    act(() => jest.advanceTimersByTime(370))
    expect(getByRole('group', {name: 'Testimonial 3 of 3'})).toBeInTheDocument()
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    await user.click(getByRole('button', {name: 'Previous testimonial'}))
    act(() => jest.advanceTimersByTime(1045))
    expect(getByRole('group', {name: 'Testimonial 3 of 3'})).toBeInTheDocument()
  })

  it('retargets an outgoing slide without restarting its fade', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const onChange = jest.fn()
    const {getByRole} = render(<TestimonialGroup onChange={onChange}>{children}</TestimonialGroup>)

    await user.click(getByRole('button', {name: 'Next testimonial'}))
    act(() => jest.advanceTimersByTime(200))
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    act(() => jest.advanceTimersByTime(169))
    expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(1))
    expect(getByRole('group', {name: 'Testimonial 3 of 3'})).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('wraps in both directions and switches immediately with reduced motion', async () => {
    mockUseReducedMotion.mockReturnValue(true)
    const user = userEvent.setup()
    const {getByRole} = render(<TestimonialGroup>{children}</TestimonialGroup>)
    await user.click(getByRole('button', {name: 'Previous testimonial'}))
    expect(getByRole('group', {name: 'Testimonial 3 of 3'})).toBeInTheDocument()
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
  })

  it('reserves the tallest slide separately from navigation and remeasures resized content', async () => {
    mockUseReducedMotion.mockReturnValue(true)
    const user = userEvent.setup()
    const originalResizeObserver = global.ResizeObserver
    const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect
    const resizeCallbacks = new Map<Element, ResizeObserverCallback>()
    let heights = [180, 320, 240]
    global.ResizeObserver = jest.fn(callback => ({
      observe: (element: Element) => resizeCallbacks.set(element, callback),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    })) as unknown as typeof ResizeObserver
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const rect = originalGetBoundingClientRect.call(this)
      if (!this.classList.contains('TestimonialGroup__slide') || !this.parentElement) return rect
      const index = Array.from(this.parentElement.children).indexOf(this)
      return {...rect, height: heights[index]}
    })

    try {
      const {getByRole, rerender} = render(<TestimonialGroup>{children}</TestimonialGroup>)
      const slidesContainer = getByRole('group', {name: 'Testimonial 1 of 3'}).parentElement as HTMLElement
      const navigation = getByRole('group', {name: 'Testimonials navigation'})
      expect(slidesContainer).toHaveClass('TestimonialGroup__slides')
      expect(slidesContainer).toHaveStyle({minHeight: '320px'})
      expect(slidesContainer).not.toContainElement(navigation)
      expect(navigation.parentElement?.parentElement).toBe(slidesContainer.parentElement)
      expect(resizeCallbacks.has(slidesContainer)).toBe(true)

      await user.click(getByRole('button', {name: 'Next testimonial'}))
      expect(getByRole('group', {name: 'Testimonial 2 of 3'}).parentElement).toBe(slidesContainer)
      expect(slidesContainer).toHaveStyle({minHeight: '320px'})

      heights = [220, 400, 260]
      act(() => resizeCallbacks.get(slidesContainer)?.([], {} as ResizeObserver))
      expect(slidesContainer).toHaveStyle({minHeight: '400px'})

      heights = [150, 210, 170]
      act(() => resizeCallbacks.get(slidesContainer)?.([], {} as ResizeObserver))
      expect(slidesContainer).toHaveStyle({minHeight: '210px'})

      rerender(<TestimonialGroup>{children[0]}</TestimonialGroup>)
      expect(slidesContainer).toHaveStyle({minHeight: '150px'})
    } finally {
      global.ResizeObserver = originalResizeObserver
    }
  })

  it('does not show controls for a single testimonial and ignores conditional children', () => {
    const {queryByRole, getByRole} = render(
      <TestimonialGroup>
        {false}
        {children[0]}
      </TestimonialGroup>,
    )
    expect(getByRole('group', {name: 'Testimonial 1 of 1'})).toBeInTheDocument()
    expect(queryByRole('group', {name: 'Testimonials navigation'})).not.toBeInTheDocument()
    expect(queryByRole('button')).not.toBeInTheDocument()
  })

  it('aligns expressive controls to the quote on resize and resets the inset for other variants', async () => {
    mockUseReducedMotion.mockReturnValue(true)
    const user = userEvent.setup()
    const originalResizeObserver = global.ResizeObserver
    const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect
    const resizeCallbacks = new Map<Element, ResizeObserverCallback>()
    let quoteLeft = 360
    global.ResizeObserver = jest.fn(callback => ({
      observe: (element: Element) => resizeCallbacks.set(element, callback),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    })) as unknown as typeof ResizeObserver
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const rect = originalGetBoundingClientRect.call(this)
      if (this.classList.contains('TestimonialGroup__slides')) return {...rect, left: 60, right: 1360}
      if (this.classList.contains('TestimonialGroup__quoteMark'))
        return {...rect, left: quoteLeft, right: quoteLeft + 56}
      return rect
    })

    try {
      const {getByRole} = render(
        <TestimonialGroup>
          {React.cloneElement(children[0], {variant: 'expressive'})}
          {children[1]}
        </TestimonialGroup>,
      )
      const controls = getByRole('group', {name: 'Testimonials navigation'}).parentElement
      const slidesContainer = getByRole('group', {name: 'Testimonial 1 of 2'}).parentElement as HTMLElement
      expect(controls).toHaveStyle({marginInlineStart: '300px'})

      quoteLeft = 160
      act(() => resizeCallbacks.get(slidesContainer)?.([], {} as ResizeObserver))
      expect(controls).toHaveStyle({marginInlineStart: '100px'})

      await user.click(getByRole('button', {name: 'Next testimonial'}))
      expect(controls).toHaveStyle({marginInlineStart: '0px'})
    } finally {
      global.ResizeObserver = originalResizeObserver
    }
  })

  it('forwards attributes and refs and renders nothing without testimonials', () => {
    const ref = React.createRef<HTMLDivElement>()
    const {getByTestId, rerender, container} = render(
      <TestimonialGroup ref={ref} id="customer-quotes" data-testid="custom-group" className="custom-class">
        {children}
      </TestimonialGroup>,
    )
    expect(ref.current).toBe(getByTestId('custom-group'))
    expect(ref.current).toHaveAttribute('id', 'customer-quotes')
    expect(ref.current).toHaveClass('custom-class')
    rerender(<TestimonialGroup />)
    expect(container).toBeEmptyDOMElement()
  })

  it('changes slides only when a navigation control is activated', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const onChange = jest.fn()
    const onFocusCapture = jest.fn()
    const {getAllByRole, getByRole} = render(
      <TestimonialGroup onChange={onChange} onFocusCapture={onFocusCapture}>
        {children}
      </TestimonialGroup>,
    )

    expect(getAllByRole('button')).toHaveLength(5)
    act(() => jest.advanceTimersByTime(60000))
    expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
    expect(getByRole('status')).toBeEmptyDOMElement()

    await user.tab()
    expect(getByRole('button', {name: 'Previous testimonial'})).toHaveFocus()
    expect(onFocusCapture).toHaveBeenCalled()
    await user.keyboard('{Enter}')
    act(() => jest.advanceTimersByTime(370))
    expect(getByRole('group', {name: 'Testimonial 3 of 3'})).toBeInTheDocument()
    expect(getByRole('status')).toHaveTextContent('Testimonial 3 of 3: Third author')

    act(() => jest.advanceTimersByTime(60000))
    expect(getByRole('group', {name: 'Testimonial 3 of 3'})).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('cancels a pending transition when unmounted', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const onChange = jest.fn()
    const {getByRole, unmount} = render(<TestimonialGroup onChange={onChange}>{children}</TestimonialGroup>)

    await user.click(getByRole('button', {name: 'Next testimonial'}))
    unmount()
    act(() => jest.advanceTimersByTime(10000))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<TestimonialGroup>{children}</TestimonialGroup>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
