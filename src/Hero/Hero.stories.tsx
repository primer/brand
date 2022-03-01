import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Hero} from '.'

export default {
  title: 'Components/Hero',
  component: Hero,
  argTypes: {}
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = args => <Hero {...args}>Test</Hero>

export const Default = Template.bind({})
Default.args = {}
