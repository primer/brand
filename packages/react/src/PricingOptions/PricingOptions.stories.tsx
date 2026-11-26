import React from 'react'
import {useTranslation} from 'react-i18next'
import type {Meta} from '@storybook/react'
import {PricingOptions} from '.'
import {Box, Grid} from '..'

export default {
  title: 'Components/PricingOptions',
  component: PricingOptions,
} as Meta<typeof PricingOptions>

export const Default = () => {
  const {t} = useTranslation('PricingOptions')
  return (
    <Box backgroundColor="default" paddingBlockStart="spacious" paddingBlockEnd="spacious" style={{minHeight: '100vh'}}>
      <Grid>
        <Grid.Column span={12}>
          <PricingOptions>
            <PricingOptions.Item>
              <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
              <PricingOptions.Description>{t('individualPlanDescription')}</PricingOptions.Description>
              <PricingOptions.Price trailingText={t('perMonth100PerYear')} originalPrice="15">
                10
              </PricingOptions.Price>
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

              <PricingOptions.Footnote>{t('verifiedStudentsFootnote')}</PricingOptions.Footnote>

              <PricingOptions.PrimaryAction as="a" href="#">
                {t('startFreeTrial')}
              </PricingOptions.PrimaryAction>
            </PricingOptions.Item>

            <PricingOptions.Item>
              <PricingOptions.Label>{t('recommended')}</PricingOptions.Label>
              <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
              <PricingOptions.Description>{t('businessPlanDescription')}</PricingOptions.Description>
              <PricingOptions.Price trailingText={t('perUserMonth')} originalPrice="29">
                19
              </PricingOptions.Price>
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
              <PricingOptions.Price trailingText={t('perUserMonth')} originalPrice="49">
                39
              </PricingOptions.Price>
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
        </Grid.Column>
      </Grid>
    </Box>
  )
}
