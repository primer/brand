import React, {render, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import {LogoSuite} from './LogoSuite'
import '../test-utils/mocks/match-media-mock'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('LogoSuite', () => {
  const mockHeading = 'Mock heading'
  const mockDescription = 'Mock description'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document with default options', () => {
    const testId = 'logobar'
    const {getByText, getByTestId} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Description>{mockDescription}</LogoSuite.Description>
        <LogoSuite.Logobar data-testid={testId}>
          <svg data-testid="svg1" aria-label="Mock SVG" />
          <svg data-testid="svg2" aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    expect(getByText(mockHeading)).toBeInTheDocument()
    expect(getByText(mockDescription)).toBeInTheDocument()
    expect(getByTestId(testId).children.length).toBe(2)
    expect(getByTestId('svg1')).toBeInTheDocument()
    expect(getByTestId('svg2')).toBeInTheDocument()
  })

  it('renders logos correctly using a fragment', () => {
    const {getByTestId} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar>
          <>
            <svg data-testid="svg1" aria-label="Mock SVG" />
            <svg data-testid="svg2" aria-label="Mock SVG" />
          </>
        </LogoSuite.Logobar>
      </LogoSuite>,
    )
    const svg1Element = getByTestId('svg1')
    const svg2Element = getByTestId('svg2')
    expect(svg1Element).toBeInTheDocument()
    expect(svg2Element).toBeInTheDocument()
  })

  it('renders logos correctly using anchors', () => {
    const {getByLabelText, getAllByRole} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar>
          <a href="/" aria-label="Logo 1">
            <svg role="img">
              <title>Logo 1</title>
            </svg>
          </a>
          <a href="/" aria-label="Logo 2">
            <svg role="img">
              <title>Logo 2</title>
            </svg>
          </a>
        </LogoSuite.Logobar>
      </LogoSuite>,
    )
    const logo1Element = getByLabelText('Logo 1')
    const logo2Element = getByLabelText('Logo 2')
    expect(logo1Element).toBeInTheDocument()
    expect(logo2Element).toBeInTheDocument()

    expect(getAllByRole('link').length).toBe(2)
    expect(getAllByRole('img').length).toBe(2)
  })

  it('can render a heading as visually hidden', () => {
    const {getByText} = render(
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>{mockHeading}</LogoSuite.Heading>
      </LogoSuite>,
    )
    const headingEl = getByText(mockHeading)
    expect(headingEl.classList).toContain('visually-hidden')
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Description>{mockDescription}</LogoSuite.Description>
        <LogoSuite.Logobar>
          <svg aria-label="Mock SVG" />
          <img src="#" alt="Company Name" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the correct default heading tag', () => {
    const expectedTag = 'h2'

    const {getByText} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
      </LogoSuite>,
    )
    const header = getByText(mockHeading)

    expect(header.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the correct heading tag when an override is used', () => {
    const expectedTag = 'h3'

    const {getByText} = render(
      <LogoSuite>
        <LogoSuite.Heading as={expectedTag}>{mockHeading}</LogoSuite.Heading>
      </LogoSuite>,
    )
    const header = getByText(mockHeading)

    expect(header.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders a divider by default', () => {
    const {getByTestId} = render(
      <LogoSuite data-testid="root">
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
      </LogoSuite>,
    )
    const expectedClass = 'LogoSuite--hasDivider'

    const rootEl = getByTestId('root')
    expect(rootEl.classList).toContain(expectedClass)
  })

  it('displays text in the center by default', () => {
    const {getByTestId} = render(
      <LogoSuite data-testid="root">
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
      </LogoSuite>,
    )
    const expectedClass = 'LogoSuite--center'

    const rootEl = getByTestId('root')
    expect(rootEl.classList).toContain(expectedClass)
  })

  it('can optionally display text in start alignment', () => {
    const {getByTestId} = render(
      <LogoSuite data-testid="root" align="start">
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Description>{mockDescription}</LogoSuite.Description>
      </LogoSuite>,
    )
    const expectedClass = 'LogoSuite--start'

    const rootEl = getByTestId('root')
    expect(rootEl.classList).toContain(expectedClass)
  })

  it('can optionally display text in justify alignment', () => {
    const {getByTestId} = render(
      <LogoSuite data-testid="root" align="justify">
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Description>{mockDescription}</LogoSuite.Description>
      </LogoSuite>,
    )
    const expectedClass = 'LogoSuite--justify'

    const rootEl = getByTestId('root')
    expect(rootEl.classList).toContain(expectedClass)
  })

  it('renders a marquee when the marquee prop is true', () => {
    const {getByTestId} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee data-testid="logobar">
          <svg data-testid="svg1" aria-label="Mock SVG" />
          <svg data-testid="svg2" aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const logobarEl = getByTestId('logobar')
    const expectedClass = 'LogoSuite__logobar--has-marquee'

    expect(logobarEl.classList).toContain(expectedClass)
  })

  it('renders a marquee at normal speed by default', () => {
    const {getByTestId} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee>
          <svg data-testid="svg1" aria-label="Mock SVG" />
          <svg data-testid="svg2" aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const el = getByTestId(LogoSuite.testIds.marqueeGroup)
    const expectedClass = 'LogoSuite__logobar-marqueeGroup--speed-normal'

    expect(el.classList).toContain(expectedClass)
  })

  it('can optionally render a marquee at slower speed', () => {
    const {getByTestId} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee marqueeSpeed="slow">
          <svg data-testid="svg1" aria-label="Mock SVG" />
          <svg data-testid="svg2" aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const el = getByTestId(LogoSuite.testIds.marqueeGroup)
    const expectedClass = 'LogoSuite__logobar-marqueeGroup--speed-slow'

    expect(el.classList).toContain(expectedClass)
  })

  it('can render a marquee logobar sans-animation using the idle speed option', () => {
    const {container, getByRole} = render(
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee marqueeSpeed="idle">
          <svg data-testid="svg1" aria-label="Mock SVG" />
          <svg data-testid="svg2" aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const playButton = getByRole('button', {name: 'Play animation'})
    expect(playButton).toBeInTheDocument()
    expect(container.querySelector('.LogoSuite__logobar--paused')).toBeInTheDocument()
  })

  it('can start the animation on idle marquee speed settings by pressing the play button', async () => {
    const user = userEvent.setup()

    const {container, getByRole} = render(
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee marqueeSpeed="idle">
          <svg data-testid="svg1" aria-label="Mock SVG" />
          <svg data-testid="svg2" aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const playButtonEl = getByRole('button', {name: 'Play animation'})

    await user.click(playButtonEl)

    const pauseButtonEl = getByRole('button', {name: 'Pause animation'})

    expect(pauseButtonEl).toBeInTheDocument()
    expect(container.querySelector('.LogoSuite__logobar--paused')).not.toBeInTheDocument()
  })

  it('renders a pause button when the marquee prop is true', () => {
    const {getByRole} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee>
          <svg data-testid="svg1" aria-label="Mock SVG" />
          <svg data-testid="svg2" aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const pauseButton = getByRole('button', {name: 'Pause animation'})
    expect(pauseButton).toBeInTheDocument()
  })

  it('pauses the marquee when the pause button is pressed and resumes when pressed again', async () => {
    const user = userEvent.setup()

    const {container, getByRole, queryByRole} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee>
          <svg data-testid="svg1" aria-label="Mock SVG" />
          <svg data-testid="svg2" aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    expect(getByRole('button', {name: 'Pause animation'})).toBeInTheDocument()

    await user.click(getByRole('button', {name: 'Pause animation'}))

    expect(getByRole('button', {name: 'Play animation'})).toBeInTheDocument()
    expect(queryByRole('button', {name: 'Pause animation'})).not.toBeInTheDocument()
    expect(container.querySelector('.LogoSuite__logobar--paused')).toBeInTheDocument()

    await user.click(getByRole('button', {name: 'Play animation'}))

    expect(getByRole('button', {name: 'Pause animation'})).toBeInTheDocument()
    expect(queryByRole('button', {name: 'Play animation'})).not.toBeInTheDocument()
    expect(container.querySelector('.LogoSuite__logobar--paused')).not.toBeInTheDocument()
  })

  it('logs a warning message when HeadingChild is not provided', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    render(<LogoSuite />)
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'LogoSuite: Heading child is required. You may use `visuallyHidden` to hide it from view.',
    )
    consoleWarnSpy.mockRestore()
  })

  it('renders the `emphasis` variant when 5 logos are provided', () => {
    const {getByTestId} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar data-testid="logobar">
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const el = getByTestId('logobar')
    const expectedClass = 'LogoSuite__logobar--variant-muted'

    expect(el.classList).toContain(expectedClass)
  })

  it('renders the `muted` variant when 6 logos are provided', () => {
    const {getByTestId} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar data-testid="logobar">
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const el = getByTestId('logobar')
    const expectedClass = 'LogoSuite__logobar--variant-muted'

    expect(el.classList).toContain(expectedClass)
  })

  it('applies the correct class for the default gap', () => {
    const defaultGapClass = 'LogoSuite__logobar--gap-default'

    const {getByTestId} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar data-testid="logobar">
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    expect(getByTestId('logobar').classList).toContain(defaultGapClass)
  })

  it('applies the correct class for the condensed gap', () => {
    const condensedGapClass = 'LogoSuite__logobar--gap-condensed'
    const {getByTestId} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar data-testid="logobar" gap="condensed">
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
          <svg aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    expect(getByTestId('logobar').classList).toContain(condensedGapClass)
  })

  it('applies the gridline-expressive variant presentation', () => {
    const {getByTestId} = render(
      <LogoSuite data-testid="root" variant="gridline-expressive">
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar>
          <svg aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const rootEl = getByTestId('root')
    const expectedClass = 'LogoSuite--gridline-expressive'

    expect(rootEl.classList).toContain(expectedClass)
  })

  it('renders heading and description in a text column when gridline-expressive has visible text', () => {
    const {getByText, container} = render(
      <LogoSuite variant="gridline-expressive">
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Description>{mockDescription}</LogoSuite.Description>
        <LogoSuite.Logobar>
          <svg aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    expect(getByText(mockHeading)).toBeInTheDocument()
    expect(getByText(mockDescription)).toBeInTheDocument()

    const textContainer = container.querySelector('.LogoSuite__textContainer')
    const logobarContainer = container.querySelector('.LogoSuite__logobarContainer')

    expect(textContainer).toBeInTheDocument()
    expect(logobarContainer).toBeInTheDocument()

    const contentChildren = container.querySelector('.LogoSuite__content')?.children
    expect(contentChildren?.[0]).toBe(textContainer)
    expect(contentChildren?.[1]).toBe(logobarContainer)
  })

  it('renders logobar full-width when gridline-expressive heading is visually hidden', () => {
    const {getByText, container} = render(
      <LogoSuite variant="gridline-expressive">
        <LogoSuite.Heading visuallyHidden>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar>
          <svg aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    // Heading should still be in the DOM for a11y
    expect(getByText(mockHeading)).toBeInTheDocument()
    expect(container.querySelector('.LogoSuite__textContainer')).not.toBeInTheDocument()
    expect(container.querySelector('.LogoSuite__logobarContainer')).toBeInTheDocument()
  })

  it('renders a takeover button that is hidden by default and appears on hover', async () => {
    const user = userEvent.setup()

    const {getByRole, getByTestId, container} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar data-testid="logobar" takeoverButton={{label: 'Learn more', href: '/customers'}}>
          <svg aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    const logobarEl = getByTestId('logobar')

    expect(logobarEl.classList).toContain('LogoSuite__logobar--has-takeover')

    // takeover is present in the DOM but hidden.
    const buttonContainer = container.querySelector('.LogoSuite__logobar-takeoverButtonContainer')
    expect(buttonContainer).toBeInTheDocument()

    await user.hover(logobarEl)

    const takeoverLink = getByRole('link', {name: 'Learn more'})
    expect(takeoverLink).toBeInTheDocument()
    expect(takeoverLink).toHaveAttribute('href', '/customers')
  })

  it('logs a warning when marquee and takeoverButton are used together', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee takeoverButton={{label: 'Learn more', href: '/customers'}}>
          <svg aria-label="Mock SVG" />
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'LogoSuite.Logobar: `takeoverButton` cant be used with `marquee` prop due to accessibility risks. Set `marquee={false}` to use the takeover feature.',
    )
    consoleWarnSpy.mockRestore()
  })

  it('applies the focused class to the marquee when a link inside receives focus', async () => {
    const user = userEvent.setup()

    const {container} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee>
          <a href="/" aria-label="Logo 1">
            <svg aria-label="Mock SVG" />
          </a>
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    await user.tab()
    await user.tab()

    const marqueeEl = container.querySelector('.LogoSuite__logobar-marquee')
    expect(marqueeEl?.classList).toContain('LogoSuite__logobar-marquee--focused')
  })

  it('removes the focused class from the marquee when focus leaves entirely', async () => {
    const user = userEvent.setup()

    const {container} = render(
      <LogoSuite>
        <LogoSuite.Heading>{mockHeading}</LogoSuite.Heading>
        <LogoSuite.Logobar marquee>
          <a href="/" aria-label="Logo 1">
            <svg aria-label="Mock SVG" />
          </a>
        </LogoSuite.Logobar>
      </LogoSuite>,
    )

    await user.tab()
    await user.tab()

    const marqueeEl = container.querySelector('.LogoSuite__logobar-marquee')
    expect(marqueeEl?.classList).toContain('LogoSuite__logobar-marquee--focused')

    await user.tab()
    await user.tab()

    expect(marqueeEl?.classList).not.toContain('LogoSuite__logobar-marquee--focused')
  })
})
