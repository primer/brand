import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'
import {Breadcrumbs} from '.'

export default {
  title: 'Components/Breadcrumbs/Features',
  component: Breadcrumbs,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof Breadcrumbs>

export const Accent = () => (
  <Breadcrumbs variant="accent">
    <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/copilot/chat" selected>
      Chat
    </Breadcrumbs.Item>
  </Breadcrumbs>
)
Accent.storyName = 'Accent variant'

export const LongLinks = () => (
  <Breadcrumbs>
    <Breadcrumbs.Item href="/longlink1">Start here</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/longlink2">A very long link label</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/longlink3" selected>
      Another example of a very long link label that is likely to appear in a breadcrumb
    </Breadcrumbs.Item>
  </Breadcrumbs>
)

export const LongLinksNarrow = () => <LongLinks />
LongLinksNarrow.storyName = 'Long links (narrow viewport)'
LongLinksNarrow.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
}
