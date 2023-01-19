import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'

import {CTAForm} from './CTAForm'

export default {
  title: 'Components/CTAForm',
  component: CTAForm,
  args: {
    inputLabel: 'Your work email address',
    inputType: 'text',
    placeholder: 'me@github.com',
    buttonLabel: 'Subscribe',
    buttonVariant: 'primary',
    checkboxLabel: (
      <>
        I agree to the <a href="www.github.com">terms and conditions</a> and <a href="www.github.com">privacy policy</a>
      </>
    )
  },
  argTypes: {
    inputLabel: {
      control: {
        type: 'text'
      }
    },
    inputType: {
      control: {
        type: 'select',
        options: ['email', 'text']
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    },
    buttonLabel: {
      control: {
        type: 'text'
      }
    },
    buttonVariant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'subtle']
      }
    }
  }
} as ComponentMeta<typeof CTAForm>

export const Playground: ComponentStory<typeof CTAForm> = args => <CTAForm {...args} />

export const Default = Playground.bind({})
