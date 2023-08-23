import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import {VideoPlayer} from '.'

describe('VideoPlayer', () => {
  let pauseSpy: jest.SpyInstance
  let playSpy: jest.SpyInstance

  const videoPlayer = (
    <VideoPlayer poster="/example-poster.jpg" title="Hello world" data-testid={'video-player'}>
      <VideoPlayer.Source src="../../../apps/docs/static/example.mp4" />
      <VideoPlayer.Track
        src="../../../apps/docs/static/example.vtt"
        default
        kind="subtitles"
        srcLang="en"
        label="English"
      />
    </VideoPlayer>
  )

  beforeEach(() => {
    pauseSpy = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockReturnValue(undefined)
    playSpy = jest.spyOn(HTMLMediaElement.prototype, 'play').mockReturnValue(Promise.resolve())
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  it('renders correctly into the document', () => {
    const testTitle = 'Hello world'
    const {getByTitle} = render(videoPlayer)

    const textEl = getByTitle(testTitle)

    expect(textEl).toBeInTheDocument()
  })

  it('pauses the video by default', () => {
    render(videoPlayer)
    expect(document.querySelector('video')?.paused).toBe(true)
    expect(pauseSpy).toHaveBeenCalled()
  })

  it('plays the video when the playButton element is clicked', () => {
    render(videoPlayer)

    fireEvent.click(document.querySelector('.VideoPlayer__playButton') as Element)
    expect(playSpy).toHaveBeenCalled()
  })

  it('passes the play event function along to the play handler', () => {
    const testOnPlayFunction = jest.fn()
    render(
      <VideoPlayer poster="/example-poster.jpg" onPlay={testOnPlayFunction} title="Hello world">
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

    fireEvent.play(document.querySelector('.VideoPlayer') as Element)

    expect(testOnPlayFunction.mock.calls).toHaveLength(1)
  })

  it('passes the pause event function along to the pause handler', () => {
    const testOnPauseFunction = jest.fn()
    render(
      <VideoPlayer poster="/example-poster.jpg" onPause={testOnPauseFunction} title="Hello world">
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

    fireEvent.pause(document.querySelector('.VideoPlayer') as Element)

    expect(testOnPauseFunction.mock.calls).toHaveLength(1)
  })

  it('is not muted by default', () => {
    render(videoPlayer)
    expect(document.querySelector('video')?.muted).toBe(false)
  })

  it('sets volume to 0 when mute button is clicked', () => {
    render(videoPlayer)

    const muteButton = Array.from(document.querySelectorAll('button')).find(
      btn => btn.textContent && btn.textContent.includes('Mute'),
    ) as Element

    fireEvent.click(muteButton)

    expect(document.querySelector('video')?.volume).toBe(0)
  })

  it('sets volume to initial volume when mute button is clicked twice', () => {
    render(videoPlayer)

    const muteButton = Array.from(document.querySelectorAll('button')).find(
      btn => btn.textContent && btn.textContent.includes('Mute'),
    ) as Element

    fireEvent.click(muteButton)
    fireEvent.click(muteButton)

    expect(document.querySelector('video')?.volume).toBe(0.5)
  })

  it('sets volume to new value when the volume input is changed', () => {
    const testValue = 0.8
    render(videoPlayer)
    const input = document.querySelector('input[name="Volume"]') as HTMLInputElement
    fireEvent.input(input, {target: {value: testValue}})

    expect(input.value).toBe(testValue.toString())
    expect(document.querySelector('video')?.volume).toBe(testValue)
  })

  it('sets volume to new value when the volume input is changed', () => {
    const testValue = 0.8
    render(videoPlayer)
    const input = document.querySelector('input[name="Volume"]') as HTMLInputElement
    fireEvent.input(input, {target: {value: testValue}})

    expect(input.value).toBe(testValue.toString())
    expect(document.querySelector('video')?.volume).toBe(testValue)
  })
})
