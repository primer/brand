import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Hero} from '.'

export default {
  title: 'Components/Hero',
  component: Hero
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = args => <Hero {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Example title',
  description: 'Example description'
}

export const Centered = Template.bind({})
Centered.args = {
  title: 'Example title',
  description: 'Example description',
  align: 'center'
}
