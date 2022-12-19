import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {OrderedList, ListItem} from './'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('UnorderedList', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(
      <OrderedList>
        <ListItem>Automatic security and version updates</ListItem>
        <ListItem>GitHub Security Advisories</ListItem>
        <ListItem>Code and secret scanning</ListItem>
        <ListItem>Dependency review</ListItem>
        <ListItem>Automated authentication and identity management</ListItem>
      </OrderedList>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
