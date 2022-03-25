import clsx from 'clsx'
import React from 'react'
import styles from './LinkButton.module.css'

// NOTE: We may rename this component `LinkStyledAsButton` or consolidate it into
// a single polymorphic `Button` component that can render as a link or a button.
// See this discussion for more details: https://github.com/github/design-infrastructure/discussions/2310

export type LinkButtonProps = {
  href: string
  variant?: 'primary' | 'secondary'
} & React.ComponentPropsWithoutRef<'a'>

export function LinkButton({variant = 'secondary', className, ...props}: LinkButtonProps) {
  return <a className={clsx(styles.LinkButton, styles[`LinkButton--${variant}`], className)} {...props} />
}
