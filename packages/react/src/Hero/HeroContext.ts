import React from 'react'

export const HeroAlignOptions = ['start', 'center'] as const
export type HeroAlign = (typeof HeroAlignOptions)[number]

export const HeroVariantOptions = ['default', 'gridline', 'gridline-expressive'] as const
export type HeroVariant = (typeof HeroVariantOptions)[number]

export const HeroMediaPaddingOptions = ['default', 'none', 'all'] as const
export type HeroMediaPadding = (typeof HeroMediaPaddingOptions)[number]

export const HeroMediaPositionOptions = ['block-end', 'inline-start', 'inline-end'] as const
export const HeroMediaInlinePositionOptions = ['inline-start', 'inline-end'] as const
export type HeroMediaPosition = (typeof HeroMediaPositionOptions)[number]
export type HeroMediaInlinePosition = (typeof HeroMediaInlinePositionOptions)[number]

type HeroContextType = {
  /**
   * The active variant of the Hero component
   */
  variant: HeroVariant
  /**
   * The alignment of the Hero content
   */
  align: HeroAlign
  /**
   * Image position within the Hero
   */
  imagePosition: HeroMediaPosition
  /**
   * Hero.Image is an inline media position
   */
  hasInlineMedia: boolean
  /**
   * Whether animation is enabled for the Hero
   */
  enableAnimation: boolean
}

export const HeroContext = React.createContext<HeroContextType | undefined>(undefined)

export const useHeroContext = (): HeroContextType => {
  const context = React.useContext(HeroContext)
  if (!context) {
    throw new Error('useHeroContext must be used within a HeroProvider')
  }

  return context
}
