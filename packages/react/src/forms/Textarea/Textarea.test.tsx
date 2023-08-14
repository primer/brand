import React from 'react'
import {Textarea} from '..'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {toHaveNoViolations} from 'jest-axe'
import '@testing-library/jest-dom'

import {DEFAULT_TEXTAREA_ROWS, DEFAULT_TEXTAREA_COLS, DEFAULT_TEXTAREA_RESIZE} from './Textarea'

expect.extend(toHaveNoViolations)

describe('Textarea', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders a valid textarea input', () => {
    const {getByRole} = render(<Textarea />)

    const textarea = getByRole('textbox')

    expect(textarea).toBeDefined()
  })

  it('renders an empty textarea by default', () => {
    const {getByRole} = render(<Textarea />)

    const textareaElement = getByRole('textbox') as HTMLTextAreaElement

    expect(textareaElement.value).toEqual('')
  })

  it('renders correct default values', () => {
    expect(DEFAULT_TEXTAREA_COLS).toEqual(30)
    expect(DEFAULT_TEXTAREA_RESIZE).toEqual('both')
    expect(DEFAULT_TEXTAREA_ROWS).toEqual(7)
  })

  it('renders an uncontrolled component correctly', () => {
    const sideEffectValue = 'mock value 2'

    const MockComponent = () => {
      const ref = React.useRef<HTMLTextAreaElement>(null)

      React.useEffect(() => {
        if (ref.current) {
          ref.current.value = sideEffectValue
        }
      }, [ref])

      return <Textarea ref={ref} />
    }

    const {getByRole} = render(<MockComponent />)

    const textareaElement = getByRole('textbox') as HTMLTextAreaElement

    expect(textareaElement.value).toBe(sideEffectValue)
  })

  it('renders an optional fullWidth prop correctly', () => {
    const {getByRole} = render(<Textarea fullWidth />)
    const textareaElement = getByRole('textbox') as HTMLTextAreaElement

    expect(textareaElement.classList).toContain(`Textarea--fullWidth`)
  })

  it('renders default resize values correctly', () => {
    const {getByRole} = render(<Textarea />)
    const textareaElement = getByRole('textbox')

    expect(textareaElement.classList).toContain(`Textarea-resize--both`)
  })

  it('renders none resize values correctly', () => {
    const {getByRole} = render(<Textarea resize="none" />)
    const textareaElement = getByRole('textbox')

    expect(textareaElement.classList).toContain(`Textarea-resize--none`)
  })

  it('renders a value in the textarea', () => {
    const mockValue = 'mock value'
    const onChange = jest.fn()
    const {getByRole} = render(<Textarea onChange={onChange} value={mockValue} />)

    const textareaElement = getByRole('textbox') as HTMLTextAreaElement

    expect(textareaElement.value).toEqual(mockValue)
  })

  it('renders a monospace styles correctly', () => {
    const {getByTestId} = render(<Textarea monospace />)
    const textareaElement = getByTestId('Textarea-outer-container')

    expect(textareaElement.classList).toContain(`Textarea-wrapper--monospace`)
  })

  it('renders a monospace styles correctly', () => {
    const {getByTestId} = render(<Textarea invisible />)
    const textareaElement = getByTestId('Textarea-outer-container')

    expect(textareaElement.classList).toContain(`Textarea-wrapper--invisible`)
  })

  it('can render an inactive textarea', async () => {
    const handleChange = jest.fn()
    const {getByRole, rerender} = render(<Textarea disabled onChange={handleChange} />)

    const textareaElement = getByRole('textbox') as HTMLTextAreaElement
    expect(textareaElement.disabled).toEqual(true)
    expect(textareaElement).toHaveAttribute('disabled')

    userEvent.click(textareaElement)

    expect(handleChange).not.toHaveBeenCalled()

    // remove disabled attribute and retest
    rerender(<Textarea onChange={handleChange} />)

    expect(textareaElement.disabled).toEqual(false)
    expect(textareaElement).not.toHaveAttribute('disabled')
  })

  it('renders a required attribute correctly', () => {
    const {getByRole} = render(<Textarea required />)

    const textareaElement = getByRole('textbox') as HTMLTextAreaElement

    expect(textareaElement).toHaveAttribute('required')
  })

  it('renders an invalid aria state when validation prop indicates an error', () => {
    const {getByRole, rerender} = render(<Textarea />)

    const textareaElement = getByRole('textbox') as HTMLTextAreaElement

    expect(textareaElement).toHaveAttribute('aria-invalid', 'false')

    rerender(<Textarea validationStatus="success" />)

    expect(textareaElement).toHaveAttribute('aria-invalid', 'false')

    rerender(<Textarea validationStatus="error" />)

    expect(textareaElement).toHaveAttribute('aria-invalid', 'true')
  })
})
