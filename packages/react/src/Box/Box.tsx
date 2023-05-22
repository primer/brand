import React, {HTMLAttributes, PropsWithChildren} from 'react'
import {useAnimation} from '../AnimationProvider'
import type {BaseProps} from '../component-helpers'
import clsx from 'clsx'

export type BoxProps<T extends keyof JSX.IntrinsicElements = 'div'> = React.HTMLAttributes<T> & {
  as?: T | 'div' | 'span' | 'section'
} & (T extends 'span'
    ? BaseProps<HTMLSpanElement>
    : T extends 'section'
    ? BaseProps<HTMLElement>
    : T extends 'section'
    ? BaseProps<HTMLDivElement>
    : BaseProps<HTMLElement>)

/**
 * A flexible layout component that can be rendered as any HTML element.
 */
export function Box({animate, as = 'div', children, className, style, ...rest}: PropsWithChildren<BoxProps>) {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)
  const validElements = ['div', 'span', 'section']
  const Component = validElements.includes(as) ? as : 'div'

  return (
    <Component
      className={clsx(animationClasses, className)}
      style={{
        ...animationInlineStyles,
        ...style
      }}
      {...(rest as HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Component>
  )
}
