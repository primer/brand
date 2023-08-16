import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import {KitchenSink} from './KitchenSink'
import {ResourcesHubExample} from './Resources'
import {FeaturePreviewLevelZero} from './FeaturePreviewLevelZero'
import {FeaturePreviewLevelTwo} from './FeaturePreviewLevelTwo'
import {FeaturePreviewLevelOne} from './FeaturePreviewLevelOne'

export default {
  title: 'Layout/Full page examples',
  component: KitchenSink,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
} as Meta<typeof KitchenSink>

export const KitchenSinkPlayground: StoryFn<typeof KitchenSink> = args => <KitchenSink {...args} />

KitchenSinkPlayground.storyName = 'Kitchen Sink'

export const KitchenSinkPlaygroundMobile: StoryFn<typeof KitchenSink> = args => <KitchenSink {...args} />
KitchenSinkPlaygroundMobile.storyName = 'Kitchen Sink (mobile)'

KitchenSinkPlaygroundMobile.parameters = {
  viewport: {
    defaultViewport: 'iphonex',
  },
}

export const ResourcesHubExamplePlayground: StoryFn<typeof ResourcesHubExample> = args => (
  <ResourcesHubExample {...args} />
)
ResourcesHubExamplePlayground.storyName = 'Resources Hub'

export const ResourcesHubExampleMobilePlayground: StoryFn<typeof ResourcesHubExample> = args => (
  <ResourcesHubExample {...args} />
)
ResourcesHubExampleMobilePlayground.storyName = 'Resources Hub (mobile)'
ResourcesHubExampleMobilePlayground.parameters = {
  viewport: {
    defaultViewport: 'iphonex',
  },
}

export const LevelZero: StoryFn<typeof FeaturePreviewLevelZero> = () => <FeaturePreviewLevelZero />

LevelZero.storyName = 'Feature LP - Level 0'

export const LevelOne: StoryFn<typeof FeaturePreviewLevelOne> = () => <FeaturePreviewLevelOne />

LevelOne.storyName = 'Feature LP - Level 1'

export const LevelTwo: StoryFn<typeof FeaturePreviewLevelTwo> = () => <FeaturePreviewLevelTwo />

LevelTwo.storyName = 'Feature LP - Level 2'
