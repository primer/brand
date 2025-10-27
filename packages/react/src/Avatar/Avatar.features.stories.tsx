import React from 'react'
import type {Meta} from '@storybook/react'
import {Avatar} from '.'
import {Stack} from '../Stack'
import placeholderAvatar from '../fixtures/images/avatar-mona.png'

export default {
  title: 'Components/Avatar/Features',
  component: Avatar,
} as Meta<typeof Avatar>

export const Sizes = () => (
  <Stack style={{height: '100vh'}} justifyContent="center">
    <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious">
      <Avatar size={32} src={placeholderAvatar} alt="A random avatar picture" />
      <Avatar size={40} src={placeholderAvatar} alt="A random avatar picture" />
      <Avatar size={48} src={placeholderAvatar} alt="A random avatar picture" />
      <Avatar size={64} src={placeholderAvatar} alt="A random avatar picture" />
      <Avatar size={80} src={placeholderAvatar} alt="A random avatar picture" />
    </Stack>

    <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious">
      <Avatar shape="square" size={32} src={placeholderAvatar} alt="A random avatar picture" />
      <Avatar shape="square" size={40} src={placeholderAvatar} alt="A random avatar picture" />
      <Avatar shape="square" size={48} src={placeholderAvatar} alt="A random avatar picture" />
      <Avatar shape="square" size={64} src={placeholderAvatar} alt="A random avatar picture" />
      <Avatar shape="square" size={80} src={placeholderAvatar} alt="A random avatar picture" />
    </Stack>
  </Stack>
)

export const Shapes = () => (
  <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious" style={{height: '100vh'}}>
    <Avatar shape="circle" size={48} src={placeholderAvatar} alt="A random avatar picture" />
    <Avatar shape="square" size={48} src={placeholderAvatar} alt="A random avatar picture" />
  </Stack>
)

export const ResponsiveSizes = () => (
  <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious" style={{height: '100vh'}}>
    <Avatar size={{narrow: 32, regular: 48, wide: 80}} src={placeholderAvatar} alt="A random avatar picture" />
  </Stack>
)
