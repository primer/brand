import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {ButtonGroup} from './ButtonGroup'
import {Button} from '../Button'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('ButtonGroup', () => {
  afterEach(cleanup)

  it('renders correctly into the document', () => {
    const expectedClass = 'ButtonGroup'
    const expectedTag = 'section'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <ButtonGroup data-testid={mockTestId}>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )
    const buttonGroupEl = getByTestId(mockTestId)
    expect(buttonGroupEl.tagName).toBe(expectedTag.toUpperCase())
    expect(buttonGroupEl.classList).toContain(expectedClass)
  })

  it('renders buttons with the correct element type when buttonAs is set', () => {
    const expectedTag = 'a'

    const {getAllByRole} = render(
      <ButtonGroup buttonsAs={expectedTag}>
        <Button href="#">Primary Action</Button>
        <Button href="#">Secondary Action</Button>
      </ButtonGroup>,
    )
    const buttonEl = getAllByRole('link')[0]
    expect(buttonEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders buttons with the correct size class when buttonSize is set', () => {
    const expectedClass = 'Button--size-large'

    const {getAllByRole} = render(
      <ButtonGroup buttonSize={'large'}>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )
    const buttonEl = getAllByRole('button')[0]
    expect(buttonEl.classList).toContain(expectedClass)
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
