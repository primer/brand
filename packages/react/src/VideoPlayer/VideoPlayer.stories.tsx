import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import posterImage from '../fixtures/images/example-poster.png'
import {VideoPlayer} from '.'

export default {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  args: {
    poster: posterImage,
    title: 'GitHub Video Demo',
    branding: true,
  },
  argTypes: {
    poster: {
      type: 'string',
      description: 'Specify the URL of the poster image',
    },
    title: {
      type: 'string',
      description: 'Specify the title of the video',
    },
    branding: {
      type: 'boolean',
    },
  },
} as Meta<typeof VideoPlayer>

export const Playground: StoryFn<typeof VideoPlayer> = args => (
  <VideoPlayer {...args}>
    <VideoPlayer.Source src="/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)

export const Default = Playground.bind({})
