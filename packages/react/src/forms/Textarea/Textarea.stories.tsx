import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {Textarea} from '.'

export default {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  argTypes: {
    size: {
      options: [0, 1],
      mapping: ['medium', 'large'],
      control: {
        type: 'inline-radio',
        labels: ['medium', 'large'],
      },
      table: {
        category: 'Input',
      },
    },
    validationStatus: {
      options: [0, 1, 2], // iterator
      mapping: [undefined, 'error', 'success'], // values
      control: {
        type: 'inline-radio',
        labels: ['undefined', 'error', 'success'],
      },
      table: {
        category: 'Validation',
      },
    },
    fullWidth: {
      description: 'formerly called Block',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    monospace: {
      description: 'monospace text',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    disabled: {
      description: 'disabled field',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    required: {
      description: 'required field',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    placeholder: {
      type: 'string',
      name: 'placeholder',
      description: 'string',
      table: {
        category: 'Input',
      },
    },
  },
} as Meta<typeof Textarea>

export const Default: StoryFn<typeof Textarea> = args => <Textarea aria-label="Standalone text input" {...args} />
