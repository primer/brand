import React from 'react'
import {render, cleanup, act, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {RiverStoryScroll} from './RiverStoryScroll'
import {River} from '../River/River'
import {Heading, Text, Link, VideoPlayer} from '../../'
import {useWindowSize} from '../../hooks/useWindowSize'
import {useStoryScrollContext} from './RiverStoryScrollProvider'
import {RiverStoryScrollTracker} from './RiverStoryScrollTracker'

expect.extend(toHaveNoViolations)

jest.mock('../../hooks/useWindowSize')
const mockUseWindowSize = useWindowSize as jest.Mock
mockUseWindowSize.mockImplementation(() => ({isLarge: true}))

const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})
window.IntersectionObserver = mockIntersectionObserver

const mockMatchMedia = jest.fn()
window.matchMedia = mockMatchMedia

const MockRiverChildren = [
  <River key={0}>
    <River.Content>
      <Heading>First heading</Heading>
      <Text>First text content</Text>
      <Link href="#">First link</Link>
    </River.Content>
    <River.Visual>
      <img src="image1.jpg" alt="Placeholder 1" />
    </River.Visual>
  </River>,
  <River key={1}>
    <River.Content>
      <Heading>Second heading</Heading>
      <Text>Second text content</Text>
      <Link href="#">Second link</Link>
    </River.Content>
    <River.Visual>
      <VideoPlayer title="Example video">
        <VideoPlayer.Source src="/example.mp4" />
        <VideoPlayer.Track src="/example.vtt" default />
      </VideoPlayer>
    </River.Visual>
  </River>,
  <River key={2}>
    <River.Content>
      <Heading>Third heading</Heading>
      <Text>Third text content</Text>
    </River.Content>
    <River.Visual>
      <img src="image2.jpg" alt="Placeholder 2" />
    </River.Visual>
  </River>,
]

const withWindowDimensions = (width: number, height: number, testFn: () => void) => {
  const originalInnerWidth = window.innerWidth
  const originalInnerHeight = window.innerHeight

  try {
    Object.defineProperty(window, 'innerWidth', {value: width, writable: true})
    Object.defineProperty(window, 'innerHeight', {value: height, writable: true})

    testFn()
  } finally {
    // Guaranteed cleanup even if test fails
    Object.defineProperty(window, 'innerWidth', {value: originalInnerWidth, writable: true})
    Object.defineProperty(window, 'innerHeight', {value: originalInnerHeight, writable: true})
  }
}

