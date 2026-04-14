import React from 'react'
import {render, cleanup} from '@testing-library/react'

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import {axe, toHaveNoViolations} from 'jest-axe'

import {PricingOptions} from './PricingOptions'
import {useWindowSize} from '../hooks/useWindowSize'
import '../test-utils/mocks/match-media-mock'

jest.mock('../hooks/useWindowSize')

expect.extend(toHaveNoViolations)

describe('PricingOptions', () => {
  const testId = 'test'
  const mockUseWindowSize = useWindowSize as jest.Mock

  const smallBreakpoint = {
    isSmall: true,
    isMedium: false,
    isXLarge: false,
  }

  const mediumBreakpoint = {
    isSmall: true,
    isMedium: true,
    isXLarge: false,
  }

  const xlargeBreakpoint = {
    isSmall: true,
    isMedium: true,
    isXLarge: true,
  }

  const mockHeaderLabel = 'Mock header label'
  const mockHeading = 'Mock heading'
  const mockDescription = 'Mock description'
  const mockPrice = 'Mock price'
  const mockPrimaryAction = 'Mock primary action'
  const mockSecondaryAction = 'Mock secondary action'
  const mockFeaturedListTitle = 'Mock featured list title'
  const mockFeaturedListHeading = 'Mock featured list heading'
  const mockFeatureListItem = 'Mock feature list item'
  const mockFootnote = 'Mock footnote'

  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders correctly into the document', async () => {
    const expectedClass = 'PricingOptions'

    const {getByTestId} = render(<PricingOptions data-testid={testId}></PricingOptions>)

    const PricingOptionsEl = getByTestId(testId)
    expect(PricingOptionsEl.classList).toContain(expectedClass)
  })

  it('applies the correct layout classes for each variant', () => {
    const defaultLayout = 'PricingOptions--layout-default'
    const cardsLayout = 'PricingOptions--layout-cards'

    const {getByTestId, rerender} = render(<PricingOptions data-testid={testId} variant="default" />)
    expect(getByTestId(testId).classList).toContain(defaultLayout)

    rerender(<PricingOptions data-testid={testId} variant="default-gradient" />)
    expect(getByTestId(testId).classList).toContain(defaultLayout)

    rerender(<PricingOptions data-testid={testId} variant="cards" />)
    expect(getByTestId(testId).classList).toContain(cardsLayout)

    rerender(<PricingOptions data-testid={testId} variant="cards-gradient" />)
    expect(getByTestId(testId).classList).toContain(cardsLayout)
  })

  it('applies the correct appearance classes for each variant', () => {
    const solidVariant = 'PricingOptions--appearance-solid'
    const gradientVariant = 'PricingOptions--appearance-gradient'

    const {getByTestId, rerender} = render(<PricingOptions data-testid={testId} variant="default" />)
    expect(getByTestId(testId).classList).toContain(solidVariant)

    rerender(<PricingOptions data-testid={testId} variant="cards" />)
    expect(getByTestId(testId).classList).toContain(solidVariant)

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

  it('renders a PricingOptions.Item correctly into the document', () => {
    const expectedClass = 'PricingOptions__Item'

    const {getByTestId} = render(<PricingOptions.Item data-testid={testId} className={expectedClass} />)

    const PricingOptionsItemEl = getByTestId(testId)
    expect(PricingOptionsItemEl.classList).toContain(expectedClass)
  })

  it('removes children that are not allowed from PricingOptions.Item', () => {
    const {getByText} = render(
      <PricingOptions.Item>
        <div>Not allowed</div>
      </PricingOptions.Item>,
    )

    expect(() => getByText('Not allowed')).toThrow()
  })

  it('renders allowed children in PricingOptions.Item', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const {getByText} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Label>{mockHeaderLabel}</PricingOptions.Label>
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
        </PricingOptions.Item>
      </PricingOptions>,
    )

    expect(getByText(mockHeaderLabel)).toBeInTheDocument()
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

  it('renders header labels in a dedicated row above items', () => {
    const firstLabel = 'Most popular'
    const secondLabel = 'Best value'

    const {getByTestId, getAllByTestId, getByText} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Label>{firstLabel}</PricingOptions.Label>
          <PricingOptions.Heading>First</PricingOptions.Heading>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.Label>{secondLabel}</PricingOptions.Label>
          <PricingOptions.Heading>Second</PricingOptions.Heading>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    expect(getByTestId(PricingOptions.testIds.labelRow)).toBeInTheDocument()
    expect(getAllByTestId(PricingOptions.testIds.label)).toHaveLength(2)
    expect(getByText(firstLabel)).toBeInTheDocument()
    expect(getByText(secondLabel)).toBeInTheDocument()
  })

  it('renders PricingOptions.Item markup in the expected order', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const {getByTestId} = render(
      <PricingOptions.Item data-testid={testId}>
        <PricingOptions.Footnote>{mockFootnote}</PricingOptions.Footnote>
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

  it('renders the PricingOptions.Heading within PricingOptions.Item with a h3 by default', () => {
    const {getByRole} = render(
      <PricingOptions.Item>
        <PricingOptions.Heading>Mock heading</PricingOptions.Heading>
      </PricingOptions.Item>,
    )

    expect(getByRole('heading', {level: 3})).toBeInTheDocument()
  })

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
    'optionally renders the PricingOptions.Heading within PricingOptions.Item with different levels',
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
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

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
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

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

  it('respects expanded={true} when explicitly set', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const {getByRole} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.FeatureList expanded={true}>
            <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    const accordion = getByRole('group')
    expect(accordion).toHaveAttribute('open')
  })

  it('respects expanded={false} when explicitly set', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const {getByRole} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.FeatureList expanded={false}>
            <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    const accordion = getByRole('group')
    expect(accordion).not.toHaveAttribute('open')
  })

  it('is collapsed on narrow viewport when expanded is undefined', () => {
    mockUseWindowSize.mockReturnValue(smallBreakpoint)

    const {getByRole} = render(
      <PricingOptions.Item>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>,
    )

    const accordion = getByRole('group')
    expect(accordion).not.toHaveAttribute('open')
  })

  it('is expanded on regular viewport when expanded is undefined', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const {getByRole} = render(
      <PricingOptions.Item>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>,
    )

    const accordion = getByRole('group')
    expect(accordion).toHaveAttribute('open')
  })

  it('is expanded on wide viewport when expanded is undefined', () => {
    mockUseWindowSize.mockReturnValue(xlargeBreakpoint)

    const {getByRole} = render(
      <PricingOptions.Item>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>,
    )

    const accordion = getByRole('group')
    expect(accordion).toHaveAttribute('open')
  })

  it('uses the narrow responsive value on narrow viewport for responsive object', () => {
    mockUseWindowSize.mockReturnValue(smallBreakpoint)

    const mockResponsiveObject = {
      narrow: false,
      regular: true,
      wide: true,
    }

    const {getByRole} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.FeatureList expanded={mockResponsiveObject}>
            <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    const accordion = getByRole('group')
    expect(accordion).not.toHaveAttribute('open')
  })

  it('uses the regular responsive value on regular viewports for responsive object', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const mockResponsiveObject = {
      narrow: false,
      regular: true,
      wide: false,
    }

    const {getByRole} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.FeatureList expanded={mockResponsiveObject}>
            <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    const accordion = getByRole('group')
    expect(accordion).toHaveAttribute('open')
  })

  it('uses wide value on wide viewport for responsive object', () => {
    mockUseWindowSize.mockReturnValue(xlargeBreakpoint)

    const mockResponsiveObject = {
      narrow: false,
      regular: false,
      wide: true,
    }

    const {getByRole} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.FeatureList expanded={mockResponsiveObject}>
            <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    const accordion = getByRole('group')
    expect(accordion).toHaveAttribute('open')
  })

  it('overrides responsive behavior when user clicks accordion', async () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const user = userEvent.setup()

    const mockResponsiveObject = {
      narrow: true,
      regular: true,
      wide: true,
    }

    const {getByRole, getByText} = render(
      <PricingOptions.Item>
        <PricingOptions.FeatureList expanded={mockResponsiveObject}>
          <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>,
    )

    const accordion = getByRole('group')
    const accordionToggle = getByText("What's included")

    expect(accordion).toHaveAttribute('open')

    await user.click(accordionToggle)
    expect(accordion).not.toHaveAttribute('open')

    await user.click(accordionToggle)
    expect(accordion).toHaveAttribute('open')
  })

  it('synchronizes all feature lists when one is toggled', async () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const user = userEvent.setup()

    const {getAllByRole, getAllByText} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem>Feature 1</PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListGroupHeading>Features</PricingOptions.FeatureListGroupHeading>
            <PricingOptions.FeatureListItem>Feature 2</PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    const [accordionOne, accordionTwo] = getAllByRole('group')
    const [firstSummary] = getAllByText("What's included")

    expect(accordionOne).toHaveAttribute('open')
    expect(accordionTwo).toHaveAttribute('open')

    await user.click(firstSummary)

    expect(accordionOne).not.toHaveAttribute('open')
    expect(accordionTwo).not.toHaveAttribute('open')
  })

  it('renders an info tooltip button when infoTooltip is provided', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const tooltipText = 'More details about this feature'
    const featureText = 'Chat in IDE'

    const {getByRole} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListItem infoTooltip={tooltipText}>{featureText}</PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem>Another feature</PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    const infoButton = getByRole('button', {name: `More information about ${featureText}`})
    expect(infoButton).toBeInTheDocument()
    expect(infoButton).toHaveAttribute('aria-describedby')
  })

  it('does not render an info button when infoTooltip is not provided', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const {queryByRole} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.FeatureList>
            <PricingOptions.FeatureListItem>Chat in IDE</PricingOptions.FeatureListItem>
            <PricingOptions.FeatureListItem>Another feature</PricingOptions.FeatureListItem>
          </PricingOptions.FeatureList>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    expect(queryByRole('button', {name: /More information/})).not.toBeInTheDocument()
  })

  it('renders PricingOptions.MenuAction in the actions area', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const {getByTestId, getByText} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Plan</PricingOptions.Heading>
          <PricingOptions.MenuAction>
            <span>Menu content</span>
          </PricingOptions.MenuAction>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    expect(getByText('Menu content')).toBeInTheDocument()
    expect(getByTestId(PricingOptions.testIds.menuAction)).toBeInTheDocument()
  })

  it('uses a dedicated test id for PricingOptions.MenuAction when rendered alongside a primary action', () => {
    mockUseWindowSize.mockReturnValue(mediumBreakpoint)

    const {getByTestId} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Plan</PricingOptions.Heading>
          <PricingOptions.PrimaryAction as="a" href="#">
            Primary action
          </PricingOptions.PrimaryAction>
          <PricingOptions.MenuAction>
            <span>Menu content</span>
          </PricingOptions.MenuAction>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    expect(getByTestId(PricingOptions.testIds.primaryAction)).toBeInTheDocument()
    expect(getByTestId(PricingOptions.testIds.menuAction)).toBeInTheDocument()
  })

  it('forwards style prop to the root element', () => {
    const {getByTestId} = render(<PricingOptions data-testid={testId} style={{marginBlock: '-1px'}} />)

    expect(getByTestId(testId)).toHaveStyle({marginBlock: '-1px'})
  })

  it('renders empty label cells when only some items have labels', () => {
    const {getAllByTestId} = render(
      <PricingOptions>
        <PricingOptions.Item>
          <PricingOptions.Heading>Free</PricingOptions.Heading>
        </PricingOptions.Item>
        <PricingOptions.Item>
          <PricingOptions.Label>Recommended</PricingOptions.Label>
          <PricingOptions.Heading>Pro</PricingOptions.Heading>
        </PricingOptions.Item>
      </PricingOptions>,
    )

    const labelCells = getAllByTestId(PricingOptions.testIds.label)
    expect(labelCells).toHaveLength(2)
    expect(labelCells[0].classList.toString()).toContain('empty')
    expect(labelCells[1].classList.toString()).toContain('has-label')
  })
})
