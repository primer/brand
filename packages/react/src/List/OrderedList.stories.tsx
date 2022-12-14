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
    <li>Automatic security and version updates</li>
    <li>GitHub Security Advisories</li>
    <li>Code and secret scanning</li>
    <li>Dependency review</li>
    <li>Automated authentication and identity management</li>
  </OrderedList>
)

export const Default = Playground.bind({})
