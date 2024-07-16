import React from 'react'
import {Meta} from '@storybook/react'
import posterImage from '../fixtures/images/example-poster.png'

import {VideoPlayer} from '.'

export default {
  title: 'Components/VideoPlayer/Features',
  component: VideoPlayer,
} as Meta<typeof VideoPlayer>

export const WithPoster = () => (
  <VideoPlayer poster={posterImage} title="GitHub media player">
    <VideoPlayer.Source src="https://primer.github.io/brand/assets/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="https://primer.github.io/brand/assets/example.vtt" />
  </VideoPlayer>
)

export const WithoutBranding = () => (
  <VideoPlayer showBranding={false} title="GitHub media player">
    <VideoPlayer.Source src="https://primer.github.io/brand/assets/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="https://primer.github.io/brand/assets/example.vtt" />
  </VideoPlayer>
)

export const WithVisuallyHiddenTitle = () => (
  <VideoPlayer visuallyHiddenTitle title="GitHub media player">
    <VideoPlayer.Source src="https://primer.github.io/brand/assets/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="https://primer.github.io/brand/assets/example.vtt" />
  </VideoPlayer>
)

export const WithCustomControls = () => (
  <VideoPlayer
    title="GitHub media player"
    showPlayPauseButton={false}
    showSeekControl={true}
    showCCButton={false}
    showMuteButton={false}
    showVolumeControl={false}
    showFullScreenButton={false}
  >
    <VideoPlayer.Source src="https://primer.github.io/brand/assets/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="https://primer.github.io/brand/assets/example.vtt" />
  </VideoPlayer>
)

export const HideControlsUntilPlaying = () => (
  <VideoPlayer title="GitHub media player" showControlsWhenPaused={false}>
    <VideoPlayer.Source src="https://primer.github.io/brand/assets/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="https://primer.github.io/brand/assets/example.vtt" />
  </VideoPlayer>
)

export const Minimal = () => (
  <VideoPlayer title="GitHub media player" visuallyHiddenTitle showBranding={false} showControlsWhenPaused={false}>
    <VideoPlayer.Source src="https://primer.github.io/brand/assets/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="https://primer.github.io/brand/assets/example.vtt" />
  </VideoPlayer>
)
