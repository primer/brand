import React from 'react'

import {Meta, StoryFn} from '@storybook/react'
import {
  Box,
  BoxBackgroundColors,
  BoxBorderColorOptions,
  BoxBorderRadiusOptions,
  BoxBorderWidthOptions,
  BoxSpacingValues,
} from './Box'
import {Text} from '../'

export default {
  title: 'Components/Box',
  component: Box,
} as Meta<typeof Box>

export const Default = () => (
  <Box>
    <Text>Default Box</Text>
  </Box>
)

export const Playground: StoryFn<typeof Box> = args => (
  <Box {...args}>
    <Text>Default Box</Text>
  </Box>
)
Playground.args = {
  padding: 'normal',
  margin: 'normal',
  backgroundColor: 'inset',
  borderRadius: 'medium',
  borderWidth: 'thin',
  borderColor: 'default',
  borderStyle: 'solid',
}
Playground.argTypes = {
  padding: {
    options: BoxSpacingValues,
    control: {
      type: 'select',
    },
  },
  margin: {
    options: BoxSpacingValues,
    control: {
      type: 'select',
    },
  },
  backgroundColor: {
    options: BoxBackgroundColors,
    control: {
      type: 'inline-radio',
    },
  },
  borderRadius: {
    options: BoxBorderRadiusOptions,
    control: {
      type: 'inline-radio',
    },
  },
  borderWidth: {
    options: BoxBorderWidthOptions,
    control: {
      type: 'inline-radio',
    },
  },
  borderColor: {
    options: BoxBorderColorOptions,
    control: {
      type: 'inline-radio',
    },
  },
  borderStyle: {
    options: ['none', 'solid'],
    control: {
      type: 'inline-radio',
    },
  },
}
