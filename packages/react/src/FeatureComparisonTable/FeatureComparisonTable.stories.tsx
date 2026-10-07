import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {Box, Grid} from '..'
import {FeatureComparisonTable} from '.'

const meta = {
  title: 'Components/FeatureComparisonTable',
  component: FeatureComparisonTable,
  argTypes: {
    hasStickyHeaders: {
      control: 'boolean',
    },
    rowHighlighting: {
      control: 'boolean',
    },
  },
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

export const Default: Story = {
  render: () => <Comparison />,
}

export const Playground: Story = {
  render: args => <Comparison {...args} />,
}

function Comparison(props: Omit<React.ComponentProps<typeof FeatureComparisonTable>, 'children'>) {
  const {t} = useTranslation('FeatureComparisonTable')

  return (
    <FeatureComparisonTable {...props}>
      <FeatureComparisonTable.Heading>{t('compare_features')}</FeatureComparisonTable.Heading>
      <FeatureComparisonTable.Item>
        <FeatureComparisonTable.Heading>{t('Free')}</FeatureComparisonTable.Heading>
      </FeatureComparisonTable.Item>
      <FeatureComparisonTable.Item>
        <FeatureComparisonTable.Heading>{t('Team')}</FeatureComparisonTable.Heading>
      </FeatureComparisonTable.Item>
      <FeatureComparisonTable.Group>
        <FeatureComparisonTable.GroupHeading>{t('collaboration')}</FeatureComparisonTable.GroupHeading>
        <FeatureComparisonTable.Row>
          <FeatureComparisonTable.RowHeading>{t('private_repositories')}</FeatureComparisonTable.RowHeading>
          <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
        </FeatureComparisonTable.Row>
        <FeatureComparisonTable.Row>
          <FeatureComparisonTable.RowHeading>{t('support')}</FeatureComparisonTable.RowHeading>
          <FeatureComparisonTable.Cell>{t('community')}</FeatureComparisonTable.Cell>
          <FeatureComparisonTable.Cell>{t('standard')}</FeatureComparisonTable.Cell>
        </FeatureComparisonTable.Row>
      </FeatureComparisonTable.Group>
    </FeatureComparisonTable>
  )
}
