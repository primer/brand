import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {TextRevealAnimation} from '.'
import {Box, AnimationProvider, Text} from '../../'

const meta: Meta<typeof TextRevealAnimation> = {
  title: 'Components/TextRevealAnimation',
  component: TextRevealAnimation,
  args: {
    color: undefined,
    text: "GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first line of code we're writing.",
  },
  argTypes: {
    text: {
      name: 'text',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
      },
    },
    color: {
      name: 'color',
      type: {name: 'string', required: false},
      control: {
        type: 'color',
      },
    },
  },
  decorators: [
    Story => (
      <AnimationProvider>
        <Box animate="fade-in">
          <Story />
        </Box>
      </AnimationProvider>
    ),
  ],
} as Meta<typeof TextRevealAnimation>

export const Playground: StoryFn = ({text, color, ...rest}) => (
  <Text as="p" size="700" style={{['--brand-color-accent-primary' as string]: color}}>
    <TextRevealAnimation {...rest}>{text || ''}</TextRevealAnimation>
  </Text>
)

export default meta
