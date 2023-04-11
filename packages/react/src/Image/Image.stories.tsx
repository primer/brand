import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Image} from '.'

export default {
  title: 'Components/Image',
  component: Image,
  args: {
    src: 'https://source.unsplash.com/random',
    alt: 'Random image',
    isPicture: false,
    aspectRatio: undefined
  },
  argTypes: {
    src: {
      description: 'Sets the image source',
      control: {
        type: 'text'
      }
    },
    alt: {
      description: 'Sets the image alt text',
      control: {
        type: 'text'
      }
    },
    isPicture: {
      description: 'Toggle to create a picture element',
      control: {
        type: 'boolean'
      }
    },
    aspectRatio: {
      description: 'Sets the image aspect ratio',
      control: {
        type: 'radio',
        options: ['1:1', '16:9', '16:10', '4:3']
      }
    }
  }
} as ComponentMeta<typeof Image>

export const Playground: ComponentStory<typeof Image> = args => <Image {...args} />

export const CustomPictureAspectRatio: ComponentStory<typeof Image> = args => (
  <Image {...{...args, aspectRatio: [9, 1], isPicture: true}} />
)

export const CustomImageAspectRatio: ComponentStory<typeof Image> = args => (
  <Image {...{...args, aspectRatio: [9, 1]}} />
)

export const Default = Playground.bind({})
