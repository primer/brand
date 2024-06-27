import React from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'
import {AnimateProps, useAnimation} from '../animation'

export const ImageBorderRadiusOptions = ['small', 'medium', 'large', 'xlarge', 'full'] as const
export type ImageBorderRadiusOptions = (typeof ImageBorderRadiusOptions)[number]

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  alt: string
  animate?: AnimateProps
  borderRadius?: ImageBorderRadiusOptions
}

export const Image = ({alt, animate, borderRadius, className, style, ...props}: ImageProps) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  return (
    <img
      className={clsx(animationClasses, styles.Image, styles[`Image--borderRadius-${borderRadius}`], className)}
      style={{...animationInlineStyles, ...style}}
      alt={alt}
      {...props}
    />
  )
}
