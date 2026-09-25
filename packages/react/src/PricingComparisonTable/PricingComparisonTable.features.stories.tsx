import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {expect, userEvent, waitFor, within} from 'storybook/test'
import {Box, Grid} from '..'
import {PricingComparisonTable} from '.'

const meta = {
  title: 'Components/PricingComparisonTable/Features',
  component: PricingComparisonTable,
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
} satisfies Meta<typeof PricingComparisonTable>

export default meta

type Story = StoryObj<typeof PricingComparisonTable>
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
  expanded?: React.ComponentProps<typeof PricingComparisonTable.Group>['expanded']
  planCount?: number
  rowHighlighting?: boolean
  hasStickyHeaders?: boolean
}) => {
  const {t} = useTranslation('PricingComparisonTable')
  const visiblePlans = plans.slice(0, planCount)

  return (
    <PricingComparisonTable
      aria-label={t('plan_comparison', {count: planCount})}
      rowHighlighting={rowHighlighting}
      hasStickyHeaders={hasStickyHeaders}
    >
      <PricingComparisonTable.Heading>{t('compare_features')}</PricingComparisonTable.Heading>
      {visiblePlans.map(plan => (
        <PricingComparisonTable.Item key={plan.name}>
          {plan.label ? <PricingComparisonTable.Label>{t(plan.label)}</PricingComparisonTable.Label> : null}
          <PricingComparisonTable.Heading>{t(plan.name)}</PricingComparisonTable.Heading>
          {plan.description ? (
            <PricingComparisonTable.Description>{t(plan.description)}</PricingComparisonTable.Description>
          ) : null}
          {plan.price ? <PricingComparisonTable.Price>{t(plan.price)}</PricingComparisonTable.Price> : null}
          <PricingComparisonTable.PrimaryAction as="a" href="#">
            {t('choose_plan', {plan: t(plan.name)})}
          </PricingComparisonTable.PrimaryAction>
          {plan.name === 'Team' ? (
            <PricingComparisonTable.SecondaryAction as="button">
              {t('contact_sales')}
            </PricingComparisonTable.SecondaryAction>
          ) : null}
        </PricingComparisonTable.Item>
      ))}
      {children ?? (
        <PricingComparisonTable.Group expanded={expanded}>
          <PricingComparisonTable.GroupHeading>{t('collaboration')}</PricingComparisonTable.GroupHeading>
          <PricingComparisonTable.Row>
            <PricingComparisonTable.RowHeading
              infoTooltip={t('private_repositories_tooltip')}
              infoTooltipAriaLabel={t('private_repositories_tooltip_label')}
            >
              {t('private_repositories')}
            </PricingComparisonTable.RowHeading>
            {visiblePlans.map(plan => (
              <PricingComparisonTable.Cell key={plan.name} variant="included" variantAriaLabel={t('included')} />
            ))}
          </PricingComparisonTable.Row>
          <PricingComparisonTable.Row>
            <PricingComparisonTable.RowHeading>{t('advanced_security')}</PricingComparisonTable.RowHeading>
            {visiblePlans.map((plan, index) => (
              <PricingComparisonTable.Cell
                key={plan.name}
                variant={index > 1 ? 'included' : 'unavailable'}
                variantAriaLabel={t(index > 1 ? 'included' : 'unavailable')}
              />
            ))}
          </PricingComparisonTable.Row>
          <PricingComparisonTable.Row>
            <PricingComparisonTable.RowHeading>{t('support')}</PricingComparisonTable.RowHeading>
            {visiblePlans.map((plan, index) => (
              <PricingComparisonTable.Cell key={plan.name}>
                {t(index > 1 ? 'premium' : index === 1 ? 'standard' : 'community')}
              </PricingComparisonTable.Cell>
            ))}
          </PricingComparisonTable.Row>
        </PricingComparisonTable.Group>
      )}
    </PricingComparisonTable>
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
    const narrow = await canvas.findByTestId('PricingComparisonTable__narrow')
    const table = canvas.getByTestId('PricingComparisonTable__table')
    await canvasElement.ownerDocument.fonts.ready
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth)

    if (window.matchMedia('(max-width: 47.999rem)').matches) {
      expect(narrow).toBeVisible()
      expect(table).not.toBeVisible()
      for (const row of within(narrow).getAllByTestId('PricingComparisonTable__row')) {
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

    const projection = window.matchMedia('(min-width: 80rem)').matches
      ? table
      : canvas.getByTestId('PricingComparisonTable__regularSummary')
    const summaries = within(projection).getAllByTestId('PricingComparisonTable__item')
    expect(summaries).toHaveLength(4)
    for (const summary of summaries) {
      const heading = within(summary).getByRole('heading')
      const price = within(summary).getByTestId('PricingComparisonTable__price')
      const headingBox = heading.getBoundingClientRect()
      const priceBox = price.getBoundingClientRect()
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
    const {t} = useTranslation('PricingComparisonTable')
    return (
      <PricingComparisonTable hasStickyHeaders aria-label={t('sticky_plan_comparison')}>
        {plans.slice(0, 2).map(plan => (
          <PricingComparisonTable.Item key={plan.name}>
            <PricingComparisonTable.Heading>{t(plan.name)}</PricingComparisonTable.Heading>
            <PricingComparisonTable.Description>
              {plan.description ? t(plan.description) : null}
            </PricingComparisonTable.Description>
            <PricingComparisonTable.PrimaryAction as="a" href={`#choose-${plan.name.toLowerCase()}`}>
              {t('choose_plan', {plan: t(plan.name)})}
            </PricingComparisonTable.PrimaryAction>
          </PricingComparisonTable.Item>
        ))}
        {['collaboration', 'security', 'support'].map(groupName => (
          <PricingComparisonTable.Group key={groupName}>
            <PricingComparisonTable.GroupHeading>{t(groupName)}</PricingComparisonTable.GroupHeading>
            {Array.from({length: 5}, (_, rowIndex) => (
              <PricingComparisonTable.Row key={`${groupName}-${rowIndex}`}>
                <PricingComparisonTable.RowHeading>
                  {t('group_feature', {group: t(groupName), number: rowIndex + 1})}
                </PricingComparisonTable.RowHeading>
                {plans.slice(0, 2).map(plan => (
                  <PricingComparisonTable.Cell key={plan.name} variant="included" variantAriaLabel={t('included')} />
                ))}
              </PricingComparisonTable.Row>
            ))}
          </PricingComparisonTable.Group>
        ))}
      </PricingComparisonTable>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const isNarrow = !window.matchMedia('(min-width: 48rem)').matches
    const projection = await canvas.findByTestId(
      isNarrow ? 'PricingComparisonTable__narrow' : 'PricingComparisonTable__table',
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
    const {t} = useTranslation('PricingComparisonTable')
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
          <PricingComparisonTable.Group key={group.name} expanded>
            <PricingComparisonTable.GroupHeading>{t(group.name)}</PricingComparisonTable.GroupHeading>
            {group.rows.map(row => (
              <PricingComparisonTable.Row key={row.name}>
                <PricingComparisonTable.RowHeading>{t(row.name)}</PricingComparisonTable.RowHeading>
                {row.values.map((value, index) =>
                  typeof value === 'boolean' ? (
                    <PricingComparisonTable.Cell
                      key={plans[index].name}
                      variant={value ? 'included' : 'unavailable'}
                      variantAriaLabel={t(value ? 'included' : 'unavailable')}
                    />
                  ) : (
                    <PricingComparisonTable.Cell key={plans[index].name}>{value}</PricingComparisonTable.Cell>
                  ),
                )}
              </PricingComparisonTable.Row>
            ))}
          </PricingComparisonTable.Group>
        ))}
      </Fixture>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const projection = await canvas.findByTestId(
      window.matchMedia('(min-width: 48rem)').matches
        ? 'PricingComparisonTable__table'
        : 'PricingComparisonTable__narrow',
    )
    const rows = within(projection).getAllByTestId('PricingComparisonTable__row')
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
