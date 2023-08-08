import React from 'react'
import {Meta} from '@storybook/react'

import {VideoPlayer} from '.'

export default {
  title: 'Components/VideoPlayer/Features',
  component: VideoPlayer,
} as Meta<typeof VideoPlayer>

export const WithPoster = () => (
  <VideoPlayer poster="https://github.githubassets.com/images/icons/media-player/poster.jpg" title="HLS On Demand Demo">
    <VideoPlayer.Source
      src="https://github.githubassets.com/images/modules/growth/actions/ci-cd-actions.h264.mp4"
      type="video/mp4"
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

export const WithoutBranding = () => (
  <VideoPlayer branding={false} title="HLS On Demand Demo">
    <VideoPlayer.Source
      src="https://github.githubassets.com/images/modules/growth/actions/ci-cd-actions.h264.mp4"
      type="video/mp4"
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
