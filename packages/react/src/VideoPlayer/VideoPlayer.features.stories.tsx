import React from 'react'
import {Meta} from '@storybook/react'
import posterImage from '../fixtures/images/example-poster.png'
import {PlayPauseButton, ControlsBar, SeekControl, PlayIcon, Controls} from './components'

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

export const WithCustomControls = () => (
  <VideoPlayer
    title="GitHub media player"
    renderControls={({videoRef}) => (
      <ControlsBar>
        <PlayPauseButton videoRef={videoRef} />
        <SeekControl videoRef={videoRef} />
      </ControlsBar>
    )}
  >
    <VideoPlayer.Source src="/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)

export const HideControlsUntilPlaying = () => (
  <VideoPlayer
    title="GitHub media player"
    renderControls={({isPlaying, ...rest}) => (
      <Controls
        style={{
          opacity: isPlaying ? 1 : 0,
          transition: 'opacity var(--brand-animation-duration-default) var(--brand-animation-easing-default)',
        }}
        {...rest}
      />
    )}
  >
    <VideoPlayer.Source src="/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)

export const WithCustomPlayButton = () => (
  <VideoPlayer
    title="GitHub media player"
    renderPlayButton={() => <PlayIcon style={{width: 96, height: 96, opacity: 0.8}} />}
  >
    <VideoPlayer.Source src="/example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="/example.vtt" />
  </VideoPlayer>
)
