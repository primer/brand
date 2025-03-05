import React, {render} from '@testing-library/react'
import '@testing-library/jest-dom'

import {RiverAccordion} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('RiverAccordion', () => {
  it('has no a11y violations', async () => {
    const {container} = render(<RiverAccordion />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it.todo('write tests')
})
