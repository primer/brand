import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {PricingCards} from './PricingCards'
import '../test-utils/mocks/match-media-mock'

expect.extend(toHaveNoViolations)

describe('PricingCards', () => {
  const testId = 'test'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', async () => {
    const expectedClass = 'PricingCards'

    const {getByTestId} = render(<PricingCards data-testid={testId}></PricingCards>)

    const PricingCardsEl = getByTestId(testId)
    expect(PricingCardsEl.classList).toContain(expectedClass)
  })

  it('adds the class for cards presentation', () => {
    const cardsPresentationClass = 'PricingCards--presentation-cards'

    const {getByTestId} = render(<PricingCards data-testid={testId} presentation="cards"></PricingCards>)

    const PricingCardsEl = getByTestId(testId)
    expect(PricingCardsEl.classList).toContain(cardsPresentationClass)
  })

  it('has no a11y violations', async () => {
    const {container} = render(<PricingCards />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('PricingCards.Item', () => {
  const testId = 'test'

  const mockLabel = 'Mock label'
  const mockHeading = 'Mock heading'
  const mockDescription = 'Mock description'
  const mockPrice = 'Mock price'
  const mockPrimaryAction = 'Mock primary action'
  const mockSecondaryAction = 'Mock secondary action'
  const mockFeaturedListHeading = 'Mock featured list heading'
  const mockFeatureListItem = 'Mock feature list item'
  const mockFootnote = 'Mock footnote'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'PricingCards__Item'

    const {getByTestId} = render(<PricingCards.Item data-testid={testId} className={expectedClass} />)

    const PricingCardsItemEl = getByTestId(testId)
    expect(PricingCardsItemEl.classList).toContain(expectedClass)
  })

  it('removes children that are not allowed', () => {
    const {getByText} = render(
      <PricingCards.Item>
        <div>Not allowed</div>
      </PricingCards.Item>,
    )

    expect(() => getByText('Not allowed')).toThrow()
  })

  it('renders children that are allowed', () => {
    const {getByText} = render(
      <PricingCards.Item>
        <PricingCards.Label>{mockLabel}</PricingCards.Label>
        <PricingCards.Heading>{mockHeading}</PricingCards.Heading>
        <PricingCards.Description>{mockDescription}</PricingCards.Description>
        <PricingCards.Price>{mockPrice}</PricingCards.Price>
        <PricingCards.PrimaryAction href="#">{mockPrimaryAction}</PricingCards.PrimaryAction>
        <PricingCards.SecondaryAction href="#">{mockSecondaryAction}</PricingCards.SecondaryAction>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListHeading>{mockFeaturedListHeading}</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>{mockFeatureListItem}</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
        <PricingCards.Footnote>{mockFootnote}</PricingCards.Footnote>
      </PricingCards.Item>,
    )

    expect(getByText(mockLabel)).toBeInTheDocument()
    expect(getByText(mockHeading)).toBeInTheDocument()
    expect(getByText(mockDescription)).toBeInTheDocument()
    expect(getByText(mockPrice)).toBeInTheDocument()
    expect(getByText(mockPrimaryAction)).toBeInTheDocument()
    expect(getByText(mockSecondaryAction)).toBeInTheDocument()
    expect(getByText(mockFeaturedListHeading)).toBeInTheDocument()
    expect(getByText(mockFeatureListItem)).toBeInTheDocument()
    expect(getByText(mockFootnote)).toBeInTheDocument()
  })
})
