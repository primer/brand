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

  it('renders plan summaries and actions', () => {
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

  it('renders feature rows in both responsive layouts', () => {
    const {getByTestId, getByRole} = render(<Component expanded />)
    const narrow = within(getByTestId(FeatureComparisonTable.testIds.narrow))
    const table = within(getByRole('table', {name: 'Compare features'}))

    expect(narrow.getByText('Codespaces')).toBeInTheDocument()
    expect(narrow.getByText('Unlimited')).toBeInTheDocument()
    expect(table.getByRole('rowheader', {name: 'Codespaces'})).toHaveAttribute('scope', 'row')
    expect(table.getByRole('cell', {name: 'Unlimited'})).toBeInTheDocument()
  })

  it('forwards custom classes, attributes, and refs to the root', () => {
    const ref = React.createRef<HTMLDivElement>()
    const {getByTestId} = render(<Component data-testid="custom-table" className="custom-class" ref={ref} />)

    expect(getByTestId('custom-table')).toHaveClass('FeatureComparisonTable', 'custom-class')
    expect(ref.current).toBe(getByTestId('custom-table'))
  })

  it('uses description-list terms rather than headings for repeated plan names', () => {
    const {getByTestId} = render(<Component expanded />)
    const narrow = within(getByTestId(FeatureComparisonTable.testIds.narrow))
    const table = within(getByTestId(FeatureComparisonTable.testIds.table))

    expect(narrow.getAllByRole('term').map(term => term.textContent)).toEqual(['Free', 'Pro'])
    expect(narrow.queryByRole('heading', {name: 'Free'})).not.toBeInTheDocument()
    expect(narrow.queryByRole('heading', {name: 'Pro'})).not.toBeInTheDocument()
    expect(narrow.getByRole('heading', {name: 'Core features'})).toBeInTheDocument()
    expect(table.getByRole('heading', {name: 'Free', level: 3})).toBeInTheDocument()
    expect(table.getByRole('heading', {name: 'Pro', level: 3})).toBeInTheDocument()
  })

  it.each([
    ['hasStickyHeaders', 'FeatureComparisonTable--stickyHeaders'],
    ['rowHighlighting', 'FeatureComparisonTable--rowHighlighting'],
  ] as const)('applies the correct class when %s is enabled', (prop, expectedClass) => {
    const {getByTestId, rerender} = render(<Component />)

    expect(getByTestId(FeatureComparisonTable.testIds.root)).not.toHaveClass(expectedClass)

    rerender(<Component {...{[prop]: true}} />)

    expect(getByTestId(FeatureComparisonTable.testIds.root)).toHaveClass(expectedClass)
  })

  it('allows heading levels to be customized', () => {
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

    expect(getByRole('group').hasAttribute('open')).toBe(expectedOpen)
    expect(getByRole('button', {name: 'Core features'})).toHaveAttribute('aria-expanded', String(expectedOpen))
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
    const button = getByRole('button', {name: 'Core features'})

    expect(content.closest('[hidden]')).toBeNull()

    act(() => {
      group.setAttribute('open', '')
      fireEvent(group, new Event('toggle'))
    })

    await waitFor(() => expect(summary).toHaveAttribute('aria-expanded', 'true'))
    expect(button).toHaveAttribute('aria-expanded', 'true')

    act(() => {
      group.removeAttribute('open')
      fireEvent(group, new Event('toggle'))
    })

    await waitFor(() => expect(summary).toHaveAttribute('aria-expanded', 'false'))
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('uses font-relative media queries rather than the viewport pixel width', () => {
    jest.replaceProperty(window, 'innerWidth', 1400)
    setBreakpoint(regularBreakpoint)
    const {getByRole} = render(<Component expanded={{narrow: true, regular: false, wide: true}} />)

    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 48rem)')
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 80rem)')
    expect(getByRole('group')).not.toHaveAttribute('open')

    setBreakpoint(wideBreakpoint)
    expect(getByRole('group')).toHaveAttribute('open')
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

  it('resets expanded state when the breakpoint changes', async () => {
    setBreakpoint(regularBreakpoint)
    const user = userEvent.setup()
    const {getByRole, rerender} = render(<Component />)
    const button = getByRole('button', {name: 'Core features'})

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')

    setBreakpoint(wideBreakpoint)
    rerender(<Component />)

    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('updates expanded state when the prop changes', () => {
    const {getByRole, rerender} = render(<Component expanded={false} />)

    expect(getByRole('group')).not.toHaveAttribute('open')

    rerender(<Component expanded />)

    expect(getByRole('group')).toHaveAttribute('open')
  })

  it('moves focus to the corresponding group control when the layout changes', () => {
    const {getByRole, rerender} = render(<Component />)
    const summary = within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement
    summary?.focus()

    setBreakpoint(wideBreakpoint)
    rerender(<Component />)

    expect(getByRole('button', {name: 'Core features'})).toHaveFocus()

    setBreakpoint(narrowBreakpoint)
    rerender(<Component />)

    expect(summary).toHaveFocus()
  })

  it('preserves group focus when CSS hides the control before the media query event', () => {
    const onBlur = jest.fn()
    const {getByRole} = render(<Component onBlur={onBlur} />)
    const summary = within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement!

    act(() => {
      Object.defineProperty(wideQuery, 'matches', {configurable: true, value: true})
      fireEvent.focusOut(summary)
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
    ['included', undefined, 'Included'],
    ['unavailable', undefined, 'Unavailable'],
    ['unavailable', 'Not offered', 'Not offered'],
  ] as const)('renders accessible text for the %s cell variant (%s)', (variant, variantAriaLabel, expectedLabel) => {
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

    expect(getByRole('cell', {name: expectedLabel})).toBeInTheDocument()
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
  })

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
