import {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Text, TextProps} from '../../Text'
import type {BaseProps} from '../../component-helpers'
import {TextCursorAnimation} from '../../TextCursorAnimation'

import styles from '../Hero.module.css'
import {useHeroContext} from '../HeroContext'

export type HeroLabelProps = Omit<TextProps, 'as' | 'ref' | 'animate'> &
  Omit<BaseProps<HTMLSpanElement>, 'animate'> & {
    animate?: boolean
    animationDelay?: number
  }

export const HeroLabel = forwardRef<HTMLSpanElement, HeroLabelProps>(
  ({children, className, animate, animationDelay = 1000, ...rest}: PropsWithChildren<HeroLabelProps>, ref) => {
    const {variant: heroVariant} = useHeroContext()

    return (
      <Text
        font="monospace"
        weight="medium"
        as="span"
        size="100"
        variant="muted"
        ref={ref}
        className={clsx(styles['Hero-label'], className)}
        {...rest}
      >
        <TextCursorAnimation animate={animate} delay={heroVariant === 'bordered-grid' ? animationDelay : 0}>
          {children}
        </TextCursorAnimation>
      </Text>
    )
  },
)
