import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {EyebrowText} from '.'

const meta = {
  title: 'Components/EyebrowText',
  component: EyebrowText,
  args: {
    children: 'Eyebrow text',
  },
  argTypes: {
    children: {
      name: 'children',
      description: 'EyebrowText content.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof EyebrowText>

export default meta
type Story = StoryObj<typeof EyebrowText>

export const Default: Story = {
  render: () => <EyebrowText>Default</EyebrowText>,
}

export const Playground: Story = {
  render: args => <EyebrowText {...args} />,
}
