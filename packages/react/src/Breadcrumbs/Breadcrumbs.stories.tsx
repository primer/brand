import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {Breadcrumbs, BreadcrumbVariants} from '.'

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
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
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof Breadcrumbs>

const Template: Story = {
  render: args => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/copilot/chat" selected>
        Chat
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
}

export const Playground: Story = {
  ...Template,
}

export const Default: Story = {
  ...Template,
}
