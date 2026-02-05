import {clsx} from 'clsx'
import React, {PropsWithChildren, useMemo} from 'react'
import {AnimateProps, useAnimation} from '../animation'
import type {BaseProps} from '../component-helpers'
import {BaseSizeScale} from '../constants'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Box.module.css'

export const BoxSpacingValues = ['none', 'condensed', 'normal', 'spacious', ...BaseSizeScale] as const
type SpacingValues = (typeof BoxSpacingValues)[number]

type ResponsiveSpacingMap = {
  narrow?: SpacingValues
  regular?: SpacingValues
  wide?: SpacingValues
}

export const BoxBackgroundColors = ['default', 'inset', 'subtle', 'overlay'] as const
type BackgroundColors = (typeof BoxBackgroundColors)[number] | AnyString

export const BoxBorderRadiusOptions = ['small', 'medium', 'large', 'xlarge', 'full'] as const
type BorderRadiusOptions = (typeof BoxBorderRadiusOptions)[number]

export const BoxBorderWidthOptions = ['none', 'thin', 'thick', 'thicker'] as const
type BorderWidthOptions = (typeof BoxBorderWidthOptions)[number]

type ResponsiveBorderWidthMap = {
  narrow?: BorderWidthOptions
  regular?: BorderWidthOptions
  wide?: BorderWidthOptions
}

export const BoxBorderColorOptions = ['default', 'muted', 'subtle'] as const
type BorderColorOptions = (typeof BoxBorderColorOptions)[number]

type BorderStyleOptions = Extract<React.CSSProperties['borderStyle'], 'solid' | 'none'>

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
  borderWidth?: BorderWidthOptions | ResponsiveBorderWidthMap
  /*
   * Apply a directional border width value
   */
  borderBlockStartWidth?: BorderWidthOptions | ResponsiveBorderWidthMap
  /*
   * Apply a directional border width value
   */
  borderInlineEndWidth?: BorderWidthOptions | ResponsiveBorderWidthMap
  /*
   * Apply a directional border width value
   */
  borderBlockEndWidth?: BorderWidthOptions | ResponsiveBorderWidthMap
  /*
   * Apply a directional border width value
   */
  borderInlineStartWidth?: BorderWidthOptions | ResponsiveBorderWidthMap
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
  /**
   * Test id for the Box
   */
  'data-testid'?: string
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>

const isNamedBackgroundColor = (value: string): value is (typeof BoxBackgroundColors)[number] =>
  BoxBackgroundColors.includes(value as (typeof BoxBackgroundColors)[number])

const classBuilder = (
  property: string,
  value?:
    | SpacingValues
    | ResponsiveSpacingMap
    | BackgroundColors
    | BorderRadiusOptions
    | BorderWidthOptions
    | ResponsiveBorderWidthMap
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

/**
 * Use Box to apply fine-grained styling to content.
 * @see https://primer.style/brand/components/Box
 */
export const Box = ({
  animate,
  children,
  className,
  'data-testid': testId,
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
}: PropsWithChildren<BoxProps>) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const paddingClasses = useMemo(() => classBuilder('padding', padding), [padding])
  const paddingBlockStartClasses = useMemo(
    () => classBuilder('paddingBlockStart', paddingBlockStart),
    [paddingBlockStart],
  )
  const paddingInlineEndClasses = useMemo(() => classBuilder('paddingInlineEnd', paddingInlineEnd), [paddingInlineEnd])
  const paddingBlockEndClasses = useMemo(() => classBuilder('paddingBlockEnd', paddingBlockEnd), [paddingBlockEnd])
  const paddingInlineStartClasses = useMemo(
    () => classBuilder('paddingInlineStart', paddingInlineStart),
    [paddingInlineStart],
  )
  const marginClasses = useMemo(() => classBuilder('margin', margin), [margin])
  const marginBlockStartClasses = useMemo(() => classBuilder('marginBlockStart', marginBlockStart), [marginBlockStart])
  const marginInlineEndClasses = useMemo(() => classBuilder('marginInlineEnd', marginInlineEnd), [marginInlineEnd])
  const marginBlockEndClasses = useMemo(() => classBuilder('marginBlockEnd', marginBlockEnd), [marginBlockEnd])
  const marginInlineStartClasses = useMemo(
    () => classBuilder('marginInlineStart', marginInlineStart),
    [marginInlineStart],
  )
  const backgroundColorClasses = useMemo(
    () =>
      backgroundColor && isNamedBackgroundColor(backgroundColor)
        ? classBuilder('backgroundColor', backgroundColor)
        : '',
    [backgroundColor],
  )
  const backgroundColorStyles = useMemo(
    () => (backgroundColor && !isNamedBackgroundColor(backgroundColor) ? {backgroundColor} : {}),
    [backgroundColor],
  )
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

  return (
    <div
      className={clsx(
        animationClasses,
        paddingClasses,
        paddingBlockStartClasses,
        paddingInlineEndClasses,
        paddingBlockEndClasses,
        paddingInlineStartClasses,
        marginClasses,
        marginBlockStartClasses,
        marginInlineEndClasses,
        marginBlockEndClasses,
        marginInlineStartClasses,
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
      data-testid={testId}
      style={{
        ...animationInlineStyles,
        ...backgroundColorStyles,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
