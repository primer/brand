import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Button} from '.'

export default {
  title: 'Components/Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  as: 'a',
  variant: 'primary',
  size: 'medium',
  href: '#',
  children: 'Primary action'
}

export const Secondary = Template.bind({})
Secondary.args = {
  as: 'a',
  variant: 'secondary',
  href: '#',
  children: 'Secondary action'
}

export const Large = Template.bind({})
Large.args = {
  as: 'a',
  size: 'large',
  variant: 'primary',
  href: '#',
  children: 'Large Action'
}

export const Polymorphism = Template.bind({})
Polymorphism.args = {
  as: 'button',
  variant: 'primary',
  children: 'Button action',
  // eslint-disable-next-line no-console
  onClick: () => console.log('Clicked')
}
