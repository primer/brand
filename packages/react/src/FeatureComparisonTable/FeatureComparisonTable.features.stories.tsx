import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {expect, userEvent, waitFor, within} from 'storybook/test'
import {Box, Grid} from '..'
import {FeatureComparisonTable} from '.'

const meta = {
  title: 'Components/FeatureComparisonTable/Features',
  component: FeatureComparisonTable,
  decorators: [
    Story => (
      <Box backgroundColor="default" paddingBlockStart="spacious" paddingBlockEnd="spacious">
        <Grid>
          <Grid.Column span={12}>
            <Story />
          </Grid.Column>
        </Grid>
      </Box>
    ),
  ],
} satisfies Meta<typeof FeatureComparisonTable>

export default meta

type Story = StoryObj<typeof FeatureComparisonTable>
type Plan = {
  description?: string
  label?: string
  name: string
  price?: string
}

const plans: Plan[] = [
  {name: 'Free', description: 'for_individuals', price: 'free_price'},
  {name: 'Team', description: 'for_teams', label: 'recommended', price: 'team_price'},
  {name: 'Enterprise', description: 'for_organizations', price: 'enterprise_price'},
  {name: 'Enterprise Plus', description: 'for_complex_organizations', price: 'enterprise_plus_price'},
]

const restoreFocus = (element: Element | null) => {
  if (!(element instanceof HTMLElement)) return
  const tabIndex = element.getAttribute('tabindex')
  element.setAttribute('tabindex', '-1')
  element.focus({preventScroll: true})
  if (tabIndex === null) element.removeAttribute('tabindex')
  else element.setAttribute('tabindex', tabIndex)
}

const Fixture = ({
  children,
  expanded = true,
  planCount = 4,
  rowHighlighting = false,
  hasStickyHeaders = false,
}: {
  children?: React.ReactNode
  expanded?: React.ComponentProps<typeof FeatureComparisonTable.Group>['expanded']
  planCount?: number
  rowHighlighting?: boolean
  hasStickyHeaders?: boolean
}) => {
  const {t} = useTranslation('FeatureComparisonTable')
  const visiblePlans = plans.slice(0, planCount)

  return (
    <FeatureComparisonTable
      aria-label={t('plan_comparison', {count: planCount})}
      rowHighlighting={rowHighlighting}
      hasStickyHeaders={hasStickyHeaders}
    >
      <FeatureComparisonTable.Heading>{t('compare_features')}</FeatureComparisonTable.Heading>
      {visiblePlans.map(plan => (
        <FeatureComparisonTable.Item key={plan.name}>
          {plan.label ? <FeatureComparisonTable.Label>{t(plan.label)}</FeatureComparisonTable.Label> : null}
          <FeatureComparisonTable.Heading>{t(plan.name)}</FeatureComparisonTable.Heading>
          {plan.description ? (
            <FeatureComparisonTable.Description>{t(plan.description)}</FeatureComparisonTable.Description>
          ) : null}
          {plan.price ? <FeatureComparisonTable.Price>{t(plan.price)}</FeatureComparisonTable.Price> : null}
          <FeatureComparisonTable.PrimaryAction as="a" href="#">
            {t('choose_plan', {plan: t(plan.name)})}
          </FeatureComparisonTable.PrimaryAction>
          {plan.name === 'Team' ? (
            <FeatureComparisonTable.SecondaryAction as="button">
              {t('contact_sales')}
            </FeatureComparisonTable.SecondaryAction>
          ) : null}
        </FeatureComparisonTable.Item>
      ))}
      {children ?? (
        <FeatureComparisonTable.Group expanded={expanded}>
          <FeatureComparisonTable.GroupHeading>{t('collaboration')}</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading
              infoTooltip={t('private_repositories_tooltip')}
              infoTooltipAriaLabel={t('private_repositories_tooltip_label')}
            >
              {t('private_repositories')}
            </FeatureComparisonTable.RowHeading>
            {visiblePlans.map(plan => (
              <FeatureComparisonTable.Cell key={plan.name} variant="included" variantAriaLabel={t('included')} />
            ))}
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('advanced_security')}</FeatureComparisonTable.RowHeading>
            {visiblePlans.map((plan, index) => (
              <FeatureComparisonTable.Cell
                key={plan.name}
                variant={index > 1 ? 'included' : 'unavailable'}
                variantAriaLabel={t(index > 1 ? 'included' : 'unavailable')}
              />
            ))}
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('support')}</FeatureComparisonTable.RowHeading>
            {visiblePlans.map((plan, index) => (
              <FeatureComparisonTable.Cell key={plan.name}>
                {t(index > 1 ? 'premium' : index === 1 ? 'standard' : 'community')}
              </FeatureComparisonTable.Cell>
            ))}
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      )}
    </FeatureComparisonTable>
  )
}

