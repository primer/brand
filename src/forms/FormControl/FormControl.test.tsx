import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {FormControl} from './FormControl'
import {TextInput} from '../TextInput'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('FormControl', () => {
  const mockFormControlLabel = 'My label'
  const mockFormControlId = 'my-input-id'
  const mockTestId = 'my-test-id'

  afterEach(cleanup)

  it('renders a text input form control correctly into the document', () => {
    const {getByRole, getByLabelText} = render(
      <FormControl>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>
    )

    const labelEl = getByLabelText(mockFormControlLabel)
    const inputEl = getByRole('textbox')

    expect(labelEl).toBeInTheDocument()
    expect(inputEl).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <FormControl>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('generates a unique ID and forwards to relevant children', async () => {
    const {container, getByRole, getByTestId} = render(
      <FormControl id={mockFormControlId} data-testid={mockTestId}>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>
    )
    const labelEl = container.querySelector('label')
    const labelForValue = labelEl?.getAttribute('for')

    const inputEl = getByRole('textbox')
    const rootEl = getByTestId(mockTestId)

    const inputIdValue = inputEl.getAttribute('id')
    const inputNameValue = inputEl.getAttribute('name')

    expect(inputIdValue).toEqual(labelForValue)
    expect(inputNameValue).toEqual(labelForValue)
    expect(rootEl.getAttribute('id')).toBe(mockFormControlId)
  })

  it('can forward an ID override to relevant children', async () => {
    const {container, getByTestId, getByRole} = render(
      <FormControl id={mockFormControlId} data-testid={mockTestId}>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>
    )

    const labelEl = container.querySelector('label')
    const labelForValue = labelEl?.getAttribute('for')

    const inputEl = getByRole('textbox')
    const rootEl = getByTestId(mockTestId)

    const inputIdValue = inputEl.getAttribute('id')
    const inputNameValue = inputEl.getAttribute('name')

    expect(inputIdValue).toEqual(labelForValue)
    expect(inputNameValue).toEqual(labelForValue)
    expect(rootEl.getAttribute('id')).toBe(mockFormControlId)
  })

  it('applies error state to the inputs and form validation', async () => {
    const expectedMessage = 'My error message'

    const {container, getByText, getByRole} = render(
      <FormControl validationStatus="error">
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
        <FormControl.Validation>{expectedMessage}</FormControl.Validation>
      </FormControl>
    )

    const errorIcon = container.querySelector('svg.octicon-alert-fill')
    const inputEl = getByRole('textbox')
    const validationEl = getByText(expectedMessage)

    expect(inputEl).toHaveAttribute('aria-invalid', 'true')
    expect(validationEl).toBeInTheDocument()
    expect(errorIcon).toBeInTheDocument()
  })

  it('applies success validation state to the inputs and form validation', async () => {
    const expectedMessage = 'My success message'

    const {container, getByText, getByRole} = render(
      <FormControl validationStatus="success">
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
        <FormControl.Validation>{expectedMessage}</FormControl.Validation>
      </FormControl>
    )

    const successIcon = container.querySelector('svg.octicon-check-circle-fill')
    const inputEl = getByRole('textbox')
    const validationEl = getByText(expectedMessage)

    expect(inputEl).toHaveAttribute('aria-invalid', 'false')
    expect(validationEl).toBeInTheDocument()
    expect(successIcon).toBeInTheDocument()
  })

  it('can render non-namespaced children and native inputs', async () => {
    const {getByRole} = render(
      <FormControl validationStatus="success">
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <input type="text" />
      </FormControl>
    )

    const inputEl = getByRole('textbox')

    expect(inputEl).toBeInTheDocument()
  })

  it('can render in full-width label and input', async () => {
    const {getByTestId, getByRole} = render(
      <FormControl fullWidth data-testid={mockFormControlId}>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>
    )

    const rootEl = getByTestId(mockFormControlId)
    const inputEl = getByRole('textbox')

    expect(rootEl.classList).toContain('FormControl--fullWidth')
    expect(inputEl.classList).toContain(`TextInput--fullWidth`)
  })

  it('can render in alternative sizes', async () => {
    const {container, getByRole, rerender} = render(
      <FormControl>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>
    )

    const labelEl = container.querySelector('label')
    const inputEl = getByRole('textbox')

    // default to medium
    expect(labelEl?.classList).toContain('FormControl-label--medium')
    expect(inputEl.classList).toContain(`TextInput--medium`)

    // optionally large
    rerender(
      <FormControl size="large">
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>
    )

    expect(labelEl?.classList).toContain('FormControl-label--large')
    expect(inputEl.classList).toContain(`TextInput--large`)
  })
})
