import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {UnorderedList} from './'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('UnorderedList', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(
      <UnorderedList>
        <UnorderedList.Item>Automatic security and version updates</UnorderedList.Item>
        <UnorderedList.Item>GitHub Security Advisories</UnorderedList.Item>
        <UnorderedList.Item>Code and secret scanning</UnorderedList.Item>
        <UnorderedList.Item>Dependency review</UnorderedList.Item>
        <UnorderedList.Item>Automated authentication and identity management</UnorderedList.Item>
      </UnorderedList>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the correct tag', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <UnorderedList data-testid={mockId}>
        <UnorderedList.Item>Automatic security and version updates</UnorderedList.Item>
      </UnorderedList>
    )
    const el = getByTestId(mockId)
    expect(el.tagName).toBe('UL')
  })

  it('renders the starting svg', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <UnorderedList>
        <UnorderedList.Item data-testid={mockId}>Automatic security and version updates</UnorderedList.Item>
      </UnorderedList>
    )
    const el = getByTestId(mockId)
    expect(el).toContainElement(el.querySelector('svg'))
  })
})
