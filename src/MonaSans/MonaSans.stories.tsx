import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {MonaSans} from '.'

export default {
  title: 'Misc/MonaSans',
  component: MonaSans,
  parameters: {
    backgrounds: {
      grid: {
        cellSize: 20,
        opacity: 0.5,
        cellAmount: 5,
        offsetX: 16,
        offsetY: 16
      }
    }
  },
  argTypes: {
    size: {control: {type: 'range', min: 9, max: 128, step: 1}, defaultValue: 64},
    weight: {control: {type: 'range', min: 200, max: 900, step: 1}, defaultValue: 900},
    width: {control: {type: 'range', min: 75, max: 125, step: 1}},
    italic: {control: {type: 'range', min: 1, max: 10, step: 1}}
  }
} as ComponentMeta<typeof MonaSans>

const Template: ComponentStory<typeof MonaSans> = args => <MonaSans {...args} />

export const Playground = Template.bind({})
Playground.args = {
  children: 'Mona Sans'
}
