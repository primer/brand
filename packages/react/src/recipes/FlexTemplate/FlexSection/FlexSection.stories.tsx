import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {FlexSection} from './FlexSection'
import {LabelColors, TestimonialQuoteMarkColors} from '../../..'

type FlexSectionStoryArgs = {
  sectionId: 'example-section'
  showAnchorNav: boolean
  showLogosuite: boolean
  showCards: boolean
  showBento: boolean
  showBreakoutBanner: boolean
  showStatistics: boolean
  showPricingOptions: boolean
  showSegmentedControlPanel: boolean
  showTestimonials: boolean
  showRivers: boolean

  showIntroContent: boolean
  introContentType: 'sectionIntro' | 'sectionIntroStacked'
  sectionIntroAlign: 'start' | 'center'
  sectionIntroHeading: string
  sectionIntroDescription: string
  sectionIntroStackedHeading: string
  sectionIntroStackedItem1: string
  sectionIntroStackedItem2: string
  sectionIntroStackedItem3: string

  showProse: boolean
  proseContent: string

  showPillars: boolean
  pillarsHeading: string
  pillar1Title: string
  pillar1Description: string
  pillar2Title: string
  pillar2Description: string
  pillar3Title: string
  pillar3Description: string

  bentoShowIcon: boolean
  bentoShowFootnotes: boolean
  bentoHeadingLevel: string

  breakoutBannerAlign: string
  breakoutBannerShowLogo: boolean
  breakoutBannerShowFootnotes: boolean
  breakoutBannerHeadingLevel: string

  statisticsCount: number
  statisticsVariant: string
  statisticsSize: string
  statisticsShowDescription: boolean
  statisticsDescriptionVariant: string
  statisticsShowDescriptionFootnotes: boolean

  pricingOptionsVariant: string
  pricingOptionsAlign: string
  pricingOptionsShowFootnotes: boolean
  pricingOptionsShowFeatureList: boolean
  pricingOptionsHeadingLevel: string

  testimonialCount: number
  testimonialBackgroundImageVariant: 'Productivity' | 'Collaboration' | 'AI' | 'Security' | 'Enterprise' | undefined
  testimonialVariant: string
  testimonialDisplayedAuthorImage: 'logo' | 'avatar'
  testimonialQuoteMarkColor: string

  riverType: 'river' | 'riverBreakout' | 'riverAccordion'
  riverAlign: string
  riverCtaVariant: string
  riverHasCta: boolean
  riverHasLeadingVisual: boolean
  riverHasShadow: boolean
  riverHasTrailingComponent: boolean
  riverImageTextRatio: string
  riverHasLabel: boolean
  riverLabelColor: string
  riverLabelSize: string
  riverVisualType: 'image' | 'video'

  backgroundColor: string
  paddingBlockStart: string
  colorMode: string
  paddingBlockEnd: string
  roundedCorners: boolean
  verticalGap: string
  hasBorderBottom: boolean
  enableRiverStoryScroll: boolean
}

