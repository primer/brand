import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Button} from './Button'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  const disabledClass = 'Button--disabled'

  afterEach(cleanup)

  it('renders correctly into the document', () => {
    const {getByRole} = render(
      <Button variant="primary" size="medium">
        Primary Button
      </Button>
    )
    const btnEl = getByRole('button')

    expect(btnEl).toBeInTheDocument()
  })

  it('no a11y violations', async () => {
    const {container} = render(
      <Button variant="primary" size="medium">
        Primary Button
      </Button>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders disabled state', async () => {
    const {getByRole} = render(
      <Button variant="primary" size="medium" disabled>
        Primary Button
      </Button>
    )
    const btnEl = getByRole('button')

    expect(btnEl).toHaveAttribute('disabled')
    expect(btnEl.classList).toContain(disabledClass)
  })

  it('renders aria-disabled state', async () => {
    const {getByRole} = render(
      <Button variant="primary" size="medium" aria-disabled="true">
        Primary Button
      </Button>
    )
    const btnEl = getByRole('button')

    expect(btnEl).toHaveAttribute('aria-disabled')
    expect(btnEl.classList).toContain(disabledClass)
  })

  it('triggers focus event if not disabled and aria-disabled equals false', async () => {
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation()

    const {getByRole} = render(
      <Button variant="primary" size="medium" aria-disabled="false" onFocus={() => console.log('Focused')}>
        Primary Button
      </Button>
    )
    const btnEl = getByRole('button')
    btnEl.focus()

    expect(consoleSpy).toHaveBeenCalled()
  })

  it('does not trigger focus event if disabled', async () => {
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation()

    const {getByRole} = render(
      <Button variant="primary" size="medium" disabled onFocus={() => console.log('Focused')}>
        Primary Button
      </Button>
    )
    const btnEl = getByRole('button')
    btnEl.focus()

    expect(consoleSpy).toHaveBeenCalled()
  })

  it('does not trigger event if aria-disabled', async () => {
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation()

    const {getByRole} = render(
      <Button variant="primary" size="medium" aria-disabled="true" onFocus={() => console.log('Focused')}>
        Primary Button
      </Button>
    )
    const btnEl = getByRole('button')
    btnEl.focus()

    expect(consoleSpy).toHaveBeenCalled()
  })
})
