import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Card} from './Card'
import {axe, toHaveNoViolations} from 'jest-axe'
import {GitMergeIcon} from '@primer/octicons-react'
import {ThemeProvider} from '../ThemeProvider'

expect.extend(toHaveNoViolations)

describe('Card', () => {
  afterEach(cleanup)

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

  const mockHref = '#'
  const mockLabel = 'This is a mock label'
  const mockHeading = 'This is a mock heading'
  const mockDescription = 'This is a mock description'
  const mockIcon = <GitMergeIcon aria-label="Git merge icon" />

  it('no a11y violations', async () => {
    const {container} = render(
      <Card href={mockHref}>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const mockTestId = 'test'
    const expectedClass = 'Card'
    const expectedCustomClass = 'custom-class'
    const defaultVariantClass = 'Card--variant-default'
    const expectedTag = 'div'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId} className={expectedCustomClass}>
        <Card.Label>{mockLabel}</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )
    const cardEl = getByTestId(mockTestId)
    expect(cardEl.tagName).toBe(expectedTag.toUpperCase())
    expect(cardEl.classList).toContain(expectedClass)
    expect(cardEl.classList).toContain(defaultVariantClass)
    expect(cardEl.classList).toContain(expectedCustomClass)
  })

  it('can optionally render a minimal variant', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Card variant="minimal" href={mockHref} data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )
    const cardEl = getByTestId(mockTestId)
    expect(cardEl.classList).toContain('Card--variant-minimal')
  })

  it('can optionally render a torchlight variant', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Card variant="torchlight" href={mockHref} data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )
    const cardEl = getByTestId(mockTestId)
    expect(cardEl.classList).toContain('Card--variant-torchlight')
  })

  it('renders a default variant in dark mode and not torchlight', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <ThemeProvider colorMode="dark">
        <Card href={mockHref} data-testid={mockTestId}>
          <Card.Heading>{mockHeading}</Card.Heading>
        </Card>
      </ThemeProvider>,
    )
    const cardEl = getByTestId(mockTestId)
    expect(cardEl.classList).not.toContain('Card--variant-torchlight')
  })

  it('renders the correct default heading type', () => {
    const expectedHeadingTag = 'h3'

    const {getByText} = render(
      <Card href={mockHref}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )
    const cardHeaderEl = getByText(mockHeading).closest(expectedHeadingTag)
    expect(cardHeaderEl?.tagName).toBe(expectedHeadingTag.toUpperCase())
  })

  it('renders the correct heading type when an override is used', () => {
    const expectedHeadingTag = 'h4'

    const {getByText} = render(
      <Card href={mockHref}>
        <Card.Heading as="h4">{mockHeading}</Card.Heading>
      </Card>,
    )
    const cardHeaderEl = getByText(mockHeading).closest(expectedHeadingTag)
    expect(cardHeaderEl?.tagName).toBe(expectedHeadingTag.toUpperCase())
  })

  it('renders the default link text', () => {
    const expectedLinkText = 'Learn more'

    const {getByText} = render(
      <Card href={mockHref}>
        <Card.Heading as="h4">{mockHeading}</Card.Heading>
      </Card>,
    )
    const linkTextEl = getByText(expectedLinkText)
    expect(linkTextEl).toBeInTheDocument()
  })

  it('renders the label correctly into the document', () => {
    const mockTestId = 'label'
    const classToCheck = 'Card__label'

    const {getByTestId} = render(
      <Card href={mockHref}>
        <Card.Label data-testid={mockTestId}>{mockLabel}</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const labelEl = getByTestId(mockTestId)
    expect(labelEl).toHaveClass(classToCheck)
    expect(labelEl).toHaveTextContent(mockLabel)
  })

  it('renders the icon correctly into the document', () => {
    const mockTestId = 'icon'
    const classToCheck = 'Card__icon'

    const {getByTestId} = render(
      <Card href={mockHref}>
        <Card.Icon icon={mockIcon} data-testid={mockTestId} />
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    expect(getByTestId(mockTestId).parentElement).toHaveClass(classToCheck)
  })

  it('renders the icon with background correctly into the document', () => {
    const mockTestId = 'icon'
    const classToCheck = 'Icon--background'

    const {getByTestId} = render(
      <Card href={mockHref}>
        <Card.Icon hasBackground icon={mockIcon} data-testid={mockTestId} />
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    expect(getByTestId(mockTestId).parentElement).toHaveClass(classToCheck)
  })

  it('renders the image correctly into the document', () => {
    const classToCheck = 'Image'
    const testAltText = 'alternative text'

    const {getByAltText} = render(
      <Card href={mockHref}>
        <Card.Image src="/brand/assets/placeholder.png" alt={testAltText} />
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByAltText(testAltText)
    expect(cardEl).toHaveClass(classToCheck)
  })

  it('renders the Card with border', () => {
    const mockTestId = 'test'
    const classToCheck = 'Card--border'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId} hasBorder>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl).toHaveClass(classToCheck)
  })

  it('renders a card with a max-width when fullWidth=false', async () => {
    const cardTestId = 'card'
    const {getByTestId} = render(
      <Card href={mockHref} data-testid={cardTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByTestId(cardTestId)

    expect(cardEl.parentElement).toHaveClass('Card--maxWidth')
  })

  it('renders a full-width card when fullWidth=true', async () => {
    const cardTestId = 'card'
    const {getByTestId} = render(
      <Card href={mockHref} data-testid={cardTestId} fullWidth>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByTestId(cardTestId)

    expect(cardEl.parentElement).toHaveClass('Card--fullWidth')
  })

  it('renders the card contents in a logical order, regardless of the order they are passed in', () => {
    const {getByText, getByAltText, getByLabelText} = render(
      <Card href={mockHref}>
        <Card.Description>{mockDescription}</Card.Description>
        <Card.Label>{mockLabel}</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Image src="/brand/assets/placeholder.png" alt="placeholder" />
        <Card.Icon icon={mockIcon} />
      </Card>,
    )

    const description = getByText(mockDescription)
    const label = getByText(mockLabel)
    const heading = getByText(mockHeading)
    const image = getByAltText('placeholder')
    const icon = getByLabelText('Git merge icon')

    const isAfter = (a: Element, b: Element): boolean =>
      a.compareDocumentPosition(b) === Node.DOCUMENT_POSITION_FOLLOWING

    expect(isAfter(heading, image)).toBe(true)
    expect(isAfter(image, icon)).toBe(true)
    expect(isAfter(icon, label)).toBe(true)
    expect(isAfter(label, description)).toBe(true)
  })

  it('renders custom CTA text when provided', () => {
    const customCtaText = 'Get started'

    const {getByText} = render(
      <Card href={mockHref} ctaText={customCtaText}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const ctaEl = getByText(customCtaText)
    expect(ctaEl).toBeInTheDocument()
  })

  it('applies center alignment when align="center"', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId} align="center">
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl.parentElement).toHaveClass('Card--align-center')
  })

  it('disables animation when disableAnimation=true', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId} disableAnimation>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl).toHaveClass('Card--disableAnimation')
  })

  it('renders label with custom color', () => {
    const mockTestId = 'label'

    const {getByTestId} = render(
      <Card href={mockHref}>
        <Card.Label data-testid={mockTestId} color="green">
          {mockLabel}
        </Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const labelEl = getByTestId(mockTestId)
    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toHaveTextContent(mockLabel)
  })
})
