import React from 'react'
import '@testing-library/jest-dom'
import {cleanup, render} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'

import {
  Box,
  BoxBackgroundColors,
  BoxBorderColorOptions,
  BoxBorderRadiusOptions,
  BoxBorderWidthOptions,
  type SpacingValues,
} from './Box'
import {BaseSizeScale} from '../constants'

const testSpacingValues: {size: SpacingValues; variable: string}[] = [
  {size: 'none', variable: ''},
  {size: 'condensed', variable: 'var(--brand-box-spacing-condensed)'},
  {size: 'normal', variable: 'var(--brand-box-spacing-normal)'},
  {size: 'spacious', variable: 'var(--brand-box-spacing-spacious)'},
  ...BaseSizeScale.map(
    size => ({size, variable: `var(--base-size-${size})`} as {size: SpacingValues; variable: string}),
  ),
]

const spacingPropVariableMap: {prop: string; variableNames: string[]}[] = [
  {
    prop: 'padding',
    variableNames: [
      '--box-narrow-padding-block-start',
      '--box-narrow-padding-block-end',
      '--box-narrow-padding-inline-start',
      '--box-narrow-padding-inline-end',
      '--box-regular-padding-block-start',
      '--box-regular-padding-block-end',
      '--box-regular-padding-inline-start',
      '--box-regular-padding-inline-end',
      '--box-wide-padding-block-start',
      '--box-wide-padding-block-end',
      '--box-wide-padding-inline-start',
      '--box-wide-padding-inline-end',
    ],
  },
  {
    prop: 'paddingBlockStart',
    variableNames: [
      '--box-narrow-padding-block-start',
      '--box-regular-padding-block-start',
      '--box-wide-padding-block-start',
    ],
  },
  {
    prop: 'paddingInlineEnd',
    variableNames: [
      '--box-narrow-padding-inline-end',
      '--box-regular-padding-inline-end',
      '--box-wide-padding-inline-end',
    ],
  },
  {
    prop: 'paddingBlockEnd',
    variableNames: [
      '--box-narrow-padding-block-end',
      '--box-regular-padding-block-end',
      '--box-wide-padding-block-end',
    ],
  },
  {
    prop: 'paddingInlineStart',
    variableNames: [
      '--box-narrow-padding-inline-start',
      '--box-regular-padding-inline-start',
      '--box-wide-padding-inline-start',
    ],
  },
  {
    prop: 'margin',
    variableNames: [
      '--box-narrow-margin-block-start',
      '--box-narrow-margin-block-end',
      '--box-narrow-margin-inline-start',
      '--box-narrow-margin-inline-end',
      '--box-regular-margin-block-start',
      '--box-regular-margin-block-end',
      '--box-regular-margin-inline-start',
      '--box-regular-margin-inline-end',
      '--box-wide-margin-block-start',
      '--box-wide-margin-block-end',
      '--box-wide-margin-inline-start',
      '--box-wide-margin-inline-end',
    ],
  },
  {
    prop: 'marginBlockStart',
    variableNames: [
      '--box-narrow-margin-block-start',
      '--box-regular-margin-block-start',
      '--box-wide-margin-block-start',
    ],
  },
  {
    prop: 'marginInlineEnd',
    variableNames: [
      '--box-narrow-margin-inline-end',
      '--box-regular-margin-inline-end',
      '--box-wide-margin-inline-end',
    ],
  },
  {
    prop: 'marginBlockEnd',
    variableNames: ['--box-narrow-margin-block-end', '--box-regular-margin-block-end', '--box-wide-margin-block-end'],
  },
  {
    prop: 'marginInlineStart',
    variableNames: [
      '--box-narrow-margin-inline-start',
      '--box-regular-margin-inline-start',
      '--box-wide-margin-inline-start',
    ],
  },
]

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

  describe.each(spacingPropVariableMap)('when $prop', ({prop, variableNames}) => {
    describe.each(testSpacingValues)(`equals "$size"`, ({size, variable}) => {
      it.each(variableNames)(`sets %s to ${variable}`, variableName => {
        const {getByText} = render(<Box {...{[prop]: size}}>{mockText}</Box>)

        const boxEl = getByText(mockText)
        const style = getComputedStyle(boxEl)

        expect(style.getPropertyValue(variableName)).toBe(variable)
      })
    })
  })

  it('sets the correct spacing variables in nested boxes', () => {
    const {getByTestId} = render(
      <Box paddingBlockStart={64} data-testid="outer">
        <Box paddingInlineStart={96} data-testid="inner"></Box>
      </Box>,
    )

    const outerBox = getByTestId('outer')
    const innerBox = getByTestId('inner')
    const outerStyle = getComputedStyle(outerBox)
    const innerStyle = getComputedStyle(innerBox)

    expect(outerStyle.getPropertyValue('--box-narrow-padding-block-start')).toBe('var(--base-size-64)')
    expect(outerStyle.getPropertyValue('--box-narrow-padding-inline-start')).toBe('')

    expect(innerStyle.getPropertyValue('--box-narrow-padding-block-start')).toBe('')
    expect(innerStyle.getPropertyValue('--box-narrow-padding-inline-start')).toBe('var(--base-size-96)')
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

  it('will set the correct styles for directional border width', () => {
    const borderDirections = [
      'borderBlockStartWidth',
      'borderInlineEndWidth',
      'borderBlockEndWidth',
      'borderInlineStartWidth',
    ]

    for (const width of BoxBorderWidthOptions) {
      for (const direction of borderDirections) {
        const expectedClass = `Box-${direction}--${width}`

        const id = `box-${direction}-${width}`

        const props = {
          [direction]: width,
        }

        const {getByTestId} = render(
          <Box data-testid={id} {...props}>
            {mockText}
          </Box>,
        )

        const boxEl = getByTestId(id)
        expect(boxEl).toHaveClass(expectedClass)
      }
    }
  })
})
