import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {UnorderedList, ListItem} from './'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('UnorderedList', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(
      <UnorderedList>
        <ListItem>Automatic security and version updates</ListItem>
        <ListItem>GitHub Security Advisories</ListItem>
        <ListItem>Code and secret scanning</ListItem>
        <ListItem>Dependency review</ListItem>
        <ListItem>Automated authentication and identity management</ListItem>
      </UnorderedList>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the correct tag', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <UnorderedList data-testid={mockId}>
        <ListItem>Automatic security and version updates</ListItem>
      </UnorderedList>
    )
    const el = getByTestId(mockId)
    expect(el.tagName).toBe('UL')
  })

  it('renders the starting svg', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <UnorderedList>
        <ListItem data-testid={mockId}>Automatic security and version updates</ListItem>
      </UnorderedList>
    )
    const el = getByTestId(mockId)
    expect(el).toContainElement(el.querySelector('svg'))
  })
})
