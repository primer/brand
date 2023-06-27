import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {CTABanner} from '.'
import {Button} from '../Button'

export default {
  title: 'Components/CTABanner',
  component: CTABanner,
  args: {
    align: 'start',
    hasBorder: false,
    hasShadow: true,
    hasBackground: true,
  },
  argTypes: {
    align: {
      description: 'The alignment of the content',
      control: {
        type: 'radio',
        options: ['start', 'center'],
      },
    },
    hasBorder: {
      description: 'Toggle to show or hide the border',
      control: {
        type: 'boolean',
      },
    },
    hasShadow: {
      description: 'Toggle to show or hide the background shadow',
      control: {
        type: 'boolean',
      },
    },
    hasBackground: {
      description: 'Toggle to show or hide the background',
      control: {
        type: 'boolean',
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof CTABanner>

export const Playground: StoryFn<typeof CTABanner> = args => (
  <CTABanner {...args}>
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Primary Action</Button>
      <Button>Secondary Action</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
)

export const Default = Playground.bind({})
