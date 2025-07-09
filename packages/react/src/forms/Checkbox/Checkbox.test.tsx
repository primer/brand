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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const {getByRole} = render(<Checkbox value="test" ref={() => {}} />)

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    const user = userEvent.setup()
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
})
