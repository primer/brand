import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {PricingCards} from './PricingCards'
import '../test-utils/mocks/match-media-mock'

expect.extend(toHaveNoViolations)

describe('PricingCards', () => {
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

  it('renders the default pricing cards', async () => {
    const {getByText, container} = render(
      <PricingCards>
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
        </PricingCards.Item>
      </PricingCards>,
    )

    expect(getByText(mockHeading)).toBeInTheDocument()
    expect(getByText(mockDescription)).toBeInTheDocument()
    expect(getByText(mockPrice)).toBeInTheDocument()
    expect(getByText(mockPrimaryAction)).toBeInTheDocument()
    expect(getByText(mockSecondaryAction)).toBeInTheDocument()
    expect(getByText(mockFeaturedListHeading)).toBeInTheDocument()
    expect(getByText(mockFeatureListItem)).toBeInTheDocument()
    expect(getByText(mockFootnote)).toBeInTheDocument()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
