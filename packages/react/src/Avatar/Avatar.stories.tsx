import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {Avatar, AvatarSizes, AvatarShapes} from '.'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    size: AvatarSizes[1],
    shape: 'circle',
    src: 'https://i.pravatar.cc/160?u=160',
    alt: 'A random avatar picture'
  },
  argTypes: {
    size: {
      description: 'The size of the Avatar',
      control: {
        type: 'radio',
        options: AvatarSizes
      }
    },
    shape: {
      description: 'The shape of the Avatar',
      control: {
        type: 'radio',
        options: AvatarShapes
      }
    },
    src: {
      description: 'The url of the image to display',
      type: {name: 'string', required: true},
      control: {
        type: 'text'
      }
    },
    alt: {
      description: 'The alt text for the image',
      type: {name: 'string', required: true},
      control: {
        type: 'text'
      }
    }
  }
} as ComponentMeta<typeof Avatar>

export const Playground: ComponentStory<typeof Avatar> = args => <Avatar {...args} />

export const Default = () => <Avatar src="https://i.pravatar.cc/80?u=80" alt="A random avatar picture" />
