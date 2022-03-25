import clsx from 'clsx'
import React from 'react'
import styles from './LinkButton.module.css'

// QUESTION: Are buttons always links in marketing sites?

export type LinkButtonProps = {
  href: string
  variant?: 'primary' | 'secondary' // QUESTION: Should `secondary` be the default?
} & React.ComponentPropsWithoutRef<'a'>

export function LinkButton({variant = 'secondary', className, ...props}: LinkButtonProps) {
  return <a className={clsx(styles.LinkButton, styles[`LinkButton--${variant}`], className)} {...props} />
}
