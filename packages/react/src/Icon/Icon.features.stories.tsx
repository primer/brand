import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Icon, IconColors} from '.'
import {CopilotIcon} from '@primer/octicons-react'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon/Features',
  component: Icon,
}

export default meta

export const IconWithBackground: StoryFn<typeof Icon> = () => (
  <Icon hasBackground icon={CopilotIcon} color={IconColors[1]} />
)
