import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {defaultEditorialCategoryContent, getLocalizedEditorialCategoryContent} from './Category.content'
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

const incompleteCategoryContent = {
  ...defaultEditorialCategoryContent,
  featured: {
    ...defaultEditorialCategoryContent.featured,
    cards: defaultEditorialCategoryContent.resources.cards.slice(0, 5),
  },
  resources: {
    ...defaultEditorialCategoryContent.resources,
    cards: defaultEditorialCategoryContent.resources.cards.slice(0, 5),
  },
}

export const CardGridIncomplete: Story = {
  name: 'Card grid incomplete',
  render: () => <CategoryTemplate content={incompleteCategoryContent} />,
}

export const CardGridTablet: Story = {
  name: 'Card grid Tablet',
  render: () => <CategoryTemplate content={incompleteCategoryContent} />,
}

export const CardGridNarrow: Story = {
  name: 'Card grid Narrow',
  render: () => <CategoryTemplate content={incompleteCategoryContent} />,
}