// Function to generate mock data based on story args
const createMockData = (args: FlexSectionStoryArgs) => ({
  id: args.sectionId,
  anchorNav: args.showAnchorNav,
  sectionIntro:
    args.showIntroContent && args.introContentType === 'sectionIntro'
      ? {
          align: args.sectionIntroAlign,
          heading: args.sectionIntroHeading,
          description: args.sectionIntroDescription,
        }
      : undefined,
  sectionIntroStacked:
    args.showIntroContent && args.introContentType === 'sectionIntroStacked'
      ? {
          heading: args.sectionIntroStackedHeading,
          items: [
            {text: args.sectionIntroStackedItem1},
            {text: args.sectionIntroStackedItem2},
            {text: args.sectionIntroStackedItem3},
          ],
        }
      : undefined,

  logoSuite: args.showLogosuite ? {} : undefined,
  cards: args.showCards ? {} : undefined,
  prose: args.showProse
    ? {
        content: args.proseContent,
      }
    : null,
  pillars: args.showPillars
    ? {
        heading: args.pillarsHeading,
        items: [
          {
            heading: args.pillar1Title,
            description: args.pillar1Description,
            icon: 'zap',
          },
          {
            heading: args.pillar2Title,
            description: args.pillar2Description,
            icon: 'rocket',
          },
          {
            heading: args.pillar3Title,
            description: args.pillar3Description,
            icon: 'shield',
          },
        ],
      }
    : null,
  featuredBento: args.showBento
    ? {
        headingLevel: args.bentoHeadingLevel,
        showIcon: args.bentoShowIcon,
        showFootnotes: args.bentoShowFootnotes,
      }
    : null,
  breakoutBanner: args.showBreakoutBanner
    ? {
        align: args.breakoutBannerAlign,
        showLogo: args.breakoutBannerShowLogo,
        headingLevel: args.breakoutBannerHeadingLevel,
        showFootnotes: args.breakoutBannerShowFootnotes,
      }
    : null,

  statistics: args.showStatistics
    ? {
        count: args.statisticsCount,
        variant: args.statisticsVariant,
        size: args.statisticsSize,
        showDescription: args.statisticsShowDescription,
        descriptionVariant: args.statisticsDescriptionVariant,
        showDescriptionFootnotes: args.statisticsShowDescriptionFootnotes,
      }
    : null,
  pricingOptions: args.showPricingOptions
    ? {
        variant: args.pricingOptionsVariant,
        align: args.pricingOptionsAlign,
        showFootnotes: args.pricingOptionsShowFootnotes,
        showFeatureList: args.pricingOptionsShowFeatureList,
        headingLevel: args.pricingOptionsHeadingLevel,
      }
    : null,
  segmentedControlPanel: args.showSegmentedControlPanel ? {} : null,
  testimonials: args.showTestimonials
    ? {
        testimonialCount: args.testimonialCount,
        backgroundImageVariant: args.testimonialBackgroundImageVariant,
        variant: args.testimonialVariant,
        displayedAuthorImage: args.testimonialDisplayedAuthorImage,
        quoteMarkColor: args.testimonialQuoteMarkColor,
      }
    : null,
  rivers: args.showRivers
    ? Array.from({length: 3}).map((_, i) => ({
        type: args.riverType,
        align: args.riverAlign,
        ctaVariant: args.riverCtaVariant,
        ctaText: args.riverHasCta ? 'Learn more' : undefined,
        ctaHref: args.riverHasCta ? '#' : undefined,
        hasLeadingVisual: args.riverHasLeadingVisual,
        hasShadow: args.riverHasShadow,
        hasTrailingComponent: args.riverHasTrailingComponent,
        imageTextRatio: args.riverImageTextRatio,
        label: args.riverHasLabel ? `Label ${i + 1}` : undefined,
        labelColor: args.riverLabelColor,
        labelSize: args.riverLabelSize,
        visualType: args.riverVisualType,
        heading: `Heading ${i + 1}`,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
        ...(args.riverType === 'riverAccordion'
          ? {
              items: Array.from({length: 3}).map((__unused, j) => ({
                heading: `Accordion Item ${j + 1}`,
                description:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus veniam repellat unde ex aut minus iusto.',
                ctaText: args.riverHasCta ? 'Learn more' : undefined,
                ctaHref: args.riverHasCta ? '#' : undefined,
                ctaVariant: args.riverCtaVariant,
              })),
            }
          : {}),
      }))
    : null,
  visualSettings: {
    backgroundColor: args.backgroundColor,
    paddingBlockStart: args.paddingBlockStart,
    paddingBlockEnd: args.paddingBlockEnd,
    roundedCorners: args.roundedCorners,
    verticalGap: args.verticalGap,
    hasBorderBottom: args.hasBorderBottom,
    enableRiverStoryScroll: args.enableRiverStoryScroll,
  },
})

