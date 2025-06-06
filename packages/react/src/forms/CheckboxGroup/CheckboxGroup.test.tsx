import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {CheckboxGroup} from './CheckboxGroup'
import {Checkbox} from '../Checkbox'
import {FormControl} from '../FormControl'

expect.extend(toHaveNoViolations)

describe('CheckboxGroup', () => {
  afterEach(cleanup)

  it('renders a checkbox group correctly into the document', () => {
    const {getByLabelText, getByRole, getByText} = render(
      <CheckboxGroup>
        <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
        <CheckboxGroup.Caption>You can only pick one</CheckboxGroup.Caption>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Checkbox value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Checkbox value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Checkbox value="three" />
        </FormControl>

        <CheckboxGroup.Validation variant="success">Great job!</CheckboxGroup.Validation>
      </CheckboxGroup>,
    )

    // The group name now includes the label, caption, and validation text
    expect(getByRole('group', {name: 'Choices You can only pick one Great job!'})).toBeInTheDocument()
    expect(getByText('You can only pick one')).toBeInTheDocument()
    expect(getByLabelText('Choice one')).toBeInTheDocument()
    expect(getByLabelText('Choice two')).toBeInTheDocument()
    expect(getByLabelText('Choice three')).toBeInTheDocument()
    expect(getByText('Great job!')).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <CheckboxGroup>
        <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
        <CheckboxGroup.Caption>You can only pick one</CheckboxGroup.Caption>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Checkbox value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Checkbox value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Checkbox value="three" />
        </FormControl>

        <CheckboxGroup.Validation variant="success">Great job!</CheckboxGroup.Validation>
      </CheckboxGroup>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('includes the caption in the legend for screen readers', () => {
    const {getByRole, getByText} = render(
      <CheckboxGroup>
        <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
        <CheckboxGroup.Caption>You can only pick one</CheckboxGroup.Caption>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Checkbox value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Checkbox value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Checkbox value="three" />
        </FormControl>
      </CheckboxGroup>,
    )

    const fieldset = getByRole('group', {name: 'Choices You can only pick one'})
    const caption = getByText('You can only pick one')
    
    // The caption should be in the legend, not referenced by aria-describedby
    expect(fieldset).not.toHaveAttribute('aria-describedby')
    expect(caption).toBeInTheDocument()
  })

  it('includes the validation in the legend for screen readers', () => {
    const {getByRole, getByText} = render(
      <CheckboxGroup>
        <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Checkbox value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Checkbox value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Checkbox value="three" />
        </FormControl>

        <CheckboxGroup.Validation variant="error">Uh oh!</CheckboxGroup.Validation>
      </CheckboxGroup>,
    )

    const fieldset = getByRole('group', {name: 'Choices Uh oh!'})
    const validation = getByText('Uh oh!')

    // The validation should be in the legend, not referenced by aria-describedby
    expect(fieldset).not.toHaveAttribute('aria-describedby')
    expect(validation).toBeInTheDocument()
  })

  it('includes both caption and validation in the legend for screen readers', () => {
    const {getByRole, getByText} = render(
      <CheckboxGroup>
        <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
        <CheckboxGroup.Caption>You can only pick one</CheckboxGroup.Caption>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Checkbox value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Checkbox value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Checkbox value="three" />
        </FormControl>

        <CheckboxGroup.Validation variant="success">Great job!</CheckboxGroup.Validation>
      </CheckboxGroup>,
    )

    const fieldset = getByRole('group', {name: 'Choices You can only pick one Great job!'})
    const hint = getByText('You can only pick one')
    const validation = getByText('Great job!')

    // Both caption and validation should be in the legend, not referenced by aria-describedby
    expect(fieldset).not.toHaveAttribute('aria-describedby')
    expect(hint).toBeInTheDocument()
    expect(validation).toBeInTheDocument()
  })

  // Edge case tests
  it('works with only label (no caption or validation)', () => {
    const {getByRole} = render(
      <CheckboxGroup>
        <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Checkbox value="one" />
        </FormControl>
      </CheckboxGroup>
    )

    // Should still have the fieldset with just the label text
    expect(getByRole('group', {name: 'Choices'})).toBeInTheDocument()
  })

  it('works with only caption (no validation)', () => {
    const {getByRole} = render(
      <CheckboxGroup>
        <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
        <CheckboxGroup.Caption>Pick one</CheckboxGroup.Caption>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Checkbox value="one" />
        </FormControl>
      </CheckboxGroup>
    )

    // Should have label + caption
    expect(getByRole('group', {name: 'Choices Pick one'})).toBeInTheDocument()
  })

  it('works with only validation (no caption)', () => {
    const {getByRole} = render(
      <CheckboxGroup>
        <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Checkbox value="one" />
        </FormControl>
        <CheckboxGroup.Validation variant="error">Error!</CheckboxGroup.Validation>
      </CheckboxGroup>
    )

    // Should have label + validation
    expect(getByRole('group', {name: 'Choices Error!'})).toBeInTheDocument()
  })
})
