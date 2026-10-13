import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {expect, userEvent, waitFor, within} from 'storybook/test'
import {Box, Grid, InlineLink} from '..'
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
  name: string
  price?: string
}

const plans: Plan[] = [
  {name: 'Free', description: 'for_individuals', price: 'free_price'},
  {name: 'Team', description: 'for_teams', price: 'team_price'},
  {name: 'Enterprise', description: 'for_organizations', price: 'enterprise_price'},
  {name: 'Enterprise Plus', description: 'for_complex_organizations', price: 'enterprise_plus_price'},
]

export const TwoPlans: Story = {
  render: () => <FeatureComparisonExample planCount={2} />,
}

export const ThreePlans: Story = {
  render: () => <FeatureComparisonExample planCount={3} />,
}

export const FeaturedFirstPlan: Story = {
  render: () => <FeatureComparisonExample featuredPlanIndex={0} />,
}

export const FeaturedLastPlan: Story = {
  render: () => <FeatureComparisonExample featuredPlanIndex={3} />,
}

export const FourPlans: Story = {
  render: () => <FeatureComparisonExample />,
}

export const FeatureRows: Story = {
  render: () => <FeatureComparisonExample planCount={2} showPlanSummaries={false} />,
}

export const RowDescriptions: Story = {
  render: function RowDescriptionsStory() {
    const {t} = useTranslation('FeatureComparisonTable')

    return (
      <FeatureComparisonExample planCount={2}>
        <FeatureComparisonTable.Group expanded>
          <FeatureComparisonTable.GroupHeading>{t('collaboration')}</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('private_repositories')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>
              {t('for_individuals')} <InlineLink href="#support">{t('support')}</InlineLink>
            </FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('advanced_security')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>
              <strong>{t('for_teams')}</strong>
            </FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="unavailable" variantAriaLabel={t('unavailable')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('support')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>{t('for_organizations')}</FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell>{t('community')}</FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell>{t('standard')}</FeatureComparisonTable.Cell>
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      </FeatureComparisonExample>
    )
  },
}

export const PlanSummaries: Story = {
  render: () => <FeatureComparisonExample showFeatureRows={false} />,
}

export const MobileViewport: Story = {
  render: () => <FeatureComparisonExample />,
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const TabletViewport: Story = {
  ...MobileViewport,
  globals: {
    viewport: {value: 'ipad'},
  },
}

export const CollapsedGroups: Story = {
  render: () => <FeatureComparisonExample expanded={false} planCount={3} />,
}

export const ResponsiveGroupExpansion: Story = {
  render: () => <FeatureComparisonExample expanded={{narrow: true, regular: false, wide: true}} planCount={3} />,
}

export const StickyHeaders: Story = {
  render: function StickyHeadersStory() {
    const {t} = useTranslation('FeatureComparisonTable')
    return (
      <FeatureComparisonTable hasStickyHeaders>
        <FeatureComparisonTable.Heading>{t('compare_features')}</FeatureComparisonTable.Heading>
        {plans.slice(0, 2).map(plan => (
          <FeatureComparisonTable.Item key={plan.name}>
            <FeatureComparisonTable.ItemHeading>{t(plan.name)}</FeatureComparisonTable.ItemHeading>
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
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: {default: 'dark'},
    colorMode: 'dark',
  },
  render: () => <FeatureComparisonExample planCount={3} />,
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
      <FeatureComparisonExample planCount={3}>
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
                    <FeatureComparisonTable.Cell key={plans[index].name}>
                      {row.name === 'support' ? <InlineLink href="#support">{value}</InlineLink> : value}
                    </FeatureComparisonTable.Cell>
                  ),
                )}
              </FeatureComparisonTable.Row>
            ))}
          </FeatureComparisonTable.Group>
        ))}
      </FeatureComparisonExample>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const projection = await canvas.findByTestId(
      window.matchMedia('(min-width: 80rem)').matches
        ? 'FeatureComparisonTable__table'
        : 'FeatureComparisonTable__narrow',
    )
    const rows = within(projection).getAllByTestId('FeatureComparisonTable__row')
    const row = rows[rows.length - 1]
    const links = within(row).getAllByRole('link')
    links[0].focus({preventScroll: true})
    await userEvent.tab()
    await waitFor(() => expect(links[1]).toHaveFocus())
  },
}

