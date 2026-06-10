import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {EyebrowText, EyebrowTextVariants} from '.'

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
    variant: {
      description: 'Visual variant for the eyebrow.',
      control: {
        type: 'inline-radio',
      },
      options: [...EyebrowTextVariants],
    },
  },
} satisfies Meta<typeof EyebrowText>

export default meta
type Story = StoryObj<typeof EyebrowText>

export const Default: Story = {
  render: () => <EyebrowText>Default</EyebrowText>,
}

export const Accent: Story = {
  render: () => <EyebrowText variant="accent">Accent</EyebrowText>,
}

export const Playground: Story = {
  render: args => <EyebrowText {...args} />,
}
