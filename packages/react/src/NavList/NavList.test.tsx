import React from 'react'
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
  afterEach(() => {
    jest.restoreAllMocks()
    cleanup()
  })

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
  })

  it('renders a flat root list as leaf items', () => {
    const {getByRole} = render(<NavListFixture />)

    const list = getByRole('list')
    const link = getByRole('link', {name: 'Overview'})
    const item = link.closest('li')

    expect(list).toHaveClass('NavList__list--flat')
    expect(item).toHaveClass('NavList__item--leaf')
    expect(item).toHaveClass('NavList__item--level-2')
    expect(item).not.toHaveClass('NavList__item--level-1')
  })

  it('renders grouped sections with labelled lists', () => {
    const {getByRole} = render(
      <NavList aria-label="Grouped navigation">
        <NavList.Group title="Products">
          <NavList.Item href="/copilot" aria-current="page">
            Copilot
          </NavList.Item>
          <NavList.Item href="/codespaces">Codespaces</NavList.Item>
        </NavList.Group>
        <NavList.Group title="Collaboration">
          <NavList.Item href="/pull-requests">Pull requests</NavList.Item>
        </NavList.Group>
      </NavList>,
    )

    const nav = getByRole('navigation', {name: 'Grouped navigation'})
    const productsHeading = getByRole('heading', {name: 'Products', level: 3})
    const productsList = getByRole('list', {name: 'Products'})
    const copilotItem = getByRole('link', {name: 'Copilot'}).closest('li')

    expect(nav).toContainElement(productsHeading)
    expect(productsHeading.closest('li')).toHaveClass('NavList__group')
    expect(productsList).toHaveClass('NavList__groupList')
    expect(copilotItem).toHaveClass('NavList__item--level-2')
  })

  it('applies custom className to groups', () => {
    const {getByTestId} = render(
      <NavList aria-label="Test navigation">
        <NavList.Group title="Products" className="custom-group" data-testid="custom-group">
          <NavList.Item href="/copilot">Copilot</NavList.Item>
        </NavList.Group>
      </NavList>,
    )

    expect(getByTestId('custom-group')).toHaveClass('NavList__group')
    expect(getByTestId('custom-group')).toHaveClass('custom-group')
  })

  it('forwards refs to groups', () => {
    const ref = React.createRef<HTMLLIElement>()

    const {getByTestId} = render(
      <NavList aria-label="Test navigation">
        <NavList.Group ref={ref} title="Products" data-testid="custom-group">
          <NavList.Item href="/copilot">Copilot</NavList.Item>
        </NavList.Group>
      </NavList>,
    )

    expect(ref.current).toBe(getByTestId('custom-group'))
  })

  it('supports nested disclosure inside groups', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Group title="Collaboration">
          <NavList.Item>
            Pull requests
            <NavList.SubNav>
              <NavList.Item href="/pull-requests/review">Review pull requests</NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
        </NavList.Group>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Pull requests'})

    expect(toggle.closest('li')).toHaveClass('NavList__item--level-2')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)

    expect(getByRole('link', {name: 'Review pull requests'}).closest('li')).toHaveClass('NavList__item--level-3')
  })

  it('prevents direct nested lists from being rendered inside groups', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {getByRole, queryByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Group title="Products">
          <NavList.Item href="/copilot">Copilot</NavList.Item>
          <NavList.SubNav>
            <NavList.Item href="/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Group>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Group: Only NavList.Item children are supported. Invalid children will not be rendered. Use NavList.SubNav as a child of NavList.Item for nested disclosure.',
    )
    expect(getByRole('link', {name: 'Copilot'})).toBeInTheDocument()
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()
  })

  it('prevents nested groups from being rendered inside groups', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {queryByText} = render(
      <NavList aria-label="Test navigation">
        <NavList.Group title="Products">
          <NavList.Group title="Nested group">
            <NavList.Item href="/copilot">Copilot</NavList.Item>
          </NavList.Group>
        </NavList.Group>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Group: Only NavList.Item children are supported. Invalid children will not be rendered. Use NavList.SubNav as a child of NavList.Item for nested disclosure.',
    )
    expect(queryByText('Nested group')).not.toBeInTheDocument()
    expect(queryByText('Copilot')).not.toBeInTheDocument()
  })

  it('prevents fragment-wrapped invalid children from being rendered inside groups', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {getByRole, queryByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Group title="Products">
          <>
            <NavList.Item href="/copilot">Copilot</NavList.Item>
            <NavList.SubNav>
              <NavList.Item href="/actions">Actions</NavList.Item>
            </NavList.SubNav>
          </>
        </NavList.Group>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Group: Only NavList.Item children are supported. Invalid children will not be rendered. Use NavList.SubNav as a child of NavList.Item for nested disclosure.',
    )
    expect(getByRole('link', {name: 'Copilot'})).toBeInTheDocument()
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()
  })

  it('applies custom className to the root', () => {
    const {getByRole} = render(
      <NavList aria-label="Test" className="custom-root">
        <NavList.Item href="/">Home</NavList.Item>
      </NavList>,
    )

    expect(getByRole('navigation', {name: 'Test'})).toHaveClass('NavList')
    expect(getByRole('navigation', {name: 'Test'})).toHaveClass('custom-root')
  })

  it('forwards refs to the root', () => {
    const ref = React.createRef<HTMLElement>()

    const {getByRole} = render(
      <NavList ref={ref} aria-label="Test">
        <NavList.Item href="/">Home</NavList.Item>
      </NavList>,
    )

    expect(ref.current).toBe(getByRole('navigation', {name: 'Test'}))
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
      <NavList aria-label="Test navigation">
        <NavList.Item as={CustomLink} href="/custom">
          Custom link
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('link', {name: 'Custom link'})).toHaveAttribute('data-custom-link', 'true')
    expect(getByRole('link', {name: 'Custom link'})).toHaveAttribute('href', '/custom')
  })

  it('passes keyboard handlers to rendered item controls', async () => {
    const user = userEvent.setup()
    const linkKeyDownTargets: HTMLElement[] = []
    const toggleKeyDownTargets: HTMLElement[] = []
    const onLinkKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => {
      linkKeyDownTargets.push(event.currentTarget)
    })
    const onToggleKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => {
      toggleKeyDownTargets.push(event.currentTarget)
    })

    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item href="/overview" onKeyDown={onLinkKeyDown}>
          Overview
        </NavList.Item>
        <NavList.Item onKeyDown={onToggleKeyDown}>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const link = getByRole('link', {name: 'Overview'})
    const toggle = getByRole('button', {name: 'Docs'})

    link.focus()
    await user.keyboard('{ArrowDown}')
    toggle.focus()
    await user.keyboard('{ArrowDown}')

    expect(onLinkKeyDown).toHaveBeenCalledTimes(1)
    expect(linkKeyDownTargets[0]).toBe(link)
    expect(onToggleKeyDown).toHaveBeenCalledTimes(1)
    expect(toggleKeyDownTargets[0]).toBe(toggle)
  })

  it('renders visual slots', () => {
    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item href="/start" leadingVisual={BookIcon} trailingVisual={<KebabHorizontalIcon />}>
          Getting started
        </NavList.Item>
        <NavList.Item leadingVisual={BookIcon} trailingVisual={<KebabHorizontalIcon />}>
          Guides
          <NavList.SubNav>
            <NavList.Item href="/guides/overview">Overview</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const link = getByRole('link', {name: 'Getting started'})
    const toggle = getByRole('button', {name: 'Guides'})

    expect(link.querySelector('.NavList__leadingVisual')).toBeInTheDocument()
    expect(link.querySelector('.NavList__trailingVisual')).toBeInTheDocument()
    expect(toggle.querySelector('.NavList__leadingVisual')).toBeInTheDocument()
    expect(toggle.querySelector('.NavList__trailingVisual')).toBeInTheDocument()
    expect(toggle.querySelectorAll('svg')).toHaveLength(3)
  })

  it('assigns item hierarchy levels through five nested lists', () => {
    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item defaultExpanded>
          Docs
          <NavList.SubNav>
            <NavList.Item defaultExpanded>
              Actions
              <NavList.SubNav>
                <NavList.Item defaultExpanded>
                  Workflows
                  <NavList.SubNav>
                    <NavList.Item href="/actions/workflows/overview">Workflow overview</NavList.Item>
                    <NavList.Item defaultExpanded>
                      Workflow syntax
                      <NavList.SubNav>
                        <NavList.Item href="/docs/actions/workflows/syntax/events">Events</NavList.Item>
                      </NavList.SubNav>
                    </NavList.Item>
                  </NavList.SubNav>
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('button', {name: 'Docs'}).closest('li')).toHaveClass('NavList__item--level-1')
    expect(getByRole('button', {name: 'Actions'}).closest('li')).toHaveClass('NavList__item--level-2')
    expect(getByRole('button', {name: 'Workflows'}).closest('li')).toHaveClass('NavList__item--level-3')
    expect(getByRole('button', {name: 'Workflow syntax'}).closest('li')).toHaveClass('NavList__item--level-4')
    expect(getByRole('link', {name: 'Events'}).closest('li')).toHaveClass('NavList__item--level-5')
  })

  it('marks leaf articles at each nested depth', () => {
    const {getByRole} = render(
      <NavList aria-label="Test navigation">
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
                    <NavList.Item href="/actions/workflows/overview">Workflow overview</NavList.Item>
                    <NavList.Item defaultExpanded>
                      Workflow syntax
                      <NavList.SubNav>
                        <NavList.Item href="/actions/workflows/syntax/events">Events</NavList.Item>
                      </NavList.SubNav>
                    </NavList.Item>
                  </NavList.SubNav>
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('link', {name: 'Overview'}).closest('li')).toHaveClass('NavList__item--leaf')
    expect(getByRole('link', {name: 'Overview'}).closest('li')).toHaveClass('NavList__item--level-2')
    expect(getByRole('link', {name: 'Quickstart'}).closest('li')).toHaveClass('NavList__item--leaf')
    expect(getByRole('link', {name: 'Quickstart'}).closest('li')).toHaveClass('NavList__item--level-3')
    expect(getByRole('link', {name: 'Workflow overview'}).closest('li')).toHaveClass('NavList__item--leaf')
    expect(getByRole('link', {name: 'Workflow overview'}).closest('li')).toHaveClass('NavList__item--level-4')
    expect(getByRole('link', {name: 'Events'}).closest('li')).toHaveClass('NavList__item--leaf')
    expect(getByRole('link', {name: 'Events'}).closest('li')).toHaveClass('NavList__item--level-5')
  })

  it('renders expandable items as disclosure buttons instead of links', () => {
    const {getByRole, queryByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('button', {name: 'Docs'})).toHaveAttribute('aria-expanded', 'false')
    expect(queryByRole('link', {name: 'Docs'})).not.toBeInTheDocument()
  })

  it('ignores aria-current on expandable items', () => {
    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item aria-current="page">
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs'})

    expect(toggle).not.toHaveAttribute('aria-current')
  })

  it('supports ref passthrough on expandable items', () => {
    const ref = React.createRef<HTMLElement>()

    render(
      <NavList aria-label="Test navigation">
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

  it('prevents expandable items past level five', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {queryByText} = render(
      <NavList aria-label="Test navigation">
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
                        <NavList.Item>
                          Five
                          <NavList.SubNav>
                            <NavList.Item href="/six">Six</NavList.Item>
                          </NavList.SubNav>
                        </NavList.Item>
                      </NavList.SubNav>
                    </NavList.Item>
                  </NavList.SubNav>
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Item: NavList supports up to 5 levels. Level 5 items cannot contain NavList.SubNav. NavList.Item will not be rendered.',
    )
    expect(queryByText('Five')).not.toBeInTheDocument()
    expect(queryByText('Six')).not.toBeInTheDocument()
  })

  it('requires expandable items to include label content', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {queryByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Item: A label is required when using NavList.SubNav. NavList.Item will not be rendered.',
    )
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()
  })

  it('prevents expandable items from including multiple nested lists', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {queryByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
          <NavList.SubNav>
            <NavList.Item href="/docs/packages">Packages</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Item: Only one NavList.SubNav child is supported. NavList.Item will not be rendered.',
    )
    expect(queryByRole('button', {name: 'Docs'})).not.toBeInTheDocument()
  })

  it('prevents expandable items from using link-only props', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {queryByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item href="/docs">
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Item: `href` and `as` are not supported when using NavList.SubNav because expandable items render as buttons. NavList.Item will not be rendered.',
    )
    expect(queryByRole('button', {name: 'Docs'})).not.toBeInTheDocument()

    cleanup()
    consoleWarnSpy.mockClear()

    const {queryByRole: queryByRoleAfterAs} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item as="div">
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Item: `href` and `as` are not supported when using NavList.SubNav because expandable items render as buttons. NavList.Item will not be rendered.',
    )
    expect(queryByRoleAfterAs('button', {name: 'Docs'})).not.toBeInTheDocument()
  })

  it('prevents groups from being rendered inside items', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {queryByText} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Products
          <NavList.Group title="Nested group">
            <NavList.Item href="/copilot">Copilot</NavList.Item>
          </NavList.Group>
        </NavList.Item>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Item: NavList.Group is not supported as a child. Use NavList.SubNav for nested disclosure. NavList.Item will not be rendered.',
    )
    expect(queryByText('Products')).not.toBeInTheDocument()
    expect(queryByText('Nested group')).not.toBeInTheDocument()
  })

  it('prevents fragment-wrapped groups from being rendered inside items', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {queryByText} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Products
          <>
            <NavList.Group title="Nested group">
              <NavList.Item href="/copilot">Copilot</NavList.Item>
            </NavList.Group>
          </>
        </NavList.Item>
      </NavList>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'NavList.Item: NavList.Group is not supported as a child. Use NavList.SubNav for nested disclosure. NavList.Item will not be rendered.',
    )
    expect(queryByText('Products')).not.toBeInTheDocument()
    expect(queryByText('Nested group')).not.toBeInTheDocument()
  })

  it('expands and collapses nested lists', async () => {
    const user = userEvent.setup()

    const {getByRole, queryByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
            <NavList.Item href="/docs/packages">Packages</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs'})
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('link', {name: 'Actions'})).toBeInTheDocument()

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()
  })

  it('hides collapsed nested lists from assistive technology without using hidden', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs'})
    const subNav = document.getElementById(toggle.getAttribute('aria-controls') ?? '')

    expect(subNav).toHaveAttribute('aria-hidden', 'true')
    expect(subNav).toHaveAttribute('data-expanded', 'false')
    expect(subNav).toHaveAttribute('inert')
    expect(subNav).not.toHaveAttribute('hidden')

    await user.click(toggle)

    expect(subNav).not.toHaveAttribute('aria-hidden')
    expect(subNav).toHaveAttribute('data-expanded', 'true')
    expect(subNav).not.toHaveAttribute('inert')
  })

  it('measures nested list height for expansion animation', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(64)

    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item defaultExpanded>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const subNav = getByRole('list', {name: 'Docs'})

    expect(subNav).toHaveStyle({'--brand-NavList-subNav-height': '64px'})
  })

  it('updates ancestor nested list heights when deeper sections expand', async () => {
    const user = userEvent.setup()

    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(function (this: HTMLElement) {
      const labelledBy = this.getAttribute('aria-labelledby')
      const label = labelledBy ? document.getElementById(labelledBy)?.textContent : ''
      const extensionsToggle = Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(button =>
        button.textContent.includes('Extensions'),
      )
      const extensionsExpanded = extensionsToggle?.getAttribute('aria-expanded') === 'true'

      if (label?.includes('Docs')) return extensionsExpanded ? 192 : 96
      if (label?.includes('Guides')) return extensionsExpanded ? 160 : 64
      if (label?.includes('Extensions')) return 96

      return 0
    })

    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item defaultExpanded>
          Docs
          <NavList.SubNav>
            <NavList.Item defaultExpanded>
              Guides
              <NavList.SubNav>
                <NavList.Item>
                  Extensions
                  <NavList.SubNav>
                    <NavList.Item href="/extensions/install">Install an extension</NavList.Item>
                    <NavList.Item href="/extensions/publish">Publish an extension</NavList.Item>
                    <NavList.Item href="/extensions/manage">Manage permissions</NavList.Item>
                  </NavList.SubNav>
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    expect(getByRole('list', {name: 'Docs'})).toHaveStyle({'--brand-NavList-subNav-height': '96px'})
    expect(getByRole('list', {name: 'Guides'})).toHaveStyle({'--brand-NavList-subNav-height': '64px'})

    await user.click(getByRole('button', {name: 'Extensions'}))

    expect(getByRole('list', {name: 'Docs'})).toHaveStyle({'--brand-NavList-subNav-height': '192px'})
    expect(getByRole('list', {name: 'Guides'})).toHaveStyle({
      '--brand-NavList-subNav-height': '160px',
    })
    expect(getByRole('link', {name: 'Install an extension'})).toBeInTheDocument()
  })

  it('renders a single animated triangle indicator for expandable items', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs'})
    const indicator = toggle.querySelector('.NavList__toggleIcon')

    expect(toggle.querySelector('.octicon-triangle-down')).toBeInTheDocument()
    expect(indicator).toBeInTheDocument()
    expect(toggle.querySelector('.octicon-triangle-up')).not.toBeInTheDocument()

    await user.click(toggle)

    expect(toggle.querySelector('.octicon-triangle-down')).toBeInTheDocument()
    expect(toggle.querySelector('.octicon-triangle-up')).not.toBeInTheDocument()
  })

  it('auto-expands parents with current descendants', () => {
    const {getByRole} = render(
      <NavList aria-label="Test navigation">
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

    expect(getByRole('button', {name: 'Docs'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('link', {name: 'Actions'})).toHaveAttribute('aria-current', 'page')
  })

  it('auto-expands every parent with current descendants', () => {
    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item>
              Actions
              <NavList.SubNav>
                <NavList.Item>
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

    expect(getByRole('button', {name: 'Docs'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('button', {name: 'Actions'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('button', {name: 'Workflows'})).toHaveAttribute('aria-expanded', 'true')
  })

  it('marks controlled collapsed parents with current descendants', () => {
    const {getByRole, queryByRole} = render(
      <NavList aria-label="Test navigation">
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

    expect(getByRole('button', {name: 'Docs'})).toHaveAttribute('aria-expanded', 'false')
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()
  })

  it('allows auto-expanded current descendant branches to collapse', async () => {
    const user = userEvent.setup()

    const {getByRole, queryByRole} = render(
      <NavList aria-label="Test navigation">
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

    const toggle = getByRole('button', {name: 'Docs'})

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(queryByRole('link', {name: 'Actions'})).not.toBeInTheDocument()
  })

  it('preserves a custom nested list id for the toggle control', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Docs
          <NavList.SubNav id="custom-subnav-id">
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs'})

    expect(toggle).toHaveAttribute('aria-controls', 'custom-subnav-id')

    await user.click(toggle)

    expect(document.getElementById('custom-subnav-id')).toBeInTheDocument()
  })

  it('labels nested lists from their parent disclosure button', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs'})

    await user.click(toggle)

    expect(getByRole('list', {name: 'Docs'})).toHaveAttribute('aria-labelledby', toggle.id)
  })

  it('does not collapse nested lists when Escape is pressed', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <NavList aria-label="Test navigation">
        <NavList.Item defaultExpanded>
          Docs
          <NavList.SubNav>
            <NavList.Item href="/docs/actions">Actions</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>,
    )

    const toggle = getByRole('button', {name: 'Docs'})
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
      <NavList aria-label="Test navigation">
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
