import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Bento, ColumnIndex} from './Bento'
import {Heading, Text, Link} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Bento', () => {
  const testId = 'test'
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'Bento'

    const {getByTestId} = render(<Bento data-testid={testId} className={expectedClass} />)

    const BentoEl = getByTestId(testId)
    expect(BentoEl.classList).toContain(expectedClass)
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Bento />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('Bento.Item', () => {
  const testId = 'test'
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'Bento.Item'

    const {getByTestId} = render(<Bento.Item data-testid={testId} className={expectedClass} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(expectedClass)
  })

  it('adds the class for a column span based on the value of that span 1 - 12', () => {
    const columnSpanValue = Math.floor(Math.random() * 12) + 1 // Can be any number 1 - 12
    const {getByTestId} = render(<Bento.Item data-testid={testId} columnSpan={columnSpanValue as ColumnIndex} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(`Bento__Item--column-span-${columnSpanValue}`)
  })

  it('adds the class for a column start based on the value of that span 1 - 12', () => {
    const columnSpanValue = Math.floor(Math.random() * 12) + 1 // Can be any number 1 - 12
    const {getByTestId} = render(<Bento.Item data-testid={testId} columnStart={columnSpanValue as ColumnIndex} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(`Bento__Item--column-start-${columnSpanValue}`)
  })

  it('adds the class for a row span based on the value of that span', () => {
    const columnSpanValue = 20
    const {getByTestId} = render(<Bento.Item data-testid={testId} rowSpan={columnSpanValue} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(`Bento__Item--row-span-${columnSpanValue}`)
  })

  it('adds the class for a row start based on the value of that span', () => {
    const columnSpanValue = 20
    const {getByTestId} = render(<Bento.Item data-testid={testId} rowStart={columnSpanValue} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(`Bento__Item--row-start-${columnSpanValue}`)
  })

  it('adds the class for flow', () => {
    const flow = 'row'
    const {getByTestId} = render(<Bento.Item data-testid={testId} flow={flow} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(`Bento__Item--flow-${flow}`)
  })

  it('adds the class for horizontalAlign', () => {
    const horizontalAlign = 'center'
    const {getByTestId} = render(<Bento.Item data-testid={testId} horizontalAlign={horizontalAlign} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(`Bento__Item--horizontalAlign-${horizontalAlign}`)
  })

  it('adds the class for verticalAlign', () => {
    const verticalAlign = 'center'
    const {getByTestId} = render(<Bento.Item data-testid={testId} verticalAlign={verticalAlign} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(`Bento__Item--verticalAlign-${verticalAlign}`)
  })

  it('adds responsive classes', () => {
    const flow = 'row'
    const {getByTestId} = render(
      <Bento.Item
        data-testid={testId}
        flow={{xsmall: flow, small: flow, medium: flow, large: flow, xlarge: flow, xxlarge: flow}}
      />,
    )

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(`Bento__Item--small-flow-${flow}`)
  })

  it('adds class for setting the visual as background', () => {
    const {getByTestId} = render(<Bento.Item data-testid={testId} visualAsBackground />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.classList).toContain(`Bento__Item--visual-as-background`)
  })

  it('adds the color mode data attribute', () => {
    const colorMode = 'light'
    const {getByTestId} = render(<Bento.Item data-testid={testId} colorMode={colorMode} />)

    const BentoItemEl = getByTestId(testId)
    expect(BentoItemEl.getAttribute('data-color-mode')).toBe(colorMode)
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Bento.Item />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('Bento.Content', () => {
  const testId = 'test'
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'Bento.Content'

    const {getByTestId} = render(<Bento.Content data-testid={testId} className={expectedClass} />)

    const BentoContentEl = getByTestId(testId)
    expect(BentoContentEl.classList).toContain(expectedClass)
  })

  it('removes children that are not allowed', () => {
    const {getByText} = render(
      <Bento.Content>
        <div>Not allowed</div>
      </Bento.Content>,
    )

    expect(() => getByText('Not allowed')).toThrow()
  })

  it('renders children that are allowed', () => {
    const headingText = 'Allowed'
    const textText = 'Allowed 2'
    const linkText = 'Allowed 3'
    const {getByText} = render(
      <Bento.Content>
        <Heading>{headingText}</Heading>
        <Text>{textText}</Text>
        <Link href="#">{linkText}</Link>
      </Bento.Content>,
    )

    expect(getByText(headingText)).toBeInTheDocument()
    expect(getByText(textText)).toBeInTheDocument()
    expect(getByText(linkText)).toBeInTheDocument()
  })

  it('adds the class for padding', () => {
    const padding = 'condensed'
    const {getByTestId} = render(<Bento.Content data-testid={testId} padding={padding} />)

    const BentoContentEl = getByTestId(testId)
    expect(BentoContentEl.classList).toContain(`Bento-padding--${padding}`)
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Bento.Content />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('Bento.Visual', () => {
  const testId = 'test'
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'Bento.Visual'

    const {getByTestId} = render(<Bento.Visual data-testid={testId} className={expectedClass} />)

    const BentoVisualEl = getByTestId(testId)
    expect(BentoVisualEl.classList).toContain(expectedClass)
  })

  it('adds objectPosition style to img elements as children', () => {
    const {getByTestId} = render(
      <Bento.Visual data-testid={testId}>
        <img src="test.png" alt="placeholder, blank area with an gray background color" />
      </Bento.Visual>,
    )

    const imgEl = getByTestId(testId).querySelector('img')
    expect(imgEl).toHaveStyle('object-position: 50% 50%')
  })

  it('renders non img children without style', () => {
    const {getByTestId} = render(
      <Bento.Visual data-testid={testId}>
        <svg />
      </Bento.Visual>,
    )

    const svgEl = getByTestId(testId).querySelector('svg')
    expect(svgEl).not.toHaveStyle('object-position: 50% 50%')
  })

  it('adds the class for padding', () => {
    const padding = 'condensed'
    const {getByTestId} = render(<Bento.Visual data-testid={testId} padding={padding} />)

    const BentoVisualEl = getByTestId(testId)
    expect(BentoVisualEl.classList).toContain(`Bento-padding--${padding}`)
  })

  it('adds the class for fillMedia', () => {
    const fillMedia = false
    const {getByTestId} = render(<Bento.Visual data-testid={testId} fillMedia={fillMedia} />)

    const BentoVisualEl = getByTestId(testId)
    expect(BentoVisualEl.classList).toContain('Bento__Visual-no-fill')
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Bento.Visual />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
