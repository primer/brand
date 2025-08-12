import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Stack} from './Stack'

expect.extend(toHaveNoViolations)

describe('Stack', () => {
  afterEach(cleanup)

  const mockText = 'mock text'

  it('has no a11y violations on initial render', async () => {
    const {container} = render(
      <Stack>
        <></>
      </Stack>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render any type of child', () => {
    const {getByText} = render(
      <Stack>
        <div>{mockText}</div>
        <span>{1}</span>
        <>Fragment</>
      </Stack>,
    )
    expect(getByText(mockText)).toBeInTheDocument()
    expect(getByText(1)).toBeInTheDocument()
    expect(getByText('Fragment')).toBeInTheDocument()
  })

  it('should set the correct styles for direction', () => {
    const mockTestId = 'test'
    const expectedClass = 'Stack--vertical'

    const {getByTestId} = render(
      <Stack direction="vertical" data-testid={mockTestId}>
        <></>
      </Stack>,
    )

    const stackEl = getByTestId(mockTestId)

    expect(stackEl).toHaveClass(expectedClass)
  })

  it('should set the correct styles for justify content', () => {
    const mockTestId = 'test'
    const expectedClass = 'Stack--justify-content-center'

    const {getByTestId} = render(
      <Stack justifyContent={'center'} data-testid={mockTestId}>
        <></>
      </Stack>,
    )

    const stackEl = getByTestId(mockTestId)

    expect(stackEl).toHaveClass(expectedClass)
  })

  it('should set the correct styles for align items', () => {
    const mockTestId = 'test'
    const expectedClass = 'Stack--align-items-center'

    const {getByTestId} = render(
      <Stack alignItems={'center'} data-testid={mockTestId}>
        <></>
      </Stack>,
    )

    const stackEl = getByTestId(mockTestId)

    expect(stackEl).toHaveClass(expectedClass)
  })

  it('should set the correct styles for gap', () => {
    const mockTestId1 = 'test'
    const mockTestId2 = 'test2'
    const expectedClass1 = 'Stack--gap-normal'
    const expectedClass2 = 'Stack--gap-96'

    const {getByTestId} = render(
      <>
        <Stack gap="normal" data-testid={mockTestId1}>
          <></>
        </Stack>
        <Stack gap={96} data-testid={mockTestId2}>
          <></>
        </Stack>
      </>,
    )

    const stackEl1 = getByTestId(mockTestId1)
    const stackEl2 = getByTestId(mockTestId2)

    expect(stackEl1).toHaveClass(expectedClass1)
    expect(stackEl2).toHaveClass(expectedClass2)
  })

  it('should set the correct styles for padding', () => {
    const mockTestId = 'test'
    const expectedClass = 'Stack--padding-normal'

    const {getByTestId} = render(
      <Stack padding="normal" data-testid={mockTestId}>
        <></>
      </Stack>,
    )

    const stackEl = getByTestId(mockTestId)

    expect(stackEl).toHaveClass(expectedClass)
  })

  it('should set the correct styles for responsive gap when a map of breakpoints is provided', () => {
    const mockTestId = 'test'
    const expectedClasses = ['Stack-narrow--gap-condensed', 'Stack-regular--gap-normal', 'Stack-wide--gap-spacious']

    const {getByTestId} = render(
      <Stack
        gap={{
          narrow: 'condensed',
          regular: 'normal',
          wide: 'spacious',
        }}
        data-testid={mockTestId}
      >
        <></>
      </Stack>,
    )

    const stackEl = getByTestId(mockTestId)

    for (const className of expectedClasses) {
      expect(stackEl).toHaveClass(className)
    }
  })

  it('should set the correct styles for responsive padding when a map of breakpoints is provided', () => {
    const mockTestId = 'test'
    const expectedClasses = [
      'Stack-narrow--padding-condensed',
      'Stack-regular--padding-normal',
      'Stack-wide--padding-spacious',
    ]

    const {getByTestId} = render(
      <Stack
        padding={{
          narrow: 'condensed',
          regular: 'normal',
          wide: 'spacious',
        }}
        data-testid={mockTestId}
      >
        <></>
      </Stack>,
    )

    const stackEl = getByTestId(mockTestId)

    for (const className of expectedClasses) {
      expect(stackEl).toHaveClass(className)
    }
  })

  it('should set the correct styles for responsive direction when a map of breakpoints is provided', () => {
    const mockTestId = 'test'
    const expectedClasses = ['Stack-narrow--horizontal', 'Stack-regular--horizontal', 'Stack-wide--vertical']

    const {getByTestId} = render(
      <Stack
        direction={{
          narrow: 'horizontal',
          regular: 'horizontal',
          wide: 'vertical',
        }}
        data-testid={mockTestId}
      >
        <></>
      </Stack>,
    )

    const stackEl = getByTestId(mockTestId)

    for (const className of expectedClasses) {
      expect(stackEl).toHaveClass(className)
    }
  })

  it('should set the correct styles for responsive justify content when a map of breakpoints is provided', () => {
    const mockTestId = 'test'
    const expectedClasses = [
      'Stack-narrow--justify-content-space-around',
      'Stack-regular--justify-content-space-between',
      'Stack-wide--justify-content-space-evenly',
    ]

    const {getByTestId} = render(
      <Stack
        justifyContent={{
          narrow: 'space-around',
          regular: 'space-between',
          wide: 'space-evenly',
        }}
        data-testid={mockTestId}
      >
        <></>
      </Stack>,
    )

    const stackEl = getByTestId(mockTestId)

    for (const className of expectedClasses) {
      expect(stackEl).toHaveClass(className)
    }
  })

  it('should set the correct styles for responsive align items when a map of breakpoints is provided', () => {
    const mockTestId = 'test'
    const expectedClasses = [
      'Stack-narrow--align-items-center',
      'Stack-regular--align-items-flex-start',
      'Stack-wide--align-items-flex-end',
    ]

    const {getByTestId} = render(
      <Stack
        alignItems={{
          narrow: 'center',
          regular: 'flex-start',
          wide: 'flex-end',
        }}
        data-testid={mockTestId}
      >
        <></>
      </Stack>,
    )

    const stackEl = getByTestId(mockTestId)

    for (const className of expectedClasses) {
      expect(stackEl).toHaveClass(className)
    }
  })
})