export const TwoPlans: Story = {
  render: () => <Fixture planCount={2} />,
}

export const ThreePlans: Story = {
  render: () => <Fixture planCount={3} />,
}

export const FourPlans: Story = {
  render: () => <Fixture />,
  play: async ({canvasElement, globals}) => {
    const canvas = within(canvasElement)
    const narrow = await canvas.findByTestId('FeatureComparisonTable__narrow')
    const table = canvas.getByTestId('FeatureComparisonTable__table')
    await canvasElement.ownerDocument.fonts.ready
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth)

    const isWide = window.matchMedia('(min-width: 80rem)').matches
    const visibleProjection = window.matchMedia('(max-width: 47.999rem)').matches ? narrow : table
    for (const rowHeading of within(visibleProjection).getAllByTestId('FeatureComparisonTable__rowHeading')) {
      expect(getComputedStyle(rowHeading.firstElementChild!).fontWeight).toBe('500')
    }
    for (const heading of visibleProjection.querySelectorAll('summary h3, th[scope="rowgroup"] h3')) {
      expect(getComputedStyle(heading).fontWeight).toBe('600')
      expect(getComputedStyle(heading).fontSize).toBe(visibleProjection === narrow ? '18px' : '20px')
    }

    if (window.matchMedia('(max-width: 47.999rem)').matches) {
      expect(narrow).toBeVisible()
      expect(table).not.toBeVisible()
      for (const row of within(narrow).getAllByTestId('FeatureComparisonTable__row')) {
        const names = row.querySelectorAll('dt')
        const values = row.querySelectorAll('dd')
        expect(names).toHaveLength(4)
        expect(values).toHaveLength(4)
        for (let index = 0; index < names.length; index++) {
          const name = names[index].getBoundingClientRect()
          const value = values[index].getBoundingClientRect()
          expect(Math.abs(name.top - value.top)).toBeLessThanOrEqual(1)
          expect(Math.abs(name.height - value.height)).toBeLessThanOrEqual(1)
          expect(name.right).toBeLessThanOrEqual(value.left + 1)
        }
      }
      return
    }

    const rowStarts = table.querySelectorAll(
      'tbody th[scope="row"], tbody th[colspan] > [aria-hidden] > span:first-child',
    )
    expect(rowStarts.length).toBeGreaterThan(0)
    for (const start of rowStarts) {
      const styles = getComputedStyle(start)
      expect(styles.borderInlineStartStyle).toBe('solid')
      expect(parseFloat(styles.borderInlineStartWidth)).toBeGreaterThan(0)
    }

    for (const cell of table.querySelectorAll('tbody td')) {
      expect(getComputedStyle(cell).paddingInlineStart).toBe(isWide ? '28px' : '20px')
      expect(getComputedStyle(cell).borderInlineStartWidth).toBe('0px')
    }
    for (const header of table.querySelectorAll('th[scope="rowgroup"]')) {
      expect(header.getBoundingClientRect().height).toBeGreaterThanOrEqual(104)
    }

    const projection = isWide ? table : canvas.getByTestId('FeatureComparisonTable__regularSummary')
    const summaries = within(projection).getAllByTestId('FeatureComparisonTable__item')
    expect(summaries).toHaveLength(4)
    for (const summary of summaries) {
      const heading = within(summary).getByRole('heading')
      const price = within(summary).getByTestId('FeatureComparisonTable__price')
      const headingBox = heading.getBoundingClientRect()
      const priceBox = price.getBoundingClientRect()
      expect(getComputedStyle(heading).fontWeight).toBe('600')
      expect(getComputedStyle(heading).fontSize).toBe('16px')
      const description = summary.querySelector('p:not([data-testid])')!
      expect(getComputedStyle(description).fontSize).toBe('14px')
      for (const action of summary.querySelectorAll('a, button')) {
        expect(getComputedStyle(action).paddingInlineStart).toBe('20px')
        expect(getComputedStyle(action).minHeight).toBe('34px')
        expect(action.getBoundingClientRect().height).toBeGreaterThanOrEqual(34)
        const label = action.querySelector('span > span')!
        expect(getComputedStyle(label).fontSize).toBe('16px')
        expect(getComputedStyle(label).fontWeight).toBe('500')
        const labelRange = document.createRange()
        labelRange.selectNodeContents(label)
        if (labelRange.getClientRects().length === 1) {
          expect(action.getBoundingClientRect().height).toBe(34)
        }
      }
      expect(Math.abs(headingBox.top - priceBox.top)).toBeLessThanOrEqual(1)
      expect(headingBox.right).toBeLessThan(priceBox.left)
      expect(priceBox.right).toBeLessThanOrEqual(summary.getBoundingClientRect().right)
      expect(getComputedStyle(price).fontSize).toBe('14px')
      expect(getComputedStyle(price).fontWeight).toBe('600')
      // This regression checks English plan names; other scripts have different word-breaking rules.
      if (globals.locale === 'en') {
        const text = heading.firstChild!
        const range = document.createRange()
        for (const match of (text.textContent ?? '').matchAll(/\S+/g)) {
          range.setStart(text, match.index)
          range.setEnd(text, match.index + match[0].length)
          expect(range.getClientRects()).toHaveLength(1)
        }
      }
    }
    if (isWide) {
      const heading = within(table).getByTestId('FeatureComparisonTable__heading')
      expect(getComputedStyle(heading).fontSize).toBe('24px')
      expect(getComputedStyle(heading).fontWeight).toBe('600')
      for (const label of within(table).getAllByTestId('FeatureComparisonTable__label')) {
        expect(getComputedStyle(label.firstElementChild!).fontWeight).toBe('500')
      }
    }
  },
}

