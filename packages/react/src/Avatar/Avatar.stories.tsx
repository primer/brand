import React from 'react'
import {StoryFn, Meta} from '@storybook/react'

import {Avatar, AvatarSizes, AvatarShapes} from '.'
import placeholderAvatar from '../fixtures/images/avatar-mona.png'

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta<typeof Avatar>

export const Default = () => (
  <Avatar src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
)

export const Playground: StoryFn<typeof Avatar> = args => <Avatar {...args} />
Playground.argTypes = {
  shape: {
    description: 'The shape of the Avatar',
    options: AvatarShapes,
    control: {
      type: 'radio',
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
  size: {
    description: 'The size of the Avatar',
    options: AvatarSizes,
    control: {
      type: 'radio',
    },
  },
}
Playground.args = {
  shape: 'circle',
  src: placeholderAvatar,
  alt: 'A random avatar picture',
  size: AvatarSizes[1],
}

export const Playground2: StoryFn<typeof Avatar> = args => <Avatar {...args} />
Playground2.argTypes = {
  ...Playground.argTypes,
  size: {
    control: {
      type: 'object',
    },
  },
}
Playground2.args = {
  ...Playground.args,
  size: {
    narrow: AvatarSizes[1],
    regular: AvatarSizes[2],
    wide: AvatarSizes[3],
  },
}
Playground2.storyName = 'Playground (responsive)'
