import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {Article} from './Article'

export default {
  title: 'Recipes/SEO/Article page',
  component: Article,
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
    argTypes: {
      content: {
        control: {
          type: 'inline-radio',
          options: ['real-world', 'system'],
        },
      },
      accentColor: {
        control: {
          type: 'color',
        },
      },
    },
  },
} as Meta<typeof Article>

export const RealWorldExample: StoryFn = () => <Article content="real-world" />
export const AllHeadings: StoryFn = () => <Article content="system" />
