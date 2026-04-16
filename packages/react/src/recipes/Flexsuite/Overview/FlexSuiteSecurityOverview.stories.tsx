import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {getLocalizedFlexSuiteSecurityOverviewContent} from './FlexSuiteSecurityOverview.content'
import {FlexSuiteSecurityOverview, FlexSuiteSecurityOverviewTemplate} from './FlexSuiteSecurityOverview'

const meta = {
  title: 'Recipes/FlexSuite/Overview',
  component: FlexSuiteSecurityOverview,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof FlexSuiteSecurityOverview>

export default meta

type Story = StoryObj<typeof FlexSuiteSecurityOverview>

export const Security: Story = {
  name: 'Security',
  render: function LocalizedFlexSuiteSecurityOverview() {
    const {t} = useTranslation('FlexSuiteSecurityOverview')

    return <FlexSuiteSecurityOverviewTemplate content={getLocalizedFlexSuiteSecurityOverviewContent(t)} />
  },
}
