import {HTMLAttributes} from 'react'
import React, {render, cleanup, fireEvent, within} from '@testing-library/react'
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
    const {getByTestId} = render(<MockSubNavFixture />)

    expect(getByTestId(SubNav.testIds.root)).toBeInTheDocument() // expect the root element to be in the document
    expect(getByTestId(SubNav.testIds.root).tagName).toBe('nav'.toUpperCase()) // expect root to be a <nav> element
  })
  it('renders a title as a link', () => {
    const {getByTestId} = render(<MockSubNavFixture />)

    expect(getByTestId(SubNav.testIds.heading)).toBeInTheDocument()
    expect(getByTestId(SubNav.testIds.heading).tagName).toBe('a'.toUpperCase())
    expect(getByTestId(SubNav.testIds.heading)).toHaveAttribute('href', headingLink)
  })

  it('renders the correct number of links  into the document', () => {
    const {getByTestId} = render(<MockSubNavFixture />)
    expect(getByTestId(SubNav.testIds.overlay).querySelectorAll('a').length).toBe(mockLinkData.length)
  })

  it('has a button that opens the menu when clicked', async () => {
    const {getByTestId} = render(<MockSubNavFixture />)

    const buttonEl = getByTestId('SubNav-root-button')
    const overlayEl = getByTestId(SubNav.testIds.overlay)

    expect(buttonEl).toBeInTheDocument()

    // check aria roles are correct by default
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false')

    userEvent.click(buttonEl)

    expect(overlayEl).toHaveClass('SubNav__links-overlay--open')
    // check aria roles have updated
    expect(buttonEl).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the overlay when button is pressed again', () => {
    const {getByTestId} = render(<MockSubNavFixture />)

    const buttonEl = getByTestId(SubNav.testIds.button)
    const overlayEl = getByTestId(SubNav.testIds.overlay)

    fireEvent.click(buttonEl)
    expect(overlayEl).toHaveClass('SubNav__links-overlay--open')

    fireEvent.click(buttonEl)
    expect(overlayEl).not.toHaveClass('SubNav__links-overlay--open')
  })

  it('shows the aria-current text next to the button by default', () => {
    const {getByTestId} = render(<MockSubNavFixture />)

    const buttonEl = getByTestId(SubNav.testIds.button)
    const activeLink = mockLinkData.find(link => link['aria-current']) as {title: string} | undefined

    if (activeLink) {
      expect(buttonEl).toHaveTextContent(activeLink.title)
    }
  })

  it('has no a11y violations on initial render', async () => {
    const {container} = render(<MockSubNavFixture />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('shows subitems when the submenu toggle is activated at large viewports', async () => {
    mockUseWindowSize.mockImplementation(() => ({isLarge: true}))

    const {getByRole, getAllByTestId} = render(
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

    userEvent.tab()

    expect(getByRole('link', {name: 'Copilot'})).toHaveFocus()

    const toggleSubmenuButton = getByRole('button', {name: 'Open submenu'})
    expect(toggleSubmenuButton).toHaveAttribute('aria-expanded', 'false')

    userEvent.tab()
    expect(toggleSubmenuButton).toHaveFocus()

    userEvent.keyboard('{enter}')
    expect(toggleSubmenuButton).toHaveFocus()
    expect(toggleSubmenuButton).toHaveAttribute('aria-expanded', 'true')

    const expanded = getAllByTestId(SubNav.testIds.subMenu)[0]

    userEvent.tab()
    expect(within(expanded).getByRole('link', {name: 'Copilot feature page one'})).toHaveFocus()

    userEvent.tab()
    expect(within(expanded).getByRole('link', {name: 'Copilot feature page two'})).toHaveFocus()

    userEvent.tab()
    expect(within(expanded).getByRole('link', {name: 'Copilot feature page three'})).toHaveFocus()

    userEvent.tab()
    expect(getByRole('link', {name: 'Code review'})).toHaveFocus()

    expect(toggleSubmenuButton).toHaveAttribute('aria-expanded', 'false')
  })
})
