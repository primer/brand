import React, {PropsWithChildren} from 'react'
import clsx from 'clsx'
import styles from './Text.module.css'

export const TextSizes = ['700', '600', '500', '400', '300', '200', '100'] as const

type RestrictedPolymorphism =
  | (React.HTMLAttributes<HTMLParagraphElement> & {as?: 'p'})
  | (React.HTMLAttributes<HTMLSpanElement> & {as?: 'span'})
  | (React.HTMLAttributes<HTMLDivElement> & {as?: 'div'})

type TextTags = {
  as?: 'p' | 'span' | 'div'
} & RestrictedPolymorphism

type TextProps = {
  className?: string
  size?: typeof TextSizes[number]
} & TextTags

export function Text({className, children, size = '400', as = 'span', ...rest}: PropsWithChildren<TextProps>) {
  const headingClassNames = clsx(className, styles[`Text--${size}`])

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
