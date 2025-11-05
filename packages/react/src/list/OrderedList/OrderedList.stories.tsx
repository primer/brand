import type {Meta} from '@storybook/react'
import React from 'react'
import {OrderedList} from '.'

export default {
  title: 'Components/OrderedList',
  component: OrderedList,
  args: {
    data: [
      'Automatic security and version updates',
      'GitHub Security Advisories',
      'Code and secret scanning',
      'Dependency review',
      'Automated authentication and identity management',
    ],
  },
  argTypes: {
    data: {
      name: 'Data',
      description: 'Test data',
      control: {
        type: 'array',
      },
      table: {
        category: 'Story customization',
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof OrderedList>

export const Default = ({data, ...args}: {data: string[]}) => (
  <OrderedList {...args}>
    <OrderedList.Item>Automatic security and version updates</OrderedList.Item>
    <OrderedList.Item>GitHub Security Advisories</OrderedList.Item>
    <OrderedList.Item>Code and secret scanning</OrderedList.Item>
    <OrderedList.Item>Dependency review</OrderedList.Item>
    <OrderedList.Item>Automated authentication and identity management</OrderedList.Item>
  </OrderedList>
)

export const Playground = ({data, ...args}: {data: string[]}) => (
  <OrderedList {...args}>
    {data.map((item, index) => (
      <OrderedList.Item key={index}>{item}</OrderedList.Item>
    ))}
  </OrderedList>
)
