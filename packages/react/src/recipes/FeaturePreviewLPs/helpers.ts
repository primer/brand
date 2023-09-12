import securityLightHeroBg from './fixtures/images/security/hero-light.png'
import securityDarkHeroBg from './fixtures/images/security/hero-dark.png'
import securityLightHeroVisualBg from './fixtures/images/security/hero-visual-bg-light.png'
import securityDarkHeroVisualBg from './fixtures/images/security/hero-visual-bg-dark.png'
import securityLightCtaBannerBg from './fixtures/images/security/cta-banner-bg-light.png'
import securityDarkCtaBannerBg from './fixtures/images/security/cta-banner-bg-dark.png'
import securityLightRiverBg1 from './fixtures/images/security/river-bg-light-1.png'
import securityDarkRiverBg1 from './fixtures/images/security/river-bg-dark-1.png'
import securityLightRiverBg2 from './fixtures/images/security/river-bg-light-2.png'
import securityDarkRiverBg2 from './fixtures/images/security/river-bg-dark-2.png'

import aiLightHeroBg from './fixtures/images/ai/hero-light.png'
import aiDarkHeroBg from './fixtures/images/ai/hero-dark.png'
import aiLightHeroVisualBg from './fixtures/images/ai/hero-visual-bg-light.png'
import aiDarkHeroVisualBg from './fixtures/images/ai/hero-visual-bg-dark.png'
import aiLightCtaBannerBg from './fixtures/images/ai/cta-banner-bg-light.png'
import aiDarkCtaBannerBg from './fixtures/images/ai/cta-banner-bg-dark.png'
import aiLightRiverBg1 from './fixtures/images/ai/river-bg-light-1.png'
import aiDarkRiverBg1 from './fixtures/images/ai/river-bg-dark-1.png'
import aiLightRiverBg2 from './fixtures/images/ai/river-bg-light-2.png'
import aiDarkRiverBg2 from './fixtures/images/ai/river-bg-dark-2.png'

import collaborationLightHeroBg from './fixtures/images/collaboration/hero-light.png'
import collaborationDarkHeroBg from './fixtures/images/collaboration/hero-dark.png'
import collaborationLightHeroVisualBg from './fixtures/images/collaboration/hero-visual-bg-light.png'
import collaborationDarkHeroVisualBg from './fixtures/images/collaboration/hero-visual-bg-dark.png'
import collaborationLightCtaBannerBg from './fixtures/images/collaboration/cta-banner-bg-light.png'
import collaborationDarkCtaBannerBg from './fixtures/images/collaboration/cta-banner-bg-dark.png'
import collaborationLightRiverBg1 from './fixtures/images/collaboration/river-bg-light-1.png'
import collaborationDarkRiverBg1 from './fixtures/images/collaboration/river-bg-dark-1.png'
import collaborationLightRiverBg2 from './fixtures/images/collaboration/river-bg-light-2.png'
import collaborationDarkRiverBg2 from './fixtures/images/collaboration/river-bg-dark-2.png'

import productivityLightHeroVisualBg from './fixtures/images/productivity/hero-visual-bg-light.png'
import productivityDarkHeroVisualBg from './fixtures/images/productivity/hero-visual-bg-dark.png'
import productivityLightCtaBannerBg from './fixtures/images/productivity/cta-banner-bg-light.png'
import productivityDarkCtaBannerBg from './fixtures/images/productivity/cta-banner-bg-dark.png'
import productivityLightRiverBg1 from './fixtures/images/productivity/river-bg-light-1.png'
import productivityDarkRiverBg1 from './fixtures/images/productivity/river-bg-dark-1.png'
import productivityLightRiverBg2 from './fixtures/images/productivity/river-bg-light-2.png'
import productivityDarkRiverBg2 from './fixtures/images/productivity/river-bg-dark-2.png'

import {ColorModesEnum} from '../../ThemeProvider'

export type Themes = 'ai' | 'collaboration' | 'security' | 'productivity'

export type ThemeDetailsMap = {
  [theme in Themes]: {
    [ColorModesEnum.LIGHT]: {
      color: string
      images: {
        heroBg: string
        heroVisualBg: string
        riverVisualBgs: string[]
        ctaBannerBg: string
        testimonialBg: string
      }
    }
    [ColorModesEnum.DARK]: {
      color: string
      images: {
        heroBg: string
        heroVisualBg: string
        riverVisualBgs: string[]
        ctaBannerBg: string
        testimonialBg: string
      }
    }
  }
}

export const themeDetailsMap: ThemeDetailsMap = {
  security: {
    light: {
      color: '#096BDE',
      images: {
        heroBg: securityLightHeroBg,
        heroVisualBg: securityLightHeroVisualBg,
        riverVisualBgs: [securityLightRiverBg1, securityLightRiverBg2],
        ctaBannerBg: securityLightCtaBannerBg,
        testimonialBg: '',
      },
    },
    dark: {
      color: 'var(--base-color-scale-blue-0)',
      images: {
        heroBg: securityDarkHeroBg,
        heroVisualBg: securityDarkHeroVisualBg,
        riverVisualBgs: [securityDarkRiverBg1, securityDarkRiverBg2],
        ctaBannerBg: securityDarkCtaBannerBg,
        testimonialBg: '',
      },
    },
  },
  collaboration: {
    light: {
      color: '#FF507A',
      images: {
        heroBg: collaborationLightHeroBg,
        heroVisualBg: collaborationLightHeroVisualBg,
        riverVisualBgs: [collaborationLightRiverBg1, collaborationLightRiverBg2],
        ctaBannerBg: collaborationLightCtaBannerBg,
        testimonialBg: '',
      },
    },
    dark: {
      color: 'var(--base-color-scale-red-0)',
      images: {
        heroBg: collaborationDarkHeroBg,
        heroVisualBg: collaborationDarkHeroVisualBg,
        riverVisualBgs: [collaborationDarkRiverBg1, collaborationDarkRiverBg2],
        ctaBannerBg: collaborationDarkCtaBannerBg,
        testimonialBg: '',
      },
    },
  },
  ai: {
    light: {
      color: '#8E47FE',
      images: {
        heroBg: aiLightHeroBg,
        heroVisualBg: aiLightHeroVisualBg,
        riverVisualBgs: [aiLightRiverBg1, aiLightRiverBg2],
        ctaBannerBg: aiLightCtaBannerBg,
        testimonialBg: '',
      },
    },
    dark: {
      color: 'var(--base-color-scale-purple-0)',
      images: {
        heroBg: aiDarkHeroBg,
        heroVisualBg: aiDarkHeroVisualBg,
        riverVisualBgs: [aiDarkRiverBg1, aiDarkRiverBg2],
        ctaBannerBg: aiDarkCtaBannerBg,
        testimonialBg: '',
      },
    },
  },
  productivity: {
    light: {
      color: '#2DA44E',
      images: {
        heroBg: '',
        heroVisualBg: productivityLightHeroVisualBg,
        riverVisualBgs: [productivityLightRiverBg1, productivityLightRiverBg2],
        ctaBannerBg: productivityLightCtaBannerBg,
        testimonialBg: '',
      },
    },
    dark: {
      color: 'var(--base-color-scale-green-0)',
      images: {
        heroBg: '',
        heroVisualBg: productivityDarkHeroVisualBg,
        riverVisualBgs: [productivityDarkRiverBg1, productivityDarkRiverBg2],
        ctaBannerBg: productivityDarkCtaBannerBg,
        testimonialBg: '',
      },
    },
  },
}
