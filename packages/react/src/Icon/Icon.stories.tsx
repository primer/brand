import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Icon, IconColors} from '.'
import {CopilotIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Icon',
  component: Icon,
} as Meta<typeof Icon>

const Template: StoryFn<typeof Icon> = ({hasBackground, color, icon}) => (
  <Icon hasBackground={hasBackground} icon={icon} color={color} />
)

export const Default = Template.bind({})
Default.args = {
  hasBackground: false,
  color: IconColors[0],
  icon: CopilotIcon,
}

Default.argTypes = {
  icon: {
    name: 'icon',
    description: 'You can find a list of available icons https://primer.style/foundations/icons',
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
