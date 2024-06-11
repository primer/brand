import React from 'react'
import {StoryFn, Meta} from '@storybook/react'

import {Avatar, AvatarSizes, AvatarShapes} from '.'
import placeholderAvatar from '@primer/brand-templates-and-media/fixtures/images/avatar-mona.png'

export default {
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
} as Meta<typeof Avatar>

export const Playground: StoryFn<typeof Avatar> = args => <Avatar {...args} />

export const Default = () => (
  <Avatar src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
)
