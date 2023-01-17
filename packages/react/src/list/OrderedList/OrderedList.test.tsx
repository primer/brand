import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {OrderedList} from '.'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('UnorderedList', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(
      <OrderedList>
        <OrderedList.Item>Automatic security and version updates</OrderedList.Item>
        <OrderedList.Item>GitHub Security Advisories</OrderedList.Item>
        <OrderedList.Item>Code and secret scanning</OrderedList.Item>
        <OrderedList.Item>Dependency review</OrderedList.Item>
        <OrderedList.Item>Automated authentication and identity management</OrderedList.Item>
      </OrderedList>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the correct tag', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <OrderedList data-testid={mockId}>
        <OrderedList.Item>Automatic security and version updates</OrderedList.Item>
      </OrderedList>
    )
    const el = getByTestId(mockId)
    expect(el.tagName).toBe('OL')
  })

  it('does not render a starting svg', () => {
    const mockId = 'mock-id'
    const {getByTestId} = render(
      <OrderedList>
        <OrderedList.Item data-testid={mockId}>Automatic security and version updates</OrderedList.Item>
      </OrderedList>
    )
    const el = getByTestId(mockId)
    expect(el).not.toContainElement(el.querySelector('svg'))
  })
})
