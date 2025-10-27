import React, {forwardRef, useMemo} from 'react'
import {clsx} from 'clsx'
import styles from './Avatar.module.css'

import type {BaseProps} from '../component-helpers'

export const AvatarSizes = [32, 40, 48, 64, 80] as const
export const AvatarShapes = ['circle', 'square'] as const

type AvatarSizeVariants = (typeof AvatarSizes)[number]

type ResponsiveSizeMap = {
  narrow?: AvatarSizeVariants
  regular?: AvatarSizeVariants
  wide?: AvatarSizeVariants
}

export type AvatarProps = BaseProps<HTMLImageElement> & {
  size?: (typeof AvatarSizes)[number] | ResponsiveSizeMap
  shape?: (typeof AvatarShapes)[number]
  src: string
  alt: string
  ['data-testid']?: string
} & React.ImgHTMLAttributes<HTMLImageElement>

const testIds = {
  root: 'Avatar',
  get image() {
    return `${this.root}__image`
  },
}

const _Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({alt, className, size = AvatarSizes[1], shape = AvatarShapes[0], 'data-testid': testId, src, ...props}, ref) => {
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
      <span
        ref={ref}
        className={clsx(styles.Avatar, sizeClass, styles[`Avatar--shape-${shape}`], className)}
        data-testid={testId || testIds.root}
      >
        <img className={clsx(styles.Avatar__image)} src={src} alt={alt} data-testid={testIds.image} {...props} />
      </span>
    )
  },
)

export const Avatar = Object.assign(_Avatar, {testIds})
