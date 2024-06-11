import React from 'react'
import {Meta} from '@storybook/react'
import posterImage from '@primer/brand-templates-and-media/fixtures/images/example-poster.png'

import {VideoPlayer} from '.'

export default {
  title: 'Components/VideoPlayer/Features',
  component: VideoPlayer,
} as Meta<typeof VideoPlayer>

export const WithPoster = () => (
  <VideoPlayer poster={posterImage} title="GitHub media player">
    <VideoPlayer.Source src="/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)

export const WithoutBranding = () => (
  <VideoPlayer branding={false} title="GitHub media player">
    <VideoPlayer.Source src="/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)
