import React from 'react'
import {Meta} from '@storybook/react'

import {VideoPlayer} from '.'

export default {
  title: 'Components/VideoPlayer/Features',
  component: VideoPlayer,
} as Meta<typeof VideoPlayer>

export const WithPoster = () => (
  <VideoPlayer poster="https://github.githubassets.com/images/icons/media-player/poster.jpg" title="HLS On Demand Demo">
    <VideoPlayer.Source src="/example.mov" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)

export const WithoutBranding = () => (
  <VideoPlayer branding={false} title="HLS On Demand Demo">
    <VideoPlayer.Source src="/example.mov" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)
