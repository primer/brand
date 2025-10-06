import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Breadcrumbs} from '.'

const meta = {
  title: 'Components/Breadcrumbs/Features',
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Accent: Story = {
  name: 'Accent variant',
  render: () => (
    <Breadcrumbs variant="accent">
      <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/copilot/chat" selected>
        Chat
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
}

export const LongLinks: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item href="/longlink1">Start here</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/longlink2">A very long link label</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/longlink3" selected>
        Another example of a very long link label that is likely to appear in a breadcrumb
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
}

export const LongLinksNarrow: Story = {
  name: 'Long links (narrow viewport)',
  render: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item href="/longlink1">Start here</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/longlink2">A very long link label</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/longlink3" selected>
        Another example of a very long link label that is likely to appear in a breadcrumb
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
  globals: {
    viewport: {value: 'iphone6'},
  },
}
