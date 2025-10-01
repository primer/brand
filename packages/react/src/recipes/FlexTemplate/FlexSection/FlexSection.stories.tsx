import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {FlexSection} from './FlexSection'

type FlexSectionStoryArgs = {
  sectionId: 'example-section'
  showAnchorNav: boolean
  showLogosuite: boolean
  showCards: boolean
  showBento: boolean
  showBreakoutBanner: boolean
  showStatistics: boolean
  showPricingOptions: boolean

  showIntroContent: boolean
  introContentType: string

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
  statisticsShowHeadingFootnotes: boolean
  statisticsShowDescription: boolean
  statisticsDescriptionVariant: string
  statisticsShowDescriptionFootnotes: boolean

  pricingOptionsVariant: string
  pricingOptionsAlign: string
  pricingOptionsShowFootnotes: boolean
  pricingOptionsShowFeatureList: boolean
  pricingOptionsHeadingLevel: string

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
  fields: {
    id: args.sectionId,
    anchorNav: args.showAnchorNav,
    introContent: args.showIntroContent
      ? {
          sys: {
            contentType: {
              sys: {
                id: args.introContentType,
              },
            },
          },
        }
      : null,

    logoSuite: args.showLogosuite,
    cards: args.showCards,
    prose: args.showProse
      ? {
          fields: {
            content: args.proseContent,
          },
        }
      : null,
    pillars: args.showPillars
      ? {
          fields: {
            heading: args.pillarsHeading,
            items: [
              {
                title: args.pillar1Title,
                description: args.pillar1Description,
                icon: 'zap',
              },
              {
                title: args.pillar2Title,
                description: args.pillar2Description,
                icon: 'rocket',
              },
              {
                title: args.pillar3Title,
                description: args.pillar3Description,
                icon: 'shield',
              },
            ],
          },
        }
      : null,
    featuredBento: args.showBento
      ? {
          fields: {
            headingLevel: args.bentoHeadingLevel,
            showIcon: args.bentoShowIcon,
            showFootnotes: args.bentoShowFootnotes,
          },
        }
      : null,
    breakoutBanner: args.showBreakoutBanner
      ? {
          fields: {
            align: args.breakoutBannerAlign,
            showLogo: args.breakoutBannerShowLogo,
            headingLevel: args.breakoutBannerHeadingLevel,
            showFootnotes: args.breakoutBannerShowFootnotes,
          },
        }
      : null,

    statistics: args.showStatistics
      ? {
          fields: {
            count: args.statisticsCount,
            variant: args.statisticsVariant,
            size: args.statisticsSize,
            showHeadingFootnotes: args.statisticsShowHeadingFootnotes,
            showDescription: args.statisticsShowDescription,
            descriptionVariant: args.statisticsDescriptionVariant,
            showDescriptionFootnotes: args.statisticsShowDescriptionFootnotes,
          },
        }
      : null,
    pricingOptions: args.showPricingOptions
      ? {
          fields: {
            variant: args.pricingOptionsVariant,
            align: args.pricingOptionsAlign,
            showFootnotes: args.pricingOptionsShowFootnotes,
            showFeatureList: args.pricingOptionsShowFeatureList,
            headingLevel: args.pricingOptionsHeadingLevel,
          },
        }
      : null,
    visualSettings: {
      fields: {
        backgroundColor: args.backgroundColor,
        paddingBlockStart: args.paddingBlockStart,
        colorMode: args.colorMode,
        paddingBlockEnd: args.paddingBlockEnd,
        roundedCorners: args.roundedCorners,
        verticalGap: args.verticalGap,
        hasBorderBottom: args.hasBorderBottom,
        enableRiverStoryScroll: args.enableRiverStoryScroll,
      },
    },
  },
})

const meta: Meta<FlexSectionStoryArgs> = {
  title: 'Recipes/FlexTemplate/FlexSection',
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
    introContentType: 'introStackedItems',

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
    statisticsShowHeadingFootnotes: true,
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

    // Visual settings
    backgroundColor: 'default',
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
      table: {category: 'Section'},
    },
    showCards: {
      control: 'boolean',
      description: 'Show cards',
      table: {category: 'Section'},
    },
    showAnchorNav: {
      control: 'boolean',
      description: 'Show anchor navigation',
      table: {category: 'Section'},
    },

    // Intro content controls
    showIntroContent: {
      control: 'boolean',
      description: 'Show intro content section',
      table: {category: 'Intro Content'},
    },
    introContentType: {
      control: {type: 'radio'},
      options: ['introStackedItems', 'primerComponentSectionIntro'],
      description: 'Type of intro content to display',
      table: {category: 'Intro Content'},
      if: {arg: 'showIntroContent', truthy: true},
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
    statisticsShowHeadingFootnotes: {
      control: 'boolean',
      description: 'Show footnotes for statistic headings',
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

export const FlexSectionDefault: StoryFn<typeof FlexSection> = args => <FlexSection component={createMockData(args)} />

FlexSectionDefault.storyName = 'Default'
