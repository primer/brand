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
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(getByTitle('test video')).toBeInTheDocument()
  })

  it('renders the overlay play button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Play'})).toBeInTheDocument()
  })

  it('renders the play/pause button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Play video'})).toBeInTheDocument()
  })

  it('does not render controls when paused and showControlsWhenPaused is false', () => {
    const {queryByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video" showControlsWhenPaused={false}>
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(queryByRole('button', {name: 'Play video'})).not.toBeInTheDocument()
    expect(queryByRole('button', {name: 'Play'})).toBeInTheDocument()
  })

  it('does not render the overlay play button when autoplaying', () => {
    const {getByRole, queryByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video" autoPlay muted>
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(queryByRole('button', {name: 'Play'})).not.toBeInTheDocument()
    expect(getByRole('button', {name: 'Play video'})).toBeInTheDocument()
  })

  it('syncs the mute control with an initially muted video', async () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video" muted>
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    await waitFor(() => {
      expect(getByRole('button', {name: 'Unmute'})).toBeInTheDocument()
    })

    await userEvent.click(getByRole('button', {name: 'Unmute'}))

    expect(video.muted).toBe(false)
  })

  it('supports positioning the controls bar at the bottom of the player', () => {
    const {container} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video" controlsPosition="bottom">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(container.querySelector('.VideoPlayer__container--controlsBottom')).toBeInTheDocument()
    expect(container.querySelector('.VideoPlayer__controlsBar--bottom')).toBeInTheDocument()
  })

  it('renders the enable/disable closed caption button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Enable captions'})).toBeInTheDocument()
  })

  it('renders the mute button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Mute'})).toBeInTheDocument()
  })

  it('renders the full screen button without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(getByRole('button', {name: 'Full screen'})).toBeInTheDocument()
  })

  it('renders the seek track without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(getByRole('slider', {name: 'Seek'})).toBeInTheDocument()
  })

  it('renders the volume track without errors', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(getByRole('slider', {name: 'Volume'})).toBeInTheDocument()
  })

  it('plays the video when the play button is pressed', async () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    expect(video.paused).toBe(true)

    await userEvent.click(getByRole('button', {name: 'Play video'}))

    waitFor(() => {
      expect(video.paused).toBe(false)
    })
  })

  it('pauses a playing video when the pause button is pressed', async () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    expect(video.paused).toBe(true)

    const playButton = getByRole('button', {name: 'Play video'})

    await userEvent.click(playButton)

    waitFor(() => {
      expect(video.paused).toBe(false)
    })

    waitFor(async () => {
      await userEvent.click(getByRole('button', {name: 'Pause video'}))
      expect(video.paused).toBe(true)
    })
  })

  it('sets the video volume when the volume slider is changed', () => {
    const {getByRole, getByTitle} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
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
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    const video = getByTitle('test video') as HTMLVideoElement

    expect(video.currentTime).toBe(0)

    const seekSlider = getByRole('slider', {name: 'Seek'}) as HTMLInputElement

    fireEvent.input(seekSlider, {target: {valueAsNumber: 42}})

    expect(video.currentTime).toBe(42)
  })

  it('shows the GitHub branding when showBranding is true', () => {
    const {getByRole} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video" showBranding>
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(getByRole('img', {name: 'GitHub logo'})).toBeInTheDocument()
  })

  it('does not show the GitHub branding when showBranding is false', () => {
    const {queryByLabelText} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video" showBranding={false}>
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    expect(queryByLabelText('GitHub logo')).not.toBeInTheDocument()
  })

  it('keeps tooltips visible for 100ms after the user stops hovering over the associated control', async () => {
    const user = userEvent.setup()

    const {getByRole, getByText} = render(
      <VideoPlayer poster="/example-poster.jpg" title="test video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
      </VideoPlayer>,
    )

    const captionsButton = getByRole('button', {name: 'Enable captions'})

    await user.hover(captionsButton)

    const tooltip = getByText('Enable captions')

    expect(tooltip).toBeVisible()

    await user.unhover(captionsButton)
    expect(tooltip).toBeVisible()

    await waitFor(
      () => {
        expect(tooltip).not.toBeVisible()
      },
      {timeout: 100},
    )
  })
})
