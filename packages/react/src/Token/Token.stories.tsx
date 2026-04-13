import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'

import {Token, TokenVariants, defaultTokenVariant} from '.'

const meta = {
  title: 'Components/Token',
  component: Token,
  args: {
    as: 'span',
    variant: defaultTokenVariant,
    children: 'Token',
  },
  argTypes: {
    as: {
      description: 'HTML element rendered by Token.',
      control: {
        type: 'inline-radio',
        options: ['span', 'a'],
      },
    },
    variant: {
      description: 'Variant of Token',
      control: {
        type: 'inline-radio',
        options: [...TokenVariants],
      },
    },
    children: {
      name: 'children',
      description: 'Token label.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Token>

export default meta

type Story = StoryObj<typeof Token>

export const Default: Story = {
  render: () => <Token>Topic</Token>,
}

export const Playground: Story = {
  render: args => <Token {...args} />,
}
