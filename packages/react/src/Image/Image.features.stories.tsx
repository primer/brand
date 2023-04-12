import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import style from './ImageStory.module.css'

import {Image} from './Image'

export default {
  title: 'Components/Image/Features',
  component: Image,
  parameters: {
    controls: {
      exclude: /.*/g
    }
  }
} as ComponentMeta<typeof Image>

export const CustomPictureAspectRatio: ComponentStory<typeof Image> = () => (
  <Image src="https://source.unsplash.com/random" alt="Random Image" aspectRatio={[9, 1]} isPicture />
)

export const CustomImageAspectRatio: ComponentStory<typeof Image> = () => (
  <Image src="https://source.unsplash.com/random" alt="Random Image" aspectRatio={[9, 1]} />
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
    isPicture
  />
)

export const CustomClassWithAspectRatio: ComponentStory<typeof Image> = () => (
  <Image
    src="https://source.unsplash.com/random"
    className={style['custom-image']}
    alt="Random Image"
    aspectRatio={[9, 1]}
  />
)
