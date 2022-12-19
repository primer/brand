import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {OrderedList, ListItem} from '.'

export default {
  title: 'Components/OrderedList',
  component: OrderedList,
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof OrderedList>

export const Playground: ComponentStory<typeof OrderedList> = args => (
  <OrderedList {...args}>
    <ListItem>Automatic security and version updates</ListItem>
    <ListItem>GitHub Security Advisories</ListItem>
    <ListItem>Code and secret scanning</ListItem>
    <ListItem>Dependency review</ListItem>
    <ListItem>Automated authentication and identity management</ListItem>
  </OrderedList>
)

export const Default = Playground.bind({})
