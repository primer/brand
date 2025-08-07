import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {ColorModesEnum} from '../../../ThemeProvider'
import {themeDetailsMap} from '../helpers'
import {FlexSection} from './FlexSection'

export default {
  title: 'Recipes/FlexTemplate/FlexSection',
  component: FlexSection,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          // disable color-contrast rule as the IDE is presentational
          {
            id: 'color-contrast',
            enabled: false,
            element: 'breakout-with-ide',
          },
        ],
      },
    },
  },
  args: {
    gridOverlay: false,
    colorMode: ColorModesEnum.LIGHT,
    accentColor: 'ai',
    heroAlign: 'start',
    heroBg: false,
    showHeroVisual: true,
    heroLabel: 'Label',
    heroTitle: 'Expressive headline about a sweet feature',
    heroDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar.',
    heroCtaTextPrimary: 'Primary CTA',
    heroCtaTextSecondary: 'Secondary CTA',

    sectionIntroAlign: 'center',
    sectionIntroVisible: true,
    sectionIntroText: [
      <b key="highlighted-text">Here we explain why this came to be.</b>,
      ` This is a short statement about the intention
    of the feature and why we think it's cool, keep it real.`,
    ],

    pillarVisible: true,
    pillarBackground: false,

    logoSuiteVisible: true,

    riverOneVisible: true,
    riverOneType: 'breakout',
    riverOneTitle: 'Dive into the first sub feature with a river',
    riverOneDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar.',
    riverOneCtaText: 'Learn more',

    riverTwoVisible: true,
    riverTwoType: 'start',
    riverTwoTitle: 'Dive into the first sub feature with a river',
    riverTwoDescription:
      'Here we explain why this came to be. This is a short statement about the intention of the feature and why we think its cool, keep it real.',
    riverTwoCtaText: 'Learn more',

    riverThreeVisible: true,
    riverThreeType: 'start',
    riverThreeTitle: 'Dive into the first sub feature with a river',
    riverThreeDescription:
      'Here we explain why this came to be. This is a short statement about the intention of the feature and why we think its cool, keep it real.',
    riverThreeCtaText: 'Learn more',

    testimonialVisible: true,
    testimonialQuantity: 1,

    ctaBannerVisible: true,
    ctaBannerShowBg: true,

    faqVisible: true,
    faqType: 'group',

    cardsVisible: true,
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    gridOverlay: {
      name: 'enable grid overlay',
      control: 'boolean',
      table: {
        category: 'General',
      },
    },
    colorMode: {
      name: 'mode',
      control: 'inline-radio',
      options: [ColorModesEnum.LIGHT, ColorModesEnum.DARK],
      table: {
        category: 'Theming',
      },
    },
    accentColor: {
      name: 'theme',
      control: 'radio',
      options: Object.keys(themeDetailsMap),
      table: {
        category: 'Theming',
      },
    },
    /**
     * Section intro
     */
    sectionIntroAlign: {
      control: 'inline-radio',
      options: ['start', 'center'],
      name: 'align',
      table: {
        category: 'Section: Introduce',
      },
    },
    sectionIntroText: {
      control: 'text',
      name: 'text',
      table: {
        category: 'Section: Introduce',
      },
    },
    sectionIntroVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: Introduce',
      },
    },
    /**
     * Pillars
     */
    pillarVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: Pillars',
      },
    },
    pillarBackground: {
      control: 'boolean',
      name: 'hasBackground',
      table: {
        category: 'Section: Pillars',
      },
    },
    /**
     * LogoSuite
     */
    logoSuiteVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: LogoSuite',
      },
    },
    /**
     * River one
     */
    riverOneVisible: {
      control: 'boolean',
      name: 'river 1 visible',
      table: {
        category: 'Section: Rivers (1)',
      },
    },
    riverOneType: {
      control: 'inline-radio',
      options: ['start', 'end', 'breakout'],
      name: 'river 1 type',
      table: {
        category: 'Section: Rivers (1)',
      },
    },
    riverOneTitle: {
      control: 'text',
      name: 'river 1 title',
      table: {
        category: 'Section: Rivers (1)',
      },
    },
    riverOneDescription: {
      control: 'text',
      name: 'river 1 description',
      table: {
        category: 'Section: Rivers (1)',
      },
    },
    riverOneCtaText: {
      control: 'text',
      name: 'river 1 CTA text',
      table: {
        category: 'Section: Rivers (1)',
      },
    },

    /**
     * River two
     */
    riverTwoVisible: {
      control: 'boolean',
      name: 'river 2 visible',
      table: {
        category: 'Section: Rivers (2)',
      },
    },
    riverTwoType: {
      control: 'inline-radio',
      options: ['start', 'end', 'breakout'],
      name: 'river 2 type',
      table: {
        category: 'Section: Rivers (2)',
      },
    },
    riverTwoTitle: {
      control: 'text',
      name: 'river 2 title',
      table: {
        category: 'Section: Rivers (2)',
      },
    },
    riverTwoDescription: {
      control: 'text',
      name: 'river 2 description',
      table: {
        category: 'Section: Rivers (2)',
      },
    },
    riverTwoCtaText: {
      control: 'text',
      name: 'river 2 CTA text',
      table: {
        category: 'Section: Rivers (2)',
      },
    },

    /**
     * River three
     */
    riverThreeVisible: {
      control: 'boolean',
      name: 'river 3 visible',
      table: {
        category: 'Section: Rivers (3)',
      },
    },
    riverThreeType: {
      control: 'inline-radio',
      options: ['start', 'end', 'breakout'],
      name: 'river 3 type',
      table: {
        category: 'Section: Rivers (3)',
      },
    },
    riverThreeTitle: {
      control: 'text',
      name: 'river 3 title',
      table: {
        category: 'Section: Rivers (3)',
      },
    },
    riverThreeDescription: {
      control: 'text',
      name: 'river 3 description',
      table: {
        category: 'Section: Rivers (3)',
      },
    },
    riverThreeCtaText: {
      control: 'text',
      name: 'river 3 CTA text',
      table: {
        category: 'Section: Rivers (3)',
      },
    },
    /**
     * Testimonial
     */
    testimonialVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: Testimonial',
      },
    },
    testimonialQuantity: {
      control: 'inline-radio',
      options: [1, 2],
      name: 'quantity',
      table: {
        category: 'Section: Testimonial',
      },
    },
    /**
     * CTABanner
     */
    ctaBannerVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: CTABanner',
      },
    },
    ctaBannerShowBg: {
      control: 'boolean',
      name: 'showBg',
      table: {
        category: 'Section: CTABanner',
      },
    },
    /**
     * FAQ
     */
    faqVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: FAQ',
      },
    },
    faqType: {
      control: 'inline-radio',
      options: ['single', 'group'],
      name: 'type',
      table: {
        category: 'Section: FAQ',
      },
    },
    /**
     * Cards
     */
    cardsVisible: {
      control: 'boolean',
      name: 'visible',
      table: {
        category: 'Section: Cards',
      },
    },
  },
} as Meta<typeof FlexSection>

export const LevelTwoPlayground: StoryFn<typeof FlexSection> = args => <FlexSection {...args} />

LevelTwoPlayground.storyName = 'Playground'
LevelTwoPlayground.args = {
  variant: 'Maximum',
}

export const LevelTwoMinimal: StoryFn<typeof FlexSection> = args => <FlexSection {...args} />

LevelTwoMinimal.storyName = 'Minimal'
LevelTwoMinimal.args = {
  variant: 'Minimum',
  sectionIntroVisible: false,
  pillarVisible: false,
  logoSuiteVisible: false,
  riverOneType: 'end',
  riverTwoType: 'end',
  riverOneVisible: false,
  testimonialVisible: false,
  cardsVisible: false,
  testimonialQuantity: 1,
  ctaBannerShowBg: false,
}
