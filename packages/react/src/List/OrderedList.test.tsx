import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {OrderedList} from './'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('UnorderedList', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(
      <OrderedList>
        <li>Automatic security and version updates</li>
        <li>GitHub Security Advisories</li>
        <li>Code and secret scanning</li>
        <li>Dependency review</li>
        <li>Automated authentication and identity management</li>
      </OrderedList>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
