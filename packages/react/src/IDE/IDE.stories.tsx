import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import {IDE, IDEProps} from './IDE'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

import './IDE.stories.hljs.theme.css'

import {chatScript, chatScriptAlt, defaultFiles} from './fixtures/content'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)

export default {
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
    showReplayButton: false,
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
      showReplayButton: {
        name: 'show replay button',
        description: 'toggle replay button visibility',
        control: {
          type: 'boolean',
        },
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
} as Meta<typeof IDE>

type StoryProps = {
  showChat: boolean
  showReplayButton: boolean
  height: number
} & IDEProps

const Template: StoryFn<StoryProps> = ({showChat, showReplayButton, ...args}) => {
  return (
    <IDE {...args}>
      {showChat && <IDE.Chat script={chatScript} alternativeText={chatScriptAlt}></IDE.Chat>}
      <IDE.Editor files={defaultFiles} showReplayButton={showReplayButton} />
    </IDE>
  )
}

export const Default = Template.bind({})

export const Playground = Template.bind({})
