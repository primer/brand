import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {TextCursorAnimation} from '.'

const meta = {
  title: 'Components/TextCursorAnimation/Features',
  component: TextCursorAnimation,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TextCursorAnimation>

export default meta
type Story = StoryObj<typeof TextCursorAnimation>

export const Animated: Story = {
  name: 'Animated (default delay)',
  render: () => <TextCursorAnimation animate>This text will animate with the default 500ms delay</TextCursorAnimation>,
}

export const AnimatedWithLongDelay: Story = {
  name: 'Animated (3s delay)',
  render: () => (
    <TextCursorAnimation animate delay={1000}>
      This text will animate in after a 1 second delay
    </TextCursorAnimation>
  ),
}

export const AnimatedExplicitlyDisabled: Story = {
  name: 'Animation explicitly disabled',
  render: () => <TextCursorAnimation animate={false}>Animation is explicitly disabled</TextCursorAnimation>,
}
