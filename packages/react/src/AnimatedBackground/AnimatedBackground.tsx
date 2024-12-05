import React, {forwardRef, type Ref} from 'react'
import clsx from 'clsx'

import type {BaseProps} from '../component-helpers'
import {Text} from '../'

/** * Main Stylesheet (as a CSS Module) */
import styles from './AnimatedBackground.module.css'

type AnimatedBackgroundThemes = 'collaboration' | 'ai' | 'security' | 'enterprise' | 'productivity'
type AnimatedBackgroundVariants = '1' | '2' | '3'

export type AnimatedBackgroundProps = BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    colorMode: 'light' | 'dark'
    /**
     * Controls overall visual appearance
     */
    theme: AnimatedBackgroundThemes
    /**
     * Alternative presentation for each theme
     */
    variant?: AnimatedBackgroundVariants
    /**
     * Controls color shift. Expects a value between 0 and 1.
     */
    colorShift?: number
    /**
     * Controls light shift. Expects a value between 0 and 1.
     */
    lightShift?: number
    /**
     * Toggles parallax effect
     */
    parallax?: boolean
  }

/**
 * AnimatedBackground component
 * {@link https://primer.style/brand/components/AnimatedBackground/ See usage examples}.
 */
export const AnimatedBackground = forwardRef(
  (
    {
      className,
      colorMode = 'light',
      theme = 'ai',
      variant = '1',
      colorShift = 0.5,
      lightShift = 0.5,
      parallax = true,
      ...props
    }: AnimatedBackgroundProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    if (colorShift < 0 || colorShift > 1) {
      throw new Error('colorShift must be a value between 0 and 1')
    }

    if (lightShift < 0 || lightShift > 1) {
      throw new Error('colorlightShiftShift must be a value between 0 and 1')
    }

    return (
      <div ref={ref} className={clsx(styles.AnimatedBackground, className)} {...props}>
        {/**
         * WebGL stuff can go here
         */}
        <Text>
          {`Color mode: ${colorMode}, Theme: ${theme}, Variant: ${variant}, Color shift: ${colorShift}, Light shift: ${lightShift}, Parallax: ${parallax}`}
        </Text>
      </div>
    )
  },
)
