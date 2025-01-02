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

const testSpacingValues: {size: SpacingValues; variable: string}[] = [
  {size: 'none', variable: ''},
  {size: 'condensed', variable: 'var(--brand-box-spacing-condensed)'},
  {size: 'normal', variable: 'var(--brand-box-spacing-normal)'},
  {size: 'spacious', variable: 'var(--brand-box-spacing-spacious)'},
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

  it('renders the box into the document on load', () => {
    const {getByText} = render(<Box>{mockText}</Box>)
    expect(getByText(mockText)).toBeInTheDocument()
  })

  it('renders multiple, different react children', () => {
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

  it.each(testSpacingValues)('sets the correct styles for named spacing value: $size', ({size, variable}) => {
    const {getByText} = render(<Box padding={size}>{mockText}</Box>)

    const style = getComputedStyle(getByText(mockText))

    expect(style.getPropertyValue('--box-n-padBlock')).toBe(variable)
    expect(style.getPropertyValue('--box-n-padInline')).toBe(variable)
  })

  describe('padding props', () => {
    it('sets the correct styles for paddingBlockStart', () => {
      const {getByText} = render(<Box paddingBlockStart={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-padBlock')).toBe('var(--base-size-64) 0')
      expect(style.getPropertyValue('--box-n-padInline')).toBe('')
    })

    it('sets the correct styles for paddingBlockEnd', () => {
      const {getByText} = render(<Box paddingBlockEnd={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-padBlock')).toBe('0 var(--base-size-64)')
      expect(style.getPropertyValue('--box-n-padInline')).toBe('')
    })

    it('sets the correct styles for paddingInlineStart', () => {
      const {getByText} = render(<Box paddingInlineStart={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-padBlock')).toBe('')
      expect(style.getPropertyValue('--box-n-padInline')).toBe('var(--base-size-64) 0')
    })

    it('sets the correct styles for paddingInlineEnd', () => {
      const {getByText} = render(<Box paddingInlineEnd={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-padBlock')).toBe('')
      expect(style.getPropertyValue('--box-n-padInline')).toBe('0 var(--base-size-64)')
    })

    it('sets the correct styles for padding', () => {
      const {getByText} = render(<Box padding={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-padBlock')).toBe('var(--base-size-64)')
      expect(style.getPropertyValue('--box-n-padInline')).toBe('var(--base-size-64)')
    })

    it('sets the correct styles for paddingBlockStart and paddingBlockEnd', () => {
      const {getByText} = render(
        <Box paddingBlockStart={64} paddingBlockEnd={96}>
          {mockText}
        </Box>,
      )

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-padBlock')).toBe('var(--base-size-64) var(--base-size-96)')
      expect(style.getPropertyValue('--box-n-padInline')).toBe('')
    })

    it('sets the correct styles for paddingInlineStart and paddingInlineEnd', () => {
      const {getByText} = render(
        <Box paddingInlineStart={64} paddingInlineEnd={96}>
          {mockText}
        </Box>,
      )

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-padBlock')).toBe('')
      expect(style.getPropertyValue('--box-n-padInline')).toBe('var(--base-size-64) var(--base-size-96)')
    })

    it('sets the correct styles for paddingBlockStart and paddingInlineEnd', () => {
      const {getByText} = render(
        <Box paddingBlockStart={64} paddingInlineEnd={96}>
          {mockText}
        </Box>,
      )

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-padBlock')).toBe('var(--base-size-64) 0')
      expect(style.getPropertyValue('--box-n-padInline')).toBe('0 var(--base-size-96)')
    })

    it('sets the correct styles for paddingBlockEnd and paddingInlineStart', () => {
      const {getByText} = render(
        <Box paddingBlockEnd={64} paddingInlineStart={96}>
          {mockText}
        </Box>,
      )

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-padBlock')).toBe('0 var(--base-size-64)')
      expect(style.getPropertyValue('--box-n-padInline')).toBe('var(--base-size-96) 0')
    })
  })

  describe('margin props', () => {
    it('sets the correct styles for marginBlockStart', () => {
      const {getByText} = render(<Box marginBlockStart={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-marBlock')).toBe('var(--base-size-64) 0')
      expect(style.getPropertyValue('--box-n-marInline')).toBe('')
    })

    it('sets the correct styles for marginBlockEnd', () => {
      const {getByText} = render(<Box marginBlockEnd={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-marBlock')).toBe('0 var(--base-size-64)')
      expect(style.getPropertyValue('--box-n-marInline')).toBe('')
    })

    it('sets the correct styles for marginInlineStart', () => {
      const {getByText} = render(<Box marginInlineStart={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-marBlock')).toBe('')
      expect(style.getPropertyValue('--box-n-marInline')).toBe('var(--base-size-64) 0')
    })

    it('sets the correct styles for marginInlineEnd', () => {
      const {getByText} = render(<Box marginInlineEnd={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-marBlock')).toBe('')
      expect(style.getPropertyValue('--box-n-marInline')).toBe('0 var(--base-size-64)')
    })

    it('sets the correct styles for margin', () => {
      const {getByText} = render(<Box margin={64}>{mockText}</Box>)

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-marBlock')).toBe('var(--base-size-64)')
      expect(style.getPropertyValue('--box-n-marInline')).toBe('var(--base-size-64)')
    })

    it('sets the correct styles for marginBlockStart and marginBlockEnd', () => {
      const {getByText} = render(
        <Box marginBlockStart={64} marginBlockEnd={96}>
          {mockText}
        </Box>,
      )

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-marBlock')).toBe('var(--base-size-64) var(--base-size-96)')
      expect(style.getPropertyValue('--box-n-marInline')).toBe('')
    })

    it('sets the correct styles for marginInlineStart and marginInlineEnd', () => {
      const {getByText} = render(
        <Box marginInlineStart={64} marginInlineEnd={96}>
          {mockText}
        </Box>,
      )

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-marBlock')).toBe('')
      expect(style.getPropertyValue('--box-n-marInline')).toBe('var(--base-size-64) var(--base-size-96)')
    })

    it('sets the correct styles for marginBlockStart and marginInlineEnd', () => {
      const {getByText} = render(
        <Box marginBlockStart={64} marginInlineEnd={96}>
          {mockText}
        </Box>,
      )

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-marBlock')).toBe('var(--base-size-64) 0')
      expect(style.getPropertyValue('--box-n-marInline')).toBe('0 var(--base-size-96)')
    })

    it('sets the correct styles for marginBlockEnd and marginInlineStart', () => {
      const {getByText} = render(
        <Box marginBlockEnd={64} marginInlineStart={96}>
          {mockText}
        </Box>,
      )

      const style = getComputedStyle(getByText(mockText))

      expect(style.getPropertyValue('--box-n-marBlock')).toBe('0 var(--base-size-64)')
      expect(style.getPropertyValue('--box-n-marInline')).toBe('var(--base-size-96) 0')
    })
  })

  it('sets the correct spacing variables in nested boxes', () => {
    const {getByTestId} = render(
      <Box paddingBlockStart={64} data-testid="outer">
        <Box paddingInlineEnd={96} data-testid="inner"></Box>
      </Box>,
    )

    const outerBox = getByTestId('outer')
    const innerBox = getByTestId('inner')
    const outerStyle = getComputedStyle(outerBox)
    const innerStyle = getComputedStyle(innerBox)

    expect(outerStyle.getPropertyValue('--box-n-padBlock')).toBe('var(--base-size-64) 0')
    expect(outerStyle.getPropertyValue('--box-n-padInline')).toBe('')

    expect(innerStyle.getPropertyValue('--box-n-padBlock')).toBe('')
    expect(innerStyle.getPropertyValue('--box-n-padInline')).toBe('0 var(--base-size-96)')
  })

  it('sets the correct styles for background colors', () => {
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

  it('sets the correct styles for border colors', () => {
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

  it('sets the correct styles for border radius', () => {
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

  it('sets the correct styles for directional border width', () => {
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
