import React from 'react'
import {Meta, StoryFn} from '@storybook/react'

import placeholderImage from '../fixtures/images/placeholder-600x400.png'

import {Image, imageBorderRadiusOptions} from './Image'
import {Stack} from '../Stack'

export default {
  title: 'Components/Image/Features',
  component: Image,
} as Meta<typeof Image>

const demoAspectRatios = ['16 / 9', '16 / 10', '4 / 3', '1 / 1']

export const AspectRatio: StoryFn<typeof Image> = () => (
  <Stack direction="horizontal" alignItems="flex-start">
    {demoAspectRatios.map(aspectRatio => (
      <Image
        key={aspectRatio}
        src={placeholderImage}
        alt="placeholder, blank area with an off-white background color"
        width={200}
        style={{aspectRatio}}
      />
    ))}
  </Stack>
)

export const BorderRadius: StoryFn<typeof Image> = () => (
  <Stack direction="horizontal">
    {imageBorderRadiusOptions.map(borderRadius => (
      <Image
        key={borderRadius}
        src={placeholderImage}
        alt="placeholder, blank area with an off-white background color"
        width={200}
        height={200}
        borderRadius={borderRadius}
      />
    ))}
  </Stack>
)
