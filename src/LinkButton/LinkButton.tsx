import clsx from 'clsx'
import React from 'react'
import {ExpandableArrow} from '../ExpandableArrow'
import styles from './LinkButton.module.css'

// NOTE: We may rename this component `LinkStyledAsButton` or consolidate it into
// a single polymorphic `Button` component that can render as a link or a button.
// See this discussion for more details: https://github.com/github/design-infrastructure/discussions/2310

export type LinkButtonProps = {
  href: string
  variant?: 'primary' | 'secondary'
} & React.ComponentPropsWithoutRef<'a'>

export function LinkButton({
  variant = 'secondary',
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: LinkButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  return (
    <a
      className={clsx(styles.LinkButton, styles[`LinkButton--${variant}`], className)}
      onMouseEnter={event => {
        setIsHovered(true)
        onMouseEnter?.(event)
      }}
      onMouseLeave={event => {
        setIsHovered(false)
        onMouseLeave?.(event)
      }}
      onFocus={event => {
        setIsFocused(true)
        onFocus?.(event)
      }}
      onBlur={event => {
        setIsFocused(false)
        onBlur?.(event)
      }}
      {...props}
    >
      {children}
      <ExpandableArrow className={styles['LinkButton-arrow']} expanded={isHovered || isFocused} />
    </a>
  )
}
