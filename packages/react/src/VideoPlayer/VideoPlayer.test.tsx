import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import {VideoPlayer} from '.'

describe('VideoPlayer', () => {
  HTMLMediaElement.prototype.pause = () => {}
  const pauseStub = jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  const playStub = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => new Promise(() => {}))

  const videoPlayer = (
    <VideoPlayer
      poster="https://github.githubassets.com/images/icons/media-player/poster.jpg"
      title="Hello world"
      crossOrigin="anonymous"
    >
      <VideoPlayer.Source src="https://cdn.api.video/vod/vi36GGvd6PoTqViQLxBWwHjJ/mp4/1080/source.mp4" />
      <VideoPlayer.Track
        src="https://raw.githubusercontent.com/JoshBowdenConcepts/Subtitles-Example/main/sample.vtt"
        default
        kind="subtitles"
        srcLang="en"
        label="English"
      />
    </VideoPlayer>
  )

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
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
  })

  it('plays the video when the playButton element is clicked', () => {
    render(videoPlayer)

    fireEvent.click(document.querySelector('.VideoPlayer__playButton') as Element)

    // Pause is called because when the video is rendered the pause action runs
    expect(pauseStub).toHaveBeenCalledTimes(1)
    expect(playStub).toHaveBeenCalledTimes(1)
    playStub.mockRestore()
    pauseStub.mockRestore()
  })

  it('is not muted by default', () => {
    render(videoPlayer)
    expect(document.querySelector('video')?.muted).toBe(false)
  })

  it('sets volume to 0 when mute button is clicked', () => {
    render(videoPlayer)

    const muteButton = Array.from(document.querySelectorAll('button')).find(
      btn => btn && btn.textContent && btn.textContent.includes('Mute'),
    ) as Element

    muteButton && fireEvent.click(muteButton)

    expect(document.querySelector('video')?.volume).toBe(0)
  })

  it('sets volume to initial volume when mute button is clicked twice', () => {
    render(videoPlayer)

    const muteButton = Array.from(document.querySelectorAll('button')).find(
      btn => btn && btn.textContent && btn.textContent.includes('Mute'),
    ) as Element

    muteButton && fireEvent.click(muteButton)
    muteButton && fireEvent.click(muteButton)

    expect(document.querySelector('video')?.volume).toBe(0.5)
  })

  it('sets volume to new value when the volume input is changed', () => {
    const testValue = 0.8
    render(videoPlayer)
    const input = document.querySelector('#VideoPlayer__Volume') as HTMLInputElement
    fireEvent.input(input, {target: {value: testValue}})

    expect(input.value).toBe(testValue.toString())
    expect(document.querySelector('video')?.volume).toBe(testValue)
  })
})
