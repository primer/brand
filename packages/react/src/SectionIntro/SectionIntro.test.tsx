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

  it('renders the heading correctly into the document', () => {
    const {getByText} = render(<SectionIntro heading={mockHeading} />)

    const headingEl = getByText(mockHeading)

    expect(headingEl).toBeInTheDocument()
  })

  it('renders the heading and description correctly into the document', () => {
    const {getByText} = render(<SectionIntro description={mockDescription} heading={mockHeading} />)

    const headingEl = getByText(mockHeading)

    expect(headingEl).toBeInTheDocument()
  })

  it('renders all elements correctly into the document', () => {
    const {getByText} = render(
      <SectionIntro heading={mockHeading} description={mockDescription} action={{text: mockLinkText, href: '#'}} />
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
      <SectionIntro
        data-testid={rootId}
        heading={mockHeading}
        description={mockDescription}
        action={{text: mockLinkText, href: '#'}}
      />
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
      <SectionIntro
        data-testid={rootId}
        align="center"
        heading={mockHeading}
        description={mockDescription}
        action={{text: mockLinkText, href: '#'}}
      />
    )

    const rootEl = getByTestId(rootId)

    const expectedRootClass = 'SectionIntro--align-center'
    const unexpectedRootClass = 'SectionIntro--align-start'

    expect(rootEl.classList).toContain(expectedRootClass)
    expect(rootEl.classList).not.toContain(unexpectedRootClass)
  })

  it('can optionally render a subtle button', () => {
    const rootId = 'root-el'
    const {getByRole} = render(
      <SectionIntro data-testid={rootId} heading={mockHeading} action={{text: mockLinkText, href: '#', subtle: true}} />
    )

    const buttonEl = getByRole('link')

    const expectedButtonClass = 'Button--subtle'

    expect(buttonEl.classList).toContain(expectedButtonClass)
  })

  it('renders a h2 Heading by default', () => {
    const {getByRole} = render(
      <SectionIntro
        align="center"
        heading={mockHeading}
        description={mockDescription}
        action={{text: mockLinkText, href: '#'}}
      />
    )

    const elHeading = getByRole('heading', {level: 2})

    expect(elHeading).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <SectionIntro
        align="center"
        heading={mockHeading}
        description={mockDescription}
        action={{text: mockLinkText, href: '#'}}
      />
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
