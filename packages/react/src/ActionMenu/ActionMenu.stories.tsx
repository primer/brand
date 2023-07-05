import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import {ActionMenu} from './ActionMenu'

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
} as Meta<typeof ActionMenu>

const Template: StoryFn<typeof ActionMenu> = args => (
  <ActionMenu {...args} onSelect={newValue => alert(newValue)}>
    <ActionMenu.Button>Open menu</ActionMenu.Button>
    <ActionMenu.Overlay aria-label="Actions">
      <ActionMenu.Item value="Copy link pressed" selected>
        Copy link
      </ActionMenu.Item>
      <ActionMenu.Item value="Quote reply pressed">Quote reply</ActionMenu.Item>
      <ActionMenu.Item value="Edit comment pressed">Edit comment</ActionMenu.Item>
    </ActionMenu.Overlay>
  </ActionMenu>
)

export const Default = Template.bind({})
