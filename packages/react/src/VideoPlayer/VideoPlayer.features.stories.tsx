import React from 'react'
import {Meta} from '@storybook/react'
import posterImage from '../fixtures/images/example-poster.png'

import {VideoPlayer} from '.'

export default {
  title: 'Components/VideoPlayer/Features',
  component: VideoPlayer,
} as Meta<typeof VideoPlayer>

export const WithPoster = () => (
  <VideoPlayer poster={posterImage} title="GitHub Video Demo">
    <VideoPlayer.Source src="/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)

export const WithoutBranding = () => (
  <VideoPlayer branding={false} title="GitHub Video Demo">
    <VideoPlayer.Source src="/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)
