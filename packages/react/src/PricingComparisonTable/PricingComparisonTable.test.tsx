import React from 'react'
import {act, render, within} from '@testing-library/react'
import {flushSync} from 'react-dom'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {axe, toHaveNoViolations} from 'jest-axe'
import {useWindowSize} from '../hooks/useWindowSize'
import {PricingComparisonTable} from './PricingComparisonTable'

jest.mock('../hooks/useWindowSize')

expect.extend(toHaveNoViolations)

const narrowBreakpoint = {
  isSmall: true,
  isMedium: false,
  isXLarge: false,
}

const regularBreakpoint = {
  isSmall: true,
  isMedium: true,
  isXLarge: false,
}

const wideBreakpoint = {
  isSmall: true,
  isMedium: true,
  isXLarge: true,
}

const mockUseWindowSize = useWindowSize as jest.Mock

const renderTable = () =>
  render(
    <PricingComparisonTable aria-label="Plan comparison">
      <PricingComparisonTable.Heading>Compare features</PricingComparisonTable.Heading>
      <PricingComparisonTable.Item>
        <PricingComparisonTable.Label>Recommended</PricingComparisonTable.Label>
        <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        <PricingComparisonTable.Description>For individuals</PricingComparisonTable.Description>
        <PricingComparisonTable.Price>$0 per month</PricingComparisonTable.Price>
        <PricingComparisonTable.PrimaryAction as="a" href="#free">
          Start free
        </PricingComparisonTable.PrimaryAction>
      </PricingComparisonTable.Item>
      <PricingComparisonTable.Item>
        <PricingComparisonTable.Heading>Pro</PricingComparisonTable.Heading>
        <PricingComparisonTable.Price>$10</PricingComparisonTable.Price>
        <PricingComparisonTable.SecondaryAction as="button">Contact sales</PricingComparisonTable.SecondaryAction>
      </PricingComparisonTable.Item>
      <PricingComparisonTable.Group expanded>
        <PricingComparisonTable.GroupHeading>Core features</PricingComparisonTable.GroupHeading>
        <PricingComparisonTable.Row>
          <PricingComparisonTable.RowHeading infoTooltip="Feature details">
            Codespaces
          </PricingComparisonTable.RowHeading>
          <PricingComparisonTable.Cell variant="included" />
          <PricingComparisonTable.Cell>Unlimited</PricingComparisonTable.Cell>
        </PricingComparisonTable.Row>
      </PricingComparisonTable.Group>
    </PricingComparisonTable>,
  )

