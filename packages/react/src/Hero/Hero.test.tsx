import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Hero} from './Hero'
import {axe, toHaveNoViolations} from 'jest-axe'
import {VideoPlayer} from '../VideoPlayer'
import {Button} from '../Button'
import {ActionMenu} from '../ActionMenu'

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

  it('renders correctly into the document', () => {
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

  it('renders without secondary action', () => {
    const {queryAllByRole} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
      </Hero>,
    )

    const linkElements = queryAllByRole('link')

    expect(linkElements.length).toBe(1)
  })

  it('renders a ButtonGroup with Button and ActionMenu children in the expressive layout', () => {
    const {getByRole, getByTestId} = render(
      <Hero variant="gridline-expressive">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Description>{mockDescription}</Hero.Description>
        <Hero.ButtonGroup data-testid="hero-button-group">
          <Button>Primary Action</Button>
          <ActionMenu>
            <ActionMenu.Button>More actions</ActionMenu.Button>
            <ActionMenu.Overlay aria-label="More actions">
              <ActionMenu.Item value="Contact sales">Contact sales</ActionMenu.Item>
            </ActionMenu.Overlay>
          </ActionMenu>
        </Hero.ButtonGroup>
      </Hero>,
    )

    expect(getByTestId('hero-button-group')).toHaveClass('Hero-actions')
    expect(getByRole('button', {name: 'Primary Action'})).toBeInTheDocument()
    expect(getByRole('button', {name: 'More actions'})).toBeInTheDocument()
  })

  it('renders without description', () => {
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

  it('renders without description', () => {
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

  it('renders with an optional image in block end alignment by default', () => {
    const mockAltText = 'placeholder image, blank with gray solid fill'

    const {getByAltText} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image src="mock.png" alt={mockAltText} />
      </Hero>,
    )
    const imageEl = getByAltText(mockAltText)

    expect(imageEl).toBeInTheDocument()
    expect(imageEl).toHaveClass('Hero-media--pos-block-end')
  })

  it('applies Hero layout classes to the picture element when as="picture"', () => {
    const mockAltText = 'placeholder image, blank with gray solid fill'

    const {container} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image
          as="picture"
          src="mock.png"
          sources={[{srcset: 'mock-2x.png', media: '(min-width: 600px)'}]}
          alt={mockAltText}
        />
      </Hero>,
    )

    const pictureEl = container.querySelector('picture')
    expect(pictureEl).toBeInTheDocument()
    expect(pictureEl).toHaveClass('Hero-image')
    expect(pictureEl).toHaveClass('Hero-media')
    expect(pictureEl).toHaveClass('Hero-media--pos-block-end')
  })

  it('it has a slot for videos', () => {
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

  it('it can render a native video in block-end alignment by default', () => {
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

  it('it can render custom VideoPlayer in block-end alignment by default', () => {
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

  it('it can render a Youtube video in block-end alignment by default', () => {
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

  it('it can optionally render an image in inline end alignment', () => {
    const mockAltText = 'placeholder image, blank with gray solid fill'

    const {getByAltText} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-end" src="mock.png" alt={mockAltText} />
      </Hero>,
    )
    const imageEl = getByAltText(mockAltText)

    expect(imageEl).toBeInTheDocument()
    expect(imageEl).toHaveClass('Hero-media--pos-inline-end')
  })

  it('it can optionally render a video in inline-end alignment', () => {
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

  it('renders with a label', () => {
    const mockLabel = 'Label'
    const mockInitialLabel = 'Lable'

    const {getByText} = render(
      <Hero>
        <Hero.Label animate initialText={mockInitialLabel}>
          {mockLabel}
        </Hero.Label>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.SecondaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.SecondaryAction>
      </Hero>,
    )
    const labelEl = getByText(mockLabel)

    expect(labelEl).toBeInTheDocument()
    expect(getByText(mockInitialLabel)).toBeInTheDocument()
    // The label text is inside TextCursorAnimation, check the parent Text element has Hero-label class
    expect(labelEl.closest('.Hero-label')).toBeInTheDocument()
  })

  it('provides an escape hatch to render a custom trailing component', () => {
    const MockTrailingComponent = () => (
      <picture>
        <img src="trailing.jpg" alt="Custom trailing" />
      </picture>
    )

    const {getByRole} = render(
      <Hero trailingComponent={MockTrailingComponent}>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Description>{mockDescription}</Hero.Description>
      </Hero>,
    )

    const trailingImage = getByRole('img', {name: 'Custom trailing'})

    expect(trailingImage).toBeInTheDocument()
    expect(trailingImage.closest('[class*="Hero-trailing"]')).toBeInTheDocument()
  })

  it('no a11y violations', async () => {
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

  it('it prevents rendering multiple media types, preferring images by default', () => {
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

  it('renders with default variant by default', () => {
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

  it('renders with a gridline variant', () => {
    const mockAltText = 'placeholder image'

    const {getByAltText, getByRole, getByTestId} = render(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--variant-gridline')

    const imageEl = getByAltText(mockAltText)
    expect(imageEl).toBeInTheDocument()

    const imageWrapper = getByTestId('Hero-imageWrapper')
    expect(imageWrapper).toBeInTheDocument()
  })

  it('removes gridline media padding when requested by the image', () => {
    const {container, getByAltText} = render(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image padding="none" src="mock.png" alt="placeholder image" />
      </Hero>,
    )

    expect(container.querySelector('.Hero-imageWrapper')).toHaveClass('Hero-imageWrapper--padding-none')
    expect(container.querySelector('.Hero-imageWrapper-inner')).toHaveClass('Hero-imageWrapper-inner--padding-none')
    expect(getByAltText('placeholder image')).toHaveClass('Hero-media--padding-none')
  })

  it('does not apply an explicit background when gridline media is full bleed', () => {
    const {container} = render(
      <Hero variant="gridline" imageBackgroundColor="subtle">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image padding="none" src="mock.png" alt="placeholder image" />
      </Hero>,
    )

    expect(container.querySelector('.Hero-imageWrapper')).not.toHaveClass('Hero-imageWrapper--bg-subtle')
  })

  it('preserves the default gridline media padding', () => {
    const {container} = render(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image padding="default" src="mock.png" alt="placeholder image" />
      </Hero>,
    )

    const mediaWrapper = container.querySelector('.Hero-imageWrapper-inner')
    expect(mediaWrapper).not.toHaveClass('Hero-imageWrapper-inner--padding-none')
    expect(mediaWrapper).not.toHaveClass('Hero-imageWrapper-inner--padding-all')
  })

  it('removes expressive gridline media padding when requested by the video', () => {
    const {container, getByTitle} = render(
      <Hero variant="gridline-expressive">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Video padding="none">
          <iframe title="Example video" />
        </Hero.Video>
      </Hero>,
    )

    expect(container.querySelector('.Hero-imageWrapper')).toHaveClass('Hero-imageWrapper--padding-none')
    expect(container.querySelector('.Hero-imageWrapper-inner')).toHaveClass('Hero-imageWrapper-inner--padding-none')
    expect(getByTitle('Example video').parentElement).toHaveClass('Hero-media--padding-none')
    expect(getByTitle('Example video').parentElement).not.toHaveAttribute('padding')
  })

  it('does not forward media padding in the default Hero variant', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {container, getByAltText} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image padding="none" src="mock.png" alt="placeholder image" />
      </Hero>,
    )

    expect(container.querySelector('.Hero-imageWrapper-inner')).not.toBeInTheDocument()
    expect(getByAltText('placeholder image')).not.toHaveAttribute('padding')
    expect(warnSpy).toHaveBeenCalledWith(
      'Hero: media padding is only supported by the "gridline" and "gridline-expressive" variants; ignoring padding="none".',
    )

    warnSpy.mockRestore()
  })

  it('warns when padding="all" is used in the default Hero variant', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Video padding="all">
          <iframe title="Example video" />
        </Hero.Video>
      </Hero>,
    )

    expect(warnSpy).toHaveBeenCalledWith(
      'Hero: media padding is only supported by the "gridline" and "gridline-expressive" variants; ignoring padding="all".',
    )

    warnSpy.mockRestore()
  })

  it('does not warn for supported media padding combinations', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {rerender} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image padding="default" src="mock.png" alt="placeholder image" />
      </Hero>,
    )

    rerender(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image padding="none" src="mock.png" alt="placeholder image" />
      </Hero>,
    )

    rerender(
      <Hero variant="gridline-expressive">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Video padding="all">
          <iframe title="Example video" />
        </Hero.Video>
      </Hero>,
    )

    expect(warnSpy).not.toHaveBeenCalled()

    warnSpy.mockRestore()
  })

  it('renders the gridline layout with optional inline layout. Defaults to end.', () => {
    const mockAltText = 'placeholder image'

    const {container, getByAltText, getByRole, getByTestId} = render(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-end" src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--variant-gridline')
    expect(rootEl).toHaveClass('Hero--image-pos-inline-end')

    const imageEl = getByAltText(mockAltText)
    expect(imageEl).toBeInTheDocument()

    const gridEl = getByTestId('Hero-grid')
    expect(gridEl).toHaveClass('Hero-grid--bordered-inline')
    expect(container.querySelector('.Hero-imageContainer--inline-padding-all')).not.toBeInTheDocument()
  })

  it('renders the gridline layout with optional inline start layout. ', () => {
    const mockAltText = 'placeholder image'

    const {getByAltText, getByRole, getByTestId} = render(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-start" src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--variant-gridline')
    expect(rootEl).toHaveClass('Hero--image-pos-inline-start')

    // Image should be present
    const imageEl = getByAltText(mockAltText)
    expect(imageEl).toBeInTheDocument()

    const gridEl = getByTestId('Hero-grid')
    expect(gridEl).toHaveClass('Hero-grid--bordered-inline')
  })

  it('renders with gridline-expressive variant', () => {
    const {getByRole, getByTestId} = render(
      <Hero variant="gridline-expressive">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Description>{mockDescription}</Hero.Description>
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--variant-gridline-expressive')

    const gridEl = getByTestId('Hero-grid')
    expect(gridEl).toHaveClass('Hero-grid--expressive')
  })

  it('ignores align="center" for the gridline-expressive variant and warns in development', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const {getByRole} = render(
      <Hero variant="gridline-expressive" align="center">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Description>{mockDescription}</Hero.Description>
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--align-start')
    expect(rootEl).not.toHaveClass('Hero--align-center')
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('gridline-expressive'))

    warnSpy.mockRestore()
  })

  it('renders with center alignment', () => {
    const {getByRole} = render(
      <Hero align="center">
        <Hero.Heading>{mockHeading}</Hero.Heading>
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--align-center')
  })

  it('renders with start alignment by default', () => {
    const {getByRole} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--align-start')
  })

  it('renders Hero.Eyebrow correctly', () => {
    const mockEyebrow = 'Eyebrow text'

    const {getByText} = render(
      <Hero>
        <Hero.Eyebrow>{mockEyebrow}</Hero.Eyebrow>
        <Hero.Heading>{mockHeading}</Hero.Heading>
      </Hero>,
    )

    const eyebrowEl = getByText(mockEyebrow)
    expect(eyebrowEl).toBeInTheDocument()
  })

  it('renders block-end media with padding on all sides', () => {
    const mockAltText = 'placeholder image'

    const {container, getByRole} = render(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="block-end" padding="all" src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--image-pos-block-end')
    expect(container.querySelector('.Hero-imageWrapper-inner')).toHaveClass('Hero-imageWrapper-inner--padding-all')
  })

  it('renders inline-end media with padding on all sides', () => {
    const mockAltText = 'placeholder image'

    const {container, getByAltText, getByRole} = render(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-end" padding="all" src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--image-pos-inline-end')
    expect(container.querySelector('.Hero-imageContainer--inline-padding-all')).toBeInTheDocument()
    expect(getByAltText(mockAltText)).toHaveClass('Hero-media--padding-all')
  })

  it('removes the inline media container background when padding is none', () => {
    const {container} = render(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-end" padding="none" src="mock.png" alt="placeholder image" />
      </Hero>,
    )

    expect(container.querySelector('.Hero-imageContainer--inline-bordered')).toHaveClass(
      'Hero-imageContainer--inline-padding-none',
    )
  })

  it('renders inline-start media with padding on all sides', () => {
    const mockAltText = 'placeholder image'

    const {container, getByAltText, getByRole} = render(
      <Hero variant="gridline">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-start" padding="all" src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const rootEl = getByRole('region')
    expect(rootEl).toHaveClass('Hero--image-pos-inline-start')
    expect(container.querySelector('.Hero-imageContainer--inline-padding-all')).toBeInTheDocument()
    expect(getByAltText(mockAltText)).toHaveClass('Hero-media--padding-all')
  })

  it('renders with default imageBackgroundColor', () => {
    const mockAltText = 'placeholder image'

    const {container} = render(
      <Hero variant="gridline" imageBackgroundColor="default">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const imageWrapper = container.querySelector('.Hero-imageWrapper--bg-default')
    expect(imageWrapper).toBeInTheDocument()
  })

  it('renders with subtle imageBackgroundColor', () => {
    const mockAltText = 'placeholder image'

    const {container} = render(
      <Hero variant="gridline" imageBackgroundColor="subtle">
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image src="mock.png" alt={mockAltText} />
      </Hero>,
    )

    const imageWrapper = container.querySelector('.Hero-imageWrapper--bg-subtle')
    expect(imageWrapper).toBeInTheDocument()
  })

  it('renders with duotone styles when <b> tag is used inside the Hero.Heading', () => {
    const {getByText} = render(
      <Hero>
        <Hero.Heading>
          This is my super sweet hero heading with an <b>emphasized part</b>
        </Hero.Heading>
      </Hero>,
    )

    const emphasizedText = getByText('emphasized part')
    expect(emphasizedText).toBeInTheDocument()
    expect(emphasizedText.tagName).toBe('B')
  })
})
