import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../fixtures/images/placeholder.png'
import style from './Image.stories.module.css'

import {Image, ImageBorderRadiusOptions} from './Image'
import {Stack} from '../Stack'

const meta = {
  title: 'Components/Image/Features',
  component: Image,
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof Image>

export const CustomPictureAspectRatio: Story = {
  render: () => (
    <Image
      src={placeholderImage}
      alt="placeholder, blank area with a gray background color"
      aspectRatio="custom"
      as="picture"
    />
  ),
}

export const CustomImageAspectRatio: Story = {
  render: () => (
    <Image src={placeholderImage} alt="placeholder, blank area with a gray background color" aspectRatio="custom" />
  ),
}

export const CustomImageHeight: Story = {
  render: () => (
    <Image src={placeholderImage} alt="placeholder, blank area with a gray background color" height={200} />
  ),
}

export const CustomImageWidth: Story = {
  render: () => <Image src={placeholderImage} alt="placeholder, blank area with a gray background color" width={200} />,
}

export const CustomImageWidthAndHeight: Story = {
  render: () => (
    <Image src={placeholderImage} alt="placeholder, blank area with a gray background color" height={200} width={200} />
  ),
}

export const CustomClass: Story = {
  render: () => (
    <Image
      src={placeholderImage}
      className={style['custom-image']}
      alt="placeholder, blank area with a gray background color"
      height={200}
      width={200}
    />
  ),
}

export const CustomClassOnPicture: Story = {
  render: () => (
    <Image
      src={placeholderImage}
      className={style['custom-image']}
      alt="placeholder, blank area with a gray background color"
      height={200}
      width={200}
      as="picture"
    />
  ),
}

export const CustomClassWithAspectRatio: Story = {
  render: () => (
    <Image
      src={placeholderImage}
      className={style['custom-image']}
      alt="placeholder, blank area with a gray background color"
      aspectRatio="custom"
    />
  ),
}

export const BorderRadiusOptions: Story = {
  render: () => (
    <Stack direction="horizontal">
      {ImageBorderRadiusOptions.map(borderRadius => (
        <Image
          key={borderRadius}
          src={placeholderImage}
          width={200}
          height={200}
          alt="placeholder, blank area with a gray background color"
          borderRadius={borderRadius}
        />
      ))}
    </Stack>
  ),
}
