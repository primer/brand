import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {Article} from './Article'
import {themes} from '../helpers'
import {ColorModesEnum} from '../../../ThemeProvider'

const meta: Meta<typeof Article> = {
  title: 'Recipes/SEO/Article page',
  component: Article,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    controls: {expanded: true},
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
  args: {
    heroTitle: 'Should we think of DevOps as a methodology?',
    lede: "There's one word that perfectly describes successful DevOps: flow. As individuals, we experience a state of flow when everything in our work comes together naturally and at the right time. DevOps enables that kind of flow at the organizational level through a combination of tooling, culture, and process.",
    content: 'real-world',
    accentColor: 'collaboration',
    isLightHero: false,
  },
  argTypes: {
    heroTitle: {
      control: 'text',
      description: 'Max 90 characters',
      name: 'title',
    },
    isLightHero: {
      name: 'light hero',
      control: 'boolean',
    },
    lede: {
      control: 'text',
    },
    content: {
      control: 'inline-radio',
      options: ['real-world', 'system'],
    },
    colorMode: {
      name: 'mode',
      control: 'inline-radio',
      options: [ColorModesEnum.LIGHT, ColorModesEnum.DARK],
      table: {
        category: 'Theming',
      },
    },
    accentColor: {
      name: 'theme',
      control: 'radio',
      options: themes,
      table: {
        category: 'Theming',
      },
    },
    gridOverlay: {
      name: 'enable grid overlay',
      control: 'boolean',
      table: {
        category: 'General',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Article>

const systemArgs: Partial<Story['args']> = {
  content: 'system',
  heroTitle: 'Lorem ipsum dolor sit amet',
  lede: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.',
}

export const Playground: Story = {}

export const AllHeadings: Story = {
  args: {
    ...systemArgs,
  },
}

export const AiTheme: Story = {
  args: {
    ...systemArgs,
    accentColor: 'ai',
  },
}

export const CollaborationTheme: Story = {
  args: {
    ...systemArgs,
    accentColor: 'collaboration',
  },
}

export const EnterpriseTheme: Story = {
  args: {
    ...systemArgs,
    accentColor: 'enterprise',
  },
}

export const SecurityTheme: Story = {
  args: {
    ...systemArgs,
    accentColor: 'security',
  },
}

export const ProductivityTheme: Story = {
  args: {
    ...systemArgs,
    accentColor: 'productivity',
  },
}

export const LightHeroImage: Story = {
  args: {
    ...systemArgs,
    isLightHero: true,
  },
}

export const DarkHeroImage: Story = {
  args: {
    ...systemArgs,
    isLightHero: false,
  },
}
