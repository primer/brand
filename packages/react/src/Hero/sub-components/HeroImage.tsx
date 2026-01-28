import {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Image, ImageProps} from '../../Image'
import type {BaseProps} from '../../component-helpers'
import {useHeroContext, type HeroMediaPositions} from '../HeroContext'

import styles from '../Hero.module.css'

export type HeroImageProps = {
  position?: HeroMediaPositions
  enableBorder?: boolean
} & ImageProps &
  BaseProps<HTMLImageElement>

export const HeroImage = forwardRef<HTMLImageElement, HeroImageProps>(
  ({position = 'block-end', className, ...rest}: PropsWithChildren<HeroImageProps>, ref) => {
    const {variant: heroVariant, enableAnimation} = useHeroContext()
    const isInlinePosition = position.startsWith('inline')
    const isInlinePadded = position.endsWith('-padded')
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
          isInlinePosition && isInlinePadded && styles['Hero-media--pos-inline-padded'],
          className,
        )}
        {...rest}
      />
    )
  },
)
