import {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Image, ImageProps} from '../../Image'
import type {BaseProps} from '../../component-helpers'
import type {HeroMediaPositions} from '../HeroContext'

import styles from '../Hero.module.css'

export type HeroImageProps = {
  position?: HeroMediaPositions
} & ImageProps &
  BaseProps<HTMLImageElement>

export const HeroImage = forwardRef<HTMLImageElement, HeroImageProps>(
  ({position = 'block-end', className, ...rest}: PropsWithChildren<HeroImageProps>, ref) => {
    return (
      <Image
        ref={ref}
        className={clsx(styles['Hero-image'], styles[`Hero-image--pos-${position}`], className)}
        {...rest}
      />
    )
  },
)
