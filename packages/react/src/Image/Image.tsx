import React from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'

import type {BaseProps} from '../component-helpers'

type AspectRatio = '1:1' | '16:9' | '16:10' | '4:3' | [number, number]

export type ImageProps =
  | (BaseProps<HTMLImageElement> & {
      alt: string
      isPicture: false
      aspectRatio: AspectRatio
    })
  | (BaseProps<HTMLPictureElement> & {
      alt: string
      isPicture: true
      aspectRatio: AspectRatio
    })
  | (BaseProps<HTMLImageElement> & {
      alt: string
      isPicture: false
      aspectRatio: undefined
    })

const aspectRatioResolver = (ratio?: AspectRatio) => {
  if (typeof ratio === 'undefined') return 'initial'
  if (typeof ratio === 'string') {
    const [width, height] = ratio.split(':').map(Number)
    return `${width} / ${height}`
  }
  const [width, height] = ratio
  return `${width} / ${height}`
}

export const Image = ({className, aspectRatio, isPicture, ref, alt, ...rest}: ImageProps) => {
  if (aspectRatio && isPicture) {
    return (
      <picture className={styles['Image-container']} ref={ref} style={{aspectRatio: aspectRatioResolver(aspectRatio)}}>
        <img alt={alt} className={clsx(styles.Image, className)} {...rest} />
      </picture>
    )
  }
  if (aspectRatio) {
    return (
      <span className={styles['Image-container']} style={{aspectRatio: aspectRatioResolver(aspectRatio)}}>
        <img ref={ref} alt={alt} className={clsx(styles.Image, className)} {...rest} />
      </span>
    )
  }
  return <img ref={ref} alt={alt} className={clsx(styles.Image, className)} {...rest} />
}
