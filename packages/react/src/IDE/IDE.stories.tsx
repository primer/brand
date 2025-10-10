import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {IDE, IDEProps} from './IDE'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

import './IDE.stories.hljs.theme.css'

import {chatScript, chatScriptAlt, defaultFiles} from './fixtures/content'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)

type StoryProps = {
  showChat: boolean
  height: number
} & IDEProps

const meta = {
  title: 'Components/IDE',
  component: IDE,
  decorators: [
    Story => (
      <>
        <link rel="stylesheet" href="https://unpkg.com/highlight.js@11.9.0/styles/default.css" />
        <Story />
      </>
    ),
  ],
  args: {
    showChat: true,
    height: 800,
  },
  argTypes: {
    showChat: {
      name: 'show chat',
      description: 'toggle chat visibility',
      control: {
        type: 'boolean',
      },
    },
    height: {
      name: 'IDE height',
      description: 'adjust the height of the IDE',
      control: {
        type: 'number',
      },
    },
    className: {table: {disable: true}},
    id: {table: {disable: true}},
    'data-testid': {table: {disable: true}},
    ref: {table: {disable: true}},
    animate: {table: {disable: true}},
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          // disable color-contrast rule as the IDE is presentational
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
  },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: ({showChat, ...args}) => (
    <IDE {...args}>
      {showChat && <IDE.Chat script={chatScript} alternativeText={chatScriptAlt}></IDE.Chat>}
      <IDE.Editor files={defaultFiles} />
    </IDE>
  ),
}

export const Playground: Story = {
  render: ({showChat, ...args}) => (
    <IDE {...args}>
      {showChat && <IDE.Chat script={chatScript} alternativeText={chatScriptAlt}></IDE.Chat>}
      <IDE.Editor files={defaultFiles} />
    </IDE>
  ),
}
