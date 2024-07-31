import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {Section} from './Section'
import '../test-utils/mocks/match-media-mock'

expect.extend(toHaveNoViolations)

describe('Section', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders the main element correctly into the document', () => {
    const {getByTestId} = render(<Section></Section>)

    const rootEl = getByTestId('Section')

    expect(rootEl).toBeInTheDocument()
    expect(rootEl.tagName).toBe('SECTION')
  })

  it('renders children correctly', () => {
    const expectedClass = 'Section'

    const {getByTestId} = render(<Section></Section>)

    const SectionEl = getByTestId('Section')
    expect(SectionEl.classList).toContain(expectedClass)
  })

  it('should allow setting the element as a div', () => {
    const {getByTestId} = render(<Section as="div"></Section>)

    const rootEl = getByTestId('Section')

    expect(rootEl.tagName).toBe('DIV')
  })

  it('applies custom padding when padding props are provided', () => {
    const expectedClasses = 'Section--paddingBlockStart-spacious Section--paddingBlockEnd-condensed'

    const {getByTestId} = render(<Section paddingBlockStart="spacious" paddingBlockEnd="condensed" />)
    const SectionEl = getByTestId('Section')

    expect(SectionEl).toHaveClass(expectedClasses)
  })

  it('applies responsive custom padding when a responsive map is passed to the padding props', () => {
    const expectedClasses = [
      'Section-narrow--paddingBlockStart-spacious',
      'Section-narrow--paddingBlockEnd-spacious',
      'Section-regular--paddingBlockStart-normal',
      'Section-regular--paddingBlockEnd-normal',
      'Section-wide--paddingBlockStart-condensed',
      'Section-wide--paddingBlockEnd-condensed',
    ].join(' ')

    const {getByTestId} = render(
      <Section
        paddingBlockStart={{narrow: 'spacious', regular: 'normal', wide: 'condensed'}}
        paddingBlockEnd={{narrow: 'spacious', regular: 'normal', wide: 'condensed'}}
      />,
    )
    const SectionEl = getByTestId('Section')

    expect(SectionEl).toHaveClass(expectedClasses)
  })

  it('applies custom background color when backgroundColor prop is provided', () => {
    const mockValue = 'blue'
    const {getByTestId} = render(<Section backgroundColor={mockValue} />)
    const SectionEl = getByTestId('Section')

    const backgroundValue = getComputedStyle(SectionEl).getPropertyValue('--brand-Section-background-color')

    expect(backgroundValue).toBe(mockValue)
  })

  it('applies predefined background color when backgroundColor prop is provided', () => {
    const mockValue = 'subtle'
    const {getByTestId} = render(<Section backgroundColor={mockValue} />)
    const SectionEl = getByTestId('Section')

    const backgroundValue = getComputedStyle(SectionEl).getPropertyValue('--brand-Section-background-color')

    expect(backgroundValue).toBe(`var(--brand-color-canvas-${mockValue})`)
  })

  it('applies custom background image when backgroundImageSrc, backgroundImagePosition, and backgroundImageSize props are provided', () => {
    const mockSrcValue = 'image.jpg'
    const mockPositionValue = 'top right'
    const mockSizeValue = 'contain'

    const expectedSrcValue = `url(${mockSrcValue})`

    const {getByTestId} = render(
      <Section
        backgroundImageSrc={mockSrcValue}
        backgroundImagePosition={mockPositionValue}
        backgroundImageSize={mockSizeValue}
      />,
    )
    const SectionEl = getByTestId('Section')

    const backgroundImageSrcValue = getComputedStyle(SectionEl).getPropertyValue('--brand-Section-background-image-src')
    const backgroundImagePositionValue = getComputedStyle(SectionEl).getPropertyValue(
      '--brand-Section-background-image-position',
    )
    const backgroundImageSizeValue = getComputedStyle(SectionEl).getPropertyValue(
      '--brand-Section-background-image-size',
    )

    expect(backgroundImageSrcValue).toBe(expectedSrcValue)
    expect(backgroundImagePositionValue).toBe(mockPositionValue)
    expect(backgroundImageSizeValue).toBe(mockSizeValue)
  })

  it('applies responsive custom background color when a responsive map is passed to the backgroundColor', () => {
    const mockValue = {narrow: 'blue', regular: 'red', wide: 'green'}
    const {getByTestId} = render(<Section backgroundColor={mockValue} />)
    const SectionEl = getByTestId('Section')

    const backgroundValues = {}

    for (const breakpoint in mockValue) {
      backgroundValues[breakpoint] = getComputedStyle(SectionEl).getPropertyValue(
        `--brand-Section-${breakpoint}-background-color`,
      )
    }

    expect(backgroundValues).toEqual(mockValue)
  })

  it('applies custom background image when backgroundImageSrc, backgroundImagePosition, and backgroundImageSize props are provided', () => {
    const mockSrcValue = 'image.jpg'
    const mockPositionValue = 'top right'
    const mockSizeValue = 'contain'

    const expectedSrcValue = `url(${mockSrcValue})`

    const {getByTestId} = render(
      <Section
        backgroundImageSrc={mockSrcValue}
        backgroundImagePosition={mockPositionValue}
        backgroundImageSize={mockSizeValue}
      />,
    )
    const SectionEl = getByTestId('Section')

    const backgroundImageSrcValue = getComputedStyle(SectionEl).getPropertyValue('--brand-Section-background-image-src')
    const backgroundImagePositionValue = getComputedStyle(SectionEl).getPropertyValue(
      '--brand-Section-background-image-position',
    )
    const backgroundImageSizeValue = getComputedStyle(SectionEl).getPropertyValue(
      '--brand-Section-background-image-size',
    )

    expect(backgroundImageSrcValue).toBe(expectedSrcValue)
    expect(backgroundImagePositionValue).toBe(mockPositionValue)
    expect(backgroundImageSizeValue).toBe(mockSizeValue)
  })

  it('applies responsive custom background image when a responsive map is passed to the backgroundImageSrc, backgroundImagePosition, and BackgroundImageSize', () => {
    const mockPositionValue = {narrow: 'top left', regular: '50% 50%', wide: '0 50%'}
    const mockSizeValue = {narrow: 'cover', regular: '100%', wide: 'contain'}

    const mockSrcValue = {
      narrow: 'image-1.jpg',
      regular: 'image-2.jpg',
      wide: 'image-3.jpg',
    }

    const expectedSrcValues = {
      narrow: `url(${mockSrcValue.narrow})`,
      regular: `url(${mockSrcValue.regular})`,
      wide: `url(${mockSrcValue.wide})`,
    }

    const {getByTestId} = render(
      <Section
        backgroundImageSrc={mockSrcValue}
        backgroundImagePosition={mockPositionValue}
        backgroundImageSize={mockSizeValue}
      />,
    )

    const SectionEl = getByTestId('Section')

    const backgroundSrcValues = {}
    const backgroundSizeValues = {}
    const backgroundPositionValues = {}

    for (const breakpoint in mockSrcValue) {
      backgroundSrcValues[breakpoint] = getComputedStyle(SectionEl).getPropertyValue(
        `--brand-Section-${breakpoint}-background-image-src`,
      )
    }

    for (const breakpoint in mockPositionValue) {
      backgroundPositionValues[breakpoint] = getComputedStyle(SectionEl).getPropertyValue(
        `--brand-Section-${breakpoint}-background-image-position`,
      )
    }

    for (const breakpoint in mockSizeValue) {
      backgroundSizeValues[breakpoint] = getComputedStyle(SectionEl).getPropertyValue(
        `--brand-Section-${breakpoint}-background-image-size`,
      )
    }

    expect(backgroundSrcValues).toEqual(expectedSrcValues)
    expect(backgroundPositionValues).toEqual(mockPositionValue)
    expect(backgroundSizeValues).toEqual(mockSizeValue)
  })

  it('applies multiple custom background images when backgroundImageSrc, backgroundImagePosition, and backgroundImageSize props are provided', () => {
    const mockSrcValue = ['image1.jpg', 'image2.jpg']
    const mockPositionValue = ['top right', '50%']
    const mockSizeValue = ['cover', 'contain']

    const expectedSrcValue = mockSrcValue.map(v => `url(${v})`).join()
    const expectedPositionValue = mockPositionValue.join()
    const expectedSizeValue = mockSizeValue.join()

    const {getByTestId} = render(
      <Section
        backgroundImageSrc={mockSrcValue}
        backgroundImagePosition={mockPositionValue}
        backgroundImageSize={mockSizeValue}
      />,
    )
    const SectionEl = getByTestId('Section')

    const backgroundImageSrcValue = getComputedStyle(SectionEl).getPropertyValue('--brand-Section-background-image-src')
    const backgroundImagePositionValue = getComputedStyle(SectionEl).getPropertyValue(
      '--brand-Section-background-image-position',
    )
    const backgroundImageSizeValue = getComputedStyle(SectionEl).getPropertyValue(
      '--brand-Section-background-image-size',
    )

    expect(backgroundImageSrcValue).toBe(expectedSrcValue)
    expect(backgroundImagePositionValue).toBe(expectedPositionValue)
    expect(backgroundImageSizeValue).toBe(expectedSizeValue)
  })

  it('applies multiple responsive custom background images when a responsive map is passed to the backgroundImageSrc, backgroundImagePosition, and BackgroundImageSize', () => {
    const mockPositionValue = {narrow: ['top left', '50%'], regular: ['50% 50%', '10% 50%'], wide: ['0 50%', '0 0']}
    const mockSizeValue = {narrow: ['cover', 'contain'], regular: ['100%', '125%'], wide: ['contain', 'cover']}
    const mockSrcValue = {
      narrow: ['image-1.jpg', 'image-2.jpg'],
      regular: ['image-3.jpg', 'image-4.jpg'],
      wide: ['image-5.jpg', 'image-6.jpg'],
    }

    const expectedSrcValue = Object.keys(mockSrcValue).reduce((acc, breakpoint) => {
      acc[breakpoint] = mockSrcValue[breakpoint].map(img => `url(${img})`).join()
      return acc
    }, {})

    const expectedPositionValue = Object.keys(mockPositionValue).reduce((acc, breakpoint) => {
      acc[breakpoint] = mockPositionValue[breakpoint].join()
      return acc
    }, {})

    const expectedSizeValue = Object.keys(mockSizeValue).reduce((acc, breakpoint) => {
      acc[breakpoint] = mockSizeValue[breakpoint].join()
      return acc
    }, {})

    const {getByTestId} = render(
      <Section
        backgroundImageSrc={mockSrcValue}
        backgroundImagePosition={mockPositionValue}
        backgroundImageSize={mockSizeValue}
      />,
    )

    const SectionEl = getByTestId('Section')

    const backgroundSrcValues = {}
    const backgroundSizeValues = {}
    const backgroundPositionValues = {}

    for (const breakpoint in mockSrcValue) {
      backgroundSrcValues[breakpoint] = getComputedStyle(SectionEl).getPropertyValue(
        `--brand-Section-${breakpoint}-background-image-src`,
      )
    }

    for (const breakpoint in mockPositionValue) {
      backgroundPositionValues[breakpoint] = getComputedStyle(SectionEl).getPropertyValue(
        `--brand-Section-${breakpoint}-background-image-position`,
      )
    }

    for (const breakpoint in mockSizeValue) {
      backgroundSizeValues[breakpoint] = getComputedStyle(SectionEl).getPropertyValue(
        `--brand-Section-${breakpoint}-background-image-size`,
      )
    }

    expect(backgroundSrcValues).toEqual(expectedSrcValue)
    expect(backgroundPositionValues).toEqual(expectedPositionValue)
    expect(backgroundSizeValues).toEqual(expectedSizeValue)
  })

  it('applies full width class when fullWidth prop is set to true', () => {
    const {getByTestId} = render(<Section fullWidth />)
    const SectionContainerEl = getByTestId('Section__container')

    expect(SectionContainerEl).toHaveClass('Section__container')
  })

  it('applies rounded class when rounded prop is true', () => {
    const {getByTestId} = render(<Section rounded />)
    const sectionElement = getByTestId('Section')

    expect(sectionElement).toHaveClass('Section--rounded')
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Section />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
