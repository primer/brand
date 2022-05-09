import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Heading} from './Heading'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Heading', () => {
  const mockHeading = 'This is a mock heading'

  afterEach(cleanup)

  test('renders correctly into the document', () => {
    const {getByRole} = render(<Heading>{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl).toBeInTheDocument()
  })

  test('no a11y violations', async () => {
    const {container} = render(<Heading>{mockHeading}</Heading>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  test('renders default tag and size correctly', () => {
    const expectedClass = 'Heading--2'
    const expectedTag = 'h2'
    const {getByRole} = render(<Heading>{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl.tagName).toBe(expectedTag.toUpperCase())
    expect(headingEl.classList).toContain(expectedClass)
  })

  test('renders alternative tag correctly with corresponding size', () => {
    const expectedTag = 'h1'
    const expectedClass = 'Heading--1'
    const {getByRole} = render(<Heading as={expectedTag}>{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl.tagName).toBe(expectedTag.toUpperCase())
    expect(headingEl.classList).toContain(expectedClass)
  })
})
