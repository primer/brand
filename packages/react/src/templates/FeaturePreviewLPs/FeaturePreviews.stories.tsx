import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {FeaturePreviewLevelOne} from './FeaturePreviewLevelOne'
import {FeaturePreviewLevelTwo} from './FeaturePreviewLevelTwo'
import {FeaturePreviewLevelZero} from './FeaturePreviewLevelZero'
import {themeMap} from './helpers'

export default {
  title: 'Templates/Feature previews',
  component: FeaturePreviewLevelOne,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
  args: {
    accentColor: 'default',
  },
  argTypes: {
    accentColor: {
      control: 'radio',
      options: Object.keys(themeMap),
      table: {
        category: 'Themeing',
      },
    },
  },
} as Meta<typeof FeaturePreviewLevelOne>

export const LevelZero: StoryFn<typeof FeaturePreviewLevelZero> = args => (
  <FeaturePreviewLevelZero accentColor={args.accentColor} />
)

LevelZero.storyName = 'Level 0'

export const LevelOne: StoryFn<typeof FeaturePreviewLevelOne> = args => (
  <FeaturePreviewLevelOne accentColor={args.accentColor} />
)

LevelOne.storyName = 'Level 1'

export const LevelTwo: StoryFn<typeof FeaturePreviewLevelTwo> = args => (
  <FeaturePreviewLevelTwo accentColor={args.accentColor} />
)

LevelTwo.storyName = 'Level 2'
