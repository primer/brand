import {forwardRef} from 'react'
import {clsx} from 'clsx'
import {Image, ImageProps} from '../../Image'
import type {BaseProps} from '../../component-helpers'
import {useHeroContext, type HeroMediaPadding, type HeroMediaPosition} from '../HeroContext'

import styles from '../Hero.module.css'

export type HeroImageProps = {
  position?: HeroMediaPosition
  padding?: HeroMediaPadding
  enableBorder?: boolean
} & ImageProps &
  BaseProps<HTMLImageElement>

export const HeroImage = forwardRef<HTMLImageElement, HeroImageProps>(
  ({position = 'block-end', padding = 'default', className, enableBorder, ...rest}: HeroImageProps, ref) => {
    const {variant: heroVariant, enableAnimation} = useHeroContext()
    const isInlinePosition = position.startsWith('inline')
    return (
      <Image
        animate={
          heroVariant === 'gridline' && enableAnimation
            ? {
                variant: 'slide-in-up',
                delay: 0,
                duration: 1000,
              }
            : undefined
        }
        ref={ref}
        className={clsx(
          styles['Hero-image'],
          styles['Hero-media'],
          styles[`Hero-media--pos-${position}`],
          isInlinePosition && styles['Hero-media--pos-inline'],
          padding === 'all' && styles['Hero-media--padding-all'],
          padding === 'none' && styles['Hero-media--padding-none'],
          className,
        )}
        {...rest}
      />
    )
  },
)
