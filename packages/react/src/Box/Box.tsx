import {default as clsx} from 'clsx'
import React, {PropsWithChildren, useMemo} from 'react'
import {AnimateProps, useAnimation} from '../animation'
import type {BaseProps} from '../component-helpers'
import {BaseSizeScale} from '../constants'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Box.module.css'

export const BoxSpacingValues = ['condensed', 'normal', 'spacious', ...BaseSizeScale] as const
type SpacingValues = (typeof BoxSpacingValues)[number]

type ResponsiveSpacingMap = {
  narrow?: SpacingValues
  regular?: SpacingValues
  wide?: SpacingValues
}

export const BoxBackgroundColors = ['default', 'inset', 'subtle', 'overlay'] as const
type BackgroundColors = (typeof BoxBackgroundColors)[number]

export const BoxBorderRadiusOptions = ['small', 'medium', 'large', 'full'] as const
type BorderRadiusOptions = (typeof BoxBorderRadiusOptions)[number]

export const BoxBorderWidthOptions = ['thin', 'thick', 'thicker'] as const
type BorderWidthOptions = (typeof BoxBorderWidthOptions)[number]

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
  paddingTop?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding padding on the internal right side of the Box
   */
  paddingRight?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding padding on the internal bottom side of the Box
   */
  paddingBottom?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding padding on the internal left side of the Box
   */
  paddingLeft?: SpacingValues | ResponsiveSpacingMap
  /*
   * Adding margin on all external sides of the Box
   */
  margin?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding margin on the external top side of the Box
   */
  marginTop?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding margin on the external right side of the Box
   */
  marginRight?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding margin on the external bottom side of the Box
   */
  marginBottom?: SpacingValues | ResponsiveSpacingMap
  /**
   * Adding margin on the external left side of the Box
   */
  marginLeft?: SpacingValues | ResponsiveSpacingMap
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
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  backgroundColor,
  borderRadius,
  borderWidth,
  borderColor,
  borderStyle,
}: PropsWithChildren<BoxProps>) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const paddingClasses = useMemo(() => classBuilder('padding', padding), [padding])
  const paddingTopClasses = useMemo(() => classBuilder('paddingTop', paddingTop), [paddingTop])
  const paddingRightClasses = useMemo(() => classBuilder('paddingRight', paddingRight), [paddingRight])
  const paddingBottomClasses = useMemo(() => classBuilder('paddingBottom', paddingBottom), [paddingBottom])
  const paddingLeftClasses = useMemo(() => classBuilder('paddingLeft', paddingLeft), [paddingLeft])
  const marginClasses = useMemo(() => classBuilder('margin', margin), [margin])
  const marginTopClasses = useMemo(() => classBuilder('marginTop', marginTop), [marginTop])
  const marginRightClasses = useMemo(() => classBuilder('marginRight', marginRight), [marginRight])
  const marginBottomClasses = useMemo(() => classBuilder('marginBottom', marginBottom), [marginBottom])
  const marginLeftClasses = useMemo(() => classBuilder('marginLeft', marginLeft), [marginLeft])
  const backgroundColorClasses = useMemo(() => classBuilder('backgroundColor', backgroundColor), [backgroundColor])
  const borderRadiusClasses = useMemo(() => classBuilder('borderRadius', borderRadius), [borderRadius])
  const borderWidthClasses = useMemo(() => classBuilder('borderWidth', borderWidth), [borderWidth])
  const borderColorClasses = useMemo(() => classBuilder('borderColor', borderColor), [borderColor])
  const borderStyleClasses = useMemo(() => classBuilder('borderStyle', borderStyle), [borderStyle])

  return (
    <div
      className={clsx(
        animationClasses,
        paddingClasses,
        paddingTopClasses,
        paddingRightClasses,
        paddingBottomClasses,
        paddingLeftClasses,
        marginClasses,
        marginTopClasses,
        marginRightClasses,
        marginBottomClasses,
        marginLeftClasses,
        backgroundColorClasses,
        borderRadiusClasses,
        borderWidthClasses,
        borderColorClasses,
        borderStyleClasses,
        className,
      )}
      data-testid={testId}
      style={{
        ...animationInlineStyles,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
