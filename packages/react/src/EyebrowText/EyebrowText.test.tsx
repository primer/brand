import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {EyebrowText} from './EyebrowText'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)
const mockText = 'Eyebrow text'

describe('EyebrowText', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'EyebrowText'

    const {getByTestId} = render(<EyebrowText>{mockText}</EyebrowText>)

    const eyebrowEl = getByTestId(EyebrowText.testIds.root)
    expect(eyebrowEl.classList).toContain(expectedClass)
  })

  it('renders as a span element', () => {
    const {getByTestId} = render(<EyebrowText>{mockText}</EyebrowText>)

    const eyebrowEl = getByTestId(EyebrowText.testIds.root)
    expect(eyebrowEl.tagName).toBe('SPAN')
  })

  it('renders children correctly', () => {
    const {getByTestId} = render(<EyebrowText>{mockText}</EyebrowText>)

    const eyebrowEl = getByTestId(EyebrowText.testIds.root)
    expect(eyebrowEl).toHaveTextContent(mockText)
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    const {getByTestId} = render(<EyebrowText className={customClass}>{mockText}</EyebrowText>)

    const eyebrowEl = getByTestId(EyebrowText.testIds.root)
    expect(eyebrowEl.classList).toContain(customClass)
  })

  it('has no a11y violations', async () => {
    const {container} = render(<EyebrowText>{mockText}</EyebrowText>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
