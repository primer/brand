import {createRef} from 'react'
import {act, cleanup, fireEvent, render, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import {
  SubdomainNavBar,
  type SubdomainNavBarHandle,
  type SubdomainNavBarSearchResults,
  type SubdomainNavBarProps,
} from './SubdomainNavBar'
import {axe, toHaveNoViolations} from 'jest-axe'

import {useWindowSize} from '../hooks/useWindowSize'

expect.extend(toHaveNoViolations)

jest.mock('../hooks/useWindowSize')
const mockUseWindowSize = useWindowSize as jest.Mock
mockUseWindowSize.mockImplementation(() => ({isSmall: false, isMedium: false}))

let resizeObserverCallbacks: ResizeObserverCallback[] = []

class MockResizeObserver implements ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    resizeObserverCallbacks.push(callback)
  }

  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

const dispatchDialogCancel = (dialog: HTMLElement) => {
  fireEvent(dialog, new Event('cancel', {cancelable: true}))
}

const updateNavigationLayout = async (
  container: HTMLElement,
  {
    containerWidth = 150,
    itemWidth = 50,
    itemWidths,
    moreWidth = 30,
  }: {containerWidth?: number; itemWidth?: number; itemWidths?: number[]; moreWidth?: number},
) => {
  const navList = container.querySelector<HTMLElement>('.SubdomainNavBar-primary-nav-list')
  const navItems = Array.from(navList?.querySelectorAll<HTMLElement>('[data-navitemid]') ?? [])
  const moreMenu = container.querySelector<HTMLElement>('.SubdomainNavBar-primary-nav-list-item--overflow')

  if (navList) {
    Object.defineProperty(navList, 'clientWidth', {
      configurable: true,
      value: containerWidth,
    })
  }

  for (const [index, item] of navItems.entries()) {
    Object.defineProperty(item, 'offsetWidth', {
      configurable: true,
      value: itemWidths?.[index] ?? itemWidth,
    })
  }

  if (moreMenu) {
    Object.defineProperty(moreMenu, 'offsetWidth', {
      configurable: true,
      value: moreWidth,
    })
  }

  await act(async () => {
    window.dispatchEvent(new Event('resize'))
    for (const callback of resizeObserverCallbacks) {
      callback([], {} as ResizeObserver)
    }
    await new Promise(resolve => requestAnimationFrame(resolve))
  })
}