function FeatureComparisonExample({
  children,
  expanded = true,
  featuredPlanIndex = 1,
  planCount = 4,
  showFeatureRows = true,
  showPlanSummaries = true,
}: {
  children?: React.ReactNode
  expanded?: React.ComponentProps<typeof FeatureComparisonTable.Group>['expanded']
  featuredPlanIndex?: number
  planCount?: number
  showFeatureRows?: boolean
  showPlanSummaries?: boolean
}) {
  const {t} = useTranslation('FeatureComparisonTable')
  const visiblePlans = plans.slice(0, planCount)

  return (
    <FeatureComparisonTable>
      <FeatureComparisonTable.Heading>{t('compare_features')}</FeatureComparisonTable.Heading>
      {visiblePlans.map((plan, index) => (
        <FeatureComparisonTable.Item key={plan.name}>
          {showPlanSummaries && index === featuredPlanIndex ? (
            <FeatureComparisonTable.Label>{t('recommended')}</FeatureComparisonTable.Label>
          ) : null}
          <FeatureComparisonTable.ItemHeading>{t(plan.name)}</FeatureComparisonTable.ItemHeading>
          {showPlanSummaries && plan.description ? (
            <FeatureComparisonTable.Description>{t(plan.description)}</FeatureComparisonTable.Description>
          ) : null}
          {showPlanSummaries && plan.price ? (
            <FeatureComparisonTable.Price>{t(plan.price)}</FeatureComparisonTable.Price>
          ) : null}
          {showPlanSummaries ? (
            <FeatureComparisonTable.PrimaryAction as="a" href="#">
              {t('choose_plan', {plan: t(plan.name)})}
            </FeatureComparisonTable.PrimaryAction>
          ) : null}
          {showPlanSummaries && plan.name === 'Team' ? (
            <FeatureComparisonTable.SecondaryAction as="button">
              {t('contact_sales')}
            </FeatureComparisonTable.SecondaryAction>
          ) : null}
        </FeatureComparisonTable.Item>
      ))}
      {children ??
        (showFeatureRows ? (
          <FeatureComparisonTable.Group expanded={expanded}>
            <FeatureComparisonTable.GroupHeading>{t('collaboration')}</FeatureComparisonTable.GroupHeading>
            <FeatureComparisonTable.Row>
              <FeatureComparisonTable.RowHeading>{t('private_repositories')}</FeatureComparisonTable.RowHeading>
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
            <FeatureComparisonTable.Row>
              <FeatureComparisonTable.RowHeading>{t('collaborators')}</FeatureComparisonTable.RowHeading>
              {visiblePlans.map(plan => (
                <FeatureComparisonTable.Cell key={plan.name} variant="unlimited" variantAriaLabel={t('unlimited')} />
              ))}
            </FeatureComparisonTable.Row>
            <FeatureComparisonTable.Row>
              <FeatureComparisonTable.RowHeading>{t('workflow_minutes')}</FeatureComparisonTable.RowHeading>
              {visiblePlans.map((plan, index) => (
                <FeatureComparisonTable.Cell key={plan.name} variant="refresh" variantAriaLabel={t('refresh')}>
                  {t(index > 1 ? 'minutes_enterprise' : index === 1 ? 'minutes_team' : 'minutes_free')}
                </FeatureComparisonTable.Cell>
              ))}
            </FeatureComparisonTable.Row>
          </FeatureComparisonTable.Group>
        ) : null)}
    </FeatureComparisonTable>
  )
}
