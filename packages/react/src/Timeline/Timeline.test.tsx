import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Timeline} from './Timeline'

expect.extend(toHaveNoViolations)

describe('Timeline', () => {
  afterEach(cleanup)

  it('has no a11y violations on initial render', async () => {
    const {container} = render(
      <Timeline>
        <Timeline.Item>
          <span>Item 1</span>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
        <Timeline.Item>
          <span>Item 2</span>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
        <Timeline.Item>
          <span>Item 3</span>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
      </Timeline>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
  it('renders the default color as muted if <span> or <em> is passed as a child', () => {
    const {getAllByRole} = render(
      <Timeline>
        <Timeline.Item>
          <span>Item 1</span>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
        <Timeline.Item>
          <em>Item 1</em>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
      </Timeline>,
    )
    const itemTextEls = getAllByRole('listitem')

    for (const itemTextEl of itemTextEls) {
      expect(itemTextEl.firstChild).toHaveClass(`Text--muted`)
    }
  })

  it('renders the default color as text-default if a non-<span> or non-<em> child is passed', () => {
    const {getByRole} = render(
      <Timeline>
        <Timeline.Item>
          <strong>Item 1</strong>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
      </Timeline>,
    )
    const itemTextEl = getByRole('listitem').firstChild

    expect(itemTextEl).not.toHaveClass(`Text--muted`)
  })
})
