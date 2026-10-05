import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {Box, Grid, Stack, Text} from '..'
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

const Comparison = (args: React.ComponentProps<typeof FeatureComparisonTable> = {}) => {
  const {t} = useTranslation('FeatureComparisonTable')
  return (
    <FeatureComparisonTable aria-label={t('copilot_plan_comparison')} {...args}>
      <FeatureComparisonTable.Heading>{t('compare_features')}</FeatureComparisonTable.Heading>
      <FeatureComparisonTable.Item>
        <FeatureComparisonTable.Heading>{t('Free')}</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Price>{t('free_price')}</FeatureComparisonTable.Price>
        <FeatureComparisonTable.SecondaryAction as="a" href="#">
          {t('get_started')}
        </FeatureComparisonTable.SecondaryAction>
      </FeatureComparisonTable.Item>
      <FeatureComparisonTable.Item>
        <FeatureComparisonTable.Label>{t('most_popular')}</FeatureComparisonTable.Label>
        <FeatureComparisonTable.Heading>Pro</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Price>{t('pro_price')}</FeatureComparisonTable.Price>
        <FeatureComparisonTable.PrimaryAction as="a" href="#">
          {t('get_started')}
        </FeatureComparisonTable.PrimaryAction>
      </FeatureComparisonTable.Item>
      <FeatureComparisonTable.Item>
        <FeatureComparisonTable.Heading>Pro+</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Price>{t('pro_plus_price')}</FeatureComparisonTable.Price>
        <FeatureComparisonTable.SecondaryAction as="a" href="#">
          {t('get_started')}
        </FeatureComparisonTable.SecondaryAction>
      </FeatureComparisonTable.Item>
      <FeatureComparisonTable.Group expanded={false}>
        <FeatureComparisonTable.GroupHeading>{t('agent_mode')}</FeatureComparisonTable.GroupHeading>
        <FeatureComparisonTable.Row>
          <FeatureComparisonTable.RowHeading>{t('agent_mode_in_editor')}</FeatureComparisonTable.RowHeading>
          <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')}>
            {t('limited')}
          </FeatureComparisonTable.Cell>
          <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
        </FeatureComparisonTable.Row>
      </FeatureComparisonTable.Group>
      <FeatureComparisonTable.Group expanded>
        <FeatureComparisonTable.GroupHeading>{t('premium_requests')}</FeatureComparisonTable.GroupHeading>
        <FeatureComparisonTable.Row>
          <FeatureComparisonTable.RowHeading>{t('premium_requests')}</FeatureComparisonTable.RowHeading>
          <FeatureComparisonTable.Cell>{t('requests_free')}</FeatureComparisonTable.Cell>
          <FeatureComparisonTable.Cell>{t('requests_pro')}</FeatureComparisonTable.Cell>
          <FeatureComparisonTable.Cell>{t('requests_pro_plus')}</FeatureComparisonTable.Cell>
        </FeatureComparisonTable.Row>
        <FeatureComparisonTable.Row>
          <FeatureComparisonTable.RowHeading>{t('additional_requests')}</FeatureComparisonTable.RowHeading>
          <FeatureComparisonTable.Cell variant="unavailable" variantAriaLabel={t('unavailable')} />
          <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
        </FeatureComparisonTable.Row>
      </FeatureComparisonTable.Group>
      <FeatureComparisonTable.Group expanded>
        <FeatureComparisonTable.GroupHeading>{t('models_in_chat')}</FeatureComparisonTable.GroupHeading>
        <FeatureComparisonTable.Row>
          <FeatureComparisonTable.RowHeading>{t('model_interactions')}</FeatureComparisonTable.RowHeading>
          <FeatureComparisonTable.Cell>{t('requests_free')}</FeatureComparisonTable.Cell>
          <FeatureComparisonTable.Cell>{t('unlimited')}</FeatureComparisonTable.Cell>
          <FeatureComparisonTable.Cell>{t('unlimited')}</FeatureComparisonTable.Cell>
        </FeatureComparisonTable.Row>
        <FeatureComparisonTable.Row>
          <FeatureComparisonTable.RowHeading>{t('available_models')}</FeatureComparisonTable.RowHeading>
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
            <FeatureComparisonTable.Cell key={index}>
              <Stack direction="vertical" gap="none" padding="none" alignItems="center">
                {models.map(model => (
                  <Text key={model} size="100" variant="muted">
                    {model.replace('(Preview)', `(${t('preview')})`)}
                  </Text>
                ))}
              </Stack>
            </FeatureComparisonTable.Cell>
          ))}
        </FeatureComparisonTable.Row>
      </FeatureComparisonTable.Group>
    </FeatureComparisonTable>
  )
}

export const Default: Story = {
  render: () => <Comparison />,
}

export const Playground: Story = {
  render: args => <Comparison {...args} />,
}
