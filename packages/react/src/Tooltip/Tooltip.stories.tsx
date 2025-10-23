import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Button, Box} from '..'
import {Tooltip} from './'

/* Tooltip v1 */

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Box padding="spacious">
      <Tooltip text="Hello, Tooltip!">
        <Button>Hover me</Button>
      </Tooltip>
    </Box>
  ),
}

export const Playground: Story = {
  render: args => (
    <Box padding="spacious">
      <Tooltip {...args} type="description">
        <Button>Delete</Button>
      </Tooltip>
    </Box>
  ),
  args: {
    text: 'This is the tooltip text',
    direction: 's',
    type: 'description',
  },
  argTypes: {
    text: {control: {type: 'text'}},
    direction: {
      control: {type: 'radio'},
      options: ['n', 'e', 's', 'w'],
    },
    type: {
      table: {
        disable: true,
      },
    },
  },
}
