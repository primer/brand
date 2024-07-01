import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {Statistic} from './Statistic'

import '../test-utils/mocks/match-media-mock'

expect.extend(toHaveNoViolations)

describe('EyebrowBanner', () => {
  const mockHeading = 'Mock heading'
  const mockDescription = 'Mock description'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders the default component', async () => {
    const {getByText, getByRole, container} = render(
      <Statistic>
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    expect(getByRole('heading', {name: mockHeading})).toBeInTheDocument()
    expect(getByText(mockDescription)).toBeInTheDocument()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the default heading level and size correctly', async () => {
    const expectedSize = 'display'
    const expectedLevel = 'H3'

    const {getByText, getByRole} = render(
      <Statistic>
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    expect(getByRole('heading', {name: mockHeading}).tagName).toBe(expectedLevel)
    expect(getByRole('heading', {name: mockHeading}).classList).toContain(`Heading--${expectedSize}`)
    expect(getByText(mockHeading).tagName).toBe(expectedLevel)
  })

  it('renders the Statistic with custom padding', async () => {
    const {getByTestId} = render(
      <Statistic size="small" padding="spacious" data-testid="statistic">
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    const statistic = getByTestId('statistic')

    expect(statistic).toHaveClass('Statistic--padding-spacious')
  })

  it('renders the Statistic with boxed variant', async () => {
    const {getByTestId} = render(
      <Statistic variant="boxed">
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    const statistic = getByTestId('Statistic')

    expect(statistic).toHaveClass('Statistic--variant-boxed')
  })

  it('renders the Statistic with leading and trailing visuals', async () => {
    const leadingComponent = () => <div data-testid="leadingComponent">Leading Visual</div>
    const trailingComponent = () => <div data-testid="trailingComponent">Trailing Visual</div>

    const {getByTestId} = render(
      <Statistic leadingComponent={leadingComponent} trailingComponent={trailingComponent}>
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )
    const leadingComponentElement = getByTestId('leadingComponent')
    const trailingComponentElement = getByTestId('trailingComponent')

    expect(leadingComponentElement).toBeInTheDocument()
    expect(trailingComponentElement).toBeInTheDocument()
  })

  it('renders the Statistic with custom data-testid', async () => {
    const testId = 'custom-test-id'

    const {getByTestId} = render(
      <Statistic data-testid={testId}>
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    const statistic = getByTestId(testId)

    expect(statistic).toBeInTheDocument()
  })

  it('renders the Statistic with custom heading size', async () => {
    const {getByRole} = render(
      <Statistic>
        <Statistic.Heading size="2">{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    const heading = getByRole('heading', {name: mockHeading})

    expect(heading).toHaveClass('Heading--2')
  })

  it('renders the Statistic with custom description variant', async () => {
    const {getByText} = render(
      <Statistic>
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description variant="accent">{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    const description = getByText(mockDescription)

    expect(description).toHaveClass('Statistic__description--accent')
  })

  it('renders responsive spacing correctly', () => {
    const {getByTestId} = render(
      <Statistic
        data-testid="statistic"
        padding={{
          narrow: 'condensed',
          regular: 'normal',
          wide: 'spacious',
        }}
      >
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    const rootEl = getByTestId('statistic')

    expect(rootEl).toHaveClass('Statistic--narrow-padding-condensed')
    expect(rootEl).toHaveClass('Statistic--regular-padding-normal')
    expect(rootEl).toHaveClass('Statistic--wide-padding-spacious')
  })
})
