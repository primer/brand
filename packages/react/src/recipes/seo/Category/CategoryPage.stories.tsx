import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {CategoryPage} from './CategoryPage'

const meta = {
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

export default meta

type Story = StoryObj<typeof CategoryPage>

export const Playground: Story = {
  render: args => <CategoryPage {...args} />,
  args: {},
}
