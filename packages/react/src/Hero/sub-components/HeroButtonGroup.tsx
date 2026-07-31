import React, {forwardRef} from 'react'
import {clsx} from 'clsx'
import {Box} from '../../Box'
import {ButtonGroup} from '../../ButtonGroup'
import {useHeroContext} from '../HeroContext'

import styles from '../Hero.module.css'

export type HeroButtonGroupProps = React.ComponentProps<typeof ButtonGroup>

export const HeroButtonGroup = forwardRef<HTMLDivElement, HeroButtonGroupProps>(
  ({className, children, ...props}, ref) => {
    const {variant, enableAnimation} = useHeroContext()
    const isGridline = variant === 'gridline' || variant === 'gridline-expressive'
    const Tag = isGridline ? Box : React.Fragment
    const tagProps = isGridline
      ? {
          animate: enableAnimation
            ? {
                variant: 'slide-in-up' as const,
                delay: 750,
                duration: 1000,
              }
            : undefined,
        }
      : {}

    return (
      <Tag {...tagProps}>
        <ButtonGroup ref={ref} className={clsx(styles['Hero-actions'], className)} {...props}>
          {children}
        </ButtonGroup>
      </Tag>
    )
  },
)
