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
        <SectionIntro.Link href="#">Link</SectionIntro.Link>
      </SectionIntro>,
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
      </SectionIntro>,
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
      </SectionIntro>,
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the heading and description correctly into the document', () => {
    const {getByText} = render(
      <SectionIntro>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
      </SectionIntro>,
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
        <SectionIntro.Link href="#">{mockLinkText}</SectionIntro.Link>
      </SectionIntro>,
    )

    const headingEl = getByText(mockHeading)
    const descriptionEl = getByText(mockDescription)
    const linkEl = getByText(mockLinkText)

    expect(headingEl).toBeInTheDocument()
    expect(descriptionEl).toBeInTheDocument()
    expect(linkEl).toBeInTheDocument()
  })

  it('renders content using start alignment by default', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <SectionIntro data-testid={rootId}>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
        <SectionIntro.Link href="#">{mockLinkText}</SectionIntro.Link>
      </SectionIntro>,
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
        <SectionIntro.Link href="#">{mockLinkText}</SectionIntro.Link>
      </SectionIntro>,
    )

    const rootEl = getByTestId(rootId)

    const expectedRootClass = 'SectionIntro--align-center'
    const unexpectedRootClass = 'SectionIntro--align-start'

    expect(rootEl.classList).toContain(expectedRootClass)
    expect(rootEl.classList).not.toContain(unexpectedRootClass)
  })

  test('renders an optional label', () => {
    const mockLabel = 'Label'

    const {getByText} = render(
      <SectionIntro>
        <SectionIntro.Label>{mockLabel}</SectionIntro.Label>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Link href="#">{mockLinkText}</SectionIntro.Link>
      </SectionIntro>,
    )
    const labelEl = getByText(mockLabel)

    expect(labelEl).toBeInTheDocument()
  })

  test('renders a label with default colors and size', () => {
    const mockLabel = 'Label'
    const expectedSize = 'medium'
    const expectedColor = 'default'

    const {getByTestId} = render(
      <SectionIntro>
        <SectionIntro.Label>{mockLabel}</SectionIntro.Label>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Link href="#">{mockLinkText}</SectionIntro.Link>
      </SectionIntro>,
    )
    const labelEl = getByTestId(mockLabel)

    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toHaveClass(`Label--size-${expectedSize}`)
    expect(labelEl).toHaveClass(`Label--color-${expectedColor}`)
  })

  test('renders the default color as muted if <b> or <em> is passed as a child', () => {
    const {getAllByRole} = render(
      <>
        <SectionIntro>
          <SectionIntro.Heading>
            <b>Expressive headline</b> about an exclusive set of features.
          </SectionIntro.Heading>
        </SectionIntro>
        <SectionIntro>
          <SectionIntro.Heading>
            <em>Expressive headline</em> about an exclusive set of features.
          </SectionIntro.Heading>
        </SectionIntro>
      </>,
    )

    const headingEls = getAllByRole('heading')

    for (const headingEl of headingEls) {
      expect(headingEl).toHaveClass(`SectionIntro-heading--muted`)
    }
  })

  test('renders the default color as text-default if a non-<b> or non-<em> child is passed', () => {
    const {getByRole} = render(
      <SectionIntro>
        <SectionIntro.Heading>
          <span>Expressive headline</span> about an exclusive set of features.
        </SectionIntro.Heading>
      </SectionIntro>,
    )
    const headingEl = getByRole('heading')

    expect(headingEl).not.toHaveClass(`SectionIntro-heading--muted`)
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <SectionIntro>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
        <SectionIntro.Link href="#">{mockLinkText}</SectionIntro.Link>
      </SectionIntro>,
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('accepts a leading component that renders in the correct location', () => {
    const mockImage = 'mockImage.png'

    const {getByRole, container} = render(
      <SectionIntro leadingComponent={() => <img src={mockImage} alt="mock" />}>
        <SectionIntro.Heading>{mockHeading}</SectionIntro.Heading>
        <SectionIntro.Description>{mockDescription}</SectionIntro.Description>
        <SectionIntro.Link href="#">{mockLinkText}</SectionIntro.Link>
      </SectionIntro>,
    )

    const imgEl = getByRole('img')
    expect(imgEl).toBeInTheDocument()
    expect(imgEl).toHaveAttribute('src', mockImage)

    const sectionIntroEl = container.firstChild
    expect(sectionIntroEl?.firstChild).toBe(imgEl)
  })
})
