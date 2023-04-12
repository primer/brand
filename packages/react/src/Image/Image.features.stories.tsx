import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import style from './ImageStory.module.css'

import {Image} from './Image'

export default {
  title: 'Components/Image/Features',
  component: Image
} as ComponentMeta<typeof Image>

export const Default: ComponentStory<typeof Image> = () => (
  <Image src="https://source.unsplash.com/random" alt="Random Image" />
)

export const CustomPictureAspectRatio: ComponentStory<typeof Image> = () => (
  <Image src="https://source.unsplash.com/random" alt="Random Image" aspectRatio="custom" as="picture" />
)

export const CustomImageAspectRatio: ComponentStory<typeof Image> = () => (
  <Image src="https://source.unsplash.com/random" alt="Random Image" aspectRatio="custom" />
)

export const CustomImageHeight: ComponentStory<typeof Image> = () => (
  <Image src="https://source.unsplash.com/random" alt="Random Image" height={200} />
)

export const CustomImageWidth: ComponentStory<typeof Image> = () => (
  <Image src="https://source.unsplash.com/random" alt="Random Image" width={200} />
)

export const CustomImageWidthAndHeight: ComponentStory<typeof Image> = () => (
  <Image src="https://source.unsplash.com/random" alt="Random Image" height={200} width={200} />
)

export const CustomClass: ComponentStory<typeof Image> = () => (
  <Image
    src="https://source.unsplash.com/random"
    className={style['custom-image']}
    alt="Random Image"
    height={200}
    width={200}
  />
)

export const CustomClassOnPicture: ComponentStory<typeof Image> = () => (
  <Image
    src="https://source.unsplash.com/random"
    className={style['custom-image']}
    alt="Random Image"
    height={200}
    width={200}
    as="picture"
  />
)

export const CustomClassWithAspectRatio: ComponentStory<typeof Image> = () => (
  <Image
    src="https://source.unsplash.com/random"
    className={style['custom-image']}
    alt="Random Image"
    aspectRatio="custom"
  />
)
