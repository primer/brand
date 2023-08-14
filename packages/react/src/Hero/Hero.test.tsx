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
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Description>{mockDescription}</Hero.Description>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.PrimaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.PrimaryAction>
      </Hero>,
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
    const {queryAllByRole} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
      </Hero>,
    )

    const linkElements = queryAllByRole('link')

    expect(linkElements.length).toBe(1)
  })

  test('renders without description', () => {
    const {container} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.SecondaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.SecondaryAction>
      </Hero>,
    )
    const descriptionEl = container.querySelector('p')

    expect(descriptionEl).toBeNull()
  })

  test('renders without description', () => {
    const mockLabel = 'Label'

    const {getByText} = render(
      <Hero>
        <Hero.Label>{mockLabel}</Hero.Label>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.SecondaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.SecondaryAction>
      </Hero>,
    )
    const labelEl = getByText(mockLabel)

    expect(labelEl).toBeInTheDocument()
  })

  test('renders with an optional image in block end alignment by default', () => {
    const mockAltText = 'placeholder image, blank with gray solid fill'

    const {getByAltText} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image src="mock.png" alt={mockAltText} />
      </Hero>,
    )
    const imageEl = getByAltText(mockAltText)

    expect(imageEl).toBeInTheDocument()
    expect(imageEl).toHaveClass('Hero-image--pos-block-end')
  })

  test('it can optionally render an image in inline end alignment', () => {
    const mockAltText = 'placeholder image, blank with gray solid fill'

    const {getByAltText} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Image position="inline-end" src="mock.png" alt={mockAltText} />
      </Hero>,
    )
    const imageEl = getByAltText(mockAltText)

    expect(imageEl).toBeInTheDocument()
    expect(imageEl).toHaveClass('Hero-image--pos-inline-end')
  })

  test('renders a label with default colors and size', () => {
    const mockLabel = 'Label'
    const expectedSize = 'small'
    const expectedColor = 'default'

    const {getByTestId} = render(
      <Hero>
        <Hero.Label>{mockLabel}</Hero.Label>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.SecondaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.SecondaryAction>
      </Hero>,
    )
    const labelEl = getByTestId(mockLabel)

    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toHaveClass(`Label--size-${expectedSize}`)
    expect(labelEl).toHaveClass(`Label--color-${expectedColor}`)
  })

  test('no a11y violations', async () => {
    const {container} = render(
      <Hero>
        <Hero.Heading>{mockHeading}</Hero.Heading>
        <Hero.Description>{mockDescription}</Hero.Description>
        <Hero.PrimaryAction href={mockPrimaryAction.href}>{mockPrimaryAction.text}</Hero.PrimaryAction>
        <Hero.SecondaryAction href={mockSecondaryAction.href}>{mockSecondaryAction.text}</Hero.SecondaryAction>
      </Hero>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
