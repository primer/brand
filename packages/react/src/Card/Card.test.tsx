import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Card} from './Card'
import {axe, toHaveNoViolations} from 'jest-axe'
import {GitMergeIcon} from '@primer/octicons-react'

expect.extend(toHaveNoViolations)

describe('Card', () => {
  afterEach(cleanup)

  const mockHref = '#'
  const mockLabel = 'This is a mock label'
  const mockHeading = 'This is a mock heading'
  const mockDescription = 'This is a mock description'

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
    expect(cardEl.classList).toContain(expectedCustomClass)
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
    const mockTestId = 'test'
    const classToCheck = 'Card__label'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId}>
        <Card.Label>{mockLabel}</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId).firstChild
    expect(cardEl).toHaveClass(classToCheck)
    expect(cardEl).toHaveTextContent(mockLabel)
  })

  it('renders the icon correctly into the document', () => {
    const mockTestId = 'test'
    const classToCheck = 'Card__icon'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId}>
        <Card.Icon icon={GitMergeIcon} />
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId).firstChild
    expect(cardEl).toHaveClass(classToCheck)
  })

  it('renders the icon with background correctly into the document', () => {
    const mockTestId = 'test'
    const classToCheck = 'Icon--background'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId}>
        <Card.Icon hasBackground icon={GitMergeIcon} />
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId).firstChild
    expect(cardEl).toHaveClass(classToCheck)
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
})
