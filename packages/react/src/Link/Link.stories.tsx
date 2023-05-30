import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Link} from '.'

export default {
  title: 'Components/Link',
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = args => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  size: 'medium',
  href: '#',
  children: 'Primary action',
}

export const Reversed = Template.bind({})
Reversed.args = {
  size: 'medium',
  href: '#',
  children: 'Back to schedule',
  arrowDirection: 'start',
}

export const Accent = Template.bind({})
Accent.args = {
  size: 'medium',
  variant: 'accent',
  href: '#',
  children: 'Accent color',
}
