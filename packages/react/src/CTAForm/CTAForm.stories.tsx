import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'

import {CTAForm} from './CTAForm'

export default {
  title: 'Components/CTAForm',
  component: CTAForm
} as ComponentMeta<typeof CTAForm>

export const Playground: ComponentStory<typeof CTAForm> = _args => <CTAForm />

export const Default = Playground.bind({})
