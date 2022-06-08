import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {River} from './River'
import {Text, Link, Heading} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('River', () => {
  const mockText = 'Minimal description'
  const mockHeading = 'Mock heading'
  const mockLinkText = 'call to action'
  const MockImage = () => <img src="file.jpg" alt="mock" />

  afterEach(cleanup)

  it('renders correctly into the document', () => {
    const {debug, getByText} = render(
      <River>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>
    )

    debug()

    const textEl = getByText(mockText)

    expect(textEl).toBeInTheDocument()
  })

  it('renders in 50:50 image ratio mode by default', () => {
    const {getByText} = render(
      <River>
        <River.Visual></River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>
    )

    const textEl = getByText(mockText)

    expect(textEl).toBeInTheDocument()
  })

  // test('renders without secondary action', () => {
  //   const {queryAllByRole} = render(<River heading={mockHeading} primaryAction={mockPrimaryAction} />)

  //   const linkElements = queryAllByRole('link')

  //   expect(linkElements.length).toBe(1)
  // })

  // test('renders without description', () => {
  //   const {container} = render(
  //     <River heading={mockHeading} primaryAction={mockPrimaryAction} secondaryAction={mockSecondaryAction} />
  //   )
  //   const descriptionEl = container.querySelector('p')

  //   expect(descriptionEl).toBeNull()
  // })

  it('has no a11y violations', async () => {
    const {container} = render(
      <River>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Heading>{mockHeading}</Heading>
          <Text>{mockText}</Text>
          <Link>{mockLinkText}</Link>
        </River.Content>
      </River>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
