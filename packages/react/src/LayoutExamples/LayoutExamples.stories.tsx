import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import {KitchenSink} from './KitchenSink'
import {ResourcesHubExample} from './Resources'

export default {
  title: 'Layout/Full page examples',
  component: KitchenSink,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS
    },
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof KitchenSink>

export const KitchenSinkPlayground: ComponentStory<typeof KitchenSink> = args => <KitchenSink {...args} />

KitchenSinkPlayground.storyName = 'Kitchen Sink'

export const KitchenSinkPlaygroundMobile: ComponentStory<typeof KitchenSink> = args => <KitchenSink {...args} />
KitchenSinkPlaygroundMobile.storyName = 'Kitchen Sink (mobile)'

KitchenSinkPlaygroundMobile.parameters = {
  viewport: {
    defaultViewport: 'iphonex'
  }
}

export const ResourcesHubExamplePlayground: ComponentStory<typeof ResourcesHubExample> = args => (
  <ResourcesHubExample {...args} />
)
ResourcesHubExamplePlayground.storyName = 'Resources Hub'

export const ResourcesHubExampleMobilePlayground: ComponentStory<typeof ResourcesHubExample> = args => (
  <ResourcesHubExample {...args} />
)
ResourcesHubExampleMobilePlayground.storyName = 'Resources Hub (mobile)'
ResourcesHubExampleMobilePlayground.parameters = {
  viewport: {
    defaultViewport: 'iphonex'
  }
}
