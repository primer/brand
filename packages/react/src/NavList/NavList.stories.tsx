import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

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
      <NavList.Item defaultExpanded>
        GitHub Copilot
        <NavList.SubNav>
          <NavList.Item href="#" aria-current="page">
            Overview
          </NavList.Item>
          <NavList.Item href="#">Concepts</NavList.Item>
          <NavList.Item href="#">Quickstart</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Code review</NavList.Item>
    </NavList>
  ),
}

export const Playground: Story = {
  render: args => (
    <NavList {...args}>
      <NavList.Item defaultExpanded>
        GitHub Copilot
        <NavList.SubNav>
          <NavList.Item href="#">Overview</NavList.Item>
          <NavList.Item defaultExpanded>
            Guides
            <NavList.SubNav>
              <NavList.Item defaultExpanded>
                Agents
                <NavList.SubNav>
                  <NavList.Item href="#" aria-current="page">
                    Build an agent
                  </NavList.Item>
                  <NavList.Item href="#">Customize an agent</NavList.Item>
                </NavList.SubNav>
              </NavList.Item>
              <NavList.Item href="#">Extensions</NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item>
        Code review
        <NavList.SubNav>
          <NavList.Item href="#">Overview</NavList.Item>
          <NavList.Item href="#">Review pull requests</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item defaultExpanded>
        Resources
        <NavList.SubNav>
          <NavList.Item href="#">Changelog</NavList.Item>
          <NavList.Item href="#">API reference</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
    </NavList>
  ),
}
