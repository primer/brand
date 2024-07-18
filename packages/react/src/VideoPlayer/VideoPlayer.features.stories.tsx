import React from 'react'
import {Meta} from '@storybook/react'
import posterImage from '../fixtures/images/example-poster.png'

import {VideoPlayer} from '.'
import {Stack} from '../Stack'
import {Button} from '../Button'
import {useVideo} from './hooks'

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

export const WithSomeHiddenControls = () => (
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

export const HideControlsWhenPaused = () => (
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

const MyVideoPlayer = () => {
  const {isPlaying, togglePlaying, seek} = useVideo()

  return (
    <Stack direction="vertical">
      <VideoPlayer.WithoutProvider
        title="GitHub media player"
        showPlayPauseButton={false}
        showSeekControl={false}
        showCCButton={false}
        showMuteButton={false}
        showVolumeControl={false}
        showFullScreenButton={false}
      >
        <VideoPlayer.Source src="https://primer.github.io/brand/assets/example.mp4" type="video/mp4" />
        <VideoPlayer.Track src="https://primer.github.io/brand/assets/example.vtt" />
      </VideoPlayer.WithoutProvider>
      <Stack direction="horizontal">
        <Button onClick={() => togglePlaying()}>{isPlaying ? 'Pause' : 'Play'}</Button>
        <Button onClick={() => seek(0)}>Go to start</Button>
        <Button onClick={() => seek(t => t + 5)}>Skip 5 seconds</Button>
      </Stack>
    </Stack>
  )
}

export const ControlledProgrammatically = () => {
  return (
    <VideoPlayer.Provider>
      <MyVideoPlayer />
    </VideoPlayer.Provider>
  )
}
