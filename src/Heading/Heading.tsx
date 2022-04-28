import React, {PropsWithChildren} from 'react'
import clsx from 'clsx'
import styles from './Heading.module.css'

export const HeadingSizes = ['1000', '900', '800', '750', '650', '550', '450', '400'] as const

type HeadingTags = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & React.HTMLAttributes<HTMLHeadingElement>

type HeadingProps = {
  className?: string
  size?: typeof HeadingSizes[number]
} & HeadingTags

export function Heading({className, children, size = '1000', as = 'h1', ...rest}: PropsWithChildren<HeadingProps>) {
  const headingClassNames = clsx(className, styles[`Heading--${size}`])

  const HeadingComponent = React.useCallback(
    ({...props}: React.HTMLAttributes<HTMLHeadingElement>) => React.createElement(as, props, children),
    [as, children]
  )

  return (
    <HeadingComponent className={headingClassNames} {...rest}>
      {children}
    </HeadingComponent>
  )
}
