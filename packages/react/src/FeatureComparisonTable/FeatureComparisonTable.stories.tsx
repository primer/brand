import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {Box, Grid} from '..'
import {AnimationVariants} from '../animation'
import {FeatureComparisonTable} from '.'

const meta = {
  title: 'Components/FeatureComparisonTable',
  component: FeatureComparisonTable,
  argTypes: {
    animate: {
      control: 'select',
      options: [undefined, ...AnimationVariants],
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
  render: function DefaultStory(args) {
    const {t} = useTranslation('FeatureComparisonTable')

    return (
      <FeatureComparisonTable {...args}>
        <FeatureComparisonTable.Heading>{t('compare_features')}</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading>{t('Free')}</FeatureComparisonTable.ItemHeading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading>{t('Team')}</FeatureComparisonTable.ItemHeading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group>
          <FeatureComparisonTable.GroupHeading>{t('collaboration')}</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('private_repositories')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>
    )
  },
}

export const Playground: Story = {
  ...Default,
  args: {
    animate: undefined,
  },
}
