import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'

import posterImage from '../fixtures/images/example-poster.png'
import {MinimalVideoPlayer} from '.'

const meta = {
  title: 'Components/MinimalVideoPlayer',
  component: MinimalVideoPlayer,
  args: {
    autoPlay: true,
    loop: true,
    poster: posterImage,
    src: './example.mp4',
    title: 'Product interface demonstration',
  },
  argTypes: {
    autoPlay: {
      control: {type: 'boolean'},
    },
    loop: {
      control: {type: 'boolean'},
    },
    poster: {
      control: {type: 'text'},
    },
    src: {
      control: {type: 'text'},
    },
    title: {
      control: {type: 'text'},
    },
  },
} satisfies Meta<typeof MinimalVideoPlayer>

export default meta
type Story = StoryObj<typeof MinimalVideoPlayer>

export const Default: Story = {
  render: () => <MinimalVideoPlayer poster={posterImage} src="./example.mp4" title="Product interface demonstration" />,
}

export const Playground: Story = {
  render: args => <MinimalVideoPlayer {...args} />,
}
