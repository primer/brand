import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {River} from '../'
import {Text, Link, Heading, Label} from '../../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('River', () => {
  const mockLabel = 'Label'
  const mockText = 'Minimal description'
  const mockHeading = 'Mock heading'
  const mockLinkText = 'call to action'
  const MockImage = () => <img src="file.jpg" alt="mock" />

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const {getByText} = render(
      <River>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Label>{mockLabel}</Label>
          <Text>{mockText}</Text>
          <Link href="#">{mockLinkText}</Link>
        </River.Content>
      </River>,
    )

    const textEl = getByText(mockText)
    const labelEl = getByText(mockLabel)
    const linkEl = getByText(mockLinkText)

    expect(textEl).toBeInTheDocument()
    expect(labelEl).toBeInTheDocument()
    expect(linkEl).toBeInTheDocument()
  })

  it('renders in 50:50 image ratio mode by default', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <River data-testid={rootId}>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const rootEl = getByTestId(rootId)
    const expectedClass = 'River--50-50'
    const unexpectedClass = 'River--60-40'

    expect(rootEl.classList).toContain(expectedClass)
    expect(rootEl.classList).not.toContain(unexpectedClass)
  })

  it('renders content using start alignment visually and semantically by default', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <River data-testid={rootId}>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const rootEl = getByTestId(rootId)
    const [elOne, elTwo] = Array.from(rootEl.children)

    const expectedRootClass = 'River--align-start'
    const expectLeftChildClass = 'River__content'
    const expectRightChildClass = 'River__visual'

    const unexpectedRootClasses = ['River--align-end', 'River--align-center']

    expect(rootEl.classList).toContain(expectedRootClass)

    for (const className in unexpectedRootClasses) {
      expect(rootEl.classList).not.toContain(unexpectedRootClasses[className])
    }

    expect(elOne.classList).toContain(expectLeftChildClass) // should be the content DOM node
    expect(elTwo.classList).toContain(expectRightChildClass) // should be the visual DOM node
  })

  it('renders with rounded corners by default', () => {
    const visualId = 'visual-el'
    const {getByTestId} = render(
      <River>
        <River.Visual data-testid={visualId}>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const visualEl = getByTestId(visualId)
    const expectedClass = 'River__visual--rounded'

    expect(visualEl).toHaveClass(expectedClass)
  })

  it('renders with shadows turned off by default', () => {
    const visualId = 'visual-el'
    const {getByTestId} = render(
      <River>
        <River.Visual data-testid={visualId}>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const visualEl = getByTestId(visualId)
    const expectedClass = 'River__visual--has-shadow'

    expect(visualEl).not.toHaveClass(expectedClass)
  })

  it('optionally renders with shadows turned on', () => {
    const visualId = 'visual-el'
    const {getByTestId} = render(
      <River>
        <River.Visual data-testid={visualId} hasShadow>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const visualEl = getByTestId(visualId)
    const expectedClass = 'River__visual--has-shadow'

    expect(visualEl).toHaveClass(expectedClass)
  })

  it('can optionally render content in end alignment visually only', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <River data-testid={rootId} align="end">
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const rootEl = getByTestId(rootId)
    const [elOne, elTwo] = Array.from(rootEl.children)

    const expectedRootClass = 'River--align-end'
    const expectLeftChildClass = 'River__content'
    const expectRightChildClass = 'River__visual'

    const unexpectedRootClasses = ['River--align-start', 'River--align-center']

    expect(rootEl.classList).toContain(expectedRootClass)

    for (const className in unexpectedRootClasses) {
      expect(rootEl.classList).not.toContain(unexpectedRootClasses[className])
    }

    expect(elOne.classList).toContain(expectLeftChildClass) // should be the content DOM node
    expect(elTwo.classList).toContain(expectRightChildClass) // should be the visual DOM node
  })

  it('can optionally render content using center alignment visually only', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <River data-testid={rootId} align="center">
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const rootEl = getByTestId(rootId)
    const [elOne, elTwo] = Array.from(rootEl.children)

    const expectedRootClass = 'River--align-center'
    const expectLeftChildClass = 'River__content'
    const expectRightChildClass = 'River__visual'

    const unexpectedRootClasses = ['River--align-end', 'River--align-start']

    expect(rootEl.classList).toContain(expectedRootClass)

    for (const className in unexpectedRootClasses) {
      expect(rootEl.classList).not.toContain(unexpectedRootClasses[className])
    }

    expect(elOne.classList).toContain(expectLeftChildClass) // should be the content DOM node
    expect(elTwo.classList).toContain(expectRightChildClass) // should be the visual DOM node
  })

  it('only renders valid children in root and content areas using recommended API', () => {
    const rootId = 'root-el'
    const {queryByTestId, getByTestId} = render(
      <River data-testid={rootId}>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
          <div data-testid="invalid-child-two" />
        </River.Content>
        <div data-testid="invalid-child-one" />
      </River>,
    )

    const rootEl = getByTestId(rootId)

    const invalidChildOne = queryByTestId('invalid-child-one')
    const invalidChildTwo = queryByTestId('invalid-child-two')

    expect(rootEl.children.length).toBe(2)
    expect(invalidChildOne).not.toBeInTheDocument()
    expect(invalidChildTwo).not.toBeInTheDocument()
  })

  it('provides an escape hatch to enter leading and trailing custom components', () => {
    const [mockLeading, mockTrailing] = ['custom-leading', 'custom-trailing']
    const MockLeadingComponent = () => <div data-testid={mockLeading} />
    const MockTrailingComponent = () => <div data-testid={mockTrailing} />

    const {getByTestId} = render(
      <River>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content leadingComponent={MockLeadingComponent} trailingComponent={MockTrailingComponent}>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const elLeading = getByTestId(mockLeading)
    const elTrailing = getByTestId(mockTrailing)

    expect(elLeading).toBeInTheDocument()
    expect(elTrailing).toBeInTheDocument()
  })

  it('renders a h3 Heading by default', () => {
    const {getByRole} = render(
      <River>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Heading>{mockHeading}</Heading>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const elHeading = getByRole('heading', {level: 3})

    expect(elHeading).toBeInTheDocument()
  })

  it('can render an alternate Heading level', () => {
    const expectedHeadingSize = 'h1'

    const {getByRole} = render(
      <River>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Heading as={expectedHeadingSize}>{mockHeading}</Heading>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const elH1Heading = getByRole('heading', {level: 1})

    expect(elH1Heading).toBeInTheDocument()
  })

  it('can render an alternate Heading size', () => {
    const expectedHeadingSize = '1'

    const {getByRole} = render(
      <River>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Heading size={expectedHeadingSize}>{mockHeading}</Heading>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const el = getByRole('heading', {level: 3}) // should still be a h3

    expect(el.classList).toContain(`Heading--${expectedHeadingSize}`)
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <River>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Heading>{mockHeading}</Heading>
          <Text>{mockText}</Text>
          <Link>{mockLinkText}</Link>
        </River.Content>
      </River>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders with default variant by default', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <River data-testid={rootId}>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const rootEl = getByTestId(rootId)
    expect(rootEl).toHaveClass('River--variant-default')
    expect(rootEl).not.toHaveClass('River--variant-bordered-grid')
  })

  it('renders with bordered-grid variant', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <River data-testid={rootId} variant="bordered-grid">
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const rootEl = getByTestId(rootId)
    expect(rootEl).toHaveClass('River--variant-bordered-grid')
    expect(rootEl).not.toHaveClass('River--variant-default')
  })

  it('renders visual without background by default', () => {
    const visualId = 'visual-el'
    const {getByTestId} = render(
      <River>
        <River.Visual data-testid={visualId}>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const visualEl = getByTestId(visualId)
    expect(visualEl).not.toHaveClass('River__visual--has-background')
  })

  it('optionally renders visual with background', () => {
    const visualId = 'visual-el'
    const {getByTestId} = render(
      <River variant="bordered-grid">
        <River.Visual data-testid={visualId} hasBackground>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>,
    )

    const visualEl = getByTestId(visualId)
    expect(visualEl).toHaveClass('River__visual--has-background')
  })
})
