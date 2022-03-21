import clsx from 'clsx'
import React from 'react'
import styles from './LinkButton.module.css'

// QUESTION: Are buttons always links in marketing sites?

export type LinkButtonProps = {
  variant?: 'primary' | 'secondary' // QUESTION: Should `secondary` be the default?
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'className'> // Omitting `className` to prevent style overrides

export function LinkButton({variant = 'secondary', ...props}: LinkButtonProps) {
  return <a className={clsx(styles['link-button'])} {...props} />
}
