import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'

import {Hero} from '.'

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof Hero>

export const Default: Story = {
  render: () => (
    <Hero>
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    </Hero>
  ),
}
