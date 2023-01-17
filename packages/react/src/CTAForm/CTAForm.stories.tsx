import {ComponentMeta} from '@storybook/react'
import React from 'react'
import {CTAForm} from './CTAForm'

export default {
  title: 'Components/CTAForm',
  component: CTAForm,
  args: {
    formLabel: 'Form Label',
    buttonLabel: 'Button Label'
  },
  argTypes: {
    formLabel: {
      control: {
        type: 'text',
        required: true
      }
    },
    buttonLabel: {
      control: {
        type: 'text',
        required: true
      }
    }
  }
} as ComponentMeta<typeof CTAForm>

export const Default = args => <CTAForm {...args} />

export const Playground = args => <CTAForm {...args} />