describe('SubdomainNavBar', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false, isMedium: false}))
    resizeObserverCallbacks = []
    global.ResizeObserver = MockResizeObserver

    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: {
        ready: Promise.resolve(),
      },
    })
  })

  const Component = ({
    fullWidth,
    searchResults,
    titleHref,
    title = 'Subdomain',
    variant,
    leadingComponent,
    trailingComponent,
  }: {
    fullWidth?: boolean
    searchResults?: SubdomainNavBarSearchResults
    titleHref?: string
    title?: string
    variant?: SubdomainNavBarProps['variant']
    leadingComponent?: SubdomainNavBarProps['leadingComponent']
    trailingComponent?: SubdomainNavBarProps['trailingComponent']
  }) => (
    <SubdomainNavBar
      title={title}
      titleHref={titleHref}
      fullWidth={fullWidth}
      variant={variant}
      leadingComponent={leadingComponent}
      trailingComponent={trailingComponent}
    >
      <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Topics</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Events</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Video</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Social</SubdomainNavBar.Link>
      <SubdomainNavBar.Search
        searchTerm="devops"
        searchResults={searchResults}
        onChange={jest.fn}
        onSubmit={jest.fn()}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  )

  it('renders a navigation bar correctly using the right landmarks', () => {
    const {getByRole, getAllByRole} = render(<Component />)

    expect(getByRole('banner')).toBeInTheDocument() // <header>
    expect(getAllByRole('navigation').length > 0).toBeTruthy() // <nav>
  })

  it('forwards a custom id to the root element', () => {
    const {getByRole} = render(<SubdomainNavBar id="docs-navigation" title="Docs" />)

    expect(getByRole('banner')).toHaveAttribute('id', 'docs-navigation')
  })

  it('forwards custom styles to the root element', () => {
    const {getByRole} = render(<SubdomainNavBar style={{opacity: 0.5}} title="Docs" />)

    expect(getByRole('banner')).toHaveStyle({opacity: '0.5'})
  })

  it('has no a11y violations by default', async () => {
    const {container} = render(<Component />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders search results if searchResults are passed', async () => {
    const mockResultsData = [
      {
        title: 'mock title',
        description: 'mock description',
        url: 'https://github.com',
        date: '2022-08-29T00:00+02:00',
      },
    ]

    const {getByTestId, getByRole} = render(<Component searchResults={mockResultsData} />)
    const searchTrigger = getByTestId('toggle-search')

    fireEvent.click(searchTrigger)

    const searchResultsDialog = getByRole('dialog')
    const searchResultsLandmark = getByRole('search')

    expect(searchResultsDialog).toBeInTheDocument()
    expect(searchResultsDialog.tagName).toBe('DIALOG')
    expect(searchResultsDialog).toHaveAttribute('open')
    expect(searchResultsLandmark).toBeInTheDocument()
  })

  it('opens the search dialog with the "/" keyboard shortcut', () => {
    const {getByRole, queryByRole} = render(<Component />)

    expect(queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.keyDown(document, {key: '/'})

    expect(getByRole('dialog')).toHaveAttribute('open')
    expect(getByRole('combobox')).toHaveFocus()
  })

  it('does not open the search dialog with "/" while focus is in another text input', () => {
    const {getByLabelText, queryByRole} = render(
      <>
        <label htmlFor="page-search">Page search</label>
        <input id="page-search" type="text" />
        <Component />
      </>,
    )

    const pageSearchInput = getByLabelText('Page search')
    pageSearchInput.focus()

    fireEvent.keyDown(pageSearchInput, {key: '/'})

    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('can remap the search dialog keyboard shortcut to a modifier combination', () => {
    const {getByRole, queryByRole} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Search
          keyboardShortcut="Command+Option+k"
          searchTerm="docs"
          onChange={jest.fn}
          onSubmit={jest.fn()}
        />
      </SubdomainNavBar>,
    )

    fireEvent.keyDown(document, {key: '/'})

    expect(queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.keyDown(document, {key: 'k'})

    expect(queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.keyDown(document, {code: 'KeyK', key: 'k', metaKey: true})

    expect(queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.keyDown(document, {altKey: true, code: 'KeyK', key: 'k', metaKey: true})

    expect(getByRole('dialog')).toHaveAttribute('open')
    expect(getByRole('combobox')).toHaveFocus()
  })

  it('can disable the search dialog keyboard shortcut', () => {
    const {queryByRole} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Search keyboardShortcut={false} searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    fireEvent.keyDown(document, {key: '/'})

    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens the search dialog through the SubdomainNavBar ref', () => {
    const ref = createRef<SubdomainNavBarHandle>()
    const {getByRole} = render(
      <SubdomainNavBar ref={ref} title="Subdomain">
        <SubdomainNavBar.Search searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    act(() => {
      ref.current?.openSearch()
    })

    expect(getByRole('dialog')).toHaveAttribute('open')
    expect(getByRole('combobox')).toHaveFocus()
  })

  it('renders grouped search results while preserving the listbox options', async () => {
    const mockResultsData: SubdomainNavBarSearchResults = [
      {
        title: 'AI results',
        results: [
          {
            title: 'How do I connect to GitHub with my SSH?',
            description: 'A generated answer suggestion',
            url: 'https://github.com',
            date: '2026-07-01T00:00+02:00',
          },
        ],
      },
      {
        title: 'Docs results',
        results: [
          {
            title: 'Frequently asked questions',
            description: 'A docs result',
            url: 'https://docs.github.com',
            date: '2026-07-01T00:00+02:00',
          },
        ],
      },
    ]

    const {getByTestId, getByText, getAllByRole} = render(<Component searchResults={mockResultsData} />)

    fireEvent.click(getByTestId('toggle-search'))

    expect(getByText('AI results')).toBeInTheDocument()
    expect(getByText('Docs results')).toBeInTheDocument()
    expect(getAllByRole('option')).toHaveLength(2)
  })

  it('uses custom labels for search triggers and dialog controls', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true, isLarge: true}))

    const labels = {
      searchLabel: 'Buscar',
      searchTriggerLabel: 'Abrir búsqueda',
      closeLabel: 'Cerrar',
      formatSearchWithTitle: (title: string) => `Buscar en ${title}`,
      formatSearchTrigger: (placeholder: string) => `Abrir ${placeholder}`,
    }

    const {getByRole, rerender} = render(
      <SubdomainNavBar title="Documentación" variant="gridline">
        <SubdomainNavBar.Search
          variant="input"
          placeholder="Buscar documentación"
          labels={labels}
          searchTerm=""
          onChange={jest.fn}
          onSubmit={jest.fn()}
        />
      </SubdomainNavBar>,
    )

    fireEvent.click(getByRole('button', {name: 'Abrir Buscar documentación'}))

    expect(getByRole('dialog', {name: 'Buscar en Documentación'})).toBeInTheDocument()
    expect(getByRole('combobox', {name: 'Buscar'})).toBeInTheDocument()
    expect(getByRole('button', {name: 'Cerrar'})).toHaveTextContent('Cerrar')

    rerender(
      <SubdomainNavBar title="Documentación" variant="gridline">
        <SubdomainNavBar.Search labels={labels} searchTerm="" onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    expect(getByRole('button', {name: 'Abrir búsqueda'})).toBeInTheDocument()
  })

  it('uses custom labels for ungrouped results and live-region announcements', () => {
    const searchResults: SubdomainNavBarSearchResults = [
      {
        title: 'Configurar Git',
        description: 'Aprende a configurar Git.',
        url: 'https://docs.github.com',
        date: '2026-07-01T00:00+02:00',
      },
    ]

    const {getByRole, getByTestId, getByText} = render(
      <SubdomainNavBar title="Documentación">
        <SubdomainNavBar.Search
          labels={{
            formatResultsHeading: searchTerm => `Resultados para «${searchTerm}»`,
            formatSuggestions: count => `${count} sugerencia${count === 1 ? '' : 's'}.`,
          }}
          searchTerm="Git"
          searchResults={searchResults}
          onChange={jest.fn}
          onSubmit={jest.fn()}
        />
      </SubdomainNavBar>,
    )

    fireEvent.click(getByRole('button', {name: 'Toggle search bar'}))

    expect(getByText('Resultados para «Git»')).toBeInTheDocument()
    expect(getByTestId(SubdomainNavBar.testIds.liveRegion)).toHaveTextContent('1 sugerencia.')
  })

  it('uses custom labels for grouped and untitled search results', () => {
    const searchResults: SubdomainNavBarSearchResults = [
      {
        title: 'Documentación',
        results: [
          {
            title: 'Configurar Git',
            description: 'Aprende a configurar Git.',
            url: 'https://docs.github.com',
            date: '2026-07-01T00:00+02:00',
          },
        ],
      },
      {
        title: '',
        results: [
          {
            title: 'GitHub CLI',
            description: 'Aprende a usar GitHub CLI.',
            url: 'https://cli.github.com',
            date: '2026-07-01T00:00+02:00',
          },
        ],
      },
    ]

    const labels = {
      resultsLabel: 'Resultados',
      searchResultsLabel: 'Resultados de búsqueda',
      formatResultsLabel: (searchTerm: string) => `Resultados para ${searchTerm}`,
    }

    const {getByRole, rerender} = render(
      <SubdomainNavBar title="Documentación">
        <SubdomainNavBar.Search
          labels={labels}
          searchTerm="Git"
          searchResults={searchResults}
          onChange={jest.fn}
          onSubmit={jest.fn()}
        />
      </SubdomainNavBar>,
    )

    fireEvent.click(getByRole('button', {name: 'Toggle search bar'}))

    expect(getByRole('listbox', {name: 'Resultados para Git'})).toBeInTheDocument()
    expect(getByRole('group', {name: 'Resultados'})).toBeInTheDocument()

    rerender(
      <SubdomainNavBar title="Documentación">
        <SubdomainNavBar.Search
          labels={labels}
          searchTerm=""
          searchResults={searchResults}
          onChange={jest.fn}
          onSubmit={jest.fn()}
        />
      </SubdomainNavBar>,
    )

    expect(getByRole('listbox', {name: 'Resultados de búsqueda'})).toBeInTheDocument()
  })

  it('applies "/" as the default title href', async () => {
    const {getByRole} = render(<Component />)
    const linkEl = getByRole('link', {name: 'Subdomain home'})

    expect(linkEl).toHaveAttribute('href', '/')
  })

  it('removes the default separator and menu title when title is empty', async () => {
    const {container} = render(<Component title="" />)

    const separator = container.querySelector('.SubdomainNavBar-title-separator')
    const menuTitle = container.querySelector('.SubdomainNavBar-title')

    expect(separator).not.toBeInTheDocument()
    expect(menuTitle).not.toBeInTheDocument()
  })

  it('can apply an alternative href on the title', async () => {
    const mockTitleHref = '/mock-title-href'
    const {getByRole} = render(<Component titleHref={mockTitleHref} />)
    const linkEl = getByRole('link', {name: 'Subdomain home'})

    expect(linkEl).toHaveAttribute('href', mockTitleHref)
  })

  it('applies visual styling logic for fullWidth prop by default', () => {
    const {getByTestId} = render(<Component />)

    const innerContainerEl = getByTestId(SubdomainNavBar.testIds.innerContainer)

    expect(innerContainerEl.classList).toContain(`SubdomainNavBar-inner-container--centered`)
  })

  it('optionally applies removes visual styling logic for fullWidth prop', () => {
    const {getByTestId} = render(<Component fullWidth={true} />)

    const innerContainerEl = getByTestId(SubdomainNavBar.testIds.innerContainer)

    expect(innerContainerEl.classList).not.toContain(`SubdomainNavBar-inner-container--centered`)
  })

  it('does not render a menu toggling button with 0 menu links', () => {
    const {queryByTestId} = render(<SubdomainNavBar title="Subdomain" />)

    const menuButtonEl = queryByTestId(SubdomainNavBar.testIds.menuButton)

    expect(menuButtonEl).toBe(null)
  })

  it('discloses leading-only mobile content and makes it keyboard reachable', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(
      <SubdomainNavBar title="" leadingComponent={<button type="button">Leading action</button>} />,
    )

    const menuButton = getByRole('button', {name: 'Menu'})
    const menuId = menuButton.getAttribute('aria-controls')

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuId).toBeTruthy()

    const menu = document.getElementById(menuId as string)
    expect(menu).toBeInTheDocument()

    await user.click(menuButton)

    const leadingAction = within(menu as HTMLElement).getByRole('button', {name: 'Leading action'})
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(leadingAction).toBeVisible()

    await user.tab()

    expect(leadingAction).toHaveFocus()
  })

  it('discloses trailing-only mobile content and makes it keyboard reachable', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(
      <SubdomainNavBar title="" trailingComponent={<button type="button">Trailing action</button>} />,
    )

    const menuButton = getByRole('button', {name: 'Menu'})
    const menuId = menuButton.getAttribute('aria-controls')

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuId).toBeTruthy()

    const menu = document.getElementById(menuId as string)
    expect(menu).toBeInTheDocument()

    await user.click(menuButton)

    const trailingAction = within(menu as HTMLElement).getByRole('button', {name: 'Trailing action'})
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(trailingAction).toBeVisible()

    await user.tab()

    expect(trailingAction).toHaveFocus()
  })

  it('associates each mobile disclosure control with its own menu', () => {
    const {getAllByRole} = render(
      <>
        <SubdomainNavBar title="" leadingComponent={<button type="button">First action</button>} />
        <SubdomainNavBar title="" leadingComponent={<button type="button">Second action</button>} />
      </>,
    )

    const [firstMenuButton, secondMenuButton] = getAllByRole('button', {name: 'Menu'})
    const firstMenuId = firstMenuButton.getAttribute('aria-controls')
    const secondMenuId = secondMenuButton.getAttribute('aria-controls')

    expect(firstMenuId).toBeTruthy()
    expect(secondMenuId).toBeTruthy()
    expect(firstMenuId).not.toBe(secondMenuId)
    expect(document.getElementById(firstMenuId as string)).toBeInTheDocument()
    expect(document.getElementById(secondMenuId as string)).toBeInTheDocument()
  })

  it('does not expose the More menu when all desktop navigation links fit', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container, queryByRole} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Link href="#collections">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#topics">Topics</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#articles">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    await updateNavigationLayout(container, {containerWidth: 150})

    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()
  })

  it('renders only overflowed desktop navigation links in the More menu', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container, getByRole} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Link href="#collections">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#topics">Topics</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#articles">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    await updateNavigationLayout(container, {containerWidth: 130})

    const moreButton = getByRole('button', {name: 'More'})
    fireEvent.click(moreButton)

    const overflowMenuId = moreButton.getAttribute('aria-controls')
    const overflowMenu = overflowMenuId ? document.getElementById(overflowMenuId) : null

    expect(moreButton).not.toHaveAttribute('aria-haspopup')
    expect(overflowMenu).toBeInTheDocument()
    expect(within(overflowMenu as HTMLElement).getByRole('link', {name: 'Articles'})).toHaveAttribute(
      'href',
      '#articles',
    )
    expect(within(overflowMenu as HTMLElement).queryByRole('link', {name: 'Collections'})).not.toBeInTheDocument()
    expect(within(overflowMenu as HTMLElement).queryByRole('link', {name: 'Topics'})).not.toBeInTheDocument()
  })

  it('keeps overflowed desktop navigation links contiguous when later links are shorter', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container, getByRole} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Link href="#collections">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#enterprise">Enterprise Solutions</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#docs">Docs</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#pricing">Pricing</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    await updateNavigationLayout(container, {
      containerWidth: 160,
      itemWidths: [50, 100, 20, 40],
      moreWidth: 30,
    })

    const moreButton = getByRole('button', {name: 'More'})
    fireEvent.click(moreButton)

    const overflowMenuId = moreButton.getAttribute('aria-controls')
    const overflowMenu = overflowMenuId ? document.getElementById(overflowMenuId) : null

    expect(container.querySelector('[data-navitemid="0-Collections"]')).not.toHaveAttribute('aria-hidden')
    expect(container.querySelector('[data-navitemid="1-Enterprise Solutions"]')).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector('[data-navitemid="2-Docs"]')).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector('[data-navitemid="3-Pricing"]')).toHaveAttribute('aria-hidden', 'true')

    expect(within(overflowMenu as HTMLElement).getByRole('link', {name: 'Enterprise Solutions'})).toHaveAttribute(
      'href',
      '#enterprise',
    )
    expect(within(overflowMenu as HTMLElement).getByRole('link', {name: 'Docs'})).toHaveAttribute('href', '#docs')
    expect(within(overflowMenu as HTMLElement).getByRole('link', {name: 'Pricing'})).toHaveAttribute('href', '#pricing')
    expect(within(overflowMenu as HTMLElement).queryByRole('link', {name: 'Collections'})).not.toBeInTheDocument()
  })

  it('returns focus to the More button when the overflow menu closes with Escape', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container, getByRole} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Link href="#collections">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#topics">Topics</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#articles">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    await updateNavigationLayout(container, {containerWidth: 130})

    const moreButton = getByRole('button', {name: 'More'})
    fireEvent.click(moreButton)

    const overflowMenuId = moreButton.getAttribute('aria-controls')
    const overflowMenu = overflowMenuId ? document.getElementById(overflowMenuId) : null
    const overflowLink = within(overflowMenu as HTMLElement).getByRole('link', {name: 'Articles'})

    overflowLink.focus()
    expect(overflowLink).toHaveFocus()

    fireEvent.keyDown(document, {key: 'Escape'})

    expect(moreButton).toHaveFocus()
    expect(overflowMenuId ? document.getElementById(overflowMenuId) : null).not.toBeInTheDocument()
  })

  it('closes the overflow menu when focus moves to a visible desktop navigation link', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container, getByRole} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Link href="#collections">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#topics">Topics</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#articles">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    await updateNavigationLayout(container, {containerWidth: 130})

    const moreButton = getByRole('button', {name: 'More'})
    fireEvent.click(moreButton)

    const overflowMenuId = moreButton.getAttribute('aria-controls')
    expect(overflowMenuId ? document.getElementById(overflowMenuId) : null).toBeInTheDocument()

    const visibleLink = getByRole('link', {name: 'Collections'})
    fireEvent.focusIn(visibleLink)

    expect(moreButton).toHaveAttribute('aria-expanded', 'false')
    expect(overflowMenuId ? document.getElementById(overflowMenuId) : null).not.toBeInTheDocument()
  })

  it('removes overflowed desktop navigation links from keyboard and assistive technology navigation', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Link href="#collections">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#topics">Topics</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#articles">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    await updateNavigationLayout(container, {containerWidth: 130})

    const overflowedLinkItem = container.querySelector('[data-navitemid="2-Articles"]')
    const overflowedLink = overflowedLinkItem?.querySelector('a')

    expect(overflowedLinkItem).toHaveAttribute('aria-hidden', 'true')
    expect(overflowedLinkItem).toHaveAttribute('tabindex', '-1')
    expect(overflowedLink).toHaveAttribute('tabindex', '-1')
  })

  it('restores overflowed desktop navigation links when the available width expands', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container, queryByRole} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Link href="#collections">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#topics">Topics</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#articles">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    await updateNavigationLayout(container, {containerWidth: 130})

    expect(queryByRole('button', {name: 'More'})).toBeInTheDocument()
    expect(container.querySelector('[data-navitemid="2-Articles"]')).toHaveAttribute('aria-hidden', 'true')

    await updateNavigationLayout(container, {containerWidth: 150})

    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()
    expect(container.querySelector('[data-navitemid="2-Articles"]')).not.toHaveAttribute('aria-hidden')
  })

  it('keeps mobile navigation links out of the More menu', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: false}))

    const {getAllByRole, getByRole, queryByRole} = render(
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Link href="#collections">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#topics">Topics</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#articles">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    fireEvent.click(getByRole('button', {name: 'Menu'}))

    expect(queryByRole('button', {name: 'More'})).not.toBeInTheDocument()
    expect(getAllByRole('link', {name: 'Articles'}).length).toBeGreaterThan(0)
  })

  it('does not render an action container when no actions are provided', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Link href="#">Docs</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    const actionContainer = container.querySelector('.SubdomainNavBar-button-area')
    expect(actionContainer).not.toBeInTheDocument()
  })

  it('does not add a trailing border class to search when no actions are provided', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByTestId} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    const searchTrigger = getByTestId('toggle-search').parentElement
    expect(searchTrigger).not.toHaveClass('SubdomainNavBar-search-trigger--has-trailing-item')
  })

  it('adds a trailing border class to search when actions follow it', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByTestId} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
        <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      </SubdomainNavBar>,
    )

    const searchTrigger = getByTestId('toggle-search').parentElement
    expect(searchTrigger).toHaveClass('SubdomainNavBar-search-trigger--has-trailing-item')
  })

  it('adds a trailing border class to search when a trailing component follows it', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByTestId} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline" trailingComponent={<span>Trailing content</span>}>
        <SubdomainNavBar.Search searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    const searchTrigger = getByTestId('toggle-search').parentElement
    expect(searchTrigger).toHaveClass('SubdomainNavBar-search-trigger--has-trailing-item')
  })

  it('renders the gridline search trigger as an icon-only secondary Button', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByTestId} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    const searchTrigger = getByTestId('toggle-search')
    expect(searchTrigger).toHaveAccessibleName('Toggle search bar')
    expect(searchTrigger).not.toHaveTextContent('Search')
    expect(searchTrigger).toHaveClass('Button--secondary')
    expect(searchTrigger).toHaveClass('Button--size-small')
    expect(searchTrigger).toHaveClass('SubdomainNavBar-search-button--gridline')
    expect(searchTrigger).not.toHaveClass('SubdomainNavBar-search-button')
  })

  it('renders gridline action buttons with the 32px Button size', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByRole} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
        <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
      </SubdomainNavBar>,
    )

    expect(getByRole('link', {name: 'Primary CTA'})).toHaveClass('Button--size-small')
    expect(getByRole('link', {name: 'Secondary CTA'})).toHaveClass('Button--size-small')
  })

  it('renders the input search trigger variant with placeholder and shortcut text', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true, isLarge: true}))

    const {getByTestId, getByText} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search
          variant="input"
          placeholder="Search ..."
          shortcutLabel="/"
          searchTerm="docs"
          onChange={jest.fn}
          onSubmit={jest.fn()}
        />
      </SubdomainNavBar>,
    )

    const searchTrigger = getByTestId('toggle-search')
    expect(searchTrigger).toHaveAccessibleName('Search ... search')
    expect(searchTrigger).toHaveClass('SubdomainNavBar-search-input-button')
    expect(searchTrigger).not.toHaveClass('SubdomainNavBar-search-button--gridline')
    expect(searchTrigger).not.toHaveClass('Button--secondary')
    expect(getByText('Search ...')).toBeInTheDocument()
    expect(getByText('/')).toBeInTheDocument()
  })

  it.each([
    ['mobile', {isSmall: false, isMedium: false, isLarge: false}],
    ['tablet', {isSmall: true, isMedium: true, isLarge: false}],
  ])('renders the input search trigger variant as an icon button on %s viewports', (_name, windowSize) => {
    mockUseWindowSize.mockImplementation(() => windowSize)

    const {getByTestId, queryByText} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search
          variant="input"
          placeholder="Search ..."
          shortcutLabel="/"
          searchTerm="docs"
          onChange={jest.fn}
          onSubmit={jest.fn()}
        />
      </SubdomainNavBar>,
    )

    const searchTrigger = getByTestId('toggle-search')
    expect(searchTrigger).toHaveAccessibleName('Toggle search bar')
    expect(searchTrigger).toHaveClass('Button--secondary')
    expect(searchTrigger).toHaveClass('SubdomainNavBar-search-button--gridline')
    expect(searchTrigger).not.toHaveClass('SubdomainNavBar-search-input-button')
    expect(queryByText('Search ...')).not.toBeInTheDocument()
    expect(queryByText('/')).not.toBeInTheDocument()
  })

  it('uses the input search trigger placeholder for the opened search input', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true, isLarge: true}))

    const {getByTestId, getByPlaceholderText, getByRole} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search
          variant="input"
          placeholder="Search docs"
          searchTerm="docs"
          onChange={jest.fn}
          onSubmit={jest.fn()}
        />
      </SubdomainNavBar>,
    )

    fireEvent.click(getByTestId('toggle-search'))

    expect(getByRole('dialog')).toBeInTheDocument()
    expect(getByPlaceholderText('Search docs')).toBeInTheDocument()
  })

  it('renders the gridline search dialog as a native dialog with a text close button', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container, getByRole, getByTestId} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    fireEvent.click(getByTestId('toggle-search'))

    const dialog = getByRole('dialog')
    expect(container.querySelector('.SubdomainNavBar-search-backdrop')).not.toBeInTheDocument()
    expect(dialog.tagName).toBe('DIALOG')
    expect(dialog).toHaveAttribute('open')
    expect(dialog).toHaveClass('SubdomainNavBar-search-dialog--gridline')
    expect(getByRole('button', {name: 'Close'})).toHaveTextContent('Close')
  })

  it('keeps the gridline search dialog open when focus moves outside during initialization', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByRole, getByTestId} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    fireEvent.click(getByTestId('toggle-search'))
    fireEvent.focusIn(document.body)

    expect(getByRole('dialog')).toBeInTheDocument()
  })

  it('closes the gridline search dialog on native cancel when results are visible', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))
    const mockResultsData: SubdomainNavBarSearchResults = [
      {
        title: 'AI results',
        results: [
          {
            title: 'How do I connect to GitHub with my SSH?',
            description: 'A generated answer suggestion',
            url: 'https://github.com',
            date: '2026-07-01T00:00+02:00',
          },
        ],
      },
    ]

    const {getByRole, getByTestId, queryByRole} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search
          searchTerm="docs"
          searchResults={mockResultsData}
          onChange={jest.fn}
          onSubmit={jest.fn()}
        />
      </SubdomainNavBar>,
    )

    fireEvent.click(getByTestId('toggle-search'))
    expect(getByRole('option')).toBeInTheDocument()

    dispatchDialogCancel(getByRole('dialog'))
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the gridline search dialog on native cancel when no results are visible', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByRole, getByTestId, queryByRole} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search searchTerm="" searchResults={[]} onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    fireEvent.click(getByTestId('toggle-search'))
    expect(getByRole('dialog')).toBeInTheDocument()
    expect(queryByRole('option')).not.toBeInTheDocument()

    dispatchDialogCancel(getByRole('dialog'))
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('disables native browser autocomplete on the search combobox', () => {
    const {getByRole, getByTestId} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search searchTerm="docs" searchResults={[]} onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    fireEvent.click(getByTestId('toggle-search'))

    const combobox = getByRole('combobox')
    expect(combobox).toHaveAttribute('autocomplete', 'off')
    expect(combobox).toHaveAttribute('aria-autocomplete', 'list')
  })

  it('adds a trailing border class to the action area when a trailing component follows it', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline" trailingComponent={<span>Trailing content</span>}>
        <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      </SubdomainNavBar>,
    )

    const actionContainer = container.querySelector('.SubdomainNavBar-button-area')
    expect(actionContainer).toHaveClass('SubdomainNavBar-button-area--has-trailing-item')
  })

  it('renders leading and trailing components in the expected order', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByRole, getByText} = render(
      <Component leadingComponent={<span>Leading content</span>} trailingComponent={<span>Trailing content</span>} />,
    )

    const titleLink = getByRole('link', {name: 'Subdomain home'})
    const leadingComponent = getByText('Leading content')
    const firstLink = getByRole('link', {name: 'Collections'})
    const secondaryAction = getByRole('link', {name: 'Secondary CTA'})
    const trailingComponent = getByText('Trailing content')

    expect(titleLink.compareDocumentPosition(leadingComponent) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(leadingComponent.compareDocumentPosition(firstLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(secondaryAction.compareDocumentPosition(trailingComponent) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('renders mobile leading content before links and groups actions with trailing content at the menu footer', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false, isMedium: false}))

    const {container, getByRole, getByTestId, getByText} = render(
      <Component
        variant="gridline"
        leadingComponent={<span>Leading content</span>}
        trailingComponent={<span>Trailing content</span>}
      />,
    )
    const header = getByTestId(SubdomainNavBar.testIds.root)
    jest.spyOn(header, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 16,
      top: 16,
      right: 390,
      bottom: 72,
      left: 0,
      width: 390,
      height: 56,
      toJSON: () => ({}),
    } as DOMRect)

    fireEvent.click(getByRole('button', {name: 'Menu'}))

    const menuWrapper = container.querySelector('.SubdomainNavBar-menu-wrapper')
    const menuFooter = container.querySelector('.SubdomainNavBar-menu-wrapper-footer')
    const leadingComponent = getByText('Leading content').parentElement
    const trailingComponent = getByText('Trailing content').parentElement
    const menuWrapperElement = menuWrapper as HTMLElement
    const menuFooterElement = menuFooter as HTMLElement
    const firstLink = within(menuWrapperElement).getByRole('link', {name: 'Collections'})
    const primaryAction = within(menuFooterElement).getByRole('link', {name: 'Primary CTA'})

    expect(leadingComponent).toHaveClass('SubdomainNavBar-leading-component')
    expect(trailingComponent).toHaveClass('SubdomainNavBar-trailing-component')
    expect(header.style.getPropertyValue('--SubdomainNavBar-menu-offset-block-start')).toBe('16px')
    expect(menuFooterElement.parentElement).toBe(menuWrapperElement)
    expect(menuWrapperElement.lastElementChild).toBe(menuFooterElement)
    expect(
      (leadingComponent as HTMLElement).compareDocumentPosition(firstLink) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      primaryAction.compareDocumentPosition(trailingComponent as HTMLElement) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('can append a classname to the root element', () => {
    const mockClass = 'custom-class'
    const {getByTestId} = render(<SubdomainNavBar title="Subdomain" className={mockClass} />)

    const headerEl = getByTestId(SubdomainNavBar.testIds.root)

    expect(headerEl.classList).toContain(mockClass)
  })

  it('renders with default variant by default', () => {
    const {getByTestId} = render(<Component />)

    const headerEl = getByTestId(SubdomainNavBar.testIds.root)
    expect(headerEl).toHaveClass('SubdomainNavBar--variant-default')
    expect(headerEl).not.toHaveClass('SubdomainNavBar--variant-gridline')
  })

  it('renders with gridline variant', () => {
    const {getByTestId} = render(<Component variant="gridline" />)

    const headerEl = getByTestId(SubdomainNavBar.testIds.root)
    expect(headerEl).toHaveClass('SubdomainNavBar--variant-gridline')
    expect(headerEl).not.toHaveClass('SubdomainNavBar--variant-default')
  })

  it('does not render the title separator with gridline variant', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container} = render(<Component variant="gridline" />)

    const separator = container.querySelector('.SubdomainNavBar-title-separator')
    expect(separator).not.toBeInTheDocument()
  })

  it('renders live region when search is active', async () => {
    const {getByTestId, getByLabelText} = render(<Component />)
    const searchTrigger = getByTestId('toggle-search')

    fireEvent.click(searchTrigger)

    const liveRegion = getByTestId(SubdomainNavBar.testIds.liveRegion)
    const liveRegionSpace = liveRegion.querySelector('span')
    const searchClose = getByLabelText('Close')

    expect(liveRegion).toBeInTheDocument()
    expect(liveRegionSpace).toBeInTheDocument()

    fireEvent.click(searchClose)

    expect(liveRegion).not.toBeInTheDocument()
  })

  it('renders a trailing icon when the `isExternal` prop is `true`', async () => {
    const {getByRole} = render(
      <SubdomainNavBar title="test">
        <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#" isExternal>
          Topics
        </SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    expect(getByRole('img', {name: 'External link'})).toBeInTheDocument()
  })

  it('calls onNarrowMenuToggle when the mobile menu is toggled', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: false}))

    const mockonNarrowMenuToggle = jest.fn()
    const {getByTestId} = render(
      <SubdomainNavBar title="test" onNarrowMenuToggle={mockonNarrowMenuToggle}>
        <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#" isExternal>
          Topics
        </SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    const menuButtonEl = getByTestId(SubdomainNavBar.testIds.menuButton)
    fireEvent.click(menuButtonEl)

    expect(mockonNarrowMenuToggle).toHaveBeenCalledWith(true)

    fireEvent.click(menuButtonEl)

    expect(mockonNarrowMenuToggle).toHaveBeenCalledWith(false)
  })
})
