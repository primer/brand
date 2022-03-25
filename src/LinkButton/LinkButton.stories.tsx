import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {LinkButton} from '.'

export default {
  title: 'Components/LinkButton',
  component: LinkButton
} as ComponentMeta<typeof LinkButton>

const Template: ComponentStory<typeof LinkButton> = args => <LinkButton {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  href: '#',
  children: 'Primary action'
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  href: '#',
  children: 'Secondary action'
}
