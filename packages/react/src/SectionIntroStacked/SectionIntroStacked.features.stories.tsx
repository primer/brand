import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {SectionIntroStacked} from '.'
import {Grid} from '../Grid'

export default {
  title: 'Components/SectionIntroStacked/Features',
  component: SectionIntroStacked,
} satisfies Meta<typeof SectionIntroStacked>

type Story = StoryObj<typeof SectionIntroStacked>

export const WithEmphasizedText: Story = {
  render: function WithEmphasizedTextComponent() {
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
  },
}

export const InGrid: Story = {
  render: function InGridComponent() {
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
  },
}

export const InGridNarrow: Story = {
  name: 'Narrow view, menu closed (mobile)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: function InGridNarrowComponent() {
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
  },
}
