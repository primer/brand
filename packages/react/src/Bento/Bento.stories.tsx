import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Bento} from '.'

export default {
  title: 'Components/Bento',
  component: Bento,
  args: {},
  argTypes: {
    className: {
      description: 'Custom class name for the second component',
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Bento>

const Template: StoryFn<typeof Bento> = args => (
  <Bento {...args}>
    <Bento.Item columnSpan={3} rowSpan={8} />
    <Bento.Item columnSpan={3} rowSpan={4} />
    <Bento.Item columnSpan={6} rowSpan={8} />
    <Bento.Item columnSpan={3} rowSpan={4} rowStart={9} />
    <Bento.Item columnSpan={3} rowSpan={8} />
    <Bento.Item columnSpan={6} rowSpan={4} />
  </Bento>
)

export const Default = Template.bind({})

export const Playground = Template.bind({})
