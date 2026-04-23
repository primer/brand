import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Card} from './Card'
import {axe, toHaveNoViolations} from 'jest-axe'
import {GitMergeIcon} from '@primer/octicons-react'
import {ThemeProvider} from '../ThemeProvider'
import {MicrosoftLogo} from '../fixtures/third-party-logos/MicrosoftLogo'
import {Token} from '../Token'

expect.extend(toHaveNoViolations)

describe('Card', () => {
  afterEach(cleanup)

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })
  })

  const mockHref = '#'
  const mockLabel = 'This is a mock label'
  const mockHeading = 'This is a mock heading'
  const mockDescription = 'This is a mock description'
  const mockIcon = <GitMergeIcon aria-label="Git merge icon" />

  it('no a11y violations', async () => {
    const {container} = render(
      <Card href={mockHref}>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const mockTestId = 'test'
    const expectedClass = 'Card'
    const expectedCustomClass = 'custom-class'
    const expectedTag = 'div'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId} className={expectedCustomClass}>
        <Card.Label>{mockLabel}</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )
    const cardEl = getByTestId(mockTestId)
    expect(cardEl.tagName).toBe(expectedTag.toUpperCase())
    expect(cardEl.classList).toContain(expectedClass)
    expect(cardEl.classList).toContain(expectedCustomClass)
  })

  it('can optionally render a minimal variant', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Card variant="minimal" href={mockHref} data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )
    const cardEl = getByTestId(mockTestId)
    expect(cardEl.classList).toContain('Card--variant-minimal')
  })

  it('defaults to the default background color for the default variant', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl.classList).toContain('Card--backgroundColor-default')
  })

  it('defaults to a transparent background for the minimal variant', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Card variant="minimal" href={mockHref} data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl.classList).toContain('Card--backgroundColor-none')
  })

  it('defaults to no background color for the arrow CTA variant', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Card href={mockHref} ctaVariant="arrow" data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl.classList).toContain('Card--backgroundColor-none')
  })

  it('allows passthrough of an explicit background color for the arrow CTA variant too', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Card href={mockHref} ctaVariant="arrow" backgroundColor="subtle" data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl.classList).toContain('Card--backgroundColor-subtle')
    expect(cardEl.classList).not.toContain('Card--backgroundColor-none')
  })

  it('renders a default variant in dark mode', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <ThemeProvider colorMode="dark">
        <Card href={mockHref} data-testid={mockTestId}>
          <Card.Heading>{mockHeading}</Card.Heading>
        </Card>
      </ThemeProvider>,
    )
    const cardEl = getByTestId(mockTestId)
    expect(cardEl.classList).toContain('Card--backgroundColor-default')
  })

  it('renders the correct default heading type', () => {
    const expectedHeadingTag = 'h3'

    const {getByText} = render(
      <Card href={mockHref}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )
    const cardHeaderEl = getByText(mockHeading).closest(expectedHeadingTag)
    expect(cardHeaderEl?.tagName).toBe(expectedHeadingTag.toUpperCase())
  })

  it('renders the correct heading type when an override is used', () => {
    const expectedHeadingTag = 'h4'

    const {getByText} = render(
      <Card href={mockHref}>
        <Card.Heading as="h4">{mockHeading}</Card.Heading>
      </Card>,
    )
    const cardHeaderEl = getByText(mockHeading).closest(expectedHeadingTag)
    expect(cardHeaderEl?.tagName).toBe(expectedHeadingTag.toUpperCase())
  })

  it('renders the default link text', () => {
    const expectedLinkText = 'Learn more'

    const {getByText} = render(
      <Card href={mockHref}>
        <Card.Heading as="h4">{mockHeading}</Card.Heading>
      </Card>,
    )
    const linkTextEl = getByText(expectedLinkText)
    expect(linkTextEl).toBeInTheDocument()
  })

  it('renders the label correctly into the document', () => {
    const mockTestId = 'label'
    const classToCheck = 'Card__label'

    const {getByTestId} = render(
      <Card href={mockHref}>
        <Card.Label data-testid={mockTestId}>{mockLabel}</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const labelEl = getByTestId(mockTestId)
    expect(labelEl).toHaveClass(classToCheck)
    expect(labelEl).toHaveTextContent(mockLabel)
  })

  it('renders the label with the default token variant', () => {
    const {container, getByText} = render(
      <Card href={mockHref}>
        <Card.Label>{mockLabel}</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    expect(getByText(mockLabel)).toBeInTheDocument()
    expect(container.querySelector('.Card__label')).toHaveClass('Token--variant-default')
  })

  it('rejects the legacy color prop in TypeScript and ignores it at runtime', () => {
    const {container, getByText} = render(
      <Card href={mockHref}>
        {/* @ts-expect-error Testing invalid legacy prop */}
        <Card.Label color="blue-purple">{mockLabel}</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    expect(getByText(mockLabel)).toBeInTheDocument()
    expect(container.querySelector('.Card__label')).toHaveClass('Token--variant-default')
    expect(container.querySelector('.Card__label')).not.toHaveAttribute('color')
  })

  it('renders an arrow-only cta variant', () => {
    const {container, getByText} = render(
      <Card href={mockHref} ctaVariant="arrow">
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    expect(getByText('Learn more')).toBeInTheDocument()
    expect(container.querySelector('.Card__action--arrowOnly')).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector('.Card__actionLabelClip')).toBeInTheDocument()
    expect(container.querySelector('.Card__actionIcon--arrowOnly')).toBeInTheDocument()
    expect(container.querySelector('.ExpandableArrow')).toBeInTheDocument()
  })

  it('can hide the cta affordance while keeping the card link', () => {
    const {container, getByRole, queryByText} = render(
      <Card href={mockHref} ctaVariant="none">
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    expect(queryByText('Learn more')).not.toBeInTheDocument()
    expect(container.querySelector('.Card__action')).not.toBeInTheDocument()
    expect(container.querySelector('.ExpandableArrow')).not.toBeInTheDocument()
    expect(getByRole('link', {name: mockHeading})).toHaveAttribute('href', mockHref)
  })

  it('does not render the CTA arrow for center-aligned text CTAs', () => {
    const ctaLabel = 'Really really long call to action text'

    const {container, getByText} = render(
      <Card href={mockHref} align="center" ctaText={ctaLabel}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    expect(getByText(ctaLabel)).toBeInTheDocument()
    expect(container.querySelector('.Card__actionIcon')).not.toBeInTheDocument()
    expect(container.querySelector('.ExpandableArrow')).not.toBeInTheDocument()
  })

  it('keeps the arrow icon for center-aligned arrow CTAs', () => {
    const {container} = render(
      <Card href={mockHref} align="center" ctaVariant="arrow">
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    expect(container.querySelector('.Card__actionIcon')).toBeInTheDocument()
    expect(container.querySelector('.ExpandableArrow')).toBeInTheDocument()
  })

  it('renders a leading visual before the heading', () => {
    const {container, getByTestId, getByText} = render(
      <Card href={mockHref} leadingVisual={<MicrosoftLogo data-testid="leading-visual" />}>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const allChildrenEls = Array.from(
      container.querySelectorAll('.Card__leadingVisual, .Card__heading, .Card__description'),
    )

    expect(getByTestId('leading-visual')).toBeInTheDocument()
    expect(allChildrenEls.at(0)).toBe(container.querySelector('.Card__leadingVisual'))
    expect(getByText(mockHeading)).toBeInTheDocument()
  })

  it('renders a component-type leadingVisual and passes the shared className through', () => {
    const MockLeadingVisual = ({className}: {className?: string}) => (
      <svg data-testid="leading-visual" className={className} viewBox="0 0 16 16" aria-hidden="true" />
    )

    const {getByTestId} = render(
      <Card href={mockHref} leadingVisual={MockLeadingVisual}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    expect(getByTestId('leading-visual')).toHaveClass('Card__leadingVisualItem')
  })

  it('renders tokens between the icon and heading', () => {
    const {container, getByText, getByLabelText} = render(
      <Card href={mockHref}>
        <Card.Icon icon={mockIcon} />
        <Card.Tokens>
          <Token>Guide</Token>
          <Token variant="outline">Actions</Token>
        </Card.Tokens>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const orderedChildren = Array.from(container.querySelectorAll('.Card__icon, .Card__tokens, .Card__heading'))

    expect(getByLabelText('Git merge icon')).toBeInTheDocument()
    expect(getByText('Guide')).toBeInTheDocument()
    expect(getByText('Actions')).toBeInTheDocument()
    expect(orderedChildren[0]).toBe(getByLabelText('Git merge icon').closest('.Card__icon'))
    expect(orderedChildren[1]).toBe(container.querySelector('.Card__tokens'))
    expect(orderedChildren[2]).toBe(getByText(mockHeading).closest('.Card__heading'))
  })

  it('renders an accent-text label before the heading', () => {
    const {container, getByText} = render(
      <Card href={mockHref}>
        <Card.Label variant="accent-text">Customer story</Card.Label>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const orderedChildren = Array.from(container.querySelectorAll('.Card__label, .Card__heading'))

    expect(getByText('Customer story')).toBeInTheDocument()
    expect(container.querySelector('.Card__label')).toHaveClass('EyebrowText--variant-accent')
    expect(orderedChildren[0]).toBe(getByText('Customer story').closest('.Card__label'))
    expect(orderedChildren[1]).toBe(getByText(mockHeading).closest('.Card__heading'))
  })

  it('renders block-end-position tokens after the description in DOM order', () => {
    const {container, getByText} = render(
      <Card href={mockHref}>
        <Card.Tokens position="block-end">
          <Token>Guide</Token>
          <Token variant="outline">DEC.25</Token>
        </Card.Tokens>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const orderedChildren = Array.from(container.querySelectorAll('.Card__heading, .Card__description, .Card__tokens'))

    expect(container.querySelector('.Card--tokensPosition-block-end')).toBeInTheDocument()
    expect(container.querySelector('.Card__tokens--position-block-end')).toBeInTheDocument()
    expect(orderedChildren[0]).toBe(getByText(mockHeading).closest('.Card__heading'))
    expect(orderedChildren[1]).toBe(getByText(mockDescription).closest('.Card__description'))
    expect(orderedChildren[2]).toBe(getByText('Guide').closest('.Card__tokens'))
  })

  it('renders the icon correctly into the document', () => {
    const mockTestId = 'icon'
    const classToCheck = 'Card__icon'

    const {getByTestId} = render(
      <Card href={mockHref}>
        <Card.Icon icon={mockIcon} data-testid={mockTestId} />
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    expect(getByTestId(mockTestId).parentElement).toHaveClass(classToCheck)
  })

  it('renders the icon with background correctly into the document', () => {
    const mockTestId = 'icon'
    const classToCheck = 'Icon--background'

    const {getByTestId} = render(
      <Card href={mockHref}>
        <Card.Icon hasBackground icon={mockIcon} data-testid={mockTestId} />
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    expect(getByTestId(mockTestId).parentElement).toHaveClass(classToCheck)
  })

  it('warns and does not render Card.Icon when leadingVisual is also provided', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const {queryByLabelText, getByTestId} = render(
      <Card href={mockHref} leadingVisual={<MicrosoftLogo data-testid="leading-visual" />}>
        <Card.Icon icon={mockIcon} />
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Card: `leadingVisual` and `Card.Icon` cannot be used together. `Card.Icon` will not be rendered.',
    )
    expect(queryByLabelText('Git merge icon')).not.toBeInTheDocument()
    expect(getByTestId('leading-visual')).toBeInTheDocument()

    consoleWarnSpy.mockRestore()
  })

  it('renders the image correctly into the document', () => {
    const classToCheck = 'Image'
    const testAltText = 'alternative text'

    const {getByAltText} = render(
      <Card href={mockHref}>
        <Card.Image src="/brand/assets/placeholder.png" alt={testAltText} />
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByAltText(testAltText)
    expect(cardEl).toHaveClass(classToCheck)
  })

  it('renders the Card with border', () => {
    const mockTestId = 'test'
    const classToCheck = 'Card--border'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId} hasBorder>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl).toHaveClass(classToCheck)
  })

  it('renders a card with a max-width when fullWidth=false', async () => {
    const cardTestId = 'card'
    const {getByTestId} = render(
      <Card href={mockHref} data-testid={cardTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByTestId(cardTestId)

    expect(cardEl.parentElement).toHaveClass('Card--maxWidth')
  })

  it('renders a full-width card when fullWidth=true', async () => {
    const cardTestId = 'card'
    const {getByTestId} = render(
      <Card href={mockHref} data-testid={cardTestId} fullWidth>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
      </Card>,
    )

    const cardEl = getByTestId(cardTestId)

    expect(cardEl.parentElement).toHaveClass('Card--fullWidth')
  })

  it('renders card contents in a logical order, regardless of the order they are passed in', () => {
    const {container, getByText, getByAltText, getByLabelText} = render(
      <Card href={mockHref}>
        <Card.Description>{mockDescription}</Card.Description>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Label>Case study</Card.Label>
        <Card.Image src="/brand/assets/placeholder.png" alt="placeholder" />
        <Card.Tokens>
          <Token>Guide</Token>
        </Card.Tokens>
        <Card.Icon icon={mockIcon} />
      </Card>,
    )

    const description = getByText(mockDescription)
    const heading = getByText(mockHeading)
    const image = getByAltText('placeholder').closest('.Card__image')
    const icon = getByLabelText('Git merge icon').closest('.Card__icon')
    const label = getByText('Case study').closest('.Card__label')
    const tokens = getByText('Guide').closest('.Card__tokens')
    const orderedChildren = Array.from(
      container.querySelectorAll(
        '.Card__image, .Card__icon, .Card__tokens, .Card__label, .Card__heading, .Card__description',
      ),
    )

    expect(orderedChildren[0]).toBe(image)
    expect(orderedChildren[1]).toBe(icon)
    expect(orderedChildren[2]).toBe(tokens)
    expect(orderedChildren[3]).toBe(label)
    expect(orderedChildren[4]).toBe(heading.closest('.Card__heading'))
    expect(orderedChildren[5]).toBe(description.closest('.Card__description'))
  })

  it('renders block-end-position tokens in a logical order, regardless of when they are passed in', () => {
    const {container, getByText, getByAltText, getByLabelText} = render(
      <Card href={mockHref}>
        <Card.Tokens position="block-end">
          <Token>Guide</Token>
        </Card.Tokens>
        <Card.Description>{mockDescription}</Card.Description>
        <Card.Icon icon={mockIcon} />
        <Card.Image src="/brand/assets/placeholder.png" alt="placeholder" />
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const description = getByText(mockDescription)
    const heading = getByText(mockHeading)
    const image = getByAltText('placeholder').closest('.Card__image')
    const icon = getByLabelText('Git merge icon').closest('.Card__icon')
    const tokens = getByText('Guide').closest('.Card__tokens')
    const orderedChildren = Array.from(
      container.querySelectorAll('.Card__image, .Card__icon, .Card__heading, .Card__description, .Card__tokens'),
    )

    expect(orderedChildren[0]).toBe(image)
    expect(orderedChildren[1]).toBe(icon)
    expect(orderedChildren[2]).toBe(heading.closest('.Card__heading'))
    expect(orderedChildren[3]).toBe(description.closest('.Card__description'))
    expect(orderedChildren[4]).toBe(tokens)
  })

  it('unwraps top-level fragment children and still applies logical slot ordering', () => {
    const {container, getByText} = render(
      <Card href={mockHref}>
        <>
          <Card.Description>{mockDescription}</Card.Description>
          <Card.Heading>{mockHeading}</Card.Heading>
          <Card.Label>{mockLabel}</Card.Label>
        </>
      </Card>,
    )

    const orderedChildren = Array.from(container.querySelectorAll('.Card__label, .Card__heading, .Card__description'))

    expect(orderedChildren[0]).toBe(getByText(mockLabel).closest('.Card__label'))
    expect(orderedChildren[1]).toBe(getByText(mockHeading).closest('.Card__heading'))
    expect(orderedChildren[2]).toBe(getByText(mockDescription).closest('.Card__description'))
  })

  it('renders with center alignment', () => {
    const mockTestId = 'card'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId} align="center">
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl.parentElement).toHaveClass('Card--align-center')
  })

  it('renders with start alignment by default', () => {
    const mockTestId = 'card'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl.parentElement).toHaveClass('Card--align-start')
  })

  it('renders with disableAnimation class when disableAnimation is true', () => {
    const mockTestId = 'card'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId} disableAnimation>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl).toHaveClass('Card--disableAnimation')
  })

  it('does not render disableAnimation class by default', () => {
    const mockTestId = 'card'

    const {getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl).not.toHaveClass('Card--disableAnimation')
  })

  it('renders Card.Image in block-end position', () => {
    const testAltText = 'test image'
    const mockTestId = 'card'

    const {getByAltText, getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
        <Card.Image src="mock.png" alt={testAltText} position="block-end" />
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl).toHaveClass('Card--imagePos-block-end')

    const allChildrenEls = Array.from(
      cardEl.querySelectorAll('.Card__image, .Card__heading, .Card__description, .Card__label'),
    )
    const image = getByAltText(testAltText).closest('.Card__image')
    expect(allChildrenEls.at(-1)).toBe(image)
  })

  it('renders Card.Image in block-start position by default', () => {
    const testAltText = 'test image'
    const mockTestId = 'card'

    const {getByAltText, getByTestId} = render(
      <Card href={mockHref} data-testid={mockTestId}>
        <Card.Heading>{mockHeading}</Card.Heading>
        <Card.Description>{mockDescription}</Card.Description>
        <Card.Image src="mock.png" alt={testAltText} />
      </Card>,
    )

    const cardEl = getByTestId(mockTestId)
    expect(cardEl).toHaveClass('Card--imagePos-block-start')

    const allChildrenEls = Array.from(
      cardEl.querySelectorAll('.Card__image, .Card__heading, .Card__description, .Card__label'),
    )
    const image = getByAltText(testAltText).closest('.Card__image')
    expect(allChildrenEls.at(0)).toBe(image)
  })

  it('renders custom ctaText', () => {
    const customCtaText = 'Read more'

    const {getByText} = render(
      <Card href={mockHref} ctaText={customCtaText}>
        <Card.Heading>{mockHeading}</Card.Heading>
      </Card>,
    )

    const ctaEl = getByText(customCtaText)
    expect(ctaEl).toBeInTheDocument()
  })
})
