import React, {render, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {toHaveNoViolations} from 'jest-axe'

import {Checkbox} from '../Checkbox'
import {FormControl} from '../FormControl'

expect.extend(toHaveNoViolations)

describe('Checkbox', () => {
  afterEach(cleanup)

  it('renders a checkbox correctly into the document', () => {
    const {getByRole} = render(
      <FormControl>
        <FormControl.Label>Opt in</FormControl.Label>
        <Checkbox value="one" defaultChecked />
      </FormControl>,
    )

    expect(getByRole('checkbox', {name: 'Opt in'})).toBeInTheDocument()
  })

  it('toggles the checkbox when clicked', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <FormControl>
        <FormControl.Label>Opt in</FormControl.Label>
        <Checkbox value="one" defaultChecked />
      </FormControl>,
    )

    const checkbox = getByRole('checkbox', {name: 'Opt in'})

    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('toggles the checkbox when the associated span is clicked', async () => {
    const user = userEvent.setup()

    const {getByRole, container} = render(
      <FormControl>
        <FormControl.Label>Opt in</FormControl.Label>
        <Checkbox value="one" defaultChecked />
      </FormControl>,
    )

    const checkbox = getByRole('checkbox', {name: 'Opt in'})

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

    const {getByRole, container} = render(
      <FormControl>
        <FormControl.Label>Opt in</FormControl.Label>
        <Checkbox value="one" defaultChecked ref={mockRef} />
      </FormControl>,
    )

    const checkbox = getByRole('checkbox', {name: 'Opt in'})
    expect(mockRef).toHaveBeenCalledWith(checkbox)

    const span = container.querySelector('span.Checkbox') as HTMLSpanElement
    expect(span).toBeInTheDocument()

    expect(checkbox).toBeChecked()

    await user.click(span)
    expect(checkbox).not.toBeChecked()

    await user.click(span)
    expect(checkbox).toBeChecked()
  })
})
