import clsx from 'clsx'
import React, {useCallback} from 'react'
import {ExpandableArrow} from '../ExpandableArrow'
import {Text} from '../Text'

import styles from './Link.module.css'

export type LinkProps = {
  /**
   * The size variations available in Link
   */
  size?: 'medium' | 'large'
  /**
   * Position of the arrow.
   */
  arrowDirection?: 'start' | 'end'
} & React.ComponentPropsWithoutRef<'a'>

/**
 * Links connect users to related content.
 * These are not intended to be used as a call-to-action.
 */
export function Link({
  size = 'medium',
  className,
  children,
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
    medium: '300',
    large: '400',
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
      className={clsx(styles.Link, styles[`Link--${size}`], styles[`Link--arrow-${arrowDirection}`], className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...props}
    >
      {arrowDirection === 'start' && (
        <ExpandableArrow className={styles['Link-arrow']} expanded={isHovered || isFocused} reverse hidden />
      )}
      <Text as="span" size={sizeMap[size]} className={clsx(styles['Link--label'])}>
        {children}
      </Text>
      {arrowDirection === 'end' && (
        <ExpandableArrow className={styles['Link-arrow']} expanded={isHovered || isFocused} hidden />
      )}
    </a>
  )
}
