import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Bento} from './Bento'
import {Heading, Text, Link} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Bento', () => {
  const testId = 'test'
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'Bento'

    const {getByTestId} = render(<Bento data-testid={testId} className={expectedClass} />)

    const BentoEl = getByTestId(testId)
    expect(BentoEl.classList).toContain(expectedClass)
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Bento />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('Bento.Item', () => {
  const testId = 'test'
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'Bento.Item'

    const {getByTestId} = render(<Bento.Item data-testid={testId} className={expectedClass} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(expectedClass)
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Bento.Item />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('Bento.Content', () => {
  const testId = 'test'
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'Bento.Content'

    const {getByTestId} = render(<Bento.Content data-testid={testId} className={expectedClass} />)

    const BentoContentEl = getByTestId(testId)
    expect(BentoContentEl.classList).toContain(expectedClass)
  })

  it('removes children that are not allowed', () => {
    const {getByText} = render(
      <Bento.Content>
        <div>Not allowed</div>
      </Bento.Content>,
    )

    expect(() => getByText('Not allowed')).toThrow()
  })

  it('renders children that are allowed', () => {
    const headingText = 'Allowed'
    const textText = 'Allowed 2'
    const linkText = 'Allowed 3'
    const {getByText} = render(
      <Bento.Content>
        <Heading>{headingText}</Heading>
        <Text>{textText}</Text>
        <Link href="#">{linkText}</Link>
      </Bento.Content>,
    )

    expect(getByText(headingText)).toBeInTheDocument()
    expect(getByText(textText)).toBeInTheDocument()
    expect(getByText(linkText)).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Bento.Content />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
