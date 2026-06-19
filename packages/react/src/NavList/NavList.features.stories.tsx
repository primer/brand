import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {
  BookIcon,
  CodeIcon,
  CopilotIcon,
  KebabHorizontalIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from '@primer/octicons-react'

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

export const Sections: Story = {
  render: () => <ExpandedDocsNavigation />,
}

export const MultipleLevels: Story = {
  render: () => (
    <NavList aria-label="Multiple-level navigation">
      <NavList.Item defaultExpanded>
        Level 1 section
        <NavList.SubNav>
          <NavList.Item href="#">Level 2 leaf</NavList.Item>
          <NavList.Item defaultExpanded>
            Level 2 section
            <NavList.SubNav>
              <NavList.Item href="#">Level 3 leaf</NavList.Item>
              <NavList.Item defaultExpanded>
                Level 3 section
                <NavList.SubNav>
                  <NavList.Item href="#">Level 4 leaf</NavList.Item>
                  <NavList.Item defaultExpanded>
                    Level 4 section
                    <NavList.SubNav>
                      <NavList.Item href="#" aria-current="page">
                        Level 5 current leaf
                      </NavList.Item>
                      <NavList.Item href="#">Level 5 sibling leaf</NavList.Item>
                    </NavList.SubNav>
                  </NavList.Item>
                </NavList.SubNav>
              </NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
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

export const WithVisuals: Story = {
  render: () => (
    <NavList aria-label="Visual navigation">
      <NavList.Item defaultExpanded leadingVisual={BookIcon}>
        Guides
        <NavList.SubNav>
          <NavList.Item href="#" aria-current="page" leadingVisual={CopilotIcon}>
            GitHub Copilot
          </NavList.Item>
          <NavList.Item href="#" leadingVisual={WorkflowIcon}>
            GitHub Actions
          </NavList.Item>
          <NavList.Item href="#" leadingVisual={CodeIcon}>
            Codespaces
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item defaultExpanded trailingVisual={<KebabHorizontalIcon />}>
        Resources
        <NavList.SubNav>
          <NavList.Item href="#" trailingVisual={<KebabHorizontalIcon />}>
            Changelog
          </NavList.Item>
          <NavList.Item defaultExpanded trailingVisual={<KebabHorizontalIcon />}>
            API reference
            <NavList.SubNav>
              <NavList.Item href="#" trailingVisual={<ShieldCheckIcon />}>
                REST API
              </NavList.Item>
              <NavList.Item href="#" trailingVisual={<ShieldCheckIcon />}>
                GraphQL API
              </NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item href="#" trailingVisual={<KebabHorizontalIcon />}>
            Support
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
    </NavList>
  ),
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: {default: 'dark'},
    colorMode: 'dark',
  },
  render: () => <ExpandedDocsNavigation colorMode="dark" />,
}
