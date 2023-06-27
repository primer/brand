import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Link} from '.'

export default {
  title: 'Components/Link',
  component: Link,
} as Meta<typeof Link>

const Template: StoryFn<typeof Link> = args => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  // size: 'medium',
  href: '#',
  children: 'Primary action',
}
