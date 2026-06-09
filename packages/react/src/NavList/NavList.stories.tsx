import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {BookIcon, CodeIcon, CopilotIcon, GitPullRequestIcon, KebabHorizontalIcon} from '@primer/octicons-react'

import {NavList} from '.'

const meta = {
  title: 'Components/NavList',
  component: NavList,
  args: {
    'aria-label': 'Docs navigation',
  },
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the navigation landmark.',
    },
  },
} satisfies Meta<typeof NavList>

export default meta
type Story = StoryObj<typeof NavList>

export const Default: Story = {
  render: args => (
    <NavList {...args}>
      <NavList.Item href="#">Overview</NavList.Item>
      <NavList.Item href="#" aria-current="page">
        GitHub Copilot
      </NavList.Item>
      <NavList.Item href="#">Code review</NavList.Item>
      <NavList.Item href="#">Security</NavList.Item>
    </NavList>
  ),
}

export const Playground: Story = {
  render: args => (
    <NavList {...args}>
      <NavList.Group title="Platform">
        <NavList.Item href="#" leadingVisual={CopilotIcon} aria-current="page">
          GitHub Copilot
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={CodeIcon}>
          Codespaces
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={GitPullRequestIcon} trailingVisual={<KebabHorizontalIcon />}>
          Pull requests
        </NavList.Item>
      </NavList.Group>
      <NavList.Divider />
      <NavList.Group title="Resources">
        <NavList.Item href="#" defaultExpanded leadingVisual={BookIcon}>
          Documentation
          <NavList.SubNav>
            <NavList.Item href="#" aria-current="page">
              Quickstart
            </NavList.Item>
            <NavList.Item href="#">API reference</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList.Group>
    </NavList>
  ),
}
