import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {RiverBreakout} from '../'
import {Text} from '../../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('RiverBreakout', () => {
  const mockText = 'Minimal description'
  const mockHeading = 'Mock heading'
  const MockImage = () => <img src="file.jpg" alt="mock" />

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const {getByText} = render(
      <RiverBreakout>
        <RiverBreakout.A11yHeading>{mockHeading}</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <MockImage />
        </RiverBreakout.Visual>
        <RiverBreakout.Content>
          <Text>{mockText}</Text>
        </RiverBreakout.Content>
      </RiverBreakout>,
    )

    const textEl = getByText(mockText)
    const a11yHeadingEl = getByText(mockHeading)

    expect(textEl).toBeInTheDocument()
    expect(a11yHeadingEl).toBeInTheDocument()
  })

  it('warns if a11y heading is not passed', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    render(
      <RiverBreakout>
        <RiverBreakout.Visual>
          <MockImage />
        </RiverBreakout.Visual>
        <RiverBreakout.Content>
          <Text>{mockText}</Text>
        </RiverBreakout.Content>
      </RiverBreakout>,
    )
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'RiverBreakout: A11yHeading child is required. This element will not be visible, only read by screenreaders.',
    )
    consoleWarnSpy.mockRestore()
  })

  it('renders a h3 a11y heading by default', () => {
    const {getByRole} = render(
      <RiverBreakout>
        <RiverBreakout.A11yHeading>{mockHeading}</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <MockImage />
        </RiverBreakout.Visual>
        <RiverBreakout.Content>
          <Text>{mockText}</Text>
        </RiverBreakout.Content>
      </RiverBreakout>,
    )

    const elHeading = getByRole('heading', {level: 3})

    expect(elHeading).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <RiverBreakout>
        <RiverBreakout.A11yHeading>{mockHeading}</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <MockImage />
        </RiverBreakout.Visual>
        <RiverBreakout.Content>
          <Text>{mockText}</Text>
        </RiverBreakout.Content>
      </RiverBreakout>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the default variant without gridline class', () => {
    const {container} = render(
      <RiverBreakout>
        <RiverBreakout.A11yHeading>{mockHeading}</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <MockImage />
        </RiverBreakout.Visual>
        <RiverBreakout.Content>
          <Text>{mockText}</Text>
        </RiverBreakout.Content>
      </RiverBreakout>,
    )

    const sectionEl = container.querySelector('section')
    expect(sectionEl?.className).not.toContain('variant-gridline')
  })

  it('applies the gridline variant and visual background classes when variant="gridline"', () => {
    const {container, getByTestId} = render(
      <RiverBreakout variant="gridline">
        <RiverBreakout.A11yHeading>{mockHeading}</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual data-testid="visual-el">
          <MockImage />
        </RiverBreakout.Visual>
        <RiverBreakout.Content>
          <Text>{mockText}</Text>
        </RiverBreakout.Content>
      </RiverBreakout>,
    )

    const sectionEl = container.querySelector('section')
    expect(sectionEl?.className).toContain('variant-gridline')
    expect(getByTestId('visual-el')).toHaveClass('River__visual--has-background')
  })

  it('does not apply the visual background class to the default variant', () => {
    const {getByTestId} = render(
      <RiverBreakout>
        <RiverBreakout.A11yHeading>{mockHeading}</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual data-testid="visual-el">
          <MockImage />
        </RiverBreakout.Visual>
        <RiverBreakout.Content>
          <Text>{mockText}</Text>
        </RiverBreakout.Content>
      </RiverBreakout>,
    )

    expect(getByTestId('visual-el')).not.toHaveClass('River__visual--has-background')
  })

  it('has no a11y violations with gridline variant', async () => {
    const {container} = render(
      <RiverBreakout variant="gridline">
        <RiverBreakout.A11yHeading>{mockHeading}</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <MockImage />
        </RiverBreakout.Visual>
        <RiverBreakout.Content>
          <Text>{mockText}</Text>
        </RiverBreakout.Content>
      </RiverBreakout>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
