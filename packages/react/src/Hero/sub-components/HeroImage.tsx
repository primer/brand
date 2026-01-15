import {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Image, ImageProps} from '../../Image'
import type {BaseProps} from '../../component-helpers'
import {useHeroContext, type HeroMediaPositions} from '../HeroContext'

import styles from '../Hero.module.css'

export type HeroImageProps = {
  position?: HeroMediaPositions
} & ImageProps &
  BaseProps<HTMLImageElement>

export const HeroImage = forwardRef<HTMLImageElement, HeroImageProps>(
  ({position = 'block-end', className, ...rest}: PropsWithChildren<HeroImageProps>, ref) => {
    const {variant: heroVariant, enableAnimation} = useHeroContext()
    return (
      <Image
        animate={
          heroVariant === 'bordered-grid' && enableAnimation
            ? {
                variant: 'slide-in-up',
                delay: 0,
                duration: 1000,
              }
            : undefined
        }
        ref={ref}
        className={clsx(styles['Hero-image'], styles[`Hero-image--pos-${position}`], className)}
        {...rest}
      />
    )
  },
)
