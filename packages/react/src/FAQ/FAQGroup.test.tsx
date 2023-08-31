import React, {cleanup, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {FAQ, FAQGroup} from './'

expect.extend(toHaveNoViolations)

describe('FAQGroup', () => {
  const testData = [
    {
      heading: 'mock heading 1',
      faqs: [
        {
          question: 'mock question 1',
          answer: 'mock answer 1',
        },
        {
          question: 'mock question 2',
          answer: 'mock answer 2',
        },
        {
          question: 'mock question 3',
          answer: 'mock answer 3',
        },
      ],
    },
    {
      heading: 'mock heading 2',
      faqs: [
        {
          question: 'mock question 4',
          answer: 'mock answer 4',
        },
        {
          question: 'mock question 5',
          answer: 'mock answer 5',
        },
        {
          question: 'mock question 6',
          answer: 'mock answer 6',
        },
      ],
    },
  ]

  const Component = () => (
    <FAQGroup data-testid="root">
      <FAQGroup.Heading>Frequently asked questions</FAQGroup.Heading>
      {testData.map((group, index) => (
        <FAQ key={index}>
          <FAQ.Heading>{group.heading}</FAQ.Heading>
          {group.faqs.map((faq, childIndex) => (
            <FAQ.Item key={childIndex} data-testid={`item-${index}-${childIndex}`}>
              <FAQ.Question>{faq.question}</FAQ.Question>
              <FAQ.Answer>
                <p>{faq.answer}</p>
              </FAQ.Answer>
            </FAQ.Item>
          ))}
        </FAQ>
      ))}
    </FAQGroup>
  )

  afterEach(cleanup)

  it('renders groups of FAQS into the document, showing the first group only', () => {
    const {getByTestId, getAllByText, getByText} = render(<Component />)

    const rootEl = getByTestId('root')
    const mainHeading = getByText('Frequently asked questions')

    const [, headingAsTab, headingAsSubHead] = getAllByText('mock heading 1')

    expect(rootEl).toBeInTheDocument()
    expect(mainHeading).toBeInTheDocument()
    expect(headingAsTab).toBeInTheDocument()
    expect(headingAsSubHead).toBeInTheDocument()
  })

  it('selects the first tab by default', () => {
    const {getByTestId} = render(<Component />)

    const buttonOneEl = getByTestId('FAQGroup-tab-1')
    const panelOne = getByTestId('FAQGroup-tab-panel-1')
    const panelTwo = getByTestId('FAQGroup-tab-panel-2')

    expect(buttonOneEl).toBeInTheDocument()
    expect(buttonOneEl).toHaveAttribute('aria-selected', 'true')
    expect(panelOne).toBeVisible()
    expect(panelTwo).not.toBeVisible()
  })

  it('selects the first tab by default', async () => {
    const {getByTestId} = render(<Component />)

    const buttonOneEl = getByTestId('FAQGroup-tab-1')
    const buttonTwoEl = getByTestId('FAQGroup-tab-2')
    const panelOne = getByTestId('FAQGroup-tab-panel-1')
    const panelTwo = getByTestId('FAQGroup-tab-panel-2')

    await userEvent.click(buttonTwoEl)

    expect(buttonOneEl).toHaveAttribute('aria-selected', 'false')
    expect(buttonTwoEl).toHaveAttribute('aria-selected', 'true')
    expect(panelTwo).toBeVisible()
    expect(panelOne).not.toBeVisible()
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Component />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
