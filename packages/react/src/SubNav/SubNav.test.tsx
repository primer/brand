import React, {HTMLAttributes, useEffect} from 'react'
import {render, cleanup, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {SubNav} from './SubNav'
import '../test-utils/mocks/match-media-mock'
import userEvent from '@testing-library/user-event'
import {useWindowSize} from '../hooks/useWindowSize'

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
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  afterEach(cleanup)

  it('renders the root element correctly into the document', () => {
    const {getByRole} = render(<MockSubNavFixture />)

    expect(getByRole('navigation')).toBeInTheDocument()
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

    let buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    const overlayEl = getByRole('list')
    expect(overlayEl).not.toHaveClass('SubNav__links-overlay--open')
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(buttonEl)

    buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
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

    let buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    const overlayEl = getByRole('list')

    await userEvent.click(buttonEl)
    expect(overlayEl).toHaveClass('SubNav__links-overlay--open')

    buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})

    await userEvent.click(buttonEl)

    expect(overlayEl).not.toHaveClass('SubNav__links-overlay--open')
  })

  it('includes the aria-current text in the accessible label of the button', () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    expect(buttonEl).toBeInTheDocument()
  })

  it('sets a default accessible label if there are no links with `aria-current="page"` set', () => {
    const {getByRole} = render(
      <MockSubNavFixture
        data={[
          {title: 'page one', href: '#page1'},
          {title: 'page two', href: '#page2'},
        ]}
      />,
    )

    expect(getByRole('button', {name: 'Navigation menu'})).toBeInTheDocument()
  })

  it('renders a separator when there is a link with `aria-current="page"` set', () => {
    const {getByRole} = render(<MockSubNavFixture />)
    const separator = getByRole('separator', {hidden: true})
    expect(separator).toBeInTheDocument()
  })

  it('does not render a separator when there are no links with `aria-current="page"` set', () => {
    const {queryByRole} = render(
      <MockSubNavFixture
        data={[
          {title: 'page one', href: '#page1'},
          {title: 'page two', href: '#page2'},
        ]}
      />,
    )

    expect(queryByRole('separator', {hidden: true})).not.toBeInTheDocument()
  })

  it('shows the aria-current text next to the button by default', () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    expect(buttonEl).toHaveTextContent('page three')
  })

  it('has no a11y violations on initial render', async () => {
    const {container} = render(<MockSubNavFixture />)
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

    const {queryByRole} = render(<MockSubNavFixtureWithSubMenu />)

    expect(queryByRole('link', {name: 'Copilot feature page one'})).not.toBeInTheDocument()
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

    const {getByRole, queryByRole} = render(<MockSubNavFixtureWithSubMenu />)

    await userEvent.hover(getByRole('link', {name: 'Copilot'}))

    expect(getByRole('link', {name: 'Copilot feature page one'})).toBeVisible()

    await userEvent.keyboard('{escape}')

    expect(queryByRole('link', {name: 'Copilot feature page one'})).not.toBeInTheDocument()
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
