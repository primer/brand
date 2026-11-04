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
      <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
      <FeatureComparisonTable.Description>For individuals</FeatureComparisonTable.Description>
      <FeatureComparisonTable.Price>$0 per month</FeatureComparisonTable.Price>
      <FeatureComparisonTable.PrimaryAction as="a" href="#free">
        Start free
      </FeatureComparisonTable.PrimaryAction>
    </FeatureComparisonTable.Item>
    <FeatureComparisonTable.Item>
      <FeatureComparisonTable.ItemHeading>Pro</FeatureComparisonTable.ItemHeading>
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
  const setBreakpoint = (breakpoint: string) => {
    act(() => {
      jest.replaceProperty(
        window,
        'innerWidth',
        breakpoint === narrowBreakpoint ? 600 : breakpoint === regularBreakpoint ? 900 : 1400,
      )
      fireEvent(window, new Event('resize'))
    })
  }

  beforeEach(() => {
    jest.replaceProperty(window, 'innerWidth', 600)
    jest.replaceProperty(window, 'innerHeight', 768)
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
            <FeatureComparisonTable.ItemHeading>
              <span id="plan-title">Free</span>
            </FeatureComparisonTable.ItemHeading>
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

  it('uses semibold prices and size-based row heading weights', () => {
    setBreakpoint(wideBreakpoint)
    const {getByText} = render(<Component />)

    expect(getByText('$0 per month')).toHaveClass('Text--100', 'Text--weight-semibold')
    expect(getByText('Codespaces')).toHaveClass('Text--200')
    expect(getByText('Codespaces')).not.toHaveClass('Text--weight-medium')
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
          <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
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

  it('does not expose sticky-header or row-highlighting options', () => {
    const optionsAreAutomatic: Extract<
      keyof FeatureComparisonTableProps,
      'stickyHeaders' | 'hasStickyHeaders' | 'rowHighlighting'
    > extends never
      ? true
      : false = true

    expect(optionsAreAutomatic).toBe(true)
  })

  it.each([narrowBreakpoint, wideBreakpoint])(
    'renders rows with unconditional highlight styles at the %s breakpoint',
    breakpoint => {
      setBreakpoint(breakpoint)
      const {getByTestId, getAllByTestId} = render(<Component expanded />)

      expect(getByTestId(FeatureComparisonTable.testIds.root)).not.toHaveClass(
        'FeatureComparisonTable--rowHighlighting',
      )
      for (const row of getAllByTestId(FeatureComparisonTable.testIds.row)) {
        expect(row).toHaveClass('FeatureComparisonTable__row')
      }
    },
  )

  describe('automatic sticky headers', () => {
    const originalResizeObserver = global.ResizeObserver
    let tableHeight: number
    let headerHeight: number
    let observers: MockResizeObserver[]

    class MockResizeObserver implements ResizeObserver {
      observe = jest.fn()
      unobserve = jest.fn()
      disconnect = jest.fn()
      callback: ResizeObserverCallback

      constructor(callback: ResizeObserverCallback) {
        this.callback = callback
        observers.push(this)
      }

      resize() {
        this.callback([], this)
      }
    }

    beforeEach(() => {
      tableHeight = 1000
      headerHeight = 200
      observers = []
      global.ResizeObserver = MockResizeObserver
      jest
        .spyOn(HTMLTableElement.prototype, 'getBoundingClientRect')
        .mockImplementation(() => new DOMRect(0, 0, 1000, tableHeight))
      jest
        .spyOn(HTMLTableSectionElement.prototype, 'getBoundingClientRect')
        .mockImplementation(() => new DOMRect(0, 0, 1000, headerHeight))
    })

    afterEach(() => {
      global.ResizeObserver = originalResizeObserver
    })

    it('activates only for overflowing wide tables and resets on responsive round trips', () => {
      const {getByTestId, queryByRole} = render(<Component />)
      const root = getByTestId(FeatureComparisonTable.testIds.root)

      expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders')
      expect(observers).toHaveLength(0)
      setBreakpoint(regularBreakpoint)
      expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders')
      setBreakpoint(wideBreakpoint)
      expect(root).toHaveClass('FeatureComparisonTable--stickyHeaders')
      expect(observers[0].observe).toHaveBeenCalledWith(queryByRole('table'))
      expect(observers[0].observe).toHaveBeenCalledWith(queryByRole('table')?.querySelector('thead'))

      setBreakpoint(narrowBreakpoint)
      expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders')
      expect(queryByRole('table')).not.toBeInTheDocument()
      expect(observers[0].disconnect).toHaveBeenCalledTimes(1)

      tableHeight = 600
      setBreakpoint(wideBreakpoint)
      expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders')
      expect(observers).toHaveLength(2)
    })

    it('activates and deactivates as the viewport height changes without a width change', () => {
      setBreakpoint(wideBreakpoint)
      const {getByTestId} = render(<Component />)
      const root = getByTestId(FeatureComparisonTable.testIds.root)

      expect(root).toHaveClass('FeatureComparisonTable--stickyHeaders')
      act(() => {
        jest.replaceProperty(window, 'innerHeight', 1000)
        fireEvent(window, new Event('resize'))
      })
      expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders')
      act(() => {
        jest.replaceProperty(window, 'innerHeight', 800)
        fireEvent(window, new Event('resize'))
      })
      expect(root).toHaveClass('FeatureComparisonTable--stickyHeaders')
    })

    it('remeasures table content and leaves space below the header', () => {
      setBreakpoint(wideBreakpoint)
      tableHeight = 768
      const {getByTestId} = render(<Component />)
      const root = getByTestId(FeatureComparisonTable.testIds.root)

      expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders')
      act(() => {
        tableHeight = 1000
        observers[0].resize()
      })
      expect(root).toHaveClass('FeatureComparisonTable--stickyHeaders')
      act(() => {
        headerHeight = 768
        observers[0].resize()
      })
      expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders')
      act(() => {
        headerHeight = 200
        observers[0].resize()
      })
      expect(root).toHaveClass('FeatureComparisonTable--stickyHeaders')
      act(() => {
        tableHeight = 500
        observers[0].resize()
      })
      expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders')
    })

    it('remeasures disclosure content changes even without ResizeObserver', async () => {
      Reflect.deleteProperty(global, 'ResizeObserver')
      setBreakpoint(wideBreakpoint)
      const {getByTestId, getByRole} = render(<Component />)
      const root = getByTestId(FeatureComparisonTable.testIds.root)
      const control = getByRole('button', {name: 'Core features'})

      expect(root).toHaveClass('FeatureComparisonTable--stickyHeaders')
      tableHeight = 500
      fireEvent.click(control)
      await waitFor(() => expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders'))

      tableHeight = 1000
      fireEvent.click(control)
      await waitFor(() => expect(root).toHaveClass('FeatureComparisonTable--stickyHeaders'))
      expect(observers).toHaveLength(0)
    })

    it('remeasures changed consumer content without remounting the table', async () => {
      setBreakpoint(wideBreakpoint)
      tableHeight = 500
      const comparison = (title: string) => (
        <FeatureComparisonTable>
          <FeatureComparisonTable.Heading>{title}</FeatureComparisonTable.Heading>
          <FeatureComparisonTable.Item />
        </FeatureComparisonTable>
      )
      const {getByTestId, getByRole, rerender} = render(comparison('Compare features'))
      const root = getByTestId(FeatureComparisonTable.testIds.root)
      const table = getByRole('table')

      expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders')
      tableHeight = 1000
      rerender(comparison('Compare all available features'))
      await waitFor(() => expect(root).toHaveClass('FeatureComparisonTable--stickyHeaders'))
      expect(getByRole('table')).toBe(table)

      tableHeight = 500
      rerender(comparison('Compare features'))
      await waitFor(() => expect(root).not.toHaveClass('FeatureComparisonTable--stickyHeaders'))
    })

    it('starts observing when items are added to an initially empty table', () => {
      setBreakpoint(wideBreakpoint)
      const {queryByRole, getByTestId, rerender} = render(
        <FeatureComparisonTable>
          <FeatureComparisonTable.Heading>Compare features</FeatureComparisonTable.Heading>
        </FeatureComparisonTable>,
      )
      expect(queryByRole('table')).not.toBeInTheDocument()
      expect(observers).toHaveLength(0)

      rerender(<Component />)
      expect(getByTestId(FeatureComparisonTable.testIds.root)).toHaveClass('FeatureComparisonTable--stickyHeaders')
      expect(observers).toHaveLength(1)
    })

    it('disconnects observers and removes viewport listeners on unmount', () => {
      setBreakpoint(wideBreakpoint)
      const removeEventListener = jest.spyOn(window, 'removeEventListener')
      const disconnect = jest.spyOn(MutationObserver.prototype, 'disconnect')
      const {unmount} = render(<Component />)
      unmount()

      expect(observers[0].disconnect).toHaveBeenCalledTimes(1)
      expect(disconnect).toHaveBeenCalledTimes(1)
      expect(removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    })
  })

  it('allows heading levels to be customized', () => {
    setBreakpoint(wideBreakpoint)
    const {getByRole} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading as="h3">Compare plans</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading as="h4">Free</FeatureComparisonTable.ItemHeading>
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

  it.each([narrowBreakpoint, regularBreakpoint, wideBreakpoint])(
    'uses size-based heading defaults on %s layouts',
    breakpoint => {
      setBreakpoint(breakpoint)
      const {getByRole, getAllByTestId} = render(<Component />)
      const heading = getByRole('heading', {name: 'Compare features', level: 2})
      const groupHeading = getByRole('heading', {name: 'Core features', level: 3})

      expect(heading).toHaveClass('Heading--6')
      expect(groupHeading).toHaveClass('Heading--subhead-large')
      for (const sizeBasedHeading of [heading, groupHeading]) {
        expect(sizeBasedHeading).not.toHaveClass('Heading--weight-semibold')
      }
      if (breakpoint === wideBreakpoint) {
        const itemHeading = getByRole('heading', {name: 'Free', level: 3})
        expect(itemHeading).toHaveClass('Heading--subhead-medium', 'FeatureComparisonTable__itemHeading')
        expect(itemHeading).not.toHaveClass('Heading--weight-semibold')
        expect(itemHeading).not.toHaveAttribute('id')
      }
      expect(getAllByTestId(FeatureComparisonTable.testIds.heading)).toEqual([heading])
    },
  )

  it('keeps fallback plan numbers scoped to their items', () => {
    setBreakpoint(wideBreakpoint)
    const {getByRole, getAllByTestId} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item />
        <FeatureComparisonTable.Item />
      </FeatureComparisonTable>,
    )

    expect(getAllByTestId(FeatureComparisonTable.testIds.item).map(item => item.textContent)).toEqual(['1', '2'])
    expect(getByRole('table', {name: 'Compare plans'})).toBeInTheDocument()
  })

  it('preserves heading size and weight overrides, classes, and native attributes', () => {
    setBreakpoint(wideBreakpoint)
    const {getByRole} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading size="4" weight="medium" className="custom-title" title="Table title">
          Compare plans
        </FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading size="5" weight="normal" className="custom-plan" title="Plan title">
            Free
          </FeatureComparisonTable.ItemHeading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading size="6" weight="bold" className="custom-group" title="Group title">
            Features
          </FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )
    const heading = getByRole('heading', {name: 'Compare plans'})
    const itemHeading = getByRole('heading', {name: 'Free'})
    const groupHeading = getByRole('heading', {name: 'Features'})

    expect(heading).toHaveClass('Heading--4', 'Heading--weight-medium', 'custom-title')
    expect(heading).toHaveAttribute('title', 'Table title')
    expect(itemHeading).toHaveClass('Heading--5', 'Heading--weight-normal', 'custom-plan')
    expect(itemHeading).toHaveAttribute('title', 'Plan title')
    expect(groupHeading).toHaveClass('Heading--6', 'Heading--weight-bold', 'custom-group')
    expect(groupHeading).toHaveAttribute('title', 'Group title')
  })

  it('keeps table heading IDs unique and stable across responsive layouts', () => {
    const {getAllByRole} = render(
      <>
        <Component />
        <Component />
      </>,
    )
    const headingIds = getAllByRole('heading', {name: 'Compare features'}).map(heading => heading.id)
    expect(headingIds.every(Boolean)).toBe(true)
    expect(new Set(headingIds).size).toBe(2)

    for (const breakpoint of [regularBreakpoint, wideBreakpoint, narrowBreakpoint, wideBreakpoint]) {
      setBreakpoint(breakpoint)
      expect(getAllByRole('heading', {name: 'Compare features'}).map(heading => heading.id)).toEqual(headingIds)
      if (breakpoint === wideBreakpoint) {
        expect(
          getAllByRole('table', {name: 'Compare features'}).map(table => table.getAttribute('aria-labelledby')),
        ).toEqual(headingIds)
        for (const itemHeading of getAllByRole('heading', {name: /^(Free|Pro)$/})) {
          expect(itemHeading).not.toHaveAttribute('id')
        }
      }
    }
  })

  it('preserves custom heading IDs and labels the wide table after layout changes', () => {
    const {getByRole, rerender, container} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading id="custom-comparison">Compare plans</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
        </FeatureComparisonTable.Item>
      </FeatureComparisonTable>,
    )

    for (const breakpoint of [narrowBreakpoint, wideBreakpoint, regularBreakpoint, wideBreakpoint]) {
      setBreakpoint(breakpoint)
      expect(getByRole('heading', {name: 'Compare plans'})).toHaveAttribute('id', 'custom-comparison')
      expect(container.querySelectorAll('#custom-comparison')).toHaveLength(1)
      if (breakpoint === wideBreakpoint) {
        expect(getByRole('table', {name: 'Compare plans'})).toHaveAttribute('aria-labelledby', 'custom-comparison')
      }
    }

    rerender(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading id="updated-comparison">Compare plans</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
        </FeatureComparisonTable.Item>
      </FeatureComparisonTable>,
    )
    expect(getByRole('heading', {name: 'Compare plans'})).toHaveAttribute('id', 'updated-comparison')
    expect(getByRole('table', {name: 'Compare plans'})).toHaveAttribute('aria-labelledby', 'updated-comparison')
    expect(container.querySelector('#custom-comparison')).toBeNull()
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

  it.each([
    [767, narrowBreakpoint, true],
    [768, regularBreakpoint, false],
    [1279, regularBreakpoint, false],
    [1280, wideBreakpoint, true],
  ])('uses the standardized %spx breakpoint (%s)', (width, breakpoint, expectedOpen) => {
    jest.replaceProperty(window, 'innerWidth', width)
    const {getByRole} = render(<Component expanded={{narrow: true, regular: false, wide: true}} />)

    const control =
      breakpoint === wideBreakpoint
        ? getByRole('button', {name: 'Core features'})
        : within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement
    expect(control).toHaveAttribute('aria-expanded', String(expectedOpen))
  })

  it('removes the window size listener when unmounted', () => {
    const addListener = jest.spyOn(window, 'addEventListener')
    const removeListener = jest.spyOn(window, 'removeEventListener')
    const {unmount} = render(<Component />)
    const resizeListener = addListener.mock.calls.find(([event]) => event === 'resize')?.[1]

    expect(resizeListener).toEqual(expect.any(Function))
    unmount()

    expect(removeListener).toHaveBeenCalledWith('resize', resizeListener)
  })

  it('opens and closes table rows when the group button is clicked', async () => {
    setBreakpoint(wideBreakpoint)
    const user = userEvent.setup()
    const {getByRole} = render(<Component />)
    const button = getByRole('button', {name: 'Core features'})
    const rows = getByRole('rowgroup', {name: 'Core features'})
    const divider = button.closest('th')

    expect(divider).not.toHaveClass('FeatureComparisonTable__groupDivider--noVisibleRows')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(rows).not.toBeVisible()
    expect(divider).toHaveClass('FeatureComparisonTable__groupDivider--noVisibleRows')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(rows).toBeVisible()
    expect(divider).not.toHaveClass('FeatureComparisonTable__groupDivider--noVisibleRows')
  })

  it.each([false, true])('omits the empty group divider border when expanded is %s', async expanded => {
    setBreakpoint(wideBreakpoint)
    const user = userEvent.setup()
    const {getByRole} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare features</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded={expanded}>
          <FeatureComparisonTable.GroupHeading>Empty group</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )
    const button = getByRole('button', {name: 'Empty group'})
    const divider = button.closest('th')

    expect(button).toHaveAttribute('aria-expanded', String(expanded))
    expect(divider).toHaveClass('FeatureComparisonTable__groupDivider--noVisibleRows')

    await user.click(button)

    expect(button).toHaveAttribute('aria-expanded', String(!expanded))
    expect(divider).toHaveClass('FeatureComparisonTable__groupDivider--noVisibleRows')
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

  it('preserves the focused keyed group through wide rerenders, reordering, and layout changes', () => {
    setBreakpoint(wideBreakpoint)
    const comparison = (names: string[]) => (
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare features</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item />
        {names.map(name => (
          <FeatureComparisonTable.Group key={name}>
            <FeatureComparisonTable.GroupHeading>{name}</FeatureComparisonTable.GroupHeading>
          </FeatureComparisonTable.Group>
        ))}
      </FeatureComparisonTable>
    )
    const {getByRole, rerender} = render(comparison(['Core', 'Security']))
    getByRole('button', {name: 'Core'}).focus()

    rerender(comparison(['Core', 'Security']))
    expect(getByRole('button', {name: 'Core'})).toHaveFocus()
    rerender(comparison(['Security', 'Core']))
    expect(getByRole('button', {name: 'Core'})).toHaveFocus()

    setBreakpoint(narrowBreakpoint)
    expect(getByRole('heading', {name: 'Core'}).parentElement).toHaveFocus()
    expect(getByRole('heading', {name: 'Security'}).parentElement).not.toHaveFocus()
    setBreakpoint(wideBreakpoint)
    expect(getByRole('button', {name: 'Core'})).toHaveFocus()
  })

  it.each([false, true])('preserves group focus when blur follows the resize event: %s', resizeFirst => {
    const onBlur = jest.fn()
    const {getByRole} = render(<Component onBlur={onBlur} />)
    const summary = within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement!

    act(() => {
      jest.replaceProperty(window, 'innerWidth', 1400)
      if (resizeFirst) fireEvent(window, new Event('resize'))
      fireEvent.focusOut(summary)
      if (!resizeFirst) fireEvent(window, new Event('resize'))
    })

    expect(getByRole('button', {name: 'Core features'})).toHaveFocus()
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('preserves blurred table group focus when resizing to the narrow layout', () => {
    setBreakpoint(wideBreakpoint)
    const {getByRole} = render(<Component />)
    const button = getByRole('button', {name: 'Core features'})

    act(() => {
      jest.replaceProperty(window, 'innerWidth', 600)
      fireEvent.focusOut(button)
      fireEvent(window, new Event('resize'))
    })

    expect(within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement).toHaveFocus()
  })

  it('does not restore previously blurred group focus on a later layout change', () => {
    const {getByRole} = render(<Component />)
    const summary = within(getByRole('group')).getByRole('heading', {name: 'Core features'}).parentElement!

    act(() => {
      jest.replaceProperty(window, 'innerWidth', 700)
      fireEvent.focusOut(summary)
      fireEvent(window, new Event('resize'))
    })
    setBreakpoint(wideBreakpoint)

    expect(getByRole('button', {name: 'Core features'})).not.toHaveFocus()
  })

  it('scrolls focused controls below sticky headers', () => {
    setBreakpoint(wideBreakpoint)
    jest.spyOn(HTMLTableElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1000, 2000))
    const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation()
    const onFocus = jest.fn()
    const {getByRole} = render(<Component onFocus={onFocus} />)
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

  it('preserves focus handlers without correcting focus when the table fits the viewport', () => {
    setBreakpoint(wideBreakpoint)
    jest.spyOn(HTMLTableElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1000, 500))
    const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation()
    const onFocus = jest.fn()
    const {getByRole} = render(<Component onFocus={onFocus} />)
    const header = getByRole('columnheader', {name: 'Compare features'})
    const button = getByRole('button', {name: 'Core features'})
    jest.spyOn(header, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 80))
    jest.spyOn(button, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 40, 100, 24))

    fireEvent.focus(button)

    expect(scrollBy).not.toHaveBeenCalled()
    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it.each([
    [80, -4],
    [84, undefined],
  ])('clears focus outlines beneath sticky headers when the control starts at %s', (top, expectedScroll) => {
    setBreakpoint(wideBreakpoint)
    jest.spyOn(HTMLTableElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1000, 2000))
    const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation()
    const {getByRole} = render(<Component />)
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
          <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
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
    expect(getByRole('cell', {name: expectedLabel})).toHaveClass('FeatureComparisonTable__tableCell')
    expect(label).toHaveClass('visually-hidden')
    expect(label.previousElementSibling).toHaveAttribute('aria-hidden', 'true')
    expect(label.previousElementSibling).toHaveClass('FeatureComparisonTable__cellIcon')
    if (variant !== 'unavailable') {
      expect(label.previousElementSibling).toHaveClass(`FeatureComparisonTable__cellIcon--${variant}`)
    }
  })

  it('ignores unsupported children and uses the last heading', () => {
    const {queryByText} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Earlier table heading</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
        <div>Unsupported root child</div>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading>Earlier plan heading</FeatureComparisonTable.ItemHeading>
          <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
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
            <FeatureComparisonTable.ItemHeading>{name}</FeatureComparisonTable.ItemHeading>
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
            <FeatureComparisonTable.ItemHeading>{name}</FeatureComparisonTable.ItemHeading>
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
            <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
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
          <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
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
