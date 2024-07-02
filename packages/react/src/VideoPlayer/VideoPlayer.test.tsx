import React from 'react'
import {render, cleanup, waitFor, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import {VideoPlayer} from '.'

describe('VideoPlayer', () => {
  beforeEach(() => {
    jest.spyOn(HTMLMediaElement.prototype, 'pause').mockReturnValue(undefined)
    jest.spyOn(HTMLMediaElement.prototype, 'play').mockReturnValue(Promise.resolve())
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  it('renders the video element without errors', () => {
    const {getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    expect(getByTitle('test video')).toBeInTheDocument()
  })

  it('renders the overlay play button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Play'})).toBeInTheDocument()
  })

  it('renders the play/pause button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Play video'})).toBeInTheDocument()
  })

  it('renders the enable/disble closed caption button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Disable captions'})).toBeInTheDocument()
  })

  it('renders the mute button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Mute'})).toBeInTheDocument()
  })

  it('renders the full screen button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Full screen'})).toBeInTheDocument()
  })

  it('renders the seek track without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    expect(getByRole('slider', {name: 'Seek'})).toBeInTheDocument()
  })

  it('renders the volume track without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    expect(getByRole('slider', {name: 'Volume'})).toBeInTheDocument()
  })

  it('plays the video when the play button is pressed', () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    expect(video.paused).toBe(true)

    userEvent.click(getByRole('button', {name: 'Play video'}))

    waitFor(() => {
      expect(video.paused).toBe(false)
    })
  })

  it('pauses a playing video when the pause button is pressed', () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    expect(video.paused).toBe(true)

    const playButton = getByRole('button', {name: 'Play video'})

    userEvent.click(playButton)

    waitFor(() => {
      expect(video.paused).toBe(false)
    })

    waitFor(() => {
      userEvent.click(getByRole('button', {name: 'Pause video'}))
      expect(video.paused).toBe(true)
    })
  })

  it('sets the video volume when the volume slider is changed', () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    expect(video.volume).toBe(1)

    const volumeSlider = getByRole('slider', {name: 'Volume'}) as HTMLInputElement

    fireEvent.input(volumeSlider, {target: {valueAsNumber: 0.2}})

    waitFor(() => {
      expect(video.volume).toBe(0.2)
    })
  })

  it('sets the video seek position when the seek slider is changed', () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    expect(video.currentTime).toBe(0)

    const seekSlider = getByRole('slider', {name: 'Seek'}) as HTMLInputElement

    fireEvent.input(seekSlider, {target: {valueAsNumber: 42}})

    expect(video.currentTime).toBe(42)
  })

  it.skip('sets the volume to 0 when the mute button is clicked', () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    expect(video.volume).toBe(1)

    const muteButton = getByRole('button', {name: 'Mute'}) as HTMLInputElement

    fireEvent.click(muteButton)

    expect(video.volume).toBe(0)
  })

  it.skip('resets the volume to the previous volume when the mute button is clicked twice', () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
        <VideoPlayer.Track
          src="../../../apps/docs/static/example.vtt"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    expect(video.volume).toBe(1)

    const volumeSlider = getByRole('slider', {name: 'Volume'}) as HTMLInputElement
    fireEvent.input(volumeSlider, {target: {valueAsNumber: 0.8}})

    expect(video.volume).toBe(0.8)

    const muteButton = getByRole('button', {name: 'Mute'}) as HTMLInputElement

    userEvent.click(muteButton)
    expect(video.volume).toBe(0)

    userEvent.click(muteButton)
    expect(video.volume).toBe(0.8)
  })
})
