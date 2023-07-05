import React from 'react'
import {Meta, StoryFn} from '@storybook/react'

import {CTAForm} from './CTAForm'
import {FormControl, TextInput} from '../index'

export default {
  title: 'Components/CTAForm/Features',
  component: CTAForm,
} as Meta<typeof CTAForm>

export const WithNoConfirm: StoryFn<typeof CTAForm> = _args => (
  <CTAForm>
    <CTAForm.Input>
      <FormControl required>
        <FormControl.Label>Your Work Email Address</FormControl.Label>
        <TextInput placeholder="name" />
      </FormControl>
    </CTAForm.Input>
    <CTAForm.Action>Subscribe</CTAForm.Action>
  </CTAForm>
)
