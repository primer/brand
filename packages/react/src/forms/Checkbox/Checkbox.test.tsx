import React from 'react'
import {render, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {toHaveNoViolations} from 'jest-axe'

import {Checkbox} from '../Checkbox'

expect.extend(toHaveNoViolations)

describe('Checkbox', () => {
  afterEach(cleanup)

  it('renders a checkbox correctly into the document', () => {
    const {getByRole} = render(<Checkbox value="one" defaultChecked />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeChecked()
    expect(checkbox).toHaveAttribute('value', 'one')
  })

  it('toggles the checkbox when clicked', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(<Checkbox value="one" defaultChecked />)

    const checkbox = getByRole('checkbox')

    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('toggles the checkbox when the associated span is clicked', async () => {
    const user = userEvent.setup()

    const {getByRole, container} = render(<Checkbox value="one" defaultChecked />)

    const checkbox = getByRole('checkbox')
    const span = container.querySelector('span.Checkbox') as HTMLSpanElement

    expect(span).toBeInTheDocument()
    expect(checkbox).toBeChecked()

    await user.click(span)
    expect(checkbox).not.toBeChecked()

    await user.click(span)
    expect(checkbox).toBeChecked()
  })

  it('toggles the checkbox when the associated span is clicked and a functional ref is passed', async () => {
    const user = userEvent.setup()
    const mockRef = jest.fn()

    const {getByRole, container} = render(<Checkbox value="one" defaultChecked ref={mockRef} />)

    const checkbox = getByRole('checkbox')
    const span = container.querySelector('span.Checkbox') as HTMLSpanElement

    expect(mockRef).toHaveBeenCalledWith(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(span)
    expect(checkbox).not.toBeChecked()

    await user.click(span)
    expect(checkbox).toBeChecked()
  })

  it('remains clickable when passing an arbitrary function as a ref', async () => {
    const user = userEvent.setup()
    const mockRef = jest.fn()

    const {getByRole} = render(<Checkbox value="test" ref={mockRef} />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    expect(mockRef).toHaveBeenCalledTimes(1)
    expect(mockRef).toHaveBeenCalledWith(checkbox)

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('supports a standard RefObject', async () => {
    const user = userEvent.setup()
    const refObject = React.createRef<HTMLInputElement>()

    const {getByRole} = render(<Checkbox value="test" ref={refObject} />)

    const checkbox = getByRole('checkbox')

    expect(refObject.current).toBe(checkbox)
    expect(checkbox).not.toBeChecked()

    if (refObject.current) {
      await user.click(refObject.current)
    }

    expect(checkbox).toBeChecked()
    expect(refObject.current?.checked).toBe(true)
  })

  it('renders with custom className', () => {
    const {container} = render(<Checkbox className="my-custom-checkbox" value="test" />)

    const span = container.querySelector('span.Checkbox')
    expect(span).toBeInTheDocument()
    expect(span).toHaveClass('Checkbox', 'my-custom-checkbox')
  })

  it('renders with custom id', () => {
    const {getByRole} = render(<Checkbox id="my-checkbox-id" value="test" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('id', 'my-checkbox-id')
  })

  it('generates an id when id prop is not provided', () => {
    const {getByRole} = render(<Checkbox value="test" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('id')
  })

  it('renders with arbitrary attributes', () => {
    const {getByRole} = render(
      <Checkbox value="test" data-testid="custom-checkbox" aria-describedby="helper-text" title="My checkbox" />,
    )

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('data-testid', 'custom-checkbox')
    expect(checkbox).toHaveAttribute('aria-describedby', 'helper-text')
    expect(checkbox).toHaveAttribute('title', 'My checkbox')
  })

  it('is unchecked by default', () => {
    const {getByRole} = render(<Checkbox value="test" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    expect(checkbox).not.toHaveAttribute('aria-checked')
  })

  it('is checked when checked prop is true', () => {
    const mockOnChange = jest.fn()
    const {getByRole} = render(<Checkbox value="test" checked onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toBeChecked()
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('is unchecked when checked prop is false', () => {
    const mockOnChange = jest.fn()
    const {getByRole} = render(<Checkbox value="test" checked={false} onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('has non-indeterminate state by default', () => {
    const {getByRole, container} = render(<Checkbox value="test" />)

    const checkbox = getByRole('checkbox') as HTMLInputElement
    const span = container.querySelector('span.Checkbox')
    const checkmarkPath = container.querySelector('path.Checkbox-checkmark-path')
    const dashPath = container.querySelector('path:not(.Checkbox-checkmark-path)')

    expect(checkbox.indeterminate).toBe(false)
    expect(checkbox).not.toBeChecked()
    expect(span).not.toHaveClass('Checkbox--indeterminate')
    expect(checkbox).not.toHaveAttribute('aria-checked')
    expect(dashPath).not.toBeInTheDocument()
    expect(checkmarkPath).toBeInTheDocument()
  })

  it('has indeterminate state when indeterminate prop is true', () => {
    const mockOnChange = jest.fn()
    const {getByRole, container} = render(<Checkbox value="test" indeterminate onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox') as HTMLInputElement

    const span = container.querySelector('span.Checkbox')
    const checkmarkPath = container.querySelector('path.Checkbox-checkmark-path')
    const dashPath = container.querySelector('path:not(.Checkbox-checkmark-path)')

    expect(checkbox.indeterminate).toBe(true)
    expect(checkbox).not.toBeChecked()
    expect(span).toHaveClass('Checkbox--indeterminate')
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
    expect(dashPath).toBeInTheDocument()
    expect(checkmarkPath).not.toBeInTheDocument()
  })

  it('is not disabled by default', () => {
    const {getByRole} = render(<Checkbox value="test" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toHaveAttribute('disabled')
  })

  it('applies disabled attribute to input when disabled is true', () => {
    const {getByRole} = render(<Checkbox value="test" disabled />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('disabled')
  })

  it('does not apply disabled attribute to input when disabled is false', () => {
    const {getByRole} = render(<Checkbox value="test" disabled={false} />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toHaveAttribute('disabled')
  })

  it('prevents click interaction when disabled is true', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()

    const {getByRole, container} = render(<Checkbox value="test" disabled onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')
    const iconWrapper = container.querySelector('span.Checkbox') as HTMLSpanElement

    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(mockOnChange).not.toHaveBeenCalled()

    await user.click(iconWrapper)
    expect(checkbox).not.toBeChecked()
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('allows click interaction when disabled is false', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()

    const {getByRole, container} = render(<Checkbox value="test" disabled={false} onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')
    const iconWrapper = container.querySelector('span.Checkbox') as HTMLSpanElement

    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(mockOnChange).toHaveBeenCalledTimes(1)

    await user.click(iconWrapper)
    expect(checkbox).not.toBeChecked()
    expect(mockOnChange).toHaveBeenCalledTimes(2)
  })

  it('is not required by default', () => {
    const {getByRole} = render(<Checkbox value="test" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toHaveAttribute('required')
    expect(checkbox).toHaveAttribute('aria-required', 'false')
  })

  it('applies required attributes to input when required is true', () => {
    const {getByRole} = render(<Checkbox value="test" required />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('required')
    expect(checkbox).toHaveAttribute('aria-required', 'true')
  })

  it('does not apply required attributes to input when required is false', () => {
    const {getByRole} = render(<Checkbox value="test" required={false} />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toHaveAttribute('required')
    expect(checkbox).toHaveAttribute('aria-required', 'false')
  })

  it('calls onChange when checkbox is clicked', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()

    const {getByRole} = render(<Checkbox value="test" onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')

    await user.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('calls onChange with correct event object when checkbox icon is clicked', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()

    const {getByRole, container} = render(<Checkbox value="test" onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')
    const iconWrapper = container.querySelector('span.Checkbox') as HTMLSpanElement

    await user.click(iconWrapper)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'change',
        target: expect.objectContaining({
          type: 'checkbox',
          checked: true,
          value: 'test',
        }),
      }),
    )
    expect(checkbox).toBeChecked()
  })

  it('does not call onChange when disabled and checkbox is clicked', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()

    const {getByRole} = render(<Checkbox value="test" disabled onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')

    await user.click(checkbox)

    expect(mockOnChange).not.toHaveBeenCalled()
    expect(checkbox).not.toBeChecked()
  })

  it('does not call onChange when disabled and checkbox icon is clicked', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()

    const {getByRole, container} = render(<Checkbox value="test" disabled onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')
    const iconWrapper = container.querySelector('span.Checkbox') as HTMLSpanElement

    await user.click(iconWrapper)

    expect(mockOnChange).not.toHaveBeenCalled()
    expect(checkbox).not.toBeChecked()
  })

  it('calls onChange when Space key is pressed on checkbox', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()

    const {getByRole} = render(<Checkbox value="test" onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')
    checkbox.focus()

    await user.keyboard(' ')

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'change',
        target: expect.objectContaining({
          type: 'checkbox',
          checked: true,
          value: 'test',
        }),
      }),
    )
    expect(checkbox).toBeChecked()
  })

  it('does not call onChange when Space key is pressed on disabled checkbox', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()

    const {getByRole} = render(<Checkbox value="test" disabled onChange={mockOnChange} />)

    const checkbox = getByRole('checkbox')
    checkbox.focus()

    await user.keyboard(' ')

    expect(mockOnChange).not.toHaveBeenCalled()
    expect(checkbox).not.toBeChecked()
  })

  it('sets aria-invalid to false by default', () => {
    const {getByRole} = render(<Checkbox value="test" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-invalid', 'false')
  })

  it('sets aria-invalid to true when validationStatus is error', () => {
    const {getByRole} = render(<Checkbox value="test" validationStatus="error" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
  })

  it('sets aria-invalid to false when validationStatus is success', () => {
    const {getByRole} = render(<Checkbox value="test" validationStatus="success" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-invalid', 'false')
  })

  it('uses value prop as name attribute', () => {
    const {getByRole} = render(<Checkbox value="test" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('name', 'test')
  })

  it('uses value prop as value attribute', () => {
    const {getByRole} = render(<Checkbox value="test" />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('value', 'test')
  })
})
