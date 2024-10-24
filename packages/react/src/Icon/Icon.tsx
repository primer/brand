import React, {type SVGAttributes} from 'react'
import styles from './Icon.module.css'
import clsx from 'clsx'
import {type Icon as OcticonProps} from '@primer/octicons-react'
import {Colors} from '../constants'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon/colors.css'

export const namedIconSizes = ['small', 'medium', 'large'] as const
export type NamedIconSize = (typeof namedIconSizes)[number]

export const numericIconSizes = [12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52] as const
export type NumericIconSize = (typeof numericIconSizes)[number]
const isNumericIconSize = (size: IconSize): size is NumericIconSize => typeof size === 'number'

export const iconSizes = [...namedIconSizes, ...numericIconSizes] as const
export type IconSize = (typeof iconSizes)[number]

export const defaultIconSize = iconSizes[0]
export const iconSizeMap: Record<NamedIconSize, NumericIconSize> = {
  small: 20,
  medium: 32,
  large: 44,
}

const getIconSize = (size: IconSize): NumericIconSize => {
  if (isNumericIconSize(size)) {
    return size
  }

  return iconSizeMap[size]
}

const getIconPaddingClass = (size: NumericIconSize): string => {
  switch (true) {
    case size < 28:
      return styles[`Icon--padding-8`]
    case size < 48:
      return styles[`Icon--padding-12`]
    case size < 52:
      return styles[`Icon--padding-16`]
    default:
      return styles[`Icon--padding-20`]
  }
}

export const iconColors = Colors
export type IconColor = (typeof iconColors)[number]
export const defaultIconColor = iconColors[0]

export type IconProps = SVGAttributes<SVGElement> & {
  icon: OcticonProps
  color?: IconColor
  hasBackground?: boolean
  size?: IconSize
}

export const Icon = ({
  icon: Octicon,
  className,
  color = defaultIconColor,
  hasBackground = false,
  size = defaultIconSize,
  ...rest
}: IconProps) => {
  const iconSize = getIconSize(size)

  return (
    <Octicon
      className={clsx(
        styles['Icon'],
        styles[`Icon--color-${color}`],
        getIconPaddingClass(iconSize),
        !hasBackground && styles['Icon--noBackground'],
        className,
      )}
      size={iconSize}
      {...rest}
    />
  )
}
