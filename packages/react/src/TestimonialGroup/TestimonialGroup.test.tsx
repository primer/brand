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
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('renders one accessible slide and keeps inactive links out of the tab order', () => {
    const {getAllByRole, getByRole, queryByRole, getByText} = render(
      <TestimonialGroup autoPlay={false}>{children}</TestimonialGroup>,
    )
    expect(getByRole('region', {name: 'Testimonials'})).toHaveAttribute('aria-roledescription', 'carousel')
    expect(getByRole('region', {name: 'Testimonials'})).toHaveAttribute('data-testid', TestimonialGroup.testIds.root)
    expect(
      getAllByRole('group').filter(element => element.getAttribute('aria-roledescription') === 'slide'),
    ).toHaveLength(1)
    expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
    expect(queryByRole('link', {name: 'Read story'})).not.toBeInTheDocument()
    expect(getByText('Read story').closest('[inert]')).not.toBeNull()
    expect(getByText('Second quote').closest('figure')).toHaveClass('TestimonialGroup__testimonial--out')
  })

  it('configures child classes without replacing consumer classes', () => {
    const {getByRole} = render(
      <TestimonialGroup autoPlay={false}>
        <Testimonial className="custom-testimonial">
          <Testimonial.Quote>First quote</Testimonial.Quote>
          <Testimonial.Name>First author</Testimonial.Name>
        </Testimonial>
      </TestimonialGroup>,
    )

    expect(getByRole('figure')).toHaveClass(
      'Testimonial--variant-minimal',
      'TestimonialGroup__testimonial',
      'custom-testimonial',
    )
  })

  it('supports label overrides and preserves unspecified defaults', async () => {
    mockUseReducedMotion.mockReturnValue(true)
    const user = userEvent.setup()
    const {getByRole} = render(
      <TestimonialGroup
        autoPlay={false}
        labels={{
          controlsPrev: 'Earlier quote',
          indicator: 'Choose quote',
          testimonial: 'Customer quote',
          countSeparator: 'out of',
        }}
      >
        {children}
      </TestimonialGroup>,
    )

    expect(getByRole('button', {name: 'Earlier quote'})).toBeInTheDocument()
    expect(getByRole('button', {name: 'Next testimonial'})).toBeInTheDocument()
    await user.click(getByRole('button', {name: 'Choose quote 2'}))
    expect(getByRole('group', {name: 'Customer quote 2 out of 3'})).toBeInTheDocument()
    expect(getByRole('status')).toHaveTextContent('Customer quote 2 out of 3: Second author')
  })

  it.each(['default', 'subtle', 'minimal', 'expressive'] as const)('preserves the %s child variant', variant => {
    const {getByRole} = render(
      <TestimonialGroup autoPlay={false}>
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

  it('applies parent-owned CSS Module classes to testimonial parts', () => {
    const {getByRole} = render(<TestimonialGroup autoPlay={false}>{children}</TestimonialGroup>)
    const slide = getByRole('group', {name: 'Testimonial 1 of 3'})
    expect(slide.querySelector('.TestimonialGroup__quoteMark')).toHaveClass('Testimonial__quoteMark')
    expect(slide.querySelector('.TestimonialGroup__quote')).toHaveClass('Testimonial-quote')
    expect(slide.querySelector('.TestimonialGroup__media')).toHaveClass('Testimonial__media')
    expect(slide.querySelector('.TestimonialGroup__avatar')).toHaveClass('Testimonial-avatar', 'Avatar')
  })

  it.each([NaN, Infinity, -Infinity, 0.5])('normalizes an invalid initial index of %s', defaultActiveIndex => {
    const {getByRole} = render(
      <TestimonialGroup autoPlay={false} defaultActiveIndex={defaultActiveIndex}>
        {children}
      </TestimonialGroup>,
    )
    expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
  })

  it('uses the latest committed change callback without restarting the pending transition', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const previousOnChange = jest.fn()
    const nextOnChange = jest.fn()
    const {getByRole, rerender} = render(
      <TestimonialGroup autoPlay={false} onChange={previousOnChange}>
        {children}
      </TestimonialGroup>,
    )

    await user.click(getByRole('button', {name: 'Next testimonial'}))
    act(() => jest.advanceTimersByTime(200))
    rerender(
      <TestimonialGroup autoPlay={false} onChange={nextOnChange}>
        {children}
      </TestimonialGroup>,
    )
    act(() => jest.advanceTimersByTime(170))
    expect(getByRole('group', {name: 'Testimonial 2 of 3'})).toBeInTheDocument()
    expect(previousOnChange).not.toHaveBeenCalled()
    expect(nextOnChange).toHaveBeenCalledWith(1)
  })

  it('commits after the prototype fade-out and finishes the fade-in', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const onChange = jest.fn()
    const {getByRole, getByText} = render(
      <TestimonialGroup autoPlay={false} onChange={onChange}>
        {children}
      </TestimonialGroup>,
    )
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

  it('uses the latest target during rapid navigation and can cancel a pending change', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
    const {getByRole} = render(<TestimonialGroup autoPlay={false}>{children}</TestimonialGroup>)
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    act(() => jest.advanceTimersByTime(370))
    expect(getByRole('group', {name: 'Testimonial 3 of 3'})).toBeInTheDocument()
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    await user.click(getByRole('button', {name: 'Previous testimonial'}))
    act(() => jest.advanceTimersByTime(1045))
    expect(getByRole('group', {name: 'Testimonial 3 of 3'})).toBeInTheDocument()
  })

  it('wraps in both directions and switches immediately with reduced motion', async () => {
    mockUseReducedMotion.mockReturnValue(true)
    const user = userEvent.setup()
    const {getByRole, queryByRole} = render(<TestimonialGroup>{children}</TestimonialGroup>)
    await user.click(getByRole('button', {name: 'Previous testimonial'}))
    expect(getByRole('group', {name: 'Testimonial 3 of 3'})).toBeInTheDocument()
    await user.click(getByRole('button', {name: 'Next testimonial'}))
    expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
    expect(queryByRole('button', {name: 'Pause testimonials'})).not.toBeInTheDocument()
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
      const {getByRole, rerender} = render(<TestimonialGroup autoPlay={false}>{children}</TestimonialGroup>)
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

      rerender(<TestimonialGroup autoPlay={false}>{children[0]}</TestimonialGroup>)
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
        <TestimonialGroup autoPlay={false}>
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

  it('pauses and resumes visible autoplay without announcing automatic changes', async () => {
    jest.useFakeTimers()
    const animations: {
      onfinish: (() => void) | null
      playState: string
      pause: jest.Mock
      play: jest.Mock
      cancel: jest.Mock
    }[] = []
    const originalAnimate = HTMLElement.prototype.animate
    HTMLElement.prototype.animate = jest.fn(() => {
      const animation = {onfinish: null, playState: 'running', pause: jest.fn(), play: jest.fn(), cancel: jest.fn()}
      animation.pause.mockImplementation(() => {
        animation.playState = 'paused'
      })
      animation.play.mockImplementation(() => {
        animation.playState = 'running'
      })
      animations.push(animation)
      return animation as unknown as Animation
    })
    const originalObserver = global.IntersectionObserver
    const intersectionCallbacks: ((entries: {intersectionRatio: number}[]) => void)[] = []
    const disconnectObserver = jest.fn()
    global.IntersectionObserver = jest.fn(callback => {
      intersectionCallbacks.push(callback)
      return {
        observe: () => callback([{intersectionRatio: 1}], {}),
        disconnect: disconnectObserver,
      }
    }) as unknown as typeof IntersectionObserver
    try {
      const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})
      const {getByRole, unmount} = render(<TestimonialGroup>{children}</TestimonialGroup>)
      expect(HTMLElement.prototype.animate).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({duration: 7000}),
      )
      const avatar = getByRole('group', {name: 'Testimonial 1 of 3'}).querySelector('.TestimonialGroup__avatar')
      expect((HTMLElement.prototype.animate as jest.Mock).mock.contexts[0]).toBe(avatar)
      await user.tab()
      expect(getByRole('button', {name: 'Pause testimonials'})).toHaveFocus()
      await user.hover(getByRole('region', {name: 'Testimonials'}))
      expect(animations[0].pause).toHaveBeenCalled()
      expect(getByRole('button', {name: 'Play testimonials'})).toBeInTheDocument()
      await user.unhover(getByRole('region', {name: 'Testimonials'}))
      expect(animations[0].play).toHaveBeenCalled()
      expect(getByRole('button', {name: 'Pause testimonials'})).toBeInTheDocument()

      await user.hover(getByRole('region', {name: 'Testimonials'}))
      animations[0].play.mockClear()
      await user.click(getByRole('button', {name: 'Play testimonials'}))
      expect(animations[0].play).toHaveBeenCalled()
      expect(getByRole('button', {name: 'Pause testimonials'})).toBeInTheDocument()
      await user.unhover(getByRole('region', {name: 'Testimonials'}))
      animations[0].pause.mockClear()
      animations[0].play.mockClear()
      await user.keyboard('{Enter}')
      expect(animations[0].pause).toHaveBeenCalled()
      await user.hover(getByRole('region', {name: 'Testimonials'}))
      await user.unhover(getByRole('region', {name: 'Testimonials'}))
      expect(animations[0].play).not.toHaveBeenCalled()
      const playButton = getByRole('button', {name: 'Play testimonials'})
      const playIcon = playButton.querySelector('svg')
      expect(playIcon).toHaveAttribute('width', '16')
      expect(playIcon).toHaveAttribute('height', '16')
      expect(playIcon).toHaveAttribute('viewBox', '0 0 16 16')
      expect(playIcon?.querySelector('path')).toHaveAttribute(
        'd',
        'M13.3777 6.94756C14.2069 7.40341 14.2069 8.59489 13.3777 9.05073L5.37808 13.4483C4.57834 13.8879 3.60001 13.3093 3.60001 12.3967L3.60001 3.60161C3.60001 2.689 4.57834 2.1104 5.37808 2.55003L13.3777 6.94756Z',
      )
      await user.click(playButton)
      expect(animations[0].play).toHaveBeenCalled()
      act(() => animations[0].onfinish?.())
      act(() => jest.advanceTimersByTime(370))
      expect(getByRole('group', {name: 'Testimonial 2 of 3'})).toBeInTheDocument()
      expect(getByRole('status')).toBeEmptyDOMElement()

      const activeAnimation = animations.at(-1)!
      act(() => intersectionCallbacks[0]([{intersectionRatio: 0}]))
      expect(activeAnimation.pause).toHaveBeenCalled()
      act(() => intersectionCallbacks[0]([{intersectionRatio: 1}]))
      expect(activeAnimation.play).toHaveBeenCalled()

      activeAnimation.pause.mockClear()
      activeAnimation.play.mockClear()
      act(() => window.dispatchEvent(new Event('pagehide')))
      expect(activeAnimation.pause).toHaveBeenCalled()
      act(() => window.dispatchEvent(new Event('pageshow')))
      expect(activeAnimation.play).toHaveBeenCalled()

      const hidden = jest.spyOn(document, 'hidden', 'get').mockReturnValue(true)
      activeAnimation.pause.mockClear()
      activeAnimation.play.mockClear()
      act(() => document.dispatchEvent(new Event('visibilitychange')))
      expect(activeAnimation.pause).toHaveBeenCalled()
      hidden.mockReturnValue(false)
      act(() => document.dispatchEvent(new Event('visibilitychange')))
      expect(activeAnimation.play).toHaveBeenCalled()

      act(() => activeAnimation.onfinish?.())
      act(() => jest.advanceTimersByTime(370))
      const slideWithoutAvatar = getByRole('group', {name: 'Testimonial 3 of 3'})
      expect(slideWithoutAvatar.querySelector('.TestimonialGroup__avatar')).not.toBeInTheDocument()
      expect((HTMLElement.prototype.animate as jest.Mock).mock.contexts.at(-1)).toBe(slideWithoutAvatar)
      act(() => animations.at(-1)?.onfinish?.())
      act(() => jest.advanceTimersByTime(370))
      expect(getByRole('group', {name: 'Testimonial 1 of 3'})).toBeInTheDocument()
      expect(getByRole('status')).toBeEmptyDOMElement()

      const ring = getByRole('group', {name: 'Testimonial 1 of 3'}).querySelector(
        '.TestimonialGroup__avatar',
      ) as HTMLElement
      ring.style.setProperty('--brand-TestimonialGroup-ring-progress', '180deg')
      await user.click(getByRole('button', {name: 'Next testimonial'}))
      await user.click(getByRole('button', {name: 'Previous testimonial'}))
      await user.click(getByRole('button', {name: 'Play testimonials'}))
      expect(HTMLElement.prototype.animate).toHaveBeenLastCalledWith(
        [{'--brand-TestimonialGroup-ring-progress': '180deg'}, {'--brand-TestimonialGroup-ring-progress': '360deg'}],
        expect.objectContaining({duration: 3500}),
      )

      const resumedAnimation = animations.at(-1)!
      unmount()
      expect(resumedAnimation.cancel).toHaveBeenCalled()
      expect(disconnectObserver).toHaveBeenCalled()
      resumedAnimation.play.mockClear()
      act(() => window.dispatchEvent(new Event('pageshow')))
      expect(resumedAnimation.play).not.toHaveBeenCalled()
    } finally {
      HTMLElement.prototype.animate = originalAnimate
      global.IntersectionObserver = originalObserver
    }
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<TestimonialGroup autoPlay={false}>{children}</TestimonialGroup>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
