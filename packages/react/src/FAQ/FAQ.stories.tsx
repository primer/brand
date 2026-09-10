import React from 'react'
import type {Meta} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {FAQ} from '.'

export default {
  title: 'Components/FAQ',
  component: FAQ,
} as Meta<typeof FAQ>

export const Default = () => {
  const {t} = useTranslation('FAQ')

  return (
    <FAQ>
      <FAQ.Heading align="center">{t('heading')}</FAQ.Heading>
      <FAQ.Subheading align="start">{t('subscriptions_payments')}</FAQ.Subheading>
      <FAQ.Item>
        <FAQ.Question>{t('github_startups_offer')}</FAQ.Question>
        <FAQ.Answer>
          <p>
            {t('github_startups_offer_answer')}{' '}
            <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
              {t('here')}
            </a>
            .
          </p>
        </FAQ.Answer>
      </FAQ.Item>
      <FAQ.Item>
        <FAQ.Question>{t('who_eligible')}</FAQ.Question>
        <FAQ.Answer>
          <p>{t('who_eligible_answer')}</p>
          <ol>
            <li>{t('must_be_associated')}</li>
            <li>{t('self_funded')}</li>
            <li>{t('not_current_customer')}</li>
            <li>{t('no_previous_credits')}</li>
          </ol>
        </FAQ.Answer>
      </FAQ.Item>
      <FAQ.Item>
        <FAQ.Question>{t('startup_not_eligible')}</FAQ.Question>
        <FAQ.Answer>
          <p>
            {t('startup_not_eligible_answer')}
            <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
              {t('here')}
            </a>
            .
          </p>
        </FAQ.Answer>
      </FAQ.Item>
      <FAQ.Item>
        <FAQ.Question>{t('become_partner')}</FAQ.Question>
        <FAQ.Answer>
          <p>{t('become_partner_answer')}</p>
          <p>
            <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
              {t('apply_here')}
            </a>
            .
          </p>
        </FAQ.Answer>
      </FAQ.Item>
    </FAQ>
  )
}
