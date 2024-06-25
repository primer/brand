import React from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'
import {BaseProps} from '../component-helpers'
import {useAnimation} from '../animation'

export const ImageBorderRadiusOptions = ['small', 'medium', 'large', 'xlarge', 'full'] as const
export type ImageBorderRadiusOptions = (typeof ImageBorderRadiusOptions)[number]
export type ImageAspectRatio = '1:1' | '16:9' | '16:10' | '4:3' | 'custom'

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & BaseProps<HTMLImageElement> & {as?: 'img'; alt: string}
type PictureProps = React.HTMLAttributes<HTMLPictureElement> &
  BaseProps<HTMLPictureElement> & {
    as: 'picture'
  }

type CustomProps = {
  borderRadius?: ImageBorderRadiusOptions
}

type NewImageProps = (ImgProps | PictureProps) & CustomProps

export const NewImage = ({animate, as = 'img', borderRadius, className, style, ...props}: NewImageProps) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const commonProps = {
    className: clsx(animationClasses, styles.Image, styles[`Image--borderRadius-${borderRadius}`], className),
    style: {...animationInlineStyles, ...style},
  }

  return as === 'img' ? (
    // alt prop is a required prop in {...props}
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...commonProps} {...(props as ImgProps)} />
  ) : (
    <picture {...commonProps} {...(props as PictureProps)} />
  )
}

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement> & {
    src: string
    alt: string
    aspectRatio?: ImageAspectRatio
    media?: string
    /*
     * Apply a system-level border radius value
     */
    borderRadius?: ImageBorderRadiusOptions
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

  return (
    <NewImage
      animate={animate}
      as={as}
      borderRadius={borderRadius}
      className={clsx(className)}
      style={style}
      {...rest}
    />
  )
}

/**
 * What does this component actually do?
 * - Adds guardrails around border radius
 * - Makes src required
 * - Makes alt required
 */

// TODO Test whether aspectRatio actually works. If it doesn't I can remove support
