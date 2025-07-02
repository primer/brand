import React from 'react'
import {Radio} from '..'
import {render, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {toHaveNoViolations} from 'jest-axe'
import '@testing-library/jest-dom'

expect.extend(toHaveNoViolations)

describe('Radio', () => {
  const defaultProps = {
    name: 'mock',
    value: 'mock value',
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders a valid radio input', () => {
    const {getByRole} = render(<Radio {...defaultProps} />)

    const radio = getByRole('radio')

    expect(radio).toBeDefined()
  })

  it('renders an unchecked radio by default', () => {
    const {getByRole} = render(<Radio {...defaultProps} />)

    const radio = getByRole('radio') as HTMLInputElement

    expect(radio.checked).toEqual(false)
  })

  it('accepts and applies value and name attributes', () => {
    const {getByRole} = render(<Radio {...defaultProps} />)

    const radio = getByRole('radio') as HTMLInputElement

    expect(radio).toHaveAttribute('name', defaultProps.name)
    expect(radio).toHaveAttribute('value', defaultProps.value)
  })

  it('renders an active radio when checked attribute is passed', () => {
    const handleChange = jest.fn()
    const {getByRole} = render(<Radio {...defaultProps} checked onChange={handleChange} />)

    const radio = getByRole('radio') as HTMLInputElement

    expect(radio.checked).toEqual(true)
  })

  it('accepts a change handler that can alter a single radio state', () => {
    const handleChange = jest.fn()
    const {getByRole} = render(<Radio {...defaultProps} onChange={handleChange} />)

    const radio = getByRole('radio') as HTMLInputElement

    expect(radio.checked).toEqual(false)

    fireEvent.click(radio)
    expect(handleChange).toHaveBeenCalled()
    expect(radio.checked).toEqual(true)
  })

  it('renders correct behavior for multiple radio buttons in a group', () => {
    const handleChange = jest.fn()
    const RadioGroup = () => (
      <form>
        <Radio {...defaultProps} value="radio-one" onChange={handleChange} />
        <Radio {...defaultProps} value="radio-two" onChange={handleChange} />
      </form>
    )
    const {getByDisplayValue} = render(<RadioGroup />)

    const radioOne = getByDisplayValue('radio-one') as HTMLInputElement
    const radioTwo = getByDisplayValue('radio-two') as HTMLInputElement

    expect(radioOne).not.toBeChecked()
    expect(radioTwo).not.toBeChecked()

    fireEvent.click(radioOne)

    expect(radioOne).toBeChecked()
    expect(radioTwo).not.toBeChecked()

    fireEvent.click(radioTwo)

    expect(radioOne).not.toBeChecked()
    expect(radioTwo).toBeChecked()
  })

  it('renders an inactive radio state correctly', () => {
    const handleChange = jest.fn()
    const {getByRole, rerender} = render(<Radio {...defaultProps} disabled onChange={handleChange} />)

    const radio = getByRole('radio') as HTMLInputElement

    expect(radio.disabled).toEqual(true)
    expect(radio).not.toBeChecked()

    fireEvent.change(radio)

    expect(radio.disabled).toEqual(true)
    expect(radio).not.toBeChecked()

    // remove disabled attribute and retest
    rerender(<Radio {...defaultProps} onChange={handleChange} />)

    expect(radio).not.toHaveAttribute('disabled')
  })

  it('renders an uncontrolled component correctly', () => {
    const {getByRole} = render(<Radio {...defaultProps} defaultChecked />)

    const radio = getByRole('radio') as HTMLInputElement

    expect(radio.checked).toEqual(true)
  })

  it('renders an aria-checked attribute correctly', () => {
    const handleChange = jest.fn()
    const {getByRole, rerender} = render(<Radio {...defaultProps} checked={false} onChange={handleChange} />)

    const radio = getByRole('radio') as HTMLInputElement

    expect(radio).toHaveAttribute('aria-checked', 'false')

    rerender(<Radio {...defaultProps} checked={true} onChange={handleChange} />)

    expect(radio).toHaveAttribute('aria-checked', 'true')
  })

  it('toggles the radio when the associated span is clicked and a functional ref is passed', async () => {
    const user = userEvent.setup()
    const mockRef = jest.fn()
    const handleChange = jest.fn()

    const {getByRole, container} = render(<Radio {...defaultProps} onChange={handleChange} ref={mockRef} />)

    const radio = getByRole('radio')
    expect(mockRef).toHaveBeenCalledWith(radio)

    const span = container.querySelector('span.Radio') as HTMLSpanElement
    expect(span).toBeInTheDocument()

    expect(radio).not.toBeChecked()

    await user.click(span)
    expect(radio).toBeChecked()
  })
})
