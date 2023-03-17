import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Hero} from './Hero'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Hero', () => {
  const mockHeading = 'This is my super sweet hero heading'
  const mockDescription = 'A description of the hero'
  const mockPrimaryAction = {text: 'Primary Action', href: '#'}
  const mockSecondaryAction = {text: 'Secondary Action', href: '#'}

  afterEach(cleanup)

  test('renders correctly into the document', () => {
    const {getByText} = render(
      <Hero
        heading={mockHeading}
        description={mockDescription}
        primaryAction={mockPrimaryAction}
        secondaryAction={mockSecondaryAction}
      />
    )
    const headingElement = getByText(mockHeading)
    const descriptionElement = getByText(mockDescription)
    const primaryActionElement = getByText(mockPrimaryAction.text)
    const secondaryActionElement = getByText(mockSecondaryAction.text)

    expect(headingElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
    expect(primaryActionElement).toBeInTheDocument()
    expect(secondaryActionElement).toBeInTheDocument()
  })

  test('renders without secondary action', () => {
    const {queryAllByRole} = render(<Hero heading={mockHeading} primaryAction={mockPrimaryAction} />)

    const linkElements = queryAllByRole('link')

    expect(linkElements.length).toBe(1)
  })

  test('renders without description', () => {
    const {container} = render(
      <Hero heading={mockHeading} primaryAction={mockPrimaryAction} secondaryAction={mockSecondaryAction} />
    )
    const descriptionEl = container.querySelector('p')

    expect(descriptionEl).toBeNull()
  })

  test('renders alternative heading level', () => {
    const expectedTag = 'h3'
    const expectedClass = 'Heading--1'
    const {getByRole} = render(
      <Hero
        heading={mockHeading}
        primaryAction={mockPrimaryAction}
        secondaryAction={mockSecondaryAction}
        headingLevel="h3"
      />
    )
    const headingEl = getByRole('heading')

    expect(headingEl.tagName).toBe(expectedTag.toUpperCase())
    expect(headingEl.classList).toContain(expectedClass)
  })

  test('no a11y violations', async () => {
    const {container} = render(
      <Hero
        heading={mockHeading}
        description={mockDescription}
        primaryAction={mockPrimaryAction}
        secondaryAction={mockSecondaryAction}
      />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
