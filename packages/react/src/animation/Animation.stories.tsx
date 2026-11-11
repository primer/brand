import React from 'react'
import type {Meta} from '@storybook/react'
import {Animate, AnimationProvider, AnimationVariants} from '.'
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

export const NumericVisibilityThreshold = () => (
  <AnimationProvider visibilityOptions={0.5} autoStaggerChildren={false}>
    <Text as="p">Scroll until at least half of the outlined area is visible to reveal its content.</Text>
    <div style={{height: '100vh'}} aria-hidden="true" />
    <div style={{outline: '1px dashed currentColor'}}>
      <Animate animate="fade-in" style={{height: '200px'}}>
        <Text as="p">At least half of this element is visible.</Text>
      </Animate>
    </div>
    <div style={{height: '100vh'}} aria-hidden="true" />
  </AnimationProvider>
)
