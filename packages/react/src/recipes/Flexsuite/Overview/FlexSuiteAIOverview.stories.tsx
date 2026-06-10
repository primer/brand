import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {getLocalizedFlexSuiteAIOverviewContent} from './FlexSuiteAIOverview.content'
import {FlexSuiteAIOverview, FlexSuiteAIOverviewTemplate} from './FlexSuiteAIOverview'

const meta = {
  title: 'Recipes/FlexSuite/Overview',
  component: FlexSuiteAIOverview,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof FlexSuiteAIOverview>

export default meta

type Story = StoryObj<typeof FlexSuiteAIOverview>

export const AI: Story = {
  name: 'AI',
  render: function LocalizedFlexSuiteAIOverview() {
    const {t} = useTranslation('FlexSuiteOverview')

    return <FlexSuiteAIOverviewTemplate content={getLocalizedFlexSuiteAIOverviewContent(t)} />
  },
}
