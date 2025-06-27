import React, {cleanup, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {FAQ, FAQGroup, type FAQGroupProps} from './'

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
    {
      heading: 'mock heading 3',
      faqs: [
        {
          question: 'mock question 7',
          answer: 'mock answer 7',
        },
        {
          question: 'mock question 8',
          answer: 'mock answer 8',
        },
        {
          question: 'mock question 9',
          answer: 'mock answer 9',
        },
      ],
    },
  ]

  const Component = (props: FAQGroupProps) => (
    <FAQGroup data-testid="root" {...props}>
      <FAQGroup.Heading>Frequently asked questions</FAQGroup.Heading>
      {testData.map((group, index) => (
        <FAQ key={index}>
          <FAQ.Heading>{group.heading}</FAQ.Heading>
          {group.faqs.map((faq, childIndex) => (
            <FAQ.Item key={childIndex}>
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

  it('has no a11y violations', async () => {
    const {container} = render(<Component />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('selects the first tab by default', () => {
    const {getByRole, queryByRole} = render(<Component />)

    expect(getByRole('tab', {name: 'mock heading 1'})).toHaveAttribute('aria-selected', 'true')
    expect(getByRole('tab', {name: 'mock heading 2'})).toHaveAttribute('aria-selected', 'false')
    expect(getByRole('tab', {name: 'mock heading 3'})).toHaveAttribute('aria-selected', 'false')

    expect(getByRole('tabpanel', {name: 'mock heading 1'})).toBeVisible()
    expect(queryByRole('tabpanel', {name: 'mock heading 2'})).not.toBeInTheDocument()
    expect(queryByRole('tabpanel', {name: 'mock heading 3'})).not.toBeInTheDocument()
  })

  it('changes selected tab on ArrowUp and ArrowDown key presses', async () => {
    const {getByRole, queryByRole} = render(<Component />)

    const headings = ['mock heading 1', 'mock heading 2', 'mock heading 3']
    const assertSelectedTabIndex = (selectedTabIndex: number) => {
      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i]

        if (i === selectedTabIndex) {
          expect(getByRole('tab', {name: heading})).toHaveAttribute('aria-selected', 'true')
          expect(getByRole('tabpanel', {name: heading})).toBeVisible()
        } else {
          expect(getByRole('tab', {name: heading})).toHaveAttribute('aria-selected', 'false')
          expect(queryByRole('tabpanel', {name: heading})).not.toBeInTheDocument()
        }
      }
    }

    assertSelectedTabIndex(0)

    await userEvent.type(getByRole('tab', {name: 'mock heading 1'}), '{arrowdown}')
    assertSelectedTabIndex(1)

    await userEvent.type(getByRole('tab', {name: 'mock heading 2'}), '{arrowdown}')
    assertSelectedTabIndex(2)

    await userEvent.type(getByRole('tab', {name: 'mock heading 3'}), '{arrowup}')
    assertSelectedTabIndex(1)

    await userEvent.type(getByRole('tab', {name: 'mock heading 2'}), '{arrowup}')
    assertSelectedTabIndex(0)

    await userEvent.type(getByRole('tab', {name: 'mock heading 1'}), '{arrowup}')
    assertSelectedTabIndex(2)
  })

  it('calls `tabAttributes` with the correct arguments', () => {
    const mockTabAttributes = jest.fn((_, i) => ({
      'data-tab-index': i,
    }))

    render(<Component tabAttributes={mockTabAttributes} />)
    const mockCalls = mockTabAttributes.mock.calls

    expect(mockTabAttributes).toHaveBeenCalledTimes(3)
    expect(mockCalls[0]).toEqual(['mock heading 1', 0])
    expect(mockCalls[1]).toEqual(['mock heading 2', 1])
    expect(mockCalls[2]).toEqual(['mock heading 3', 2])
  })

  it('adds props to the tabs when `tabAttributes` is provided', () => {
    const mockTabAttributes = jest.fn(children => ({
      'data-tab-heading': children,
    }))

    const {getByRole} = render(<Component tabAttributes={mockTabAttributes} />)

    expect(getByRole('tab', {name: 'mock heading 1'})).toHaveAttribute('data-tab-heading', 'mock heading 1')
    expect(getByRole('tab', {name: 'mock heading 2'})).toHaveAttribute('data-tab-heading', 'mock heading 2')
    expect(getByRole('tab', {name: 'mock heading 3'})).toHaveAttribute('data-tab-heading', 'mock heading 3')
  })

  it('renders the FAQGroup.Heading as a h3, the FAQ.Heading as a h4, and the question as a h5', () => {
    const {getByRole, getAllByRole} = render(<Component />)

    const faqGroupHeading = getByRole('heading', {level: 3, name: 'Frequently asked questions'})
    const questionHeading = getByRole('heading', {level: 5, name: 'mock question 1'})

    expect(faqGroupHeading).toBeInTheDocument()
    expect(questionHeading).toBeInTheDocument()

    /**
     * We use getAllByRole here as we render two h4 elements with the same text content and hide one with media queries.
     * Since our test suite doesn't render styles, Testing Library finds both of them, so we check both even though one is hidden.
     */
    const faqHeadings = getAllByRole('heading', {level: 4, name: 'mock heading 1'})
    for (const faqHeading of faqHeadings) {
      expect(faqHeading).toBeInTheDocument()
    }
  })

  it('does not throw an error if an FAQGroup contains an FAQ which contains a fragment wrapping a falsey value', () => {
    const {getByTestId} = render(
      <FAQGroup data-testid="root">
        <FAQGroup.Heading>Frequently asked questions</FAQGroup.Heading>
        {testData.map((group, index) => (
          <FAQ key={index}>
            <FAQ.Heading>{group.heading}</FAQ.Heading>
            <>
              {false}
              {group.faqs.map((faq, childIndex) => (
                <FAQ.Item key={childIndex}>
                  <FAQ.Question>{faq.question}</FAQ.Question>
                  <FAQ.Answer>
                    <p>{faq.answer}</p>
                  </FAQ.Answer>
                </FAQ.Item>
              ))}
            </>
          </FAQ>
        ))}
      </FAQGroup>,
    )

    expect(getByTestId('root')).toBeInTheDocument()
  })
})
