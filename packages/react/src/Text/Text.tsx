import React, {PropsWithChildren, useMemo} from 'react'
import {clsx} from 'clsx'
import {useAnimation} from '../'
import styles from './Text.module.css'
import {BaseProps} from '../component-helpers'

export const TextSizes = ['1000', '900', '800', '700', '600', '500', '400', '350', '300', '200', '100'] as const
export const TextTags = ['p', 'span', 'div', 'strong', 'em'] as const
export const TextVariants = ['default', 'muted'] as const
export const TextWeights = [
  'heavy',
  'extrabold',
  'bold',
  'semibold',
  'medium',
  'normal',
  'light',
  'extralight',
] as const
export const TextFontVariants = ['mona-sans', 'hubot-sans', 'monospace'] as const

export const defaultTextTag = TextTags[1]
export const defaultTextSize = TextSizes[9]
export const defaultTextVariant = TextVariants[0]
export const defaultFontVariant = TextFontVariants[0]

export type TextWeightVariants = (typeof TextWeights)[number]
export type TextFontVariants = (typeof TextFontVariants)[number]

export type ResponsiveWeightMap = {
  narrow?: TextWeightVariants
  regular?: TextWeightVariants
  wide?: TextWeightVariants
}

type RestrictedPolymorphism =
  | (React.HTMLAttributes<HTMLParagraphElement> & BaseProps<HTMLParagraphElement> & {as?: 'p'})
  | (React.HTMLAttributes<HTMLSpanElement> & BaseProps<HTMLSpanElement> & {as?: 'span'})
  | (React.HTMLAttributes<HTMLDivElement> & BaseProps<HTMLDivElement> & {as?: 'div'})
  | (React.HTMLAttributes<HTMLElement> & BaseProps<HTMLElement> & {as?: 'strong'})
  | (React.HTMLAttributes<HTMLElement> & BaseProps<HTMLElement> & {as?: 'em'})

type TextTags = {
  /**
   * Applies the underlying HTML element
   */
  as?: (typeof TextTags)[number]
} & RestrictedPolymorphism

export type TextProps = {
  font?: TextFontVariants
  /**
   * Specify the text size
   */
  size?: (typeof TextSizes)[number]
  /**
   * Specify alternative text appearance
   */
  variant?: (typeof TextVariants)[number]
  /**
   * Specify the text weight
   */
  weight?: TextWeightVariants | ResponsiveWeightMap
  /**
   * Specify the text alignment.
   * Corresponds to the CSS `text-align` property.
   * Note: Only applies to block elements.
   */
  align?: 'start' | 'center' | 'end'
  /**
   * Toggle antialiasing on or off
   */
  hasAntiAliasing?: boolean
} & TextTags

export function Text({
  align,
  animate,
  as = defaultTextTag,
  className,
  children,
  font = defaultFontVariant,
  size = defaultTextSize,
  variant = defaultTextVariant,
  weight,
  style,
  hasAntiAliasing = true,
  ...rest
}: PropsWithChildren<TextProps>) {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const weightClass = useMemo(() => {
    if (!weight) return null

    return typeof weight === 'string'
      ? styles[`Text--weight-${weight}`]
      : Object.keys(weight)
          .map(viewport => {
            return styles[`Text-${viewport}--weight-${weight[viewport]}`]
          })
          .join(' ')
  }, [weight])

  const dontApplyAA = Boolean(
    // When explicitly disabled
    !hasAntiAliasing ||
      // When selected font weight is not suitable for anti-aliasing
      (weight && ['light', 'extralight'].includes(weight as TextWeightVariants) && ['100', '200'].includes(size)) ||
      // When size is too small
      size === '100',
  )

  const textClassName = clsx(
    animationClasses,
    styles.Text,
    styles[`Text-font--${font}`],
    styles[`Text--${variant}`],
    styles[`Text--${size}`],
    !dontApplyAA && styles['Text--antialiased'],
    weight && weightClass,
    align && styles[`Text-align--${align}`],
    className,
  )

  if (as === 'p') {
    return (
      <p
        className={textClassName}
        style={{...animationInlineStyles, ...style}}
        {...(rest as BaseProps<HTMLParagraphElement>)}
      >
        {children}
      </p>
    )
  }

  if (as === 'em') {
    return (
      <em className={textClassName} style={{...animationInlineStyles, ...style}} {...rest}>
        {children}
      </em>
    )
  }

  if (as === 'div') {
    return (
      <div
        className={textClassName}
        style={{...animationInlineStyles, ...style}}
        {...(rest as BaseProps<HTMLDivElement>)}
      >
        {children}
      </div>
    )
  }

  if (as === 'strong') {
    return (
      <strong className={textClassName} style={{...animationInlineStyles, ...style}} {...rest}>
        {children}
      </strong>
    )
  }

  return (
    <span className={textClassName} style={{...animationInlineStyles, ...style}} {...rest}>
      {children}
    </span>
  )
}
