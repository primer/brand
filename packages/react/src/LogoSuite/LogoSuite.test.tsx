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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
    const expectedClass = 'LogoSuite__logobar--variant-emphasis'

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
})
