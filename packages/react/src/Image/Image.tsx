import React from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'
import {BaseProps} from '../component-helpers'

type AspectRatio = '1:1' | '16:9' | '16:10' | '4:3' | 'custom'

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement> & {
    src: string
    alt: string
    as?: 'picture' | 'img'
    aspectRatio?: AspectRatio
    media?: string
    sources?: {
      srcset: string
      media: string
    }[]
  }

const aspectRatioResolver = (ratio?: AspectRatio) => {
  if (typeof ratio === 'string') {
    if (ratio === 'custom') return 'custom'
    const [width, height] = ratio.split(':').map(Number)
    return `${width}-${height}`
  }
}

export const Image = ({
  className,
  aspectRatio,
  as = 'img',
  ref,
  alt,
  width,
  height,
  media,
  srcSet,
  sources,
  ...rest
}: ImageProps) => {
  if (as === 'picture') {
    return (
      <picture
        className={clsx(
          styles['Image__container'],
          aspectRatio && styles[`Image--aspect-ratio-${aspectRatioResolver(aspectRatio)}`]
        )}
      >
        {sources && sources.map((source, index) => <source key={index} srcSet={source.srcset} media={source.media} />)}
        {srcSet && <source srcSet={srcSet} media={media} />}
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
          srcSet={srcSet}
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
      width={width && width}
      height={height && height}
      srcSet={srcSet}
      {...rest}
    />
  )
}
