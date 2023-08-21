import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {FeaturePreviewLevelOne} from './FeaturePreviewLevelOne'
import {FeaturePreviewLevelTwo} from './FeaturePreviewLevelTwo'
import {FeaturePreviewLevelZero} from './FeaturePreviewLevelZero'
import {themeDetailsMap} from './helpers'
import {ColorModesEnum} from '../../ThemeProvider'

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
    colorMode: ColorModesEnum.LIGHT,
    accentColor: 'ai',
  },
  argTypes: {
    colorMode: {
      control: 'radio',
      options: [ColorModesEnum.LIGHT, ColorModesEnum.DARK],
      table: {
        category: 'Theming',
      },
    },
    accentColor: {
      control: 'radio',
      options: Object.keys(themeDetailsMap),
      table: {
        category: 'Theming',
      },
    },
  },
} as Meta<typeof FeaturePreviewLevelOne>

export const LevelZero: StoryFn<typeof FeaturePreviewLevelZero> = args => (
  <FeaturePreviewLevelZero accentColor={args.accentColor} colorMode={args.colorMode} />
)

LevelZero.storyName = 'Level 0'

export const LevelOne: StoryFn<typeof FeaturePreviewLevelOne> = args => (
  <FeaturePreviewLevelOne accentColor={args.accentColor} colorMode={args.colorMode} />
)

LevelOne.storyName = 'Level 1'

export const LevelTwo: StoryFn<typeof FeaturePreviewLevelTwo> = args => (
  <FeaturePreviewLevelTwo accentColor={args.accentColor} colorMode={args.colorMode} />
)

LevelTwo.storyName = 'Level 2'
