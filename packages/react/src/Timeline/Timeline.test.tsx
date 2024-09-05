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
          <b>Item 1</b>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
        <Timeline.Item>
          <base>Item 2</base>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
        <Timeline.Item>
          <b>Item 3</b>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
      </Timeline>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
  it('renders the default color as muted if <b> or <em> is passed as a child', () => {
    const {getAllByRole} = render(
      <Timeline>
        <Timeline.Item>
          <b>Item 1</b>. Lorem ipsum dolor sit amet.
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

  it('renders the default color as text-default if a non-<b> or non-<em> child is passed', () => {
    const {getByRole} = render(
      <Timeline>
        <Timeline.Item>
          <span>Item 1</span>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
      </Timeline>,
    )
    const itemTextEl = getByRole('listitem').firstChild

    expect(itemTextEl).not.toHaveClass(`Text--muted`)
  })
})