const meta: Meta<FlexSectionStoryArgs> = {
  title: 'Recipes/FlexTemplate/FlexSection',
  // @ts-expect-error As this is purely a demo component the types are not exact
  component: FlexSection,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
  args: {
    // Section settings
    sectionId: 'example-section',
    showAnchorNav: true,
    showLogosuite: true,
    showCards: true,
    showBento: true,
    showBreakoutBanner: true,

    // Intro content
    showIntroContent: true,
    introContentType: 'sectionIntro',
    sectionIntroAlign: 'center',
    sectionIntroHeading: 'Section Introduction',
    sectionIntroDescription: 'This section showcases all available FlexSection components',
    sectionIntroStackedHeading: 'Stacked Introduction Heading',
    sectionIntroStackedItem1: 'First key point about this section',
    sectionIntroStackedItem2: 'Second important feature to highlight',
    sectionIntroStackedItem3: 'Third benefit or characteristic',

    // Prose content
    showProse: true,
    proseContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

    // Pillars content
    showPillars: true,
    pillarsHeading: 'Key Features',
    pillar1Title: 'Powerful Performance',
    pillar1Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    pillar2Title: 'Easy Integration',
    pillar2Description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    pillar3Title: 'Secure & Reliable',
    pillar3Description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',

    // Bento content
    bentoShowIcon: true,
    bentoShowFootnotes: true,
    bentoHeadingLevel: 'h3',

    // Breakout banner content
    breakoutBannerAlign: 'start',
    breakoutBannerShowLogo: true,
    breakoutBannerShowFootnotes: false,
    breakoutBannerHeadingLevel: 'h3',

    // Statistics content
    showStatistics: true,
    statisticsCount: 4,
    statisticsVariant: 'default',
    statisticsSize: 'medium',
    statisticsShowDescription: true,
    statisticsDescriptionVariant: 'muted',
    statisticsShowDescriptionFootnotes: false,

    // Pricing options content
    showPricingOptions: true,
    pricingOptionsVariant: 'default',
    pricingOptionsAlign: 'start',
    pricingOptionsShowFootnotes: true,
    pricingOptionsShowFeatureList: true,
    pricingOptionsHeadingLevel: 'h3',

    // Segmented control panel
    showSegmentedControlPanel: true,

    // Testimonials content
    showTestimonials: true,
    testimonialCount: 2,
    testimonialBackgroundImageVariant: 'Productivity',
    testimonialVariant: 'minimal',
    testimonialDisplayedAuthorImage: 'avatar',
    testimonialQuoteMarkColor: 'accent',

    // Rivers content
    showRivers: true,
    riverType: 'river',
    riverAlign: 'start',
    riverCtaVariant: 'default',
    riverHasCta: true,
    riverHasLeadingVisual: true,
    riverHasShadow: false,
    riverHasTrailingComponent: false,
    riverImageTextRatio: '50:50',
    riverHasLabel: true,
    riverLabelColor: 'default',
    riverLabelSize: 'medium',
    riverVisualType: 'image',

    // Visual settings
    backgroundColor: 'subtle',
    paddingBlockStart: 'spacious',
    colorMode: 'inherit',
    paddingBlockEnd: 'spacious',
    roundedCorners: false,
    verticalGap: 'normal',
    hasBorderBottom: false,
    enableRiverStoryScroll: false,
  },
  argTypes: {
    // Section controls
    sectionId: {
      control: 'text',
      description: 'Unique identifier for the section',
      table: {category: 'Section'},
    },
    showLogosuite: {
      control: 'boolean',
      description: 'Show logo suite',
      table: {category: 'Logo Suite'},
    },
    showCards: {
      control: 'boolean',
      description: 'Show cards',
      table: {category: 'Cards'},
    },
    showAnchorNav: {
      control: 'boolean',
      description: 'Show anchor navigation',
      table: {category: 'Anchor Nav'},
    },

    // Intro content controls
    showIntroContent: {
      control: 'boolean',
      description: 'Show intro content section',
      table: {category: 'Intro Content'},
    },
    introContentType: {
      control: {type: 'radio'},
      options: ['sectionIntro', 'sectionIntroStacked'],
      description: 'Type of intro content to display',
      table: {category: 'Intro Content'},
      if: {arg: 'showIntroContent', truthy: true},
    },
    sectionIntroAlign: {
      control: {type: 'select'},
      options: ['start', 'center'],
      description: 'Alignment for section intro',
      table: {category: 'Intro Content'},
      if: {arg: 'introContentType', eq: 'sectionIntro'},
    },
    sectionIntroHeading: {
      control: 'text',
      description: 'Heading for section intro',
      table: {category: 'Intro Content'},
      if: {arg: 'introContentType', eq: 'sectionIntro'},
    },
    sectionIntroDescription: {
      control: 'text',
      description: 'Description for section intro',
      table: {category: 'Intro Content'},
      if: {arg: 'introContentType', eq: 'sectionIntro'},
    },
    sectionIntroStackedHeading: {
      control: 'text',
      description: 'Heading for stacked intro',
      table: {category: 'Intro Content'},
      if: {arg: 'introContentType', eq: 'sectionIntroStacked'},
    },
    sectionIntroStackedItem1: {
      control: 'text',
      description: 'First item in stacked intro',
      table: {category: 'Intro Content'},
      if: {arg: 'introContentType', eq: 'sectionIntroStacked'},
    },
    sectionIntroStackedItem2: {
      control: 'text',
      description: 'Second item in stacked intro',
      table: {category: 'Intro Content'},
      if: {arg: 'introContentType', eq: 'sectionIntroStacked'},
    },
    sectionIntroStackedItem3: {
      control: 'text',
      description: 'Third item in stacked intro',
      table: {category: 'Intro Content'},
      if: {arg: 'introContentType', eq: 'sectionIntroStacked'},
    },

    // Prose controls
    showProse: {
      control: 'boolean',
      description: 'Show prose content section',
      table: {category: 'Prose Content'},
    },
    proseContent: {
      control: 'text',
      description: 'Prose content text',
      table: {category: 'Prose Content'},
      if: {arg: 'showProse', truthy: true},
    },

    // Pillars controls
    showPillars: {
      control: 'boolean',
      description: 'Show pillars section',
      table: {category: 'Pillars'},
    },
    pillarsHeading: {
      control: 'text',
      description: 'Pillars section heading',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars', truthy: true},
    },
    pillar1Title: {
      control: 'text',
      description: 'First pillar title',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars', truthy: true},
    },
    pillar1Description: {
      control: 'text',
      description: 'First pillar description',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars', truthy: true},
    },
    pillar2Title: {
      control: 'text',
      description: 'Second pillar title',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars', truthy: true},
    },
    pillar2Description: {
      control: 'text',
      description: 'Second pillar description',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars', truthy: true},
    },
    pillar3Title: {
      control: 'text',
      description: 'Third pillar title',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars', truthy: true},
    },
    pillar3Description: {
      control: 'text',
      description: 'Third pillar description',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars', truthy: true},
    },

    // Bento controls
    showBento: {
      control: 'boolean',
      description: 'Show featured Bento section',
      table: {category: 'Bento'},
    },
    bentoShowIcon: {
      control: 'boolean',
      description: 'Show icon in Bento',
      table: {category: 'Bento'},
      if: {arg: 'showBento', truthy: true},
    },
    bentoShowFootnotes: {
      control: 'boolean',
      description: 'Show footnotes in Bento',
      table: {category: 'Bento'},
      if: {arg: 'showBento', truthy: true},
    },
    bentoHeadingLevel: {
      control: {type: 'select'},
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Heading level for Bento title',
      table: {category: 'Bento'},
      if: {arg: 'showBento', truthy: true},
    },

    // Breakout banner controls
    showBreakoutBanner: {
      control: 'boolean',
      description: 'Show breakout banner section',
      table: {category: 'Breakout Banner'},
    },
    breakoutBannerAlign: {
      control: {type: 'select'},
      options: ['start', 'center'],
      description: 'Alignment of breakout banner content',
      table: {category: 'Breakout Banner'},
      if: {arg: 'showBreakoutBanner', truthy: true},
    },
    breakoutBannerShowLogo: {
      control: 'boolean',
      description: 'Show logo in breakout banner',
      table: {category: 'Breakout Banner'},
      if: {arg: 'showBreakoutBanner', truthy: true},
    },
    breakoutBannerShowFootnotes: {
      control: 'boolean',
      description: 'Show footnotes in breakout banner',
      table: {category: 'Breakout Banner'},
      if: {arg: 'showBreakoutBanner', truthy: true},
    },
    breakoutBannerHeadingLevel: {
      control: {type: 'select'},
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Heading level for breakout banner title',
      table: {category: 'Breakout Banner'},
      if: {arg: 'showBreakoutBanner', truthy: true},
    },

    // Statistics controls
    showStatistics: {
      control: 'boolean',
      description: 'Show statistics section',
      table: {category: 'Statistics'},
    },
    statisticsCount: {
      control: {type: 'inline-radio'},
      options: [3, 4],
      description: 'Number of statistics to display',
      table: {category: 'Statistics'},
      if: {arg: 'showStatistics', truthy: true},
    },
    statisticsVariant: {
      control: {type: 'select'},
      options: ['default', 'boxed'],
      description: 'Visual variant for statistics',
      table: {category: 'Statistics'},
      if: {arg: 'showStatistics', truthy: true},
    },
    statisticsSize: {
      control: {type: 'select'},
      options: ['small', 'medium', 'large'],
      description: 'Size of the statistics',
      table: {category: 'Statistics'},
      if: {arg: 'showStatistics', truthy: true},
    },

    statisticsShowDescription: {
      control: 'boolean',
      description: 'Show description for statistics',
      table: {category: 'Statistics'},
      if: {arg: 'showStatistics', truthy: true},
    },
    statisticsDescriptionVariant: {
      control: {type: 'select'},
      options: ['default', 'muted', 'accent'],
      description: 'Text variant for statistics description',
      table: {category: 'Statistics'},
      if: {arg: 'statisticsShowDescription', truthy: true},
    },
    statisticsShowDescriptionFootnotes: {
      control: 'boolean',
      description: 'Show footnotes for statistics description',
      table: {category: 'Statistics'},
      if: {arg: 'statisticsShowDescription', truthy: true},
    },

    // Pricing options controls
    showPricingOptions: {
      control: 'boolean',
      description: 'Show pricing options section',
      table: {category: 'Pricing Options'},
    },
    pricingOptionsVariant: {
      control: {type: 'select'},
      options: ['default', 'default-gradient', 'cards', 'cards-gradient'],
      description: 'Variant for pricing options',
      table: {category: 'Pricing Options'},
      if: {arg: 'showPricingOptions', truthy: true},
    },
    pricingOptionsAlign: {
      control: {type: 'select'},
      options: ['start', 'center'],
      description: 'Alignment of pricing options',
      table: {category: 'Pricing Options'},
      if: {arg: 'showPricingOptions', truthy: true},
    },
    pricingOptionsShowFootnotes: {
      control: 'boolean',
      description: 'Show footnotes in pricing options',
      table: {category: 'Pricing Options'},
      if: {arg: 'showPricingOptions', truthy: true},
    },
    pricingOptionsShowFeatureList: {
      control: 'boolean',
      description: 'Show feature list in pricing options',
      table: {category: 'Pricing Options'},
      if: {arg: 'showPricingOptions', truthy: true},
    },
    pricingOptionsHeadingLevel: {
      control: {type: 'select'},
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Heading level for pricing options title',
      table: {category: 'Pricing Options'},
      if: {arg: 'showPricingOptions', truthy: true},
    },

    // Segmented control panel
    showSegmentedControlPanel: {
      control: 'boolean',
      description: 'Show segmented control panel',
      table: {category: 'Segmented Control Panel'},
    },

    // Testimonials controls
    showTestimonials: {
      control: 'boolean',
      description: 'Show testimonials section',
      table: {category: 'Testimonials'},
    },
    testimonialCount: {
      control: {type: 'inline-radio'},
      options: [1, 2, 3, 4],
      description: 'Number of testimonials to display',
      table: {category: 'Testimonials'},
      if: {arg: 'showTestimonials', truthy: true},
    },
    testimonialBackgroundImageVariant: {
      control: {type: 'select'},
      options: ['Productivity', 'Collaboration', 'AI', 'Security', 'Enterprise', undefined],
      description: 'Background image variant for testimonials',
      table: {category: 'Testimonials'},
      if: {arg: 'showTestimonials', truthy: true},
    },
    testimonialVariant: {
      control: {type: 'select'},
      options: ['minimal', 'frosted-glass'],
      description: 'Visual variant for testimonials',
      table: {category: 'Testimonials'},
      if: {arg: 'showTestimonials', truthy: true},
    },
    testimonialDisplayedAuthorImage: {
      control: {type: 'radio'},
      options: ['logo', 'avatar'],
      description: 'Type of author image to display in testimonials',
      table: {category: 'Testimonials'},
      if: {arg: 'showTestimonials', truthy: true},
    },
    testimonialQuoteMarkColor: {
      control: {type: 'select'},
      options: TestimonialQuoteMarkColors,
      description: 'Color of the quote mark in testimonials',
      table: {category: 'Testimonials'},
      if: {arg: 'showTestimonials', truthy: true},
    },

    // Rivers controls
    showRivers: {
      control: 'boolean',
      description: 'Show rivers section',
      table: {category: 'River'},
    },
    riverType: {
      control: {type: 'radio'},
      options: ['river', 'riverBreakout', 'riverAccordion'],
      description: 'Type of river layout',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },
    riverAlign: {
      control: {type: 'select'},
      options: ['start', 'center', 'end'],
      description: 'Alignment of river content',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },
    riverCtaVariant: {
      control: {type: 'select'},
      options: ['default', 'accent'],
      description: 'Variant for river CTA link',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },
    riverHasCta: {
      control: 'boolean',
      description: 'Show CTA link in river',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },
    riverHasLeadingVisual: {
      control: 'boolean',
      description: 'Show leading visual in river',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },
    riverHasShadow: {
      control: 'boolean',
      description: 'Enable shadow on river visual',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },
    riverHasTrailingComponent: {
      control: 'boolean',
      description: 'Show trailing component in river',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },
    riverImageTextRatio: {
      control: {type: 'select'},
      options: ['50:50', '60:40'],
      description: 'Image to text ratio in river',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },
    riverHasLabel: {
      control: 'boolean',
      description: 'Show label in river',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },
    riverLabelColor: {
      control: {type: 'select'},
      options: LabelColors,
      description: 'Color of the river label',
      table: {category: 'River'},
      if: {arg: 'riverHasLabel', truthy: true},
    },
    riverLabelSize: {
      control: {type: 'select'},
      options: ['small', 'medium', 'large'],
      description: 'Size of the river label',
      table: {category: 'River'},
      if: {arg: 'riverHasLabel', truthy: true},
    },
    riverVisualType: {
      control: {type: 'radio'},
      options: ['image', 'video'],
      description: 'Type of visual to display in river',
      table: {category: 'River'},
      if: {arg: 'showRivers', truthy: true},
    },

    enableRiverStoryScroll: {
      control: 'boolean',
      description: 'Enable river story scroll',
      table: {category: 'River'},
    },

    // Visual settings controls
    backgroundColor: {
      control: {type: 'select'},
      options: ['default', 'subtle'],
      description: 'Section background color',
      table: {category: 'Visual Settings'},
    },
    paddingBlockStart: {
      control: {type: 'select'},
      options: ['none', 'condensed', 'normal', 'spacious'],
      description: 'Top padding of the section',
      table: {category: 'Visual Settings'},
    },
    paddingBlockEnd: {
      control: {type: 'select'},
      options: ['none', 'condensed', 'normal', 'spacious'],
      description: 'Bottom padding of the section',
      table: {category: 'Visual Settings'},
    },
    colorMode: {
      control: {type: 'select'},
      options: ['inherit', 'light', 'dark'],
      description: 'Color mode for the section',
      table: {category: 'Visual Settings'},
    },
    verticalGap: {
      control: {type: 'select'},
      options: ['none', 'condensed', 'normal', 'spacious'],
      description: 'Vertical gap between elements',
      table: {category: 'Visual Settings'},
    },
    roundedCorners: {
      control: 'boolean',
      description: 'Enable rounded corners',
      table: {category: 'Visual Settings'},
    },
    hasBorderBottom: {
      control: 'boolean',
      description: 'Show bottom border',
      table: {category: 'Visual Settings'},
    },
  },
}

export default meta

export const Default: StoryObj<typeof FlexSection> = {
  // @ts-expect-error As this is purely a demo component the types are not exact
  render: args => <FlexSection component={createMockData(args)} />,
}
