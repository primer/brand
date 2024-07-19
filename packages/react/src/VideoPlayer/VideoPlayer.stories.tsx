import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import posterImage from '../fixtures/images/example-poster.png'
import {VideoPlayer} from '.'

export default {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  args: {
    poster: posterImage,
    title: 'GitHub media player',
    visuallyHiddenTitle: false,
    showBranding: true,
    showControlsWhenPaused: true,
    showPlayPauseButton: true,
    showSeekControl: true,
    showCCButton: true,
    showMuteButton: true,
    showVolumeControl: true,
    showFullScreenButton: true,
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
    visuallyHiddenTitle: {
      type: 'boolean',
    },
    showBranding: {
      type: 'boolean',
    },
    showControlsWhenPaused: {
      type: 'boolean',
    },
    showPlayPauseButton: {
      type: 'boolean',
    },
    showSeekControl: {
      type: 'boolean',
    },
    showCCButton: {
      type: 'boolean',
    },
    showMuteButton: {
      type: 'boolean',
    },
    showVolumeControl: {
      type: 'boolean',
    },
    showFullScreenButton: {
      type: 'boolean',
    },
  },
} as Meta<typeof VideoPlayer>

export const Playground: StoryFn<typeof VideoPlayer> = args => (
  <VideoPlayer {...args}>
    <VideoPlayer.Source src="https://primer.github.io/brand/assets/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="https://primer.github.io/brand/assets/example.vtt" default />
  </VideoPlayer>
)

export const Default = Playground.bind({})
