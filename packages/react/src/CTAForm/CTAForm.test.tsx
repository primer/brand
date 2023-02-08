import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {CTAForm} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('CTAForm', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(<CTAForm></CTAForm>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('allows and passes expected attributes to the form component', async () => {
    const expectedAction = 'https://www.github.com'
    const expectedMethod = 'POST'
    const expectedTarget = '_blank'
    const mockTestId = 'test'
    const expectedClass = 'test'

    const {getByTestId} = render(
      <CTAForm
        id={mockTestId}
        className={expectedClass}
        action={expectedAction}
        method={expectedMethod}
        target={expectedTarget}
      ></CTAForm>
    )
    const ctaFormEl = getByTestId(mockTestId)
    expect(ctaFormEl.attributes.getNamedItem('action')).toBe(expectedAction)
    expect(ctaFormEl.attributes.getNamedItem('method')).toBe(expectedMethod)
    expect(ctaFormEl.attributes.getNamedItem('target')).toBe(expectedTarget)
    expect(ctaFormEl.classList).toContain(expectedClass)
  })

  it('submits the form correctly', () => {
    // TODO: How do we test this?
  })
})

describe('CTAForm.Input', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(<CTAForm.Input></CTAForm.Input>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('allows and passes expected attributes to the form component', async () => {
    const mockTestId = 'test'
    const expectedClass = 'test'

    const {getByTestId} = render(<CTAForm.Input id={mockTestId} className={expectedClass}></CTAForm.Input>)
    const ctaFormEl = getByTestId(mockTestId)
    expect(ctaFormEl.classList).toContain(expectedClass)
  })
})

describe('CTAForm.Confirm', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(<CTAForm.Confirm></CTAForm.Confirm>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('allows and passes expected attributes to the form component', async () => {
    const mockTestId = 'test'
    const expectedClass = 'test'

    const {getByTestId} = render(<CTAForm.Confirm id={mockTestId} className={expectedClass}></CTAForm.Confirm>)
    const ctaFormEl = getByTestId(mockTestId)
    expect(ctaFormEl.classList).toContain(expectedClass)
  })
})

describe('CTAForm.Action', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(<CTAForm.Action></CTAForm.Action>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('allows and passes expected attributes to the form component', async () => {
    const mockTestId = 'test'
    const expectedClass = 'test'

    const {getByTestId} = render(<CTAForm.Action id={mockTestId} className={expectedClass}></CTAForm.Action>)
    const ctaFormEl = getByTestId(mockTestId)
    expect(ctaFormEl.classList).toContain(expectedClass)
    expect(ctaFormEl.attributes.getNamedItem('type')).toBe('submit')
  })
})
