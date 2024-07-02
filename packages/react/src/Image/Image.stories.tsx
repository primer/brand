import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Image, ImageBorderRadiusOptions} from './'
import placeholderImage from '../fixtures/images/placeholder-600x400.png'

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    controls: {expanded: true},
  },
  args: {
    src: placeholderImage,
    alt: 'placeholder, blank area with an off-white background color',
    width: '400',
    height: 'auto',
    aspectRatio: '16 / 9',
    borderRadius: 'medium',
    style: {
      'aspect-ratio': '16 / 9',
    },
  },
  argTypes: {
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    style: {
      description: 'Use this (or `className`) to set aspect ratio.',
      control: 'object',
    },
    borderRadius: {
      description: 'Sets the border radius of the image.',
      control: 'radio',
      options: [...ImageBorderRadiusOptions, undefined],
    },
  },
} as Meta<typeof Image>

export const Playground: StoryFn<typeof Image> = ({...args}) => <Image {...args} />

export const Default = Playground.bind({})
