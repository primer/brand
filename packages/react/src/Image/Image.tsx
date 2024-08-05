import React from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'
import {AnimateProps, useAnimation} from '../animation'

export const ImageBorderRadiusOptions = ['small', 'medium', 'large', 'xlarge', 'full'] as const
export type ImageBorderRadiusOptions = (typeof ImageBorderRadiusOptions)[number]
export const ImageAspectRatios = ['1:1', '16:9', '16:10', '4:3', 'custom']
export type ImageAspectRatio = (typeof ImageAspectRatios)[number]

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  alt: string
  animate?: AnimateProps
  borderRadius?: ImageBorderRadiusOptions
  aspectRatio?: ImageAspectRatio
}

const getAspectRatioClassName = (aspectRatio?: ImageAspectRatio): string | null => {
  if (!aspectRatio) {
    return null
  }

  if (aspectRatio === 'custom') {
    return styles['Image--aspectRatio-custom']
  }

  const className = `Image--aspectRatio-${aspectRatio.replace(':', '-')}`

  return styles[className]
}

export const Image = ({alt, animate, borderRadius, className, style, aspectRatio, ...props}: ImageProps) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  return (
    <img
      className={clsx(
        animationClasses,
        styles.Image,
        styles[`Image--borderRadius-${borderRadius}`],
        getAspectRatioClassName(aspectRatio),
        className,
      )}
      style={{...animationInlineStyles, ...style}}
      alt={alt}
      {...props}
    />
  )
}
