import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
const {axe, toHaveNoViolations} = require('jest-axe')

import {Hero} from './Hero'

expect.extend(toHaveNoViolations)

describe('Hero', () => {
  const mockHeading = 'This is my super sweet hero heading'
  const mockDescription = 'A description of the hero'

  afterEach(cleanup)

  test('renders correctly into the document', () => {
    const {getByText} = render(<Hero heading={mockHeading} description={mockDescription} />)
    const headingEl = getByText(mockHeading)
    const descriptionEl = getByText(mockDescription)

    expect(headingEl).toBeInTheDocument()
    expect(descriptionEl).toBeInTheDocument()
  })

  test('no a11y violations', async () => {
    const {container} = render(<Hero heading={mockHeading} description={mockDescription} />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
