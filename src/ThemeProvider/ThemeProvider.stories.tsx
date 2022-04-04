import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {SunIcon, MoonIcon} from '@primer/octicons-react'
import {ThemeProvider} from '.'
import {useTheme} from '..'

import styles from './ThemeProvider.stories.module.css'

function ActiveColorMode() {
  const {colorMode} = useTheme()
  return <span>Active global color mode: {colorMode}</span>
}

function Container({children}: {children: React.ReactNode}) {
  return <section className={styles['active-color-scheme']}>{children}</section>
}

function ControlsHint() {
  return <p className={styles.hint}>Hint: Use Storybook Controls to alternate between color modes.</p>
}

export default {
  title: 'Components/ThemeProvider',
  component: ThemeProvider
} as ComponentMeta<typeof ThemeProvider>

export const Default: ComponentStory<typeof ThemeProvider> = args => {
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

export const Nested: ComponentStory<typeof ThemeProvider> = args => (
  <ThemeProvider {...args}>
    <>
      <Container>
        Parent: &apos;auto&apos; (<ActiveColorMode />)
      </Container>
      <ThemeProvider colorMode="dark">
        <>
          <Container>
            <MoonIcon /> Child: always &apos;dark&apos;
          </Container>
          <ThemeProvider colorMode="light">
            <Container>
              <SunIcon /> Child: always &apos;light&apos;
            </Container>
          </ThemeProvider>
        </>
      </ThemeProvider>
      <ControlsHint />
    </>
  </ThemeProvider>
)

export const WithToggle: ComponentStory<typeof ThemeProvider> = args => {
  const {colorMode, availableColorModes, setColorMode} = useTheme()
  return (
    <>
      <div>
        {availableColorModes.map(mode => (
          <div key={mode}>
            <label htmlFor={mode}>{mode}</label>
            <input
              type="radio"
              name="theme-selection"
              id={mode}
              checked={colorMode === mode}
              onChange={() => setColorMode(mode)}
            />
          </div>
        ))}
      </div>
      <Container>
        <SunIcon /> {colorMode}
      </Container>
    </>
  )
}
