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

const ArticleLabels = [
  'Overview',
  'Quickstart',
  'Install GitHub Copilot',
  'Configure your editor',
  'Manage policies',
  'Troubleshooting',
]

const renderArticleItems = (labels = ArticleLabels, currentLabel?: string) =>
  labels.map((label, index) => (
    <NavList.Item key={`${label}-${index}`} href="#" aria-current={label === currentLabel ? 'page' : undefined}>
      {label}
    </NavList.Item>
  ))

export const Default: Story = {
  render: args => (
    <NavList {...args}>
      <NavList.Item defaultExpanded>
        GitHub Copilot
        <NavList.SubNav>{renderArticleItems(ArticleLabels, 'Overview')}</NavList.SubNav>
      </NavList.Item>
      <NavList.Item>
        Code review
        <NavList.SubNav>
          {renderArticleItems(['Overview', 'Review pull requests', 'Configure coding guidelines'])}
        </NavList.SubNav>
      </NavList.Item>
    </NavList>
  ),
}

export const Playground: Story = {
  render: args => (
    <NavList {...args}>
      <NavList.Item defaultExpanded>
        GitHub Copilot
        <NavList.SubNav>
          {renderArticleItems(['Overview', 'What is GitHub Copilot?'])}
          <NavList.Item defaultExpanded>
            Guides
            <NavList.SubNav>
              <NavList.Item defaultExpanded>
                Agents
                <NavList.SubNav>
                  {renderArticleItems(
                    ['Build an agent', 'Customize an agent', 'Debug an agent', 'Deploy an agent'],
                    'Build an agent',
                  )}
                </NavList.SubNav>
              </NavList.Item>
              <NavList.Item>
                Extensions
                <NavList.SubNav>
                  {renderArticleItems(['Install an extension', 'Publish an extension', 'Manage permissions'])}
                </NavList.SubNav>
              </NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item>
        Code review
        <NavList.SubNav>
          {renderArticleItems(['Overview', 'Review pull requests', 'Configure rulesets', 'Use suggested changes'])}
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item defaultExpanded>
        Resources
        <NavList.SubNav>{renderArticleItems(['Changelog', 'API reference', 'REST API', 'GraphQL API'])}</NavList.SubNav>
      </NavList.Item>
      <NavList.Item>
        Security
        <NavList.SubNav>{renderArticleItems(['Overview', 'Secret scanning', 'Code scanning'])}</NavList.SubNav>
      </NavList.Item>
    </NavList>
  ),
}
