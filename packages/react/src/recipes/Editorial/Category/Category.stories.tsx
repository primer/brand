import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {getLocalizedEditorialCategoryContent} from './Category.content'
import {Category as CategoryComponent, CategoryTemplate} from './Category'

const meta = {
  title: 'Recipes/Editorial/Category',
  component: CategoryComponent,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof CategoryComponent>

export default meta

type Story = StoryObj<typeof CategoryComponent>

export const Category: Story = {
  name: 'Category',
  render: function LocalizedEditorialCategory() {
    const {t} = useTranslation('EditorialCategory')

    return <CategoryTemplate content={getLocalizedEditorialCategoryContent(t)} />
  },
}
