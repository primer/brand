import React from 'react'
import {Meta} from '@storybook/react'
import {AnimationProvider, AnimationVariants} from '.'
import {Text, Stack} from '..'

import styles from './Animation.stories.module.css'

export default {
  title: 'Components/AnimationProvider',
  component: AnimationProvider,
} as Meta<typeof AnimationProvider>

export const Default = () => (
  <AnimationProvider>
    <Stack className={styles.Playground} animate="fade-in">
      <Text as="p">fade-in</Text>
    </Stack>
  </AnimationProvider>
)

export const Playground = args => {
  return (
    <AnimationProvider {...args} key={args.variant}>
      <Stack direction="horizontal">
        {Array.from({length: 3}).map((_, i) => (
          <Stack key={i} className={styles.Playground} animate={args.variant}>
            <Text as="p">{args.variant}</Text>
          </Stack>
        ))}
      </Stack>
    </AnimationProvider>
  )
}

Playground.args = {
  variant: 'fade-in',
  disableAnimations: false,
  animationTrigger: 'on-visible',
  runOnce: false,
  autoStaggerChildren: true,
  staggerDelayIncrement: 100,
}

Playground.argTypes = {
  variant: {
    name: 'animate',
    options: AnimationVariants,
    control: 'select',
    table: {
      category: 'Children',
    },
  },
  visibilityOptions: {
    table: {
      disable: true,
    },
  },
}
