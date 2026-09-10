import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {expect, userEvent, waitFor, within} from 'storybook/test'

import posterImage from '../fixtures/images/example-poster.png'
import {MinimalVideoPlayer} from '.'

const meta = {
  title: 'Components/MinimalVideoPlayer/Features',
  component: MinimalVideoPlayer,
} satisfies Meta<typeof MinimalVideoPlayer>

export default meta
type Story = StoryObj<typeof MinimalVideoPlayer>

export const NativeSourceElement: Story = {
  render: () => (
    <MinimalVideoPlayer poster={posterImage} title="Product interface demonstration">
      <source src="./example.mp4" type="video/mp4" />
    </MinimalVideoPlayer>
  ),
}

export const Paused: Story = {
  render: () => (
    <MinimalVideoPlayer
      autoPlay={false}
      poster={posterImage}
      src="./example.mp4"
      title="Product interface demonstration"
    />
  ),
}

export const Playing: Story = {
  ...Paused,
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const video = canvas.getByTitle('Product interface demonstration') as HTMLVideoElement

    await userEvent.click(canvas.getByRole('button', {name: 'Play video'}))

    await waitFor(() => {
      expect(video.paused).toBe(false)
      expect(canvas.getByRole('button', {name: 'Pause video'})).toBeVisible()
    })
  },
}

export const CustomAccessibleLabels: Story = {
  render: () => (
    <MinimalVideoPlayer
      autoPlay={false}
      internalAccessibleLabels={{play: 'Play product demonstration', pause: 'Pause product demonstration'}}
      poster={posterImage}
      src="./example.mp4"
      title="Product interface demonstration"
    />
  ),
}

export const Narrow: Story = {
  ...Paused,
  globals: {
    viewport: {value: 'iphonexr'},
  },
}
