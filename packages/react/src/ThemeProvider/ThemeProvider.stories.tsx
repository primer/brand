import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {SunIcon, MoonIcon} from '@primer/octicons-react'
import {ThemeProvider, type ThemeProviderProps} from '.'
import {Box, Text, Stack, useTheme} from '..'
import styles from './ThemeProvider.stories.module.css'

function ActiveColorMode() {
  const {colorMode} = useTheme()
  return <Text>Active global color mode: {colorMode}</Text>
}

const providerBoxProps = {
  backgroundColor: 'default',
  borderColor: 'default',
  borderRadius: 'xlarge',
  borderStyle: 'solid',
  borderWidth: 'thin',
  padding: 24,
} as const

function Container({children}: {children: React.ReactNode}) {
  return <section className={styles['active-color-scheme']}>{children}</section>
}

function ControlsHint() {
  return (
    <Text as="p" variant="muted">
      Hint: Use Storybook Controls to alternate between color modes.
    </Text>
  )
}

const StorybookColorModes = [
  'light',
  'dark',
  'dark_dimmed',
  'light_high_contrast',
  'dark_high_contrast',
  'auto',
] satisfies ThemeProviderProps['colorMode'][]

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  argTypes: {
    colorMode: {
      control: 'select',
      options: StorybookColorModes,
    },
  },
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

export const DerivedColorModes: Story = {
  args: {
    colorMode: 'auto',
  },
  render: args => (
    <Stack gap="normal">
      <ThemeProvider colorMode={args.colorMode}>
        <Box {...providerBoxProps}>
          <Stack gap="normal">
            <Text>{`Parent provider: ${args.colorMode}`}</Text>
            <ThemeProvider colorMode="dark_dimmed">
              <Box {...providerBoxProps}>
                <Stack gap="normal">
                  <Text font="hubot-sans">Nested provider: dark_dimmed</Text>
                  <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="normal">
                    <ThemeProvider colorMode="light_high_contrast" style={{flex: '1 1 0', display: 'flex'}}>
                      <Box {...providerBoxProps} style={{minHeight: '12rem', width: '100%'}}>
                        <Text font="hubot-sans">Sibling provider: light_high_contrast</Text>
                      </Box>
                    </ThemeProvider>
                    <ThemeProvider colorMode="dark_high_contrast" style={{flex: '1 1 0', display: 'flex'}}>
                      <Box {...providerBoxProps} style={{minHeight: '12rem', width: '100%'}}>
                        <Text font="hubot-sans">Sibling provider: dark_high_contrast</Text>
                      </Box>
                    </ThemeProvider>
                    <ThemeProvider colorMode="auto" style={{flex: '1 1 0', display: 'flex'}}>
                      <Box {...providerBoxProps} style={{minHeight: '12rem', width: '100%'}}>
                        <Text font="hubot-sans">Sibling provider: auto</Text>
                      </Box>
                    </ThemeProvider>
                  </Stack>
                </Stack>
              </Box>
            </ThemeProvider>
          </Stack>
        </Box>
      </ThemeProvider>
    </Stack>
  ),
}
