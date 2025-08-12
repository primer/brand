import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import {ActionMenu} from './ActionMenu'
import {useTranslation} from 'react-i18next'

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
} as Meta<typeof ActionMenu>

const Template: StoryFn<typeof ActionMenu> = args => {
  const {t} = useTranslation('ActionMenu')
  return (
    <ActionMenu {...args} onSelect={newValue => alert(newValue)}>
      <ActionMenu.Button>{t('open_menu')}</ActionMenu.Button>
      <ActionMenu.Overlay aria-label={t('actions')}>
        <ActionMenu.Item value="Copy link pressed" selected>
          {t('copy_link')}
        </ActionMenu.Item>
        <ActionMenu.Item value="Quote reply pressed">{t('quote_reply')}</ActionMenu.Item>
        <ActionMenu.Item value="Edit comment pressed">{t('edit_comment')}</ActionMenu.Item>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}

export const Default = Template.bind({})
