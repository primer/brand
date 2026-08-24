import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {Label, LabelColors, LabelSizes, defaultLabelColor, defaultLabelSize} from '.'
import {Stack, Text} from '..'

const meta = {
  title: 'Components/Label',
  component: Label,
  args: {
    color: defaultLabelColor,
    size: defaultLabelSize,
    children: 'In progress',
  },
  // overriding default type inference for args with more useful control types
  argTypes: {
    color: {
      description: 'Color of Label',
      control: {
        type: 'inline-radio',
        options: [...LabelColors],
      },
    },
    size: {
      description: 'Size of Label',
      control: {
        type: 'inline-radio',
        options: [...LabelSizes],
      },
    },
    children: {
      name: 'children',
      description: 'Label label`.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => (
    <Stack direction="horizontal" alignItems="center" padding="none">
      <Text>Issue #123</Text>
      <Label>In progress</Label>
    </Stack>
  ),
}

export const Playground: Story = {
  render: args => (
    <Stack direction="horizontal" alignItems="center" padding="none">
      <Text>Issue #123</Text>
      <Label {...args} />
    </Stack>
  ),
}
