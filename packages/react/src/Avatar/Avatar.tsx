import React, {forwardRef, useMemo} from 'react'
import clsx from 'clsx'
import styles from './Avatar.module.css'

import type {BaseProps} from '../component-helpers'

export const AvatarSizes = [32, 40, 48] as const

type AvatarSizeVariants = typeof AvatarSizes[number]

type ResponsiveSizeMap = {
  narrow?: AvatarSizeVariants
  regular?: AvatarSizeVariants
  wide?: AvatarSizeVariants
}

export type AvatarProps = BaseProps<HTMLSpanElement> & {
  size?: typeof AvatarSizes[number] | ResponsiveSizeMap
  src: string
  alt: string
} & React.HTMLAttributes<HTMLSpanElement>

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({alt, className, size = AvatarSizes[1], src, ...props}, ref) => {
    const sizeClass = useMemo(() => {
      return typeof size === 'number'
        ? styles[`Avatar--size-${size}`]
        : Object.keys(size)
            .map(viewport => {
              return styles[`Avatar-${viewport}--size-${size[viewport]}`]
            })
            .join(' ')
    }, [size])

    return (
      <span ref={ref} className={clsx(styles.Avatar, sizeClass, className)} {...props}>
        <img src={src} alt={alt} />
      </span>
    )
  }
)
