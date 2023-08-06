import React from 'react'
import {Meta} from '@storybook/react'

import {VideoPlayer} from '.'

export default {
  title: 'Components/VideoPlayer/Features',
  component: VideoPlayer,
} as Meta<typeof VideoPlayer>

export const WithPoster = () => (
  <VideoPlayer
    poster="https://github.githubassets.com/images/icons/media-player/poster.jpg"
    title="HLS On Demand Demo"
    crossOrigin="anonymous"
  >
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

export const WithoutBranding = () => (
  <VideoPlayer branding={false} title="HLS On Demand Demo">
    <VideoPlayer.Source
      src="https://cdn.api.video/vod/vi36GGvd6PoTqViQLxBWwHjJ/mp4/1080/source.mp4"
      type="video/mp4"
      crossOrigin="anonymous"
    />
    <VideoPlayer.Track
      src="https://raw.githubusercontent.com/JoshBowdenConcepts/Subtitles-Example/main/sample.vtt"
      default
      kind="subtitles"
      srcLang="en"
      label="English"
    />
  </VideoPlayer>
)
