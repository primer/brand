import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
// import userEvent from '@testing-library/user-event'

import {Label} from './Label'
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

  it('renders the correct size', () => {
    const expectedSize = `large`
    const expectedSizeClass = `Label--size-${expectedSize}`

    const {getByTestId} = render(<Label size={expectedSize}>{mockText}</Label>)

    const labelEl = getByTestId(Label.testIds.root)
    expect(labelEl.classList).toContain(expectedSizeClass)
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

  it('does not render the leading icon by default', () => {
    const leadingVisualId = Label.testIds.leadingVisual

    const {queryByTestId} = render(<Label>{mockText}</Label>)

    const leadingIconSlot = queryByTestId(leadingVisualId)

    expect(leadingIconSlot).not.toBeInTheDocument()
  })

  it('can optionally render a leading visual', () => {
    const leadingVisualId = Label.testIds.leadingVisual

    const {getByTestId} = render(<Label leadingVisual={CopilotIcon}>{mockText}</Label>)

    const el = getByTestId(leadingVisualId)

    expect(el).toContainElement(el.querySelector('svg'))
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Label>{mockText}</Label>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
