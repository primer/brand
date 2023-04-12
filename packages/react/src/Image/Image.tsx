import React from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'

type AspectRatio = '1:1' | '16:9' | '16:10' | '4:3' | [number, number]

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  ref?: React.Ref<HTMLImageElement>
  alt: string
  isPicture?: boolean
  aspectRatio?: AspectRatio
}

const aspectRatioResolver = (ratio?: AspectRatio) => {
  if (ratio === undefined) return 'initial'
  if (typeof ratio === 'string') {
    const [width, height] = ratio.split(':').map(Number)
    return `${width} / ${height}`
  }
  const [width, height] = ratio
  return `${width} / ${height}`
}

export const Image = ({className, aspectRatio, isPicture = false, ref, alt, width, height, ...rest}: ImageProps) => {
  if (isPicture) {
    return (
      <picture
        className={styles['Image-container']}
        style={{aspectRatio: aspectRatioResolver(aspectRatio), width, height}}
      >
        <img ref={ref} alt={alt} width={'100%'} height={'100%'} className={clsx(styles.Image, className)} {...rest} />
      </picture>
    )
  }
  if (aspectRatio) {
    return (
      <span
        className={styles['Image-container']}
        style={{aspectRatio: aspectRatioResolver(aspectRatio), width, height}}
      >
        <img ref={ref} alt={alt} width={'100%'} height={'100%'} className={clsx(styles.Image, className)} {...rest} />
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
