import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'

import {CTAForm} from './CTAForm'
import {FormControl, TextInput} from '../index'

export default {
  title: 'Components/CTAForm/Features',
  component: CTAForm
} as ComponentMeta<typeof CTAForm>

// TODO: When there is no confirm the gap should disappear

export const WithNoConfirm: ComponentStory<typeof CTAForm> = _args => (
  <CTAForm>
    <CTAForm.Input>
      <FormControl required size="large" fullWidth>
        <FormControl.Label>Your Work Email Address</FormControl.Label>
        <TextInput placeholder="name" />
      </FormControl>
    </CTAForm.Input>
    <CTAForm.Action>Subscribe</CTAForm.Action>
  </CTAForm>
)
