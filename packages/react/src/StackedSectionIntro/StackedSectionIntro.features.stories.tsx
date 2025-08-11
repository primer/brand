import React from 'react'
import {Meta} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {StackedSectionIntro} from '.'
import {Grid} from '../Grid'

export default {
  title: 'Components/StackedSectionIntro/Features',
  component: StackedSectionIntro,
} as Meta<typeof StackedSectionIntro>

export const WithEmphasizedText = () => {
  const {t} = useTranslation('StackedSectionIntro')

  return (
    <StackedSectionIntro>
      <StackedSectionIntro.Heading>
        <b>{t('playground_heading_emphasis')}</b>
        {t('playground_heading_suffix')}
      </StackedSectionIntro.Heading>
      <StackedSectionIntro.Link href="#">{t('explore_github')}</StackedSectionIntro.Link>

      <StackedSectionIntro.Items>
        <StackedSectionIntro.Item>
          <b>{t('developer_first')}</b>
          {t('developer_first_description')}
        </StackedSectionIntro.Item>
        <StackedSectionIntro.Item>
          <b>{t('enterprise_grade')}</b>
          {t('enterprise_grade_description')}
        </StackedSectionIntro.Item>
        <StackedSectionIntro.Item>
          <b>{t('ai_powered')}</b>
          {t('ai_powered_description')}
        </StackedSectionIntro.Item>
      </StackedSectionIntro.Items>
    </StackedSectionIntro>
  )
}

export const InGrid = () => {
  const {t} = useTranslation('StackedSectionIntro')

  return (
    <Grid>
      <Grid.Column>
        <StackedSectionIntro>
          <StackedSectionIntro.Heading>{t('enterprise_platform_heading')}</StackedSectionIntro.Heading>
          <StackedSectionIntro.Link href="#">{t('explore_github_enterprise')}</StackedSectionIntro.Link>
          <StackedSectionIntro.Items>
            <StackedSectionIntro.Item>
              <b>{t('lorem_ipsum')}</b>
              {t('lorem_ipsum_description')}
            </StackedSectionIntro.Item>
            <StackedSectionIntro.Item>
              <b>{t('lorem_ipsum')}</b>
              {t('lorem_ipsum_description')}
            </StackedSectionIntro.Item>
            <StackedSectionIntro.Item>
              <b>{t('lorem_ipsum')}</b>
              {t('lorem_ipsum_description')}
            </StackedSectionIntro.Item>
          </StackedSectionIntro.Items>
        </StackedSectionIntro>
      </Grid.Column>
    </Grid>
  )
}
