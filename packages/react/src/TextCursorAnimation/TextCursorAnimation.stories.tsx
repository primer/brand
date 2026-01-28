import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {TextCursorAnimation} from '.'

const meta = {
  title: 'Components/TextCursorAnimation',
  component: TextCursorAnimation,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TextCursorAnimation>

export default meta
type Story = StoryObj<typeof TextCursorAnimation>

export const Default: Story = {
  render: () => <TextCursorAnimation>This is a text cursor animation</TextCursorAnimation>,
}

export const Playground: Story = {
  args: {
    children: 'This is a text cursor animation',
    animate: true,
    delay: 500,
    waitForPageLoad: true,
  },
  argTypes: {
    animate: {
      control: 'boolean',
      description: 'Whether to animate the text reveal',
    },
    delay: {
      control: 'number',
      description: 'Delay before starting the animation (in milliseconds)',
    },
  },
}
