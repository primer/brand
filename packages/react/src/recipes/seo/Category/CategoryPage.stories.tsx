import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'

import {CategoryPage} from './CategoryPage'

export default {
  title: 'Recipes/SEO/Category page',
  component: CategoryPage,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          // disable color-contrast rule as the IDE is presentational
          {
            id: 'color-contrast',
            enabled: false,
            element: 'breakout-with-ide',
          },
        ],
      },
    },
  },
} as Meta<typeof CategoryPage>

export const Playground: StoryFn<typeof CategoryPage> = args => <CategoryPage {...args} />
Playground.args = {}
