import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {SunIcon, MoonIcon} from '@primer/octicons-react'
import {ThemeProvider} from '.'
import {useTheme} from '..'
import {Text} from '../Text'

import styles from './ThemeProvider.stories.module.css'

function ActiveColorMode() {
  const {colorMode} = useTheme()
  return <Text>Active global color mode: {colorMode}</Text>
}

function Container({children}: {children: React.ReactNode}) {
  return <section className={styles['active-color-scheme']}>{children}</section>
}

function ControlsHint() {
  return (
    <Text as="p" className={styles.hint}>
      Hint: Use Storybook Controls to alternate between color modes.
    </Text>
  )
}

export default {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
} as Meta<typeof ThemeProvider>

export const Default: StoryFn<typeof ThemeProvider> = args => {
  return (
    <ThemeProvider {...args}>
      <>
        <Container>
          <ActiveColorMode />
        </Container>
        <ControlsHint />
      </>
    </ThemeProvider>
  )
}

export const Nested: StoryFn<typeof ThemeProvider> = args => (
  <div className={styles['story-example']}>
    <ThemeProvider {...args}>
      <>
        <Container>
          <Text>Parent: &apos;default&apos;</Text> (<ActiveColorMode />)
        </Container>
        <ThemeProvider colorMode="dark">
          <>
            <Container>
              <MoonIcon /> <Text>Child: always &apos;dark&apos;</Text>
            </Container>
            <ThemeProvider colorMode="light">
              <Container>
                <SunIcon /> <Text>Child: always &apos;light&apos;</Text>
              </Container>
            </ThemeProvider>
          </>
        </ThemeProvider>
        <ControlsHint />
      </>
    </ThemeProvider>
  </div>
)
