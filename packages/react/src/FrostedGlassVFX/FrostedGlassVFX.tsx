import React from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/frosted-glass-vfx/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/frosted-glass-vfx/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './FrostedGlassVFX.module.css'

export const FrostedGlassVFXIntensity = ['low', 'medium', 'high'] as const
export type FrostedGlassVFXIntensity = (typeof FrostedGlassVFXIntensity)[number]
export const defaultFrostedGlassVFXIntensity: FrostedGlassVFXIntensity = 'medium'

export type FrostedGlassVFXProps = BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Applies rounded corners
     */
    roundedCorners?: boolean
    /**
     * Controls the blur amount
     */
    intensity?: FrostedGlassVFXIntensity
  }

/**
 * FrostedGlassVFX component
 * {@link https://primer.style/brand/components/FrostedGlassVFX/ See usage examples}.
 */
export function FrostedGlassVFX({
  roundedCorners = true,
  children,
  className,
  intensity = defaultFrostedGlassVFXIntensity,
  ...rest
}: FrostedGlassVFXProps) {
  return (
    <div
      className={clsx(
        styles.FrostedGlassVFX,
        roundedCorners && styles['FrostedGlassVFX--rounded-corners'],
        styles[`FrostedGlassVFX--intensity-${intensity}`],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
