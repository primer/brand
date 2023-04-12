import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Image} from './'

export default {
  title: 'Components/Image',
  component: Image,
  args: {
    src: 'https://source.unsplash.com/random',
    alt: 'Random image',
    as: 'img',
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
    as: {
      description: 'Specification to create a picture component',
      control: {
        type: 'radio',
        options: ['img', 'picture']
      }
    },
    aspectRatio: {
      description: 'Sets the image aspect ratio. A custom ratio can be provided in the design tokens.',
      control: {
        type: 'radio',
        options: ['1:1', '16:9', '16:10', '4:3', 'custom']
      }
    },
    width: {
      description: 'The width of the image',
      control: {
        type: 'number'
      }
    },
    height: {
      description: 'The height of the image',
      control: {
        type: 'number'
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
        options: ['auto', 'sync', 'async']
      }
    }
  }
} as ComponentMeta<typeof Image>

export const Playground: ComponentStory<typeof Image> = args => <Image {...args} />

export const Default = Playground.bind({
  args: {
    aspectRatio: undefined
  }
})
