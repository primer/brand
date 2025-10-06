import React from 'react'

import type {Meta, StoryObj} from '@storybook/react'
import {Box} from './Box'
import {Text} from '../'

const meta = {
  title: 'Components/Box',
  component: Box,
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: args => (
    <Box {...args}>
      <Text>Default Box</Text>
    </Box>
  ),
}
