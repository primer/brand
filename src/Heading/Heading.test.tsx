import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Heading, HeadingSizes, defaultHeadingTag} from './Heading'
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

  test('renders default tag correctly', () => {
    const {getByRole} = render(<Heading>{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl.tagName).toBe(defaultHeadingTag.toUpperCase())
  })

  test('renders alternative tags correctly', () => {
    const {getByRole} = render(<Heading as="h1">{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl.tagName).toBe('H1')
  })

  test('renders the correct size for the default tag', () => {
    const expectedClass = 'Heading--1'
    const {getByRole} = render(<Heading>{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl.classList).toContain(expectedClass)
  })

  test('renders the correct size for alternative tags', () => {
    const expectedClass = 'Heading--0'
    const {getByRole} = render(<Heading as="h1">{mockHeading}</Heading>)
    const headingEl = getByRole('heading')

    expect(headingEl.classList).toContain(expectedClass)
  })
})
