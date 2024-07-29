import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Link} from '.'

const meta: Meta<typeof Link> = {
  title: 'Components/Link/features',
  component: Link,
}

export default meta

const Template: StoryFn<typeof Link> = args => <Link {...args} />

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
