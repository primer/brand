import React, {HTMLAttributes, useEffect} from 'react'
import {act, render, cleanup, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {SubNav} from './SubNav'
import '../test-utils/mocks/match-media-mock'
import userEvent from '@testing-library/user-event'
import {useWindowSize} from '../hooks/useWindowSize'
import {apply} from '@oddbird/popover-polyfill/fn'

jest.mock('@oddbird/popover-polyfill/fn', () => ({
  apply: jest.fn(),
  isSupported: jest.fn().mockReturnValue(false),
  isPolyfilled: jest.fn().mockReturnValue(true),
}))
jest.mock('../hooks/useWindowSize')
const mockUseWindowSize = useWindowSize as jest.Mock
mockUseWindowSize.mockImplementation(() => ({isLarge: false}))

expect.extend(toHaveNoViolations)

const mockLinkData = [
  {title: 'page one', href: '#page1'},
  {title: 'page two', href: '#page2'},
  {title: 'page three', href: '#page3', 'aria-current': 'page'},
  {title: 'page four', href: '#page4'},
  {title: 'page five', href: '#page5'},
]

const heading = 'Features'
const headingLink = '#features'

const MockSubNavFixture = ({data = mockLinkData, ...rest}) => {
  return (
    <SubNav {...rest}>
      <SubNav.Heading href={headingLink}>{heading}</SubNav.Heading>
      {data.map((link, index) => (
        <SubNav.Link
          key={index}
          href={link.href}
          aria-current={link['aria-current'] as HTMLAttributes<HTMLElement>['aria-current']}
        >
          {link.title}
        </SubNav.Link>
      ))}
    </SubNav>
  )
}

const MockSubNavFixtureWithSubMenu = () => (
  <SubNav fullWidth>
    <SubNav.Link href="#" aria-current="page">
      Copilot
      <SubNav.SubMenu>
        <SubNav.Link href="#">Copilot feature page one</SubNav.Link>
        <SubNav.Link href="#">Copilot feature page two</SubNav.Link>
        <SubNav.Link href="#">Copilot feature page three</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href="#">Code review</SubNav.Link>
    <SubNav.Link href="#">Search</SubNav.Link>
    <SubNav.Action href="#">Call to action</SubNav.Action>
  </SubNav>
)

describe('SubNav', () => {
  const originalBodyOverflow = document.body.style.overflow
  const originalResizeObserver = global.ResizeObserver
  const originalFontsDescriptor = Object.getOwnPropertyDescriptor(document, 'fonts')
  const anchorViewports = [
    {viewport: 'narrow', isLarge: false},
    {viewport: 'wide', isLarge: true},
  ]
  let availableWidth: number
  let linkWidth: number
  let observerCallbacks: ResizeObserverCallback[]
  let resizeObserverMock: {observe: jest.Mock; unobserve: jest.Mock; disconnect: jest.Mock}

  beforeEach(() => {
    availableWidth = 300
    linkWidth = 100
    observerCallbacks = []
    resizeObserverMock = {observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn()}
    mockUseWindowSize.mockImplementation(() => ({isLarge: false}))

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

    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
    document.body.style.overflow = originalBodyOverflow
    global.ResizeObserver = originalResizeObserver
    if (originalFontsDescriptor) {
      Object.defineProperty(document, 'fonts', originalFontsDescriptor)
    } else {
      Reflect.deleteProperty(document, 'fonts')
    }
  })

  const enableWideMenuMeasurements = () => {
    mockUseWindowSize.mockImplementation(() => ({isLarge: true}))
    global.ResizeObserver = jest.fn().mockImplementation(callback => {
      observerCallbacks.push(callback)
      return resizeObserverMock
    })
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
      return this.classList.contains('SubNav__links-overlay') ? availableWidth : 0
    })
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const width = this.classList.contains('SubNav__overflow-container')
        ? 80
        : this.classList.contains('SubNav__action-container')
        ? 120
        : linkWidth
      return new DOMRect(0, 0, width, 60)
    })
  }

  const resize = async () => {
    await act(async () => {
      for (const callback of observerCallbacks) callback([], resizeObserverMock as unknown as ResizeObserver)
      await new Promise(resolve => requestAnimationFrame(resolve))
    })
  }

  // Reports an open/close event without recreating the browser's interactions.
  const notifyPopoverToggle = (menu: HTMLElement, newState: 'open' | 'closed') => {
    act(() => {
      menu.hidden = newState === 'closed'
      menu.dispatchEvent(Object.assign(new Event('toggle'), {newState}))
    })
  }

  const createEntry = (target: Element, top: number, intersectionRatio: number) =>
    ({target, boundingClientRect: new DOMRect(0, top, 360, 58), intersectionRatio} as IntersectionObserverEntry)

  const renderAnchorMenu = (isLarge: boolean) => {
    mockUseWindowSize.mockImplementation(() => ({isLarge}))
    const observe = jest.fn()
    const anchorObserver = {observe, unobserve: jest.fn(), disconnect: jest.fn()}
    const mockIntersectionObserver = window.IntersectionObserver as jest.Mock
    mockIntersectionObserver.mockReturnValue(anchorObserver)
    const {unmount} = render(<MockSubNavFixture />)
    const target = observe.mock.calls[0][0] as HTMLElement
    const callback = mockIntersectionObserver.mock.calls[0][0] as IntersectionObserverCallback
    return {target, callback, observer: anchorObserver as unknown as IntersectionObserver, unmount}
  }

  it('renders the root element correctly into the document', () => {
    const {getByRole} = render(<MockSubNavFixture />)

    expect(getByRole('navigation')).toBeInTheDocument()
  })

  it.each(anchorViewports)('ignores stale sticky anchor updates at $viewport viewports', ({isLarge}) => {
    const {target, callback, observer} = renderAnchorMenu(isLarge)

    act(() => callback([createEntry(target, -1, 0), createEntry(target, 120, 1)], observer))

    expect(target).not.toHaveClass('SubNav__anchor-menu-outer-container--stuck')
  })

  it.each(anchorViewports)('keeps the anchor menu hidden below a $viewport viewport', ({isLarge}) => {
    const {target, callback, observer} = renderAnchorMenu(isLarge)

    act(() => callback([createEntry(target, 900, 0)], observer))

    expect(target).not.toHaveClass('SubNav__anchor-menu-outer-container--stuck')
  })

  it.each(anchorViewports)('reveals and resets the sticky anchor menu at $viewport viewports', ({isLarge}) => {
    const {target, callback, observer} = renderAnchorMenu(isLarge)

    act(() => callback([createEntry(target, 120, 1), createEntry(target, -1, 0.98)], observer))
    expect(target).toHaveClass('SubNav__anchor-menu-outer-container--stuck')

    act(() => callback([createEntry(target, 120, 1)], observer))
    expect(target).not.toHaveClass('SubNav__anchor-menu-outer-container--stuck')
  })

  it.each(anchorViewports)('stops observing the $viewport anchor menu on unmount', ({isLarge}) => {
    const {target, observer, unmount} = renderAnchorMenu(isLarge)

    unmount()

    expect(observer.unobserve).toHaveBeenCalledWith(target)
  })

  it.each(anchorViewports)('renders $viewport anchor links into the shared portal', ({isLarge}) => {
    jest.replaceProperty(window, 'innerWidth', isLarge ? 1280 : 360)
    mockUseWindowSize.mockImplementation(jest.requireActual('../hooks/useWindowSize').useWindowSize)
    const {getByRole} = render(
      <SubNav>
        <SubNav.Link href="#overview" aria-current="page">
          Overview
          <SubNav.SubMenu variant="anchor">
            <SubNav.Link href="#scale">Scale</SubNav.Link>
          </SubNav.SubMenu>
        </SubNav.Link>
      </SubNav>,
    )
    const navigation = getByRole('navigation', {name: 'Sub navigation'})

    expect(navigation.closest('.SubNav__anchor-menu-container')).not.toBeNull()
    expect(within(navigation).getByRole('link', {name: 'Scale'})).toBeInTheDocument()
  })

  it('keeps all wide-menu links in the row when their measured widths fit', () => {
    enableWideMenuMeasurements()
    availableWidth = 500
    const {getByRole, queryByRole} = render(<MockSubNavFixture />)

    expect(within(getByRole('list')).getAllByRole('link')).toHaveLength(5)
    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()
    expect(queryByRole('button', {name: /navigation menu/i})).not.toBeInTheDocument()
  })

  it('applies the row overlay modifier without leaking it to popup or submenu links', () => {
    enableWideMenuMeasurements()
    const {getByRole} = render(
      <SubNav>
        <SubNav.Link href="#one" className="consumer-link-class">
          Page one
        </SubNav.Link>
        <SubNav.Link href="#two">Page two</SubNav.Link>
        <SubNav.Link href="#copilot">
          Copilot
          <SubNav.SubMenu>
            <SubNav.Link href="#feature">Copilot feature</SubNav.Link>
          </SubNav.SubMenu>
        </SubNav.Link>
        <SubNav.Link href="#four">Page four</SubNav.Link>
      </SubNav>,
    )

    expect(getByRole('link', {name: 'Page one'})).toHaveClass('consumer-link-class', 'SubNav__link--in-overlay')
    const popup = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(popup, 'open')

    for (const name of ['Copilot', 'Copilot feature', 'Page four']) {
      expect(within(popup).getByRole('link', {name})).not.toHaveClass('SubNav__link--in-overlay')
    }
  })

  it('keeps wide-menu links visible until the row can be measured', () => {
    enableWideMenuMeasurements()
    availableWidth = 0
    const {getByRole, queryByRole, rerender} = render(<MockSubNavFixture />)

    expect(within(getByRole('list')).getAllByRole('link')).toHaveLength(mockLinkData.length)
    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()

    const nextLinkData = [...mockLinkData, {title: 'page six', href: '#page6'}]
    rerender(<MockSubNavFixture data={nextLinkData} />)

    expect(within(getByRole('list')).getAllByRole('link')).toHaveLength(nextLinkData.length)
    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()
  })

  it('keeps consumer link IDs and refs unique while links overflow and resize', async () => {
    enableWideMenuMeasurements()
    availableWidth = 250
    const linkRef = React.createRef<HTMLAnchorElement>()
    const {container, getByRole} = render(
      <SubNav>
        <SubNav.Link href="#one">Page one</SubNav.Link>
        <SubNav.Link href="#two">Page two</SubNav.Link>
        <SubNav.Link href="#three" id="consumer-link" ref={linkRef} aria-describedby="consumer-description">
          Page three
        </SubNav.Link>
      </SubNav>,
    )
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(menu, 'open')
    const link = within(menu).getByRole('link', {name: 'Page three'})

    expect(container.querySelectorAll('#consumer-link')).toHaveLength(1)
    expect(document.getElementById('consumer-link')).toBe(link)
    expect(linkRef.current).toBe(link)
    expect(link).toHaveAttribute('aria-describedby', 'consumer-description')
    const measurementLink = container.querySelector('.SubNav__link-item--overflowed a[href="#three"]')
    expect(measurementLink).not.toBeNull()
    expect(measurementLink).not.toHaveAttribute('aria-describedby')

    availableWidth = 600
    await resize()
    const rowLink = getByRole('link', {name: 'Page three'})
    expect(container.querySelectorAll('#consumer-link')).toHaveLength(1)
    expect(document.getElementById('consumer-link')).toBe(rowLink)
    expect(linkRef.current).toBe(rowLink)

    availableWidth = 250
    await resize()
    notifyPopoverToggle(menu, 'open')
    const overflowLink = within(menu).getByRole('link', {name: 'Page three'})
    expect(container.querySelectorAll('#consumer-link')).toHaveLength(1)
    expect(linkRef.current).toBe(overflowLink)
  })

  it('keeps consumer submenu and label identity out of overflow measurement copies', () => {
    enableWideMenuMeasurements()
    availableWidth = 250
    const nestedRef = React.createRef<HTMLAnchorElement>()
    const labelRef = React.createRef<HTMLSpanElement>()
    const {container, getByRole} = render(
      <SubNav>
        <SubNav.Link href="#one">Page one</SubNav.Link>
        <SubNav.Link href="#two">Page two</SubNav.Link>
        <SubNav.Link href="#copilot">
          <React.Fragment>
            <span id="consumer-label" ref={labelRef}>
              Copilot
            </span>
          </React.Fragment>
          <SubNav.SubMenu id="consumer-submenu" aria-labelledby="consumer-label">
            <SubNav.Link href="#feature" id="consumer-feature" ref={nestedRef} aria-describedby="consumer-description">
              Copilot feature
            </SubNav.Link>
          </SubNav.SubMenu>
        </SubNav.Link>
      </SubNav>,
    )
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(menu, 'open')
    const nestedLink = within(menu).getByRole('link', {name: 'Copilot feature'})

    for (const id of ['consumer-label', 'consumer-submenu', 'consumer-feature']) {
      expect(container.querySelectorAll(`[id="${id}"]`)).toHaveLength(1)
    }
    expect(nestedRef.current).toBe(nestedLink)
    expect(labelRef.current).toBe(within(menu).getByText('Copilot'))
    expect(nestedLink).toHaveAttribute('aria-describedby', 'consumer-description')
  })

  it.each([false, true])('preserves body overflow while the menu stays closed (wide: %s)', isLarge => {
    document.body.style.overflow = 'clip'
    mockUseWindowSize.mockImplementation(() => ({isLarge}))
    const {unmount} = render(<MockSubNavFixture />)

    expect(document.body.style.overflow).toBe('clip')
    unmount()
    expect(document.body.style.overflow).toBe('clip')
  })

  it.each(['', 'clip', 'hidden'])('restores the previous body overflow on narrow-menu close: "%s"', async overflow => {
    document.body.style.overflow = overflow
    const {getByRole, unmount} = render(<MockSubNavFixture />)
    const button = getByRole('button', {name: /navigation menu/i})
    await userEvent.click(button)
    expect(document.body.style.overflow).toBe('hidden')

    await userEvent.click(button)
    expect(document.body.style.overflow).toBe(overflow)

    await userEvent.click(button)
    unmount()
    expect(document.body.style.overflow).toBe(overflow)
  })

  it('links the wide More button to a form-safe auto popover', () => {
    enableWideMenuMeasurements()
    const {getByRole} = render(
      <form>
        <MockSubNavFixture />
      </form>,
    )
    const button = getByRole('button', {name: 'More'})
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement

    expect(menu).toHaveAttribute('popover', 'auto')
    expect(button).toHaveAttribute('popovertarget', menu.id)
    expect(button).toHaveAttribute('type', 'button')
    expect(menu).not.toBeVisible()
  })

  it('reserves wide-menu trigger space and overflows only trailing links', () => {
    enableWideMenuMeasurements()
    const {getByRole, queryByRole} = render(<MockSubNavFixture />)
    const row = getByRole('list')
    expect(
      within(row)
        .getAllByRole('link')
        .map(link => link.textContent),
    ).toEqual(['page one', 'page two'])
    expect(queryByRole('button', {name: /navigation menu/i})).not.toBeInTheDocument()
    expect(getByRole('button', {name: 'More'})).toHaveClass('SubNav__overflow-toggle--active')
    const rowLinks = within(row)
      .getAllByRole('link', {hidden: true})
      .filter(link => !link.closest('[popover]'))
    for (const link of rowLinks.slice(2)) {
      expect(link.closest('li')).toHaveAttribute('inert')
      expect(link.closest('li')).toHaveAttribute('aria-hidden', 'true')
    }

    const popup = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(popup, 'open')
    expect(
      within(getByRole('list', {name: 'More'}))
        .getAllByRole('link')
        .map(link => link.textContent),
    ).toEqual(['page three', 'page four', 'page five'])
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('requests native closing when a wide overflow link is selected', async () => {
    enableWideMenuMeasurements()
    const {getByRole} = render(<MockSubNavFixture />)
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(menu, 'open')
    await userEvent.click(getByRole('link', {name: 'page four'}))
    expect(menu.hidePopover).toHaveBeenCalledTimes(1)
  })

  it('has no a11y violations with the wide overflow links open', async () => {
    enableWideMenuMeasurements()
    const {getByRole, container} = render(<MockSubNavFixture />)
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(menu, 'open')

    expect(await axe(container)).toHaveNoViolations()
  })

  it('requests native closing when focus leaves the wide overflow controls', () => {
    enableWideMenuMeasurements()
    const {getByRole} = render(
      <>
        <MockSubNavFixture />
        <button>Outside navigation</button>
      </>,
    )
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(menu, 'open')
    act(() => getByRole('link', {name: 'page three'}).focus())
    expect(menu.hidePopover).not.toHaveBeenCalled()

    act(() => getByRole('button', {name: 'Outside navigation'}).focus())

    expect(menu.hidePopover).toHaveBeenCalledTimes(1)
  })

  it('syncs the wide trigger with native open and close events', () => {
    enableWideMenuMeasurements()
    const {getByRole} = render(<MockSubNavFixture />)
    const button = getByRole('button', {name: 'More'})
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(menu, 'open')
    expect(button).toHaveAttribute('aria-expanded', 'true')

    notifyPopoverToggle(menu, 'closed')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('removes wide-popover positioning listeners on close and unmount', () => {
    enableWideMenuMeasurements()
    const addDocumentListener = jest.spyOn(document, 'addEventListener')
    const removeDocumentListener = jest.spyOn(document, 'removeEventListener')
    const addWindowListener = jest.spyOn(window, 'addEventListener')
    const removeWindowListener = jest.spyOn(window, 'removeEventListener')
    const {getByRole, unmount} = render(<MockSubNavFixture />)
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(menu, 'open')

    expect(addDocumentListener).toHaveBeenCalledWith('scroll', expect.any(Function), true)
    expect(addWindowListener).toHaveBeenCalledWith('resize', expect.any(Function))

    notifyPopoverToggle(menu, 'closed')

    expect(removeDocumentListener).toHaveBeenCalledWith('scroll', expect.any(Function), true)
    expect(removeWindowListener).toHaveBeenCalledWith('resize', expect.any(Function))

    notifyPopoverToggle(menu, 'open')
    removeDocumentListener.mockClear()
    removeWindowListener.mockClear()
    unmount()

    expect(removeDocumentListener).toHaveBeenCalledWith('scroll', expect.any(Function), true)
    expect(removeWindowListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it.each([false, true])('preserves wide overflow submenu activation (preventDefault: %s)', async preventDefault => {
    enableWideMenuMeasurements()
    const handleActivation = jest.fn((event: React.MouseEvent<HTMLAnchorElement>) => {
      if (preventDefault) event.preventDefault()
    })
    const {getByRole} = render(
      <SubNav>
        <SubNav.Link href="#one">Page one</SubNav.Link>
        <SubNav.Link href="#two">Page two</SubNav.Link>
        <SubNav.Link href="#three">Page three</SubNav.Link>
        <SubNav.Link href="#copilot">
          Copilot
          <SubNav.SubMenu>
            <SubNav.Link href="#feature" onClick={handleActivation}>
              Copilot feature
            </SubNav.Link>
          </SubNav.SubMenu>
        </SubNav.Link>
      </SubNav>,
    )

    const popup = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(popup, 'open')
    const menu = within(getByRole('list', {name: 'More'}))
    const submenuLink = menu.getByRole('link', {name: 'Copilot feature'})
    expect(submenuLink.closest('.SubNav__sub-menu-children')).not.toHaveAttribute('inert')
    expect(menu.queryByRole('button', {name: 'Copilot submenu'})).not.toBeInTheDocument()

    await userEvent.click(submenuLink)
    expect(handleActivation).toHaveBeenCalledTimes(1)
    if (preventDefault) {
      expect(popup.hidePopover).not.toHaveBeenCalled()
    } else {
      expect(popup.hidePopover).toHaveBeenCalledTimes(1)
    }
  })

  it('does not infer wide submenu layout from an overflow activation callback', () => {
    enableWideMenuMeasurements()
    availableWidth = 600
    const {getByRole} = render(
      <SubNav>
        <SubNav.Link href="#copilot" _onOverflowLinkActivate={jest.fn()}>
          Copilot
          <SubNav.SubMenu>
            <SubNav.Link href="#feature">Copilot feature</SubNav.Link>
          </SubNav.SubMenu>
        </SubNav.Link>
      </SubNav>,
    )

    const toggle = getByRole('button', {name: 'Copilot submenu'})
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById(toggle.getAttribute('aria-controls') ?? '')).toHaveAttribute('inert')
  })

  it('reserves wide-menu action space without moving the action into More', () => {
    enableWideMenuMeasurements()
    availableWidth = 420
    const {getByRole} = render(
      <SubNav>
        {mockLinkData.map(link => (
          <SubNav.Link key={link.href} href={link.href}>
            {link.title}
          </SubNav.Link>
        ))}
        <SubNav.Action href="#action">Get started</SubNav.Action>
      </SubNav>,
    )

    expect(within(getByRole('list')).getAllByRole('link', {name: /page/})).toHaveLength(2)
    expect(getByRole('link', {name: 'Get started'})).toBeInTheDocument()
    expect(getByRole('button', {name: 'More'})).toBeInTheDocument()
  })

  it('restores wide-menu links and closes More when the container grows', async () => {
    enableWideMenuMeasurements()
    const {queryByRole, getByRole} = render(<MockSubNavFixture />)
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(menu, 'open')

    availableWidth = 600
    await resize()

    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()
    expect(menu.hidePopover).toHaveBeenCalled()
    expect(within(getByRole('list')).getAllByRole('link')).toHaveLength(5)

    availableWidth = 300
    await resize()

    expect(getByRole('button', {name: 'More'})).toHaveAttribute('aria-expanded', 'false')
  })

  it('resets both menus when switching between wide and narrow viewports', async () => {
    enableWideMenuMeasurements()
    const {getByRole, queryByRole, rerender} = render(<MockSubNavFixture />)
    const menu = getByRole('list', {name: 'More', hidden: true}).parentElement as HTMLDivElement
    notifyPopoverToggle(menu, 'open')

    mockUseWindowSize.mockImplementation(() => ({isLarge: false}))
    rerender(<MockSubNavFixture />)

    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()
    expect(menu.hidePopover).toHaveBeenCalled()
    expect(getByRole('button', {name: /navigation menu/i})).toHaveAttribute('aria-expanded', 'false')
    expect(within(getByRole('list')).getAllByRole('link')).toHaveLength(mockLinkData.length)

    await userEvent.click(getByRole('button', {name: /navigation menu/i}))
    expect(document.body.style.overflow).toBe('hidden')

    mockUseWindowSize.mockImplementation(() => ({isLarge: true}))
    rerender(<MockSubNavFixture />)

    expect(queryByRole('button', {name: /navigation menu/i})).not.toBeInTheDocument()
    expect(getByRole('button', {name: 'More'})).toHaveAttribute('aria-expanded', 'false')
    expect(getByRole('list', {name: 'More', hidden: true})).not.toBeVisible()
    expect(document.body.style.overflow).toBe(originalBodyOverflow)
    expect(getByRole('navigation').style.getPropertyValue('--subnav-available-height')).toBe('')

    mockUseWindowSize.mockImplementation(() => ({isLarge: false}))
    rerender(<MockSubNavFixture />)

    expect(getByRole('button', {name: /navigation menu/i})).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe(originalBodyOverflow)
  })

  it('supports a translated wide-menu trigger through partial menuLabels', () => {
    enableWideMenuMeasurements()
    const {getByRole} = render(<MockSubNavFixture menuLabels={{overflowMenuLabel: 'その他'}} />)
    expect(getByRole('button', {name: 'その他'})).toBeInTheDocument()
  })

  it('remeasures wide-menu labels and link counts when children change', () => {
    enableWideMenuMeasurements()
    const {rerender, queryByRole} = render(<MockSubNavFixture />)
    expect(queryByRole('button', {name: 'More'})).toBeInTheDocument()

    rerender(<MockSubNavFixture data={[{title: 'Localized label', href: '#localized'}]} />)

    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()
  })

  it('remeasures wide-menu links after fonts finish loading', async () => {
    enableWideMenuMeasurements()
    linkWidth = 60
    let finishLoadingFonts: () => void = () => undefined
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: {
        ready: new Promise<void>(resolve => {
          finishLoadingFonts = resolve
        }),
      },
    })
    const {queryByRole} = render(<MockSubNavFixture />)
    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()

    linkWidth = 100
    await act(async () => {
      finishLoadingFonts()
      await Promise.resolve()
      await new Promise(resolve => requestAnimationFrame(resolve))
    })

    expect(queryByRole('button', {name: 'More'})).toBeInTheDocument()
  })

  it('disconnects wide-menu resize observers on unmount', () => {
    enableWideMenuMeasurements()
    const {unmount} = render(<MockSubNavFixture />)

    unmount()

    expect(resizeObserverMock.disconnect).toHaveBeenCalledTimes(1)
  })

  it('cancels a queued wide-menu resize measurement on unmount', () => {
    enableWideMenuMeasurements()
    const frameId = 42
    jest.spyOn(window, 'requestAnimationFrame').mockReturnValue(frameId)
    const cancelFrame = jest.spyOn(window, 'cancelAnimationFrame')
    const {unmount} = render(<MockSubNavFixture />)

    act(() => observerCallbacks[0]([], resizeObserverMock as unknown as ResizeObserver))
    unmount()

    expect(cancelFrame).toHaveBeenCalledWith(frameId)
    expect(resizeObserverMock.disconnect).toHaveBeenCalledTimes(1)
  })

  it('ignores wide-menu font readiness after unmount', async () => {
    enableWideMenuMeasurements()
    let finishLoadingFonts: () => void = () => undefined
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: {
        ready: new Promise<void>(resolve => {
          finishLoadingFonts = resolve
        }),
      },
    })
    const scheduleFrame = jest.spyOn(window, 'requestAnimationFrame')
    const {unmount} = render(<MockSubNavFixture />)
    unmount()
    scheduleFrame.mockClear()

    await act(async () => {
      finishLoadingFonts()
      await Promise.resolve()
    })

    expect(scheduleFrame).not.toHaveBeenCalled()
  })

  it('remeasures wide-menu links and cleans up the fallback resize listener', async () => {
    enableWideMenuMeasurements()
    Reflect.deleteProperty(global, 'ResizeObserver')
    const addListener = jest.spyOn(window, 'addEventListener')
    const removeListener = jest.spyOn(window, 'removeEventListener')
    const {queryByRole, unmount} = render(<MockSubNavFixture />)
    expect(queryByRole('button', {name: 'More'})).toBeInTheDocument()

    availableWidth = 600
    await act(async () => {
      window.dispatchEvent(new Event('resize'))
      await new Promise(resolve => requestAnimationFrame(resolve))
    })
    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()

    const resizeHandler = addListener.mock.calls.find(([eventName]) => eventName === 'resize')?.[1]
    expect(resizeHandler).toBeDefined()
    unmount()

    expect(removeListener).toHaveBeenCalledWith('resize', resizeHandler)
  })

  it.each(['outside click', 'Escape'])('closes the narrow menu and unlocks scrolling on %s', async dismissal => {
    const {getByRole} = render(<MockSubNavFixture />)
    const button = getByRole('button', {name: /navigation menu/i})
    const navigation = getByRole('navigation')
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(document.body.style.overflow).toBe('hidden')

    if (dismissal === 'outside click') {
      await userEvent.click(document.body)
    } else {
      await userEvent.keyboard('{escape}')
    }

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe(originalBodyOverflow)
    expect(navigation.style.getPropertyValue('--subnav-available-height')).toBe('')
  })

  it('traps focus in the open narrow menu and releases it on close', async () => {
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100)
    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(20)
    jest.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockReturnValue(document.body)
    jest
      .spyOn(HTMLElement.prototype, 'getClientRects')
      .mockReturnValue([new DOMRect(0, 0, 100, 20)] as unknown as DOMRectList)
    const {getByRole} = render(
      <>
        <MockSubNavFixture />
        <button>Outside navigation</button>
      </>,
    )
    const button = getByRole('button', {name: /navigation menu/i})
    await userEvent.click(button)

    for (const link of mockLinkData) {
      await userEvent.tab()
      expect(getByRole('link', {name: link.title})).toHaveFocus()
    }

    await userEvent.tab()
    expect(getByRole('link', {name: heading})).toHaveFocus()
    await userEvent.tab()
    expect(button).toHaveFocus()
    await userEvent.tab({shift: true})
    expect(getByRole('link', {name: heading})).toHaveFocus()
    await userEvent.tab({shift: true})
    expect(getByRole('link', {name: 'page five'})).toHaveFocus()

    await userEvent.keyboard('{escape}')
    await userEvent.tab()
    expect(getByRole('button', {name: 'Outside navigation'})).toHaveFocus()
  })

  it('updates narrow-menu height and cleans up on close and unmount', async () => {
    const viewportHeight = jest.replaceProperty(window, 'innerHeight', 800)
    const addListener = jest.spyOn(window, 'addEventListener')
    const removeListener = jest.spyOn(window, 'removeEventListener')
    const {getByRole, unmount} = render(<MockSubNavFixture />)
    const navigation = getByRole('navigation')
    jest.spyOn(navigation, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 120, 360, 60))
    const button = getByRole('button', {name: /navigation menu/i})
    await userEvent.click(button)
    expect(navigation.style.getPropertyValue('--subnav-available-height')).toBe('680px')

    viewportHeight.replaceValue(900)
    act(() => window.dispatchEvent(new Event('resize')))
    expect(navigation.style.getPropertyValue('--subnav-available-height')).toBe('780px')

    await userEvent.click(button)
    expect(navigation.style.getPropertyValue('--subnav-available-height')).toBe('')
    expect(document.body.style.overflow).toBe(originalBodyOverflow)

    await userEvent.click(button)
    const resizeHandler = addListener.mock.calls.filter(([eventName]) => eventName === 'resize').at(-1)?.[1]
    expect(resizeHandler).toBeDefined()
    unmount()

    expect(navigation.style.getPropertyValue('--subnav-available-height')).toBe('')
    expect(document.body.style.overflow).toBe(originalBodyOverflow)
    expect(removeListener).toHaveBeenCalledWith('resize', resizeHandler)
  })

  it('merges custom mobile menu labels with the default desktop label', async () => {
    const {getByRole} = render(
      <MockSubNavFixture
        data={[{title: 'page one', href: '#page1'}]}
        menuLabels={{menuLabel: 'Navigation', closeLabel: 'Dismiss'}}
      />,
    )
    const button = getByRole('button', {name: 'Navigation'})
    await userEvent.click(button)
    expect(button).toHaveAccessibleName('Dismiss')
    await userEvent.click(button)
    expect(button).toHaveAccessibleName('Navigation')
  })

  it('appends only the current page to complete translated narrow-menu prefixes', async () => {
    const {getByRole} = render(
      <MockSubNavFixture
        menuLabels={{
          activeLabel: 'Navegación. Página actual:',
          closeActiveLabel: 'Cerrar navegación. Página actual:',
        }}
      />,
    )
    const button = getByRole('button', {name: 'Navegación. Página actual: page three'})
    await userEvent.click(button)
    expect(button).toHaveAccessibleName('Cerrar navegación. Página actual: page three')
    await userEvent.click(button)
    expect(button).toHaveAccessibleName('Navegación. Página actual: page three')
  })

  it.each([
    {
      menuLabels: {activeLabel: 'Navegación. Página actual:'},
      closedLabel: 'Navegación. Página actual: page three',
      openLabel: 'Close navigation menu. Current page: page three',
    },
    {
      menuLabels: {closeActiveLabel: 'Cerrar navegación. Página actual:'},
      closedLabel: 'Navigation menu. Current page: page three',
      openLabel: 'Cerrar navegación. Página actual: page three',
    },
  ])(
    'keeps English defaults only for unspecified narrow-menu labels: $closedLabel',
    async ({menuLabels, closedLabel, openLabel}) => {
      const {getByRole} = render(<MockSubNavFixture menuLabels={menuLabels} />)
      const button = getByRole('button', {name: closedLabel})
      await userEvent.click(button)
      expect(button).toHaveAccessibleName(openLabel)
      await userEvent.click(button)
      expect(button).toHaveAccessibleName(closedLabel)
    },
  )

  it.each([
    {
      name: 'the custom submenu aria-label for its toggle and content',
      ariaLabel: 'Copilot options',
      toggleLabel: 'Copilot options',
      contentLabel: 'Copilot options',
    },
    {
      name: 'the default submenu content label when aria-label is unspecified',
      ariaLabel: undefined,
      toggleLabel: 'Copilot submenu',
      contentLabel: 'Sub navigation',
    },
  ])('uses $name', ({ariaLabel, toggleLabel, contentLabel}) => {
    mockUseWindowSize.mockImplementation(() => ({isLarge: true}))
    const {getByRole} = render(
      <SubNav>
        <SubNav.Link href="#copilot">
          Copilot
          <SubNav.SubMenu aria-label={ariaLabel}>
            <SubNav.Link href="#feature">Copilot feature</SubNav.Link>
          </SubNav.SubMenu>
        </SubNav.Link>
      </SubNav>,
    )

    expect(getByRole('button', {name: toggleLabel})).toHaveAttribute('aria-expanded', 'false')
    expect(getByRole('list', {name: contentLabel, hidden: true})).toBeInTheDocument()
  })

  it('uses a custom label for the anchor navigation landmark', () => {
    jest.replaceProperty(window, 'innerWidth', 360)
    mockUseWindowSize.mockImplementation(jest.requireActual('../hooks/useWindowSize').useWindowSize)
    const {getByRole} = render(
      <SubNav>
        <SubNav.Link href="#overview" aria-current="page">
          Overview
          <SubNav.SubMenu variant="anchor" aria-label="Section navigation">
            <SubNav.Link href="#scale">Scale</SubNav.Link>
          </SubNav.SubMenu>
        </SubNav.Link>
      </SubNav>,
    )

    expect(getByRole('navigation', {name: 'Section navigation'})).toBeInTheDocument()
  })

  it('renders a title as a link', () => {
    const {getByRole} = render(<MockSubNavFixture />)

    expect(getByRole('link', {name: heading})).toHaveAttribute('href', headingLink)
  })

  it('renders the correct number of links  into the document', () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const list = getByRole('list')
    const links = within(list).getAllByRole('link')

    expect(links).toHaveLength(mockLinkData.length)
  })

  it('has a button that opens the menu when clicked', async () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    const overlayEl = getByRole('list')
    expect(overlayEl).not.toHaveClass('SubNav__links-overlay--open')
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(buttonEl)

    expect(overlayEl).toHaveClass('SubNav__links-overlay--open')
    expect(buttonEl).toHaveAttribute('aria-expanded', 'true')
  })

  it('retains focus on the button after opening the menu', async () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})

    await userEvent.click(buttonEl)

    expect(buttonEl).toHaveFocus()
    expect(buttonEl).toHaveAttribute('aria-expanded', 'true')
  })

  it('retains focus on the button after closing the menu', async () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})

    await userEvent.click(buttonEl)
    expect(buttonEl).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(buttonEl)

    expect(buttonEl).toHaveFocus()
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the overlay when button is pressed again', async () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    const overlayEl = getByRole('list')

    await userEvent.click(buttonEl)
    expect(overlayEl).toHaveClass('SubNav__links-overlay--open')

    await userEvent.click(buttonEl)

    expect(overlayEl).not.toHaveClass('SubNav__links-overlay--open')
  })

  it('announces the current page with the default narrow-menu prefixes', async () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const button = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    expect(getByRole('link', {name: 'page three'})).toHaveAttribute('aria-current', 'page')
    await userEvent.click(button)
    expect(button).toHaveAccessibleName('Close navigation menu. Current page: page three')
  })

  it('sets a default accessible label if there are no links with `aria-current="page"` set', async () => {
    const {getByRole} = render(
      <MockSubNavFixture
        data={[
          {title: 'page one', href: '#page1'},
          {title: 'page two', href: '#page2'},
        ]}
      />,
    )

    const button = getByRole('button', {name: 'Navigation menu'})
    await userEvent.click(button)
    expect(button).toHaveAccessibleName('Close navigation menu')
  })

  it('hides the aria-current text from the button when no subheading is present', () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    expect(buttonEl).not.toHaveTextContent('page three')
  })

  it('shows the aria-current text next to the button when a subheading is present', () => {
    const {getByRole} = render(
      <SubNav>
        <SubNav.Heading href={headingLink}>{heading}</SubNav.Heading>
        <SubNav.SubHeading href="#subheading">Subheading</SubNav.SubHeading>
        <SubNav.Link href="#page1">page one</SubNav.Link>
        <SubNav.Link href="#page2" aria-current="page">
          page two
        </SubNav.Link>
      </SubNav>,
    )

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page two'})
    expect(buttonEl).toHaveTextContent('page two')
  })

  it('has no a11y violations on initial render', async () => {
    const {container} = render(<MockSubNavFixture />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('has no a11y violations when a large viewport submenu is collapsed', async () => {
    mockUseWindowSize.mockImplementation(() => ({isLarge: true}))

    const {container} = render(<MockSubNavFixtureWithSubMenu />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('does not hide submenu items on narrow viewports', async () => {
    const {getByRole} = render(<MockSubNavFixtureWithSubMenu />)

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: Copilot'})

    await userEvent.click(buttonEl)

    expect(getByRole('link', {name: 'Copilot feature page one'})).toBeInTheDocument()
  })

  it('hides collapsed submenu items on large viewports', async () => {
    mockUseWindowSize.mockImplementation(() => ({isLarge: true}))

    const {getByRole} = render(<MockSubNavFixtureWithSubMenu />)

    const toggleSubmenuButton = getByRole('button', {name: 'Copilot submenu'})
    const submenuId = toggleSubmenuButton.getAttribute('aria-controls')
    const submenuContainer = submenuId ? document.getElementById(submenuId) : null

    expect(submenuContainer).not.toBeNull()
    expect(submenuContainer).toHaveAttribute('inert')
  })

  it('shows subitems when the submenu toggle is activated at large viewports', async () => {
    mockUseWindowSize.mockImplementation(() => ({isLarge: true}))

    const {getByRole} = render(<MockSubNavFixtureWithSubMenu />)

    await userEvent.tab()

    expect(getByRole('link', {name: 'Copilot'})).toHaveFocus()

    const toggleSubmenuButton = getByRole('button', {name: 'Copilot submenu'})
    expect(toggleSubmenuButton).toHaveAttribute('aria-expanded', 'false')

    await userEvent.tab()
    expect(toggleSubmenuButton).toHaveFocus()

    await userEvent.keyboard('{enter}')
    expect(toggleSubmenuButton).toHaveFocus()
    expect(toggleSubmenuButton).toHaveAttribute('aria-expanded', 'true')

    await userEvent.tab()
    expect(getByRole('link', {name: 'Copilot feature page one'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Copilot feature page two'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Copilot feature page three'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Code review'})).toHaveFocus()

    expect(toggleSubmenuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('hides a hovered submenu when escape is pressed', async () => {
    mockUseWindowSize.mockImplementation(() => ({isLarge: true}))

    const {getByRole} = render(<MockSubNavFixtureWithSubMenu />)

    await userEvent.hover(getByRole('link', {name: 'Copilot'}))

    expect(getByRole('link', {name: 'Copilot feature page one'})).toBeVisible()

    const toggleSubmenuButton = getByRole('button', {name: 'Copilot submenu'})
    const submenuId = toggleSubmenuButton.getAttribute('aria-controls')
    const submenuContainer = submenuId ? document.getElementById(submenuId) : null
    expect(submenuContainer).not.toHaveAttribute('inert')

    await userEvent.keyboard('{escape}')

    expect(submenuContainer).toHaveAttribute('inert')
  })

  it('renders an optional subheading into the document', () => {
    const expectedText = 'Subheading'
    const expectedLink = '#subheading'
    const {getByRole} = render(
      <SubNav>
        <SubNav.Heading href={headingLink}>{heading}</SubNav.Heading>
        <SubNav.SubHeading href={expectedLink}>{expectedText}</SubNav.SubHeading>
        <SubNav.Link href="#">Link</SubNav.Link>
      </SubNav>,
    )

    const el = getByRole('link', {name: expectedText})

    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('href', expectedLink)
  })

  it('allows passing a ref to enable programmatic access to the underlying element', () => {
    const expectedClass = 'test-class'
    const MockComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null)

      useEffect(() => {
        if (ref.current) {
          ref.current.classList.add(expectedClass)
        }
      }, [ref])

      return (
        <SubNav ref={ref}>
          <SubNav.Heading href={headingLink}>{heading}</SubNav.Heading>
          <SubNav.Link href="#">Link</SubNav.Link>
        </SubNav>
      )
    }

    const {container} = render(<MockComponent />)

    const el = container.querySelector('.SubNav__container')
    expect(el).toHaveClass(expectedClass)
  })
})
