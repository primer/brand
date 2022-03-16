import {ComponentStory, ComponentMeta} from '@storybook/react'
import {SunIcon, MoonIcon} from '@primer/octicons-react'
import {ThemeProvider} from '.'
import {useTheme} from '..'

import styles from './ThemeProvider.stories.module.css'

function ActiveColorScheme() {
  const {colorMode} = useTheme()
  return <span>Active global color mode: {colorMode}</span>
}

function Container({children}: {children: React.ReactNode}) {
  return <section className={styles.activeColorSchemeContainer}>{children}</section>
}

function ControlsHint() {
  return <p className={styles.hint}>Hint: Use Storybook Controls to alternate between color modes.</p>
}

export default {
  title: 'Components/ThemeProvider',
  component: ThemeProvider
} as ComponentMeta<typeof ThemeProvider>

export const Default: ComponentStory<typeof ThemeProvider> = args => {
  console.log(args)
  return (
    <ThemeProvider {...args}>
      <Container>
        <ActiveColorScheme />
      </Container>
      <ControlsHint />
    </ThemeProvider>
  )
}

export const Nested: ComponentStory<typeof ThemeProvider> = args => (
  <ThemeProvider {...args}>
    <Container>
      Parent: 'auto' (<ActiveColorScheme />)
    </Container>
    <ThemeProvider colorMode="dark">
      <Container>
        <MoonIcon /> Child: always 'dark'
      </Container>
      <ThemeProvider colorMode="light">
        <Container>
          <SunIcon /> Child: always 'light'
        </Container>
      </ThemeProvider>
    </ThemeProvider>
    <ControlsHint />
  </ThemeProvider>
)
