import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import {VideoPlayer} from '.'

export default {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  args: {
    poster: 'https://github.githubassets.com/images/icons/media-player/poster.jpg',
    title: 'HLS On Demand Demo',
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
  <VideoPlayer {...args} crossOrigin="anonymous">
    <VideoPlayer.Source src="https://cdn.api.video/vod/vi36GGvd6PoTqViQLxBWwHjJ/mp4/1080/source.mp4" type="video/mp4" />
    <VideoPlayer.Track
      src="https://raw.githubusercontent.com/JoshBowdenConcepts/Subtitles-Example/main/sample.vtt"
      default
      kind="subtitles"
      srcLang="en"
      label="English"
    />
  </VideoPlayer>
)

export const Default = Playground.bind({})
