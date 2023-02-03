import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Avatar} from '.'
import {Stack} from '../Stack'

export default {
  title: 'Components/Avatar/Features',
  component: Avatar
} as ComponentMeta<typeof Avatar>

export const Sizes = () => (
  <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious" style={{height: '100vh'}}>
    <Avatar size={32} src="https://i.pravatar.cc/128?u=80" alt="A random avatar picture" />
    <Avatar size={40} src="https://i.pravatar.cc/128?u=34" alt="A random avatar picture" />
    <Avatar size={48} src="https://i.pravatar.cc/128?u=51" alt="A random avatar picture" />
  </Stack>
)

export const ResponsiveSizes = () => (
  <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="spacious" style={{height: '100vh'}}>
    <Avatar
      size={{narrow: 32, regular: 40, wide: 48}}
      src="https://i.pravatar.cc/128?u=51"
      alt="A random avatar picture"
    />
  </Stack>
)
