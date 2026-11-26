import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {SparkleFillIcon} from '@primer/octicons-react'
import {Trans, useTranslation} from 'react-i18next'

import {PricingOptions} from '.'
import {ActionMenu, Box, Grid, InlineLink, Stack, Text} from '..'
import imageExample from '../fixtures/images/bento/3.png'
import {VisualStudioCodeLogo} from '../fixtures/third-party-logos/VisualStudioCodeLogo'

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
  title: 'Components/PricingOptions/Features',
  component: PricingOptions,
  decorators: [decorators],
} satisfies Meta<typeof PricingOptions>

type Story = StoryObj<typeof PricingOptions>

export const CardsVariant: Story = {
  render: function CardsVariantExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions variant="cards">
        <PricingOptions.Item>
          <PricingOptions.Heading>{t('freePlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('gettingStartedDescription')}</PricingOptions.Description>
          <PricingOptions.Price>0</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={false} hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.Heading>{t('proPlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={false} hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Pro+</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#">
            {t('contactSales')}
          </PricingOptions.SecondaryAction>
          <PricingOptions.FeatureList expanded={false} hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.Heading>Max</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterprisePlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={false} hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const DefaultGradientVariant: Story = {
  render: function DefaultGradientVariantExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions variant="default-gradient">
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>

          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const CardsGradientVariant: Story = {
  render: function CardsGradientVariantExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions variant="cards-gradient">
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>

          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const LeadingComponent: Story = {
  render: function LeadingComponentExample() {
    const {t} = useTranslation('PricingOptions')

    const Image = () => (
      <Box marginBlockEnd={24}>
        <img src={imageExample} alt="Copilot Individual" />
      </Box>
    )

    return (
      <Stack direction="vertical">
        <PricingOptions variant="cards">
          <PricingOptions.Item leadingComponent={<Image />}>
            <PricingOptions.Heading>Copilot</PricingOptions.Heading>
            <PricingOptions.Description>{t('copilotInTheCodingEnvironment')}</PricingOptions.Description>
            <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
            <PricingOptions.FeatureList>
              <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
              <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                {t('everythingInCopilotBusinessPlus')}
              </PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                {t('chatInIdeAndMobile')}
              </PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                {t('cliAssistance')}
              </PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                {t('codeCompletions')}
              </PricingOptions.FeatureListItem>
            </PricingOptions.FeatureList>
            <PricingOptions.PrimaryAction as="a" href="#">
              {t('buyNow')}
            </PricingOptions.PrimaryAction>
            <PricingOptions.SecondaryAction as="a" href="#">
              {t('contactSales')}
            </PricingOptions.SecondaryAction>
          </PricingOptions.Item>
          <PricingOptions.Item leadingComponent={<Image />}>
            <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
            <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
            <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
            <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
            <PricingOptions.FeatureList>
              <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
              <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                {t('everythingInCopilotBusinessPlus')}
              </PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                {t('chatInIdeAndMobile')}
              </PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                {t('cliAssistance')}
              </PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
                {t('codeCompletions')}
              </PricingOptions.FeatureListItem>
            </PricingOptions.FeatureList>
            <PricingOptions.PrimaryAction as="a" href="#">
              {t('joinWaitlist')}
            </PricingOptions.PrimaryAction>
          </PricingOptions.Item>
        </PricingOptions>
      </Stack>
    )
  },
}

export const ActionsMessage: Story = {
  render: function ActionsMessageExample() {
    const {t} = useTranslation('PricingOptions')

    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>{t('freePlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('freePlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price>0</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
            {t('getStarted')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#" variant="subtle">
            {t('openInVsCode')}
          </PricingOptions.SecondaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('monthlyAgentOrChatRequests')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('monthlyCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('haikuAndGptMiniAccess')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              Copilot CLI
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('mostPopular')}</PricingOptions.Label>
          <PricingOptions.Heading>{t('proPlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('proPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>10</PricingOptions.Price>
          <PricingOptions.ActionsMessage>
            <Text as="p" size="200" variant="muted">
              {t('actionsMessage')} <InlineLink href="#">{t('learnMore')}</InlineLink>
            </Text>
          </PricingOptions.ActionsMessage>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('everythingInFree')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('copilotCloudAgent')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('copilotCodeReview')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('claudeAndCodexAccess')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('monthlyPremiumRequests')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedGptMiniChats')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedInlineSuggestions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Pro+</PricingOptions.Heading>
          <PricingOptions.Description>{t('scaleWithAgentsAndMoreModels')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.ActionsMessage>
            <Text as="p" size="200" variant="muted">
              {t('actionsMessage')} <InlineLink href="#">{t('learnMore')}</InlineLink>
            </Text>
          </PricingOptions.ActionsMessage>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('everythingInPro')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('allModelsIncludingOpus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('fiveTimesPremiumRequests')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-3)"
            >
              {t('accessToGitHubSpark')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('premiumSupport')} <InlineLink href="#">{t('learnMoreAboutPremiumSupport')}</InlineLink>
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const ActionsMessageWithActions: Story = {
  render: function ActionsMessageWithActionsExample() {
    const {t} = useTranslation('PricingOptions')

    return (
      <PricingOptions variant="cards">
        <PricingOptions.Item>
          <PricingOptions.Heading>{t('freePlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('freePlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price>0</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#" variant="primary">
            {t('getStarted')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#" variant="subtle">
            {t('openInVsCode')}
          </PricingOptions.SecondaryAction>
          <PricingOptions.FeatureList hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('monthlyAgentOrChatRequests')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('monthlyCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('haikuAndGptMiniAccess')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              Copilot CLI
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('mostPopular')}</PricingOptions.Label>
          <PricingOptions.Heading>{t('proPlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('proPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>10</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="button" variant="primary" disabled>
            {t('upgradeNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.ActionsMessage>
            <Text as="p" size="200" variant="muted">
              {t('actionsMessage')} <InlineLink href="#">{t('learnMore')}</InlineLink>
            </Text>
          </PricingOptions.ActionsMessage>
          <PricingOptions.FeatureList hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('everythingInFree')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('copilotCloudAgent')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('copilotCodeReview')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('claudeAndCodexAccess')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('monthlyPremiumRequests')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedGptMiniChats')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedInlineSuggestions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const OneOption: Story = {
  render: function OneOptionExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#">
            {t('contactSales')}
          </PricingOptions.SecondaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const TwoOptions: Story = {
  render: function TwoOptionsExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot</PricingOptions.Heading>
          <PricingOptions.Description>{t('copilotInTheCodingEnvironment')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#">
            {t('contactSales')}
          </PricingOptions.SecondaryAction>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const ThreeOptions: Story = {
  render: function ThreeOptionsExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#">
            {t('contactSales')}
          </PricingOptions.SecondaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const FourOptions: Story = {
  render: function FourOptionsExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>{t('freePlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('gettingStartedDescription')}</PricingOptions.Description>
          <PricingOptions.Price>0</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#">
            {t('contactSales')}
          </PricingOptions.SecondaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const WithFeatureSets: Story = {
  render: function WithFeatureSetsExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListGroupHeading>{t('baseFeatures')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>

            <PricingOptions.FeatureListGroupHeading>{t('security')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>

          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>

          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#">
            {t('contactSales')}
          </PricingOptions.SecondaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListGroupHeading>{t('baseFeatures')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotIndividual')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>

            <PricingOptions.FeatureListGroupHeading>{t('security')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListGroupHeading>{t('baseFeatures')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusiness')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('documentationSearchAndSummaries')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('pullRequestSummaries')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReviewSkills')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListGroupHeading>{t('security')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const WithIncludedAndExcludedFeatures: Story = {
  render: function WithIncludedAndExcludedFeaturesExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListGroupHeading>{t('chat')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedMessagesInteractionsAndHistory')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('contextAwareCodingSupportAndExplanations')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('excludes')} variant="excluded">
              {t('debuggingAndSecurityRemediationAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('excludes')} variant="excluded">
              {t('repositoryBasedSemanticSearch')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('excludes')} variant="excluded">
              {t('accessYourKnowledgeBase')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListGroupHeading>{t('codeCompletion')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeSuggestionsAsYouType')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('commentsToCode')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('excludes')} variant="excluded">
              {t('fineTunedModelsComingSoon')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>

          <PricingOptions.Footnote>
            <Trans t={t} i18nKey="linkedStudentsFootnote" components={{projects: <InlineLink href="#" />}} />
          </PricingOptions.Footnote>

          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#">
            {t('contactSales')}
          </PricingOptions.SecondaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListGroupHeading>{t('chat')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedMessagesInteractionsAndHistory')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('contextAwareCodingSupportAndExplanations')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('debuggingAndSecurityRemediationAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('repositoryBasedSemanticSearch')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('excludes')} variant="excluded">
              {t('accessYourKnowledgeBase')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListGroupHeading>{t('codeCompletion')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeSuggestionsAsYouType')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('commentsToCode')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('excludes')} variant="excluded">
              {t('fineTunedModelsComingSoon')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListGroupHeading>{t('chat')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedMessagesInteractionsAndHistory')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('contextAwareCodingSupportAndExplanations')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('debuggingAndSecurityRemediationAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('repositoryBasedSemanticSearch')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('accessYourKnowledgeBase')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListGroupHeading>{t('codeCompletion')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeSuggestionsAsYouType')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('commentsToCode')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('fineTunedModelsComingSoon')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const WithoutFeatures: Story = {
  render: function WithoutFeaturesExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const CenterAligned: Story = {
  render: function CenterAlignedExample() {
    const {t} = useTranslation('PricingOptions')

    return (
      <PricingOptions align="center">
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListGroupHeading>{t('chat')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedMessagesInteractionsAndHistory')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('contextAwareCodingSupportAndExplanations')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('debuggingAndSecurityRemediationAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('repositoryBasedSemanticSearch')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('accessYourKnowledgeBase')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListGroupHeading>{t('codeCompletion')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeSuggestionsAsYouType')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('commentsToCode')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('fineTunedModelsComingSoon')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListGroupHeading>{t('chat')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedMessagesInteractionsAndHistory')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('contextAwareCodingSupportAndExplanations')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('debuggingAndSecurityRemediationAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('repositoryBasedSemanticSearch')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('accessYourKnowledgeBase')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListGroupHeading>{t('codeCompletion')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeSuggestionsAsYouType')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('commentsToCode')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('fineTunedModelsComingSoon')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListGroupHeading>{t('chat')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('unlimitedMessagesInteractionsAndHistory')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('contextAwareCodingSupportAndExplanations')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('debuggingAndSecurityRemediationAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('repositoryBasedSemanticSearch')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('accessYourKnowledgeBase')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListGroupHeading>{t('codeCompletion')}</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeSuggestionsAsYouType')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('commentsToCode')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('fineTunedModelsComingSoon')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const CollapsedFeatures: Story = {
  render: function CollapsedFeaturesExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#">
            {t('contactSales')}
          </PricingOptions.SecondaryAction>

          <PricingOptions.FeatureList expanded={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const WithCustomFeatureListHeading: Story = {
  render: function WithCustomFeatureListHeadingExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('baseFeatures')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.SecondaryAction as="a" href="#">
            {t('contactSales')}
          </PricingOptions.SecondaryAction>

          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('extendedFeatures')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('enterpriseOnlyFeatures')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const WithCustomFeatureListItemLeadingVisual: Story = {
  render: function WithCustomFeatureListItemLeadingVisualExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>

          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              leadingVisual={SparkleFillIcon}
              leadingVisualFill="var(--base-color-scale-purple-5)"
            >
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}
export const CollapsedFeaturesNoDividers: Story = {
  render: function CollapsedFeaturesNoDividersExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={false} hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>

          <PricingOptions.FeatureList expanded={false} hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={false} hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const ExpandedNarrow: Story = {
  render: function ExpandedNarrowExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={{narrow: true, regular: true, wide: true}}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>

          <PricingOptions.FeatureList expanded={{narrow: true, regular: true, wide: true}}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterpriseCloudPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={{narrow: true, regular: true, wide: true}}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const ExpandedTablet: Story = {
  ...ExpandedNarrow,
  globals: {
    viewport: {value: 'ipad'},
  },
}

export const HideFeatureListOnNarrowAndRegular: Story = {
  name: 'Hide feature list on all viewports except wide',
  render: function HideFeatureListOnNarrowAndRegularExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList expanded={{narrow: false, regular: false, wide: true}}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

export const HideFeatureListOnNarrowAndRegularNarrow = {
  ...HideFeatureListOnNarrowAndRegular,
  name: 'Hide feature list on all viewports except wide (narrow)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const WithInfoTooltips: Story = {
  render: function WithInfoTooltipsExample() {
    const {t} = useTranslation('PricingOptions')
    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('chatInIdeAndMobile')})}
              infoTooltip={t('interactWithCopilotUsingNaturalLanguage')}
            >
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('cliAssistance')})}
              infoTooltip={t('getHelpDirectlyInYourTerminal')}
            >
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
          <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
          <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>19</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('buyNow')}
          </PricingOptions.PrimaryAction>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('everythingInCopilotIndividualPlus')})}
              infoTooltip={t('everythingFromProAndMore')}
            >
              {t('everythingInCopilotIndividualPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('chatInIdeAndMobile')})}
              infoTooltip={t('interactWithCopilotUsingNaturalLanguage')}
            >
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('cliAssistance')})}
              infoTooltip={t('getHelpDirectlyInYourTerminal')}
            >
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('securityVulnerabilityFilter')})}
              infoTooltip="Lipsumet dolor consectetuor elit sit amet."
            >
              {t('securityVulnerabilityFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeReferencing')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('publicCodeFilter')})}
              infoTooltip={t('filterOutSuggestionsMatchingPublicCode')}
            >
              {t('publicCodeFilter')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('ipIndemnity')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('enterpriseGradeSecuritySafetyAndPrivacy')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>

        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
          <PricingOptions.Description>{t('enterprisePlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price trailingText={t('perUserMonth')}>39</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('everythingInCopilotBusinessPlus')})}
              infoTooltip={t('everythingFromProAndMore')}
            >
              {t('everythingInCopilotBusinessPlus')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('chatInIdeAndMobile')})}
              infoTooltip={t('interactWithCopilotUsingNaturalLanguage')}
            >
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem
              leadingVisualAriaLabel={t('includes')}
              infoTooltipAriaLabel={t('featureInfo', {feature: t('cliAssistance')})}
              infoTooltip={t('getHelpDirectlyInYourTerminal')}
            >
              {t('cliAssistance')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('joinWaitlist')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}

function PricingOptionsWithCustomTriggerLabel({customContent}: {customContent?: React.ReactNode}) {
  const {t} = useTranslation('PricingOptions')

  return (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
        <PricingOptions.Price trailingText={t('perMonth100PerYear')}>10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem
            leadingVisualAriaLabel={t('includes')}
            infoTooltip={t('interactWithCopilotUsingNaturalLanguage')}
            infoTooltipAriaLabel={t('chatInfoLabel')}
          >
            <>
              {t('chatInIdeAndMobile')}
              {customContent ? <Text>{customContent}</Text> : null}
            </>
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
            {t('codeCompletions')}
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          {t('startFreeTrial')}
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}

export const WithInfoTooltipsAndCustomTriggerLabel: Story = {
  render: function WithInfoTooltipsAndCustomTriggerLabelExample() {
    const {t} = useTranslation('PricingOptions')
    return <PricingOptionsWithCustomTriggerLabel customContent={t('customFootnote')} />
  },
}

export const WithMenuAction: Story = {
  render: function WithMenuActionExample() {
    const {t} = useTranslation('PricingOptions')

    return (
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>{t('freePlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('freePlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price>0</PricingOptions.Price>
          <PricingOptions.MenuAction>
            <ActionMenu mode="split-button">
              <ActionMenu.Button variant="secondary" as="a" href="#" leadingVisual={<VisualStudioCodeLogo />}>
                {t('openInYourIde')}
              </ActionMenu.Button>
              <ActionMenu.Overlay aria-label={t('moreOptions')}>
                <ActionMenu.Item as="a" href="#">
                  {t('openInVsCode')}
                </ActionMenu.Item>
                <ActionMenu.Item as="a" href="#">
                  {t('openInJetBrains')}
                </ActionMenu.Item>
              </ActionMenu.Overlay>
            </ActionMenu>
          </PricingOptions.MenuAction>
          <PricingOptions.FeatureList expanded={false} hasDivider={false}>
            <PricingOptions.FeatureListHeading>{t('includedHeading')}</PricingOptions.FeatureListHeading>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('codeCompletions')}
            </PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem leadingVisualAriaLabel={t('includes')}>
              {t('chatInIdeAndMobile')}
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.Heading>{t('proPlan')}</PricingOptions.Heading>
          <PricingOptions.Description>{t('proPlanDescription')}</PricingOptions.Description>
          <PricingOptions.Price>10</PricingOptions.Price>
          <PricingOptions.PrimaryAction as="a" href="#">
            {t('startFreeTrial')}
          </PricingOptions.PrimaryAction>
        </PricingOptions.Item>
      </PricingOptions>
    )
  },
}
