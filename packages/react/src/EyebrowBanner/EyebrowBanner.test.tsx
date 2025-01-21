import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import {axe, toHaveNoViolations} from 'jest-axe'
import {CopilotIcon} from '@primer/octicons-react'

import {EyebrowBanner} from './EyebrowBanner'
import '../test-utils/mocks/match-media-mock'

expect.extend(toHaveNoViolations)

describe('EyebrowBanner', () => {
  const mockHeading = 'Mock heading'
  const mockSubHeading = 'Mock sub-heading'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders the default eyebrow banner', async () => {
    const {getByText, getByTestId, container} = render(
      <EyebrowBanner href="/">
        <EyebrowBanner.Heading>{mockHeading}</EyebrowBanner.Heading>
        <EyebrowBanner.SubHeading>{mockSubHeading}</EyebrowBanner.SubHeading>
      </EyebrowBanner>,
    )

    expect(getByText(mockHeading)).toBeInTheDocument()
    expect(getByText(mockSubHeading)).toBeInTheDocument()
    expect(getByTestId(EyebrowBanner.testIds.root)).toHaveAttribute('href', '/')

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('optionally renders a decorative image in the visual slot', async () => {
    const mockImageSrc = 'mock.png'
    const mockAltText = 'Avatar image'
    const mockImgId = 'mock-id'

    const {getByTestId, container} = render(
      <EyebrowBanner href="/">
        <EyebrowBanner.Visual>
          <img data-testid={mockImgId} src={mockImageSrc} alt={mockAltText} />
        </EyebrowBanner.Visual>
        <EyebrowBanner.Heading>{mockHeading}</EyebrowBanner.Heading>
        <EyebrowBanner.SubHeading>{mockSubHeading}</EyebrowBanner.SubHeading>
      </EyebrowBanner>,
    )

    expect(getByTestId(mockImgId)).toBeInTheDocument()
    expect(getByTestId(mockImgId)).toHaveAttribute('src', mockImageSrc)
    expect(getByTestId(EyebrowBanner.testIds.visual)).toHaveAttribute('aria-hidden', 'true')

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('optionally renders a decorative icon in the visual slot', async () => {
    const {getByTestId, container} = render(
      <EyebrowBanner href="/">
        <EyebrowBanner.Visual icon={<CopilotIcon />} />
        <EyebrowBanner.Heading>{mockHeading}</EyebrowBanner.Heading>
        <EyebrowBanner.SubHeading>{mockSubHeading}</EyebrowBanner.SubHeading>
      </EyebrowBanner>,
    )

    const visualSlotEl = getByTestId(EyebrowBanner.testIds.visual)

    expect(visualSlotEl.querySelector('svg')).toBeInTheDocument()
    expect(visualSlotEl.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('optionally renders a background for the decorative icon in the visual slot', async () => {
    const {getByTestId} = render(
      <EyebrowBanner href="/">
        <EyebrowBanner.Visual icon={<CopilotIcon />} hasBackground />
        <EyebrowBanner.Heading>{mockHeading}</EyebrowBanner.Heading>
        <EyebrowBanner.SubHeading>{mockSubHeading}</EyebrowBanner.SubHeading>
      </EyebrowBanner>,
    )

    expect(getByTestId(EyebrowBanner.testIds.visual)).toHaveClass('EyebrowBanner__icon--badge')
  })

  it('optionally renders a text-based label instead of a visual', async () => {
    const mockLabel = 'Mock label'

    const {getByText, container} = render(
      <EyebrowBanner href="/">
        <EyebrowBanner.Label>{mockLabel}</EyebrowBanner.Label>
        <EyebrowBanner.Heading>{mockHeading}</EyebrowBanner.Heading>
        <EyebrowBanner.SubHeading>{mockSubHeading}</EyebrowBanner.SubHeading>
      </EyebrowBanner>,
    )

    expect(getByText(mockLabel)).toBeInTheDocument()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('optionally renders label in different colors', async () => {
    const mockLabel = 'Mock label'
    const mockColor = 'red'

    const {getByText, container} = render(
      <EyebrowBanner href="/">
        <EyebrowBanner.Label color={mockColor}>{mockLabel}</EyebrowBanner.Label>
        <EyebrowBanner.Heading>{mockHeading}</EyebrowBanner.Heading>
        <EyebrowBanner.SubHeading>{mockSubHeading}</EyebrowBanner.SubHeading>
      </EyebrowBanner>,
    )

    const labelEl = getByText(mockLabel)

    expect(labelEl).toHaveClass(`EyebrowBanner__leadingLabel--color-${mockColor}`)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('triggers correct animations on button arrow during a hover event', async () => {
    const expectedClass = 'ExpandableArrow--expanded'
    const {getByTestId} = render(
      <EyebrowBanner href="/">
        <EyebrowBanner.Heading>{mockHeading}</EyebrowBanner.Heading>
        <EyebrowBanner.SubHeading>{mockSubHeading}</EyebrowBanner.SubHeading>
      </EyebrowBanner>,
    )

    await userEvent.hover(getByTestId(EyebrowBanner.testIds.root))
    expect(getByTestId(EyebrowBanner.testIds.expandableArrow).classList).toContain(expectedClass)

    await userEvent.unhover(getByTestId(EyebrowBanner.testIds.root))
    expect(getByTestId(EyebrowBanner.testIds.expandableArrow).classList).not.toContain(expectedClass)
  })

  it('triggers correct animations on button arrow during a focus event', async () => {
    const expectedClass = 'ExpandableArrow--expanded'
    const {getByTestId} = render(
      <EyebrowBanner href="/">
        <EyebrowBanner.Heading>{mockHeading}</EyebrowBanner.Heading>
        <EyebrowBanner.SubHeading>{mockSubHeading}</EyebrowBanner.SubHeading>
      </EyebrowBanner>,
    )

    const rootEl = getByTestId(EyebrowBanner.testIds.root)
    await userEvent.tab()

    expect(getByTestId(EyebrowBanner.testIds.expandableArrow).classList).toContain(expectedClass)

    await userEvent.click(document.body)
    expect(getByTestId(EyebrowBanner.testIds.expandableArrow).classList).not.toContain(expectedClass)
  })
})
