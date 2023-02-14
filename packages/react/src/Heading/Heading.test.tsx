import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Heading, HeadingWeights, HeadingWidths} from './Heading'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Heading', () => {
  const mockHeading = 'This is a mock heading'

  afterEach(cleanup)

  it('renders correctly into the document', () => {
    const {getByRole} = render(<Heading>{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl).toBeInTheDocument()
  })

  it('no a11y violations', async () => {
    const {container} = render(<Heading>{mockHeading}</Heading>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders default tag and size correctly', () => {
    const expectedClass = 'Heading--2'
    const expectedTag = 'h2'
    const {getByRole} = render(<Heading>{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl.tagName).toBe(expectedTag.toUpperCase())
    expect(headingEl.classList).toContain(expectedClass)
  })

  it('renders alternative tag correctly with corresponding size', () => {
    const expectedTag = 'h1'
    const expectedClass = 'Heading--1'
    const {getByRole} = render(<Heading as={expectedTag}>{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl.tagName).toBe(expectedTag.toUpperCase())
    expect(headingEl.classList).toContain(expectedClass)
  })

  it('can render a tag with a different visual appearance', () => {
    const expectedTag = 'h1'
    const expectedClass = 'Heading--3'
    const {getByRole} = render(
      <Heading as={expectedTag} size="3">
        {mockHeading}
      </Heading>
    )
    const headingEl = getByRole('heading')

    expect(headingEl.tagName).toBe(expectedTag.toUpperCase())
    expect(headingEl.classList).toContain(expectedClass)
  })

  it('can render headings in different fixed font weights', () => {
    const expectedClass = 'Heading--weight-'

    for (const weight of HeadingWeights) {
      const {getByText} = render(
        <Heading as="h3" weight={weight}>
          {weight}
        </Heading>
      )
      const headingEl = getByText(weight)

      expect(headingEl.classList).toContain(expectedClass + weight)
    }
  })

  it('can render headings in different responsive font weights', () => {
    const supportedBreakpoints = ['narrow', 'regular', 'wide']

    for (const breakpoint of supportedBreakpoints) {
      const expectedClass = `Heading-${breakpoint}--weight-`

      for (const weight of HeadingWeights) {
        const {getByTestId} = render(
          <Heading
            data-testid={`heading-${breakpoint}-${weight}`}
            as="h3"
            weight={{
              [breakpoint]: weight
            }}
          >
            {weight}
          </Heading>
        )
        const headingEl = getByTestId(`heading-${breakpoint}-${weight}`)

        expect(headingEl.classList).toContain(expectedClass + weight)
      }
    }
  })

  it('can render headings in different fixed font widths', () => {
    const expectedClass = 'Heading--width-'

    for (const width of HeadingWidths) {
      const {getByText} = render(
        <Heading as="h3" width={width}>
          {width}
        </Heading>
      )
      const headingEl = getByText(width)

      expect(headingEl.classList).toContain(expectedClass + width)
    }
  })

  it('can render headings in different responsive font widths', () => {
    const supportedBreakpoints = ['condensed', 'normal', 'wide']

    for (const breakpoint of supportedBreakpoints) {
      const expectedClass = `Heading-${breakpoint}--width-`

      for (const width of HeadingWidths) {
        const {getByTestId} = render(
          <Heading
            data-testid={`heading-${breakpoint}-${width}`}
            as="h3"
            width={{
              [breakpoint]: width
            }}
          >
            {width}
          </Heading>
        )
        const headingEl = getByTestId(`heading-${breakpoint}-${width}`)

        expect(headingEl.classList).toContain(expectedClass + width)
      }
    }
  })
})
