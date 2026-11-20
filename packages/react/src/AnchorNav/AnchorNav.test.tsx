import React from 'react'
import {render, cleanup, act, fireEvent, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {apply} from '@oddbird/popover-polyfill/fn'

import {AnchorNav, type AnchorNavProps} from './AnchorNav'
import '../test-utils/mocks/match-media-mock'
import {useWindowSize} from '../hooks/useWindowSize'

jest.mock('@oddbird/popover-polyfill/fn', () => ({
  apply: jest.fn(),
  isSupported: jest.fn().mockReturnValue(false),
  isPolyfilled: jest.fn().mockReturnValue(true),
}))
jest.mock('../hooks/useWindowSize')
const mockUseWindowSize = useWindowSize as jest.Mock

expect.extend(toHaveNoViolations)

const mockData = [
  {title: 'Section one', id: 'section1'},
  {title: 'Section two', id: 'section2'},
  {title: 'Section three', id: 'section3'},
  {title: 'Section four', id: 'section4'},
  {title: 'Section five', id: 'section5'},
]
const MockAnchorNavFixture = ({
  data = mockData,
  onLinkClick,
  ...rest
}: Omit<AnchorNavProps, 'children'> & {
  data?: typeof mockData
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) => {
  return (
    <>
      <AnchorNav data-testid={AnchorNav.testIds.root} {...rest}>
        {data.map(item => {
          return (
            <AnchorNav.Link key={item.id} id={`link-${item.id}`} href={`#${item.id}`} onClick={onLinkClick}>
              {item.title}
            </AnchorNav.Link>
          )
        })}
        <AnchorNav.Action href="#">Action</AnchorNav.Action>
      </AnchorNav>
      {data.map(item => {
        return (
          <section key={item.id} id={item.id}>
            {item.title}
          </section>
        )
      })}
    </>
  )
}

describe('AnchorNav', () => {
  const originalResizeObserver = global.ResizeObserver
  let mockIntersectionObserver: jest.Mock
  let scrollListeners: Set<EventListener>
  let warnSpy: jest.SpyInstance

  const setScrollPosition = (position: number) => {
    for (const property of ['pageYOffset', 'scrollY']) {
      Object.defineProperty(window, property, {
        writable: true,
        configurable: true,
        value: position,
      })
    }
  }

  const triggerScrollEvent = async () => {
    for (const listener of Array.from(scrollListeners)) listener(new Event('scroll'))
  }

  // Places each section's top relative to the viewport below a 60px tall nav, then reports a scroll.
  const scrollSections = (scrollY: number, sectionTops: Record<string, number>, sectionHeight = 200) => {
    const spy = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    const measure = spy.getMockImplementation()
    spy.mockImplementation(function (this: HTMLElement) {
      if (this.id in sectionTops) {
        return this.hidden ? new DOMRect() : new DOMRect(0, sectionTops[this.id], 0, sectionHeight)
      }
      if (this.tagName === 'NAV') return new DOMRect(0, 0, 0, 60)
      return measure ? measure.call(this) : new DOMRect()
    })
    for (const section of document.querySelectorAll<HTMLElement>('section[id]')) {
      if (!(section.id in sectionTops)) continue
      jest.spyOn(section, 'getClientRects').mockImplementation(() => {
        const rects = section.hidden ? [] : [section.getBoundingClientRect()]
        return Object.assign(rects, {item: (index: number) => rects[index] ?? null})
      })
    }
    act(() => {
      setScrollPosition(scrollY)
      void triggerScrollEvent()
    })
  }

  const simulateNavBecomingSticky = async (navYPosition: number, scrollToPosition: number) => {
    await act(async () => {
      triggerObserverByRootMargin('0px 0px -100%', {
        boundingClientRect: mockRect(navYPosition),
        isIntersecting: true,
      })
    })

    await act(async () => {
      setScrollPosition(scrollToPosition)
      await triggerScrollEvent()
    })
  }

  const mockRect = (y = 100): DOMRectReadOnly => ({
    y,
    top: y,
    bottom: y + 50,
    left: 0,
    right: 0,
    width: 0,
    height: 50,
    x: 0,
    toJSON: () => ({}),
  })

  const triggerObserverByRootMargin = (rootMargin: string, entry: Partial<IntersectionObserverEntry>) => {
    const observerCall = mockIntersectionObserver.mock.calls.find(call => {
      const options = call[1]
      return options && options.rootMargin === rootMargin
    })

    if (observerCall) {
      const [callback] = observerCall
      const mockEntry = {
        isIntersecting: true,
        boundingClientRect: mockRect(),
        ...entry,
      }
      callback([mockEntry])
    }
  }

  // Container 600px wide with a 100px action leaves 400px, so three 100px links fit beside an 80px More button.
  const enableOverflowMeasurements = () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true}))
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
      return this.classList.contains('AnchorNav-inner-container') ? 600 : 0
    })
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const width = this.classList.contains('AnchorNav-overflow')
        ? 80
        : this.classList.contains('AnchorNav__actionsContainer')
        ? 100
        : this.classList.contains('AnchorNav-link-item')
        ? 100
        : 0
      return new DOMRect(0, 0, width, 60)
    })
  }

  // Reports an open/close event without recreating the browser's interactions.
  const notifyPopoverToggle = (menu: HTMLElement, newState: 'open' | 'closed') => {
    act(() => {
      menu.hidden = newState === 'closed'
      menu.dispatchEvent(Object.assign(new Event('toggle'), {newState}))
    })
  }

  beforeEach(() => {
    scrollListeners = new Set()

    mockUseWindowSize.mockImplementation(() => ({isSmall: true})) // assumes a wide viewport by default
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    jest.mocked(apply).mockImplementation(() => {
      for (const menu of document.querySelectorAll<HTMLElement>('[popover]')) {
        if (jest.isMockFunction(menu.hidePopover)) continue
        menu.hidden = true
        const matches = menu.matches.bind(menu)
        jest
          .spyOn(menu, 'matches')
          .mockImplementation(selector => (selector === ':popover-open' ? !menu.hidden : matches(selector)))
        menu.hidePopover = jest.fn(() => {
          menu.hidden = true
        })
      }
    })

    mockIntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
    window.IntersectionObserver = mockIntersectionObserver

    setScrollPosition(0)
    jest.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(5000)

    jest
      .spyOn(window, 'addEventListener')
      .mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'scroll') scrollListeners.add(typeof listener === 'function' ? listener : listener.handleEvent)
      })
    jest
      .spyOn(window, 'removeEventListener')
      .mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'scroll') scrollListeners.delete(typeof listener === 'function' ? listener : listener.handleEvent)
      })
  })

  afterEach(() => {
    cleanup()

    global.ResizeObserver = originalResizeObserver

    jest.useRealTimers()
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('renders the root element correctly into the document', () => {
    const {getByTestId} = render(<MockAnchorNavFixture />)

    expect(getByTestId(AnchorNav.testIds.root)).toBeInTheDocument() // expect the root element to be in the document
    expect(getByTestId(AnchorNav.testIds.root).tagName).toBe('nav'.toUpperCase()) // expect root to be a <nav> element
  })

  it('keeps its own styles when a custom className is passed', () => {
    const {getByTestId} = render(<MockAnchorNavFixture className="custom-class" />)

    expect(getByTestId(AnchorNav.testIds.root)).toHaveClass('AnchorNav', 'custom-class')
  })

  it('renders the correct number of links into the document', () => {
    const {getByTestId} = render(<MockAnchorNavFixture />)

    expect(within(getByTestId(AnchorNav.testIds.menuLinks)).getAllByRole('link')).toHaveLength(mockData.length)
  })

  it('renders no more than 9 links and warns about the extra links', () => {
    const moreLinks = Array.from({length: 10}, (_, index) => ({
      title: `Section ${index + 1}`,
      id: `section${index + 1}`,
    }))
    const {getByTestId} = render(<MockAnchorNavFixture data={moreLinks} />)

    const links = within(getByTestId(AnchorNav.testIds.menuLinks)).getAllByRole('link')

    expect(links).toHaveLength(9)
    expect(links.at(-1)).toHaveTextContent('Section 9')
    expect(warnSpy).toHaveBeenCalledWith('AnchorNav: Use no more than 9 links.')
  })

  it('renders a small secondary action by default', () => {
    const {getByRole} = render(<MockAnchorNavFixture />)
    const actionEl = getByRole('link', {name: 'Action'})

    expect(actionEl).toHaveAttribute('href', '#')
    expect(actionEl).toHaveClass('Button--secondary', 'Button--size-small')
  })

  it('renders only the first action and warns about the extra actions', () => {
    const {getByRole, queryByRole} = render(
      <AnchorNav>
        <AnchorNav.Link href="#section1">Section one</AnchorNav.Link>
        <AnchorNav.Action href="#">First action</AnchorNav.Action>
        <AnchorNav.Action href="#">Second action</AnchorNav.Action>
      </AnchorNav>,
    )

    expect(getByRole('link', {name: 'First action'})).toBeInTheDocument()
    expect(queryByRole('link', {name: 'Second action'})).not.toBeInTheDocument()
    expect(warnSpy).toHaveBeenCalledWith('AnchorNav: Use no more than one AnchorNav.Action.')
  })

  it('applies correct behaviors when menu button is toggled', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const user = userEvent.setup()
    const {getByTestId} = render(<MockAnchorNavFixture />)
    const menuButton = getByTestId(AnchorNav.testIds.menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'false') // aria attribute before menu open

    await user.click(menuButton) // toggle menu button

    expect(menuButton).toHaveAttribute('aria-expanded', 'true') // aria attribute after menu open
  })

  it.each([
    {menuLabels: undefined, name: 'Anchor navigation menu. Currently selected: Section one'},
    {menuLabels: {activeLabel: 'Ankernavigation. Ausgewählt:'}, name: 'Ankernavigation. Ausgewählt: Section one'},
  ])('names the narrow menu button with the active link ($name)', ({menuLabels, name}) => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const {getByRole} = render(<MockAnchorNavFixture menuLabels={menuLabels} />)

    expect(getByRole('button', {name})).toBeInTheDocument()
  })

  it.each([
    {props: {}, name: 'Anchored navigation'},
    {props: {menuLabels: {navigationLabel: 'Page sections'}}, name: 'Page sections'},
    {
      props: {'aria-label': 'Product sections', menuLabels: {navigationLabel: 'Page sections'}},
      name: 'Product sections',
    },
  ])('names the navigation landmark $name', ({props, name}) => {
    const {getByRole} = render(<MockAnchorNavFixture {...props} />)

    expect(getByRole('navigation', {name})).toBeInTheDocument()
  })

  it('marks the short section under the nav as the only active link and updates the menu label', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const {getByRole, getByTestId} = render(<MockAnchorNavFixture />)

    scrollSections(400, {section1: -400, section2: -200, section3: 0, section4: 200, section5: 400})

    expect(getByRole('button', {name: /Currently selected: Section three/})).toBeInTheDocument()
    expect(
      within(getByTestId(AnchorNav.testIds.menuLinks))
        .getAllByRole('link', {current: true})
        .map(link => link.textContent),
    ).toEqual(['Section three'])
  })

  it.each([
    {sectionTops: undefined, current: 'Section one'},
    {
      sectionTops: {section1: -400, section2: -200, section3: 0, section4: 200, section5: 400},
      current: 'Section three',
    },
  ])('marks the menu button link as current in the open narrow menu ($current)', async ({sectionTops, current}) => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const user = userEvent.setup()
    const {getByRole, getByTestId} = render(<MockAnchorNavFixture />)
    if (sectionTops) scrollSections(400, sectionTops)

    await user.click(getByRole('button', {name: `Anchor navigation menu. Currently selected: ${current}`}))

    expect(
      within(getByTestId(AnchorNav.testIds.menuLinks))
        .getAllByRole('link', {current: true})
        .map(link => link.textContent),
    ).toEqual([current])
  })

  it.each([0, 200])('ignores hidden targets while tracking rendered targets with height %ipx', sectionHeight => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const {getByRole, getByText} = render(<MockAnchorNavFixture />)
    getByText('Section five', {selector: 'section'}).hidden = true

    scrollSections(240, {section1: -240, section2: -40, section3: 160, section4: 360, section5: 0}, sectionHeight)

    expect(getByRole('link', {current: true})).toHaveTextContent('Section two')
    expect(getByRole('button', {name: /Currently selected: Section two/})).toBeInTheDocument()
  })

  it.each(['section', 'page'])('updates the active section after a %s resize without scrolling', source => {
    jest.useFakeTimers()
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const observers: {
      callback: ResizeObserverCallback
      observer: ResizeObserver
      targets: Element[]
      disconnect: jest.Mock
    }[] = []
    global.ResizeObserver = jest.fn().mockImplementation((callback: ResizeObserverCallback) => {
      const targets: Element[] = []
      const disconnect = jest.fn()
      const observer: ResizeObserver = {
        observe: target => targets.push(target),
        unobserve: jest.fn(),
        disconnect,
      }
      observers.push({callback, observer, targets, disconnect})
      return observer
    })
    const {getByRole, getByText, unmount} = render(<MockAnchorNavFixture />)
    const sectionTwo = getByText('Section two', {selector: 'section'})
    const resizeTarget = source === 'section' ? sectionTwo : document.body
    const notifyResize = () => {
      act(() => {
        for (const {callback, observer, targets, disconnect} of [...observers]) {
          if (targets.includes(resizeTarget) && disconnect.mock.calls.length === 0) callback([], observer)
        }
      })
    }
    const sectionTops = {section1: -400, section2: -200, section3: 0, section4: 200, section5: 400}
    scrollSections(400, sectionTops)
    expect(getByRole('link', {current: true})).toHaveTextContent('Section three')

    if (source === 'section') {
      sectionTwo.getBoundingClientRect = jest.fn(() => new DOMRect(0, -200, 0, 500))
      Object.assign(sectionTops, {section3: 300, section4: 500, section5: 700})
    } else {
      Object.assign(sectionTops, {section1: -100, section2: 100, section3: 300, section4: 500, section5: 700})
    }
    notifyResize()

    expect(getByRole('link', {current: true})).toHaveTextContent('Section two')
    expect(getByRole('button', {name: /Currently selected: Section two/})).toBeInTheDocument()

    fireEvent.click(getByRole('link', {name: 'Section four'}))
    notifyResize()
    expect(getByRole('link', {current: true})).toHaveTextContent('Section four')
    act(() => jest.runOnlyPendingTimers())
    expect(getByRole('link', {current: true})).toHaveTextContent('Section two')

    unmount()
    for (const {disconnect} of observers) expect(disconnect).toHaveBeenCalledTimes(1)
  })

  it('marks a selected link active straight away and keeps it active while the page scrolls to its section', () => {
    jest.useFakeTimers()
    const {getByRole} = render(<MockAnchorNavFixture />)
    const sectionFour = getByRole('link', {name: 'Section four'})

    scrollSections(0, {section1: 0, section2: 200, section3: 400, section4: 600, section5: 800})
    fireEvent.click(sectionFour)
    expect(sectionFour).toHaveAttribute('aria-current', 'true')

    // Each scroll restarts the wait, so the sections passed on the way don't become active.
    act(() => jest.advanceTimersByTime(100))
    scrollSections(300, {section1: -300, section2: -100, section3: 100, section4: 300, section5: 500})
    act(() => jest.advanceTimersByTime(100))
    expect(sectionFour).toHaveAttribute('aria-current', 'true')

    scrollSections(600, {section1: -600, section2: -400, section3: -200, section4: 0, section5: 200})
    act(() => jest.runOnlyPendingTimers())
    expect(sectionFour).toHaveAttribute('aria-current', 'true')

    scrollSections(400, {section1: -400, section2: -200, section3: 0, section4: 200, section5: 400})
    expect(getByRole('link', {name: 'Section three'})).toHaveAttribute('aria-current', 'true')
  })

  it('prefers the selected section, then the last visible section, at the bottom of the page', () => {
    jest.useFakeTimers()
    jest.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(1000 + window.innerHeight)
    const {getByRole} = render(<MockAnchorNavFixture />)
    const bottomSectionTops = {section1: -432, section2: -232, section3: -32, section4: 168, section5: 368}

    scrollSections(1000, bottomSectionTops)
    expect(getByRole('link', {name: 'Section five'})).toHaveAttribute('aria-current', 'true')

    fireEvent.click(getByRole('link', {name: 'Section four'}))
    act(() => jest.runOnlyPendingTimers())
    expect(getByRole('link', {name: 'Section four'})).toHaveAttribute('aria-current', 'true')

    scrollSections(900, {section1: -332, section2: -132, section3: 68, section4: 268, section5: 468})
    expect(getByRole('link', {name: 'Section three'})).toHaveAttribute('aria-current', 'true')

    scrollSections(1000, bottomSectionTops)
    expect(getByRole('link', {name: 'Section five'})).toHaveAttribute('aria-current', 'true')
  })

  it.each([false, true])(
    'calls the link onClick handler and closes the narrow menu unless prevented (preventDefault: %s)',
    async preventDefault => {
      mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
      const user = userEvent.setup()
      const onLinkClick = jest.fn((event: React.MouseEvent) => {
        if (preventDefault) event.preventDefault()
      })
      const {getByRole, getByTestId} = render(<MockAnchorNavFixture onLinkClick={onLinkClick} />)
      const menuButton = getByTestId(AnchorNav.testIds.menuButton)

      await user.click(menuButton)
      await user.click(getByRole('link', {name: 'Section two'}))

      expect(onLinkClick).toHaveBeenCalledTimes(1)
      expect(menuButton).toHaveAttribute('aria-expanded', String(preventDefault))
    },
  )

  it('renders correct class for hideUntilSticky behavior', () => {
    const {getByTestId} = render(<MockAnchorNavFixture hideUntilSticky />)
    const rootEl = getByTestId(AnchorNav.testIds.root)

    expect(rootEl.classList).toContain('AnchorNav--hide-until-sticky')
  })

  it('has no a11y violations on initial render', async () => {
    const {container} = render(<MockAnchorNavFixture />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it.each([0, 100])(
    'shows an equivalent height spacer when nav is sticky and hides it when not (nav position: %i)',
    async navPosition => {
      const MockPage = () => (
        <div style={{height: '200vh'}}>
          <MockAnchorNavFixture />
          <div style={{height: '100vh'}}>After nav</div>
        </div>
      )

      const {getByTestId, queryByTestId} = render(<MockPage />)
      const rootEl = getByTestId(AnchorNav.testIds.root)

      expect(rootEl).not.toHaveClass('AnchorNav--stuck')
      expect(queryByTestId(AnchorNav.testIds.navSpacer)).not.toBeInTheDocument()

      await simulateNavBecomingSticky(navPosition, navPosition + 50)
      expect(rootEl).toHaveClass('AnchorNav--stuck')
      expect(getByTestId(AnchorNav.testIds.navSpacer)).toBeInTheDocument()

      await act(async () => {
        setScrollPosition(navPosition)
        await triggerScrollEvent()
      })

      expect(rootEl).not.toHaveClass('AnchorNav--stuck')
      expect(queryByTestId(AnchorNav.testIds.navSpacer)).not.toBeInTheDocument()
    },
  )

  it('moves trailing links that do not fit into the More menu', () => {
    enableOverflowMeasurements()
    const {getByRole, getByTestId} = render(<MockAnchorNavFixture menuLabels={{overflowMenuLabel: 'Mehr'}} />)
    const row = getByTestId(AnchorNav.testIds.menuLinks)
    const overflowButton = getByRole('button', {name: 'Mehr'})
    const overflowMenu = getByTestId(AnchorNav.testIds.overflowMenu)

    expect(
      within(row)
        .getAllByRole('link')
        .filter(link => !overflowMenu.contains(link))
        .map(link => link.textContent),
    ).toEqual(['Section one', 'Section two', 'Section three'])
    for (const name of ['Section four', 'Section five']) {
      const item = within(row)
        .getAllByRole('link', {name, hidden: true})
        .find(link => !overflowMenu.contains(link))
        ?.closest('li')
      expect(item).toHaveAttribute('inert')
      expect(item).toHaveAttribute('aria-hidden', 'true')
    }
    expect(overflowButton).toHaveAttribute('popovertarget', overflowMenu.id)

    notifyPopoverToggle(overflowMenu, 'open')

    expect(overflowButton).toHaveAttribute('aria-expanded', 'true')
    expect(
      within(getByRole('list', {name: 'Mehr'}))
        .getAllByRole('link')
        .map(link => link.textContent),
    ).toEqual(['Section four', 'Section five'])
  })

  it('marks the More button as active when the active section is in the More menu', () => {
    enableOverflowMeasurements()
    const {getByRole, getByTestId} = render(<MockAnchorNavFixture />)
    const overflowButton = getByRole('button', {name: 'More'})

    scrollSections(200, {section1: -200, section2: 0, section3: 200, section4: 400, section5: 600})
    expect(overflowButton).not.toHaveClass('AnchorNav-link--is-active')

    scrollSections(800, {section1: -800, section2: -600, section3: -400, section4: -200, section5: 0})
    expect(overflowButton).toHaveClass('AnchorNav-link--is-active')
    // The hidden copy of the link left in the row isn't marked.
    expect(
      within(getByTestId(AnchorNav.testIds.menuLinks)).getAllByRole('link', {current: true, hidden: true}),
    ).toHaveLength(1)
  })

  it('keeps the consumer ID only on the interactive link when entering and leaving overflow', () => {
    enableOverflowMeasurements()
    const {getByRole, getByTestId, rerender} = render(<MockAnchorNavFixture />)
    const overflowMenu = getByTestId(AnchorNav.testIds.overflowMenu)
    notifyPopoverToggle(overflowMenu, 'open')

    const overflowLink = within(overflowMenu).getByRole('link', {name: 'Section four'})
    expect(document.querySelectorAll('[id="link-section4"]')).toHaveLength(1)
    expect(document.getElementById('link-section4')).toBe(overflowLink)

    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    rerender(<MockAnchorNavFixture />)

    const rowLink = getByRole('link', {name: 'Section four'})
    expect(document.querySelectorAll('[id="link-section4"]')).toHaveLength(1)
    expect(document.getElementById('link-section4')).toBe(rowLink)
    expect(overflowMenu).not.toContainElement(rowLink)
  })

  it('moves the active underline to the active link, or only the More label when that link is in its menu', () => {
    enableOverflowMeasurements()
    const measure = jest.mocked(HTMLElement.prototype.getBoundingClientRect).getMockImplementation()
    const targetLefts: Record<string, number> = {'Section two': 120, More: 360}
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      if (['A', 'BUTTON'].includes(this.tagName) && this.textContent in targetLefts) {
        return new DOMRect(targetLefts[this.textContent], 16, 90, 24)
      }
      if (this.classList.contains('AnchorNav-link-label') && this.textContent in targetLefts) {
        return new DOMRect(targetLefts[this.textContent], 20, this.textContent === 'More' ? 50 : 90, 14)
      }
      return measure ? measure.call(this) : new DOMRect()
    })
    render(<MockAnchorNavFixture />)
    const indicator = document.querySelector<HTMLElement>('.AnchorNav-active-indicator')

    scrollSections(200, {section1: -200, section2: 0, section3: 200, section4: 400, section5: 600})
    expect(indicator).toHaveClass('AnchorNav-active-indicator--visible')
    expect(indicator?.style.getPropertyValue('--anchorNav-indicator-x')).toBe('120px')
    expect(indicator?.style.getPropertyValue('--anchorNav-indicator-y')).toBe('40px')
    expect(indicator?.style.getPropertyValue('--anchorNav-indicator-size')).toBe('90px')

    scrollSections(800, {section1: -800, section2: -600, section3: -400, section4: -200, section5: 0})
    expect(indicator?.style.getPropertyValue('--anchorNav-indicator-x')).toBe('360px')
    expect(indicator?.style.getPropertyValue('--anchorNav-indicator-y')).toBe('40px')
    expect(indicator?.style.getPropertyValue('--anchorNav-indicator-size')).toBe('50px')
  })

  it('closes the More menu when one of its links is selected', async () => {
    enableOverflowMeasurements()
    const {getByRole, getByTestId} = render(<MockAnchorNavFixture />)
    const overflowMenu = getByTestId(AnchorNav.testIds.overflowMenu)
    notifyPopoverToggle(overflowMenu, 'open')

    await userEvent.click(within(getByRole('list', {name: 'More'})).getByRole('link', {name: 'Section four'}))

    expect(overflowMenu.hidePopover).toHaveBeenCalledTimes(1)
  })

  it('has no a11y violations with the More menu open', async () => {
    enableOverflowMeasurements()
    const {container, getByTestId} = render(<MockAnchorNavFixture />)
    notifyPopoverToggle(getByTestId(AnchorNav.testIds.overflowMenu), 'open')

    expect(await axe(container)).toHaveNoViolations()
  })

  it.each([
    {actionWidth: 220, isFolded: true},
    {actionWidth: 100, isFolded: false},
  ])(
    'folds the action into the narrow menu only when it does not fit (action width: $actionWidth)',
    async ({actionWidth, isFolded}) => {
      mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
      jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
        if (this.classList.contains('AnchorNav-inner-container')) return 360
        return this.classList.contains('AnchorNav-link-label') ? 100 : 0
      })
      jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function (this: HTMLElement) {
        return this.classList.contains('AnchorNav-link-label') ? 100 : 0
      })
      jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        const width = this.classList.contains('AnchorNav-menu-button')
          ? 150
          : this.classList.contains('AnchorNav__actionsContainer')
          ? actionWidth
          : 0
        return new DOMRect(0, 0, width, 60)
      })
      const user = userEvent.setup()
      const {getByRole, getByTestId} = render(<MockAnchorNavFixture />)
      const actionContainer = getByRole('link', {name: 'Action'}).parentElement

      expect(actionContainer?.classList.contains('AnchorNav__actionsContainer--hidden')).toBe(isFolded)

      await user.click(getByTestId(AnchorNav.testIds.menuButton))

      expect(actionContainer).not.toHaveClass('AnchorNav__actionsContainer--hidden')
    },
  )

  it('moves focus to first link immediately when menu is opened', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const user = userEvent.setup()

    const {getByRole} = render(<MockAnchorNavFixture />)
    const menuButton = getByRole('button', {name: /navigation menu/i})
    const firstLink = getByRole('link', {name: 'Section one'})

    await user.click(menuButton)

    expect(document.activeElement).toBe(firstLink)
  })

  it('closes menu when focus leaves the expanded menu on narrow viewports', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const user = userEvent.setup()

    const {getByRole} = render(
      <>
        <MockAnchorNavFixture />
        <button>Button outside nav</button>
      </>,
    )
    const menuButton = getByRole('button', {name: /navigation menu/i})

    await user.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await user.tab() // Normal link
    await user.tab() // Normal link
    await user.tab() // Normal link
    await user.tab() // Normal link
    await user.tab() // Button
    await user.tab() // Button

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps the narrow expanded menu open when tabbing between links', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const user = userEvent.setup()

    const {getByRole} = render(<MockAnchorNavFixture />)
    const menuButton = getByRole('button', {name: /navigation menu/i})
    const secondLink = getByRole('link', {name: 'Section two'})

    await user.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await user.tab() // tabs to second link

    expect(document.activeElement).toBe(secondLink)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('keeps the expanded narrow menu open when tabbing to action buttons (which are outside of the linkContainer)', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false}))
    const user = userEvent.setup()

    const {getByRole} = render(<MockAnchorNavFixture />)
    const menuButton = getByRole('button', {name: /navigation menu/i})
    const actionButton = getByRole('link', {name: 'Action'})

    await user.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await user.tab() // Normal link
    await user.tab() // Normal link
    await user.tab() // Normal link
    await user.tab() // Normal link
    await user.tab() // Button

    expect(document.activeElement).toBe(actionButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })
})
