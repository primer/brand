import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Label, LabelSizes} from './Label'
import {axe, toHaveNoViolations} from 'jest-axe'
import {CopilotIcon} from '@primer/octicons-react'

expect.extend(toHaveNoViolations)
const mockText = 'Label text'

describe('Label', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'Label'

    const {getByTestId} = render(<Label>{mockText}</Label>)

    const labelEl = getByTestId(Label.testIds.root)
    expect(labelEl.classList).toContain(expectedClass)
  })

  it('renders the correct default size', () => {
    const expectedShapeClass = `Label--size-medium`

    const {getByTestId} = render(<Label>{mockText}</Label>)

    const labelEl = getByTestId(Label.testIds.root)
    expect(labelEl.classList).toContain(expectedShapeClass)
  })

  it.each(LabelSizes)('renders the correct size: %s', size => {
    const {getByTestId} = render(<Label size={size}>{mockText}</Label>)
    const labelEl = getByTestId(Label.testIds.root)

    expect(labelEl.classList).toContain(`Label--size-${size}`)
  })

  it('renders the correct default color', () => {
    const expectedShapeClass = `Label--color-default`

    const {getByTestId} = render(<Label>{mockText}</Label>)

    const labelEl = getByTestId(Label.testIds.root)
    expect(labelEl.classList).toContain(expectedShapeClass)
  })

  it('renders the correct color', () => {
    const expectedColor = `purple`
    const expectedColorClass = `Label--color-${expectedColor}`

    const {getByTestId} = render(<Label color={expectedColor}>{mockText}</Label>)

    const labelEl = getByTestId(Label.testIds.root)
    expect(labelEl.classList).toContain(expectedColorClass)
  })

  it('adds an additional CSS class if the color value is a gradient', () => {
    const expectedColor = `red-orange`
    const expectedColorClasses = [`Label--color-${expectedColor}`, `Label--gradient`]

    const {getByTestId} = render(<Label color={expectedColor}>{mockText}</Label>)
    const labelEl = getByTestId(Label.testIds.root)

    for (const expectedClass of expectedColorClasses) {
      expect(labelEl.classList).toContain(expectedClass)
    }
  })

  it('does not render the leading icon by default', () => {
    const leadingVisualId = Label.testIds.leadingVisual

    const {queryByTestId} = render(<Label>{mockText}</Label>)

    const leadingIconSlot = queryByTestId(leadingVisualId)

    expect(leadingIconSlot).not.toBeInTheDocument()
  })

  it('can optionally render a leading visual', () => {
    const leadingVisualId = Label.testIds.leadingVisual

    const {getByTestId} = render(<Label leadingVisual={<CopilotIcon />}>{mockText}</Label>)

    const el = getByTestId(leadingVisualId)

    expect(el).toContainElement(el.querySelector('svg'))
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Label>{mockText}</Label>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
