import React from 'react'
import {act, fireEvent, render, waitFor, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {axe, toHaveNoViolations} from 'jest-axe'
import '../test-utils/mocks/match-media-mock'
import {
  FeatureComparisonTable,
  type FeatureComparisonTableGroupProps,
  type FeatureComparisonTableProps,
} from './FeatureComparisonTable'

expect.extend(toHaveNoViolations)

const narrowBreakpoint = 'narrow'
const regularBreakpoint = 'regular'
const wideBreakpoint = 'wide'

const Component = ({
  expanded,
  ...props
}: Omit<FeatureComparisonTableProps, 'children'> & Pick<FeatureComparisonTableGroupProps, 'expanded'>) => (
  <FeatureComparisonTable {...props}>
    <FeatureComparisonTable.Heading>Compare features</FeatureComparisonTable.Heading>
    <FeatureComparisonTable.Item>
      <FeatureComparisonTable.Label>Recommended</FeatureComparisonTable.Label>
      <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
      <FeatureComparisonTable.Description>For individuals</FeatureComparisonTable.Description>
      <FeatureComparisonTable.Price>$0 per month</FeatureComparisonTable.Price>
      <FeatureComparisonTable.PrimaryAction as="a" href="#free">
        Start free
      </FeatureComparisonTable.PrimaryAction>
    </FeatureComparisonTable.Item>
    <FeatureComparisonTable.Item>
      <FeatureComparisonTable.Heading>Pro</FeatureComparisonTable.Heading>
      <FeatureComparisonTable.Price>$10</FeatureComparisonTable.Price>
      <FeatureComparisonTable.SecondaryAction as="button">Contact sales</FeatureComparisonTable.SecondaryAction>
    </FeatureComparisonTable.Item>
    <FeatureComparisonTable.Group expanded={expanded}>
      <FeatureComparisonTable.GroupHeading>Core features</FeatureComparisonTable.GroupHeading>
      <FeatureComparisonTable.Row>
        <FeatureComparisonTable.RowHeading>Codespaces</FeatureComparisonTable.RowHeading>
        <FeatureComparisonTable.Cell variant="included" />
        <FeatureComparisonTable.Cell>Unlimited</FeatureComparisonTable.Cell>
      </FeatureComparisonTable.Row>
    </FeatureComparisonTable.Group>
  </FeatureComparisonTable>
)

describe('FeatureComparisonTable', () => {
  let regularQuery: MediaQueryList
  let wideQuery: MediaQueryList

  const setBreakpoint = (breakpoint: string) => {
    act(() => {
      Object.defineProperty(regularQuery, 'matches', {configurable: true, value: breakpoint !== 'narrow'})
      Object.defineProperty(wideQuery, 'matches', {configurable: true, value: breakpoint === 'wide'})
      regularQuery.dispatchEvent(new Event('change'))
      wideQuery.dispatchEvent(new Event('change'))
    })
  }

  beforeEach(() => {
    const createQuery = (media: string) =>
      Object.assign(new EventTarget(), {
        media,
        matches: false,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })
    regularQuery = createQuery('(min-width: 48rem)')
    wideQuery = createQuery('(min-width: 80rem)')
    jest.spyOn(window, 'matchMedia').mockImplementation(query => {
      if (query === regularQuery.media) return regularQuery
      if (query === wideQuery.media) return wideQuery
      throw new Error(`Unexpected media query: ${query}`)
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('mounts custom descendants only once throughout responsive layout changes', () => {
    const {container, getByRole, getByTestId, queryByTestId} = render(
      <>
        <label htmlFor="custom-value">Custom value</label>
        <FeatureComparisonTable>
          <FeatureComparisonTable.Heading>
            <span id="comparison-title">Compare features</span>
          </FeatureComparisonTable.Heading>
          <FeatureComparisonTable.Item>
            <FeatureComparisonTable.Heading>
              <span id="plan-title">Free</span>
            </FeatureComparisonTable.Heading>
          </FeatureComparisonTable.Item>
          <FeatureComparisonTable.Group expanded>
            <FeatureComparisonTable.GroupHeading id="core-features">
              <span id="group-title">Core features</span>
            </FeatureComparisonTable.GroupHeading>
            <FeatureComparisonTable.Row>
              <FeatureComparisonTable.RowHeading>
                <span id="feature-title">Storage</span>
              </FeatureComparisonTable.RowHeading>
              <FeatureComparisonTable.RowDescription>
                <span id="value-description">Storage limit</span>
              </FeatureComparisonTable.RowDescription>
              <FeatureComparisonTable.Cell>
                <input id="custom-value" aria-describedby="value-description" defaultValue="10 GB" />
              </FeatureComparisonTable.Cell>
            </FeatureComparisonTable.Row>
          </FeatureComparisonTable.Group>
        </FeatureComparisonTable>
      </>,
    )

    for (const nextBreakpoint of [narrowBreakpoint, wideBreakpoint, regularBreakpoint, narrowBreakpoint]) {
      setBreakpoint(nextBreakpoint)
      const isWide = nextBreakpoint === wideBreakpoint
      const activeProjection = getByTestId(
        isWide ? FeatureComparisonTable.testIds.table : FeatureComparisonTable.testIds.narrow,
      )
      expect(
        queryByTestId(isWide ? FeatureComparisonTable.testIds.narrow : FeatureComparisonTable.testIds.table),
      ).not.toBeInTheDocument()
      for (const id of [
        'comparison-title',
        'plan-title',
        'group-title',
        'core-features',
        'feature-title',
        'value-description',
        'custom-value',
      ]) {
        expect(container.querySelectorAll(`[id="${id}"]`)).toHaveLength(1)
        expect(activeProjection).toContainElement(document.getElementById(id))
      }
      const input = getByRole('textbox', {name: 'Custom value'})
      expect(input).toHaveAccessibleDescription('Storage limit')
      expect(document.querySelector('label')?.control).toBe(input)
    }
  })

  it('renders plan summaries and actions', () => {
    setBreakpoint(wideBreakpoint)
    const {getByRole, getByText} = render(<Component />)
    const table = within(getByRole('table', {name: 'Compare features'}))

    expect(table.getByRole('heading', {name: 'Free'})).toBeInTheDocument()
    expect(table.getByRole('heading', {name: 'Pro'})).toBeInTheDocument()
    expect(getByText('Recommended')).toBeInTheDocument()
    expect(getByText('For individuals')).toBeInTheDocument()
    expect(getByText('$0 per month')).toBeInTheDocument()
    expect(getByText('$10')).toBeInTheDocument()
    expect(getByRole('link', {name: 'Start free'})).toHaveAttribute('href', '#free')
    expect(getByRole('button', {name: 'Contact sales'})).toBeInTheDocument()
  })

  it('renders feature rows in the active responsive layout', () => {
    const {getByTestId, getByRole} = render(<Component expanded />)
    const narrow = within(getByTestId(FeatureComparisonTable.testIds.narrow))

    expect(narrow.getByText('Codespaces')).toBeInTheDocument()
    expect(narrow.getByText('Unlimited')).toBeInTheDocument()

    setBreakpoint(wideBreakpoint)
    const table = within(getByRole('table', {name: 'Compare features'}))
    expect(table.getByRole('rowheader', {name: 'Codespaces'})).toHaveAttribute('scope', 'row')
    expect(table.getByRole('cell', {name: 'Unlimited'})).toBeInTheDocument()
  })

  it('forwards custom classes, attributes, and refs to the root', () => {
    const ref = React.createRef<HTMLDivElement>()
    const {getByTestId} = render(<Component data-testid="custom-table" className="custom-class" ref={ref} />)

    expect(getByTestId('custom-table')).toHaveClass('FeatureComparisonTable', 'custom-class')
    expect(ref.current).toBe(getByTestId('custom-table'))
  })

  it.each([narrowBreakpoint, wideBreakpoint])('renders rich row descriptions at the %s breakpoint', breakpoint => {
    setBreakpoint(breakpoint)
    const {getByTestId} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare features</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded>
          <FeatureComparisonTable.GroupHeading>Core features</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading className="custom-heading">Codespaces</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>Replaced description</FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.RowDescription className="custom-description">
              Develop in <strong>the cloud</strong>. <a href="#codespaces">Learn more</a>
            </FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="included" />
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )

    const projection = within(
      getByTestId(
        breakpoint === wideBreakpoint ? FeatureComparisonTable.testIds.table : FeatureComparisonTable.testIds.narrow,
      ),
    )
    const heading = projection.getByText('Codespaces')
    const description = projection.getByText(/Develop in/)

    expect(heading).toHaveClass('custom-heading')
    expect(description).toHaveClass('custom-description')
    expect(projection.queryByText('Replaced description')).not.toBeInTheDocument()
    expect(description).toHaveTextContent('Develop in the cloud. Learn more')
    expect(within(description).getByRole('link', {name: 'Learn more'})).toHaveAttribute('href', '#codespaces')
  })

  it('uses description-list terms rather than headings for repeated plan names', () => {
    const {getByTestId} = render(<Component expanded />)
    const narrow = within(getByTestId(FeatureComparisonTable.testIds.narrow))

    expect(narrow.getAllByRole('term').map(term => term.textContent)).toEqual(['Free', 'Pro'])
    expect(narrow.queryByRole('heading', {name: 'Free'})).not.toBeInTheDocument()
    expect(narrow.queryByRole('heading', {name: 'Pro'})).not.toBeInTheDocument()
    expect(narrow.getByRole('heading', {name: 'Core features'})).toBeInTheDocument()
    setBreakpoint(wideBreakpoint)
    const table = within(getByTestId(FeatureComparisonTable.testIds.table))
    expect(table.getByRole('heading', {name: 'Free', level: 3})).toBeInTheDocument()
    expect(table.getByRole('heading', {name: 'Pro', level: 3})).toBeInTheDocument()
  })

  it('applies the sticky header class only when enabled', () => {
    const {getByTestId, rerender} = render(<Component />)

    expect(getByTestId(FeatureComparisonTable.testIds.root)).not.toHaveClass('FeatureComparisonTable--stickyHeaders')

    rerender(<Component hasStickyHeaders />)

    expect(getByTestId(FeatureComparisonTable.testIds.root)).toHaveClass('FeatureComparisonTable--stickyHeaders')
  })

  it('highlights rows by default and supports an explicit opt-out', () => {
    const {getByTestId, rerender} = render(<Component />)
    const root = getByTestId(FeatureComparisonTable.testIds.root)

    expect(root).toHaveClass('FeatureComparisonTable--rowHighlighting')
    rerender(<Component rowHighlighting={false} />)
    expect(root).not.toHaveClass('FeatureComparisonTable--rowHighlighting')
    rerender(<Component rowHighlighting />)
    expect(root).toHaveClass('FeatureComparisonTable--rowHighlighting')
  })

  it('allows heading levels to be customized', () => {
    setBreakpoint(wideBreakpoint)
    const {getByRole} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading as="h3">Compare plans</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading as="h4">Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading as="h4">Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )
    const table = within(getByRole('table'))

    expect(table.getByRole('heading', {name: 'Compare plans', level: 3})).toBeInTheDocument()
    expect(table.getByRole('heading', {name: 'Free', level: 4})).toBeInTheDocument()
    expect(table.getByRole('heading', {name: 'Features', level: 4})).toBeInTheDocument()
  })

  it.each([
    ['narrow default', narrowBreakpoint, undefined, false],
    ['regular default', regularBreakpoint, undefined, true],
    ['wide default', wideBreakpoint, undefined, true],
    ['boolean true', narrowBreakpoint, true, true],
    ['boolean false', wideBreakpoint, false, false],
    ['narrow responsive', narrowBreakpoint, {narrow: true, regular: false, wide: false}, true],
    ['regular responsive', regularBreakpoint, {narrow: true, regular: false, wide: true}, false],
    ['wide responsive', wideBreakpoint, {narrow: true, regular: true, wide: false}, false],
  ])('resolves the %s expanded state', (_name, breakpoint, expanded, expectedOpen) => {
    setBreakpoint(breakpoint)
    const {getByRole} = render(<Component expanded={expanded} />)

    if (breakpoint === wideBreakpoint) {
      expect(getByRole('button', {name: 'Core features'})).toHaveAttribute('aria-expanded', String(expectedOpen))
    } else {
      expect(getByRole('group').hasAttribute('open')).toBe(expectedOpen)
      expect(within(getByRole('group')).getByRole('heading').parentElement).toHaveAttribute(
        'aria-expanded',
        String(expectedOpen),
      )
    }
  })

  it('opens and closes a narrow disclosure when clicked', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(<Component />)
    const group = getByRole('group')
    const heading = within(group).getByRole('heading', {name: 'Core features'})

    expect(group).not.toHaveAttribute('open')

    await user.click(heading)
    await waitFor(() => expect(heading.parentElement).toHaveAttribute('aria-expanded', 'true'))
    expect(group).toHaveAttribute('open')

    await user.click(heading)
    await waitFor(() => expect(heading.parentElement).toHaveAttribute('aria-expanded', 'false'))
    expect(group).not.toHaveAttribute('open')
  })

  it('synchronizes native disclosure toggles without hiding the content separately', async () => {
    const {getByRole} = render(<Component />)
    const group = getByRole('group')
    const summary = within(group).getByRole('heading', {name: 'Core features'}).parentElement
    const content = within(group).getByText('Codespaces')

    expect(content.closest('[hidden]')).toBeNull()

    act(() => {
      group.setAttribute('open', '')
      fireEvent(group, new Event('toggle'))
    })

    await waitFor(() => expect(summary).toHaveAttribute('aria-expanded', 'true'))

    act(() => {
      group.removeAttribute('open')
      fireEvent(group, new Event('toggle'))
    })

    await waitFor(() => expect(summary).toHaveAttribute('aria-expanded', 'false'))
  })

  it('uses font-relative media queries rather than the viewport pixel width', () => {
    jest.replaceProperty(window, 'innerWidth', 1400)
    setBreakpoint(regularBreakpoint)
    const {getByRole} = render(<Component expanded={{narrow: true, regular: false, wide: true}} />)

    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 48rem)')
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 80rem)')
    expect(getByRole('group')).not.toHaveAttribute('open')

    setBreakpoint(wideBreakpoint)
    expect(getByRole('button', {name: 'Core features'})).toHaveAttribute('aria-expanded', 'true')
  })

  it('removes media query listeners when unmounted', () => {
    const removeRegularListener = jest.spyOn(regularQuery, 'removeEventListener')
    const removeWideListener = jest.spyOn(wideQuery, 'removeEventListener')
    const {unmount} = render(<Component />)

    unmount()

    expect(removeRegularListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(removeWideListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('opens and closes table rows when the group button is clicked', async () => {
    setBreakpoint(wideBreakpoint)
    const user = userEvent.setup()
    const {getByRole} = render(<Component />)
    const button = getByRole('button', {name: 'Core features'})
    const rows = getByRole('rowgroup', {name: 'Core features'})

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(rows).not.toBeVisible()

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(rows).toBeVisible()
  })

  it.each(['{Enter}', ' '])('toggles table rows with the %s key', async key => {
    setBreakpoint(wideBreakpoint)
    const user = userEvent.setup()
    const {getByRole} = render(<Component />)
    const button = getByRole('button', {name: 'Core features'})
    const rows = getByRole('rowgroup', {name: 'Core features'})
    button.focus()

    await user.keyboard(key)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(rows).not.toBeVisible()
    expect(button).toHaveFocus()

    await user.keyboard(key)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(rows).toBeVisible()
    expect(button).toHaveFocus()
  })

  it('resets expanded state when the breakpoint changes', async () => {
    setBreakpoint(regularBreakpoint)
    const user = userEvent.setup()
    const {getByRole} = render(<Component />)
    const summary = within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement!

    await user.click(summary)
    await waitFor(() => expect(summary).toHaveAttribute('aria-expanded', 'false'))

    setBreakpoint(wideBreakpoint)
    expect(getByRole('button', {name: 'Core features'})).toHaveAttribute('aria-expanded', 'true')
  })

  it('updates expanded state when the prop changes', () => {
    const {getByRole, rerender} = render(<Component expanded={false} />)

    expect(getByRole('group')).not.toHaveAttribute('open')

    rerender(<Component expanded />)

    expect(getByRole('group')).toHaveAttribute('open')
  })

  it('moves focus to the corresponding group control when the layout changes', () => {
    const {getByRole} = render(<Component />)
    const summary = within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement
    summary?.focus()

    setBreakpoint(wideBreakpoint)
    expect(getByRole('button', {name: 'Core features'})).toHaveFocus()

    setBreakpoint(narrowBreakpoint)
    expect(within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement).toHaveFocus()
  })

  it.each([false, true])('preserves blurred group focus when both queries change: %s', bothQueriesChange => {
    const onBlur = jest.fn()
    const {getByRole} = render(<Component onBlur={onBlur} />)
    const summary = within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement!

    act(() => {
      Object.defineProperty(wideQuery, 'matches', {configurable: true, value: true})
      fireEvent.focusOut(summary)
      if (bothQueriesChange) {
        Object.defineProperty(regularQuery, 'matches', {configurable: true, value: true})
        regularQuery.dispatchEvent(new Event('change'))
      }
      wideQuery.dispatchEvent(new Event('change'))
    })

    expect(getByRole('button', {name: 'Core features'})).toHaveFocus()
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('scrolls focused controls below sticky headers', () => {
    setBreakpoint(wideBreakpoint)
    const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation()
    const onFocus = jest.fn()
    const {getByRole} = render(<Component hasStickyHeaders onFocus={onFocus} />)
    const header = getByRole('columnheader', {name: 'Compare features'})
    const button = getByRole('button', {name: 'Core features'})
    jest.spyOn(header, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 80))
    jest.spyOn(button, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 40, 100, 24))

    fireEvent.focus(getByRole('link', {name: 'Start free'}))
    expect(scrollBy).not.toHaveBeenCalled()

    fireEvent.focus(button)
    expect(scrollBy).toHaveBeenCalledWith({top: -40, behavior: 'instant'})
    expect(onFocus).toHaveBeenCalledTimes(2)
  })

  it.each([
    [80, -4],
    [84, undefined],
  ])('clears focus outlines beneath sticky headers when the control starts at %s', (top, expectedScroll) => {
    setBreakpoint(wideBreakpoint)
    const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation()
    const {getByRole} = render(<Component hasStickyHeaders />)
    const header = getByRole('columnheader', {name: 'Compare features'})
    const button = getByRole('button', {name: 'Core features'})
    jest.spyOn(header, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 80))
    jest.spyOn(button, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, top, 100, 24))
    button.style.outlineWidth = '2px'
    button.style.outlineOffset = '2px'

    fireEvent.focus(button)

    if (expectedScroll === undefined) {
      expect(scrollBy).not.toHaveBeenCalled()
    } else {
      expect(scrollBy).toHaveBeenCalledWith({top: expectedScroll, behavior: 'instant'})
    }
  })

  it.each([
    ['included', undefined, 'Included'],
    ['included', 'Available', 'Available'],
    ['unavailable', undefined, 'Unavailable'],
    ['unlimited', undefined, 'Unlimited'],
    ['refresh', undefined, 'Refresh'],
  ] as const)('renders accessible text for the %s cell variant (%s)', (variant, variantAriaLabel, expectedLabel) => {
    setBreakpoint(wideBreakpoint)
    const {getByRole} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>Storage</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.Cell variant={variant} variantAriaLabel={variantAriaLabel} />
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )

    const label = within(getByRole('cell', {name: expectedLabel})).getByText(expectedLabel)
    expect(label).toHaveClass('visually-hidden')
    expect(label.previousElementSibling).toHaveAttribute('aria-hidden', 'true')
  })

  it('ignores unsupported children and uses the last heading', () => {
    const {queryByText} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Earlier table heading</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
        <div>Unsupported root child</div>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Earlier plan heading</FeatureComparisonTable.Heading>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
          <span>Unsupported item child</span>
        </FeatureComparisonTable.Item>
      </FeatureComparisonTable>,
    )

    expect(queryByText('Unsupported root child')).not.toBeInTheDocument()
    expect(queryByText('Unsupported item child')).not.toBeInTheDocument()
    expect(queryByText('Earlier table heading')).not.toBeInTheDocument()
    expect(queryByText('Earlier plan heading')).not.toBeInTheDocument()
  })

  it('limits the comparison to four plans', () => {
    setBreakpoint(wideBreakpoint)
    const warn = jest.spyOn(console, 'warn').mockImplementation()
    const {getAllByTestId, queryByText} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
        {['Free', 'Team', 'Enterprise', 'Enterprise Plus', 'Extra plan'].map(name => (
          <FeatureComparisonTable.Item key={name}>
            <FeatureComparisonTable.Heading>{name}</FeatureComparisonTable.Heading>
          </FeatureComparisonTable.Item>
        ))}
      </FeatureComparisonTable>,
    )

    expect(getAllByTestId(FeatureComparisonTable.testIds.item)).toHaveLength(4)
    expect(queryByText('Extra plan')).not.toBeInTheDocument()
    expect(warn).toHaveBeenCalledWith(
      'FeatureComparisonTable: supports at most 4 Item children, but received 5. Extra items are ignored.',
    )
  })

  it('does not warn about extra plans in production', () => {
    jest.replaceProperty(process.env, 'NODE_ENV', 'production')
    const warn = jest.spyOn(console, 'warn').mockImplementation()
    render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
        {['Free', 'Team', 'Enterprise', 'Enterprise Plus', 'Extra plan'].map(name => (
          <FeatureComparisonTable.Item key={name}>
            <FeatureComparisonTable.Heading>{name}</FeatureComparisonTable.Heading>
          </FeatureComparisonTable.Item>
        ))}
      </FeatureComparisonTable>,
    )

    expect(warn).not.toHaveBeenCalled()
  })

  it.each([regularBreakpoint, wideBreakpoint])(
    'preserves independent group state through rerenders and keyed reordering at %s',
    async breakpoint => {
      setBreakpoint(breakpoint)
      const user = userEvent.setup()
      const renderGroups = (names: string[]) => (
        <FeatureComparisonTable>
          <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
          <FeatureComparisonTable.Item>
            <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
          </FeatureComparisonTable.Item>
          {names.map(name => (
            <FeatureComparisonTable.Group key={name}>
              <FeatureComparisonTable.GroupHeading>{name}</FeatureComparisonTable.GroupHeading>
            </FeatureComparisonTable.Group>
          ))}
        </FeatureComparisonTable>
      )
      const {getByRole, rerender} = render(renderGroups(['Core', 'Security']))
      const getControl = (name: string) =>
        breakpoint === wideBreakpoint ? getByRole('button', {name}) : getByRole('heading', {name}).parentElement!

      await user.click(getControl('Core'))
      await waitFor(() => expect(getControl('Core')).toHaveAttribute('aria-expanded', 'false'))
      expect(getControl('Security')).toHaveAttribute('aria-expanded', 'true')

      rerender(renderGroups(['Core', 'Security']))
      expect(getControl('Core')).toHaveAttribute('aria-expanded', 'false')

      rerender(renderGroups(['Security', 'Core']))
      expect(getControl('Core')).toHaveAttribute('aria-expanded', 'false')
      expect(getControl('Security')).toHaveAttribute('aria-expanded', 'true')
    },
  )

  it('does not render without any items', () => {
    const {container} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
      </FeatureComparisonTable>,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it.each([
    {cells: [], expectedText: ''},
    {cells: ['Included', 'Extra cell'], expectedText: 'Included'},
  ])('warns and normalizes mismatched row cells: $cells', ({cells, expectedText}) => {
    setBreakpoint(wideBreakpoint)
    const warn = jest.spyOn(console, 'warn').mockImplementation()
    const {getByRole} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            {cells.map(content => (
              <FeatureComparisonTable.Cell key={content}>{content}</FeatureComparisonTable.Cell>
            ))}
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )

    expect(warn).toHaveBeenCalledWith(
      `FeatureComparisonTable.Row: expected 1 Cell children to match the number of items, but received ${cells.length}. Missing cells render empty and extra cells are ignored.`,
    )
    expect(getByRole('cell').textContent).toBe(expectedText)
  })

  it('warns when the required root heading is missing', () => {
    setBreakpoint(wideBreakpoint)
    const warn = jest.spyOn(console, 'warn').mockImplementation()
    const {getByRole} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item />
      </FeatureComparisonTable>,
    )

    expect(warn).toHaveBeenCalledWith(
      'FeatureComparisonTable: a root FeatureComparisonTable.Heading child is required.',
    )
    expect(getByRole('table')).not.toHaveAttribute('aria-labelledby')
  })

  it.each([
    ['narrow', narrowBreakpoint],
    ['regular', regularBreakpoint],
    ['wide', wideBreakpoint],
  ])('has no accessibility violations at the %s breakpoint', async (_name, breakpoint) => {
    setBreakpoint(breakpoint)
    const {container} = render(<Component expanded />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
