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

export const Default: Story = {
  render: function Default(args) {
    const {t} = useTranslation('NavList')
    const {'aria-label': ariaLabel = 'Docs navigation', ...navListArgs} = args
    const articleLabelKeys = [
      'overview',
      'quickstart',
      'installGitHubCopilot',
      'configureYourEditor',
      'managePolicies',
      'troubleshooting',
    ]

    return (
      <NavList aria-label={ariaLabel} {...navListArgs}>
        {articleLabelKeys.map(labelKey => (
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
    const {'aria-label': ariaLabel = 'Docs navigation', ...navListArgs} = args

    return (
      <NavList aria-label={ariaLabel} {...navListArgs}>
        <NavList.Group title={t('githubCopilot')}>
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
        </NavList.Group>
        <NavList.Group title={t('codeReview')}>
          {['overview', 'reviewPullRequests', 'configureRulesets', 'useSuggestedChanges'].map(labelKey => (
            <NavList.Item key={labelKey} href="#">
              {t(labelKey)}
            </NavList.Item>
          ))}
        </NavList.Group>
        <NavList.Group title={t('resources')}>
          {['changelog', 'apiReference', 'restApi', 'graphqlApi'].map(labelKey => (
            <NavList.Item key={labelKey} href="#">
              {t(labelKey)}
            </NavList.Item>
          ))}
        </NavList.Group>
        <NavList.Group title={t('security')}>
          {['overview', 'secretScanning', 'codeScanning'].map(labelKey => (
            <NavList.Item key={labelKey} href="#">
              {t(labelKey)}
            </NavList.Item>
          ))}
        </NavList.Group>
      </NavList>
    )
  },
}
