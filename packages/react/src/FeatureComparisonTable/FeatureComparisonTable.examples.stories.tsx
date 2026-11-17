import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {Box, Grid, InlineLink, Stack, Text} from '..'
import {FeatureComparisonTable} from '.'

const meta = {
  title: 'Components/FeatureComparisonTable/Examples',
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

export const CopilotIndividualPlans: Story = {
  render: function CopilotIndividualPlansStory() {
    const {t} = useTranslation('FeatureComparisonTable')
    return (
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>{t('copilot_plan_comparison')}</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading>{t('Free')}</FeatureComparisonTable.ItemHeading>
          <FeatureComparisonTable.Description>{t('for_individuals')}</FeatureComparisonTable.Description>
          <FeatureComparisonTable.Price>{t('free_price')}</FeatureComparisonTable.Price>
          <FeatureComparisonTable.SecondaryAction as="a" href="#">
            {t('choose_plan', {plan: t('Free')})}
          </FeatureComparisonTable.SecondaryAction>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Label>{t('most_popular')}</FeatureComparisonTable.Label>
          <FeatureComparisonTable.ItemHeading>Pro</FeatureComparisonTable.ItemHeading>
          <FeatureComparisonTable.Description>{t('for_daily_development')}</FeatureComparisonTable.Description>
          <FeatureComparisonTable.Price>{t('pro_price')}</FeatureComparisonTable.Price>
          <FeatureComparisonTable.PrimaryAction as="a" href="#">
            {t('choose_plan', {plan: 'Pro'})}
          </FeatureComparisonTable.PrimaryAction>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.ItemHeading>Pro+</FeatureComparisonTable.ItemHeading>
          <FeatureComparisonTable.Description>{t('for_demanding_workflows')}</FeatureComparisonTable.Description>
          <FeatureComparisonTable.Price>{t('pro_plus_price')}</FeatureComparisonTable.Price>
          <FeatureComparisonTable.SecondaryAction as="a" href="#">
            {t('choose_plan', {plan: 'Pro+'})}
          </FeatureComparisonTable.SecondaryAction>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded>
          <FeatureComparisonTable.GroupHeading>{t('agent_mode')}</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('agent_mode_in_editor')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>{t('agent_mode_description')}</FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')}>
              {t('limited')}
            </FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('code_suggestions')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>
              {t('code_suggestions_description')}
            </FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')}>
              {t('limited')}
            </FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell variant="unlimited" variantAriaLabel={t('unlimited')} />
            <FeatureComparisonTable.Cell variant="unlimited" variantAriaLabel={t('unlimited')} />
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('next_edit_suggestions')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>
              {t('next_edit_suggestions_description')}
            </FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="unavailable" variantAriaLabel={t('unavailable')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('code_review')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>
              {t('code_review_description')}
            </FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="unavailable" variantAriaLabel={t('unavailable')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
        <FeatureComparisonTable.Group expanded>
          <FeatureComparisonTable.GroupHeading>{t('premium_requests')}</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('premium_requests')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>
              {t('premium_requests_description')}
            </FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="refresh" variantAriaLabel={t('refresh')}>
              {t('requests_free')}
            </FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell variant="refresh" variantAriaLabel={t('refresh')}>
              {t('requests_pro')}
            </FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell variant="refresh" variantAriaLabel={t('refresh')}>
              {t('requests_pro_plus')}
            </FeatureComparisonTable.Cell>
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('additional_requests')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.Cell variant="unavailable" variantAriaLabel={t('unavailable')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
        <FeatureComparisonTable.Group expanded>
          <FeatureComparisonTable.GroupHeading id="copilot-chat">
            {t('models_in_chat')}
          </FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('model_interactions')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.Cell>{t('requests_free')}</FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell variant="unlimited" variantAriaLabel={t('unlimited')} />
            <FeatureComparisonTable.Cell variant="unlimited" variantAriaLabel={t('unlimited')} />
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('editor_chat')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>
              {t('editor_chat_description')}
            </FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')}>
              {t('limited')}
            </FeatureComparisonTable.Cell>
            <FeatureComparisonTable.Cell variant="unlimited" variantAriaLabel={t('unlimited')} />
            <FeatureComparisonTable.Cell variant="unlimited" variantAriaLabel={t('unlimited')} />
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('custom_instructions')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>
              {t('custom_instructions_description')} <InlineLink href="#copilot-chat">{t('models_in_chat')}</InlineLink>
            </FeatureComparisonTable.RowDescription>
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
            <FeatureComparisonTable.Cell variant="included" variantAriaLabel={t('included')} />
          </FeatureComparisonTable.Row>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>{t('available_models')}</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.RowDescription>
              {t('available_models_description')}
            </FeatureComparisonTable.RowDescription>
            {[
              [
                'Anthropic Claude Haiku 4.5',
                '-',
                '-',
                '-',
                '-',
                '-',
                '-',
                'OpenAI GPT-4.1',
                '-',
                '-',
                'OpenAI GPT-5 mini',
                'Raptor mini (Preview)',
              ],
              [
                'Anthropic Claude Haiku 4.5',
                'Anthropic Claude Sonnet 4.5',
                'Anthropic Claude Sonnet 4',
                '-',
                '-',
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
                  {models.map((model, modelIndex) => (
                    <Text key={modelIndex} size="100" variant="muted">
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
  },
}

export const CopilotIndividualPlansDarkMode: Story = {
  ...CopilotIndividualPlans,
  parameters: {
    backgrounds: {default: 'dark'},
    colorMode: 'dark',
  },
}
