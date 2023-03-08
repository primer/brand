import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import {Card} from './Card'
import {axe, toHaveNoViolations} from 'jest-axe'

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
      </Card>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const mockTestId = 'test'
    const expectedClass = 'Card'
    const expectedCustomClass = 'custom-class'
    const expectedTag = 'a'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId} className={expectedCustomClass}>
        <Card.Label>{mockLabel}</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>
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
      </Card>
    )
    const cardHeaderEl = getByText(mockHeading)
    expect(cardHeaderEl.tagName).toBe(expectedHeadingTag.toUpperCase())
  })

  it('renders the correct heading type when an override is used', () => {
    const expectedHeadingTag = 'h4'

    const {getByText} = render(
      <Card href={mockHref}>
        <Card.Heading as="h4">{mockHeading}</Card.Heading>
      </Card>
    )
    const cardHeaderEl = getByText(mockHeading)
    expect(cardHeaderEl.tagName).toBe(expectedHeadingTag.toUpperCase())
  })

  it('renders the default link text', () => {
    const expectedLinkText = 'Learn more'

    const {getByText} = render(
      <Card href={mockHref}>
        <Card.Heading as="h4">{mockHeading}</Card.Heading>
      </Card>
    )
    const linkTextEl = getByText(expectedLinkText)
    expect(linkTextEl).toBeInTheDocument()
  })
})
