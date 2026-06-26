import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

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

const ArticleLabelKeys = [
  'overview',
  'quickstart',
  'installGitHubCopilot',
  'configureYourEditor',
  'managePolicies',
  'troubleshooting',
]

export const Default: Story = {
  render: function Default(args) {
    const {t} = useTranslation('NavList')

    return (
      <NavList {...args}>
        {ArticleLabelKeys.map(labelKey => (
          <NavList.Item key={labelKey} href="#" aria-current={labelKey === 'overview' ? 'page' : undefined}>
            {t(labelKey)}
          </NavList.Item>
        ))}
      </NavList>
    )
  },
}

export const Playground: Story = {
  render: function Playground(args) {
    const {t} = useTranslation('NavList')

    return (
      <NavList {...args}>
        <NavList.Item defaultExpanded>
          {t('githubCopilot')}
          <NavList.SubNav>
            {['overview', 'whatIsGitHubCopilot'].map(labelKey => (
              <NavList.Item key={labelKey} href="#">
                {t(labelKey)}
              </NavList.Item>
            ))}
            <NavList.Item defaultExpanded>
              {t('guides')}
              <NavList.SubNav>
                <NavList.Item defaultExpanded>
                  {t('agents')}
                  <NavList.SubNav>
                    {['buildAnAgent', 'customizeAnAgent', 'debugAnAgent', 'deployAnAgent'].map(labelKey => (
                      <NavList.Item
                        key={labelKey}
                        href="#"
                        aria-current={labelKey === 'buildAnAgent' ? 'page' : undefined}
                      >
                        {t(labelKey)}
                      </NavList.Item>
                    ))}
                  </NavList.SubNav>
                </NavList.Item>
                <NavList.Item>
                  {t('extensions')}
                  <NavList.SubNav>
                    {['installAnExtension', 'publishAnExtension', 'managePermissions'].map(labelKey => (
                      <NavList.Item key={labelKey} href="#">
                        {t(labelKey)}
                      </NavList.Item>
                    ))}
                  </NavList.SubNav>
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item>
          {t('codeReview')}
          <NavList.SubNav>
            {['overview', 'reviewPullRequests', 'configureRulesets', 'useSuggestedChanges'].map(labelKey => (
              <NavList.Item key={labelKey} href="#">
                {t(labelKey)}
              </NavList.Item>
            ))}
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item defaultExpanded>
          {t('resources')}
          <NavList.SubNav>
            {['changelog', 'apiReference', 'restApi', 'graphqlApi'].map(labelKey => (
              <NavList.Item key={labelKey} href="#">
                {t(labelKey)}
              </NavList.Item>
            ))}
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item>
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
