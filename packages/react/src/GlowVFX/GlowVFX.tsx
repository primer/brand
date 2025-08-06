import React from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 * TODO: Uncomment when design tokens are created
 */
// import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/glow-vfx/base.css'
// import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/glow-vfx/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './GlowVFX.module.css'

export const GlowVFXSpectrum = ['aurora', 'solar', 'matrix'] as const
export type GlowVFXSpectrum = (typeof GlowVFXSpectrum)[number]
export const defaultGlowVFXSpectrum: GlowVFXSpectrum = 'aurora'

export const GlowVFXIntensity = ['low', 'medium', 'high'] as const
export type GlowVFXIntensity = (typeof GlowVFXIntensity)[number]
export const defaultGlowVFXIntensity: GlowVFXIntensity = 'medium'

export const GlowVFXPosition = [
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center',
  'center-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const
export type GlowVFXPosition = (typeof GlowVFXPosition)[number]
export const defaultGlowVFXPosition: GlowVFXPosition = 'center'

export type GlowVFXProps = BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Color spectrum for the glow effect
     */
    spectrum?: GlowVFXSpectrum
    /**
     * Controls the glow intensity
     */
    intensity?: GlowVFXIntensity
    /**
     * Shows a frame around the glow
     */
    showFrame?: boolean
    /**
     * Animates the entry of the glow effect
     */
    animateEntry?: boolean
    /**
     * Animates ambient glow movement
     */
    animateAmbiance?: boolean
    /**
     * Position of the glow effect (9-point anchoring)
     */
    position?: GlowVFXPosition
    /**
     * Applies inset positioning
     */
    inset?: boolean
  }

/**
 * GlowVFX component
 * {@link https://primer.style/brand/components/GlowVFX/ See usage examples}.
 */
export function GlowVFX({
  spectrum = defaultGlowVFXSpectrum,
  intensity = defaultGlowVFXIntensity,
  showFrame = false,
  animateEntry = false,
  animateAmbiance = false,
  position = defaultGlowVFXPosition,
  inset = false,
  children,
  className,
  ...rest
}: GlowVFXProps) {
  return (
    <div
      className={clsx(
        styles.GlowVFX,
        styles[`GlowVFX--spectrum-${spectrum}`],
        styles[`GlowVFX--intensity-${intensity}`],
        styles[`GlowVFX--position-${position}`],
        showFrame && styles['GlowVFX--show-frame'],
        animateEntry && styles['GlowVFX--animate-entry'],
        animateAmbiance && styles['GlowVFX--animate-ambiance'],
        inset && styles['GlowVFX--inset'],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
