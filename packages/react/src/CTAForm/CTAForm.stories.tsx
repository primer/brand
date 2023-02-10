import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'

import {CTAForm} from './CTAForm'
import {FormControl, TextInput, Checkbox} from '../index'

export default {
  title: 'Components/CTAForm',
  component: CTAForm
} as ComponentMeta<typeof CTAForm>

export const Playground: ComponentStory<typeof CTAForm> = _args => (
  <CTAForm>
    <CTAForm.Input>
      <FormControl required size="large" fullWidth>
        <FormControl.Label>Your Work Email Address</FormControl.Label>
        <TextInput placeholder="name" />
      </FormControl>
    </CTAForm.Input>
    <CTAForm.Confirm>
      <FormControl required size="large" fullWidth>
        <FormControl.Label>I agree to the Privacy Policy and Terms of Service</FormControl.Label>
        <Checkbox name="confirm" />
      </FormControl>
    </CTAForm.Confirm>
    <CTAForm.Action>Subscribe</CTAForm.Action>
  </CTAForm>
)

export const Default: ComponentStory<typeof CTAForm> = _args => (
  <CTAForm>
    <CTAForm.Input>
      <FormControl required size="large" fullWidth>
        <FormControl.Label>Your Work Email Address</FormControl.Label>
        <TextInput placeholder="name" />
      </FormControl>
    </CTAForm.Input>
    <CTAForm.Confirm>
      <FormControl required size="large" fullWidth>
        <FormControl.Label>I agree to the Privacy Policy and Terms of Service</FormControl.Label>
        <Checkbox name="confirm" />
      </FormControl>
    </CTAForm.Confirm>
    <CTAForm.Action>Subscribe</CTAForm.Action>
  </CTAForm>
)
