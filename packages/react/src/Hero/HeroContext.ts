import React from 'react'

export const HeroAlignOptions = ['start', 'center'] as const
export type HeroAlign = (typeof HeroAlignOptions)[number]

export const HeroVariantOptions = ['default', 'bordered-grid'] as const
export type HeroVariant = (typeof HeroVariantOptions)[number]

export const heroMediaPositions = [
  'block-end',
  'inline-start',
  'inline-end',
  'inline-end-padded',
  'inline-start-padded',
] as const
export const heroMediaInlinePositions = heroMediaPositions.filter(pos => pos.startsWith('inline-'))
export type HeroMediaPositions = (typeof heroMediaPositions)[number]
export type HeroMediaInlinePositions = (typeof heroMediaInlinePositions)[number]

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
  imagePosition: HeroMediaPositions
  /**
   * Hero.Image is an inline media position
   */
  hasInlineMedia: boolean
}

export const HeroContext = React.createContext<HeroContextType | undefined>(undefined)

export const useHeroContext = (): HeroContextType => {
  const context = React.useContext(HeroContext)
  if (!context) {
    throw new Error('useHeroContext must be used within a HeroProvider')
  }

  return context
}
