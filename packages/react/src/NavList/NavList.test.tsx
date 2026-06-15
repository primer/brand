import React, {useEffect} from 'react'
import {render, cleanup, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {BookIcon, KebabHorizontalIcon} from '@primer/octicons-react'

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

  it('renders dividers and visual slots', () => {
    const {getByRole, getByTestId} = render(
      <NavList>
        <NavList.Divider />
        <NavList.Item href="/start" leadingVisual={BookIcon} trailingVisual={<KebabHorizontalIcon />}>
          Getting started
        </NavList.Item>
      </NavList>,
    )

    expect(getByTestId(NavList.testIds.divider)).toHaveAttribute('role', 'separator')
    expect(getByRole('link', {name: 'Getting started'}).querySelector('svg')).toBeInTheDocument()
  })

  it('assigns item hierarchy levels through four nested lists', () => {
    const {getByRole} = render(
      <NavList>
        <NavList.Item defaultExpanded>
          Docs
          <NavList.SubNav>
            <NavList.Item defaultExpanded>
              Actions
              <NavList.SubNav>
                <NavList.Item defaultExpanded>
                  Workflows
                  <NavList.SubNav>
                    <NavList.Item href="/docs/actions/workflows/syntax">Workflow syntax</NavList.Item>
                  </NavList.SubNav>
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('button', {name: 'Docs collapse'}).closest('li')).toHaveAttribute('data-navlist-level', '1')
    expect(getByRole('button', {name: 'Actions collapse'}).closest('li')).toHaveAttribute('data-navlist-level', '2')
    expect(getByRole('button', {name: 'Workflows collapse'}).closest('li')).toHaveAttribute('data-navlist-level', '3')
    expect(getByRole('link', {name: 'Workflow syntax'}).closest('li')).toHaveAttribute('data-navlist-level', '4')
  })

  it('marks leaf articles at each nested depth', () => {
    const {getByRole} = render(
      <NavList>
        <NavList.Item defaultExpanded>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/overview">Overview</NavList.Item>
            <NavList.Item defaultExpanded>
              Actions
              <NavList.SubNav>
                <NavList.Item href="/actions/quickstart">Quickstart</NavList.Item>
                <NavList.Item defaultExpanded>
                  Workflows
                  <NavList.SubNav>
                    <NavList.Item href="/actions/workflows/syntax">Workflow syntax</NavList.Item>
                  </NavList.SubNav>
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('link', {name: 'Overview'}).closest('li')).toHaveClass('NavList__item--leaf')
    expect(getByRole('link', {name: 'Overview'}).closest('li')).toHaveAttribute('data-navlist-level', '2')
    expect(getByRole('link', {name: 'Quickstart'}).closest('li')).toHaveClass('NavList__item--leaf')
    expect(getByRole('link', {name: 'Quickstart'}).closest('li')).toHaveAttribute('data-navlist-level', '3')
    expect(getByRole('link', {name: 'Workflow syntax'}).closest('li')).toHaveClass('NavList__item--leaf')
    expect(getByRole('link', {name: 'Workflow syntax'}).closest('li')).toHaveAttribute('data-navlist-level', '4')
  })

  it('renders expandable items as disclosure buttons instead of links', () => {
    const {getByRole, queryByRole} = render(
      <NavList>
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('button', {name: 'Docs expand'})).toHaveAttribute('aria-expanded', 'false')
    expect(queryByRole('link', {name: 'Docs'})).not.toBeInTheDocument()
  })

  it('ignores aria-current on expandable items', () => {
    const {getByRole} = render(
      <NavList>
        <NavList.Item aria-current="page">
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs expand'})

    expect(toggle).not.toHaveAttribute('aria-current')
    expect(toggle.closest('li')).not.toHaveClass('NavList__item--current')
  })

  it('supports ref passthrough on expandable items', () => {
    const ref = React.createRef<HTMLElement>()

    render(
      <NavList>
        <NavList.Item ref={ref}>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveAttribute('aria-expanded', 'false')
  })

  it('prevents expandable items past level four', () => {
    expect(() =>
      render(
        <NavList>
          <NavList.Item defaultExpanded>
            One
            <NavList.SubNav>
              <NavList.Item defaultExpanded>
                Two
                <NavList.SubNav>
                  <NavList.Item defaultExpanded>
                    Three
                    <NavList.SubNav>
                      <NavList.Item>
                        Four
                        <NavList.SubNav>
                          <NavList.Item href="/five">Five</NavList.Item>
                        </NavList.SubNav>
                      </NavList.Item>
                    </NavList.SubNav>
                  </NavList.Item>
                </NavList.SubNav>
              </NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
        </NavList>,
      ),
    ).toThrow('NavList supports up to 4 levels')
  })

  it('expands and collapses nested lists', async () => {
    const user = userEvent.setup()

    const {getByRole, queryByRole} = render(
      <NavList>
        <NavList.Item>
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

  it('uses triangle indicators for expandable items', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList>
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs expand'})

    expect(toggle.querySelector('.octicon-triangle-down')).toBeInTheDocument()

    await user.click(toggle)

    expect(toggle.querySelector('.octicon-triangle-up')).toBeInTheDocument()
  })

  it('auto-expands parents with current descendants', () => {
    const {getByRole} = render(
      <NavList>
        <NavList.Item>
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
    expect(getByRole('button', {name: 'Docs collapse'}).closest('li')).toHaveAttribute(
      'data-current-descendant',
      'true',
    )
    expect(getByRole('button', {name: 'Docs collapse'}).closest('li')).not.toHaveAttribute(
      'data-collapsed-current-descendant',
    )
    expect(getByRole('link', {name: 'Actions'})).toHaveAttribute('aria-current', 'page')
  })

  it('marks every expanded parent with current descendants', () => {
    const {getByRole} = render(
      <NavList>
        <NavList.Item defaultExpanded>
          Docs
          <NavList.SubNav>
            <NavList.Item defaultExpanded>
              Actions
              <NavList.SubNav>
                <NavList.Item defaultExpanded>
                  Workflows
                  <NavList.SubNav>
                    <NavList.Item href="/docs/actions/workflows/syntax" aria-current="page">
                      Workflow syntax
                    </NavList.Item>
                  </NavList.SubNav>
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('button', {name: 'Docs collapse'}).closest('li')).toHaveAttribute(
      'data-current-descendant',
      'true',
    )
    expect(getByRole('button', {name: 'Actions collapse'}).closest('li')).toHaveAttribute(
      'data-current-descendant',
      'true',
    )
    expect(getByRole('button', {name: 'Workflows collapse'}).closest('li')).toHaveAttribute(
      'data-current-descendant',
      'true',
    )
  })

  it('marks controlled collapsed parents with current descendants', () => {
    const {getByRole} = render(
      <NavList>
        <NavList.Item expanded={false}>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions" aria-current="page">
              Actions
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('button', {name: 'Docs expand'})).toHaveAttribute('aria-expanded', 'false')
    expect(getByRole('button', {name: 'Docs expand'}).closest('li')).toHaveAttribute('data-current-descendant', 'true')
    expect(getByRole('button', {name: 'Docs expand'}).closest('li')).toHaveAttribute(
      'data-collapsed-current-descendant',
      'true',
    )
  })

  it('allows auto-expanded current descendant branches to collapse', async () => {
    const user = userEvent.setup()

    const {getByRole, queryByRole} = render(
      <NavList>
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions" aria-current="page">
              Actions
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs collapse'})

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle.closest('li')).toHaveAttribute('data-current-descendant', 'true')
    expect(toggle.closest('li')).toHaveAttribute('data-collapsed-current-descendant', 'true')
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()
  })

  it('preserves a custom nested list id for the toggle control', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList>
        <NavList.Item>
          Docs
          <NavList.SubNav id="custom-subnav-id">
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs expand'})

    expect(toggle).toHaveAttribute('aria-controls', 'custom-subnav-id')

    await user.click(toggle)

    expect(document.getElementById('custom-subnav-id')).toBeInTheDocument()
  })

  it('labels nested lists from their parent disclosure button', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList>
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs expand'})

    await user.click(toggle)

    expect(getByRole('list', {name: 'Docs collapse'})).toHaveAttribute('aria-labelledby', toggle.id)
  })

  it('does not collapse nested lists when Escape is pressed', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList>
        <NavList.Item defaultExpanded>
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

    expect(nestedLink).toHaveFocus()
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(nestedLink).toBeInTheDocument()
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
