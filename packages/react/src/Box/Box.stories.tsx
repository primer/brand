import React from 'react'

import {Meta, StoryFn} from '@storybook/react'
import {Box} from './Box'
import {Text} from '../'

export default {
  title: 'Components/Box',
  component: Box,
} as Meta<typeof Box>

const Template: StoryFn<typeof Box> = args => (
  <Box {...args}>
    <Text>Default Box</Text>
  </Box>
)

export const Default = Template.bind({})
