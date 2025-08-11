import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {FlexSection} from './FlexSection'

// Function to generate mock data based on story args
const createMockData = (args: Record<string, unknown>) => ({
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

export default {
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
      if: {arg: 'showIntroContent'},
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
      if: {arg: 'showProse'},
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
      if: {arg: 'showPillars'},
    },
    pillar1Title: {
      control: 'text',
      description: 'First pillar title',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars'},
    },
    pillar1Description: {
      control: 'text',
      description: 'First pillar description',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars'},
    },
    pillar2Title: {
      control: 'text',
      description: 'Second pillar title',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars'},
    },
    pillar2Description: {
      control: 'text',
      description: 'Second pillar description',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars'},
    },
    pillar3Title: {
      control: 'text',
      description: 'Third pillar title',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars'},
    },
    pillar3Description: {
      control: 'text',
      description: 'Third pillar description',
      table: {category: 'Pillars'},
      if: {arg: 'showPillars'},
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
    enableRiverStoryScroll: {
      control: 'boolean',
      description: 'Enable river story scroll',
      table: {category: 'Visual Settings'},
    },
  },
} as Meta<typeof FlexSection>

export const FlexSectionDefault: StoryFn<typeof FlexSection> = args => <FlexSection component={createMockData(args)} />

FlexSectionDefault.storyName = 'Default'
