import React, {HTMLAttributes} from 'react'
import styles from './Icon.module.css'
import clsx from 'clsx'
import {Icon as IconProps} from '@primer/octicons-react'
import {Colors} from '../constants'

export const IconColors = Colors
export const defaultIconColor = IconColors[0]

/**
 * Design Tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon/colors.css'

type BrandIconProps = HTMLAttributes<HTMLSpanElement> & {
  icon: IconProps
  color?: (typeof IconColors)[number]
  hasBackground?: boolean
}

export const Icon = ({icon, className, color = defaultIconColor, hasBackground = false, ...rest}: BrandIconProps) => (
  <span className={clsx(styles.Icon, styles[`Icon--color-${color}`], hasBackground && styles['Icon--badge'], className)} {...rest}>
    {icon}
  </span>
)
