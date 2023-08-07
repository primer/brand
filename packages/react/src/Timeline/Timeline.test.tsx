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
          <em>Item 1</em>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
        <Timeline.Item>
          <em>Item 2</em>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
        <Timeline.Item>
          <em>Item 3</em>. Lorem ipsum dolor sit amet.
        </Timeline.Item>
      </Timeline>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
