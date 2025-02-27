import React, {cloneElement, isValidElement, type ReactElement, type SVGAttributes} from 'react'
import styles from './Icon.module.css'
import clsx from 'clsx'
import {type Icon as OcticonProps} from '@primer/octicons-react'
import {Colors} from '../constants'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon/colors.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon/colors-with-modes.css'

export const namedIconSizes = ['small', 'medium', 'large'] as const
export type NamedIconSize = (typeof namedIconSizes)[number]

export const numericIconSizes = [20, 24, 28, 32, 36, 40, 44] as const
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

export const iconColors = Colors
export type IconColor = (typeof iconColors)[number]
export const defaultIconColor = iconColors[0]

export type IconProps = SVGAttributes<SVGElement> & {
  icon: OcticonProps | ReactElement<OcticonProps>
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

  const iconProps = {
    size: iconSize,
    ...rest,
  }

  const iconComponent = isValidElement(Octicon) ? (
    cloneElement(Octicon as ReactElement<OcticonProps>, {
      ...Octicon.props,
      ...iconProps,
    })
  ) : (
    <Octicon {...iconProps} />
  )

  return (
    <span
      className={clsx(
        styles['Icon'],
        styles[`Icon--size-${iconSize}`],
        styles[`Icon--color-${color}`],
        hasBackground && [styles['Icon--background'], styles[`Icon--background-color-${color}`]],
        className,
      )}
    >
      {iconComponent}
    </span>
  )
}