export const MobileViewport: Story = {
  ...FourPlans,
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const TabletViewport: Story = {
  ...FourPlans,
  globals: {
    viewport: {value: 'ipad'},
  },
}

export const CollapsedGroups: Story = {
  render: () => <Fixture expanded={false} planCount={3} />,
}

export const ResponsiveGroupExpansion: Story = {
  render: () => <Fixture expanded={{narrow: true, regular: false, wide: true}} planCount={3} />,
}

export const StickyHeaders: Story = {
  render: function StickyHeadersStory() {
    const {t} = useTranslation('FeatureComparisonTable')
    return (
      <FeatureComparisonTable hasStickyHeaders aria-label={t('sticky_plan_comparison')}>
        {plans.slice(0, 2).map(plan => (
          <FeatureComparisonTable.Item key={plan.name}>
            <FeatureComparisonTable.Heading>{t(plan.name)}</FeatureComparisonTable.Heading>
            <FeatureComparisonTable.Description>
              {plan.description ? t(plan.description) : null}
            </FeatureComparisonTable.Description>
            <FeatureComparisonTable.PrimaryAction as="a" href={`#choose-${plan.name.toLowerCase()}`}>
              {t('choose_plan', {plan: t(plan.name)})}
            </FeatureComparisonTable.PrimaryAction>
          </FeatureComparisonTable.Item>
        ))}
        {['collaboration', 'security', 'support'].map(groupName => (
          <FeatureComparisonTable.Group key={groupName}>
            <FeatureComparisonTable.GroupHeading>{t(groupName)}</FeatureComparisonTable.GroupHeading>
            {Array.from({length: 5}, (_, rowIndex) => (
              <FeatureComparisonTable.Row key={`${groupName}-${rowIndex}`}>
                <FeatureComparisonTable.RowHeading>
                  {t('group_feature', {group: t(groupName), number: rowIndex + 1})}
                </FeatureComparisonTable.RowHeading>
                {plans.slice(0, 2).map(plan => (
                  <FeatureComparisonTable.Cell key={plan.name} variant="included" variantAriaLabel={t('included')} />
                ))}
              </FeatureComparisonTable.Row>
            ))}
          </FeatureComparisonTable.Group>
        ))}
      </FeatureComparisonTable>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const isNarrow = !window.matchMedia('(min-width: 48rem)').matches
    const projection = await canvas.findByTestId(
      isNarrow ? 'FeatureComparisonTable__narrow' : 'FeatureComparisonTable__table',
    )
    const control = projection.querySelector<HTMLElement>('[aria-expanded]')!
    const initiallyExpanded = !isNarrow
    await waitFor(() => expect(control).toHaveAttribute('aria-expanded', String(initiallyExpanded)))
    const previousFocus = canvasElement.ownerDocument.activeElement
    try {
      control.focus()
      if (isNarrow) await userEvent.click(control)
      else await userEvent.keyboard('{Enter}')
      await waitFor(() => expect(control).toHaveAttribute('aria-expanded', String(!initiallyExpanded)))
      if (isNarrow) await userEvent.click(control)
      else await userEvent.keyboard(' ')
      await waitFor(() => expect(control).toHaveAttribute('aria-expanded', String(initiallyExpanded)))

      if (isNarrow) return
      const headers = Array.from(projection.querySelectorAll('thead th'))
      window.scrollTo(0, window.scrollY + projection.getBoundingClientRect().top + 160)
      await waitFor(() => expect(Math.abs(headers[0].getBoundingClientRect().top)).toBeLessThanOrEqual(1))

      restoreFocus(previousFocus)
      window.scrollTo(0, window.scrollY + control.getBoundingClientRect().top)
      control.focus({preventScroll: true})
      await waitFor(() => {
        expect(control).toHaveFocus()
        const styles = getComputedStyle(control)
        const clearance = (parseFloat(styles.outlineWidth) || 0) + (parseFloat(styles.outlineOffset) || 0)
        const headerBottom = Math.max(...headers.map(header => header.getBoundingClientRect().bottom))
        expect(control.getBoundingClientRect().top - clearance).toBeGreaterThanOrEqual(headerBottom - 1)
      })
    } finally {
      restoreFocus(previousFocus)
      window.scrollTo(0, 0)
    }
  },
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: {default: 'dark'},
    colorMode: 'dark',
  },
  render: () => <Fixture planCount={3} />,
}

export const RowHighlighting: Story = {
  render: function RowHighlightingStory() {
    const {t} = useTranslation('FeatureComparisonTable')
    const groups = [
      {
        name: 'collaboration',
        rows: [
          {name: 'private_repositories', values: [true, true, true]},
          {name: 'collaborators', values: [t('unlimited'), t('unlimited'), t('unlimited')]},
          {name: 'code_review', values: [true, true, true]},
          {name: 'required_reviewers', values: [false, true, true]},
          {name: 'team_discussions', values: [false, true, true]},
        ],
      },
      {
        name: 'automation',
        rows: [
          {name: 'workflow_minutes', values: [t('minutes_free'), t('minutes_team'), t('minutes_enterprise')]},
          {name: 'package_storage', values: [t('storage_free'), t('storage_team'), t('storage_enterprise')]},
          {name: 'hosted_runners', values: [true, true, true]},
          {name: 'deployment_approvals', values: [false, true, true]},
          {name: 'custom_deployment_rules', values: [false, false, true]},
        ],
      },
      {
        name: 'security_and_support',
        rows: [
          {name: 'dependency_alerts', values: [true, true, true]},
          {name: 'security_policies', values: [false, true, true]},
          {name: 'audit_log', values: [false, false, true]},
          {name: 'single_sign_on', values: [false, false, true]},
          {name: 'support', values: [t('community'), t('standard'), t('premium')]},
        ],
      },
    ]

    return (
      <Fixture planCount={3} rowHighlighting>
        {groups.map(group => (
          <FeatureComparisonTable.Group key={group.name} expanded>
            <FeatureComparisonTable.GroupHeading>{t(group.name)}</FeatureComparisonTable.GroupHeading>
            {group.rows.map(row => (
              <FeatureComparisonTable.Row key={row.name}>
                <FeatureComparisonTable.RowHeading>{t(row.name)}</FeatureComparisonTable.RowHeading>
                {row.values.map((value, index) =>
                  typeof value === 'boolean' ? (
                    <FeatureComparisonTable.Cell
                      key={plans[index].name}
                      variant={value ? 'included' : 'unavailable'}
                      variantAriaLabel={t(value ? 'included' : 'unavailable')}
                    />
                  ) : (
                    <FeatureComparisonTable.Cell key={plans[index].name}>{value}</FeatureComparisonTable.Cell>
                  ),
                )}
              </FeatureComparisonTable.Row>
            ))}
          </FeatureComparisonTable.Group>
        ))}
      </Fixture>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const projection = await canvas.findByTestId(
      window.matchMedia('(min-width: 48rem)').matches
        ? 'FeatureComparisonTable__table'
        : 'FeatureComparisonTable__narrow',
    )
    const rows = within(projection).getAllByTestId('FeatureComparisonTable__row')
    expect(rows).toHaveLength(15)
    const row = rows[0]
    const cells = row.querySelectorAll('td, dd')
    row.tabIndex = -1
    row.focus({preventScroll: true})
    await waitFor(() => {
      expect(row).toHaveFocus()
      const ordinaryBackground = getComputedStyle(cells[0]).backgroundColor
      const highlightedBackground = getComputedStyle(cells[1]).backgroundColor
      if (window.matchMedia('(min-width: 80rem)').matches) {
        expect(ordinaryBackground).not.toBe('rgba(0, 0, 0, 0)')
        expect(highlightedBackground).not.toBe(ordinaryBackground)
      } else {
        expect(highlightedBackground).toBe(ordinaryBackground)
        expect(getComputedStyle(row).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
      }
    })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      expect(getComputedStyle(cells[1]).transitionDuration).toBe('0s')
    }
  },
}
