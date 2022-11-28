import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {CTABanner} from './CTABanner'
import {axe, toHaveNoViolations} from 'jest-axe'
import {ButtonGroup} from '../ButtonGroup'
import {Button} from '../Button'

expect.extend(toHaveNoViolations)

describe('CTABanner', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(
      <CTABanner>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
        <CTABanner.Description>This is your description</CTABanner.Description>
      </CTABanner>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'CTABanner'
    const expectedTag = 'section'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <CTABanner data-testid={mockTestId}>
        <CTABanner.Heading as={'h1'}>Where the most ambitious teams build great things</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <ButtonGroup buttonSize="large">
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </ButtonGroup>
      </CTABanner>
    )
    const ctaBannerEl = getByTestId(mockTestId)
    expect(ctaBannerEl.tagName).toBe(expectedTag.toUpperCase())
    expect(ctaBannerEl.classList).toContain(expectedClass)
  })

  it('renders the correct default heading type', () => {
    const expectedTag = 'h2'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <CTABanner>
        <CTABanner.Heading>{headingText}</CTABanner.Heading>
      </CTABanner>
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
      </CTABanner>
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
      </CTABanner>
    )
    const ctaBannerEl = getByTestId(mockTestId).lastChild
    expect(ctaBannerEl).not.toHaveClass(classToCheck)
  })

  it('renders the CTABanner with a border', () => {
    const mockTestId = 'test'
    const classToCheck = 'CTABanner-content--border'

    const {getByTestId} = render(
      <CTABanner hasBorder data-testid={mockTestId}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>
    )
    const ctaBannerEl = getByTestId(mockTestId).lastChild
    expect(ctaBannerEl).toHaveClass(classToCheck)
  })

  it('renders the CTABanner with shadows', () => {
    const mockTestId = 'test'
    const classToCheck = 'CTABanner--Shadow'

    const {getByTestId} = render(
      <CTABanner data-testid={mockTestId}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>
    )
    const ctaBannerEl = getByTestId(mockTestId).firstChild
    expect(ctaBannerEl).toHaveClass(classToCheck)
  })

  it('renders the CTABanner with no shadows', () => {
    const mockTestId = 'test'
    const classToCheck = 'CTABanner--Shadow'

    const {getByTestId} = render(
      <CTABanner hasShadow={false} data-testid={mockTestId}>
        <CTABanner.Heading>This is your heading</CTABanner.Heading>
      </CTABanner>
    )
    const ctaBannerEl = getByTestId(mockTestId).firstChild
    expect(ctaBannerEl).not.toHaveClass(classToCheck)
  })

  it('renders primary button with arrow by default', () => {
    const {getAllByRole} = render(
      <CTABanner>
        <ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </ButtonGroup>
      </CTABanner>
    )
    const buttonEl = getAllByRole('button')[0]
    expect(buttonEl.querySelector('svg')).not.toBeNull()
  })

  it('renders secondary button without arrow by default', () => {
    const {getAllByRole} = render(
      <CTABanner>
        <ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </ButtonGroup>
      </CTABanner>
    )
    const buttonEl = getAllByRole('button')[1]
    expect(buttonEl.querySelector('svg')).toBeNull()
  })
})
