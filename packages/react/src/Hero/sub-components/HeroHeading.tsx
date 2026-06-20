import {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Heading, HeadingProps} from '../../Heading'
import {useHeroContext} from '../HeroContext'

import styles from '../Hero.module.css'

export type HeroHeadingProps = Omit<HeadingProps, 'as'> & {
  fullWidth?: boolean
}

export const HeroHeading = forwardRef<HTMLHeadingElement, HeroHeadingProps>(
  ({children, fullWidth = false, size = '1', ...rest}: PropsWithChildren<HeroHeadingProps>, ref) => {
    const {hasInlineMedia, variant: heroVariant, enableAnimation} = useHeroContext()
    const isGridlineVariant = heroVariant === 'gridline' || heroVariant === 'gridline-expressive'

    return (
      <Heading
        animate={
          isGridlineVariant && enableAnimation
            ? {
                variant: 'reveal-in-up',
                delay: 0,
                duration: 1000,
              }
            : undefined
        }
        id="hero-section-brand-heading"
        className={clsx(styles['Hero-heading'], fullWidth && styles['Hero-heading--fullWidth'])}
        as="h1"
        size={hasInlineMedia ? '2' : size}
        ref={ref}
        {...rest}
      >
        {children}
      </Heading>
    )
  },
)
