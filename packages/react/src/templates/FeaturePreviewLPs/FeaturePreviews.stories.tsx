import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {FeaturePreviewLevelOne} from './FeaturePreviewLevelOne'
import {FeaturePreviewLevelTwo} from './FeaturePreviewLevelTwo'
import {FeaturePreviewLevelZero} from './FeaturePreviewLevelZero'

export default {
  title: 'Templates/Feature previews',
  component: FeaturePreviewLevelOne,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
} as Meta<typeof FeaturePreviewLevelOne>

export const LevelZero: StoryFn<typeof FeaturePreviewLevelZero> = () => <FeaturePreviewLevelZero />

LevelZero.storyName = 'Level 0'

export const LevelOne: StoryFn<typeof FeaturePreviewLevelOne> = () => <FeaturePreviewLevelOne />

LevelOne.storyName = 'Level 1'

export const LevelTwo: StoryFn<typeof FeaturePreviewLevelTwo> = () => <FeaturePreviewLevelTwo />

LevelTwo.storyName = 'Level 2'
