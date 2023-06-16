import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Link} from '.'

export default {
  title: 'Components/Link/features',
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = args => <Link {...args} />

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  href: '#',
  children: 'Large size',
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
