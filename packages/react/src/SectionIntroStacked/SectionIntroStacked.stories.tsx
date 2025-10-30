import React from 'react'
import type {StoryFn, Meta} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {SectionIntroStacked} from '.'

export default {
  title: 'Components/SectionIntroStacked',
  component: SectionIntroStacked,
  args: {},
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof SectionIntroStacked>

export const Playground: StoryFn<typeof SectionIntroStacked> = args => {
  const {t} = useTranslation('SectionIntroStacked')

  return (
    <SectionIntroStacked {...args}>
      <SectionIntroStacked.Heading>
        <b>{t('playground_heading_emphasis')}</b>
        {t('playground_heading_suffix')}
      </SectionIntroStacked.Heading>
      <SectionIntroStacked.Link href="#">{t('learn_more')}</SectionIntroStacked.Link>
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

export const Default = () => {
  const {t} = useTranslation('SectionIntroStacked')

  return (
    <SectionIntroStacked>
      <SectionIntroStacked.Heading>{t('default_heading')}</SectionIntroStacked.Heading>
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
