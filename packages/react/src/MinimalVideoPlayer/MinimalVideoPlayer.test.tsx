import React, {createRef} from 'react'
import {act, cleanup, fireEvent, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {MinimalVideoPlayer} from '.'

expect.extend(toHaveNoViolations)

describe('MinimalVideoPlayer', () => {
  let playMock: jest.SpyInstance
  let pauseMock: jest.SpyInstance
  let intersectionObserverCallback: IntersectionObserverCallback
  let motionPreferenceChangeListener: (event: MediaQueryListEvent) => void
  let prefersReducedMotion: boolean

  beforeEach(() => {
    prefersReducedMotion = false
    motionPreferenceChangeListener = () => undefined

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: prefersReducedMotion,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((_type, listener) => {
          motionPreferenceChangeListener = listener
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    window.IntersectionObserver = jest.fn(callback => {
      intersectionObserverCallback = callback
      return {
        root: null,
        rootMargin: '',
        thresholds: [0],
        disconnect: jest.fn(),
        observe: jest.fn(),
        takeRecords: jest.fn(),
        unobserve: jest.fn(),
      }
    })

    playMock = jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
    pauseMock = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockReturnValue(undefined)
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  const setIntersection = (video: HTMLElement, intersectionRatio: number) => {
    const rect = video.getBoundingClientRect()

    act(() => {
      intersectionObserverCallback(
        [
          {
            boundingClientRect: rect,
            intersectionRect: intersectionRatio > 0 ? rect : new DOMRectReadOnly(),
            intersectionRatio,
            isIntersecting: intersectionRatio > 0,
            rootBounds: null,
            target: video,
            time: 0,
          },
        ],
        {} as IntersectionObserver,
      )
    })
  }

  const setReducedMotion = (matches: boolean) => {
    prefersReducedMotion = matches
    act(() => {
      motionPreferenceChangeListener({matches} as MediaQueryListEvent)
    })
  }

  it('renders native video sources and attributes', () => {
    const {getByTitle} = render(
      <MinimalVideoPlayer
        className="custom-video"
        poster="/example-poster.jpg"
        preload="metadata"
        src="/example.webm"
        title="Product interface demonstration"
      >
        <source src="/example.mp4" type="video/mp4" />
      </MinimalVideoPlayer>,
    )

    const video = getByTitle('Product interface demonstration')

    expect(video).toHaveAttribute('src', '/example.webm')
    expect(video).toHaveAttribute('poster', '/example-poster.jpg')
    expect(video).toHaveAttribute('preload', 'metadata')
    expect(video).toHaveClass('custom-video')
    expect(video.querySelector('source')).toHaveAttribute('src', '/example.mp4')
    expect(video.querySelector('source')).toHaveAttribute('type', 'video/mp4')
  })

  it('enforces minimal playback attributes and defaults autoplay eligibility and looping on', () => {
    const {getByTitle} = render(<MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />)

    const video = getByTitle('Product interface demonstration') as HTMLVideoElement

    expect(video.autoplay).toBe(false)
    expect(video.loop).toBe(true)
    expect(video.muted).toBe(true)
    expect(video.playsInline).toBe(true)
    expect(video.controls).toBe(false)
    expect(video).not.toHaveAttribute('controls')
  })

  it('allows autoplay eligibility and looping to be disabled', () => {
    const {getByTitle} = render(
      <MinimalVideoPlayer autoPlay={false} loop={false} src="/example.mp4" title="Product interface demonstration" />,
    )

    const video = getByTitle('Product interface demonstration') as HTMLVideoElement

    expect(video.autoplay).toBe(false)
    expect(video.loop).toBe(false)
  })

  it('autoplays an eligible video when it is visible', () => {
    const {getByTitle} = render(<MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />)
    const video = getByTitle('Product interface demonstration')

    setIntersection(video, 1)

    expect(playMock).toHaveBeenCalledTimes(1)
  })

  it('autoplays an eligible video when IntersectionObserver is unavailable', () => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: undefined,
    })

    render(<MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />)

    expect(playMock).toHaveBeenCalledTimes(1)
  })

  it('waits for an initially offscreen video to become visible before autoplaying', () => {
    const {getByTitle} = render(<MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />)
    const video = getByTitle('Product interface demonstration')

    setIntersection(video, 0)
    expect(playMock).not.toHaveBeenCalled()

    setIntersection(video, 0.01)
    expect(playMock).toHaveBeenCalledTimes(1)
  })

  it('uses the current autoPlay value when visibility is first observed', () => {
    const {getByTitle, rerender} = render(
      <MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />,
    )
    const video = getByTitle('Product interface demonstration')

    rerender(<MinimalVideoPlayer autoPlay={false} src="/example.mp4" title="Product interface demonstration" />)
    setIntersection(video, 1)

    expect(playMock).not.toHaveBeenCalled()

    rerender(<MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />)
    setIntersection(video, 1)

    expect(playMock).toHaveBeenCalledTimes(1)
  })

  it('pauses fully offscreen playback and resumes it on re-entry', () => {
    const {getByTitle} = render(<MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />)
    const video = getByTitle('Product interface demonstration')

    setIntersection(video, 1)
    fireEvent.playing(video)
    setIntersection(video, 0)

    expect(pauseMock).toHaveBeenCalledTimes(1)

    fireEvent.pause(video)
    setIntersection(video, 1)

    expect(playMock).toHaveBeenCalledTimes(2)
  })

  it('does not resume after a manual pause', async () => {
    const user = userEvent.setup()
    const {getByRole, getByTitle} = render(
      <MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />,
    )
    const video = getByTitle('Product interface demonstration')

    setIntersection(video, 1)
    fireEvent.playing(video)
    await user.click(getByRole('button', {name: 'Pause video'}))
    fireEvent.pause(video)
    setIntersection(video, 0)
    setIntersection(video, 1)

    expect(playMock).toHaveBeenCalledTimes(1)
  })

  it('does not resume when it leaves the viewport before a manual pause event fires', async () => {
    const user = userEvent.setup()
    const {getByRole, getByTitle} = render(
      <MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />,
    )
    const video = getByTitle('Product interface demonstration')

    setIntersection(video, 1)
    fireEvent.playing(video)
    await user.click(getByRole('button', {name: 'Pause video'}))
    setIntersection(video, 0)
    fireEvent.pause(video)
    setIntersection(video, 1)

    expect(playMock).toHaveBeenCalledTimes(1)
  })

  it('does not autoplay or viewport-resume when autoplay is disabled', async () => {
    const user = userEvent.setup()
    const {getByRole, getByTitle} = render(
      <MinimalVideoPlayer autoPlay={false} src="/example.mp4" title="Product interface demonstration" />,
    )
    const video = getByTitle('Product interface demonstration')

    setIntersection(video, 1)
    expect(playMock).not.toHaveBeenCalled()

    await user.click(getByRole('button', {name: 'Play video'}))
    fireEvent.playing(video)
    setIntersection(video, 0)
    fireEvent.pause(video)
    setIntersection(video, 1)

    expect(playMock).toHaveBeenCalledTimes(1)
  })

  it('suppresses initial autoplay when reduced motion is requested', async () => {
    prefersReducedMotion = true
    const user = userEvent.setup()
    const {getByRole, getByTitle} = render(
      <MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />,
    )
    const video = getByTitle('Product interface demonstration')

    setIntersection(video, 1)
    setReducedMotion(false)

    expect(playMock).not.toHaveBeenCalled()

    await user.click(getByRole('button', {name: 'Play video'}))
    expect(playMock).toHaveBeenCalledTimes(1)
  })

  it('pauses on a live reduced-motion preference and does not resume later', () => {
    const {getByTitle} = render(<MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />)
    const video = getByTitle('Product interface demonstration')

    setIntersection(video, 1)
    fireEvent.playing(video)
    setReducedMotion(true)

    expect(pauseMock).toHaveBeenCalledTimes(1)

    fireEvent.pause(video)
    setReducedMotion(false)
    setIntersection(video, 0)
    setIntersection(video, 1)

    expect(playMock).toHaveBeenCalledTimes(1)
  })

  it('preserves native playback event handlers', () => {
    const onPlay = jest.fn()
    const onPlaying = jest.fn()
    const onPause = jest.fn()
    const onEnded = jest.fn()
    const {getByTitle} = render(
      <MinimalVideoPlayer
        onEnded={onEnded}
        onPause={onPause}
        onPlay={onPlay}
        onPlaying={onPlaying}
        src="/example.mp4"
        title="Product interface demonstration"
      />,
    )
    const video = getByTitle('Product interface demonstration')

    fireEvent.play(video)
    fireEvent.playing(video)
    fireEvent.pause(video)
    fireEvent.ended(video)

    expect(onPlay).toHaveBeenCalledTimes(1)
    expect(onPlaying).toHaveBeenCalledTimes(1)
    expect(onPause).toHaveBeenCalledTimes(1)
    expect(onEnded).toHaveBeenCalledTimes(1)
  })

  it('uses a custom video test ID', () => {
    const {getByTestId} = render(
      <MinimalVideoPlayer data-testid="custom-video" src="/example.mp4" title="Product interface demonstration" />,
    )

    expect(getByTestId('custom-video')).toHaveAttribute('title', 'Product interface demonstration')
  })

  it('forwards its ref to the video element', () => {
    const ref = createRef<HTMLVideoElement>()

    render(<MinimalVideoPlayer ref={ref} src="/example.mp4" title="Product interface demonstration" />)

    expect(ref.current).toBeInstanceOf(HTMLVideoElement)
    expect(ref.current).toHaveAttribute('title', 'Product interface demonstration')
  })

  it('uses overridable internal accessible labels', () => {
    const {getByRole, getByTitle} = render(
      <MinimalVideoPlayer
        internalAccessibleLabels={{play: 'Start animation', pause: 'Stop animation'}}
        src="/example.mp4"
        title="Product interface demonstration"
      />,
    )

    expect(getByRole('button', {name: 'Start animation'})).toBeInTheDocument()

    fireEvent.play(getByTitle('Product interface demonstration'))

    expect(getByRole('button', {name: 'Stop animation'})).toBeInTheDocument()
  })

  it('plays and pauses only through the overlaid control', async () => {
    const user = userEvent.setup()
    const {getByRole, getByTitle} = render(
      <MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />,
    )
    const video = getByTitle('Product interface demonstration')

    fireEvent.click(video)
    expect(playMock).not.toHaveBeenCalled()
    expect(pauseMock).not.toHaveBeenCalled()

    await user.click(getByRole('button', {name: 'Play video'}))
    expect(playMock).toHaveBeenCalledTimes(1)
    expect(getByRole('button', {name: 'Play video'})).toBeInTheDocument()

    fireEvent.playing(video)
    expect(getByRole('button', {name: 'Pause video'})).toBeInTheDocument()

    await user.click(getByRole('button', {name: 'Pause video'}))
    expect(pauseMock).toHaveBeenCalledTimes(1)
    expect(getByRole('button', {name: 'Play video'})).toBeInTheDocument()

    fireEvent.pause(video)
    expect(getByRole('button', {name: 'Play video'})).toBeInTheDocument()
  })

  it('returns to the paused control state when playback ends', () => {
    const {getByRole, getByTitle} = render(
      <MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />,
    )
    const video = getByTitle('Product interface demonstration')

    fireEvent.play(video)
    expect(getByRole('button', {name: 'Pause video'})).toBeInTheDocument()

    fireEvent.ended(video)
    expect(getByRole('button', {name: 'Play video'})).toBeInTheDocument()
  })

  it('keeps the paused control state when playback fails', async () => {
    playMock.mockRejectedValueOnce(new DOMException('Playback was prevented', 'NotAllowedError'))
    const user = userEvent.setup()
    const {getByRole} = render(<MinimalVideoPlayer src="/example.mp4" title="Product interface demonstration" />)

    await user.click(getByRole('button', {name: 'Play video'}))

    expect(getByRole('button', {name: 'Play video'})).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<MinimalVideoPlayer title="Product interface demonstration" />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
