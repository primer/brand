import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {UnorderedList, ListItem} from '.'

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
    <ListItem>Automatic security and version updates</ListItem>
    <ListItem>GitHub Security Advisories</ListItem>
    <ListItem>Code and secret scanning</ListItem>
    <ListItem>Dependency review</ListItem>
    <ListItem>Automated authentication and identity management</ListItem>
  </UnorderedList>
)

export const Default = Playground.bind({})
