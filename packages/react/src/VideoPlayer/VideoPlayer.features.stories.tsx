import React, {useRef} from 'react'
import {Meta, StoryObj} from '@storybook/react'
import {PlayIcon} from '@primer/octicons-react'

import posterImage from '../fixtures/images/example-poster.png'
import {VideoPlayer} from '.'
import {Stack} from '../Stack'
import {Button} from '../Button'
import {useVideo} from './hooks'
import styles from './VideoPlayer.stories.module.css'
import {expect, userEvent, waitFor, within} from '@storybook/test'

export default {
  title: 'Components/VideoPlayer/Features',
  component: VideoPlayer,
} as Meta<typeof VideoPlayer>

export const WithPoster = () => (
  <VideoPlayer poster={posterImage} title="GitHub media player">
    <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="./example.vtt" default />
  </VideoPlayer>
)

export const WithoutBranding = () => (
  <VideoPlayer showBranding={false} title="GitHub media player">
    <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="./example.vtt" default />
  </VideoPlayer>
)

export const WithVisuallyHiddenTitle = () => (
  <VideoPlayer visuallyHiddenTitle title="GitHub media player">
    <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="./example.vtt" default />
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
    <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="./example.vtt" default />
  </VideoPlayer>
)

export const Minimal = () => (
  <VideoPlayer
    title="GitHub media player"
    visuallyHiddenTitle
    showBranding={false}
    showPlayPauseButton={false}
    showSeekControl={true}
    showCCButton={false}
    showMuteButton={false}
    showVolumeControl={false}
    showFullScreenButton={false}
  >
    <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="./example.vtt" default />
  </VideoPlayer>
)

const MyVideoPlayer = () => {
  const {isPlaying, togglePlaying, seek} = useVideo()

  return (
    <Stack direction="vertical">
      <VideoPlayer
        title="GitHub media player"
        showPlayPauseButton={false}
        showSeekControl={false}
        showCCButton={false}
        showMuteButton={false}
        showVolumeControl={false}
        showFullScreenButton={false}
      >
        <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
        <VideoPlayer.Track src="./example.vtt" default />
      </VideoPlayer>
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

export const CustomPlayIcon = () => (
  <VideoPlayer title="GitHub media player" playIcon={() => <PlayIcon size={96} className={styles.customPlayIcon} />}>
    <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="./example.vtt" default />
  </VideoPlayer>
)

export const TooltipVisibleOnFocus = () => (
  <VideoPlayer title="GitHub media player">
    <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
    <VideoPlayer.Track src="./example.vtt" default />
  </VideoPlayer>
)
TooltipVisibleOnFocus.play = async ({canvasElement}) => {
  const {getByText} = within(canvasElement)

  await waitFor(() => expect(getByText('Play video')).not.toBeVisible())

  await userEvent.tab()
  await userEvent.tab()

  await waitFor(() => expect(getByText('Play video')).toBeVisible())
}

const customRefPlayFunction: StoryObj<typeof VideoPlayer>['play'] = async ({canvasElement}) => {
  const {getByRole, getByTitle} = within(canvasElement)

  const video = getByTitle<HTMLVideoElement>('GitHub media player')

  expect(video).toHaveProperty('paused', true)
  expect(video).toHaveProperty('currentTime', 0)

  // Keep things quiet so we don't startle the user
  await userEvent.click(getByRole('button', {name: 'Mute'}))

  await userEvent.click(getByRole('button', {name: 'Play'}))

  await waitFor(() => expect(video).toHaveProperty('paused', false))
  await waitFor(() => expect(video.currentTime).toBeGreaterThan(0))

  await userEvent.click(getByRole('button', {name: 'Reset using ref'}))

  // Check that the video has been successfully reset
  expect(video).toHaveProperty('paused', true)
  expect(video).toHaveProperty('currentTime', 0)
}

export const WithCustomRef = () => {
  const ref = useRef<HTMLVideoElement>(null)

  return (
    <>
      <VideoPlayer title="GitHub media player" ref={ref}>
        <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
        <VideoPlayer.Track src="./example.vtt" default />
      </VideoPlayer>
      <Button
        onClick={() => {
          if (!ref.current) return
          ref.current.pause()
          ref.current.currentTime = 0
        }}
      >
        Reset using ref
      </Button>
    </>
  )
}
WithCustomRef.play = customRefPlayFunction
WithCustomRef.storyName = 'With Custom Ref (autoplays)'

export const WithCustomRefAndProvider = () => {
  const ref = useRef<HTMLVideoElement>(null)

  return (
    <>
      <VideoPlayer.Provider ref={ref}>
        <VideoPlayer title="GitHub media player">
          <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
          <VideoPlayer.Track src="./example.vtt" default />
        </VideoPlayer>
      </VideoPlayer.Provider>
      <Button
        onClick={() => {
          if (!ref.current) return
          ref.current.pause()
          ref.current.currentTime = 0
        }}
      >
        Reset using ref
      </Button>
    </>
  )
}
WithCustomRefAndProvider.play = customRefPlayFunction
WithCustomRefAndProvider.storyName = 'With Custom Ref and Provider (autoplays)'
