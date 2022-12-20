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

  it('renders the correct tag', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <OrderedList data-testid={mockId}>
        <ListItem>Automatic security and version updates</ListItem>
      </OrderedList>
    )
    const el = getByTestId(mockId)
    expect(el.tagName).toBe('OL')
  })

  it('does not render a starting svg', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <OrderedList>
        <ListItem data-testid={mockId}>Automatic security and version updates</ListItem>
      </OrderedList>
    )
    const el = getByTestId(mockId)
    expect(el).not.toContainElement(el.querySelector('svg'))
  })
})
