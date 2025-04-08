import clsx from 'clsx'
import React, {useCallback} from 'react'
import {ExpandableArrow} from '../ExpandableArrow'
import {LinkExternalIcon} from '@primer/octicons-react'
import {Text} from '../Text'

import styles from './Link.module.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/link/colors-with-modes.css'

export const LinkVariants = ['default', 'accent'] as const
export const LinkSizes = ['medium', 'large'] as const
export const LinkArrowDirections = ['start', 'end', 'none'] as const

export type LinkProps = {
  /**
   * The size variations available in Link
   */
  size?: (typeof LinkSizes)[number]
  /**
   * Position of the arrow.
   */
  arrowDirection?: (typeof LinkArrowDirections)[number]
  /**
   * Show an external link icon
   */
  isExternal?: boolean
  /**
   * Specify alternative link appearance
   */
  variant?: (typeof LinkVariants)[number]
} & React.ComponentPropsWithoutRef<'a'>

/**
 * Links connect users to related content.
 * These are not intended to be used as a call-to-action.
 */
export function Link({
  size = 'medium',
  variant = 'default',
  className,
  children,
  isExternal,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  arrowDirection = 'end',
  ...props
}: LinkProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)

  const sizeMap = {
    medium: '200',
    large: '300',
  } as const

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      setIsHovered(!isHovered)
      onMouseEnter?.(event)
    },
    [onMouseEnter, isHovered],
  )

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      setIsHovered(!isHovered)
      onMouseLeave?.(event)
    },
    [onMouseLeave, isHovered],
  )

  const handleOnFocus = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement, Element>) => {
      setIsFocused(!isFocused)
      onFocus?.(event)
    },
    [onFocus, isFocused],
  )

  const handleOnBlur = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement, Element>) => {
      setIsFocused(!isFocused)
      onBlur?.(event)
    },
    [onBlur, isFocused],
  )

  return (
    <a
      className={clsx(
        styles.Link,
        styles[`Link--${size}`],
        !isExternal && styles[`Link--${variant}`],
        !isExternal && styles[`Link--arrow-${arrowDirection}`],
        isExternal && styles['Link--is-external'],
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...props}
    >
      {arrowDirection === 'start' && !isExternal && (
        <ExpandableArrow className={styles['Link-arrow']} expanded={isHovered || isFocused} reverse hidden />
      )}

      <Text as="span" size={sizeMap[size]} className={clsx(styles['Link--label'])}>
        {children}
      </Text>

      {arrowDirection === 'end' && !isExternal && (
        <ExpandableArrow className={styles['Link-arrow']} expanded={isHovered || isFocused} hidden />
      )}

      {isExternal && <LinkExternalIcon size={size === 'large' ? 20 : 16} aria-label="External link" />}
    </a>
  )
}
