import React from 'react'
import type {Meta} from '@storybook/react'
import {AnimationProvider, AnimationVariants} from '.'
import {Text, Stack} from '..'

import styles from './Animation.stories.module.css'

export default {
  title: 'Components/Animations',
  component: AnimationProvider,
} as Meta<typeof AnimationProvider>

export const Playground = args => {
  return (
    <AnimationProvider {...args} key={args.variant}>
      <Stack
        className={styles.Playground}
        justifyContent="center"
        alignItems="center"
        animate={{
          variant: args.variant,
        }}
      >
        <Text as="p">{args.variant}</Text>
      </Stack>
    </AnimationProvider>
  )
}

Playground.args = {
  variant: 'fade-in',
}

Playground.argTypes = {
  variant: {
    control: {
      type: 'inline-radio',
      options: AnimationVariants,
    },
  },
}
