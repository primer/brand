import React from 'react'
import type {StoryFn, Meta} from '@storybook/react'
import {useTranslation} from 'react-i18next'
import {CpuIcon, LightBulbIcon, HeartIcon} from '@primer/octicons-react'
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
      <SectionIntroStacked.Heading>{t('with_item_icons_heading')}</SectionIntroStacked.Heading>
      <SectionIntroStacked.Description>{t('playground_description')}</SectionIntroStacked.Description>
      <SectionIntroStacked.Link href="#">{t('sign_up_now')}</SectionIntroStacked.Link>
      <SectionIntroStacked.Items>
        <SectionIntroStacked.Item>
          <SectionIntroStacked.Item.Icon icon={CpuIcon} color="green" />
          <SectionIntroStacked.Item.Heading>{t('item_one_heading')}</SectionIntroStacked.Item.Heading>
          <SectionIntroStacked.Item.Description>{t('item_one_description')}</SectionIntroStacked.Item.Description>
        </SectionIntroStacked.Item>
        <SectionIntroStacked.Item>
          <SectionIntroStacked.Item.Icon icon={LightBulbIcon} color="green" />
          <SectionIntroStacked.Item.Heading>{t('item_two_heading')}</SectionIntroStacked.Item.Heading>
          <SectionIntroStacked.Item.Description>{t('item_two_description')}</SectionIntroStacked.Item.Description>
        </SectionIntroStacked.Item>
        <SectionIntroStacked.Item>
          <SectionIntroStacked.Item.Icon icon={HeartIcon} color="green" />
          <SectionIntroStacked.Item.Heading>{t('item_three_heading')}</SectionIntroStacked.Item.Heading>
          <SectionIntroStacked.Item.Description>{t('item_three_description')}</SectionIntroStacked.Item.Description>
        </SectionIntroStacked.Item>
      </SectionIntroStacked.Items>
    </SectionIntroStacked>
  )
}

export const Default = () => {
  const {t} = useTranslation('SectionIntroStacked')

  return (
    <SectionIntroStacked>
      <SectionIntroStacked.Heading>{t('with_item_icons_heading')}</SectionIntroStacked.Heading>
      <SectionIntroStacked.Description>{t('playground_description')}</SectionIntroStacked.Description>
      <SectionIntroStacked.Link href="#">{t('sign_up_now')}</SectionIntroStacked.Link>
      <SectionIntroStacked.Items>
        <SectionIntroStacked.Item>
          <SectionIntroStacked.Item.Icon icon={CpuIcon} color="green" />
          <SectionIntroStacked.Item.Heading>{t('item_one_heading')}</SectionIntroStacked.Item.Heading>
          <SectionIntroStacked.Item.Description>{t('item_one_description')}</SectionIntroStacked.Item.Description>
        </SectionIntroStacked.Item>
        <SectionIntroStacked.Item>
          <SectionIntroStacked.Item.Icon icon={LightBulbIcon} color="green" />
          <SectionIntroStacked.Item.Heading>{t('item_two_heading')}</SectionIntroStacked.Item.Heading>
          <SectionIntroStacked.Item.Description>{t('item_two_description')}</SectionIntroStacked.Item.Description>
        </SectionIntroStacked.Item>
        <SectionIntroStacked.Item>
          <SectionIntroStacked.Item.Icon icon={HeartIcon} color="green" />
          <SectionIntroStacked.Item.Heading>{t('item_three_heading')}</SectionIntroStacked.Item.Heading>
          <SectionIntroStacked.Item.Description>{t('item_three_description')}</SectionIntroStacked.Item.Description>
        </SectionIntroStacked.Item>
      </SectionIntroStacked.Items>
    </SectionIntroStacked>
  )
}
