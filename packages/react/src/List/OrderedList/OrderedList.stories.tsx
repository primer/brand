import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {OrderedList} from '.'

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
    <OrderedList.Item>Automatic security and version updates</OrderedList.Item>
    <OrderedList.Item>GitHub Security Advisories</OrderedList.Item>
    <OrderedList.Item>Code and secret scanning</OrderedList.Item>
    <OrderedList.Item>Dependency review</OrderedList.Item>
    <OrderedList.Item>Automated authentication and identity management</OrderedList.Item>
  </OrderedList>
)

export const Default = Playground.bind({})
