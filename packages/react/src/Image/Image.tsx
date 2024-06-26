import React from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'
import {BaseProps} from '../component-helpers'
import {useAnimation} from '../animation'

export const ImageBorderRadiusOptions = ['small', 'medium', 'large', 'xlarge', 'full'] as const
export type ImageBorderRadiusOptions = (typeof ImageBorderRadiusOptions)[number]

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement> & {alt: string; borderRadius?: ImageBorderRadiusOptions}

<<<<<<< HEAD
export const Image = ({animate, as = 'img', borderRadius, className, style, media, ...rest}: ImageProps) => {
  if (as === 'picture') {
    // @ts-expect-error Incorrect typings from legacy code. Keeping as-is to avoid modifying API
    const {sources, srcSet, ...imgRest} = rest

    return (
      <NewImage animate={animate} as={as} borderRadius={borderRadius} className={clsx(className)} style={style}>
        {sources
          ? sources.map((source, index) => <source key={index} srcSet={source.srcset} media={source.media} />)
          : null}
        {srcSet && <source srcSet={srcSet} media={media} />}
        <img
          ref={ref}
          alt={alt}
          width={width ?? '100%'}
          height={height ?? '100%'}
          className={clsx(styles.Image, borderRadius && styles[`Image--borderRadius-${borderRadius}`], className)}
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
          className={clsx(
            animationClasses,
            styles.Image,
            borderRadius && styles[`Image--borderRadius-${borderRadius}`],
            className,
          )}
          srcSet={srcSet}
          style={{...animationInlineStyles, ...style}}
          {...rest}
        />
      </span>
    )
  }
||||||| parent of 4e5264d8 (removed picture support from Image component)
export const Image = ({animate, as = 'img', borderRadius, className, style, media, ...rest}: ImageProps) => {
  if (as === 'picture') {
    // @ts-expect-error Incorrect typings from legacy code. Keeping as-is to avoid modifying API
    const {sources, srcSet, ...imgRest} = rest

    return (
      <NewImage animate={animate} as={as} borderRadius={borderRadius} className={clsx(className)} style={style}>
        {sources
          ? sources.map((source, index) => <source key={index} srcSet={source.srcset} media={source.media} />)
          : null}
        {srcSet && <source srcSet={srcSet} media={media} />}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img {...imgRest} />
      </NewImage>
    )
  }
=======
export const Image = ({alt, animate, borderRadius, className, style, ...props}: ImageProps) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)
>>>>>>> 4e5264d8 (removed picture support from Image component)

  return (
    <img
      className={clsx(animationClasses, styles.Image, styles[`Image--borderRadius-${borderRadius}`], className)}
      style={{...animationInlineStyles, ...style}}
      alt={alt}
      {...props}
    />
  )
}
