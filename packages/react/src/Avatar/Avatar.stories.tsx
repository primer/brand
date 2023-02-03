import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {Avatar, AvatarSizes} from '.'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    size: AvatarSizes[1]
  },
  argTypes: {
    size: {
      description: 'The size of the Avatar',
      control: {
        type: 'radio',
        options: AvatarSizes
      }
    }
  }
} as ComponentMeta<typeof Avatar>

export const Playground: ComponentStory<typeof Avatar> = args => (
  <Avatar {...args} src="https://i.pravatar.cc/128?u=80" alt="A random avatar picture" />
)

export const Default = () => <Avatar src="https://i.pravatar.cc/128?u=80" alt="A random avatar picture" />
