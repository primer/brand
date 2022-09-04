import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Checkbox} from '.'

export default {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      description: 'checked field',
      control: {type: 'boolean'},
      table: {
        category: 'Input'
      }
    },
    disabled: {
      description: 'disabled field',
      control: {type: 'boolean'},
      table: {
        category: 'Input'
      }
    },
    indeterminate: {
      description: 'indeterminate field',
      control: {type: 'boolean'},
      table: {
        category: 'Input'
      }
    }
  }
} as ComponentMeta<typeof Checkbox>

export const Playground: ComponentStory<typeof Checkbox> = args => (
  <Checkbox aria-label="Standalone checkbox" {...args} />
)

Playground.storyName = 'Checkbox - Playground'

export const Variants = () => (
  <>
    <Checkbox aria-label="Default unchecked" />
    <Checkbox aria-label="Default checked" defaultChecked />
    <Checkbox aria-label="Default disabled" disabled />
    <Checkbox aria-label="Default checked and disabled" defaultChecked disabled />
    <Checkbox aria-label="Default indeterminate" indeterminate={true} />
  </>
)
Variants.storyName = 'Checkbox - Variants'
