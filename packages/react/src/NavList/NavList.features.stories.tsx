import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {NavList} from '.'
import {ThemeProvider} from '../ThemeProvider'

import styles from './NavList.stories.module.css'

const meta = {
  title: 'Components/NavList/Features',
  component: NavList,
} satisfies Meta<typeof NavList>

export default meta
type Story = StoryObj<typeof NavList>

const WrappingLabels = {
  section: 'GitHub Advanced Security administration',
  category: 'Code scanning default setup configuration',
  article: 'Default setup for code scanning alert notifications',
}

const renderArticleItems = (labels: string[], currentLabel?: string) =>
  labels.map(label => (
    <NavList.Item key={label} href="#" aria-current={label === currentLabel ? 'page' : undefined}>
      {label}
    </NavList.Item>
  ))

const ExpandedDocsNavigation = ({colorMode}: {colorMode?: 'light' | 'dark'}) => {
  const nav = (
    <NavList aria-label="Docs navigation">
      <NavList.Item defaultExpanded>
        GitHub Copilot
        <NavList.SubNav>
          {renderArticleItems([
            'Overview',
            'Quickstart',
            'Install GitHub Copilot',
            'Configure your editor',
            'Manage policies',
          ])}
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item defaultExpanded>
        Code review
        <NavList.SubNav>
          {renderArticleItems(['Overview', 'Review pull requests', 'Use suggested changes', 'Configure rulesets'])}
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item defaultExpanded>
        GitHub Actions
        <NavList.SubNav>
          {renderArticleItems(
            ['Overview', 'Write workflows', 'Use marketplace actions', 'Manage runners'],
            'Write workflows',
          )}
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item defaultExpanded>
        Security
        <NavList.SubNav>
          {renderArticleItems(['Overview', 'Secret scanning', 'Code scanning', 'Dependabot alerts'])}
        </NavList.SubNav>
      </NavList.Item>
    </NavList>
  )

  return colorMode ? <ThemeProvider colorMode={colorMode}>{nav}</ThemeProvider> : nav
}

const CollapsedCurrentDescendantNavigation = () => {
  const [isActionsExpanded, setIsActionsExpanded] = React.useState(false)

  return (
    <NavList aria-label="Collapsed current descendant navigation">
      <NavList.Item expanded={isActionsExpanded} onExpandedChange={setIsActionsExpanded}>
        GitHub Actions
        <NavList.SubNav>
          <NavList.Item defaultExpanded>
            Workflows
            <NavList.SubNav>
              {renderArticleItems(['Workflow syntax', 'Reuse workflows', 'Store workflow data'], 'Workflow syntax')}
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item>
            Runners
            <NavList.SubNav>{renderArticleItems(['Hosted runners', 'Self-hosted runners'])}</NavList.SubNav>
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item defaultExpanded>
        Security
        <NavList.SubNav>{renderArticleItems(['Overview', 'Secret scanning', 'Code scanning'])}</NavList.SubNav>
      </NavList.Item>
    </NavList>
  )
}

export const MultipleExpandedSections: Story = {
  render: () => <ExpandedDocsNavigation />,
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
          <NavList.Item>
            Administration
            <NavList.SubNav>{renderArticleItems(['Overview', 'Policies', 'Audit log'])}</NavList.SubNav>
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item>
        Code review
        <NavList.SubNav>
          {renderArticleItems(['Overview', 'Review pull requests', 'Use suggested changes'])}
        </NavList.SubNav>
      </NavList.Item>
    </NavList>
  ),
}

export const CollapsedCurrentDescendant: Story = {
  render: () => <CollapsedCurrentDescendantNavigation />,
}

export const LongLabels: Story = {
  render: () => (
    <div className={styles.NarrowStoryWrapper}>
      <NavList aria-label="Long label navigation">
        <NavList.Item defaultExpanded>
          {WrappingLabels.section}
          <NavList.SubNav>
            <NavList.Item defaultExpanded>
              {WrappingLabels.category}
              <NavList.SubNav>
                <NavList.Item href="#" aria-current="page">
                  {WrappingLabels.article}
                </NavList.Item>
              </NavList.SubNav>
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
    colorMode: 'dark',
  },
  render: () => <ExpandedDocsNavigation colorMode="dark" />,
}
