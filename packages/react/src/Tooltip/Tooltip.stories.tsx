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

export const Playground = args => {
  // this is a hack to remove the `type` prop from the args because for this example type label is not a valid choice and violates accessibility
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {text, type, ...rest} = args
  return (
    <Box padding="spacious">
      <Tooltip text={text} type="description" {...rest}>
        <Button>Delete</Button>
      </Tooltip>
    </Box>
  )
}

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
    control: false,
  },
}
