import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {NavList} from '.'
import {ThemeProvider} from '../ThemeProvider'

const meta = {
  title: 'Components/NavList/Features',
  component: NavList,
} satisfies Meta<typeof NavList>

export default meta
type Story = StoryObj<typeof NavList>

const LongLabel = 'Very long navigation label that demonstrates truncation when the container becomes narrow'

export const Sections: Story = {
  render: () => (
    <NavList aria-label="Section navigation">
      <NavList.Item defaultExpanded>
        Products
        <NavList.SubNav>
          <NavList.Item href="#" aria-current="page">
            Copilot
          </NavList.Item>
          <NavList.Item href="#">Codespaces</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item defaultExpanded>
        Collaboration
        <NavList.SubNav>
          <NavList.Item href="#">Pull requests</NavList.Item>
          <NavList.Item href="#">Branches</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
    </NavList>
  ),
}

export const FourLevels: Story = {
  render: () => (
    <NavList aria-label="Four-level navigation">
      <NavList.Item defaultExpanded>
        GitHub Copilot
        <NavList.SubNav>
          <NavList.Item defaultExpanded>
            Guides
            <NavList.SubNav>
              <NavList.Item defaultExpanded>
                Agents
                <NavList.SubNav>
                  <NavList.Item href="#" aria-current="page">
                    Build an agent
                  </NavList.Item>
                  <NavList.Item href="#">Debug an agent</NavList.Item>
                </NavList.SubNav>
              </NavList.Item>
              <NavList.Item href="#">Billing</NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item href="#">Quickstart</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Code review</NavList.Item>
    </NavList>
  ),
}

export const FourLevelsCollapsed: Story = {
  render: () => (
    <NavList aria-label="Collapsed four-level navigation">
      <NavList.Item>
        GitHub Copilot
        <NavList.SubNav>
          <NavList.Item>
            Guides
            <NavList.SubNav>
              <NavList.Item>
                Agents
                <NavList.SubNav>
                  <NavList.Item href="#">Build an agent</NavList.Item>
                  <NavList.Item href="#">Debug an agent</NavList.Item>
                </NavList.SubNav>
              </NavList.Item>
              <NavList.Item href="#">Billing</NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item href="#">Quickstart</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Code review</NavList.Item>
    </NavList>
  ),
}

export const TwoLevels: Story = {
  render: () => (
    <NavList aria-label="Two-level navigation">
      <NavList.Item defaultExpanded>
        GitHub Copilot
        <NavList.SubNav>
          <NavList.Item href="#" aria-current="page">
            Overview
          </NavList.Item>
          <NavList.Item href="#">Quickstart</NavList.Item>
          <NavList.Item href="#">Billing</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Security</NavList.Item>
    </NavList>
  ),
}

export const ThreeLevels: Story = {
  render: () => (
    <NavList aria-label="Three-level navigation">
      <NavList.Item defaultExpanded>
        GitHub Copilot
        <NavList.SubNav>
          <NavList.Item defaultExpanded>
            Guides
            <NavList.SubNav>
              <NavList.Item href="#" aria-current="page">
                Agents
              </NavList.Item>
              <NavList.Item href="#">Extensions</NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item href="#">Quickstart</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Actions</NavList.Item>
    </NavList>
  ),
}

export const NestedExpanded: Story = {
  render: () => (
    <NavList aria-label="Nested navigation">
      <NavList.Item defaultExpanded>
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
      <NavList.Item>
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
        <NavList.Item defaultExpanded>
          {LongLabel}
          <NavList.SubNav>
            <NavList.Item href="#" aria-current="page">
              {LongLabel}
            </NavList.Item>
          </NavList.SubNav>
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
        <NavList.Item defaultExpanded>
          Copilot
          <NavList.SubNav>
            <NavList.Item href="#" aria-current="page">
              Overview
            </NavList.Item>
            <NavList.Item href="#">Quickstart</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item href="#">Documentation</NavList.Item>
      </NavList>
    </ThemeProvider>
  ),
}
