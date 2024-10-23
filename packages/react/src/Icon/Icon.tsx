import React, {type SVGAttributes} from 'react'
import styles from './Icon.module.css'
import clsx from 'clsx'
import {Icon as OcticonProps} from '@primer/octicons-react'
import {Colors} from '../constants'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon/colors.css'

export const iconSizes = ['small', 'medium', 'large'] as const
export type IconSize = (typeof iconSizes)[number]
export const defaultIconSize = iconSizes[0]
export const iconSizeMap: Record<IconSize, number> = {
  small: 20,
  medium: 32,
  large: 44,
}

export const iconColors = Colors
export type IconColor = (typeof Colors)[number]
export const defaultIconColor = Colors[0]

export type IconProps = SVGAttributes<SVGElement> & {
  icon: OcticonProps
  color?: IconColor
  hasBackground?: boolean
  size?: IconSize
}

const getIconSize = (size: IconSize, hasBackground: boolean): number => {
  if (hasBackground) {
    return iconSizeMap.small
  }

  return iconSizeMap[size]
}

export const Icon = ({
  icon: Octicon,
  className,
  color = defaultIconColor,
  hasBackground = false,
  size = defaultIconSize,
  ...rest
}: IconProps) => (
  <Octicon
    className={clsx(
      styles[`Icon--color-${color}`],
      hasBackground ? styles['Icon--background'] : styles['Icon--noBackground'],
      className,
    )}
    size={getIconSize(size, hasBackground)}
    {...rest}
  />
)
