import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {getLocalizedFlexSuiteAIDetailsPlaylistContent} from './FlexSuiteAIDetailsPlaylist.content'
import {FlexSuiteAIDetailsPlaylist, FlexSuiteAIDetailsPlaylistTemplate} from './FlexSuiteAIDetailsPlaylist'

const meta = {
  title: 'Recipes/FlexSuite/Details',
  component: FlexSuiteAIDetailsPlaylist,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof FlexSuiteAIDetailsPlaylist>

export default meta

type Story = StoryObj<typeof FlexSuiteAIDetailsPlaylist>

export const AI: Story = {
  name: 'AI',
  render: function LocalizedFlexSuiteAIDetailsPlaylist() {
    const {t} = useTranslation('FlexSuiteDetails')

    return <FlexSuiteAIDetailsPlaylistTemplate content={getLocalizedFlexSuiteAIDetailsPlaylistContent(t)} />
  },
}
