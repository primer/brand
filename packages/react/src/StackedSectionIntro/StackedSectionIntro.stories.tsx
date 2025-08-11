import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {StackedSectionIntro} from '.'

export default {
  title: 'Components/StackedSectionIntro',
  component: StackedSectionIntro,
  args: {},
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof StackedSectionIntro>

export const Playground: StoryFn<typeof StackedSectionIntro> = args => {
  const {t} = useTranslation('StackedSectionIntro')

  return (
    <StackedSectionIntro {...args}>
      <StackedSectionIntro.Heading>
        <b>{t('playground_heading_emphasis')}</b>
        {t('playground_heading_suffix')}
      </StackedSectionIntro.Heading>
      <StackedSectionIntro.Link href="#">{t('learn_more')}</StackedSectionIntro.Link>
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

export const Default = () => {
  const {t} = useTranslation('StackedSectionIntro')

  return (
    <StackedSectionIntro>
      <StackedSectionIntro.Heading>{t('default_heading')}</StackedSectionIntro.Heading>
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
