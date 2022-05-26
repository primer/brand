import React, {PropsWithChildren} from 'react'
import clsx from 'clsx'
import styles from './Text.module.css'

export const TextSizes = ['700', '600', '500', '400', '300', '200', '100'] as const
export const TextTags = ['p', 'span', 'div'] as const
export const TextVariants = ['primary', 'secondary'] as const
export const defaultTextTag = TextTags[1]
export const defaultTextSize = TextSizes[3]
export const defaultTextVariant = TextVariants[0]

type RestrictedPolymorphism =
  | (React.HTMLAttributes<HTMLParagraphElement> & {as?: 'p'})
  | (React.HTMLAttributes<HTMLSpanElement> & {as?: 'span'})
  | (React.HTMLAttributes<HTMLDivElement> & {as?: 'div'})

type TextTags = {
  /**
   * Applies the underlying HTML element
   */
  as?: typeof TextTags[number]
} & RestrictedPolymorphism

type TextProps = {
  /**
   * Forward a custom HTML class attribute
   */
  className?: string
  /**
   * Specify the text size
   */
  size?: typeof TextSizes[number]
  /**
   * Specify alternative text appearance
   */
  variant?: typeof TextVariants[number]
} & TextTags

export function Text({
  as = defaultTextTag,
  className,
  children,
  size = defaultTextSize,
  variant = defaultTextVariant,
  ...rest
}: PropsWithChildren<TextProps>) {
  const headingClassNames = clsx(styles.Text, styles[`Text--${variant}`], styles[`Text--${size}`], className)

  if (as === 'p') {
    return (
      <p className={headingClassNames} {...rest}>
        {children}
      </p>
    )
  }

  if (as === 'div') {
    return (
      <div className={headingClassNames} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <span className={headingClassNames} {...rest}>
      {children}
    </span>
  )
}
