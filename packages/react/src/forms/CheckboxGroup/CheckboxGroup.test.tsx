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

    expect(getByRole('group', {name: 'Choices'})).toBeInTheDocument()
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

  describe('aria-describedby', () => {
    it('associates the hint with the input', () => {
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

      const fieldset = getByRole('group', {name: 'Choices'})
      const caption = getByText('You can only pick one')

      expect(fieldset).toHaveAttribute('aria-describedby', caption.id)
    })

    it('associates the validation with the input', () => {
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

      const fieldset = getByRole('group', {name: 'Choices'})
      const validation = getByText('Uh oh!')

      expect(fieldset).toHaveAttribute('aria-describedby', validation.id)
    })

    it('associates both a hint and validation with the input', () => {
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

      const fieldset = getByRole('group', {name: 'Choices'})
      const hint = getByText('You can only pick one')
      const validation = getByText('Great job!')

      expect(fieldset).toHaveAttribute('aria-describedby', `${hint.id} ${validation.id}`)
    })
  })
})
