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
    <li>Automatic security and version updates</li>
    <li>GitHub Security Advisories</li>
    <li>Code and secret scanning</li>
    <li>Dependency review</li>
    <li>Automated authentication and identity management</li>
  </UnorderedList>
)

export const Default = Playground.bind({})
