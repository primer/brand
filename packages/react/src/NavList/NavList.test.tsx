import React, {useEffect} from 'react'
import {render, cleanup, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {BookIcon} from '@primer/octicons-react'

import {NavList} from './NavList'

expect.extend(toHaveNoViolations)

const NavListFixture = () => (
  <NavList aria-label="Repository">
    <NavList.Item href="/overview">Overview</NavList.Item>
    <NavList.Item href="/docs" aria-current="page">
      Docs
    </NavList.Item>
    <NavList.Item href="/api">API reference</NavList.Item>
  </NavList>
)

describe('NavList', () => {
  afterEach(cleanup)

  it('has no a11y violations', async () => {
    const {container} = render(<NavListFixture />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders navigation and list semantics', () => {
    const {getByRole, getAllByRole} = render(<NavListFixture />)

    const nav = getByRole('navigation', {name: 'Repository'})
    const list = within(nav).getByRole('list')

    expect(nav).toHaveClass('NavList')
    expect(list).toHaveClass('NavList__list')
    expect(getAllByRole('link')).toHaveLength(3)
  })

  it('uses aria-current as the current item contract', () => {
    const {getByRole} = render(<NavListFixture />)

    const currentLink = getByRole('link', {name: 'Docs'})

    expect(currentLink).toHaveAttribute('aria-current', 'page')
    expect(currentLink.closest('li')).toHaveClass('NavList__item--current')
  })

  it('supports className and ref passthrough on the root', () => {
    const expectedClass = 'test-class'

    const MockComponent = () => {
      const ref = React.useRef<HTMLElement>(null)

      useEffect(() => {
        ref.current?.classList.add(expectedClass)
      }, [])

      return (
        <NavList ref={ref} aria-label="Test">
          <NavList.Item href="/">Home</NavList.Item>
        </NavList>
      )
    }

    const {getByRole} = render(<MockComponent />)

    expect(getByRole('navigation', {name: 'Test'})).toHaveClass(expectedClass)
  })

  it('supports custom link components', () => {
    const CustomLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'a'>>(
      ({children, ...props}, ref) => (
        <a ref={ref} data-custom-link="true" {...props}>
          {children}
        </a>
      ),
    )

    const {getByRole} = render(
      <NavList>
        <NavList.Item as={CustomLink} href="/custom">
          Custom link
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('link', {name: 'Custom link'})).toHaveAttribute('data-custom-link', 'true')
    expect(getByRole('link', {name: 'Custom link'})).toHaveAttribute('href', '/custom')
  })

  it('renders groups, dividers, and visual slots', () => {
    const {getByRole, getByTestId} = render(
      <NavList>
        <NavList.Group title="Guides">
          <NavList.Item href="/start" leadingVisual={BookIcon}>
            Getting started
          </NavList.Item>
        </NavList.Group>
        <NavList.Divider />
        <NavList.Item href="/reference">Reference</NavList.Item>
      </NavList>,
    )

    expect(getByTestId(NavList.testIds.group)).toBeInTheDocument()
    expect(getByTestId(NavList.testIds.groupHeading)).toHaveTextContent('Guides')
    expect(getByTestId(NavList.testIds.divider)).toHaveAttribute('role', 'separator')
    expect(getByRole('link', {name: 'Getting started'}).querySelector('svg')).toBeInTheDocument()
  })

  it('expands and collapses nested lists', async () => {
    const user = userEvent.setup()

    const {getByRole, queryByRole} = render(
      <NavList>
        <NavList.Item href="/docs">
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
            <NavList.Item href="/docs/packages">Packages</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs expand'})
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('link', {name: 'Actions'})).toBeInTheDocument()

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()
  })

  it('auto-expands parents with current descendants', () => {
    const {getByRole} = render(
      <NavList>
        <NavList.Item href="/docs">
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions" aria-current="page">
              Actions
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('button', {name: 'Docs collapse'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('link', {name: 'Actions'})).toHaveAttribute('aria-current', 'page')
  })

  it('moves focus back to the toggle when escape collapses nested lists', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList>
        <NavList.Item href="/docs" defaultExpanded>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs collapse'})
    const nestedLink = getByRole('link', {name: 'Actions'})

    nestedLink.focus()
    await user.keyboard('{Escape}')

    expect(toggle).toHaveFocus()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('marks disabled links with aria-disabled and prevents clicks', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    const {getByRole} = render(
      <NavList>
        <NavList.Item href="/disabled" disabled onClick={onClick}>
          Disabled
        </NavList.Item>
      </NavList>,
    )

    const link = getByRole('link', {name: 'Disabled'})
    await user.click(link)

    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(onClick).not.toHaveBeenCalled()
  })
})
