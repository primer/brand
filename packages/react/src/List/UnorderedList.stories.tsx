import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {UnorderedList} from '.'

export default {
  title: 'Components/UnorderedList',
  component: UnorderedList,
  args: {
    variant: 'default'
  },
  argTypes: {
    variant: {
      description:
        'The semantic structure of list that is presented visually setting "ol" vs "ul" based on the style the style of the list.',
      control: {
        type: 'radio',
        options: ['default', 'checked']
      }
    },
    children: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof UnorderedList>

export const Playground: ComponentStory<typeof UnorderedList> = args => (
  <UnorderedList {...args}>
    <UnorderedList.Item>Automatic security and version updates</UnorderedList.Item>
    <UnorderedList.Item>GitHub Security Advisories</UnorderedList.Item>
    <UnorderedList.Item>Code and secret scanning</UnorderedList.Item>
    <UnorderedList.Item>Dependency review</UnorderedList.Item>
    <UnorderedList.Item>Automated authentication and identity management</UnorderedList.Item>
  </UnorderedList>
)

export const Default = Playground.bind({})
