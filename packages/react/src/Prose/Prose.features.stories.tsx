import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Prose} from './Prose'
import {ExampleHtmlMarkup} from './Prose.stories'

export default {
  title: 'Components/Prose/Features',
  component: Prose,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as ComponentMeta<typeof Prose>

export const FullWidth: ComponentStory<typeof Prose> = () => <Prose enableFullWidth rawHtmlMarkup={ExampleHtmlMarkup} />

export const NarrowViewFullWidth: ComponentStory<typeof Prose> = () => <Prose rawHtmlMarkup={ExampleHtmlMarkup} />
NarrowViewFullWidth.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
NarrowViewFullWidth.storyName = 'Narrow view, full width (mobile)'

export const RegularViewFullWidth: ComponentStory<typeof Prose> = () => <Prose rawHtmlMarkup={ExampleHtmlMarkup} />
RegularViewFullWidth.parameters = {
  viewport: {
    defaultViewport: 'ipad10p',
  },
  axe: {
    timeout: 5000,
  },
}
RegularViewFullWidth.storyName = 'Regular view, full width (tablet)'
