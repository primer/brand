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
      <CTABanner data-testid={mockTestId}>
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

  it('renders primary button with arrow by default', () => {
    const {getAllByRole} = render(
      <CTABanner>
        <CTABanner.ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>,
    )
    const buttonEl = getAllByRole('button')[0]
    expect(buttonEl.querySelector('svg')).not.toBeNull()
  })

  it('renders secondary button without arrow by default', () => {
    const {getAllByRole} = render(
      <CTABanner>
        <CTABanner.ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>,
    )
    const buttonEl = getAllByRole('button')[1]
    expect(buttonEl.querySelector('svg')).toBeNull()
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
})
