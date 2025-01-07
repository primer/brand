import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Pillar} from './Pillar'
import {axe, toHaveNoViolations} from 'jest-axe'
import {GitMergeIcon} from '@primer/octicons-react'

expect.extend(toHaveNoViolations)

describe('Pillar', () => {
  afterEach(cleanup)

  const mockHeading = 'This is a mock heading'
  const mockDescription = 'This is a mock description'

  it('no a11y violations', async () => {
    const {container} = render(
      <Pillar>
        <Pillar.Heading>{mockHeading}</Pillar.Heading>
        <Pillar.Description>{mockDescription}</Pillar.Description>
      </Pillar>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const mockTestId = 'test'
    const expectedClass = 'Pillar'
    const expectedCustomClass = 'custom-class'
    const expectedTag = 'div'

    const {getByTestId} = render(
      <Pillar data-testid={mockTestId} className={expectedCustomClass}>
        <Pillar.Heading>{mockHeading}</Pillar.Heading>
        <Pillar.Description>{mockDescription}</Pillar.Description>
      </Pillar>,
    )
    const pillarEl = getByTestId(mockTestId)
    expect(pillarEl.tagName).toBe(expectedTag.toUpperCase())
    expect(pillarEl.classList).toContain(expectedClass)
    expect(pillarEl.classList).toContain(expectedCustomClass)
  })

  it('renders the correct default heading type', () => {
    const expectedHeadingTag = 'h3'

    const {getByText} = render(
      <Pillar>
        <Pillar.Heading>{mockHeading}</Pillar.Heading>
      </Pillar>,
    )
    const PillarHeaderEl = getByText(mockHeading)
    expect(PillarHeaderEl.tagName).toBe(expectedHeadingTag.toUpperCase())
  })

  it('renders the correct heading type when an override is used', () => {
    const expectedHeadingTag = 'h4'

    const {getByText} = render(
      <Pillar>
        <Pillar.Heading as="h4">{mockHeading}</Pillar.Heading>
      </Pillar>,
    )
    const PillarHeaderEl = getByText(mockHeading)
    expect(PillarHeaderEl.tagName).toBe(expectedHeadingTag.toUpperCase())
  })

  it('renders the icon correctly into the document', () => {
    const mockTestId = 'test'
    const classToCheck = 'Pillar__icon'

    const {getByTestId} = render(
      <Pillar data-testid={mockTestId}>
        <Pillar.Icon icon={GitMergeIcon} />
        <Pillar.Heading>{mockHeading}</Pillar.Heading>
        <Pillar.Description>{mockDescription}</Pillar.Description>
      </Pillar>,
    )

    const pillarEl = getByTestId(mockTestId).firstChild
    expect(pillarEl).toHaveClass(classToCheck)
  })

  it('renders the image correctly into the document', () => {
    const mockTestId = 'test'
    const mockImage = 'mock.png'
    const classToCheck = 'Image'
    const testAltText = 'alternative text'

    const {getByAltText} = render(
      <Pillar data-testid={mockTestId}>
        <Pillar.Image src={mockImage} alt={testAltText} />
        <Pillar.Heading>{mockHeading}</Pillar.Heading>
        <Pillar.Description>{mockDescription}</Pillar.Description>
      </Pillar>,
    )

    const pillarEl = getByAltText(testAltText)
    expect(pillarEl).toHaveClass(classToCheck)
  })

  it('renders the link correctly into the document', () => {
    const mockTestId = 'test'
    const classToCheckLink = 'Pillar__link'
    const classToCheckLinkColor = 'Link Link--accent'

    const {getByTestId} = render(
      <Pillar data-testid={mockTestId}>
        <Pillar.Heading>{mockHeading}</Pillar.Heading>
        <Pillar.Description>{mockDescription}</Pillar.Description>
        <Pillar.Link href="https://primer.style">mockLinkText</Pillar.Link>
      </Pillar>,
    )

    const pillarEl = getByTestId(mockTestId).lastChild
    expect(pillarEl).toHaveClass(classToCheckLink)
    expect(pillarEl).toHaveClass(classToCheckLinkColor)
  })

  it('renders a border class correctly into the document', () => {
    const mockTestId = 'test'
    const classToCheck = 'Pillar--has-border'

    const {getByTestId} = render(
      <Pillar data-testid={mockTestId} hasBorder>
        <Pillar.Heading>{mockHeading}</Pillar.Heading>
        <Pillar.Description>{mockDescription}</Pillar.Description>
      </Pillar>,
    )

    const pillarEl = getByTestId(mockTestId)
    expect(pillarEl).toHaveClass(classToCheck)
  }
})
