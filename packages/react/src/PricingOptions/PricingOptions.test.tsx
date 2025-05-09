import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {PricingOptions} from './PricingOptions'
import '../test-utils/mocks/match-media-mock'

expect.extend(toHaveNoViolations)

describe('PricingOptions', () => {
  const testId = 'test'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', async () => {
    const expectedClass = 'PricingOptions'

    const {getByTestId} = render(<PricingOptions data-testid={testId}></PricingOptions>)

    const PricingOptionsEl = getByTestId(testId)
    expect(PricingOptionsEl.classList).toContain(expectedClass)
  })

  it('adds the class for cards variant', () => {
    const cardsVariantClass = 'PricingOptions--variant-cards'

    const {getByTestId} = render(<PricingOptions data-testid={testId} variant="cards"></PricingOptions>)

    const PricingOptionsEl = getByTestId(testId)
    expect(PricingOptionsEl.classList).toContain(cardsVariantClass)
  })

  it('applies the correct appearance classes for each variant', () => {
    const solidVariantº = 'PricingOptions--appearance-solid'
    const gradientVariant = 'PricingOptions--appearance-gradient'

    const {getByTestId, rerender} = render(<PricingOptions data-testid={testId} variant="default" />)
    expect(getByTestId(testId).classList).toContain(solidVariantº)

    rerender(<PricingOptions data-testid={testId} variant="cards" />)
    expect(getByTestId(testId).classList).toContain(solidVariantº)

    rerender(<PricingOptions data-testid={testId} variant="default-gradient" />)
    expect(getByTestId(testId).classList).toContain(gradientVariant)

    rerender(<PricingOptions data-testid={testId} variant="cards-gradient" />)
    expect(getByTestId(testId).classList).toContain(gradientVariant)
  })

  it('has no a11y violations', async () => {
    const {container} = render(<PricingOptions />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('PricingOptions.Item', () => {
  const testId = 'test'

  const mockLabel = 'Mock label'
  const mockHeading = 'Mock heading'
  const mockDescription = 'Mock description'
  const mockPrice = 'Mock price'
  const mockPrimaryAction = 'Mock primary action'
  const mockSecondaryAction = 'Mock secondary action'
  const mockFeaturedListTitle = 'Mock featured list title'
  const mockFeaturedListHeading = 'Mock featured list heading'
  const mockFeatureListItem = 'Mock feature list item'
  const mockFootnote = 'Mock footnote'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'PricingOptions__Item'

    const {getByTestId} = render(<PricingOptions.Item data-testid={testId} className={expectedClass} />)

    const PricingOptionsItemEl = getByTestId(testId)
    expect(PricingOptionsItemEl.classList).toContain(expectedClass)
  })

  it('removes children that are not allowed', () => {
    const {getByText} = render(
      <PricingOptions.Item>
        <div>Not allowed</div>
      </PricingOptions.Item>,
    )

    expect(() => getByText('Not allowed')).toThrow()
  })

  it('renders children that are allowed', () => {
    const {getByText} = render(
      <PricingOptions.Item>
        <PricingOptions.Label>{mockLabel}</PricingOptions.Label>
        <PricingOptions.Heading>{mockHeading}</PricingOptions.Heading>
        <PricingOptions.Description>{mockDescription}</PricingOptions.Description>
        <PricingOptions.Price>{mockPrice}</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          {mockPrimaryAction}
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          {mockSecondaryAction}
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>{mockFeaturedListTitle}</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListGroupHeading>{mockFeaturedListHeading}</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>{mockFeatureListItem}</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>{mockFootnote}</PricingOptions.Footnote>
      </PricingOptions.Item>,
    )

    expect(getByText(mockLabel)).toBeInTheDocument()
    expect(getByText(mockHeading)).toBeInTheDocument()
    expect(getByText(mockDescription)).toBeInTheDocument()
    expect(getByText(mockPrice)).toBeInTheDocument()
    expect(getByText(mockPrimaryAction)).toBeInTheDocument()
    expect(getByText(mockSecondaryAction)).toBeInTheDocument()
    expect(getByText(mockFeaturedListTitle)).toBeInTheDocument()
    expect(getByText(mockFeaturedListHeading)).toBeInTheDocument()
    expect(getByText(mockFeatureListItem)).toBeInTheDocument()
    expect(getByText(mockFootnote)).toBeInTheDocument()
  })

  it('renders markup in the expected order', () => {
    const {getByTestId} = render(
      <PricingOptions.Item data-testid={testId}>
        <PricingOptions.Footnote>{mockFootnote}</PricingOptions.Footnote>
        <PricingOptions.Label>{mockLabel}</PricingOptions.Label>
        <PricingOptions.Description>{mockDescription}</PricingOptions.Description>
        <PricingOptions.Heading>{mockHeading}</PricingOptions.Heading>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>{mockFeaturedListHeading}</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>{mockFeatureListItem}</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>,
    )

    const PricingOptionsItemEl = getByTestId(testId)

    const expectedOrder = [
      'PricingOptions__heading',
      'PricingOptions__label',
      'PricingOptions__description',
      'PricingOptions__featureList',
      'PricingOptions__footnote',
    ]

    const elementsWithTestId = PricingOptionsItemEl.querySelectorAll('[data-testid]')

    const testIdsInOrder = Array.from(elementsWithTestId)
      .map(el => el.getAttribute('data-testid'))
      .filter(id => id && expectedOrder.includes(id))

    expect(testIdsInOrder).toEqual(expectedOrder)
  })

  it('renders the PricingOptions.Heading with a h3 by default', () => {
    const {getByRole} = render(
      <PricingOptions.Item>
        <PricingOptions.Heading>Mock heading</PricingOptions.Heading>
      </PricingOptions.Item>,
    )

    expect(getByRole('heading', {level: 3})).toBeInTheDocument()
  })

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
    'optionally renders the PricingOptions.Heading with different levels',
    size => {
      const {getByRole} = render(
        <PricingOptions.Item>
          <PricingOptions.Heading as={size}>Mock heading</PricingOptions.Heading>
        </PricingOptions.Item>,
      )

      const PricingOptionsItemEl = getByRole('heading')
      expect(PricingOptionsItemEl.tagName).toBe(size.toUpperCase())
    },
  )

  it('renders the PricingOptions.FeatureList accordion heading with the correct default level', () => {
    const expectedHeadingTag = 'h4'

    const {getByRole} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>
            Code completions, Chat, and more for indie developers and freelancers.
          </PricingOptions.Description>
          <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListGroupHeading>Chat</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem>
              Unlimited messages, interactions, and history
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )
    const PricingOptionsItemEl = getByRole('heading', {name: "What's included"})
    expect(PricingOptionsItemEl.tagName).toBe(expectedHeadingTag.toUpperCase())
  })

  it('renders the PricingOptions.FeatureList accordion heading with an alternative level', () => {
    const expectedHeadingTag = 'h6'

    const {getByRole} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
          <PricingOptions.Description>
            Code completions, Chat, and more for indie developers and freelancers.
          </PricingOptions.Description>
          <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
          <PricingOptions.FeatureList accordionAs={expectedHeadingTag}>
            <PricingOptions.FeatureListGroupHeading>Chat</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem>
              Unlimited messages, interactions, and history
            </PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )
    const PricingOptionsItemEl = getByRole('heading', {name: "What's included"})
    expect(PricingOptionsItemEl.tagName).toBe(expectedHeadingTag.toUpperCase())
  })
})