describe('PricingComparisonTable', () => {
  beforeEach(() => {
    mockUseWindowSize.mockReturnValue(narrowBreakpoint)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders plan summaries and feature values in both responsive layouts', () => {
    const {getByTestId, getByRole} = renderTable()
    const narrow = within(getByTestId(PricingComparisonTable.testIds.narrow))
    const table = getByRole('table', {name: 'Plan comparison'})

    expect(narrow.getByRole('heading', {name: 'Free'})).toBeInTheDocument()
    expect(narrow.getByRole('heading', {name: 'Pro'})).toBeInTheDocument()
    expect(narrow.getByText('Codespaces')).toBeInTheDocument()
    expect(narrow.getByText('Unlimited')).toBeInTheDocument()
    expect(within(table).getByRole('rowheader', {name: /^Codespaces/})).toHaveAttribute('scope', 'row')
    expect(within(table).getByRole('cell', {name: 'Unlimited'})).toBeInTheDocument()
    expect(within(table).getByRole('columnheader', {name: 'Compare features'})).toHaveAttribute('scope', 'col')
    expect(within(table).getByRole('rowheader', {name: 'Core features'})).toHaveAttribute('scope', 'rowgroup')

    for (const summary of [getByTestId(PricingComparisonTable.testIds.regularSummary), table]) {
      const {getByText, getByRole: getSummaryByRole} = within(summary)
      expect(getByText('For individuals')).toBeInTheDocument()
      expect(getByText('$0 per month')).toBeInTheDocument()
      expect(getByText('$10')).toBeInTheDocument()
      expect(getSummaryByRole('link', {name: 'Start free'})).toHaveAttribute('href', '#free')
      expect(getSummaryByRole('link', {name: 'Start free'})).toHaveClass(
        'Button--primary',
        'Button--size-small',
        'Button--block',
      )
      expect(getSummaryByRole('button', {name: 'Contact sales'})).toHaveClass(
        'Button--secondary',
        'Button--size-small',
        'Button--block',
      )
    }
  })

  it('uses a root heading as the accessible name when explicit labeling is omitted', () => {
    const {getByTestId, getByRole} = render(
      <PricingComparisonTable>
        <PricingComparisonTable.Heading>
          Compare <span>plans</span>
        </PricingComparisonTable.Heading>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
      </PricingComparisonTable>,
    )

    expect(getByTestId(PricingComparisonTable.testIds.root)).toHaveAccessibleName('Compare plans')
    expect(getByRole('table', {name: 'Compare plans'})).toBeInTheDocument()
  })

  it('truncates items, pads missing cells, ignores extra cells, and ignores unsupported children', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation()
    const {getByTestId, getAllByTestId, queryByText} = render(
      <PricingComparisonTable>
        <div>Unsupported root child</div>
        {['One', 'Two', 'Three', 'Four', 'Five'].map(name => (
          <PricingComparisonTable.Item key={name}>
            <span>Unsupported item child</span>
            <PricingComparisonTable.Heading>{name}</PricingComparisonTable.Heading>
          </PricingComparisonTable.Item>
        ))}
        <PricingComparisonTable.Group>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
          <PricingComparisonTable.Row>
            <PricingComparisonTable.RowHeading>Storage</PricingComparisonTable.RowHeading>
            <PricingComparisonTable.Cell>First</PricingComparisonTable.Cell>
            <PricingComparisonTable.Cell>Second</PricingComparisonTable.Cell>
            <PricingComparisonTable.Cell>Third</PricingComparisonTable.Cell>
            <PricingComparisonTable.Cell>Fourth</PricingComparisonTable.Cell>
            <PricingComparisonTable.Cell>Ignored extra</PricingComparisonTable.Cell>
          </PricingComparisonTable.Row>
          <PricingComparisonTable.Row>
            <PricingComparisonTable.RowHeading>Support</PricingComparisonTable.RowHeading>
            <PricingComparisonTable.Cell>Email</PricingComparisonTable.Cell>
          </PricingComparisonTable.Row>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    const table = getByTestId(PricingComparisonTable.testIds.table)
    expect(table.querySelectorAll('thead th')).toHaveLength(5)
    expect(table.querySelectorAll('tbody tr:last-child td')).toHaveLength(4)
    expect(getAllByTestId(PricingComparisonTable.testIds.item)).toHaveLength(8)
    expect(queryByText('Five')).not.toBeInTheDocument()
    expect(queryByText('Ignored extra')).not.toBeInTheDocument()
    expect(queryByText('Unsupported root child')).not.toBeInTheDocument()
    expect(queryByText('Unsupported item child')).not.toBeInTheDocument()
    expect(warn).toHaveBeenCalledWith(
      'PricingComparisonTable.Row: expected 4 Cell children to match the number of items, but received 5. Missing cells render empty and extra cells are ignored.',
    )
    expect(warn).toHaveBeenCalledWith(
      'PricingComparisonTable.Row: expected 4 Cell children to match the number of items, but received 1. Missing cells render empty and extra cells are ignored.',
    )
  })

  it('generates unique IDs and connects group controls to their content', () => {
    const {container} = render(
      <>
        <PricingComparisonTable>
          <PricingComparisonTable.Item>
            <PricingComparisonTable.Heading>One</PricingComparisonTable.Heading>
          </PricingComparisonTable.Item>
          <PricingComparisonTable.Group>
            <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
            <PricingComparisonTable.Row>
              <PricingComparisonTable.RowHeading>Storage</PricingComparisonTable.RowHeading>
              <PricingComparisonTable.Cell>Included</PricingComparisonTable.Cell>
            </PricingComparisonTable.Row>
          </PricingComparisonTable.Group>
        </PricingComparisonTable>
        <PricingComparisonTable>
          <PricingComparisonTable.Item>
            <PricingComparisonTable.Heading>Two</PricingComparisonTable.Heading>
          </PricingComparisonTable.Item>
          <PricingComparisonTable.Group>
            <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
          </PricingComparisonTable.Group>
        </PricingComparisonTable>
      </>,
    )

    const ids = Array.from(container.querySelectorAll('[id]')).map(element => element.id)
    expect(new Set(ids).size).toBe(ids.length)

    const controls = container.querySelectorAll('summary, button')
    expect(controls).toHaveLength(4)

    for (const control of controls) {
      const content = document.getElementById(control.getAttribute('aria-controls')!)
      expect(content).toBeInTheDocument()
      if (control.tagName === 'BUTTON') {
        expect(content).toHaveAttribute('aria-labelledby', control.id)
      }
    }
  })

  it('forwards group classes to both responsive projections', () => {
    const {container} = render(
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group className="custom-group">
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    expect(container.querySelector('details')).toHaveClass('custom-group')
    expect(container.querySelector('tbody[id]')).toHaveClass('custom-group')
  })

  it.each([
    ['narrow', narrowBreakpoint, {narrow: true, regular: false, wide: false}, true],
    ['regular', regularBreakpoint, {narrow: false, regular: true, wide: false}, true],
    ['wide', wideBreakpoint, {narrow: false, regular: false, wide: true}, true],
    ['narrow default', narrowBreakpoint, undefined, false],
    ['regular default', regularBreakpoint, undefined, true],
    ['wide default', wideBreakpoint, undefined, true],
    ['boolean true', regularBreakpoint, true, true],
    ['boolean false', regularBreakpoint, false, false],
  ])('resolves %s expanded state', (_name, currentBreakpoint, expanded, expectedOpen) => {
    mockUseWindowSize.mockReturnValue(currentBreakpoint)

    const {container} = render(
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group expanded={expanded}>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    if (expectedOpen) {
      expect(container.querySelector('details')).toHaveAttribute('open')
      expect(container.querySelector('tbody[id]')).not.toHaveAttribute('hidden')
    } else {
      expect(container.querySelector('details')).not.toHaveAttribute('open')
      expect(container.querySelector('tbody[id]')).toHaveAttribute('hidden')
    }
    expect(container.querySelector('summary')).toHaveAttribute('aria-expanded', String(expectedOpen))
    expect(container.querySelector('button[aria-controls]')).toHaveAttribute('aria-expanded', String(expectedOpen))
  })

  it('lets each group keep its latest interaction within a breakpoint', async () => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const user = userEvent.setup()
    const {container, getByRole} = render(
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group>
          <PricingComparisonTable.GroupHeading>Core features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
        <PricingComparisonTable.Group>
          <PricingComparisonTable.GroupHeading>Security features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    const coreButton = getByRole('button', {name: 'Core features'})
    const securityButton = getByRole('button', {name: 'Security features'})

    await user.click(coreButton)
    expect(coreButton).toHaveAttribute('aria-expanded', 'false')
    expect(securityButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(coreButton)
    expect(coreButton).toHaveAttribute('aria-expanded', 'true')
    expect(container.querySelectorAll('tbody[id][hidden]')).toHaveLength(0)
  })

  it('opens and closes a narrow disclosure when clicked', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
          <PricingComparisonTable.Row>
            <PricingComparisonTable.RowHeading>Storage</PricingComparisonTable.RowHeading>
            <PricingComparisonTable.Cell>Included</PricingComparisonTable.Cell>
          </PricingComparisonTable.Row>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    const summary = container.querySelector('summary')!
    const content = container.querySelector('details > div')!
    expect(summary).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('hidden')

    await user.click(summary)

    expect(summary).toHaveAttribute('aria-expanded', 'true')
    expect(content).not.toHaveAttribute('hidden')

    await user.click(summary)

    expect(summary).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('hidden')
  })

  it('resets interaction state when the breakpoint category changes', async () => {
    const user = userEvent.setup()
    const expanded = {narrow: true, regular: true, wide: false}
    const {getByRole, rerender} = render(
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group expanded={expanded}>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    const summary = getByRole('group').querySelector('summary')!
    await user.click(summary)
    expect(summary).toHaveAttribute('aria-expanded', 'false')

    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    rerender(
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group expanded={expanded}>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'true')
  })

  it('does not restore an interaction after a breakpoint round trip', async () => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const user = userEvent.setup()
    const renderComparison = () => (
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>
    )
    const {getByRole, rerender} = render(renderComparison())

    await user.click(getByRole('button', {name: 'Features'}))
    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'false')

    mockUseWindowSize.mockReturnValue(wideBreakpoint)
    rerender(renderComparison())
    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'true')

    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    rerender(renderComparison())
    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'true')
  })

  it('keeps interaction state with keyed groups when their order changes', async () => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const user = userEvent.setup()
    const renderComparison = (groupNames: string[]) => (
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        {groupNames.map(groupName => (
          <PricingComparisonTable.Group key={groupName}>
            <PricingComparisonTable.GroupHeading>{groupName}</PricingComparisonTable.GroupHeading>
          </PricingComparisonTable.Group>
        ))}
      </PricingComparisonTable>
    )
    const {getByRole, rerender} = render(renderComparison(['Core features', 'Security features']))

    await user.click(getByRole('button', {name: 'Core features'}))
    rerender(renderComparison(['Security features', 'Core features']))

    expect(getByRole('button', {name: 'Core features'})).toHaveAttribute('aria-expanded', 'false')
    expect(getByRole('button', {name: 'Security features'})).toHaveAttribute('aria-expanded', 'true')
  })

  it('applies expanded prop updates immediately after mount', async () => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const user = userEvent.setup()
    const renderComparison = (expanded: boolean) => (
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group expanded={expanded}>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>
    )
    const {getByRole, rerender} = render(renderComparison(true))

    await user.click(getByRole('button', {name: 'Features'}))
    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'false')

    rerender(renderComparison(false))
    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'false')

    rerender(renderComparison(true))
    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'true')
  })

  it.each(['expanded', 'breakpoint'])('preserves interactions when a suspended %s reset is cancelled', async reset => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const user = userEvent.setup()
    const suspended = jest.fn()
    const pending = new Promise<void>(() => {})
    const Suspend = ({blocked}: {blocked: boolean}) => {
      if (blocked) {
        suspended()
        throw pending
      }
      return null
    }
    const comparison = (expanded = true, blocked = false) => (
      <React.Suspense fallback="Loading comparison">
        <PricingComparisonTable>
          {['Free', 'Pro'].map(name => (
            <PricingComparisonTable.Item key={name}>
              <PricingComparisonTable.Heading>{name}</PricingComparisonTable.Heading>
            </PricingComparisonTable.Item>
          ))}
          <PricingComparisonTable.Group key="features" expanded={expanded}>
            <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
          </PricingComparisonTable.Group>
        </PricingComparisonTable>
        <Suspend blocked={blocked} />
      </React.Suspense>
    )
    const {getByRole, queryByText, rerender} = render(comparison())
    await user.click(getByRole('button', {name: 'Features'}))

    await act(async () => {
      if (reset === 'breakpoint') mockUseWindowSize.mockReturnValue(wideBreakpoint)
      React.startTransition(() => rerender(comparison(reset !== 'expanded', true)))
    })

    expect(suspended).toHaveBeenCalled()
    expect(queryByText('Loading comparison')).not.toBeInTheDocument()
    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'false')

    act(() => {
      mockUseWindowSize.mockReturnValue(regularBreakpoint)
      flushSync(() => rerender(comparison()))
    })

    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'false')
  })

  it('moves focus to the corresponding visible control when projections change', () => {
    const expanded = {narrow: true, regular: true, wide: true}
    const {container, getByRole, rerender} = render(
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group expanded={expanded}>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    container.querySelector('summary')!.focus()
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    rerender(
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group expanded={expanded}>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    expect(getByRole('button', {name: 'Features'})).toHaveFocus()
  })

  it('renders decorative chevrons that follow disclosure state in both projections', async () => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const user = userEvent.setup()
    const {container} = renderTable()
    const button = container.querySelector<HTMLButtonElement>('button[aria-controls]')!

    for (const control of container.querySelectorAll('summary, button[aria-controls]')) {
      expect(control.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
      expect(control.querySelector('svg')).toHaveClass('PricingComparisonTable__chevron--expanded')
    }

    await user.click(button)

    for (const control of container.querySelectorAll('summary, button[aria-controls]')) {
      expect(control).toHaveAttribute('aria-expanded', 'false')
      expect(control.querySelector('svg')).not.toHaveClass('PricingComparisonTable__chevron--expanded')
    }
  })

  it.each([
    ['included', undefined, 'Included', 'octicon-check'],
    ['unavailable', 'Not offered', 'Not offered', 'octicon-dash'],
  ] as const)(
    'renders a decorative %s icon with accessible text',
    (variant, variantAriaLabel, expectedLabel, expectedIcon) => {
      const {getAllByTestId} = render(
        <PricingComparisonTable>
          <PricingComparisonTable.Item>
            <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
          </PricingComparisonTable.Item>
          <PricingComparisonTable.Group expanded>
            <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
            <PricingComparisonTable.Row>
              <PricingComparisonTable.RowHeading>Storage</PricingComparisonTable.RowHeading>
              <PricingComparisonTable.Cell variant={variant} variantAriaLabel={variantAriaLabel}>
                With limits
              </PricingComparisonTable.Cell>
            </PricingComparisonTable.Row>
          </PricingComparisonTable.Group>
        </PricingComparisonTable>,
      )

      for (const cell of getAllByTestId(PricingComparisonTable.testIds.cell)) {
        expect(cell.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
        expect(cell.querySelector('svg')).toHaveClass(expectedIcon)
        expect(cell).toHaveTextContent(expectedLabel)
        expect(cell).toHaveTextContent('With limits')
      }
    },
  )

  it.each([
    ['hasStickyHeaders', 'PricingComparisonTable--stickyHeaders'],
    ['rowHighlighting', 'PricingComparisonTable--rowHighlighting'],
  ] as const)('only applies %s styling when enabled', (prop, expectedClass) => {
    const {getByTestId, rerender} = render(
      <PricingComparisonTable>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
      </PricingComparisonTable>,
    )

    expect(getByTestId(PricingComparisonTable.testIds.root)).not.toHaveClass(expectedClass)

    rerender(
      <PricingComparisonTable {...{[prop]: true}}>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
        </PricingComparisonTable.Item>
      </PricingComparisonTable>,
    )

    expect(getByTestId(PricingComparisonTable.testIds.root)).toHaveClass(expectedClass)
  })

  it('uses Label to promote the aligned plan across both responsive layouts', () => {
    const {getByTestId, getByText} = renderTable()
    const root = getByTestId(PricingComparisonTable.testIds.root)
    const table = getByTestId(PricingComparisonTable.testIds.table)

    expect(getByText('Recommended')).toBeInTheDocument()
    expect(root.querySelector('section[data-projection="regular"]')).toHaveClass('PricingComparisonTable__promoted')
    expect(root.querySelector('section[data-projection="wide"]')).toHaveClass('PricingComparisonTable__promoted')
    expect(table.querySelector('thead th:nth-child(2)')).toHaveClass('PricingComparisonTable__promoted')
    expect(table.querySelector('tbody[id] td:first-of-type')).toHaveClass('PricingComparisonTable__promoted')
    expect(root.querySelector('details dt:first-of-type')).toHaveClass('PricingComparisonTable__promoted')
    expect(root.querySelector('details dd:first-of-type')).toHaveClass('PricingComparisonTable__promoted')

    expect(table.querySelector('thead th:nth-child(3)')).not.toHaveClass('PricingComparisonTable__promoted')
    expect(table.querySelector('tbody[id] td:nth-of-type(2)')).not.toHaveClass('PricingComparisonTable__promoted')
  })

  it('scrolls focused table body controls below visible sticky headers and ignores header controls', () => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const onFocus = jest.fn()
    const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation()
    const {getByTestId} = render(
      <PricingComparisonTable hasStickyHeaders onFocus={onFocus}>
        <PricingComparisonTable.Item>
          <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
          <PricingComparisonTable.PrimaryAction as="a" href="#header-action">
            Header action
          </PricingComparisonTable.PrimaryAction>
        </PricingComparisonTable.Item>
        <PricingComparisonTable.Group>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
          <PricingComparisonTable.Row>
            <PricingComparisonTable.RowHeading>Storage</PricingComparisonTable.RowHeading>
            <PricingComparisonTable.Cell>
              <a href="#body-action">Body action</a>
            </PricingComparisonTable.Cell>
          </PricingComparisonTable.Row>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )
    const table = getByTestId(PricingComparisonTable.testIds.table)
    const headers = table.querySelectorAll('thead th')
    const headerAction = table.querySelector<HTMLAnchorElement>('thead a')!
    const groupControl = table.querySelector<HTMLButtonElement>('tbody button')!
    const bodyAction = table.querySelector<HTMLAnchorElement>('tbody a')!

    jest.spyOn(headers[0], 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 0, bottom: 72})
    jest.spyOn(headers[1], 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 0, bottom: 80})
    jest.spyOn(groupControl, 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 40, bottom: 64})
    jest.spyOn(bodyAction, 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 56, bottom: 72})
    bodyAction.style.outlineWidth = '4px'
    bodyAction.style.outlineOffset = '2px'

    act(() => headerAction.focus())
    expect(scrollBy).not.toHaveBeenCalled()

    act(() => groupControl.focus())
    expect(scrollBy).toHaveBeenLastCalledWith({top: -40, behavior: 'instant'})

    act(() => bodyAction.focus())
    expect(scrollBy).toHaveBeenLastCalledWith({top: -30, behavior: 'instant'})
    expect(onFocus).toHaveBeenCalledTimes(3)
  })

  it('protects focused table controls when items are added or restored', () => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation()
    const comparison = (showItems: boolean) => (
      <PricingComparisonTable hasStickyHeaders>
        {showItems ? (
          <PricingComparisonTable.Item>
            <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
          </PricingComparisonTable.Item>
        ) : null}
        {showItems ? (
          <PricingComparisonTable.Group>
            <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
          </PricingComparisonTable.Group>
        ) : null}
      </PricingComparisonTable>
    )
    const {container, getByTestId, rerender} = render(comparison(false))

    expect(container).toBeEmptyDOMElement()

    rerender(comparison(true))
    let table = getByTestId(PricingComparisonTable.testIds.table)
    let headers = table.querySelectorAll('thead th')
    let groupControl = table.querySelector<HTMLButtonElement>('tbody button')!

    jest.spyOn(headers[0], 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 0, bottom: 72})
    jest.spyOn(headers[1], 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 0, bottom: 80})
    jest.spyOn(groupControl, 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 40, bottom: 64})

    act(() => groupControl.focus())
    expect(scrollBy).toHaveBeenLastCalledWith({top: -40, behavior: 'instant'})

    rerender(comparison(false))
    rerender(comparison(true))
    table = getByTestId(PricingComparisonTable.testIds.table)
    headers = table.querySelectorAll('thead th')
    groupControl = table.querySelector<HTMLButtonElement>('tbody button')!

    jest.spyOn(headers[0], 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 0, bottom: 72})
    jest.spyOn(headers[1], 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 0, bottom: 80})
    jest.spyOn(groupControl, 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 40, bottom: 64})

    act(() => groupControl.focus())
    expect(scrollBy).toHaveBeenLastCalledWith({top: -40, behavior: 'instant'})
    expect(scrollBy).toHaveBeenCalledTimes(2)
  })

  it('does not render a comparison table without any valid items', () => {
    const {container} = render(
      <PricingComparisonTable>
        <PricingComparisonTable.Group>
          <PricingComparisonTable.GroupHeading>Features</PricingComparisonTable.GroupHeading>
        </PricingComparisonTable.Group>
      </PricingComparisonTable>,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders an accessible tooltip trigger for a row heading', () => {
    const {getAllByRole} = renderTable()

    expect(getAllByRole('button', {name: 'More information about Codespaces'})).toHaveLength(2)
  })

  it.each([
    ['narrow', narrowBreakpoint],
    ['regular', regularBreakpoint],
    ['wide', wideBreakpoint],
  ])('has no accessibility violations at the %s breakpoint', async (_name, currentBreakpoint) => {
    mockUseWindowSize.mockReturnValue(currentBreakpoint)
    const {container} = renderTable()
    expect(await axe(container)).toHaveNoViolations()
  })
})
