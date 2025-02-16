import React from 'react'
import {Meta, StoryFn} from '@storybook/react'

import placeholderImage from '../fixtures/images/placeholder-600x400.png'
import style from './Image.stories.module.css'

import {Image, ImageBorderRadiusOptions} from './Image'
import {Stack} from '../Stack'

export default {
  title: 'Components/Image/Features',
  component: Image,
} as Meta<typeof Image>

export const CustomPictureAspectRatio: StoryFn<typeof Image> = () => (
  <Image
    src={placeholderImage}
    alt="placeholder, blank area with an off-white background color, custom aspect ratio"
    aspectRatio="custom"
    as="picture"
  />
)

export const CustomImageAspectRatio: StoryFn<typeof Image> = () => (
  <Image
    src={placeholderImage}
    alt="placeholder, blank area with an off-white background color, custom aspect ratio"
    aspectRatio="custom"
  />
)

export const CustomImageHeight: StoryFn<typeof Image> = () => (
  <Image
    src={placeholderImage}
    alt="placeholder, blank area with an off-white background color, height specified to 200px"
    height={200}
  />
)

export const CustomImageWidth: StoryFn<typeof Image> = () => (
  <Image
    src={placeholderImage}
    alt="placeholder, blank area with an off-white background color, width specified to 200px"
    width={200}
  />
)

export const CustomImageWidthAndHeight: StoryFn<typeof Image> = () => (
  <Image
    src={placeholderImage}
    alt="placeholder, blank area with an off-white background color, height and width specified to 200px"
    height={200}
    width={200}
  />
)

export const CustomClass: StoryFn<typeof Image> = () => (
  <Image
    src={placeholderImage}
    className={style['custom-image']}
    alt="placeholder, blank area with an off-white background color and a red border, height and width specified to 200px"
    height={200}
    width={200}
  />
)

export const CustomClassOnPicture: StoryFn<typeof Image> = () => (
  <Image
    src={placeholderImage}
    className={style['custom-image']}
    alt="placeholder, blank area with an off-white background color and a red border, height and width specified to 200px"
    height={200}
    width={200}
    as="picture"
  />
)

export const CustomClassWithAspectRatio: StoryFn<typeof Image> = () => (
  <Image
    src={placeholderImage}
    className={style['custom-image']}
    alt="placeholder, blank area with an off-white background color and a red border, custom aspect ratio"
    aspectRatio="custom"
  />
)

export const BorderRadiusOptions: StoryFn<typeof Image> = () => (
  <Stack direction="horizontal">
    {ImageBorderRadiusOptions.map(borderRadius => (
      <Image
        key={borderRadius}
        src={placeholderImage}
        width={200}
        height={200}
        alt="placeholder, blank area with an off-white background color"
        borderRadius={borderRadius}
      />
    ))}
  </Stack>
)