const runInteractionTest = (width: number, height: number) => {
  withWindowDimensions(width, height, () => {
    const isLandscape = width > height
    const isLarge = width >= 1012

    if (!isLarge) {
      mockUseWindowSize.mockImplementation(() => ({isLarge: false}))
    }

    const {container} = render(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)

    const observerCalls = mockIntersectionObserver.mock.calls
      .map(([fn]) => fn)
      .filter(fn => fn.name === (isLandscape ? 'observerCallback' : 'observerCallbackPortrait'))

    const firstSectionCallback = observerCalls[0]
    const secondSectionCallback = observerCalls[1]
    const thirdSectionCallback = observerCalls[2]

    // Scroll first section into view
    act(() => {
      firstSectionCallback([{isIntersecting: true}])
    })

    let insideViewport = container.querySelector('.in-viewport') as HTMLElement

    // Check that only the first section is visible
    expect(within(insideViewport).getByText('First heading')).toBeInTheDocument()
    expect(within(insideViewport).getByText('First text content')).toBeInTheDocument()
    expect(within(insideViewport).getByAltText('Placeholder 1')).toBeInTheDocument()

    expect(within(insideViewport).queryByText('Second heading')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByText('Second text content')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByTitle('Example video')).not.toBeInTheDocument()

    expect(within(insideViewport).queryByText('Third heading')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByText('Third text content')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByAltText('Placeholder 2')).not.toBeInTheDocument()

    // Scroll second section into view
    act(() => {
      firstSectionCallback([{isIntersecting: false}])
      secondSectionCallback([{isIntersecting: true}])
    })

    insideViewport = container.querySelector('.in-viewport') as HTMLElement

    // Check that only the second section is visible
    expect(within(insideViewport).queryByText('First heading')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByText('First text content')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByAltText('Placeholder 1')).not.toBeInTheDocument()

    expect(within(insideViewport).getByText('Second heading')).toBeInTheDocument()
    expect(within(insideViewport).getByText('Second text content')).toBeInTheDocument()
    expect(within(insideViewport).getByTitle('Example video')).toBeInTheDocument()

    expect(within(insideViewport).queryByText('Third heading')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByText('Third text content')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByAltText('Placeholder 2')).not.toBeInTheDocument()

    // Scroll third section into view
    act(() => {
      secondSectionCallback([{isIntersecting: false}])
      thirdSectionCallback([{isIntersecting: true}])
    })

    insideViewport = container.querySelector('.in-viewport') as HTMLElement

    // Check that only the third section is visible
    expect(within(insideViewport).queryByText('First heading')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByText('First text content')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByAltText('Placeholder 1')).not.toBeInTheDocument()

    expect(within(insideViewport).queryByText('Second heading')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByText('Second text content')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByTitle('Example video')).not.toBeInTheDocument()

    expect(within(insideViewport).getByText('Third heading')).toBeInTheDocument()
    expect(within(insideViewport).getByText('Third text content')).toBeInTheDocument()
    expect(within(insideViewport).getByAltText('Placeholder 2')).toBeInTheDocument()

    // Scroll back to first section
    act(() => {
      thirdSectionCallback([{isIntersecting: false}])
      firstSectionCallback([{isIntersecting: true}])
    })

    insideViewport = container.querySelector('.in-viewport') as HTMLElement

    // Check that only the first section is visible again
    expect(within(insideViewport).getByText('First heading')).toBeInTheDocument()
    expect(within(insideViewport).getByText('First text content')).toBeInTheDocument()
    expect(within(insideViewport).getByAltText('Placeholder 1')).toBeInTheDocument()

    expect(within(insideViewport).queryByText('Second heading')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByText('Second text content')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByTitle('Example video')).not.toBeInTheDocument()

    expect(within(insideViewport).queryByText('Third heading')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByText('Third text content')).not.toBeInTheDocument()
    expect(within(insideViewport).queryByAltText('Placeholder 2')).not.toBeInTheDocument()
  })
}

