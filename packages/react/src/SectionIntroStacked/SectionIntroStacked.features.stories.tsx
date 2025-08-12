import React from 'react'
import {Meta} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {SectionIntroStacked} from '.'
import {Grid} from '../Grid'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

export default {
  title: 'Components/SectionIntroStacked/Features',
  component: SectionIntroStacked,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof SectionIntroStacked>

export const WithEmphasizedText = () => {
  const {t} = useTranslation('SectionIntroStacked')

  return (
    <SectionIntroStacked>
      <SectionIntroStacked.Heading>
        <b>{t('playground_heading_emphasis')}</b>
        {t('playground_heading_suffix')}
      </SectionIntroStacked.Heading>
      <SectionIntroStacked.Link href="#">{t('explore_github')}</SectionIntroStacked.Link>

      <SectionIntroStacked.Items>
        <SectionIntroStacked.Item>
          <b>{t('developer_first')}</b>
          {t('developer_first_description')}
        </SectionIntroStacked.Item>
        <SectionIntroStacked.Item>
          <b>{t('enterprise_grade')}</b>
          {t('enterprise_grade_description')}
        </SectionIntroStacked.Item>
        <SectionIntroStacked.Item>
          <b>{t('ai_powered')}</b>
          {t('ai_powered_description')}
        </SectionIntroStacked.Item>
      </SectionIntroStacked.Items>
    </SectionIntroStacked>
  )
}

export const InGrid = () => {
  const {t} = useTranslation('SectionIntroStacked')

  return (
    <Grid>
      <Grid.Column>
        <SectionIntroStacked>
          <SectionIntroStacked.Heading>{t('enterprise_platform_heading')}</SectionIntroStacked.Heading>
          <SectionIntroStacked.Link href="#">{t('explore_github_enterprise')}</SectionIntroStacked.Link>
          <SectionIntroStacked.Items>
            <SectionIntroStacked.Item>
              <b>{t('lorem_ipsum')}</b>
              {t('lorem_ipsum_description')}
            </SectionIntroStacked.Item>
            <SectionIntroStacked.Item>
              <b>{t('lorem_ipsum')}</b>
              {t('lorem_ipsum_description')}
            </SectionIntroStacked.Item>
            <SectionIntroStacked.Item>
              <b>{t('lorem_ipsum')}</b>
              {t('lorem_ipsum_description')}
            </SectionIntroStacked.Item>
          </SectionIntroStacked.Items>
        </SectionIntroStacked>
      </Grid.Column>
    </Grid>
  )
}

export const InGridNarrow = () => <InGrid />
InGridNarrow.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
InGridNarrow.storyName = 'Narrow view, menu closed (mobile)'
