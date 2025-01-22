import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Range} from '.'

expect.extend(toHaveNoViolations)

describe('Range', () => {
  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Range name="Range" />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders tooltip as text if set as number', async () => {
    const {getByRole} = render(<Range a11yStep={5} value={50} max={100} name="Range" />)
    const range = getByRole('slider')
    fireEvent.keyDown(range, {keyCode: 38})
    expect(range).toHaveAttribute('value', '55')
    fireEvent.keyDown(range, {keyCode: 40})
    expect(range).toHaveAttribute('value', '50')
  })

  it('calls the onChange function', () => {
    const testValue = 50
    const onChange = jest.fn()
    const {getByRole} = render(<Range value={testValue} onChange={onChange} name="Range" />)
    const inputElement = getByRole('slider')

    fireEvent.change(inputElement, {target: {value: '75'}})
    expect(onChange).toHaveBeenCalled()
  })
})
