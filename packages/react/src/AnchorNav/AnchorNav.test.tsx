import React, {render, cleanup, fireEvent, act} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {AnchorNav} from './AnchorNav'
import '../test-utils/mocks/match-media-mock'

expect.extend(toHaveNoViolations)

const mockData = [
  {title: 'Section one', id: 'section1'},
  {title: 'Section two', id: 'section2'},
  {title: 'Section three', id: 'section3'},
  {title: 'Section four', id: 'section4'},
  {title: 'Section five', id: 'section5'},
]
const MockAnchorNavFixture = ({data = mockData, withSecondAction = false, ...rest}) => {
  return (
    <>
      <AnchorNav data-testid={AnchorNav.testIds.root} {...rest}>
        {data.map((item, index) => {
          return (
            <AnchorNav.Link key={index} href={`#${item.id}`}>
              {item.title}
            </AnchorNav.Link>
          )
        })}
        <AnchorNav.Action href="#">Action</AnchorNav.Action>
        {withSecondAction && <AnchorNav.SecondaryAction href="#">Secondary action</AnchorNav.SecondaryAction>}
      </AnchorNav>
      {data.map((item, index) => {
        return (
          <section key={index} id={item.id}>
            {item.title}
          </section>
        )
      })}
    </>
  )
}

describe('AnchorNav', () => {
  let mockIntersectionObserver: jest.Mock
  let addEventListenerSpy: jest.SpyInstance
  let removeEventListenerSpy: jest.SpyInstance
  let scrollListener: EventListener | null

  const setScrollPosition = (position: number) => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: position,
    })
  }

  const triggerScrollEvent = async () => {
    if (scrollListener) {
      scrollListener(new Event('scroll'))
    }
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
    right: 100,
    width: 100,
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
        intersectionRatio: 1,
        intersectionRect: mockRect(),
        rootBounds: mockRect(),
        target: document.createElement('nav'),
        time: Date.now(),
        ...entry,
      }
      callback([mockEntry])
    }
  }

  afterEach(cleanup)

  beforeEach(() => {
    scrollListener = null

    mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })
    window.IntersectionObserver = mockIntersectionObserver

    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    })

    addEventListenerSpy = jest
      .spyOn(window, 'addEventListener')
      .mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'scroll') {
          scrollListener = typeof listener === 'function' ? listener : listener.handleEvent
        }
      })

    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener').mockImplementation((type: string) => {
      if (type === 'scroll') {
        scrollListener = null
      }
    })
  })

  afterEach(() => {
    cleanup()

    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()

    jest.clearAllMocks()
  })

  it('renders the root element correctly into the document', () => {
    const {getByTestId} = render(<MockAnchorNavFixture />)

    expect(getByTestId(AnchorNav.testIds.root)).toBeInTheDocument() // expect the root element to be in the document
    expect(getByTestId(AnchorNav.testIds.root).tagName).toBe('nav'.toUpperCase()) // expect root to be a <nav> element
  })

  it('renders the correct number of links into the document', () => {
    const {getByTestId} = render(<MockAnchorNavFixture />)

    expect(getByTestId(AnchorNav.testIds.menuLinks).children.length).toBe(mockData.length)
  })

  it('renders fewer than 5 into the document with correct styles', () => {
    const fewerLinks = mockData.slice(0, 3)
    const {getByTestId} = render(<MockAnchorNavFixture data={fewerLinks} />)

    const linkContainerEl = getByTestId(AnchorNav.testIds.menuLinks)
    const linkContainerAsArray = Array.from(linkContainerEl.children)

    expect(linkContainerEl.children.length).toBe(fewerLinks.length) // renders fewer links

    for (const linkEl of linkContainerAsArray) {
      expect(linkEl.classList).toContain(`AnchorNav-link--start`) // links have correct styles
    }
  })

  it('does not render more than 5 into the document ', () => {
    const moreLinks = [...mockData, {title: 'Section six', id: 'section6'}]
    const {getByTestId} = render(<MockAnchorNavFixture data={moreLinks} />)

    const linkContainerEl = getByTestId(AnchorNav.testIds.menuLinks)

    expect(linkContainerEl.children.length).toBe(5) // renders fewer links than the input
  })

  it('identifies first link using a data attribute', () => {
    const {getByTestId} = render(<MockAnchorNavFixture />)

    const linkContainerEl = getByTestId(AnchorNav.testIds.menuLinks)
    const linkContainerAsArray = Array.from(linkContainerEl.children)

    for (const [index, linkEl] of linkContainerAsArray.entries()) {
      if (index === 0) {
        expect(linkEl).toHaveAttribute('data-first', 'true') // first is active by default
      } else {
        expect(linkEl).toHaveAttribute('data-first', 'false') // second+ is not active by default
      }
    }
  })

  it('renders an action correctly', () => {
    const {getByTestId} = render(<MockAnchorNavFixture />)
    const actionEl = getByTestId(AnchorNav.testIds.action)
    expect(actionEl).toBeInTheDocument() // renders
    expect(actionEl).toBeInTheDocument() // renders as an anchor
    expect(actionEl).toHaveAttribute('href', '#') // renders with correct href
  })

  it('renders an secondary correctly', () => {
    const {getByTestId} = render(<MockAnchorNavFixture withSecondAction />)
    const secondaryActionEl = getByTestId(AnchorNav.testIds.secondaryAction)
    expect(secondaryActionEl).toBeInTheDocument() // renders
    expect(secondaryActionEl).toBeInTheDocument() // renders as an anchor
    expect(secondaryActionEl).toHaveAttribute('href', '#') // renders with correct href
  })

  it('applies secondary as default variant when one action is present', () => {
    const {getByTestId} = render(<MockAnchorNavFixture />)
    const actionEl = getByTestId(AnchorNav.testIds.action)
    expect(actionEl).toHaveClass('Button--secondary')
  })

  it('applies correct variant attributes to multiple actions', () => {
    const {getByTestId} = render(<MockAnchorNavFixture withSecondAction />)
    const actionEl = getByTestId(AnchorNav.testIds.action)
    const secondaryActionEl = getByTestId(AnchorNav.testIds.secondaryAction)
    expect(actionEl).toHaveClass('Button--primary')
    expect(secondaryActionEl).toHaveClass('Button--secondary')
  })

  it('applies correct behaviors when menu button is toggled', () => {
    const {getByTestId} = render(<MockAnchorNavFixture />)
    const menuButton = getByTestId(AnchorNav.testIds.menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'false') // aria attribute before menu open

    fireEvent.click(menuButton) // toggle menu button

    expect(menuButton).toHaveAttribute('aria-expanded', 'true') // aria attribute before menu open
  })

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

  it('shows an equivalent height spacer when nav is sticky and hides it when not', async () => {
    const MockPage = () => (
      <div style={{height: '200vh'}}>
        <div style={{height: '100px'}}>Before nav</div>
        <MockAnchorNavFixture />
        <div style={{height: '100vh'}}>After nav</div>
      </div>
    )

    const {getByTestId, queryByTestId} = render(<MockPage />)
    const rootEl = getByTestId(AnchorNav.testIds.root)
    const navPosition = 100

    expect(rootEl).not.toHaveClass('AnchorNav--stuck')
    expect(queryByTestId(AnchorNav.testIds.navSpacer)).not.toBeInTheDocument()

    await simulateNavBecomingSticky(navPosition, navPosition + 50)
    expect(rootEl).toHaveClass('AnchorNav--stuck')
    expect(getByTestId(AnchorNav.testIds.navSpacer)).toBeInTheDocument()

    await act(async () => {
      setScrollPosition(navPosition - 50)
      await triggerScrollEvent()
    })

    expect(rootEl).not.toHaveClass('AnchorNav--stuck')
    expect(queryByTestId(AnchorNav.testIds.navSpacer)).not.toBeInTheDocument()
  })
})
