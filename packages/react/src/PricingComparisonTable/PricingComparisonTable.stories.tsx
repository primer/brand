import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {Box, Grid, Stack, Text} from '..'
import {PricingComparisonTable} from '.'

const meta = {
  title: 'Components/PricingComparisonTable',
  component: PricingComparisonTable,
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
} satisfies Meta<typeof PricingComparisonTable>

export default meta

type Story = StoryObj<typeof PricingComparisonTable>

const Comparison = (args: React.ComponentProps<typeof PricingComparisonTable> = {}) => {
  const {t} = useTranslation('PricingComparisonTable')
  return (
    <PricingComparisonTable aria-label={t('copilot_plan_comparison')} {...args}>
      <PricingComparisonTable.Heading>{t('compare_features')}</PricingComparisonTable.Heading>
      <PricingComparisonTable.Item>
        <PricingComparisonTable.Heading>{t('Free')}</PricingComparisonTable.Heading>
        <PricingComparisonTable.Price>{t('free_price')}</PricingComparisonTable.Price>
        <PricingComparisonTable.SecondaryAction as="a" href="#">
          {t('get_started')}
        </PricingComparisonTable.SecondaryAction>
      </PricingComparisonTable.Item>
      <PricingComparisonTable.Item>
        <PricingComparisonTable.Label>{t('most_popular')}</PricingComparisonTable.Label>
        <PricingComparisonTable.Heading>Pro</PricingComparisonTable.Heading>
        <PricingComparisonTable.Price>{t('pro_price')}</PricingComparisonTable.Price>
        <PricingComparisonTable.PrimaryAction as="a" href="#">
          {t('get_started')}
        </PricingComparisonTable.PrimaryAction>
      </PricingComparisonTable.Item>
      <PricingComparisonTable.Item>
        <PricingComparisonTable.Heading>Pro+</PricingComparisonTable.Heading>
        <PricingComparisonTable.Price>{t('pro_plus_price')}</PricingComparisonTable.Price>
        <PricingComparisonTable.SecondaryAction as="a" href="#">
          {t('get_started')}
        </PricingComparisonTable.SecondaryAction>
      </PricingComparisonTable.Item>
      <PricingComparisonTable.Group expanded={false}>
        <PricingComparisonTable.GroupHeading>{t('agent_mode')}</PricingComparisonTable.GroupHeading>
        <PricingComparisonTable.Row>
          <PricingComparisonTable.RowHeading>{t('agent_mode_in_editor')}</PricingComparisonTable.RowHeading>
          <PricingComparisonTable.Cell variant="included" variantAriaLabel={t('included')}>
            {t('limited')}
          </PricingComparisonTable.Cell>
          <PricingComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          <PricingComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
        </PricingComparisonTable.Row>
      </PricingComparisonTable.Group>
      <PricingComparisonTable.Group expanded>
        <PricingComparisonTable.GroupHeading>{t('premium_requests')}</PricingComparisonTable.GroupHeading>
        <PricingComparisonTable.Row>
          <PricingComparisonTable.RowHeading>{t('premium_requests')}</PricingComparisonTable.RowHeading>
          <PricingComparisonTable.Cell>{t('requests_free')}</PricingComparisonTable.Cell>
          <PricingComparisonTable.Cell>{t('requests_pro')}</PricingComparisonTable.Cell>
          <PricingComparisonTable.Cell>{t('requests_pro_plus')}</PricingComparisonTable.Cell>
        </PricingComparisonTable.Row>
        <PricingComparisonTable.Row>
          <PricingComparisonTable.RowHeading>{t('additional_requests')}</PricingComparisonTable.RowHeading>
          <PricingComparisonTable.Cell variant="unavailable" variantAriaLabel={t('unavailable')} />
          <PricingComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          <PricingComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
        </PricingComparisonTable.Row>
      </PricingComparisonTable.Group>
      <PricingComparisonTable.Group expanded>
        <PricingComparisonTable.GroupHeading>{t('models_in_chat')}</PricingComparisonTable.GroupHeading>
        <PricingComparisonTable.Row>
          <PricingComparisonTable.RowHeading>{t('model_interactions')}</PricingComparisonTable.RowHeading>
          <PricingComparisonTable.Cell>{t('requests_free')}</PricingComparisonTable.Cell>
          <PricingComparisonTable.Cell>{t('unlimited')}</PricingComparisonTable.Cell>
          <PricingComparisonTable.Cell>{t('unlimited')}</PricingComparisonTable.Cell>
        </PricingComparisonTable.Row>
        <PricingComparisonTable.Row>
          <PricingComparisonTable.RowHeading>{t('available_models')}</PricingComparisonTable.RowHeading>
          {[
            ['Anthropic Claude Haiku 4.5', 'OpenAI GPT-4.1', 'OpenAI GPT-5 mini', 'Raptor mini (Preview)'],
            [
              'Anthropic Claude Haiku 4.5',
              'Anthropic Claude Sonnet 4.5',
              'Anthropic Claude Sonnet 4',
              'Google Gemini 2.5 Pro',
              'Google Gemini 3 Pro (Preview)',
              'OpenAI GPT-4.1',
              'OpenAI GPT-5',
              'OpenAI GPT-5-Codex (Preview)',
              'OpenAI GPT-5 mini',
              'Raptor mini (Preview)',
            ],
            [
              'Anthropic Claude Haiku 4.5',
              'Anthropic Claude Sonnet 4.5',
              'Anthropic Claude Sonnet 4',
              'Anthropic Claude Opus 4.1',
              'Anthropic Claude Opus 4.5',
              'Google Gemini 2.5 Pro',
              'Google Gemini 3 Pro (Preview)',
              'OpenAI GPT-4.1',
              'OpenAI GPT-5',
              'OpenAI GPT-5-Codex (Preview)',
              'OpenAI GPT-5 mini',
              'Raptor mini (Preview)',
            ],
          ].map((models, index) => (
            <PricingComparisonTable.Cell key={index}>
              <Stack direction="vertical" gap="none" padding="none" alignItems="center">
                {models.map(model => (
                  <Text key={model} size="100" variant="muted">
                    {model.replace('(Preview)', `(${t('preview')})`)}
                  </Text>
                ))}
              </Stack>
            </PricingComparisonTable.Cell>
          ))}
        </PricingComparisonTable.Row>
      </PricingComparisonTable.Group>
    </PricingComparisonTable>
  )
}

export const Default: Story = {
  render: () => <Comparison />,
}

export const Playground: Story = {
  render: args => <Comparison {...args} />,
}
