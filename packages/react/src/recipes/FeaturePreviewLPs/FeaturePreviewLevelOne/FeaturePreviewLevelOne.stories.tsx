import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'

import {FeaturePreviewLevelOne} from './FeaturePreviewLevelOne'
import {FeaturePreviewLevelOneSideBySide} from './FeaturePreviewLevelOneSideBySide'

import {themeDetailsMap} from '../helpers'
import {ColorModesEnum} from '../../../ThemeProvider'

export default {
  title: 'Recipes/Feature previews/Level 1',
  component: FeaturePreviewLevelOne,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
  args: {
    colorMode: ColorModesEnum.LIGHT,
    formType: 'default',
    accentColor: 'ai',
    heroLabel: 'Release type',
    heroTitle: 'Expressive headline about a sweet feature',
    heroDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar.',
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
      options: [...Object.keys(themeDetailsMap)],
      table: {
        category: 'Theming',
      },
    },
    formType: {
      name: 'form type',
      control: 'radio',
      options: ['default', 'extended'],
      table: {
        category: 'Section: Form',
      },
    },
    /**
     * Hero
     */
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
  },
} as Meta<typeof FeaturePreviewLevelOne>

export const LevelOneDefault: StoryFn<typeof FeaturePreviewLevelOne> = args => <FeaturePreviewLevelOne {...args} />

LevelOneDefault.storyName = 'Default'

export const LevelOneSideBySide: StoryFn<typeof FeaturePreviewLevelOneSideBySide> = args => (
  <FeaturePreviewLevelOneSideBySide {...args} />
)

LevelOneSideBySide.storyName = 'Side-by-side'
LevelOneSideBySide.args = {
  heroLabel: 'Label',
}

export const LevelOneSideBySideEnterprise: StoryFn<typeof FeaturePreviewLevelOneSideBySide> = args => (
  <FeaturePreviewLevelOneSideBySide {...args} isEnterprise />
)

LevelOneSideBySideEnterprise.storyName = 'Side-by-side - Enteprise'
LevelOneSideBySideEnterprise.args = {
  heroLabel: 'Label',
  formType: 'extended',
  colorMode: ColorModesEnum.DARK,
}
