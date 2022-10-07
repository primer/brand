import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {River, getHeadingWarning} from './River'
import {Text, Link, Heading} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('River', () => {
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
          <Text>{mockText}</Text>
        </River.Content>
      </River>
    )

    const textEl = getByText(mockText)

    expect(textEl).toBeInTheDocument()
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
      </River>
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
      </River>
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

  it('can optionally render content in end alignment visually and semantically', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <River data-testid={rootId} align="end">
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>
    )

    const rootEl = getByTestId(rootId)
    const [elOne, elTwo] = Array.from(rootEl.children)

    const expectedRootClass = 'River--align-end'
    const expectLeftChildClass = 'River__visual'
    const expectRightChildClass = 'River__content'

    const unexpectedRootClasses = ['River--align-start', 'River--align-center']

    expect(rootEl.classList).toContain(expectedRootClass)

    for (const className in unexpectedRootClasses) {
      expect(rootEl.classList).not.toContain(unexpectedRootClasses[className])
    }

    expect(elOne.classList).toContain(expectLeftChildClass) // should be the content DOM node
    expect(elTwo.classList).toContain(expectRightChildClass) // should be the visual DOM node
  })

  it('can optionally render content using center alignment visually and semantically', () => {
    const rootId = 'root-el'
    const {getByTestId} = render(
      <River data-testid={rootId} align="center">
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Text>{mockText}</Text>
        </River.Content>
      </River>
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
      </River>
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
      </River>
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
      </River>
    )

    const elHeading = getByRole('heading', {level: 3})

    expect(elHeading).toBeInTheDocument()
  })

  it('cannot render an alternate Heading size', () => {
    // eslint-disable-next-line no-console
    const originalWarn = console.warn
    // eslint-disable-next-line no-console
    console.warn = jest.fn()

    const expectedHeadingSize = 'h1'

    const {getByRole, queryByRole} = render(
      <River>
        <River.Visual>
          <MockImage />
        </River.Visual>
        <River.Content>
          <Heading as={expectedHeadingSize}>{mockHeading}</Heading>
          <Text>{mockText}</Text>
        </River.Content>
      </River>
    )

    const elH1Heading = queryByRole('heading', {level: 1})
    const elH3Heading = getByRole('heading', {level: 3})

    expect(elH1Heading).not.toBeInTheDocument()
    expect(elH3Heading).toBeInTheDocument() // should replace the h1 with a h3

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledWith(getHeadingWarning(expectedHeadingSize))

    // eslint-disable-next-line no-console
    console.warn = originalWarn
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
      </River>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
