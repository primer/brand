import React from 'react'
import {Meta} from '@storybook/react'
import {AnimationProvider} from './AnimationProvider/AnimationProvider'
import {Text, Stack} from '..'

import styles from './Animation.stories.module.css'

export default {
  title: 'Components/AnimationProvider/Features',
} as Meta<typeof AnimationProvider>

export const AnimationOnPress = () => {
  return (
    <AnimationProvider animationTrigger="click">
      <Stack className={styles.Playground} justifyContent="center" alignItems="center" animate="fade-out">
        <Text as="p" className={styles.PlaygroundText}>
          Fade out on press
        </Text>
      </Stack>
    </AnimationProvider>
  )
}
