import {Meta} from '@storybook/react'
import React from 'react'
import {ActionMenu} from './ActionMenu'

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
} as Meta<typeof ActionMenu>

export const Default = () => (
  <ActionMenu onSelect={newValue => alert(newValue)}>
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

export const Playground = args => (
  <ActionMenu {...args} onSelect={newValue => alert(newValue)}>
    <ActionMenu.Button>{args.buttonText}</ActionMenu.Button>
    <ActionMenu.Overlay aria-label="Actions">
      {args.items.map(item => (
        <ActionMenu.Item key={item.value} {...item} />
      ))}
    </ActionMenu.Overlay>
  </ActionMenu>
)
Playground.argTypes = {
  buttonText: {
    name: 'text',
    control: {type: 'text'},
    table: {
      category: 'ActionMenu.Button',
    },
  },
  items: {
    name: 'Menu items',
    control: {type: 'object'},
    table: {
      category: 'Story customization',
    },
  },
}
Playground.args = {
  selectionVariant: 'none',
  size: 'medium',
  disabled: false,
  menuAlignment: 'start',
  menuSide: 'outside-bottom',
  buttonText: 'Open menu',
  items: [
    {value: 'Copy link pressed', children: 'Copy link', selected: true, disabled: false},
    {value: 'Quote reply pressed', children: 'Quote reply', selected: false, disabled: false},
    {value: 'Edit comment pressed', children: 'Edit comment', selected: false, disabled: false},
  ],
}
Playground.parameters = {
  controls: {include: ['Menu items', 'text', ...Object.keys(Playground.args)]},
}
