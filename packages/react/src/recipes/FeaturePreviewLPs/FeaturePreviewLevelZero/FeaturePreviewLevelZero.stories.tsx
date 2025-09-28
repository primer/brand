import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'

import {ColorModesEnum} from '../../../ThemeProvider'
import {themeDetailsMap} from '../helpers'
import {FeaturePreviewLevelZero} from './FeaturePreviewLevelZero'

export default {
  title: 'Recipes/Feature previews/Level0',
  component: FeaturePreviewLevelZero,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
  args: {
    colorMode: ColorModesEnum.LIGHT,
    accentColor: 'ai',
    showHeroVisual: true,
    heroAlign: 'start',
    heroVisualPosition: 'inline-end',
    heroLabel: 'Release type',
    heroTitle: 'Expressive headline about a sweet feature',
    heroDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar.',
    heroCtaTextPrimary: 'Primary CTA',
    heroCtaTextSecondary: 'Secondary CTA',
  },
  argTypes: {
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
    showHeroVisual: {
      control: 'boolean',
      name: 'show visual',
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
  },
} as Meta<typeof FeaturePreviewLevelZero>

export const LevelZero: StoryFn<typeof FeaturePreviewLevelZero> = args => <FeaturePreviewLevelZero {...args} />

LevelZero.storyName = 'Level 0'