describe('RiverStoryScroll', () => {
  beforeEach(() => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })
    mockIntersectionObserver.mockClear()

    jest.spyOn(HTMLMediaElement.prototype, 'pause').mockReturnValue(undefined)
    jest.spyOn(HTMLMediaElement.prototype, 'play').mockReturnValue(Promise.resolve())
    jest.spyOn(console, 'error').mockImplementation(() => null)
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('has no a11y violations', async () => {
    const {container} = render(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)
    const results = await axe(container, {preload: false})

    expect(results).toHaveNoViolations()
  })

  it('renders correctly with children', () => {
    const {container} = render(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)

    expect(container.firstChild).toHaveClass('RiverStoryScroll')
    expect(container.firstChild).toHaveClass('RiverStoryScroll--enabled')
  })

  it('renders without children', () => {
    const {container} = render(<RiverStoryScroll />)

    expect(container.firstChild).toHaveClass('RiverStoryScroll')
  })

  it('renders empty children array', () => {
    const {container} = render(<RiverStoryScroll>{[]}</RiverStoryScroll>)

    expect(container.firstChild).toHaveClass('RiverStoryScroll')
  })

  it('renders children directly when disabled prop is true', () => {
    const {container, getByText} = render(<RiverStoryScroll disabled>{MockRiverChildren}</RiverStoryScroll>)

    expect(container.querySelector('.RiverStoryScroll')).not.toBeInTheDocument()
    expect(getByText('First heading')).toBeInTheDocument()
    expect(getByText('Second heading')).toBeInTheDocument()
    expect(getByText('Third heading')).toBeInTheDocument()
  })

  it('renders children directly when prefers-reduced-motion is enabled', () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })

    const {container, getByText} = render(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)

    expect(container.querySelector('.RiverStoryScroll')).not.toBeInTheDocument()
    expect(getByText('First heading')).toBeInTheDocument()
    expect(getByText('Second heading')).toBeInTheDocument()
    expect(getByText('Third heading')).toBeInTheDocument()
  })

  it('applies enabled classes when not disabled and motion not reduced', () => {
    const {container} = render(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)

    expect(container.firstChild).toHaveClass('RiverStoryScroll--enabled')
  })

  it('cleans up media query listener on unmount', () => {
    const removeEventListenerSpy = jest.fn()
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerSpy,
    })

    const {unmount} = render(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('responds to prefers-reduced-motion changes', () => {
    const addEventListenerSpy = jest.fn()
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: addEventListenerSpy,
      removeEventListener: jest.fn(),
    })

    const {container, rerender} = render(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)

    expect(container.firstChild).toHaveClass('RiverStoryScroll--enabled')
    expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function))

    const listener = addEventListenerSpy.mock.calls[0][1]

    act(() => {
      listener({matches: true})
    })

    rerender(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)

    expect(container.querySelector('.RiverStoryScroll')).not.toBeInTheDocument()
  })

  it('renders tracker components for each child', () => {
    const {container} = render(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)

    const trackers = container.querySelectorAll('.RiverStoryScroll__tracker')
    expect(trackers).toHaveLength(3)
  })

  it('renders the correct number of pagination dots', () => {
    const {container} = render(<RiverStoryScroll>{MockRiverChildren}</RiverStoryScroll>)

    const paginationDots = container.querySelectorAll('.RiverStoryScroll__pagination-dot')
    expect(paginationDots).toHaveLength(3)
  })

  it('handles video element without source src attribute', () => {
    const childWithVideoNoSrc = (
      <River key={0}>
        <River.Content>
          <Heading>Test heading</Heading>
          <Text>Test content</Text>
        </River.Content>
        <River.Visual>
          <video title="Test video">
            <source type="video/mp4" />
            <track kind="captions" />
          </video>
        </River.Visual>
      </River>
    )

    const {getByTitle} = render(<RiverStoryScroll>{[childWithVideoNoSrc]}</RiverStoryScroll>)

    expect(getByTitle('Test video')).toBeInTheDocument()
  })

  it('handles video element without source element', () => {
    const childWithVideoNoSource = (
      <River key={0}>
        <River.Content>
          <Heading>Test heading</Heading>
          <Text>Test content</Text>
        </River.Content>
        <River.Visual>
          <video title="Test video">
            <track kind="captions" />
          </video>
        </River.Visual>
      </River>
    )

    const {getByTitle} = render(<RiverStoryScroll>{[childWithVideoNoSource]}</RiverStoryScroll>)

    expect(getByTitle('Test video')).toBeInTheDocument()
  })

  it('throws error when using StoryScrollContext outside provider', () => {
    const TestComponent = () => {
      const {setVisibilityStates} = useStoryScrollContext()
      // Trigger the error by calling the function
      setVisibilityStates(0, true)
      return <div>Test</div>
    }

    expect(() => render(<TestComponent />)).toThrow('setVisibilityStates function must be implemented.')
  })

  it('handles video play errors in RiverStoryScrollResponder', () => {
    const childWithVideo = (
      <River key={0}>
        <River.Content>
          <Heading>Test heading</Heading>
          <Text>Test content</Text>
        </River.Content>
        <River.Visual>
          <video>
            <source src="/test.mp4" type="video/mp4" />
            <track kind="captions" />
          </video>
        </River.Visual>
      </River>
    )

    const mockPlay = jest.fn().mockRejectedValue(new Error('Play failed'))
    HTMLVideoElement.prototype.play = mockPlay
    HTMLVideoElement.prototype.pause = jest.fn()

    const {container} = render(<RiverStoryScroll>{[childWithVideo]}</RiverStoryScroll>)

    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    act(() => {
      observerCallback([{isIntersecting: true}])
    })

    // Check that the RiverStoryScroll is still rendered
    expect(container.firstChild).toHaveClass('RiverStoryScroll')
  })

  it('scrolls through content and shows correct visibility states when large landscape', () => {
    runInteractionTest(1920, 1080)
  })

  it('scrolls through content and shows correct visibility states when large portrait', () => {
    runInteractionTest(1080, 1920)
  })

  it('scrolls through content and shows correct visibility states when small portrait', () => {
    runInteractionTest(375, 667)
  })

  it('scrolls through content and shows correct visibility states when small landscape', () => {
    runInteractionTest(667, 375)
  })

  it('sets the correct class on RiverStoryScrollTracker when className is not provided', () => {
    const {container} = render(<RiverStoryScrollTracker index={0} />)

    expect((container.firstChild as HTMLElement).className).toBe('outside-viewport')
  })
})
