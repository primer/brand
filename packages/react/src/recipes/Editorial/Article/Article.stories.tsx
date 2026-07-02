import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'
import {useTranslation} from 'react-i18next'

import {getLocalizedEditorialArticleContent} from './Article.content'
import {Article as ArticleComponent, ArticleTemplate} from './Article'

const meta = {
  title: 'Recipes/Editorial/Article',
  component: ArticleComponent,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof ArticleComponent>

export default meta

type Story = StoryObj<typeof ArticleComponent>

export const Article: Story = {
  name: 'Article',
  render: function LocalizedEditorialArticle() {
    const {t} = useTranslation('EditorialArticle')

    return <ArticleTemplate content={getLocalizedEditorialArticleContent(t)} />
  },
}
