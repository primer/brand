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
    args: {
      heroTitle: 'Headline',
      lede: "There's one word that perfectly describes successful DevOps: flow. As individuals, we experience a state of flow when everything in our work comes together naturally and at the right time. DevOps enables that kind of flow at the organizational level through a combination of tooling, culture, and process.",
    },
    argTypes: {
      heroTitle: {
        control: 'text',
        name: 'title',
        table: {
          category: 'Section: Hero',
        },
      },
      lede: {
        control: 'text',
        table: {
          category: 'Section: Article body',
        },
      },
      content: {
        control: {
          type: 'inline-radio',
          options: ['real-world', 'system'],
          table: {
            category: 'Section: Article body',
          },
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

export const Playground: StoryFn<typeof Article> = args => <Article {...args} />
Playground.args = {
  heroTitle: 'Lorem ipsum dolor sit amet',
  lede: "There's one word that perfectly describes successful DevOps: flow. As individuals, we experience a state of flow when everything in our work comes together naturally and at the right time. DevOps enables that kind of flow at the organizational level through a combination of tooling, culture, and process.",
}

export const RealWorldExample: StoryFn<typeof Article> = ({content, lede, ...rest}) => (
  <Article content="real-world" lede={lede} {...rest} />
)
RealWorldExample.args = {
  heroTitle: 'Should we think of DevOps as a methodology?',
  lede: "There's one word that perfectly describes successful DevOps: flow. As individuals, we experience a state of flow when everything in our work comes together naturally and at the right time. DevOps enables that kind of flow at the organizational level through a combination of tooling, culture, and process.",
}
export const AllHeadings: StoryFn<typeof Article> = ({content, heroTitle, lede, ...rest}) => (
  <Article heroTitle={heroTitle} content="system" lede={lede} {...rest} />
)
AllHeadings.args = {
  heroTitle: 'Lorem ipsum dolor sit amet',
  lede: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.',
}
