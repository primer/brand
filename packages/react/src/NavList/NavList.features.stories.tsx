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

const ArticleLabels = [
  'Level 4 page article',
  'Configure your project',
  'Manage access',
  'Review changes',
  'Troubleshooting',
  'Reference',
  'Changelog',
  'FAQ',
]

const renderArticleItems = (labels = ArticleLabels, currentLabel?: string) =>
  labels.map((label, index) => (
    <NavList.Item key={`${label}-${index}`} href="#" aria-current={label === currentLabel ? 'page' : undefined}>
      {label}
    </NavList.Item>
  ))

const CollapsedSection = ({children = 'Level 1 section (collapsed)'}: {children?: React.ReactNode}) => (
  <NavList.Item>
    {children}
    <NavList.SubNav>{renderArticleItems(['Overview', 'Guides', 'Reference'])}</NavList.SubNav>
  </NavList.Item>
)

export const Sections: Story = {
  render: () => (
    <NavList aria-label="Section navigation">
      <NavList.Item defaultExpanded>
        Level 1 section (1 tier)
        <NavList.SubNav>{renderArticleItems()}</NavList.SubNav>
      </NavList.Item>
      <NavList.Item defaultExpanded>
        Level 1 section (2 tiers)
        <NavList.SubNav>
          <NavList.Item defaultExpanded>
            Level 2 category
            <NavList.SubNav>{renderArticleItems()}</NavList.SubNav>
          </NavList.Item>
          <NavList.Item>
            Level 2 category
            <NavList.SubNav>{renderArticleItems(['Overview', 'Settings', 'Reference'])}</NavList.SubNav>
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <CollapsedSection />
      <CollapsedSection />
      <CollapsedSection />
    </NavList>
  ),
}

export const FourLevels: Story = {
  render: () => (
    <NavList aria-label="Four-level navigation">
      <NavList.Item defaultExpanded>
        Level 1 section (3 tiers)
        <NavList.SubNav>
          <NavList.Item defaultExpanded>
            Level 2 category
            <NavList.SubNav>
              <NavList.Item defaultExpanded>
                Level 3 subcategory
                <NavList.SubNav>
                  {renderArticleItems(
                    ['Level 4 page article', 'Create a workflow', 'Configure permissions', 'Review logs'],
                    'Level 4 page article',
                  )}
                </NavList.SubNav>
              </NavList.Item>
              <NavList.Item>
                Level 3 subcategory
                <NavList.SubNav>{renderArticleItems(['Overview', 'Examples', 'API reference'])}</NavList.SubNav>
              </NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item>
            Level 2 category
            <NavList.SubNav>{renderArticleItems(['Overview', 'Billing', 'Limits', 'Release notes'])}</NavList.SubNav>
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <CollapsedSection />
      <CollapsedSection />
    </NavList>
  ),
}

export const FourLevelsCollapsed: Story = {
  render: () => (
    <NavList aria-label="Collapsed four-level navigation">
      <NavList.Item expanded={false}>
        Level 1 section (collapsed)
        <NavList.SubNav>
          <NavList.Item>
            Level 2 category
            <NavList.SubNav>
              <NavList.Item>
                Level 3 subcategory
                <NavList.SubNav>
                  {renderArticleItems(
                    ['Level 4 page article', 'Create a workflow', 'Configure permissions'],
                    'Level 4 page article',
                  )}
                </NavList.SubNav>
              </NavList.Item>
              <NavList.Item href="#">Level 4 page article</NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item href="#">Level 4 page article</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <CollapsedSection />
      <CollapsedSection />
    </NavList>
  ),
}

export const TwoLevels: Story = {
  render: () => (
    <NavList aria-label="Two-level navigation">
      <NavList.Item defaultExpanded>
        GitHub Copilot
        <NavList.SubNav>{renderArticleItems(ArticleLabels, 'Level 4 page article')}</NavList.SubNav>
      </NavList.Item>
      <CollapsedSection>Security</CollapsedSection>
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
              {renderArticleItems(['Agents', 'Extensions', 'Billing', 'Troubleshooting'], 'Agents')}
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item>
            Administration
            <NavList.SubNav>{renderArticleItems(['Overview', 'Policies', 'Audit log'])}</NavList.SubNav>
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <CollapsedSection>Actions</CollapsedSection>
    </NavList>
  ),
}

export const NestedExpanded: Story = {
  render: () => (
    <NavList aria-label="Nested navigation">
      <NavList.Item defaultExpanded>
        Documentation
        <NavList.SubNav>
          {renderArticleItems(['Overview', 'Guides', 'API reference', 'Examples', 'Changelog'], 'Overview')}
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
            {renderArticleItems(['Overview', 'Quickstart', 'Policies', 'Audit log'], 'Overview')}
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item href="#">Documentation</NavList.Item>
      </NavList>
    </ThemeProvider>
  ),
}
