import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Hero} from './Hero'
import {axe, toHaveNoViolations} from 'jest-axe'
import {VideoPlayer} from '../VideoPlayer'

expect.extend(toHaveNoViolations)

describe('Hero', () => {
  const mockHeading = 'This is my super sweet hero heading'
  const mockDescription = 'A description of the hero'
  const mockPrimaryAction = {text: 'Primary Action', href: '#'}
  const mockSecondaryAction = {text: 'Secondary Action', href: '#'}

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })
  })

  afterEach(cleanup)

  test('renders correctly into the document', () => {
    const {getByText} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Description>{mockDescription}</Hero.Description>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.PrimaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.PrimaryAction>
      </Hero>,
    )
    const headingElement = getByText(mockHeading)
    const descriptionElement = getByText(mockDescription)
    const primaryActionElement = getByText(mockPrimaryAction.text)
    const secondaryActionElement = getByText(mockSecondaryAction.text)

    expect(headingElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
    expect(primaryActionElement).toBeInTheDocument()
    expect(secondaryActionElement).toBeInTheDocument()
  })

  test('renders without secondary action', () => {
    const {queryAllByRole} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
      </Hero>,
    )

    const linkElements = queryAllByRole('link')

    expect(linkElements.length).toBe(1)
  })

  test('renders without description', () => {
    const {container} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.SecondaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.SecondaryAction>
      </Hero>,
    )
    const descriptionEl = container.querySelector('p')

    expect(descriptionEl).toBeNull()
  })

  test('renders without description', () => {
    const mockLabel = 'Label'

    const {getByText} = render(
      <Hero>
        <Hero.Label>{mockLabel}</Hero.Label>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.SecondaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.SecondaryAction>
      </Hero>,
    )
    const labelEl = getByText(mockLabel)

    expect(labelEl).toBeInTheDocument()
  })

  test('renders with an optional image in block end alignment by default', () => {
    const mockAltText = 'placeholder image, blank with gray solid fill'

    const {getByAltText} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image src="mock.png" alt={mockAltText} />
      </Hero>,
    )
    const imageEl = getByAltText(mockAltText)

    expect(imageEl).toBeInTheDocument()
    expect(imageEl).toHaveClass('Hero-image--pos-block-end')
  })

  test('it has a slot for videos', () => {
    const mockTestId = 'hero-video'
    const {getByTestId} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Video data-testid={mockTestId} />
      </Hero>,
    )

    const videoElSlot = getByTestId(mockTestId)
    expect(videoElSlot).toBeInTheDocument()
    expect(videoElSlot.tagName).toBe('DIV')
  })

  test('it can render a native video in block-end alignment by default', () => {
    const mockTestId = 'hero-video'
    const mockTitle = 'Mock title'
    const {getByTitle, getByRole} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Video data-testid={mockTestId}>
          <video title={mockTitle}>
            <source src="./example.mp4" type="video/mp4" />
            <track src="./example.vtt" kind="captions" srcLang="en" label="English" default />
            Your browser does not support the video tag.
          </video>
        </Hero.Video>
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--image-pos-block-end')

    const videoEl = getByTitle(mockTitle)
    expect(videoEl).toBeInTheDocument()
  })

  test('it can render custom VideoPlayer in block-end alignment by default', () => {
    const mockTestId = 'hero-video'
    const mockTitle = 'Mock title'
    const {getByTitle, getByRole} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Video data-testid={mockTestId}>
          <VideoPlayer poster="/example-poster.jpg" title={mockTitle}>
            <VideoPlayer.Source src="/example.mp4" />
            <VideoPlayer.Track src="/example.vtt" default kind="subtitles" srcLang="en" label="English" />
          </VideoPlayer>
        </Hero.Video>
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--image-pos-block-end')

    const videoEl = getByTitle(mockTitle)
    expect(videoEl).toBeInTheDocument()
  })

  test('it can render a Youtube video in block-end alignment by default', () => {
    const mockTestId = 'hero-video'
    const mockTitle = 'Mock title'
    const {getByTitle, getByRole} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Video data-testid={mockTestId}>
          <iframe
            src="https://www.youtube.com/not-real-video"
            title={mockTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Hero.Video>
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--image-pos-block-end')
    const videoEl = getByTitle(mockTitle)
    expect(videoEl).toBeInTheDocument()
  })

  test('it can optionally render an image in inline end alignment', () => {
    const mockAltText = 'placeholder image, blank with gray solid fill'

    const {getByAltText} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-end" src="mock.png" alt={mockAltText} />
      </Hero>,
    )
    const imageEl = getByAltText(mockAltText)

    expect(imageEl).toBeInTheDocument()
    expect(imageEl).toHaveClass('Hero-image--pos-inline-end')
  })

  test('it can optionally render a video in inline-end alignment', () => {
    const mockTestId = 'hero-video'
    const mockTitle = 'Mock title'
    const {getByTitle, getByRole} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Video position="inline-end" data-testid={mockTestId}>
          <video title={mockTitle}>
            <source src="./example.mp4" type="video/mp4" />
            <track src="./example.vtt" kind="captions" srcLang="en" label="English" default />
            Your browser does not support the video tag.
          </video>
        </Hero.Video>
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--image-pos-inline-end')

    const videoEl = getByTitle(mockTitle)
    expect(videoEl).toBeInTheDocument()
  })

  test('renders with a label', () => {
    const mockLabel = 'Label'

    const {getByText} = render(
      <Hero>
        <Hero.Label>{mockLabel}</Hero.Label>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.SecondaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.SecondaryAction>
      </Hero>,
    )
    const labelEl = getByText(mockLabel)

    expect(labelEl).toBeInTheDocument()
    // The label text is inside TextCursorAnimation, check the parent Text element has Hero-label class
    expect(labelEl.closest('.Hero-label')).toBeInTheDocument()
  })

  it('provides an escape hatch to render a custom trailing component', () => {
    const trailingText = 'Custom trailing'
    const MockTrailingComponent = () => <div>{trailingText}</div>

    const {getByText} = render(
      <Hero trailingComponent={MockTrailingComponent}>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Description>{mockDescription}</Hero.Description>
      </Hero>,
    )

    const elTrailing = getByText(trailingText)

    expect(elTrailing).toBeInTheDocument()
  })

  test('no a11y violations', async () => {
    const {container} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Description>{mockDescription}</Hero.Description>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.SecondaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.SecondaryAction>
      </Hero>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  test('it prevents rendering multiple media types, preferring images by default', () => {
    const mockAltText = 'placeholder image, blank with gray solid fill'
    const mockVideoTestId = 'hero-video'
    const mockVideoTitle = 'Mock video title'

    const {getByAltText, queryByTitle, queryByTestId} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image src="mock.png" alt={mockAltText} />
        <Hero.Video data-testid={mockVideoTestId}>
          <video title={mockVideoTitle}>
            <source src="./example.mp4" type="video/mp4" />
            <track src="./example.vtt" kind="captions" srcLang="en" label="English" default />
            Your browser does not support the video tag.
          </video>
        </Hero.Video>
      </Hero>,
    )

    const imageEl = getByAltText(mockAltText)
    expect(imageEl).toBeInTheDocument()

    const videoContainer = queryByTestId(mockVideoTestId)
    expect(videoContainer).not.toBeInTheDocument()

    const videoEl = queryByTitle(mockVideoTitle)
    expect(videoEl).not.toBeInTheDocument()
  })

  test('renders with default variant by default', () => {
    const mockAltText = 'placeholder image'

    const {getByAltText} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const imageEl = getByAltText(mockAltText)
    expect(imageEl).not.toHaveClass('Hero-image--contained')
  })

  test('renders with a bordered-grid variant', () => {
    const mockAltText = 'placeholder image'

    const {getByAltText, getByRole, getByTestId} = render(
      <Hero variant="bordered-grid">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--variant-bordered-grid')

    const imageEl = getByAltText(mockAltText)
    expect(imageEl).toBeInTheDocument()

    const imageWrapper = getByTestId('Hero-imageWrapper')
    expect(imageWrapper).toBeInTheDocument()
  })

  test('renders the bordered-grid layout with optional inline layout. Defaults to end.', () => {
    const mockAltText = 'placeholder image'

    const {getByAltText, getByRole, getByTestId} = render(
      <Hero variant="bordered-grid">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-end" src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--variant-bordered-grid')
    expect(rootEl).toHaveClass('Hero--image-pos-inline-end')

    const imageEl = getByAltText(mockAltText)
    expect(imageEl).toBeInTheDocument()

    const gridEl = getByTestId('Hero-grid')
    expect(gridEl).toHaveClass('Hero-grid--bordered-inline')
  })

  test('renders the bordered-grid layout with optional inline start layout. ', () => {
    const mockAltText = 'placeholder image'

    const {getByAltText, getByRole, getByTestId} = render(
      <Hero variant="bordered-grid">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-start" src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--variant-bordered-grid')
    expect(rootEl).toHaveClass('Hero--image-pos-inline-start')

    // Image should be present
    const imageEl = getByAltText(mockAltText)
    expect(imageEl).toBeInTheDocument()

    const gridEl = getByTestId('Hero-grid')
    expect(gridEl).toHaveClass('Hero-grid--bordered-inline')
  })
})
