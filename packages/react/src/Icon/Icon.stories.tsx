import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Icon, IconColors} from '.'
import * as Icons from '@primer/octicons-react'

export default {
  title: 'Components/Icon',
  component: Icon,
} as Meta<typeof Icon>

const Template: StoryFn<typeof Icon> = ({hasBackground, color, icon}) => {
  const BrandIcon = Icons[icon]
  return (
    <Icon hasBackground={hasBackground} icon={<BrandIcon />} color={color} />
  )
}

export const Default = Template.bind({})
Default.args = {
  hasBackground: false,
  color: IconColors[0],
  icon: 'CopilotIcon',
}

Default.argTypes = {
  icon: {
    name: 'icon',
    description: 'Icon from @primer/octicons-react',
    control: {
      type: 'select',
    },
    options: Object.values(Icons).map(icon => icon.displayName)
  },
  hasBackground: {
    name: 'hasBackground',
    type: {name: 'boolean', required: false},
    control: {
      type: 'boolean',
    },
  },
  color: {
    description: 'Color of Icon',
    control: {
      type: 'inline-radio',
    },
    options: [...IconColors],
  },
}
