import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'

import {ColorModesEnum} from '../../../ThemeProvider'
import {themeDetailsMap} from '../helpers'
import {FeaturePreviewLevelTwo} from './FeaturePreviewLevelTwo'

export default {
  title: 'Recipes/Feature previews/Level 2',
  component: FeaturePreviewLevelTwo,
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
    subNavVisible: false,
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

    sectionIntroAlign: 'start',
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
    riverOneType: 'end',
    riverOneTitle: 'Dive into the first sub feature with a river',
    riverOneDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar.',
    riverOneCtaText: 'Learn more',

    riverTwoVisible: true,
    riverTwoType: 'breakout',
    riverTwoTitle: 'Dive into the first sub feature with a river',
    riverTwoDescription:
      'Here we explain why this came to be. This is a short statement about the intention of the feature and why we think its cool, keep it real.',
    riverTwoCtaText: 'Learn more',

    riverThreeVisible: true,
    riverThreeType: 'end',
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
     * Hero
     */
    subNavVisible: {
      name: 'sub nav visible',
      control: 'boolean',
      table: {
        category: 'Section: Hero',
      },
    },
    heroAlign: {
      control: 'inline-radio',
      options: ['start', 'center'],
      name: 'align',
      table: {
        category: 'Section: Hero',
      },
    },
    heroBg: {
      control: 'boolean',
      name: 'has background',
      table: {
        category: 'Section: Hero',
      },
    },
    showHeroVisual: {
      control: 'boolean',
      name: 'show visual',
      table: {
        category: 'Section: Hero',
      },
    },
    heroVisualPosition: {
      control: 'inline-radio',
      options: ['block-end', 'inline-end'],
      name: 'visual position',
      table: {
        category: 'Section: Hero',
      },
    },
    heroLabel: {
      control: 'text',
      name: 'label',
      table: {
        category: 'Section: Hero',
      },
    },
    heroTitle: {
      control: 'text',
      name: 'title',
      table: {
        category: 'Section: Hero',
      },
    },
    heroDescription: {
      control: 'text',
      name: 'description',
      table: {
        category: 'Section: Hero',
      },
    },
    heroCtaTextPrimary: {
      control: 'text',
      name: 'primary CTA text',
      table: {
        category: 'Section: Hero',
      },
    },
    heroCtaTextSecondary: {
      control: 'text',
      name: 'secondary CTA text',
      table: {
        category: 'Section: Hero',
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
} as Meta<typeof FeaturePreviewLevelTwo>

export const LevelTwoPlayground: StoryFn<typeof FeaturePreviewLevelTwo> = args => <FeaturePreviewLevelTwo {...args} />

LevelTwoPlayground.storyName = 'Playground'
LevelTwoPlayground.args = {
  variant: 'Maximum',
}

export const LevelTwoMinimal: StoryFn<typeof FeaturePreviewLevelTwo> = args => <FeaturePreviewLevelTwo {...args} />

LevelTwoMinimal.storyName = 'Minimal'
LevelTwoMinimal.args = {
  variant: 'Minimum',
  heroLabel: undefined,
  heroCtaTextSecondary: undefined,
  sectionIntroVisible: false,
  pillarVisible: false,
  logoSuiteVisible: false,
  riverOneType: 'end',
  riverTwoType: 'end',
  riverOneVisible: false,
  testimonialVisible: false,
  faqVisible: false,
  cardsVisible: false,
  faqType: 'single',
  testimonialQuantity: 1,
  ctaBannerShowBg: false,
}

export const LevelTwoPointOne: StoryFn<typeof FeaturePreviewLevelTwo> = args => <FeaturePreviewLevelTwo {...args} />

LevelTwoPointOne.storyName = '2.1 variant'
LevelTwoPointOne.args = {
  pillarBackground: true,
  riverThreeVisible: false,
  faqVisible: false,
}

export const LevelTwoPointTwo: StoryFn<typeof FeaturePreviewLevelTwo> = args => <FeaturePreviewLevelTwo {...args} />

LevelTwoPointTwo.storyName = '2.2 variant'
LevelTwoPointTwo.args = {
  showHeroVisual: false,
  heroAlign: 'start',
  heroBg: true,
  sectionIntroAlign: 'start',
  pillarBackground: true,
  testimonialVisible: false,
  faqVisible: false,
  cardsVisible: false,
}

export const LevelTwoPointThree: StoryFn<typeof FeaturePreviewLevelTwo> = args => <FeaturePreviewLevelTwo {...args} />

LevelTwoPointThree.storyName = '2.3 variant'
LevelTwoPointThree.args = {
  showHeroVisual: false,
  heroLabel: '',
  heroAlign: 'center',
  heroBg: true,
  sectionIntroAlign: 'center',
  sectionIntroText: [
    <b key="highlighted-statement">Highlighted statement in 4-6 words max.</b>,
    <br key="separator" />,
    <span key="body-text">The rest of body text should be between 80 to 100 characters.</span>,
  ],
  pillarBackground: true,
  riverOneVisible: false,
  testimonialVisible: false,
  faqVisible: false,
  ctaBannerVisible: false,
}

export const LevelTwoPointFour: StoryFn<typeof FeaturePreviewLevelTwo> = args => <FeaturePreviewLevelTwo {...args} />

LevelTwoPointFour.storyName = '2.4 variant'
LevelTwoPointFour.args = {
  variant: 'Maximum',
  subNavVisible: true,
}
