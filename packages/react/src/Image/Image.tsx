import React from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'
import {BaseProps} from '../component-helpers'
import {useAnimation} from '../AnimationProvider'

export type ImageAspectRatio = '1:1' | '16:9' | '16:10' | '4:3' | 'custom'

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement> & {
    src: string
    alt: string
    aspectRatio?: ImageAspectRatio
    media?: string
    srcSet?: Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'>
  } & (
    | {
        as?: 'img' // assuming this is true for others to be required
        srcSet?: Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'>
      }
    | {
        as: 'picture' // assuming this is true for others to be required
        sources?: {
          srcset: string
          media: string
        }[]
        srcSet?: undefined
      }
  )

const aspectRatioResolver = (ratio?: ImageAspectRatio) => {
  if (typeof ratio === 'string') {
    if (ratio === 'custom') return 'custom'
    const [width, height] = ratio.split(':').map(Number)
    return `${width}-${height}`
  }
}

const objectWithoutKey = (object, key) => {
  const {[key]: deletedKey, ...otherKeys} = object
  return otherKeys
}

export const Image = ({
  animate,
  aspectRatio,
  className,
  as = 'img',
  ref,
  alt,
  width,
  height,
  media,
  srcSet,
  style,
  ...rest
}: ImageProps) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)
  if (as === 'picture') {
    return (
      <picture
        className={clsx(
          animationClasses,
          styles['Image__container'],
          aspectRatio && styles[`Image--aspect-ratio-${aspectRatioResolver(aspectRatio)}`]
        )}
        style={{...animationInlineStyles, ...style}}
      >
        {rest['sources'] &&
          rest['sources'].map((source, index) => <source key={index} srcSet={source.srcset} media={source.media} />)}
        {srcSet && <source srcSet={srcSet} media={media} />}
        <img
          ref={ref}
          alt={alt}
          width={width ?? '100%'}
          height={width ?? '100%'}
          className={clsx(styles.Image, className)}
          {...objectWithoutKey(rest, 'sources')}
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
          className={clsx(animationClasses, styles.Image, className)}
          srcSet={srcSet}
          style={{...animationInlineStyles, ...style}}
          {...rest}
        />
      </span>
    )
  }
  return (
    <img
      ref={ref}
      alt={alt}
      className={clsx(animationClasses, styles.Image, className)}
      width={width && width}
      height={height && height}
      srcSet={srcSet}
      style={{...animationInlineStyles, ...style}}
      {...rest}
    />
  )
}
