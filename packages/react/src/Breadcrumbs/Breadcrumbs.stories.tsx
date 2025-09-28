import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'
import {Breadcrumbs, BreadcrumbVariants} from '.'

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    args: {
      variant: BreadcrumbVariants[0],
    },
    argTypes: {
      variant: {
        description: 'The variant of the Breadcrumbs.',
        control: {
          type: 'inline-radio',
        },
        options: BreadcrumbVariants,
      },
    },
  },
} as Meta<typeof Breadcrumbs>

const Template: StoryFn<typeof Breadcrumbs> = args => (
  <Breadcrumbs {...args}>
    <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/copilot/chat" selected>
      Chat
    </Breadcrumbs.Item>
  </Breadcrumbs>
)

export const Playground = Template.bind({})
export const Default = Template.bind({})
