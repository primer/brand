import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {getLocalizedEditorialResultsContent} from './Results.content'
import {Results as ResultsComponent, ResultsTemplate} from './Results'

const meta = {
  title: 'Recipes/Editorial/Results',
  component: ResultsComponent,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof ResultsComponent>

export default meta

type Story = StoryObj<typeof ResultsComponent>

export const Results: Story = {
  name: 'Results',
  render: function LocalizedEditorialResults() {
    const {t} = useTranslation('EditorialResults')

    return <ResultsTemplate content={getLocalizedEditorialResultsContent(t)} />
  },
}
