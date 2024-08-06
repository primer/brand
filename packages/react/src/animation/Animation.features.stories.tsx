import React from 'react'
import {Meta} from '@storybook/react'
import {AnimationProvider, AnimationVariants} from './AnimationProvider/AnimationProvider'
import {Text, Stack, Box} from '..'

import styles from './Animation.stories.module.css'

export default {
  title: 'Components/AnimationProvider/Features',
} as Meta<typeof AnimationProvider>

export const AnimationOnPress = () => (
  <AnimationProvider animationTrigger="click">
    <Stack className={styles.Playground} animate="fade-out">
      <Text as="p" className={styles.PlaygroundText}>
        Fade out on press
      </Text>
    </Stack>
  </AnimationProvider>
)

export const IntersectionObserver = ({variant, ...args}) => (
  <AnimationProvider {...args}>
    <Box style={{height: '100vh'}}>
      <Text as="p">Scroll to reveal</Text>
    </Box>
    <Box backgroundColor="overlay">
      <Stack className={styles.Playground} animate={variant}>
        <Text as="p">{variant}</Text>
      </Stack>
    </Box>
    <Box style={{height: '100vh'}} />
  </AnimationProvider>
)
IntersectionObserver.args = {
  visibilityOptions: 'middle-of-screen',
  variant: 'fade-in',
}
IntersectionObserver.argTypes = {
  visibilityOptions: {
    options: ['bottom-of-screen', 'middle-of-screen', 'about-to-leave'],
    control: 'radio',
  },
  variant: {
    name: 'animate',
    options: AnimationVariants,
    control: 'select',
    table: {
      category: 'Children',
    },
  },
}

export const AdvancedAnimation = args => (
  <AnimationProvider>
    <Stack className={styles.Playground} animate={args}>
      <Text as="p">{args.variant}</Text>
    </Stack>
  </AnimationProvider>
)
AdvancedAnimation.args = {
  variant: 'fade-in',
  delay: 100,
  duration: 1000,
  ease: 'linear',
}
AdvancedAnimation.argTypes = {
  variant: {
    name: 'animate.variant',
    options: AnimationVariants,
    control: 'select',
  },
  delay: {
    name: 'animate.delay',
    control: 'number',
  },
  duration: {
    name: 'animate.duration',
    control: 'number',
  },
  ease: {
    name: 'animate.ease',
  },
}
