import React from 'react'
import clsx from 'clsx'
import styles from './Heading.module.css'

type HeadingProps = {
  className?: string
  children: string | React.ReactElement
  variant?: '1000' | '900' | '800' | '750' | '650' | '550' | '450'
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

// Note to Reza: I think the <h1> should be a prop (see above) but I'll let you decide the best way to engineer that :)
export function Heading({className, children, variant = '1000'}: HeadingProps) {
  const headingClassNames = clsx(className, styles[`Heading--${variant}`])
  return <h1 className={headingClassNames}>{children}</h1>
}
