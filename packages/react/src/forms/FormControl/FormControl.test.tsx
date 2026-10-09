import React from 'react'
import {render, cleanup} from '@testing-library/react'
import {renderToStaticMarkup} from 'react-dom/server'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {FormControl} from './FormControl'
import {TextInput} from '../TextInput'
import {Select} from '../Select'
import {ToggleSwitch} from '../ToggleSwitch'

expect.extend(toHaveNoViolations)

describe('FormControl', () => {
  const mockFormControlLabel = 'My label'
  const mockFormControlId = 'my-input-id'
  const mockTestId = 'my-test-id'

  afterEach(cleanup)

  it('associates a toggle switch without overriding its size', async () => {
    const {getByRole, getByLabelText, getByText, container} = render(
      <FormControl id="notifications" size="large">
        <FormControl.Label>Enable notifications</FormControl.Label>
        <ToggleSwitch size="small" />
        <FormControl.Hint className="custom-hint">Receive project updates.</FormControl.Hint>
      </FormControl>,
    )

    const control = getByRole('switch', {name: 'Enable notifications'})
    expect(getByLabelText('Enable notifications')).toBe(control)
    expect(control).toHaveAttribute('id', 'notifications')
    expect(control).toHaveAccessibleDescription('Receive project updates.')
    expect(control).toHaveAttribute('aria-describedby', getByText('Receive project updates.').id)
    expect(getByText('Receive project updates.')).toHaveClass('FormControl-hint', 'custom-hint')
    expect(container.querySelector('label')).toHaveClass('FormControl-label--large')
    expect(control.parentElement).toHaveClass('ToggleSwitch--small')
    expect(await axe(container)).toHaveNoViolations()
  })

  it('combines toggle descriptions without duplicates and forwards validation semantics', () => {
    const {getByRole, getByText, queryByText} = render(
      <>
        <span id="external-hint">External guidance.</span>
        <FormControl id="notifications" validationStatus="error" required>
          <FormControl.Label>Enable notifications</FormControl.Label>
          <ToggleSwitch aria-describedby="external-hint notifications-hint" />
          <FormControl.Hint>Receive project updates.</FormControl.Hint>
          <FormControl.Validation className="custom-validation">Unable to save.</FormControl.Validation>
        </FormControl>
      </>,
    )
    const control = getByRole('switch')
    expect(control).toHaveAttribute('aria-describedby', 'external-hint notifications-hint notifications-validation')
    expect(control).toHaveAttribute('aria-invalid', 'true')
    expect(control).not.toHaveAttribute('required')
    expect(queryByText('*')).not.toBeInTheDocument()
    expect(getByText('Unable to save.')).toHaveAttribute('id', 'notifications-validation')
    expect(getByText('Unable to save.')).toHaveClass('FormControl-validation', 'custom-validation')
  })

  it('generates distinct toggle IDs and preserves explicit child ARIA validity', () => {
    const {getByRole} = render(
      <>
        <FormControl validationStatus="error">
          <FormControl.Label>Enable notifications</FormControl.Label>
          <ToggleSwitch aria-invalid={false} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Enable discussions</FormControl.Label>
          <ToggleSwitch />
        </FormControl>
      </>,
    )
    const notifications = getByRole('switch', {name: 'Enable notifications'})
    const discussions = getByRole('switch', {name: 'Enable discussions'})
    expect(notifications.id).not.toBe(discussions.id)
    expect(notifications).toHaveAttribute('aria-invalid', 'false')
  })

  it('preserves hidden-label support with equivalent visible labeling', () => {
    const {getByRole, container} = render(
      <>
        <span id="visible-setting-label">Enable notifications</span>
        <FormControl>
          <FormControl.Label visuallyHidden>Enable notifications</FormControl.Label>
          <ToggleSwitch aria-labelledby="visible-setting-label" />
        </FormControl>
      </>,
    )
    expect(getByRole('switch', {name: 'Enable notifications'})).toBeInTheDocument()
    expect(container.querySelector('label')).toHaveClass('FormControl-label--visually-hidden')
  })

  it('places toggle loading beside the visible label without changing its accessible name', async () => {
    const {getByRole, getByTestId, container, rerender} = render(
      <FormControl>
        <FormControl.Label>Enable notifications</FormControl.Label>
        <ToggleSwitch loading />
      </FormControl>,
    )
    const control = getByRole('switch', {name: 'Enable notifications'})
    const indicator = getByTestId(ToggleSwitch.testIds.spinner)
    expect(indicator).toHaveClass('Spinner', 'ToggleSwitch-spinner')
    expect(container.querySelector('label')).toContainElement(indicator)
    expect(control.parentElement).not.toContainElement(indicator)
    expect(indicator.parentElement?.parentElement).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelectorAll(`[data-testid="${ToggleSwitch.testIds.spinner}"]`)).toHaveLength(1)
    expect(await axe(container)).toHaveNoViolations()

    rerender(
      <FormControl>
        <FormControl.Label>Enable notifications</FormControl.Label>
        <ToggleSwitch />
      </FormControl>,
    )
    expect(container.querySelector('label .FormControl-toggleSwitch-spinnerSlot')).not.toBeInTheDocument()
    expect(getByRole('switch', {name: 'Enable notifications'})).toBe(control)
  })

  it('renders toggle loading beside its label on the server without a DOM target', () => {
    const markup = renderToStaticMarkup(
      <FormControl>
        <FormControl.Label>Enable notifications</FormControl.Label>
        <ToggleSwitch loading />
      </FormControl>,
    )
    const container = new DOMParser().parseFromString(markup, 'text/html')
    const toggleSwitchSpinner = container.querySelector<SVGSVGElement>(
      `[data-testid="${ToggleSwitch.testIds.spinner}"]`,
    )
    expect(container.querySelector('label')?.contains(toggleSwitchSpinner)).toBe(true)
    expect(container.querySelectorAll(`[data-testid="${ToggleSwitch.testIds.spinner}"]`)).toHaveLength(1)
  })

  it('keeps loading beside the switch when its FormControl label is visually hidden', () => {
    const {getByRole, getByTestId, container} = render(
      <FormControl>
        <FormControl.Label visuallyHidden>Enable notifications</FormControl.Label>
        <ToggleSwitch loading spinnerPosition="start" />
      </FormControl>,
    )
    const indicator = getByTestId(ToggleSwitch.testIds.spinner)
    expect(container.querySelector('label')).not.toContainElement(indicator)
    expect(indicator.parentElement?.parentElement?.nextElementSibling).toBe(getByRole('switch'))
  })

  it('renders a text input form control correctly into the document', () => {
    const {getByRole, getByLabelText} = render(
      <FormControl>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>,
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
      </FormControl>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('generates a unique ID and forwards to relevant children', async () => {
    const {container, getByRole, getByTestId} = render(
      <FormControl data-testid={mockTestId}>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>,
    )
    const labelEl = container.querySelector('label')
    const labelForValue = labelEl?.getAttribute('for')

    const inputEl = getByRole('textbox')
    const rootEl = getByTestId(mockTestId)

    const inputIdValue = inputEl.getAttribute('id')
    const inputNameValue = inputEl.getAttribute('name')

    expect(inputIdValue).toEqual(labelForValue)
    expect(inputNameValue).toEqual(labelForValue)

    expect(rootEl.getAttribute('id')).toBe(`FormControl--${inputIdValue}`)
  })

  it('can forward an ID override to relevant children', async () => {
    const {container, getByTestId, getByRole} = render(
      <FormControl id={mockFormControlId} data-testid={mockTestId}>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>,
    )

    const labelEl = container.querySelector('label')
    const labelForValue = labelEl?.getAttribute('for')

    const inputEl = getByRole('textbox')
    const rootEl = getByTestId(mockTestId)

    const inputIdValue = inputEl.getAttribute('id')
    const inputNameValue = inputEl.getAttribute('name')

    expect(inputIdValue).toEqual(mockFormControlId)
    expect(inputIdValue).toEqual(labelForValue)
    expect(inputNameValue).toEqual(labelForValue)
    expect(inputNameValue).toEqual(mockFormControlId)

    expect(rootEl.getAttribute('id')).toBe(`FormControl--${mockFormControlId}`)
  })

  it('can forward a name prop to text inputs', async () => {
    const mockName = 'input-name'
    const {getByRole} = render(
      <FormControl>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput name={mockName} />
      </FormControl>,
    )

    const inputEl = getByRole('textbox')

    const inputNameValue = inputEl.getAttribute('name')

    expect(inputNameValue).toEqual(mockName)
  })

  it('can forward a name prop to select inputs', async () => {
    const mockName = 'select-name'
    const {getByRole} = render(
      <FormControl>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <Select name={mockName}>
          <Select.Option value="">Select a handle</Select.Option>
          <Select.Option value="mona">Monalisa</Select.Option>
          <Select.Option value="hubot">Hubot</Select.Option>
        </Select>
      </FormControl>,
    )

    const selectEl = getByRole('combobox')

    const selectNameValue = selectEl.getAttribute('name')

    expect(selectNameValue).toEqual(mockName)
  })

  it('applies error state to the inputs and form validation', async () => {
    const expectedMessage = 'My error message'

    const {container, getByText, getByRole} = render(
      <FormControl validationStatus="error">
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
        <FormControl.Validation>{expectedMessage}</FormControl.Validation>
      </FormControl>,
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
      </FormControl>,
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
      </FormControl>,
    )

    const inputEl = getByRole('textbox')

    expect(inputEl).toBeInTheDocument()
  })

  it('can render in full-width label and input', async () => {
    const {getByTestId, getByRole} = render(
      <FormControl fullWidth data-testid={mockFormControlId}>
        <FormControl.Label>{mockFormControlLabel}</FormControl.Label>
        <TextInput />
      </FormControl>,
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
      </FormControl>,
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
      </FormControl>,
    )

    expect(labelEl?.classList).toContain('FormControl-label--large')
    expect(inputEl.classList).toContain(`TextInput--large`)
  })

  it('associates the hint with the input', () => {
    const {getByLabelText, getByText} = render(
      <FormControl>
        <FormControl.Label>My Label</FormControl.Label>
        <TextInput />
        <FormControl.Hint>A useful hint</FormControl.Hint>
      </FormControl>,
    )

    const input = getByLabelText('My Label')
    const hint = getByText('A useful hint')

    expect(input).toHaveAttribute('aria-describedby', hint.id)
  })

  it('associates the validation with the input', () => {
    const {getByLabelText, getByText} = render(
      <FormControl>
        <FormControl.Label>My Label</FormControl.Label>
        <TextInput />
        <FormControl.Validation>LGTM</FormControl.Validation>
      </FormControl>,
    )

    const input = getByLabelText('My Label')
    const validation = getByText('LGTM')

    expect(input).toHaveAttribute('aria-describedby', validation.id)
  })

  it('associates both a hint and validation with the input', () => {
    const {getByLabelText, getByText} = render(
      <FormControl>
        <FormControl.Label>My Label</FormControl.Label>
        <TextInput />
        <FormControl.Hint>A useful hint</FormControl.Hint>
        <FormControl.Validation>LGTM</FormControl.Validation>
      </FormControl>,
    )

    const input = getByLabelText('My Label')
    const hint = getByText('A useful hint')
    const validation = getByText('LGTM')

    expect(input).toHaveAttribute('aria-describedby', `${hint.id} ${validation.id}`)
  })
})
