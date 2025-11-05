import type {Meta} from '@storybook/react'
import React from 'react'
import {UnorderedList} from '.'

export default {
  title: 'Components/UnorderedList',
  component: UnorderedList,
  args: {
    variant: 'default',
    data: [
      'Automatic security and version updates',
      'GitHub Security Advisories',
      'Code and secret scanning',
      'Dependency review',
      'Automated authentication and identity management',
    ],
  },
  argTypes: {
    variant: {
      description: 'Specify alternative leading visuals for list items',
      control: {
        type: 'radio',
        options: ['default', 'checked', 'x'],
      },
    },
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
} as Meta<typeof UnorderedList>

export const Default = ({data, ...args}: {data: string[]}) => (
  <UnorderedList {...args}>
    <UnorderedList.Item>Automatic security and version updates</UnorderedList.Item>
    <UnorderedList.Item>GitHub Security Advisories</UnorderedList.Item>
    <UnorderedList.Item>Code and secret scanning</UnorderedList.Item>
    <UnorderedList.Item>Dependency review</UnorderedList.Item>
    <UnorderedList.Item>Automated authentication and identity management</UnorderedList.Item>
  </UnorderedList>
)

export const Playground = ({data, ...args}: {data: string[]}) => (
  <UnorderedList {...args}>
    {data.map((item, index) => (
      <UnorderedList.Item key={index}>{item}</UnorderedList.Item>
    ))}
  </UnorderedList>
)
