import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Avatar} from '.'
import {Stack} from '../Stack'

export default {
  title: 'Components/Avatar/Features',
  component: Avatar
} as ComponentMeta<typeof Avatar>

export const Sizes = () => (
  <Stack style={{height: '100vh'}} justifyContent="center">
    <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious">
      <Avatar size={32} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
      <Avatar size={40} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
      <Avatar size={48} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
      <Avatar size={64} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
      <Avatar size={80} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
    </Stack>

    <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious">
      <Avatar shape="square" size={32} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
      <Avatar shape="square" size={40} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
      <Avatar shape="square" size={48} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
      <Avatar shape="square" size={64} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
      <Avatar shape="square" size={80} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
    </Stack>
  </Stack>
)

export const Shapes = () => (
  <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious" style={{height: '100vh'}}>
    <Avatar shape="circle" size={48} src="https://i.pravatar.cc/96?u=51" alt="A random avatar picture" />
    <Avatar shape="square" size={48} src="https://i.pravatar.cc/96?u=51" alt="A random avatar picture" />
  </Stack>
)

export const ResponsiveSizes = () => (
  <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious" style={{height: '100vh'}}>
    <Avatar
      size={{narrow: 32, regular: 48, wide: 80}}
      src="https://i.pravatar.cc/160?u=51"
      alt="A random avatar picture"
    />
  </Stack>
)
