import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {AnimatedBackground, AnimatedBackgroundProps} from './AnimatedBackground'

export default {
  title: 'Components/AnimatedBackground/Features',
  component: AnimatedBackground,
  args: {
    colorMode: 'light',
    theme: 'collaboration',
    variant: '1',
    colorShift: 0.5,
    lightShift: 0.5,
    parallax: false,
  },
  argTypes: {
    colorMode: {
      control: {
        type: 'inline-radio',
      },
      options: ['light', 'dark'],
    },
    theme: {
      control: {
        type: 'select',
      },
      options: ['collaboration', 'ai', 'security', 'enterprise', 'productivity'],
    },
    variant: {
      control: {
        type: 'inline-radio',
      },
      options: ['1', '2', '3'],
    },
    colorShift: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    lightShift: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    parallax: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<typeof AnimatedBackground>

const Template: StoryFn<AnimatedBackgroundProps> = args => <AnimatedBackground {...args} />

export const AI = Template.bind({})
AI.args = {
  theme: 'ai',
}
export const Security = Template.bind({})
Security.args = {
  theme: 'security',
}

export const Enterprise = Template.bind({})
Enterprise.args = {
  theme: 'enterprise',
}

export const Productivity = Template.bind({})
Productivity.args = {
  theme: 'productivity',
}

export const Collaboration = Template.bind({})
Collaboration.args = {
  theme: 'collaboration',
}
