import {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Text, TextSizes, TextWeightVariants, ResponsiveWeightMap, TextProps} from '../../Text'
import type {BaseProps} from '../../component-helpers'

import styles from '../Hero.module.css'

export type HeroDescriptionProps = {
  size?: (typeof TextSizes)[number]
  weight?: TextWeightVariants | ResponsiveWeightMap
} & BaseProps<HTMLParagraphElement> &
  TextProps

export const HeroDescription = forwardRef<HTMLParagraphElement, PropsWithChildren<HeroDescriptionProps>>(
  (
    {size = '200', weight = 'normal', children, variant = 'muted', className}: PropsWithChildren<HeroDescriptionProps>,
    ref,
  ) => {
    return (
      <Text
        ref={ref}
        className={clsx(styles['Hero-description'], className)}
        as="p"
        size={size}
        weight={weight}
        variant={variant}
      >
        {children}
      </Text>
    )
  },
)
