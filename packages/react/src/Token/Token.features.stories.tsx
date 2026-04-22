import React from 'react'
import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {CopilotIcon} from '@primer/octicons-react'

import {Stack} from '..'
import {Avatar} from '../Avatar'
import {MicrosoftLogo} from '../fixtures/third-party-logos/MicrosoftLogo'
import placeholderAvatar from '../fixtures/images/avatar-mona.png'
import {Token, TokenVariants} from '.'

export default {
  title: 'Components/Token/Features',
  component: Token,
} as Meta<typeof Token>

type Story = StoryObj<typeof Token>

export const Variants: StoryFn<typeof Token> = () => {
  return (
    <Stack padding="none" direction="horizontal" gap="normal" style={{flexWrap: 'wrap'}}>
      {TokenVariants.map(variant => (
        <Token key={variant} variant={variant}>
          {variant}
        </Token>
      ))}
    </Stack>
  )
}

export const InteractiveVariants: StoryFn<typeof Token> = () => {
  return (
    <Stack padding="none" direction="horizontal" gap="normal" style={{flexWrap: 'wrap'}}>
      {TokenVariants.map(variant => (
        <Token key={variant} as="a" href="#" variant={variant}>
          {variant}
        </Token>
      ))}
    </Stack>
  )
}

export const WithLeadingVisual: StoryFn<typeof Token> = () => {
  return (
    <Stack padding="none" direction="horizontal" gap="normal" style={{flexWrap: 'wrap'}}>
      <Token leadingVisual={<CopilotIcon />}>With octicon</Token>
      <Token variant="outline" leadingVisual={<MicrosoftLogo />}>
        With logo
      </Token>
      <Token variant="dark-gray" leadingVisual={<CopilotIcon />}>
        With contrast
      </Token>
    </Stack>
  )
}

export const WithAvatarLeadingVisual: StoryFn<typeof Token> = () => {
  return (
    <Stack padding="none" direction="horizontal" gap="normal" style={{flexWrap: 'wrap'}}>
      <Token leadingVisual={<Avatar shape="square" size={32} src={placeholderAvatar} alt="A random avatar picture" />}>
        With avatar
      </Token>
      <Token
        as="a"
        href="https://github.com"
        variant="outline"
        leadingVisual={<Avatar shape="square" size={32} src={placeholderAvatar} alt="A random avatar picture" />}
      >
        Clickable avatar
      </Token>
    </Stack>
  )
}

export const PolymorphicLink: Story = {
  render: () => (
    <Token as="a" href="https://github.com">
      Topic
    </Token>
  ),
}

export const LongText: Story = {
  name: 'Long text (narrow viewport)',
  globals: {
    viewport: {value: 'iphone5'},
  },
  render: () => (
    <Token as="a" href="https://github.com">
      This is a very long topic name that should wrap or truncate appropriately
    </Token>
  ),
}
