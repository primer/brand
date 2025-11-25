import React, {cleanup, fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {FAQ} from './FAQ'

expect.extend(toHaveNoViolations)

describe('FAQ', () => {
  const questionRoot = 'question-root'

  const mockHeading = 'This is a mock heading'
  const mockQuestion = 'What is a mock question?'
  const mockFAQAnswer = 'mock answer'

  afterEach(cleanup)

  it('renders into the document', () => {
    const {getByText, getByRole} = render(
      <FAQ>
        <FAQ.Heading>{mockHeading}</FAQ.Heading>
        <FAQ.Item>
          <FAQ.Question>{mockQuestion}</FAQ.Question>
          <FAQ.Answer>
            <p>{mockFAQAnswer}</p>
          </FAQ.Answer>
        </FAQ.Item>
      </FAQ>,
    )
    const headingEl = getByRole('heading', {level: 3, name: mockHeading})
    const questionEl = getByRole('heading', {level: 4, name: mockQuestion})
    const answerEl = getByText(mockFAQAnswer)

    expect(headingEl).toBeInTheDocument()
    expect(questionEl).toBeInTheDocument()
    expect(answerEl).toBeInTheDocument()
  })

  it('renders items provided within fragments', () => {
    const {getByText} = render(
      <FAQ>
        <FAQ.Heading>{mockHeading}</FAQ.Heading>
        <>
          <FAQ.Item>
            <FAQ.Question>{mockQuestion}</FAQ.Question>
            <FAQ.Answer>
              <p>{mockFAQAnswer}</p>
            </FAQ.Answer>
          </FAQ.Item>
        </>
      </FAQ>,
    )

    expect(getByText(mockQuestion)).toBeInTheDocument()
    expect(getByText(mockFAQAnswer)).not.toBeVisible()
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <FAQ>
        <FAQ.Heading>{mockHeading}</FAQ.Heading>
        <FAQ.Item>
          <FAQ.Question>{mockQuestion}</FAQ.Question>
          <FAQ.Answer>
            <p>{mockFAQAnswer}</p>
          </FAQ.Answer>
        </FAQ.Item>
      </FAQ>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('hides answers by default', () => {
    const {getByText} = render(
      <FAQ>
        <FAQ.Heading>{mockHeading}</FAQ.Heading>
        <FAQ.Item>
          <FAQ.Question>{mockQuestion}</FAQ.Question>
          <FAQ.Answer>
            <p>{mockFAQAnswer}</p>
          </FAQ.Answer>
        </FAQ.Item>
      </FAQ>,
    )
    const answerEl = getByText(mockFAQAnswer)

    expect(answerEl).not.toBeVisible()
  })

  it('can optionally show answer immediately using the open prop', () => {
    const {getByText} = render(
      <FAQ>
        <FAQ.Heading>{mockHeading}</FAQ.Heading>
        <FAQ.Item open data-testid={questionRoot}>
          <FAQ.Question>{mockQuestion}</FAQ.Question>
          <FAQ.Answer>
            <p>{mockFAQAnswer}</p>
          </FAQ.Answer>
        </FAQ.Item>
      </FAQ>,
    )
    const answerEl = getByText(mockFAQAnswer)

    expect(answerEl).toBeVisible()
  })

  it('shows answer by after clicking on the corresponding question', () => {
    const {getByText, getByTestId} = render(
      <FAQ>
        <FAQ.Heading>{mockHeading}</FAQ.Heading>
        <FAQ.Item data-testid={questionRoot}>
          <FAQ.Question>{mockQuestion}</FAQ.Question>
          <FAQ.Answer>
            <p>{mockFAQAnswer}</p>
          </FAQ.Answer>
        </FAQ.Item>
      </FAQ>,
    )

    const questionEl = getByText(mockQuestion)
    const answerEl = getByText(mockFAQAnswer)
    const questionRootEl = getByTestId(questionRoot)

    // hidden answer by default
    expect(answerEl).not.toBeVisible()

    // press question
    fireEvent.click(questionEl)

    // visible answer
    expect(answerEl).toBeVisible()
    expect(answerEl).toBeVisible()
    expect(questionRootEl).toHaveAttribute('open')
  })

  it('restricts children of the parent component using an allowlist', () => {
    const invalidChild = <div>This is an invalid child</div>
    const {queryByText} = render(
      <FAQ>
        <FAQ.Heading>{mockHeading}</FAQ.Heading>
        <FAQ.Item>
          <FAQ.Question>{mockQuestion}</FAQ.Question>
          <FAQ.Answer>
            <p>{mockFAQAnswer}</p>
          </FAQ.Answer>
        </FAQ.Item>
        {invalidChild}
      </FAQ>,
    )

    const invalidChildEl = queryByText(questionRoot)

    expect(invalidChildEl).not.toBeInTheDocument()
  })

  it('can render groups of FAQs using an optional sub-heading', () => {
    const mockSubheading = 'this is a mock subheading'
    const invalidChild = <div>This is an invalid child</div>
    const {getByRole} = render(
      <FAQ>
        <FAQ.Heading>{mockHeading}</FAQ.Heading>
        <FAQ.Subheading>{mockSubheading}</FAQ.Subheading>
        <FAQ.Item>
          <FAQ.Question>{mockQuestion}</FAQ.Question>
          <FAQ.Answer>
            <p>{mockFAQAnswer}</p>
          </FAQ.Answer>
        </FAQ.Item>
        {invalidChild}
      </FAQ>,
    )

    const subheadingEl = getByRole('heading', {level: 3, name: mockSubheading})

    expect(subheadingEl).toBeInTheDocument()
  })

  it('renders alternative headling levels', () => {
    const mockSubheading = 'this is a mock subheading'
    const {getByRole} = render(
      <FAQ>
        <FAQ.Heading as="h3">{mockHeading}</FAQ.Heading>
        <FAQ.Subheading as="h4">{mockSubheading}</FAQ.Subheading>
        <FAQ.Item>
          <FAQ.Question as="h5">{mockQuestion}</FAQ.Question>
          <FAQ.Answer>
            <p>{mockFAQAnswer}</p>
          </FAQ.Answer>
        </FAQ.Item>
      </FAQ>,
    )

    const mainheadingEl = getByRole('heading', {level: 3, name: mockHeading})
    const subheadingEl = getByRole('heading', {level: 4, name: mockSubheading})
    const questionheadingEl = getByRole('heading', {level: 5, name: mockQuestion})

    expect(mainheadingEl).toBeInTheDocument()
    expect(subheadingEl).toBeInTheDocument()
    expect(questionheadingEl).toBeInTheDocument()
  })
})
