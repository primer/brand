import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Select} from '.'

export default {
  title: 'Components/Forms/Select',
  component: Select,
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
  },
} as ComponentMeta<typeof Select>

export const Playground: ComponentStory<typeof Select> = args => (
  <Select {...args} aria-label="Standalone select input" defaultValue="select a handle">
    <Select.Option value="select a handle" disabled>
      Select a handle
    </Select.Option>
    <Select.Option value="mona">Monalisa</Select.Option>
    <Select.Option value="hubot">Hubot</Select.Option>
  </Select>
)

Playground.storyName = 'Select - Playground'
