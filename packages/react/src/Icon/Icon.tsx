import React, {HTMLAttributes} from 'react'
import styles from './Icon.module.css'
import clsx from 'clsx'
import {Icon as IconProps} from '@primer/octicons-react'
import {Colors} from '../constants'

/**
 * Design Tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon/colors.css'

export const IconColors = Colors
export const defaultIconColor = IconColors[0]

type BrandIconProps = HTMLAttributes<HTMLSpanElement> & {
  icon: IconProps
  color?: (typeof IconColors)[number]
  hasBackground?: boolean
}

export const Icon = ({
  icon: BrandIcon,
  className,
  color = defaultIconColor,
  hasBackground = false,
  ...rest
}: BrandIconProps) => (
  <span
    className={clsx(styles.Icon, styles[`Icon--color-${color}`], hasBackground && styles['Icon--badge'], className)}
    {...rest}
  >
    <BrandIcon />
  </span>
)
