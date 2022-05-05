import React, {PropsWithChildren} from 'react'
import clsx from 'clsx'
import styles from './Heading.module.css'

export const HeadingSizes = ['1000', '900', '800', '700', '600', '500', '400'] as const
export const HeadingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
export const defaultHeadingTag = HeadingTags[1]
export const defaultHeadingSize = HeadingSizes[3]

type HeadingTags = {
  as?: typeof HeadingTags[number]
} & React.HTMLAttributes<HTMLHeadingElement>

type HeadingProps = {
  className?: string
  size?: typeof HeadingSizes[number]
} & HeadingTags

export function Heading({
  className,
  children,
  size = defaultHeadingSize,
  as = defaultHeadingTag,
  ...rest
}: PropsWithChildren<HeadingProps>) {
  const headingClassNames = clsx(className, styles.Heading, styles[`Heading--${size}`])

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
