import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {BreakoutBanner} from './BreakoutBanner'
import {Link} from '../Link'

expect.extend(toHaveNoViolations)

describe('BreakoutBanner', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(
      <BreakoutBanner>
        <BreakoutBanner.Heading>This is your heading</BreakoutBanner.Heading>
        <BreakoutBanner.Description>This is your description</BreakoutBanner.Description>
      </BreakoutBanner>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'BreakoutBanner'
    const expectedCustomClass = 'custom-class'
    const expectedTag = 'div'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <BreakoutBanner data-testid={mockTestId} className={expectedCustomClass}>
        <BreakoutBanner.Heading as="h1">Where the most ambitious teams build great things</BreakoutBanner.Heading>
        <BreakoutBanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </BreakoutBanner.Description>
        <BreakoutBanner.LinkGroup>
          <Link href="#">Primary Action</Link>
          <Link href="#">Secondary Action</Link>
        </BreakoutBanner.LinkGroup>
      </BreakoutBanner>,
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
      <BreakoutBanner>
        <BreakoutBanner.Heading>{headingText}</BreakoutBanner.Heading>
      </BreakoutBanner>,
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the correct heading type when an override is used', () => {
    const expectedTag = 'h1'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <BreakoutBanner>
        <BreakoutBanner.Heading as={'h1'}>{headingText}</BreakoutBanner.Heading>
      </BreakoutBanner>,
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders primary link with arrow by default', () => {
    const {getAllByRole} = render(
      <BreakoutBanner>
        <BreakoutBanner.Heading>Required heading</BreakoutBanner.Heading>
        <BreakoutBanner.LinkGroup>
          <Link href="#">Primary Action</Link>
          <Link href="#">Secondary Action</Link>
        </BreakoutBanner.LinkGroup>
      </BreakoutBanner>,
    )
    const linkEl = getAllByRole('link')[0]
    expect(linkEl.querySelector('.ExpandableArrow')).not.toBeNull()
  })

  it('renders secondary link without arrow by default', () => {
    const {getAllByRole} = render(
      <BreakoutBanner>
        <BreakoutBanner.Heading>Required heading</BreakoutBanner.Heading>
        <BreakoutBanner.LinkGroup>
          <Link href="#">Primary Action</Link>
          <Link href="#">Secondary Action</Link>
        </BreakoutBanner.LinkGroup>
      </BreakoutBanner>,
    )
    const linkEl = getAllByRole('link')[1]
    expect(linkEl.querySelector('svg')).toBeNull()
  })

  it('provides an escape hatch to render a custom leading visual', () => {
    const MockLeadingVisual = () => <svg data-testid="mock-svg" aria-label="Mock SVG" />

    const {getByTestId} = render(
      <BreakoutBanner leadingVisual={<MockLeadingVisual />}>
        <BreakoutBanner.Heading>This is your heading</BreakoutBanner.Heading>
        <BreakoutBanner.Description>This is your description</BreakoutBanner.Description>
      </BreakoutBanner>,
    )

    const elLeadingVisual = getByTestId('mock-svg')

    expect(elLeadingVisual).toBeInTheDocument()
  })

  it('provides a way to pass a background image', () => {
    const mockImage = 'image.jpg'

    const {getByTestId} = render(
      <BreakoutBanner backgroundImageSrc={mockImage} data-testid="root">
        <BreakoutBanner.Heading>This is your heading</BreakoutBanner.Heading>
      </BreakoutBanner>,
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

    expect(styleObject['--brand-BreakoutBanner-background-image-src']).toBe(`url(${mockImage})`)
  })

  it('provides a way to pass responsive background images', () => {
    const mockImages = {
      narrow: 'narrow-image.jpg',
      regular: 'regular-image.jpg',
      wide: 'wide-image.jpg',
    }

    const {getByTestId} = render(
      <BreakoutBanner backgroundImageSrc={mockImages} data-testid="root">
        <BreakoutBanner.Heading>This is your heading</BreakoutBanner.Heading>
      </BreakoutBanner>,
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
      expect(styleObject[`--brand-BreakoutBanner-${key}-background-image-src`]).toBe(`url(${value})`)
    }
  })

  it('provides a way to pass an optional background color', () => {
    const mockColor = 'red'

    const {getByTestId} = render(
      <BreakoutBanner backgroundColor={mockColor} data-testid="root">
        <BreakoutBanner.Heading>This is your heading</BreakoutBanner.Heading>
      </BreakoutBanner>,
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

    expect(styleObject['--brand-BreakoutBanner-background-color']).toBe(mockColor)
  })

  it('provides a way to pass responsive background colors', () => {
    const mockColors = {
      narrow: 'red',
      regular: 'yellow',
      wide: 'blue',
    }

    const {getByTestId} = render(
      <BreakoutBanner backgroundColor={mockColors} data-testid="root">
        <BreakoutBanner.Heading>This is your heading</BreakoutBanner.Heading>
      </BreakoutBanner>,
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
      expect(styleObject[`--brand-BreakoutBanner-${key}-background-color`]).toBe(value)
    }
  })

  it('provides a way to render a banner with centred text', () => {
    const {getByTestId} = render(
      <BreakoutBanner align="center" data-testid="root">
        <BreakoutBanner.Heading>This is your heading</BreakoutBanner.Heading>
      </BreakoutBanner>,
    )
    const rootElement = getByTestId('root')
    const innerChild = rootElement.querySelector('.BreakoutBanner-content')

    expect(innerChild).toHaveClass('BreakoutBanner-content--center')
  })
})
