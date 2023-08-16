import React from 'react'
import {
  Box,
  Grid,
  Heading,
  Hero,
  InlineLink,
  MinimalFooter,
  SectionIntro,
  Stack,
  SubdomainNavBar,
  Text,
  ThemeProvider,
} from '../..'

import styles from './FeaturePreviewLevelZero.module.css'

export function FeaturePreviewLevelZero() {
  const [enableGridOverlay, setEnableGridOverlay] = React.useState(false)
  const [isLightMode, setIsLightMode] = React.useState(true)

  const handleOverlay = e => {
    e.preventDefault()
    setEnableGridOverlay(!enableGridOverlay)
  }

  const handleMode = e => {
    e.preventDefault()
    setIsLightMode(!isLightMode)
  }

  return (
    <ThemeProvider
      colorMode={isLightMode ? 'light' : 'dark'}
      style={{backgroundColor: 'var(--brand-color-canvas-default)'}}
    >
      <SubdomainNavBar title="Preview">
        <SubdomainNavBar.SecondaryAction href="#" onClick={handleMode}>
          Change color mode
        </SubdomainNavBar.SecondaryAction>
        <SubdomainNavBar.PrimaryAction href="#" onClick={handleOverlay}>
          {enableGridOverlay ? 'Disable' : 'Enable'} grid
        </SubdomainNavBar.PrimaryAction>
      </SubdomainNavBar>
      <main>
        <Grid enableOverlay={enableGridOverlay}>
          <Grid.Column>
            <Hero align="center">
              <Hero.Label>Label</Hero.Label>
              <Hero.Heading>Expressive headline about a sweet feature</Hero.Heading>
              <Hero.Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                sed turpis felis nam pulvinar.
              </Hero.Description>
              <Hero.PrimaryAction href="#">Primary CTA</Hero.PrimaryAction>
            </Hero>
            <section>
              <Grid enableOverlay={enableGridOverlay}>
                <Grid.Column span={6} start={4}>
                  <Stack padding="none">
                    <SectionIntro>
                      <SectionIntro.Heading className={styles['SectionIntro__heading--no-max-width']} size="5">
                        Signup for this cool feature to enable you to do this before everyone else. Be among the first
                        to learn the latest about our platforms, technologies, and tools.
                      </SectionIntro.Heading>
                    </SectionIntro>
                    <Stack direction="vertical" padding="none">
                      <Text as="p" variant="muted">
                        It’s often considered polite to tell people what they are about to sign up for. Even if it
                        involves making them read a bunch. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                        sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                      </Text>
                      <Text as="p" variant="muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </Text>
                    </Stack>
                    <Box
                      className={styles.FeaturePreview__borderTop}
                      paddingBlockStart={{narrow: 24, regular: 48}}
                      marginBlockStart={{narrow: 24, regular: 48}}
                      paddingBlockEnd={{narrow: 24, regular: 48}}
                      marginBlockEnd={{narrow: 24, regular: 48}}
                    >
                      <Stack direction="vertical" padding="none">
                        <Heading as="h2" size="subhead-large">
                          Learn more about this
                        </Heading>
                        <Text as="p">
                          Name of this relevant thing: <InlineLink href="#">Lorem ipsum dolor sit amet</InlineLink>
                        </Text>
                        <Text as="p">
                          Name of this relevant thing: <InlineLink href="#">Consectetur adipiscing elit</InlineLink>
                        </Text>
                      </Stack>
                    </Box>
                  </Stack>
                </Grid.Column>
              </Grid>
            </section>
          </Grid.Column>
        </Grid>
      </main>
      <MinimalFooter>
        <MinimalFooter.Link href="https://github.com/organizations/enterprise_plan">
          Try GitHub for free
        </MinimalFooter.Link>
        <MinimalFooter.Link href="https://github.com/enterprise">Enterprise</MinimalFooter.Link>
        <MinimalFooter.Link href="https://github.com/enterprise/contact">Email us</MinimalFooter.Link>
      </MinimalFooter>
      {enableGridOverlay && (
        <Grid
          enableOverlay={enableGridOverlay}
          style={{
            zIndex: 1,
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, 0)',
            maxWidth: '1280px',
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={1}></Grid.Column>
        </Grid>
      )}
    </ThemeProvider>
  )
}
