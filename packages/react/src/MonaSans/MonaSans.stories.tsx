import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {MonaSans} from '.'

const meta = {
  title: 'Misc/MonaSans',
  component: MonaSans,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Mona Sans',
    size: 64,
    weight: 900,
  },
  argTypes: {
    size: {control: {type: 'range', min: 9, max: 128, step: 4}},
    weight: {control: {type: 'range', min: 200, max: 900, step: 10}},
    width: {control: {type: 'range', min: 75, max: 125, step: 5}},
    italic: {control: {type: 'range', min: 1, max: 10, step: 1}},
  },
} satisfies Meta<typeof MonaSans>

export default meta
type Story = StoryObj<typeof MonaSans>

export const Playground: Story = {
  render: args => <MonaSans {...args} />,
  args: {
    children: 'Mona Sans',
  },
}
