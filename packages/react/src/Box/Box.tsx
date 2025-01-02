import {default as clsx} from 'clsx'
import React, {type CSSProperties, type HTMLAttributes, useMemo} from 'react'
import {AnimateProps, useAnimation} from '../animation'
import {BaseSizeScale} from '../constants'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Box.module.css'

export const BoxSpacingValues = ['none', 'condensed', 'normal', 'spacious', ...BaseSizeScale] as const
export type SpacingValues = (typeof BoxSpacingValues)[number]

type ResponsiveSpacingMap = {
  narrow?: SpacingValues
  regular?: SpacingValues
  wide?: SpacingValues
}

export const BoxBackgroundColors = ['default', 'inset', 'subtle', 'overlay'] as const
type BackgroundColors = (typeof BoxBackgroundColors)[number]

export const BoxBorderRadiusOptions = ['small', 'medium', 'large', 'xlarge', 'full'] as const
type BorderRadiusOptions = (typeof BoxBorderRadiusOptions)[number]

export const BoxBorderWidthOptions = ['thin', 'thick', 'thicker'] as const
type BorderWidthOptions = (typeof BoxBorderWidthOptions)[number]

export const BoxBorderColorOptions = ['default', 'muted', 'subtle'] as const
type BorderColorOptions = (typeof BoxBorderColorOptions)[number]

type BorderStyleOptions = Extract<CSSProperties['borderStyle'], 'solid' | 'none'>

const sizes = ['n', 'r', 'w'] as const // narrow, regular, wide
type Size = (typeof sizes)[number]
type SpacingType = `${'pad' | 'mar'}` // padding or margin
type SpacingAxis = `${'Block' | 'Inline'}`
type Type = `${SpacingType}${SpacingAxis}` | SpacingType // e.g. padBlock, marInline, pad
type VariableType<T extends Type = Type> = `--box-${Size}-${T}` // e.g. --box-r-padBlock
type VariableMap<T extends Type> = Record<VariableType<T>, string>

type BoxProps = {
  /**
   * Adding padding all internal sides of the Box
   */
  padding?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding padding on the internal top side of the Box
   */
  paddingBlockStart?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding padding on the internal right side of the Box
   */
  paddingInlineEnd?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding padding on the internal bottom side of the Box
   */
  paddingBlockEnd?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding padding on the internal left side of the Box
   */
  paddingInlineStart?: SpacingValues | ResponsiveSpacingMap
  /*
   * Adding margin on all external sides of the Box
   */
  margin?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding margin on the external top side of the Box
   */
  marginBlockStart?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding margin on the external right side of the Box
   */
  marginInlineEnd?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding margin on the external bottom side of the Box
   */
  marginBlockEnd?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding margin on the external left side of the Box
   */
  marginInlineStart?: SpacingValues | ResponsiveSpacingMap
  /*
   * Apply a system-level background color
   */
  backgroundColor?: BackgroundColors
  /*
   * Apply a system-level border radius value
   */
  borderRadius?: BorderRadiusOptions
  /*
   * Apply a system-level border width value
   */
  borderWidth?: BorderWidthOptions
  /*
   * Apply a directional border width value
   */
  borderBlockStartWidth?: BorderWidthOptions
  /*
   * Apply a directional border width value
   */
  borderInlineEndWidth?: BorderWidthOptions
  /*
   * Apply a directional border width value
   */
  borderBlockEndWidth?: BorderWidthOptions
  /*
   * Apply a directional border width value
   */
  borderInlineStartWidth?: BorderWidthOptions
  /*
   * Apply a system-level border color value
   */
  borderColor?: BorderColorOptions
  /*
   * Apply border style. Values corrospend to the CSS border-style property.
   */
  borderStyle?: BorderStyleOptions
  /**
   * Apply one-off animations to direct children of the Box
   */
  animate?: AnimateProps
} & HTMLAttributes<HTMLDivElement>

const classBuilder = (
  property: string,
  value?:
    | SpacingValues
    | ResponsiveSpacingMap
    | BackgroundColors
    | BorderRadiusOptions
    | BorderWidthOptions
    | BorderColorOptions
    | BorderStyleOptions,
) => {
  if (!value) return ''

  if (typeof value === 'string' || typeof value === 'number') {
    return styles[`Box-${property}--${value}`]
  } else {
    return Object.keys(value)
      .map(viewport => styles[`Box-${viewport}-${property}--${value[viewport]}`])
      .join(' ')
  }
}

const isSpacingMap = (spacing?: SpacingValues | ResponsiveSpacingMap): spacing is ResponsiveSpacingMap =>
  typeof spacing === 'object'

