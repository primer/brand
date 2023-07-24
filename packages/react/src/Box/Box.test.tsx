import React from 'react'
import '@testing-library/jest-dom'
import {cleanup, render} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Box, BoxBackgroundColors, BoxBorderColorOptions, BoxBorderRadiusOptions, BoxSpacingValues} from './Box'

expect.extend(toHaveNoViolations)

describe('Box', () => {
  afterEach(cleanup)

  const mockText = 'Hello world'

  it('has no a11y violations on initial render', async () => {
    const {container} = render(<Box>{mockText}</Box>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('will render the box into the document on load', () => {
    const {getByText} = render(<Box>{mockText}</Box>)
    expect(getByText(mockText)).toBeInTheDocument()
  })

  it('will render multiple, different react children', () => {
    const {getByText} = render(
      <Box>
        <div>{mockText}</div>
        <span>{1}</span>
        <>Fragment</>
      </Box>,
    )
    expect(getByText(mockText)).toBeInTheDocument()
    expect(getByText(1)).toBeInTheDocument()
    expect(getByText('Fragment')).toBeInTheDocument()
  })

  it('will set the correct styles for non-responsive, uniform spacing', () => {
    for (const size of BoxSpacingValues) {
      const expectedClass = `Box-padding--${size} Box-margin--${size}`

      const {getByTestId} = render(
        <Box data-testid={`box-${size}`} padding={size} margin={size}>
          {mockText}
        </Box>,
      )

      const boxEl = getByTestId(`box-${size}`)
      expect(boxEl).toHaveClass(expectedClass)
    }
  })

  it('will set the correct styles for non-responsive, directional spacing', () => {
    for (const size of BoxSpacingValues) {
      const expectedClass = `Box-paddingBlockStart--${size} Box-paddingInlineEnd--${size} Box-paddingBlockEnd--${size} Box-paddingInlineStart--${size} Box-marginBlockStart--${size} Box-marginInlineEnd--${size} Box-marginBlockEnd--${size} Box-marginInlineStart--${size}`
      const {getByTestId} = render(
        <Box
          data-testid={`box-${size}`}
          paddingBlockEnd={size}
          paddingBlockStart={size}
          paddingInlineEnd={size}
          paddingInlineStart={size}
          marginBlockEnd={size}
          marginInlineEnd={size}
          marginBlockStart={size}
          marginInlineStart={size}
        >
          {mockText}
        </Box>,
      )

      const boxEl = getByTestId(`box-${size}`)
      expect(boxEl).toHaveClass(expectedClass)
    }
  })

  it('will set the correct styles for responsive direction when a map of breakpoints is provided', () => {
    const viewports = ['narrow', 'regular', 'wide']
    const logicalOperators = [
      'padding',
      'margin',
      'marginInlineStart',
      'paddingInlineStart',
      'paddingInlineEnd',
      'marginInlineEnd',
      'paddingBlockStart',
      'paddingBlockEnd',
      'marginBlockStart',
      'marginBlockEnd',
    ]

    let testIdCounter = 0

    for (const viewport of viewports) {
      for (const logicalOperator of logicalOperators) {
        for (const size of BoxSpacingValues) {
          const expectedClasses = `Box-${viewport}-${logicalOperator}--${size}`
          const nextId = testIdCounter++
          const {getByTestId} = render(
            <Box
              data-testid={nextId.toString()}
              padding={{
                narrow: size,
                regular: size,
                wide: size,
              }}
              margin={{
                narrow: size,
                regular: size,
                wide: size,
              }}
              paddingBlockEnd={{
                narrow: size,
                regular: size,
                wide: size,
              }}
              paddingBlockStart={{
                narrow: size,
                regular: size,
                wide: size,
              }}
              paddingInlineEnd={{
                narrow: size,
                regular: size,
                wide: size,
              }}
              paddingInlineStart={{
                narrow: size,
                regular: size,
                wide: size,
              }}
              marginBlockEnd={{
                narrow: size,
                regular: size,
                wide: size,
              }}
              marginInlineEnd={{
                narrow: size,
                regular: size,
                wide: size,
              }}
              marginBlockStart={{
                narrow: size,
                regular: size,
                wide: size,
              }}
              marginInlineStart={{
                narrow: size,
                regular: size,
                wide: size,
              }}
            >
              {mockText}
            </Box>,
          )

          const boxEl = getByTestId(nextId)
          expect(boxEl).toHaveClass(expectedClasses)
        }
      }
    }
  })

  it('will set the correct styles for background colors', () => {
    for (const color of BoxBackgroundColors) {
      const expectedClass = `Box-backgroundColor--${color}`

      const id = `box-${color}`

      const {getByTestId} = render(
        <Box data-testid={id} backgroundColor={color}>
          {mockText}
        </Box>,
      )

      const boxEl = getByTestId(id)
      expect(boxEl).toHaveClass(expectedClass)
    }
  })

  it('will set the correct styles for border colors', () => {
    for (const color of BoxBorderColorOptions) {
      const expectedClass = `Box-borderColor--${color}`

      const id = `box-${color}`

      const {getByTestId} = render(
        <Box data-testid={id} borderColor={color}>
          {mockText}
        </Box>,
      )

      const boxEl = getByTestId(id)
      expect(boxEl).toHaveClass(expectedClass)
    }
  })

  it('will set the correct styles for border radius', () => {
    for (const radius of BoxBorderRadiusOptions) {
      const expectedClass = `Box-borderRadius--${radius}`

      const id = `box-${radius}`

      const {getByTestId} = render(
        <Box data-testid={id} borderRadius={radius}>
          {mockText}
        </Box>,
      )

      const boxEl = getByTestId(id)
      expect(boxEl).toHaveClass(expectedClass)
    }
  })
})
