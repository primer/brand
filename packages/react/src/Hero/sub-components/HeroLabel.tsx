import {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {TextProps} from '../../Text'
import type {BaseProps} from '../../component-helpers'
import {TextCursorAnimation} from '../../TextCursorAnimation'

import styles from '../Hero.module.css'
import {useHeroContext} from '../HeroContext'

export type HeroLabelProps = Omit<TextProps, 'as' | 'ref' | 'animate'> &
  Omit<BaseProps<HTMLSpanElement>, 'animate'> & {
    animate?: boolean
    animationDelay?: number
    initialText?: string
  }

export const HeroLabel = forwardRef<HTMLSpanElement, HeroLabelProps>(
  (
    {
      children,
      className,
      variant = 'muted',
      animate = false,
      animationDelay = 1000,
      initialText,
      ...rest
    }: PropsWithChildren<HeroLabelProps>,
    ref,
  ) => {
    const {variant: heroVariant, enableAnimation} = useHeroContext()
    const isGridlineVariant = heroVariant === 'gridline' || heroVariant === 'gridline-expressive'

    const shouldAnimate = enableAnimation || animate
    const shouldHaveDelay = (isGridlineVariant && enableAnimation) || animate

    return (
      <span ref={ref} className={clsx(styles['Hero-label'], className)} {...rest}>
        <TextCursorAnimation
          variant={variant}
          animate={shouldAnimate}
          delay={shouldHaveDelay ? animationDelay : 0}
          initialText={initialText}
        >
          {children}
        </TextCursorAnimation>
      </span>
    )
  },
)
