import React from 'react'
import type {Meta} from '@storybook/react'
import {Button, Box} from '..'
import {Tooltip} from './'

/* Tooltip v1 */

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
} as Meta<typeof Tooltip>

export const Default = () => (
  <Box padding="spacious">
    <Tooltip text="Hello, Tooltip!">
      <Button>Hover me</Button>
    </Tooltip>
  </Box>
)

export const Playground = args => (
  <Box padding="spacious">
    <Tooltip {...args} type="description">
      <Button>Delete</Button>
    </Tooltip>
  </Box>
)

Playground.args = {
  text: 'This is the tooltip text',
  direction: 's',
  type: 'description',
}

Playground.argTypes = {
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
}
