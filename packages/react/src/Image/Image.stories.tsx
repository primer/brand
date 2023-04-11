import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Image} from './'

export default {
  title: 'Components/Image',
  component: Image,
  args: {
    src: 'https://source.unsplash.com/random',
    alt: 'Random image',
    isPicture: false,
    aspectRatio: undefined,
    loading: 'eager',
    decoding: 'auto'
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
    },
    loading: {
      description:
        'The loading attribute specifies whether a browser should load an image immediately or to defer loading of off-screen images until for example the user scrolls near them.',
      control: {
        type: 'radio',
        options: ['eager', 'lazy']
      }
    },
    decoding: {
      description:
        'Sets the image decoding strategy. Representing a hint given to the browser on how it should decode the image.',
      control: {
        type: 'radio',
        options: ['sync', 'async', 'auto']
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

export const CustomImageAspectRatioWithWidth: ComponentStory<typeof Image> = args => (
  <Image {...{...args, aspectRatio: [9, 1], width: '200px'}} />
)

export const Default = Playground.bind({})
