import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {SectionIntro} from './SectionIntro'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('SectionIntro', () => {
  const mockHeading = 'Mock heading'
  const mockDescription = 'Minimal description'
  const mockLinkText = 'Call to action'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'SectionIntro'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <SectionIntro data-testid={mockTestId}>
        <SectionIntro.Heading>Where the most ambitious teams build great things</SectionIntro.Heading>
        <SectionIntro.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </SectionIntro.Description>
        <SectionIntro.Action href="#">Action</SectionIntro.Action>
      </SectionIntro>
    )

    const SectionIntroEl = getByTestId(mockTestId)
    expect(SectionIntroEl.classList).toContain(expectedClass)
  })

  it('renders the correct default heading type', () => {
    const expectedTag = 'h2'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <SectionIntro>
        <SectionIntro.Heading>{headingText}</SectionIntro.Heading>
      </SectionIntro>
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the correct heading type when an override is used', () => {
    const expectedTag = 'h3'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <SectionIntro>
        <SectionIntro.Heading as={expectedTag}>{headingText}</SectionIntro.Heading>
      </SectionIntro>
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the heading and description correctly into the document', () => {
    const {getByText} = render(
      <SectionIntro>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
      </SectionIntro>
    )

    const headingEl = getByText(mockHeading)
    const descriptionEl = getByText(mockDescription)

    expect(headingEl).toBeInTheDocument()
    expect(descriptionEl).toBeInTheDocument()
  })

  it('renders all elements correctly into the document', () => {
    const {getByText} = render(
      <SectionIntro>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
        <SectionIntro.Action href="#">{mockLinkText}</SectionIntro.Action>
      </SectionIntro>
    )

    const headingEl = getByText(mockHeading)
    const descriptionEl = getByText(mockDescription)
    const actionEl = getByText(mockLinkText)

    expect(headingEl).toBeInTheDocument()
    expect(descriptionEl).toBeInTheDocument()
    expect(actionEl).toBeInTheDocument()
  })

  it('renders content using start alignment by default', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <SectionIntro data-testid={rootId}>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
        <SectionIntro.Action href="#">{mockLinkText}</SectionIntro.Action>
      </SectionIntro>
    )

    const rootEl = getByTestId(rootId)
    const expectedClass = 'SectionIntro--align-start'
    const unexpectedClass = 'SectionIntro--align-center'

    expect(rootEl.classList).toContain(expectedClass)
    expect(rootEl.classList).not.toContain(unexpectedClass)
  })

  it('can optionally render content in center alignment', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <SectionIntro align="center" data-testid={rootId}>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
        <SectionIntro.Action href="#">{mockLinkText}</SectionIntro.Action>
      </SectionIntro>
    )

    const rootEl = getByTestId(rootId)

    const expectedRootClass = 'SectionIntro--align-center'
    const unexpectedRootClass = 'SectionIntro--align-start'

    expect(rootEl.classList).toContain(expectedRootClass)
    expect(rootEl.classList).not.toContain(unexpectedRootClass)
  })

  it('can optionally render a secondary button', () => {
    const {getByRole} = render(
      <SectionIntro>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
        <SectionIntro.Action href="#" variant="secondary">
          {mockLinkText}
        </SectionIntro.Action>
      </SectionIntro>
    )

    const buttonEl = getByRole('link')

    const expectedButtonClass = 'Button--secondary'

    expect(buttonEl.classList).toContain(expectedButtonClass)
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <SectionIntro>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
        <SectionIntro.Action href="#">{mockLinkText}</SectionIntro.Action>
      </SectionIntro>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
