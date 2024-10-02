import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {TextInput} from '../'

describe('TextInput', () => {
  afterEach(cleanup)

  it('should associate leadingText and trailingText to input', async () => {
    const {getByText, getByRole} = render(<TextInput leadingText="Hello" trailingText="World" />)

    const input = getByRole('textbox')
    const leadingText = getByText('Hello')
    const trailingText = getByText('World')

    expect(input).toHaveAttribute('aria-describedby', `${leadingText.id} ${trailingText.id}`)
  })

  it('should associate leadingVisual and trailingVisual to input', async () => {
    const {getByAltText, getByRole} = render(
      <TextInput leadingVisual={<img alt="Test 1" />} trailingVisual={<img alt="Test 2" />} />,
    )

    const input = getByRole('textbox')
    const leadingVisual = getByAltText('Test 1')
    const trailingVisual = getByAltText('Test 2')

    expect(input).toHaveAttribute('aria-describedby', `${leadingVisual.id} ${trailingVisual.id}`)
  })
})
