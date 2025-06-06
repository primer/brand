import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {Statistic} from './Statistic'

import '../test-utils/mocks/match-media-mock'

expect.extend(toHaveNoViolations)

describe('Statistic', () => {
  const mockHeading = '$100M+'
  const mockDescription = 'developers'

  const expectedReadAloudText = `${mockHeading} ${mockDescription}`

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders the default component', async () => {
    const {getByText, container} = render(
      <Statistic>
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    expect(getByText(mockHeading)).toBeInTheDocument()
    expect(getByText(mockDescription)).toBeInTheDocument()

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the combined heading and description text', async () => {
    const {getByTestId} = render(
      <Statistic>
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    const el = getByTestId(Statistic.testIds.root)

    expect(el.textContent).toBe(expectedReadAloudText)
  })

  it('renders the Statistic.Heading with a paragraph element by default', async () => {
    const expectedTagName = 'P'
    const expectedSize = '1000'

    const {getByText} = render(
      <Statistic>
        <Statistic.Heading>{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    expect(getByText(mockHeading).tagName).toBe(expectedTagName)
    expect(getByText(mockHeading).classList).toContain(`Text--${expectedSize}`)
  })

  it('renders the Statistic.Heading with a span element when as="span" is passed', async () => {
    const expectedTagName = 'SPAN'
    const expectedSize = '1000'

    const {getByText} = render(
      <Statistic>
        <Statistic.Heading as="span">{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    expect(getByText(mockHeading).tagName).toBe(expectedTagName)
    expect(getByText(mockHeading).classList).toContain(`Text--${expectedSize}`)
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
    const {getByText} = render(
      <Statistic>
        <Statistic.Heading size="600">{mockHeading}</Statistic.Heading>
        <Statistic.Description>{mockDescription}</Statistic.Description>
      </Statistic>,
    )

    const heading = getByText(mockHeading)

    expect(heading).toHaveClass('Text--600')
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
