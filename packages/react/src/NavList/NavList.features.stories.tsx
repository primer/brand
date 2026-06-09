import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {BookIcon, CodeIcon, CopilotIcon, GitBranchIcon, GitPullRequestIcon} from '@primer/octicons-react'

import {NavList} from '.'
import {ThemeProvider} from '../ThemeProvider'

const meta = {
  title: 'Components/NavList/Features',
  component: NavList,
} satisfies Meta<typeof NavList>

export default meta
type Story = StoryObj<typeof NavList>

const LongLabel = 'Very long navigation label that demonstrates truncation when the container becomes narrow'

export const Grouped: Story = {
  render: () => (
    <NavList aria-label="Grouped navigation">
      <NavList.Group title="Products">
        <NavList.Item href="#" leadingVisual={CopilotIcon} aria-current="page">
          Copilot
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={CodeIcon}>
          Codespaces
        </NavList.Item>
      </NavList.Group>
      <NavList.Group title="Collaboration">
        <NavList.Item href="#" leadingVisual={GitPullRequestIcon}>
          Pull requests
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={GitBranchIcon}>
          Branches
        </NavList.Item>
      </NavList.Group>
    </NavList>
  ),
}

export const NestedExpanded: Story = {
  render: () => (
    <NavList aria-label="Nested navigation">
      <NavList.Item href="#" defaultExpanded leadingVisual={BookIcon}>
        Documentation
        <NavList.SubNav>
          <NavList.Item href="#" aria-current="page">
            Overview
          </NavList.Item>
          <NavList.Item href="#">Guides</NavList.Item>
          <NavList.Item href="#">API reference</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Changelog</NavList.Item>
    </NavList>
  ),
}

export const NestedCollapsed: Story = {
  render: () => (
    <NavList aria-label="Collapsed nested navigation">
      <NavList.Item href="#" leadingVisual={BookIcon}>
        Documentation
        <NavList.SubNav>
          <NavList.Item href="#">Overview</NavList.Item>
          <NavList.Item href="#">Guides</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#" aria-current="page">
        Changelog
      </NavList.Item>
    </NavList>
  ),
}

export const LongLabels: Story = {
  render: () => (
    <div style={{width: 280}}>
      <NavList aria-label="Long label navigation">
        <NavList.Item href="#" aria-current="page">
          {LongLabel}
        </NavList.Item>
        <NavList.Item href="#">Short label</NavList.Item>
      </NavList>
    </div>
  ),
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: {default: 'dark'},
  },
  render: () => (
    <ThemeProvider colorMode="dark">
      <NavList aria-label="Dark mode navigation">
        <NavList.Item href="#" leadingVisual={CopilotIcon} aria-current="page">
          Copilot
        </NavList.Item>
        <NavList.Item href="#" leadingVisual={BookIcon}>
          Documentation
        </NavList.Item>
      </NavList>
    </ThemeProvider>
  ),
}
