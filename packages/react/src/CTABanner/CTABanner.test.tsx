import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {CTABanner} from './CTABanner'
import {axe, toHaveNoViolations} from 'jest-axe'
import {Button} from '../Button'

expect.extend(toHaveNoViolations)

describe('CTABanner', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(
      <CTABanner>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.Description>This is your description</CTABanner.Description>
      </CTABanner>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'CTABanner'
    const expectedCustomClass = 'custom-class'
    const expectedTag = 'section'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <CTABanner data-testid={mockTestId} className={expectedCustomClass}>
        <CTABanner.Heading as="h1">Where the most ambitious teams build great things</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>,
    )
    const ctaBannerEl = getByTestId(mockTestId)
    expect(ctaBannerEl.tagName).toBe(expectedTag.toUpperCase())
    expect(ctaBannerEl.classList).toContain(expectedClass)
    expect(ctaBannerEl.classList).toContain(expectedCustomClass)
  })

  it('renders the correct default heading type', () => {
    const expectedTag = 'h3'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <CTABanner>
        <CTABanner.Heading>{headingText}</CTABanner.Heading>
      </CTABanner>,
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the correct heading type when an override is used', () => {
    const expectedTag = 'h1'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <CTABanner>
        <CTABanner.Heading as={'h1'}>{headingText}</CTABanner.Heading>
      </CTABanner>,
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the CTABanner default without border', () => {
    const mockTestId = 'test'
    const classToCheck = 'CTABanner--border'

    const {getByTestId} = render(
      <CTABanner data-testid={mockTestId}>
        <CTABanner.Heading>{'This is your heading'}</CTABanner.Heading>
      </CTABanner>,
    )
    const ctaBannerEl = getByTestId(mockTestId).lastChild
    expect(ctaBannerEl).not.toHaveClass(classToCheck)
  })

  it('renders the CTABanner with a border', () => {
    const mockTestId = 'test'
    const classToCheck = 'CTABanner-container--border'

    const {getByTestId} = render(
      <CTABanner hasBorder data-testid={mockTestId}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const ctaBannerEl = getByTestId(mockTestId).lastChild
    expect(ctaBannerEl).toHaveClass(classToCheck)
  })

  it('renders the CTABanner with shadows', () => {
    const mockTestId = 'test'
    const classToCheck = 'CTABanner--shadow'

    const {getByTestId} = render(
      <CTABanner data-testid={mockTestId} hasShadow>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const ctaBannerEl = getByTestId(mockTestId)
    expect(ctaBannerEl).toHaveClass(classToCheck)
  })

  it('renders the CTABanner with no shadows', () => {
    const mockTestId = 'test'
    const classToCheck = 'CTABanner--Shadow'

    const {getByTestId} = render(
      <CTABanner hasShadow={false} data-testid={mockTestId}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const ctaBannerEl = getByTestId(mockTestId).firstChild
    expect(ctaBannerEl).not.toHaveClass(classToCheck)
  })

  it('provides an escape hatch to render a custom trailing component', () => {
    const trailingText = 'Custom trailing'
    const MockTrailingComponent = () => <div>{trailingText}</div>

    const {getByText} = render(
      <CTABanner trailingComponent={MockTrailingComponent}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.Description>This is your description</CTABanner.Description>
      </CTABanner>,
    )

    const elTrailing = getByText(trailingText)

    expect(elTrailing).toBeInTheDocument()
  })

  it('provides a way to pass a background image', () => {
    const mockImage = 'image.jpg'

    const {getByTestId} = render(
      <CTABanner backgroundImageSrc={mockImage} data-testid="root">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const rootElement = getByTestId('root')

    const styles = rootElement.getAttribute('style') as string
    const styleObject = styles
      .split(';')
      .map(style => style.split(':'))

      .reduce((acc, [key, value]) => {
        if (key && value) {
          acc[key.trim()] = value.trim()
        }

        return acc
      }, {})

    expect(styleObject['--brand-CTABanner-background-image-src']).toBe(`url(${mockImage})`)
  })

  it('provides a way to pass responsive background images', () => {
    const mockImages = {
      narrow: 'narrow-image.jpg',
      regular: 'regular-image.jpg',
      wide: 'wide-image.jpg',
    }

    const {getByTestId} = render(
      <CTABanner backgroundImageSrc={mockImages} data-testid="root">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const rootElement = getByTestId('root')

    const styles = rootElement.getAttribute('style') as string
    const styleObject = styles
      .split(';')
      .map(style => style.split(':'))

      .reduce((acc, [key, value]) => {
        if (key && value) {
          acc[key.trim()] = value.trim()
        }

        return acc
      }, {})

    for (const [key, value] of Object.entries(mockImages)) {
      expect(styleObject[`--brand-CTABanner-${key}-background-image-src`]).toBe(`url(${value})`)
    }
  })

  it('provides a way to pass an optional background color', () => {
    const mockColor = 'red'

    const {getByTestId} = render(
      <CTABanner backgroundColor={mockColor} data-testid="root">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const rootElement = getByTestId('root')

    const styles = rootElement.getAttribute('style') as string
    const styleObject = styles
      .split(';')
      .map(style => style.split(':'))

      .reduce((acc, [key, value]) => {
        if (key && value) {
          acc[key.trim()] = value.trim()
        }

        return acc
      }, {})

    expect(styleObject['--brand-CTABanner-background-color']).toBe(mockColor)
  })

  it('provides a way to pass responsive background colors', () => {
    const mockColors = {
      narrow: 'red',
      regular: 'yellow',
      wide: 'blue',
    }

    const {getByTestId} = render(
      <CTABanner backgroundColor={mockColors} data-testid="root">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const rootElement = getByTestId('root')

    const styles = rootElement.getAttribute('style') as string
    const styleObject = styles
      .split(';')
      .map(style => style.split(':'))

      .reduce((acc, [key, value]) => {
        if (key && value) {
          acc[key.trim()] = value.trim()
        }

        return acc
      }, {})

    for (const [key, value] of Object.entries(mockColors)) {
      expect(styleObject[`--brand-CTABanner-${key}-background-color`]).toBe(value)
    }
  })

  it('applies the default variant by default', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <CTABanner data-testid={mockTestId}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const ctaBannerEl = getByTestId(mockTestId)
    expect(ctaBannerEl).toHaveClass('CTABanner--variant-default')
  })

  it('can optionally apply the balanced variant', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <CTABanner variant="balanced" data-testid={mockTestId}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.Image src="image.png" alt="test" />
      </CTABanner>,
    )
    const ctaBannerEl = getByTestId(mockTestId)
    expect(ctaBannerEl).toHaveClass('CTABanner--variant-balanced')
  })

  it('can optionally apply the minimal variant', () => {
    const mockTestId = 'test'

    const {getByTestId} = render(
      <CTABanner variant="minimal" data-testid={mockTestId}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.ButtonGroup>
          <Button>Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>,
    )
    const ctaBannerEl = getByTestId(mockTestId)
    expect(ctaBannerEl).toHaveClass('CTABanner--variant-minimal')
  })

  it('can render CTABanner.Image in the default variant alongside other children', () => {
    const {getByAltText} = render(
      <CTABanner>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.Image src="image.png" alt="test image" />
      </CTABanner>,
    )
    const imageEl = getByAltText('test image')
    expect(imageEl).toBeInTheDocument()
  })

  it('renders a two-column Grid layout in the balanced variant with an image', () => {
    const {getByAltText, getByText} = render(
      <CTABanner variant="balanced">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.Image src="image.png" alt="test image" />
      </CTABanner>,
    )
    const imageEl = getByAltText('test image')
    const headingEl = getByText('This is your heading')

    expect(imageEl).toBeInTheDocument()
    expect(headingEl).toBeInTheDocument()

    expect(imageEl.closest('[class*="CTABanner-grid-column--secondary"]')).toBeInTheDocument()
    expect(headingEl.closest('[class*="CTABanner-grid-column--primary"]')).toBeInTheDocument()
  })

  it('renders a two-column Grid layout in the minimal variant with buttons in the side column', () => {
    const {getByText} = render(
      <CTABanner variant="minimal">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.ButtonGroup>
          <Button>Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>,
    )
    const headingEl = getByText('This is your heading')
    const buttonEl = getByText('Action')

    expect(headingEl.closest('[class*="CTABanner-grid-column--primary"]')).toBeInTheDocument()
    expect(buttonEl.closest('[class*="CTABanner-grid-column--secondary"]')).toBeInTheDocument()
  })

  it('does not render CTABanner.Image in the minimal variant and logs a warning', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const {queryByAltText} = render(
      <CTABanner variant="minimal">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.Image src="image.png" alt="test image" />
      </CTABanner>,
    )
    expect(queryByAltText('test image')).not.toBeInTheDocument()
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'CTABanner: Image child is not supported in minimal variant and will not be rendered.',
    )

    consoleWarnSpy.mockRestore()
  })

  it('logs a warning when the balanced variant is used without CTABanner.Image', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    render(
      <CTABanner variant="balanced">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'CTABanner: The "balanced" variant requires a CTABanner.Image child to display the two-column layout correctly.',
    )

    consoleWarnSpy.mockRestore()
  })

  it('renders the hasGridLines outer border wrapper and container class', () => {
    const {getByTestId} = render(
      <CTABanner hasGridLines data-testid="test">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const sectionEl = getByTestId('test')
    expect(sectionEl.parentElement).toHaveClass('CTABanner-outer-container--border')
    expect(sectionEl.firstChild).toHaveClass('CTABanner-container--border-gridlines')
  })

  it('does not render the hasGridLines outer border wrapper by default', () => {
    const {getByTestId} = render(
      <CTABanner data-testid="test">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )
    const sectionEl = getByTestId('test')
    const outerWrapper = sectionEl.parentElement
    expect(outerWrapper).not.toHaveClass('CTABanner-outer-container--border')
  })

  it('provides an escape hatch to render a custom leading component', () => {
    const leadingText = 'Custom leading'
    const MockLeadingComponent = () => <div>{leadingText}</div>

    const {getByText} = render(
      <CTABanner leadingComponent={MockLeadingComponent}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.Description>This is your description</CTABanner.Description>
      </CTABanner>,
    )

    const elLeading = getByText(leadingText)

    expect(elLeading).toBeInTheDocument()
  })

  it('renders leading component before heading and trailing component after children', () => {
    const MockLeading = () => <div data-testid="leading">Leading</div>
    const MockTrailing = () => <div data-testid="trailing">Trailing</div>

    const {getByTestId} = render(
      <CTABanner leadingComponent={MockLeading} trailingComponent={MockTrailing} data-testid="test">
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>,
    )

    const contentEl = getByTestId('test').querySelector('[class*="CTABanner-content"]')
    const children = Array.from(contentEl!.children)
    const leadingIndex = children.findIndex(el => el.getAttribute('data-testid') === 'leading')
    const trailingIndex = children.findIndex(el => el.getAttribute('data-testid') === 'trailing')

    expect(leadingIndex).toBeLessThan(trailingIndex)
    expect(leadingIndex).toBe(0)
  })
})
