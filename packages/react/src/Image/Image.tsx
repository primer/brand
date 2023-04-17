import React from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'

type AspectRatio = '1:1' | '16:9' | '16:10' | '4:3' | 'custom'

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  ref?: React.Ref<HTMLImageElement>
  as?: 'picture' | 'img'
  aspectRatio?: AspectRatio
}

const aspectRatioResolver = (ratio?: AspectRatio) => {
  if (typeof ratio === 'string') {
    if (ratio === 'custom') return 'custom'
    const [width, height] = ratio.split(':').map(Number)
    return `${width}-${height}`
  }
}

export const Image = ({className, aspectRatio, as = 'img', ref, alt, width, height, ...rest}: ImageProps) => {
  if (as === 'picture') {
    return (
      <picture
        className={clsx(
          styles['Image__container'],
          aspectRatio && styles[`Image--aspect-ratio-${aspectRatioResolver(aspectRatio)}`]
        )}
      >
        <img
          ref={ref}
          alt={alt}
          width={width ? width : '100%'}
          height={width ? width : '100%'}
          className={clsx(styles.Image, className)}
          {...rest}
        />
      </picture>
    )
  }
  if (aspectRatio) {
    return (
      <span
        className={clsx(styles['Image__container'], styles[`Image--aspect-ratio-${aspectRatioResolver(aspectRatio)}`])}
      >
        <img
          ref={ref}
          alt={alt}
          width={width ? width : '100%'}
          height={height ? height : '100%'}
          className={clsx(styles.Image, className)}
          {...rest}
        />
      </span>
    )
  }
  return (
    <img
      ref={ref}
      alt={alt}
      className={clsx(styles.Image, className)}
      width={width ? width : 'initial'}
      height={height ? height : 'initial'}
      {...rest}
    />
  )
}
