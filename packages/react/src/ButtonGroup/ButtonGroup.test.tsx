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
      </ButtonGroup>
    )
    const buttonGroupEl = getByTestId(mockTestId)
    expect(buttonGroupEl.tagName).toBe(expectedTag.toUpperCase())
    expect(buttonGroupEl.classList).toContain(expectedClass)
  })

  it('renders buttons with the correct element type when buttonAs is set', () => {
    const expectedTag = 'a'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <ButtonGroup buttonsAs={expectedTag}>
        <Button data-testid={mockTestId}>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>
    )
    const buttonEl = getByTestId(mockTestId)
    expect(buttonEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders buttons with the correct size class when buttonSize is set', () => {
    const expectedClass = 'Button--size-large'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <ButtonGroup buttonSize={'large'}>
        <Button data-testid={mockTestId}>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>
    )
    const buttonEl = getByTestId(mockTestId)
    expect(buttonEl.classList).toContain(expectedClass)
  })

  it('has no axe violations', async () => {
    const {container} = render(
      <ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </ButtonGroup>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
