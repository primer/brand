import React from 'react'
import {Heading, Stack, Text} from '@primer/react-brand'
import styles from './hero.module.css'

export default function Hero() {
  return (
    <Stack
      padding="none"
      gap="spacious"
      direction="horizontal"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack gap="normal" padding="none">
        <Heading as="h2" size="3">
          Primer Brand UI
        </Heading>
        <Text as="p" variant="muted" size="300">
          Primer Brand is GitHub's design system for creating marketing websites and digital experiences.
        </Text>
      </Stack>
      <div className={styles.HeroImage}>
        <img
          width="256"
          alt="Mona"
          src="https://github.com/user-attachments/assets/e9a4d7f8-8e61-4f45-a1a7-466848df6dda"
        />
      </div>
    </Stack>
  )
}
