import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import style from './Image.stories.module.css'

import {Image} from './Image'

export default {
  title: 'Components/Image/Features',
  component: Image
} as ComponentMeta<typeof Image>

export const Features: ComponentStory<typeof Image> = () => (
  <Image
    src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
    alt="placeholder, blank area with an off-white background color"
  />
)

export const CustomPictureAspectRatio: ComponentStory<typeof Image> = () => (
  <Image
    src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
    alt="placeholder, blank area with an off-white background color"
    aspectRatio="custom"
    as="picture"
  />
)

export const CustomImageAspectRatio: ComponentStory<typeof Image> = () => (
  <Image
    src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
    alt="placeholder, blank area with an off-white background color"
    aspectRatio="custom"
  />
)

export const CustomImageHeight: ComponentStory<typeof Image> = () => (
  <Image
    src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
    alt="placeholder, blank area with an off-white background color"
    height={200}
  />
)

export const CustomImageWidth: ComponentStory<typeof Image> = () => (
  <Image
    src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
    alt="placeholder, blank area with an off-white background color"
    width={200}
  />
)

export const CustomImageWidthAndHeight: ComponentStory<typeof Image> = () => (
  <Image
    src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
    alt="placeholder, blank area with an off-white background color"
    height={200}
    width={200}
  />
)

export const CustomClass: ComponentStory<typeof Image> = () => (
  <Image
    src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
    className={style['custom-image']}
    alt="placeholder, blank area with an off-white background color"
    height={200}
    width={200}
  />
)

export const CustomClassOnPicture: ComponentStory<typeof Image> = () => (
  <Image
    src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
    className={style['custom-image']}
    alt="placeholder, blank area with an off-white background color"
    height={200}
    width={200}
    as="picture"
  />
)

export const CustomClassWithAspectRatio: ComponentStory<typeof Image> = () => (
  <Image
    src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
    className={style['custom-image']}
    alt="placeholder, blank area with an off-white background color"
    aspectRatio="custom"
  />
)
