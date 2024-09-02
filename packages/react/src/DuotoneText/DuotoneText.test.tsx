import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {DuotoneText} from './DuotoneText'
import exp from 'constants'

expect.extend(toHaveNoViolations)

describe('DuotoneText', () => {
  const mockEmphasizedText = 'Emphasized text'
  const mockRegularText = 'followed by regular text.'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders the text correctly', async () => {
    const {getByText, container} = render(
      <DuotoneText>
        <DuotoneText.Emphasis>{mockEmphasizedText}</DuotoneText.Emphasis>
        {mockRegularText}
      </DuotoneText>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()

    const regularText = getByText(mockRegularText)
    expect(regularText).toBeInTheDocument()

    const emphasizedText = getByText(mockEmphasizedText)
    expect(emphasizedText).toBeInTheDocument()
  })

  it('renders the regular and emphasized text as different colors', () => {
    const {getByText, container} = render(
      <DuotoneText>
        <DuotoneText.Emphasis>{mockEmphasizedText}</DuotoneText.Emphasis>
        {mockRegularText}
      </DuotoneText>,
    )

    const regularText = getByText(mockRegularText)
    expect(regularText).toHaveClass('DuotoneText')

    const emphasizedText = getByText(mockEmphasizedText)
    expect(emphasizedText).toHaveClass('DuotoneText__emphasis')
  })
})
