import {HTMLAttributes} from 'react'
import React, {render, cleanup, within} from '@testing-library/react'
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

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    const overlayEl = getByRole('list')

    expect(overlayEl).not.toHaveClass('SubNav__links-overlay--open')
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(buttonEl)

    expect(overlayEl).toHaveClass('SubNav__links-overlay--open')
    expect(buttonEl).toHaveAttribute('aria-expanded', 'true')
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

  it('includes the aria-current text in the aria-label of the button', () => {
    const {getByRole} = render(<MockSubNavFixture />)

    const buttonEl = getByRole('button', {name: 'Navigation menu. Current page: page three'})
    expect(buttonEl).toBeInTheDocument()
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

  it('shows subitems when the submenu toggle is activated at large viewports', async () => {
    mockUseWindowSize.mockImplementation(() => ({isLarge: true}))

    const {getByRole} = render(
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
      </SubNav>,
    )

    await userEvent.tab()

    expect(getByRole('link', {name: 'Copilot'})).toHaveFocus()

    const toggleSubmenuButton = getByRole('button', {name: 'Open submenu'})
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

    const {getByRole, queryByRole} = render(
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
      </SubNav>,
    )

    await userEvent.hover(getByRole('link', {name: 'Copilot'}))

    expect(getByRole('link', {name: 'Copilot feature page one'})).toBeVisible()

    await userEvent.keyboard('{escape}')

    expect(queryByRole('link', {name: 'Copilot feature page one'})).not.toBeInTheDocument()
  })
})
