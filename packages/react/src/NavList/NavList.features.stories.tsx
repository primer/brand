import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {
  BookIcon,
  CodeIcon,
  CopilotIcon,
  KebabHorizontalIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from '@primer/octicons-react'
import {useTranslation} from 'react-i18next'

import {NavList} from '.'

import styles from './NavList.stories.module.css'

const meta = {
  title: 'Components/NavList/Features',
  component: NavList,
} satisfies Meta<typeof NavList>

export default meta
type Story = StoryObj<typeof NavList>

const WrappingLabelKeys = {
  group: 'githubAdvancedSecurityAdministration',
  category: 'codeScanningDefaultSetupConfiguration',
  article: 'defaultSetupForCodeScanningAlertNotifications',
}

export const Groups: Story = {
  render: function Groups() {
    const {t} = useTranslation('NavList')

    return (
      <NavList aria-label={String(t('docsNavigation'))}>
        <NavList.Group title={t('githubCopilot')}>
          {['overview', 'quickstart', 'installGitHubCopilot', 'configureYourEditor', 'managePolicies'].map(labelKey => (
            <NavList.Item key={labelKey} href="#">
              {t(labelKey)}
            </NavList.Item>
          ))}
        </NavList.Group>
        <NavList.Group title={t('codeReview')}>
          {['overview', 'reviewPullRequests', 'useSuggestedChanges', 'configureRulesets'].map(labelKey => (
            <NavList.Item key={labelKey} href="#">
              {t(labelKey)}
            </NavList.Item>
          ))}
        </NavList.Group>
        <NavList.Group title={t('githubActions')}>
          {['overview', 'writeWorkflows', 'useMarketplaceActions', 'manageRunners'].map(labelKey => (
            <NavList.Item key={labelKey} href="#" aria-current={labelKey === 'writeWorkflows' ? 'page' : undefined}>
              {t(labelKey)}
            </NavList.Item>
          ))}
        </NavList.Group>
        <NavList.Group title={t('security')}>
          {['overview', 'secretScanning', 'codeScanning', 'dependabotAlerts'].map(labelKey => (
            <NavList.Item key={labelKey} href="#">
              {t(labelKey)}
            </NavList.Item>
          ))}
        </NavList.Group>
      </NavList>
    )
  },
}

export const NestedDisclosure: Story = {
  render: function NestedDisclosure() {
    const {t} = useTranslation('NavList')

    return (
      <NavList aria-label={String(t('nestedDisclosureNavigation'))}>
        <NavList.Group title={t('collaboration')}>
          <NavList.Item defaultExpanded>
            {t('pullRequests')}
            <NavList.SubNav>
              {['reviewPullRequests', 'useSuggestedChanges', 'configureRulesets'].map(labelKey => (
                <NavList.Item key={labelKey} href="#">
                  {t(labelKey)}
                </NavList.Item>
              ))}
            </NavList.SubNav>
          </NavList.Item>
        </NavList.Group>
        <NavList.Group title={t('automation')}>
          <NavList.Item defaultExpanded>
            {t('githubActions')}
            <NavList.SubNav>
              {['overview', 'writeWorkflows', 'useMarketplaceActions', 'manageRunners'].map(labelKey => (
                <NavList.Item key={labelKey} href="#" aria-current={labelKey === 'writeWorkflows' ? 'page' : undefined}>
                  {t(labelKey)}
                </NavList.Item>
              ))}
            </NavList.SubNav>
          </NavList.Item>
        </NavList.Group>
      </NavList>
    )
  },
}

export const MultipleLevels: Story = {
  render: function MultipleLevels() {
    const {t} = useTranslation('NavList')

    return (
      <NavList aria-label={String(t('multipleLevelNavigation'))}>
        <NavList.Item defaultExpanded>
          {t('level1Group')}
          <NavList.SubNav>
            <NavList.Item href="#">{t('level2Leaf')}</NavList.Item>
            <NavList.Item defaultExpanded>
              {t('level2Group')}
              <NavList.SubNav>
                <NavList.Item href="#">{t('level3Leaf')}</NavList.Item>
                <NavList.Item defaultExpanded>
                  {t('level3Group')}
                  <NavList.SubNav>
                    <NavList.Item href="#">{t('level4Leaf')}</NavList.Item>
                    <NavList.Item defaultExpanded>
                      {t('level4Group')}
                      <NavList.SubNav>
                        <NavList.Item href="#" aria-current="page">
                          {t('level5CurrentLeaf')}
                        </NavList.Item>
                        <NavList.Item href="#">{t('level5SiblingLeaf')}</NavList.Item>
                      </NavList.SubNav>
                    </NavList.Item>
                  </NavList.SubNav>
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>
    )
  },
}

export const CollapsedCurrentDescendant: Story = {
  render: function CollapsedCurrentDescendant() {
    const {t} = useTranslation('NavList')
    const [isActionsExpanded, setIsActionsExpanded] = useState(false)

    return (
      <NavList aria-label={String(t('collapsedCurrentDescendantNavigation'))}>
        <NavList.Item expanded={isActionsExpanded} onExpandedChange={setIsActionsExpanded}>
          {t('githubActions')}
          <NavList.SubNav>
            <NavList.Item defaultExpanded>
              {t('workflows')}
              <NavList.SubNav>
                {['workflowSyntax', 'reuseWorkflows', 'storeWorkflowData'].map(labelKey => (
                  <NavList.Item
                    key={labelKey}
                    href="#"
                    aria-current={labelKey === 'workflowSyntax' ? 'page' : undefined}
                  >
                    {t(labelKey)}
                  </NavList.Item>
                ))}
              </NavList.SubNav>
            </NavList.Item>
            <NavList.Item>
              {t('runners')}
              <NavList.SubNav>
                {['hostedRunners', 'selfHostedRunners'].map(labelKey => (
                  <NavList.Item key={labelKey} href="#">
                    {t(labelKey)}
                  </NavList.Item>
                ))}
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item defaultExpanded>
          {t('security')}
          <NavList.SubNav>
            {['overview', 'secretScanning', 'codeScanning'].map(labelKey => (
              <NavList.Item key={labelKey} href="#">
                {t(labelKey)}
              </NavList.Item>
            ))}
          </NavList.SubNav>
        </NavList.Item>
      </NavList>
    )
  },
}

export const LongLabels: Story = {
  render: function LongLabels() {
    const {t} = useTranslation('NavList')

    return (
      <div className={styles.NarrowStoryWrapper}>
        <NavList aria-label={String(t('longLabelNavigation'))}>
          <NavList.Item defaultExpanded>
            {t(WrappingLabelKeys.group)}
            <NavList.SubNav>
              <NavList.Item defaultExpanded>
                {t(WrappingLabelKeys.category)}
                <NavList.SubNav>
                  <NavList.Item href="#" aria-current="page">
                    {t(WrappingLabelKeys.article)}
                  </NavList.Item>
                </NavList.SubNav>
              </NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item href="#">{t('shortLabel')}</NavList.Item>
        </NavList>
      </div>
    )
  },
}

export const WithVisuals: Story = {
  render: function WithVisuals() {
    const {t} = useTranslation('NavList')

    return (
      <NavList aria-label={String(t('visualNavigation'))}>
        <NavList.Item defaultExpanded leadingVisual={BookIcon}>
          {t('guides')}
          <NavList.SubNav>
            <NavList.Item href="#" aria-current="page" leadingVisual={CopilotIcon}>
              {t('githubCopilot')}
            </NavList.Item>
            <NavList.Item href="#" leadingVisual={WorkflowIcon}>
              {t('githubActions')}
            </NavList.Item>
            <NavList.Item href="#" leadingVisual={CodeIcon}>
              {t('codespaces')}
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item defaultExpanded trailingVisual={<KebabHorizontalIcon />}>
          {t('resources')}
          <NavList.SubNav>
            <NavList.Item href="#" trailingVisual={<KebabHorizontalIcon />}>
              {t('changelog')}
            </NavList.Item>
            <NavList.Item defaultExpanded trailingVisual={<KebabHorizontalIcon />}>
              {t('apiReference')}
              <NavList.SubNav>
                <NavList.Item href="#" trailingVisual={<ShieldCheckIcon />}>
                  {t('restApi')}
                </NavList.Item>
                <NavList.Item href="#" trailingVisual={<ShieldCheckIcon />}>
                  {t('graphqlApi')}
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
            <NavList.Item href="#" trailingVisual={<KebabHorizontalIcon />}>
              {t('support')}
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>
    )
  },
}

export const OneHundredLinks: Story = {
  render: function OneHundredLinks() {
    const {t} = useTranslation('NavList')

    return (
      <NavList aria-label={String(t('oneHundredLinksNavigation'))}>
        {Array.from({length: 100}, (_, index) => (
          <NavList.Item key={index} href="#" aria-current={index === 0 ? 'page' : undefined}>
            {t('stressLink', {index: index + 1})}
          </NavList.Item>
        ))}
      </NavList>
    )
  },
}

export const FiveExpandedGroups: Story = {
  name: 'Five groups',
  render: function FiveExpandedGroups() {
    const {t} = useTranslation('NavList')

    return (
      <NavList aria-label={String(t('fiveExpandedGroupsNavigation'))}>
        {Array.from({length: 5}, (_groupValue, groupIndex) => (
          <NavList.Group key={groupIndex} title={t('stressGroup', {index: groupIndex + 1})}>
            {Array.from({length: 20}, (_linkValue, linkIndex) => (
              <NavList.Item
                key={linkIndex}
                href="#"
                aria-current={groupIndex === 0 && linkIndex === 0 ? 'page' : undefined}
              >
                {t('stressGroupLink', {groupIndex: groupIndex + 1, linkIndex: linkIndex + 1})}
              </NavList.Item>
            ))}
          </NavList.Group>
        ))}
      </NavList>
    )
  },
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: {default: 'dark'},
    colorMode: 'dark',
  },
  render: function DarkMode() {
    const {t} = useTranslation('NavList')

    return (
      <NavList aria-label={String(t('docsNavigation'))}>
        <NavList.Item defaultExpanded>
          {t('githubCopilot')}
          <NavList.SubNav>
            {['overview', 'quickstart', 'installGitHubCopilot', 'configureYourEditor', 'managePolicies'].map(
              labelKey => (
                <NavList.Item key={labelKey} href="#">
                  {t(labelKey)}
                </NavList.Item>
              ),
            )}
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item defaultExpanded>
          {t('codeReview')}
          <NavList.SubNav>
            {['overview', 'reviewPullRequests', 'useSuggestedChanges', 'configureRulesets'].map(labelKey => (
              <NavList.Item key={labelKey} href="#">
                {t(labelKey)}
              </NavList.Item>
            ))}
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item defaultExpanded>
          {t('githubActions')}
          <NavList.SubNav>
            {['overview', 'writeWorkflows', 'useMarketplaceActions', 'manageRunners'].map(labelKey => (
              <NavList.Item key={labelKey} href="#" aria-current={labelKey === 'writeWorkflows' ? 'page' : undefined}>
                {t(labelKey)}
              </NavList.Item>
            ))}
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item defaultExpanded>
          {t('security')}
          <NavList.SubNav>
            {['overview', 'secretScanning', 'codeScanning', 'dependabotAlerts'].map(labelKey => (
              <NavList.Item key={labelKey} href="#">
                {t(labelKey)}
              </NavList.Item>
            ))}
          </NavList.SubNav>
        </NavList.Item>
      </NavList>
    )
  },
}
