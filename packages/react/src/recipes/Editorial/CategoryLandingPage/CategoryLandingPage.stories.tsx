import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {getLocalizedEditorialCategoryLandingPageContent} from './CategoryLandingPage.content'
import {CategoryLandingPage as CategoryLandingPageComponent, CategoryLandingPageTemplate} from './CategoryLandingPage'

const meta = {
  title: 'Recipes/Editorial/Category landing page',
  component: CategoryLandingPageComponent,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof CategoryLandingPageComponent>

export default meta

type Story = StoryObj<typeof CategoryLandingPageComponent>

export const CategoryLandingPage: Story = {
  name: 'Category landing page',
  render: function LocalizedEditorialCategoryLandingPage() {
    const {t} = useTranslation('EditorialCategoryLandingPage')

    return <CategoryLandingPageTemplate content={getLocalizedEditorialCategoryLandingPageContent(t)} />
  },
}
