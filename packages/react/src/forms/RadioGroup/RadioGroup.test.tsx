import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {RadioGroup} from './RadioGroup'
import {Radio} from '../Radio'
import {FormControl} from '../FormControl'

expect.extend(toHaveNoViolations)

describe('RadioGroup', () => {
  afterEach(cleanup)

  it('renders a radio group correctly into the document', () => {
    const {getByLabelText, getByRole, getByText} = render(
      <RadioGroup>
        <RadioGroup.Label>Choices</RadioGroup.Label>
        <RadioGroup.Caption>You can only pick one</RadioGroup.Caption>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Radio name="demo" value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Radio name="demo" value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Radio name="demo" value="three" />
        </FormControl>

        <RadioGroup.Validation variant="success">Great job!</RadioGroup.Validation>
      </RadioGroup>,
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
      <RadioGroup>
        <RadioGroup.Label>Choices</RadioGroup.Label>
        <RadioGroup.Caption>You can only pick one</RadioGroup.Caption>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Radio name="demo" value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Radio name="demo" value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Radio name="demo" value="three" />
        </FormControl>

        <RadioGroup.Validation variant="success">Great job!</RadioGroup.Validation>
      </RadioGroup>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('includes the caption in the legend for screen readers', () => {
    const {getByRole, getByText} = render(
      <RadioGroup>
        <RadioGroup.Label>Choices</RadioGroup.Label>
        <RadioGroup.Caption>You can only pick one</RadioGroup.Caption>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Radio name="demo" value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Radio name="demo" value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Radio name="demo" value="three" />
        </FormControl>
      </RadioGroup>,
    )

    const fieldset = getByRole('group', {name: 'Choices You can only pick one'})
    const caption = getByText('You can only pick one')
    
    // The caption should be in the legend, not referenced by aria-describedby
    expect(fieldset).not.toHaveAttribute('aria-describedby')
    expect(caption).toBeInTheDocument()
  })

  it('includes the validation in the legend for screen readers', () => {
    const {getByRole, getByText} = render(
      <RadioGroup>
        <RadioGroup.Label>Choices</RadioGroup.Label>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Radio name="demo" value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Radio name="demo" value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Radio name="demo" value="three" />
        </FormControl>

        <RadioGroup.Validation variant="error">Uh oh!</RadioGroup.Validation>
      </RadioGroup>,
    )

    const fieldset = getByRole('group', {name: 'Choices Uh oh!'})
    const validation = getByText('Uh oh!')

    // The validation should be in the legend, not referenced by aria-describedby
    expect(fieldset).not.toHaveAttribute('aria-describedby')
    expect(validation).toBeInTheDocument()
  })

  it('includes both caption and validation in the legend for screen readers', () => {
    const {getByRole, getByText} = render(
      <RadioGroup>
        <RadioGroup.Label>Choices</RadioGroup.Label>
        <RadioGroup.Caption>You can only pick one</RadioGroup.Caption>
        <FormControl>
          <FormControl.Label>Choice one</FormControl.Label>
          <Radio name="demo" value="one" defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice two</FormControl.Label>
          <Radio name="demo" value="two" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Choice three</FormControl.Label>
          <Radio name="demo" value="three" />
        </FormControl>

        <RadioGroup.Validation variant="success">Great job!</RadioGroup.Validation>
      </RadioGroup>,
    )

    const fieldset = getByRole('group', {name: 'Choices You can only pick one Great job!'})
    const hint = getByText('You can only pick one')
    const validation = getByText('Great job!')

    // Both caption and validation should be in the legend, not referenced by aria-describedby
    expect(fieldset).not.toHaveAttribute('aria-describedby')
    expect(hint).toBeInTheDocument()
    expect(validation).toBeInTheDocument()
  })
})
