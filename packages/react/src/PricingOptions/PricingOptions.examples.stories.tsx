import React from 'react'
import {useTranslation} from 'react-i18next'
import type {Meta, StoryObj} from '@storybook/react'

import {PricingOptions} from '.'
import {Box, Grid, InlineLink} from '..'
import {SparkleFillIcon} from '@primer/octicons-react'

const decorators = Story => (
  <Box backgroundColor="default" paddingBlockStart="spacious" paddingBlockEnd="spacious" style={{minHeight: '100vh'}}>
    <Grid>
      <Grid.Column span={12}>
        <Story />
      </Grid.Column>
    </Grid>
  </Box>
)

export default {
  title: 'Components/PricingOptions/Examples',
  component: PricingOptions,
} satisfies Meta<typeof PricingOptions>

type Story = StoryObj<typeof PricingOptions>

export const CopilotIndividualPlans: Story = {
  decorators: [decorators],
  render: function CopilotIndividualPlansExample() {
    const {t} = useTranslation('PricingOptions')

    return (
      <PricingOptions variant="default-gradient">
        <PricingOptions.Item>
          <PricingOptions.Heading>{t('freePlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('freePlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price>0</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('monthlyAgentOrChatRequests')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('monthlyCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('claudeAndGptAccess')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
            {t('getStarted')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#" variant="subtle">
            {t('openInVsCode')}
          </PricingOptions.SecondaryAction>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.Heading>{t('proPlan')}</PricingOptions.Heading>
          <PricingOptions.Label>{t('mostPopular')}</PricingOptions.Label>
          <PricingOptions.Description>{t('unlimitedCompletionsDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
            {t('getStarted')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('everythingInFree')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedGpt4oChats')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedCodeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReviewWithSonnet37')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('sixTimesPremiumRequests')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>
            {t('verifiedStudentsFootnote')} <InlineLink href="#">{t('learnMore')}</InlineLink>
          </PricingOptions.Footnote>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Pro+</PricingOptions.Heading>
          <PricingOptions.Description>{t('maximumFlexibilityAndModelChoice')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonthOr390PerYear')}>39</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
            {t('getStarted')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('everythingInPro')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('allModelsIncludingGpt45')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('thirtyTimesPremiumRequests')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}
export const CopilotBusinessPlans: Story = {
  decorators: [decorators],
  render: function CopilotBusinessPlansExample() {
    const {t} = useTranslation('PricingOptions')

    return (
      <PricingOptions variant="default-gradient">
        <PricingOptions.Item>
          <PricingOptions.Heading>Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('proPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedGpt4oChats')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReviewWithSonnet35And37')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('premiumRequestsPerUser')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('userManagementAndUsageMetrics')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnityAndDataPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
            {t('getStarted')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Enterprise</PricingOptions.Heading>
          <PricingOptions.Label>{t('bestValue')}</PricingOptions.Label>
          <PricingOptions.Description>{t('enterpriseAgentsDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
            {t('getStarted')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#" variant="subtle">
            {t('openInVsCode')}
          </PricingOptions.SecondaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('everythingInBusiness')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('allModelsIncludingGpt45')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterprisePremiumRequests')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const WithGridLines: Story = {
  render: function WithGridLinesExample() {
    const {t} = useTranslation('PricingOptions')

    return (
      <Box borderBlockStartWidth="thin" borderColor="subtle" borderStyle="solid" marginBlockStart="spacious">
        <Box backgroundColor="default" borderBlockEndWidth="thin" borderColor="subtle" borderStyle="solid">
          <Grid>
            <Grid.Column span={12}>
              <PricingOptions hasGridLines style={{marginBlock: 'calc(var(--brand-borderWidth-thin) * -1)'}}>
                <PricingOptions.Item>
                  <PricingOptions.Heading>{t('freePlan')}</PricingOptions.Heading>
                  <PricingOptions.Description>{t('freePlanDescription')}</PricingOptions.Description>
                  <PricingOptions.Price>0</PricingOptions.Price>
                  <PricingOptions.FeatureList>
                    <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('monthlyAgentOrChatRequests')}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('monthlyCompletions')}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem
                      leadingVisualAriaLabel={t('includes')}
                      leadingVisual={SparkleFillIcon}
                      leadingVisualFill="var(--base-color-scale-purple-5)"
                    >
                      {t('claudeAndGptAccess')}
                    </PricingOptions.FeatureListItem>
                  </PricingOptions.FeatureList>
                  <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
                    {t('getStarted')}
                  </PricingOptions.PrimaryAction>
                  <PricingOptions.SecondaryAction as="a" href="#" variant="subtle">
                    {t('openInVsCode')}
                  </PricingOptions.SecondaryAction>
                </PricingOptions.Item>
                <PricingOptions.Item>
                  <PricingOptions.Heading>{t('proPlan')}</PricingOptions.Heading>
                  <PricingOptions.Label>{t('mostPopular')}</PricingOptions.Label>
                  <PricingOptions.Description>{t('unlimitedCompletionsDescription')}</PricingOptions.Description>
                  <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
                  <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
                    {t('getStarted')}
                  </PricingOptions.PrimaryAction>
                  <PricingOptions.FeatureList>
                    <PricingOptions.FeatureListHeading>{t('everythingInFree')}</PricingOptions.FeatureListHeading>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('unlimitedGpt4oChats')}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('unlimitedCodeCompletions')}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('codeReviewWithSonnet37')}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('sixTimesPremiumRequests')}
                    </PricingOptions.FeatureListItem>
                  </PricingOptions.FeatureList>
                  <PricingOptions.Footnote>
                    {t('verifiedStudentsFootnote')} <InlineLink href="#">{t('learnMore')}</InlineLink>
                  </PricingOptions.Footnote>
                </PricingOptions.Item>

                <PricingOptions.Item>
                  <PricingOptions.Heading>Pro+</PricingOptions.Heading>
                  <PricingOptions.Description>{t('maximumFlexibilityAndModelChoice')}</PricingOptions.Description>
                  <PricingOptions.Price trailingText={t('perMonthOr390PerYear')}>39</PricingOptions.Price>
                  <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
                    {t('getStarted')}
                  </PricingOptions.PrimaryAction>
                  <PricingOptions.FeatureList>
                    <PricingOptions.FeatureListHeading>{t('everythingInPro')}</PricingOptions.FeatureListHeading>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('everythingInCopilotIndividualPlus')}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('allModelsIncludingGpt45')}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('thirtyTimesPremiumRequests')}
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                      {t('enterpriseGradeSecuritySafetyAndPrivacy')}
                    </PricingOptions.FeatureListItem>
                  </PricingOptions.FeatureList>
                </PricingOptions.Item>
              </PricingOptions>
            </Grid.Column>
          </Grid>
        </Box>
      </Box>
    )
  },
}
