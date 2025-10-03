import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
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

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
} satisfies Meta<typeof ThemeProvider>

export default meta
type Story = StoryObj<typeof ThemeProvider>

export const Default: Story = {
  render: args => {
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
  },
}

export const Nested: Story = {
  render: args => (
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
  ),
}
