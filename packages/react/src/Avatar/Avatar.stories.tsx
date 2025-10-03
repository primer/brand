import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Avatar, AvatarSizes, AvatarShapes} from '.'
import placeholderAvatar from '../fixtures/images/avatar-mona.png'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    size: AvatarSizes[1],
    shape: 'circle',
    src: placeholderAvatar,
    alt: 'A random avatar picture',
  },
  argTypes: {
    size: {
      description: 'The size of the Avatar',
      control: {
        type: 'radio',
        options: AvatarSizes,
      },
    },
    shape: {
      description: 'The shape of the Avatar',
      control: {
        type: 'radio',
        options: AvatarShapes,
      },
    },
    src: {
      description: 'The url of the image to display',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
      },
    },
    alt: {
      description: 'The alt text for the image',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof Avatar>

export const Playground: Story = {
  render: args => <Avatar {...args} />,
}

export const Default: Story = {
  render: () => <Avatar src={placeholderAvatar} alt="A random avatar picture" />,
}
