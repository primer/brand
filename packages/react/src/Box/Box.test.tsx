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
      '--box-npbs',
      '--box-npbe',
      '--box-npis',
      '--box-npie',
      '--box-rpbs',
      '--box-rpbe',
      '--box-rpis',
      '--box-rpie',
      '--box-wpbs',
      '--box-wpbe',
      '--box-wpis',
      '--box-wpie',
    ],
  },
  {
    prop: 'paddingBlockStart',
    variableNames: ['--box-npbs', '--box-rpbs', '--box-wpbs'],
  },
  {
    prop: 'paddingInlineEnd',
    variableNames: ['--box-npie', '--box-rpie', '--box-wpie'],
  },
  {
    prop: 'paddingBlockEnd',
    variableNames: ['--box-npbe', '--box-rpbe', '--box-wpbe'],
  },
  {
    prop: 'paddingInlineStart',
    variableNames: ['--box-npis', '--box-rpis', '--box-wpis'],
  },
  {
    prop: 'margin',
    variableNames: [
      '--box-nmbs',
      '--box-nmbe',
      '--box-nmis',
      '--box-nmie',
      '--box-rmbs',
      '--box-rmbe',
      '--box-rmis',
      '--box-rmie',
      '--box-wmbs',
      '--box-wmbe',
      '--box-wmis',
      '--box-wmie',
    ],
  },
  {
    prop: 'marginBlockStart',
    variableNames: ['--box-nmbs', '--box-rmbs', '--box-wmbs'],
  },
  {
    prop: 'marginInlineEnd',
    variableNames: ['--box-nmie', '--box-rmie', '--box-wmie'],
  },
  {
    prop: 'marginBlockEnd',
    variableNames: ['--box-nmbe', '--box-rmbe', '--box-wmbe'],
  },
  {
    prop: 'marginInlineStart',
    variableNames: ['--box-nmis', '--box-rmis', '--box-wmis'],
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

    expect(outerStyle.getPropertyValue('--box-npbs')).toBe('var(--base-size-64)')
    expect(outerStyle.getPropertyValue('--box-npis')).toBe('')

    expect(innerStyle.getPropertyValue('--box-npbs')).toBe('')
    expect(innerStyle.getPropertyValue('--box-npis')).toBe('var(--base-size-96)')
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
