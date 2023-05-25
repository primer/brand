import React, {PropsWithChildren, useMemo} from 'react'
import clsx from 'clsx'
import {InlineLink, InlineLinkProps} from '../'

import styles from './Text.module.css'

export const TextSizes = ['700', '600', '500', '400', '300', '200', '100'] as const
export const TextTags = ['p', 'span', 'div', 'strong', 'em'] as const
export const TextVariants = ['default', 'muted'] as const
export const TextWeights = ['heavy', 'extrabold', 'bold', 'semibold', 'medium', 'normal', 'light'] as const

export const defaultTextTag = TextTags[1]
export const defaultTextSize = TextSizes[3]
export const defaultTextVariant = TextVariants[0]

export type TextWeightVariants = (typeof TextWeights)[number]

export type ResponsiveWeightMap = {
  narrow?: TextWeightVariants
  regular?: TextWeightVariants
  wide?: TextWeightVariants
}

type AnchorProps = InlineLinkProps & React.HTMLAttributes<HTMLAnchorElement> & React.ReactElement<HTMLAnchorElement>

type RestrictedPolymorphism =
  | (React.HTMLAttributes<HTMLParagraphElement> & {as?: 'p'})
  | (React.HTMLAttributes<HTMLSpanElement> & {as?: 'span'})
  | (React.HTMLAttributes<HTMLDivElement> & {as?: 'div'})
  | (React.HTMLAttributes<HTMLElement> & {as?: 'strong'})
  | (React.HTMLAttributes<HTMLElement> & {as?: 'em'})

type TextTags = {
  /**
   * Applies the underlying HTML element
   */
  as?: (typeof TextTags)[number]
} & RestrictedPolymorphism

export type TextProps = {
  /**
   * Forward a custom HTML class attribute
   */
  className?: string
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
} & TextTags

export function Text({
  as = defaultTextTag,
  className,
  children,
  size = defaultTextSize,
  variant = defaultTextVariant,
  weight,
  ...rest
}: PropsWithChildren<TextProps>) {
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

  const textClassName = clsx(
    styles.Text,
    styles[`Text--${variant}`],
    styles[`Text--${size}`],
    weight && weightClass,
    className,
  )

  /**
   * Valid children like InlineLinks will inherit parent parameters for convenience.
   */
  const transformedChildren = React.Children.toArray(children).map(child => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      if (child.type === InlineLink) {
        return React.cloneElement(child, {
          size,
        } as AnchorProps)
      }
    }
    return child
  })

  if (as === 'p') {
    return (
      <p className={textClassName} {...rest}>
        {transformedChildren}
      </p>
    )
  }

  if (as === 'em') {
    return (
      <em className={textClassName} {...rest}>
        {transformedChildren}
      </em>
    )
  }

  if (as === 'div') {
    return (
      <div className={textClassName} {...rest}>
        {transformedChildren}
      </div>
    )
  }

  if (as === 'strong') {
    return (
      <strong className={textClassName} {...rest}>
        {transformedChildren}
      </strong>
    )
  }

  return (
    <span className={textClassName} {...rest}>
      {transformedChildren}
    </span>
  )
}