const parseSpacingValue = (spacing?: SpacingValues): string | undefined => {
  if (!spacing || spacing === 'none') {
    return undefined
  }

  if (['condensed', 'normal', 'spacious'].includes(spacing as string)) {
    return `var(--brand-box-spacing-${spacing})`
  }

  return `var(--base-size-${spacing})`
}

const normalizeSpacing = (spacing?: SpacingValues | ResponsiveSpacingMap): (string | undefined)[] => {
  if (!isSpacingMap(spacing)) {
    const parsedSpacing = parseSpacingValue(spacing)
    return parsedSpacing ? [parsedSpacing] : []
  }

  return [parseSpacingValue(spacing.narrow), parseSpacingValue(spacing.regular), parseSpacingValue(spacing.wide)]
}

const spacingToCssVariables = <T extends Type>(
  type: T,
  spacings: (SpacingValues | ResponsiveSpacingMap | undefined)[],
  fallback?: SpacingValues | ResponsiveSpacingMap,
): VariableMap<T> => {
  const normalizedSpacings = spacings.map(spacing => normalizeSpacing(spacing ?? fallback))
  const variableMap = {} as VariableMap<T>

  for (const sizeIdx in sizes) {
    const values = normalizedSpacings.map(spacing => spacing[sizeIdx] ?? 0)

    const allZero = values.every(x => x === 0)
    if (allZero) continue

    const variableName: VariableType<T> = `--box-${sizes[sizeIdx]}-${type}`
    const allValuesAreEqual = values.every(x => x === values[0])

    variableMap[variableName] = allValuesAreEqual ? (values[0] as string) : values.join(' ')
  }

  return variableMap
}

/**
 * Use Box to apply fine-grained styling to content.
 * @see https://primer.style/brand/components/Box
 */
export const Box = ({
  animate,
  children,
  className,
  style,
  padding,
  paddingBlockStart,
  paddingInlineEnd,
  paddingBlockEnd,
  paddingInlineStart,
  margin,
  marginBlockStart,
  marginInlineEnd,
  marginBlockEnd,
  marginInlineStart,
  backgroundColor,
  borderRadius,
  borderWidth,
  borderBlockStartWidth,
  borderInlineEndWidth,
  borderBlockEndWidth,
  borderInlineStartWidth,
  borderColor,
  borderStyle,
  ...rest
}: BoxProps) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const backgroundColorClasses = useMemo(() => classBuilder('backgroundColor', backgroundColor), [backgroundColor])
  const borderRadiusClasses = useMemo(() => classBuilder('borderRadius', borderRadius), [borderRadius])
  const borderWidthClasses = useMemo(() => classBuilder('borderWidth', borderWidth), [borderWidth])
  const borderBlockStartWidthClasses = useMemo(
    () => classBuilder('borderBlockStartWidth', borderBlockStartWidth),
    [borderBlockStartWidth],
  )
  const borderInlineEndWidthClasses = useMemo(
    () => classBuilder('borderInlineEndWidth', borderInlineEndWidth),
    [borderInlineEndWidth],
  )
  const borderBlockEndWidthClasses = useMemo(
    () => classBuilder('borderBlockEndWidth', borderBlockEndWidth),
    [borderBlockEndWidth],
  )
  const borderInlineStartWidthClasses = useMemo(
    () => classBuilder('borderInlineStartWidth', borderInlineStartWidth),
    [borderInlineStartWidth],
  )
  const borderColorClasses = useMemo(() => classBuilder('borderColor', borderColor), [borderColor])
  const borderStyleClasses = useMemo(() => classBuilder('borderStyle', borderStyle), [borderStyle])

  const cssVariables = useMemo(() => {
    return {
      ...spacingToCssVariables('padBlock', [paddingBlockStart, paddingBlockEnd], padding),
      ...spacingToCssVariables('padInline', [paddingInlineStart, paddingInlineEnd], padding),
      ...spacingToCssVariables('marBlock', [marginBlockStart, marginBlockEnd], margin),
      ...spacingToCssVariables('marInline', [marginInlineStart, marginInlineEnd], margin),
    }
  }, [
    padding,
    paddingBlockStart,
    paddingBlockEnd,
    paddingInlineStart,
    paddingInlineEnd,
    margin,
    marginBlockStart,
    marginBlockEnd,
    marginInlineStart,
    marginInlineEnd,
  ])

  return (
    <div
      className={clsx(
        styles.Box,
        animationClasses,
        backgroundColorClasses,
        borderRadiusClasses,
        borderWidthClasses,
        borderBlockStartWidthClasses,
        borderInlineEndWidthClasses,
        borderBlockEndWidthClasses,
        borderInlineStartWidthClasses,
        borderColorClasses,
        borderStyleClasses,
        className,
      )}
      style={{
        ...animationInlineStyles,
        ...cssVariables,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
