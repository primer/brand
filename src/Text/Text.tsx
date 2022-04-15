import React from 'react'
import clsx from 'clsx'
import styles from './Text.module.css'

type TextProps = {
  className?: string
  children: string | React.ReactElement
  variant?: '700' | '600' | '500' | '400' | '300' | '200' | '100'
}

// might want to offer a span instead of p?
export function Text({className, children, variant = '400'}: TextProps) {
  const textClassNames = clsx(className, styles[`Text--${variant}`])
  return <p className={textClassNames}>{children}</p>
}
