import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Image} from './'

expect.extend(toHaveNoViolations)

describe('Image', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(<Image src="https://source.unsplash.com/random" alt="" />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
