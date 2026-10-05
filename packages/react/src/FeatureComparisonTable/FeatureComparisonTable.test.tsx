import React from 'react'
import {act, render, within} from '@testing-library/react'
import {flushSync} from 'react-dom'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {axe, toHaveNoViolations} from 'jest-axe'
import {useWindowSize} from '../hooks/useWindowSize'
import {FeatureComparisonTable} from './FeatureComparisonTable'

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
    <FeatureComparisonTable aria-label="Plan comparison">
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
      <FeatureComparisonTable.Group expanded>
        <FeatureComparisonTable.GroupHeading>Core features</FeatureComparisonTable.GroupHeading>
        <FeatureComparisonTable.Row>
          <FeatureComparisonTable.RowHeading infoTooltip="Feature details">
            Codespaces
          </FeatureComparisonTable.RowHeading>
          <FeatureComparisonTable.Cell variant="included" />
          <FeatureComparisonTable.Cell>Unlimited</FeatureComparisonTable.Cell>
        </FeatureComparisonTable.Row>
      </FeatureComparisonTable.Group>
    </FeatureComparisonTable>,
  )

describe('FeatureComparisonTable', () => {
  beforeEach(() => {
    mockUseWindowSize.mockReturnValue(narrowBreakpoint)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders plan summaries and feature values in both responsive layouts', () => {
    const {getByTestId, getByRole} = renderTable()
    const narrow = within(getByTestId(FeatureComparisonTable.testIds.narrow))
    const table = getByRole('table', {name: 'Plan comparison'})

    expect(narrow.getByRole('heading', {name: 'Free'})).toBeInTheDocument()
    expect(narrow.getByRole('heading', {name: 'Pro'})).toBeInTheDocument()
    expect(narrow.getByText('Codespaces')).toBeInTheDocument()
    expect(narrow.getByText('Unlimited')).toBeInTheDocument()
    expect(within(table).getByRole('rowheader', {name: /^Codespaces/})).toHaveAttribute('scope', 'row')
    expect(within(table).getByRole('cell', {name: 'Unlimited'})).toBeInTheDocument()
    expect(within(table).getByRole('columnheader', {name: 'Compare features'})).toHaveAttribute('scope', 'col')
    expect(within(table).getByRole('rowheader', {name: 'Core features'})).toHaveAttribute('scope', 'rowgroup')

    for (const summary of [getByTestId(FeatureComparisonTable.testIds.regularSummary), table]) {
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>
          Compare <span>plans</span>
        </FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
      </FeatureComparisonTable>,
    )

    expect(getByTestId(FeatureComparisonTable.testIds.root)).toHaveAccessibleName('Compare plans')
    expect(getByRole('table', {name: 'Compare plans'})).toBeInTheDocument()
  })

  it('truncates items, pads missing cells, ignores extra cells, and ignores unsupported children', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation()
    const {getByTestId, getAllByTestId, queryByText} = render(
      <FeatureComparisonTable>
        <div>Unsupported root child</div>
        {['One', 'Two', 'Three', 'Four', 'Five'].map(name => (
          <FeatureComparisonTable.Item key={name}>
            <span>Unsupported item child</span>
            <FeatureComparisonTable.Heading>{name}</FeatureComparisonTable.Heading>
          </FeatureComparisonTable.Item>
        ))}
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>Storage</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.Cell>First</FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell>Second</FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell>Third</FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell>Fourth</FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell>Ignored extra</FeatureComparisonTable.Cell>
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>Support</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.Cell>Email</FeatureComparisonTable.Cell>
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )

    const table = getByTestId(FeatureComparisonTable.testIds.table)
    expect(table.querySelectorAll('thead th')).toHaveLength(5)
    expect(table.querySelectorAll('tbody tr:last-child td')).toHaveLength(4)
    expect(getAllByTestId(FeatureComparisonTable.testIds.item)).toHaveLength(8)
    expect(queryByText('Five')).not.toBeInTheDocument()
    expect(queryByText('Ignored extra')).not.toBeInTheDocument()
    expect(queryByText('Unsupported root child')).not.toBeInTheDocument()
    expect(queryByText('Unsupported item child')).not.toBeInTheDocument()
    expect(warn).toHaveBeenCalledWith(
      'FeatureComparisonTable.Row: expected 4 Cell children to match the number of items, but received 5. Missing cells render empty and extra cells are ignored.',
    )
    expect(warn).toHaveBeenCalledWith(
      'FeatureComparisonTable.Row: expected 4 Cell children to match the number of items, but received 1. Missing cells render empty and extra cells are ignored.',
    )
  })

  it('generates unique IDs and connects group controls to their content', () => {
    const {container} = render(
      <>
        <FeatureComparisonTable>
          <FeatureComparisonTable.Item>
            <FeatureComparisonTable.Heading>One</FeatureComparisonTable.Heading>
          </FeatureComparisonTable.Item>
          <FeatureComparisonTable.Group>
            <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
            <FeatureComparisonTable.Row>
              <FeatureComparisonTable.RowHeading>Storage</FeatureComparisonTable.RowHeading>
              <FeatureComparisonTable.Cell>Included</FeatureComparisonTable.Cell>
            </FeatureComparisonTable.Row>
          </FeatureComparisonTable.Group>
        </FeatureComparisonTable>
        <FeatureComparisonTable>
          <FeatureComparisonTable.Item>
            <FeatureComparisonTable.Heading>Two</FeatureComparisonTable.Heading>
          </FeatureComparisonTable.Item>
          <FeatureComparisonTable.Group>
            <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
          </FeatureComparisonTable.Group>
        </FeatureComparisonTable>
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group className="custom-group">
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded={expanded}>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading>Core features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading>Security features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>Storage</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.Cell>Included</FeatureComparisonTable.Cell>
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded={expanded}>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )

    const summary = getByRole('group').querySelector('summary')!
    await user.click(summary)
    expect(summary).toHaveAttribute('aria-expanded', 'false')

    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    rerender(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded={expanded}>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )

    expect(getByRole('button', {name: 'Features'})).toHaveAttribute('aria-expanded', 'true')
  })

  it('does not restore an interaction after a breakpoint round trip', async () => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const user = userEvent.setup()
    const renderComparison = () => (
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        {groupNames.map(groupName => (
          <FeatureComparisonTable.Group key={groupName}>
            <FeatureComparisonTable.GroupHeading>{groupName}</FeatureComparisonTable.GroupHeading>
          </FeatureComparisonTable.Group>
        ))}
      </FeatureComparisonTable>
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded={expanded}>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>
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
        <FeatureComparisonTable>
          {['Free', 'Pro'].map(name => (
            <FeatureComparisonTable.Item key={name}>
              <FeatureComparisonTable.Heading>{name}</FeatureComparisonTable.Heading>
            </FeatureComparisonTable.Item>
          ))}
          <FeatureComparisonTable.Group key="features" expanded={expanded}>
            <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
          </FeatureComparisonTable.Group>
        </FeatureComparisonTable>
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded={expanded}>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )

    container.querySelector('summary')!.focus()
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    rerender(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded={expanded}>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
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
      expect(control.querySelector('svg')).toHaveClass('FeatureComparisonTable__chevron--expanded')
    }

    await user.click(button)

    for (const control of container.querySelectorAll('summary, button[aria-controls]')) {
      expect(control).toHaveAttribute('aria-expanded', 'false')
      expect(control.querySelector('svg')).not.toHaveClass('FeatureComparisonTable__chevron--expanded')
    }
  })

  it.each([
    ['included', undefined, 'Included', 'octicon-check'],
    ['unavailable', 'Not offered', 'Not offered', 'octicon-dash'],
  ] as const)(
    'renders a decorative %s icon with accessible text',
    (variant, variantAriaLabel, expectedLabel, expectedIcon) => {
      const {getAllByTestId} = render(
        <FeatureComparisonTable>
          <FeatureComparisonTable.Item>
            <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
          </FeatureComparisonTable.Item>
          <FeatureComparisonTable.Group expanded>
            <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
            <FeatureComparisonTable.Row>
              <FeatureComparisonTable.RowHeading>Storage</FeatureComparisonTable.RowHeading>
              <FeatureComparisonTable.Cell variant={variant} variantAriaLabel={variantAriaLabel}>
                With limits
              </FeatureComparisonTable.Cell>
            </FeatureComparisonTable.Row>
          </FeatureComparisonTable.Group>
        </FeatureComparisonTable>,
      )

      for (const cell of getAllByTestId(FeatureComparisonTable.testIds.cell)) {
        expect(cell.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
        expect(cell.querySelector('svg')).toHaveClass(expectedIcon)
        expect(cell).toHaveTextContent(expectedLabel)
        expect(cell).toHaveTextContent('With limits')
      }
    },
  )

  it.each([
    ['hasStickyHeaders', 'FeatureComparisonTable--stickyHeaders'],
    ['rowHighlighting', 'FeatureComparisonTable--rowHighlighting'],
  ] as const)('only applies %s styling when enabled', (prop, expectedClass) => {
    const {getByTestId, rerender} = render(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
      </FeatureComparisonTable>,
    )

    expect(getByTestId(FeatureComparisonTable.testIds.root)).not.toHaveClass(expectedClass)

    rerender(
      <FeatureComparisonTable {...{[prop]: true}}>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
      </FeatureComparisonTable>,
    )

    expect(getByTestId(FeatureComparisonTable.testIds.root)).toHaveClass(expectedClass)
  })

  it('uses Label to promote the aligned plan across both responsive layouts', () => {
    const {getByTestId, getByText} = renderTable()
    const root = getByTestId(FeatureComparisonTable.testIds.root)
    const table = getByTestId(FeatureComparisonTable.testIds.table)

    expect(getByText('Recommended')).toBeInTheDocument()
    expect(root.querySelector('section[data-projection="regular"]')).toHaveClass('FeatureComparisonTable__promoted')
    expect(root.querySelector('section[data-projection="wide"]')).toHaveClass('FeatureComparisonTable__promoted')
    expect(table.querySelector('thead th:nth-child(2)')).toHaveClass('FeatureComparisonTable__promoted')
    expect(table.querySelector('tbody[id] td:first-of-type')).toHaveClass('FeatureComparisonTable__promoted')
    expect(root.querySelector('details dt:first-of-type')).toHaveClass('FeatureComparisonTable__promoted')
    expect(root.querySelector('details dd:first-of-type')).toHaveClass('FeatureComparisonTable__promoted')

    expect(table.querySelector('thead th:nth-child(3)')).not.toHaveClass('FeatureComparisonTable__promoted')
    expect(table.querySelector('tbody[id] td:nth-of-type(2)')).not.toHaveClass('FeatureComparisonTable__promoted')
  })

  it('scrolls focused table body controls below visible sticky headers and ignores header controls', () => {
    mockUseWindowSize.mockReturnValue(regularBreakpoint)
    const onFocus = jest.fn()
    const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation()
    const {getByTestId} = render(
      <FeatureComparisonTable hasStickyHeaders onFocus={onFocus}>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
          <FeatureComparisonTable.PrimaryAction as="a" href="#header-action">
            Header action
          </FeatureComparisonTable.PrimaryAction>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>Storage</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.Cell>
              <a href="#body-action">Body action</a>
            </FeatureComparisonTable.Cell>
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )
    const table = getByTestId(FeatureComparisonTable.testIds.table)
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
      <FeatureComparisonTable hasStickyHeaders>
        {showItems ? (
          <FeatureComparisonTable.Item>
            <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
          </FeatureComparisonTable.Item>
        ) : null}
        {showItems ? (
          <FeatureComparisonTable.Group>
            <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
          </FeatureComparisonTable.Group>
        ) : null}
      </FeatureComparisonTable>
    )
    const {container, getByTestId, rerender} = render(comparison(false))

    expect(container).toBeEmptyDOMElement()

    rerender(comparison(true))
    let table = getByTestId(FeatureComparisonTable.testIds.table)
    let headers = table.querySelectorAll('thead th')
    let groupControl = table.querySelector<HTMLButtonElement>('tbody button')!

    jest.spyOn(headers[0], 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 0, bottom: 72})
    jest.spyOn(headers[1], 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 0, bottom: 80})
    jest.spyOn(groupControl, 'getBoundingClientRect').mockReturnValue({...new DOMRect(), top: 40, bottom: 64})

    act(() => groupControl.focus())
    expect(scrollBy).toHaveBeenLastCalledWith({top: -40, behavior: 'instant'})

    rerender(comparison(false))
    rerender(comparison(true))
    table = getByTestId(FeatureComparisonTable.testIds.table)
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
      <FeatureComparisonTable>
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading>Features</FeatureComparisonTable.GroupHeading>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
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
