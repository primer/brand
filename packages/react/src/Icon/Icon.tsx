import React, {type SVGAttributes} from 'react'
import styles from './Icon.module.css'
import clsx from 'clsx'
import {Icon as OcticonProps} from '@primer/octicons-react'
import {Colors} from '../constants'

/**
 * Design Tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon/colors.css'

export const IconColors = Colors
export const defaultIconColor = IconColors[0]

export type IconProps = SVGAttributes<SVGElement> & {
  icon: OcticonProps
  color?: (typeof IconColors)[number]
  hasBackground?: boolean
}

export const Icon = ({
  icon: Octicon,
  className,
  color = defaultIconColor,
  hasBackground = false,
  ...rest
}: IconProps) => (
  <Octicon
    className={clsx(styles[`Icon--color-${color}`], hasBackground && styles['Icon--badge'], className)}
    size={20}
    {...rest}
  />
)
