import React, {useEffect} from 'react'
import {
  Box,
  Button,
  Checkbox,
  ColorModesEnum,
  FormControl,
  Grid,
  Hero,
  InlineLink,
  MinimalFooter,
  Select,
  Stack,
  SubdomainNavBar,
  Text,
  TextInput,
  Textarea,
  ThemeProvider,
} from '../../..'

import darkBG from '../fixtures/images/other/dark-bg.png'
import lightBG from '../fixtures/images/other/light-bg.png'
import {Themes, themeDetailsMap} from '../helpers'

import styles from './FeaturePreviewLevelOne.module.css'

type FeaturePreviewLevelOneProps = {
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  accentColor: Themes
  heroLabel: string
  heroTitle: string
  heroDescription: string
}

const bgMap = {
  light: lightBG,
  dark: darkBG,
}

export function FeaturePreviewLevelOne({accentColor, colorMode, ...args}: FeaturePreviewLevelOneProps) {
  const [enableGridOverlay, setEnableGridOverlay] = React.useState(false)
  const [isLightMode, setIsLightMode] = React.useState(colorMode === ColorModesEnum.LIGHT)
  const selectedColorMode = isLightMode ? ColorModesEnum.LIGHT : ColorModesEnum.DARK
  const accentColorValue = themeDetailsMap[accentColor][selectedColorMode].color

  useEffect(() => {
    setIsLightMode(colorMode === ColorModesEnum.LIGHT)
  }, [colorMode])

  const handleOverlay = e => {
    e.preventDefault()
    setEnableGridOverlay(!enableGridOverlay)
  }

  return (
    <ThemeProvider
      colorMode={selectedColorMode}
      style={{
        ['--brand-Pillar-icon-color-default' as string]: accentColorValue,
        ['--brand-Label-color-default' as string]: accentColorValue,
        ['--brand-color-accent-primary' as string]: accentColorValue,
        backgroundColor: 'var(--brand-color-canvas-default)',
      }}
    >
      <SubdomainNavBar title="Preview" fixed={false}>
        <SubdomainNavBar.PrimaryAction href="#" onClick={handleOverlay}>
          {enableGridOverlay ? 'Disable' : 'Enable'} grid
        </SubdomainNavBar.PrimaryAction>
      </SubdomainNavBar>
      <div className={styles['FeaturePreview']} style={{backgroundImage: `url(${bgMap[colorMode as string]})`}}>
        <Grid enableOverlay={enableGridOverlay}>
          <Grid.Column>
            <Hero align="center">
              {args.heroLabel && <Hero.Label>{args.heroLabel}</Hero.Label>}
              {args.heroTitle && <Hero.Heading>{args.heroTitle}</Hero.Heading>}
              {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
            </Hero>
          </Grid.Column>
        </Grid>
        <Box>
          <Grid enableOverlay={enableGridOverlay}>
            <Grid.Column>
              <section>
                <Grid enableOverlay={enableGridOverlay}>
                  <Grid.Column span={{small: 12, medium: 8}} start={{medium: 3}}>
                    <Box
                      backgroundColor="subtle"
                      borderRadius="large"
                      borderColor="subtle"
                      borderWidth="thin"
                      borderStyle="solid"
                      paddingBlockStart={{narrow: 24, regular: 80}}
                      paddingBlockEnd={{narrow: 24, regular: 80}}
                      paddingInlineStart={{narrow: 24, regular: 128}}
                      paddingInlineEnd={{narrow: 24, regular: 128}}
                      marginBlockEnd={{narrow: 64, regular: 96}}
                    >
                      <form>
                        <>
                          <Stack direction="vertical" padding="none">
                            <Box marginBlockEnd={16}>
                              <Text as="p" size="100">
                                All fields marked with an asterisk (*) are required
                              </Text>
                            </Box>
                            <FormControl required fullWidth>
                              <FormControl.Label>Full name</FormControl.Label>
                              <TextInput required />
                            </FormControl>

                            <FormControl required fullWidth>
                              <FormControl.Label>Enterprise name</FormControl.Label>
                              <TextInput required />
                            </FormControl>

                            <FormControl required fullWidth>
                              <FormControl.Label>Enterprise URL</FormControl.Label>
                              <TextInput leadingText="github.com/" required />
                            </FormControl>

                            <FormControl required fullWidth>
                              <FormControl.Label>Country</FormControl.Label>
                              <Select defaultValue="">
                                <Select.Option value="" disabled>
                                  Country
                                </Select.Option>
                                <Select.Option value="us">United States of America</Select.Option>
                                <Select.Option value="uk">United Kingdom</Select.Option>
                              </Select>
                            </FormControl>
                            <FormControl required fullWidth>
                              <FormControl.Label>Message</FormControl.Label>
                              <Textarea />
                            </FormControl>
                          </Stack>

                          <Box
                            className={styles.FeaturePreview__borderTop}
                            paddingBlockStart={{narrow: 16, regular: 24}}
                            marginBlockStart={{narrow: 16, regular: 24}}
                            paddingBlockEnd={{narrow: 16, regular: 24}}
                            marginBlockEnd={{narrow: 16, regular: 24}}
                          >
                            <Stack direction="vertical" padding="none">
                              <FormControl hasBorder required>
                                <FormControl.Label>
                                  Contact me about GitHub Enterprise Server{' '}
                                  <FormControl.Hint>
                                    <Text size="100" variant="muted">
                                      I&apos;m interested in learning more about{' '}
                                      <InlineLink size="100" href="https://github.com/enterprise" target="_blank">
                                        GitHub Enterprise Server
                                      </InlineLink>{' '}
                                      and would like to be contacted by GitHub’s sales team.
                                    </Text>
                                  </FormControl.Hint>
                                </FormControl.Label>
                                <Checkbox />
                              </FormControl>
                              <div
                                style={{
                                  borderWidth: 1,
                                  borderStyle: 'solid',
                                  borderColor: 'var(--brand-control-color-border-default)',
                                  backgroundColor: 'var(--brand-color-canvas-inset)',
                                  height: 150,
                                  width: '100%',
                                  borderRadius: 6,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Text size="100" variant="muted">
                                  Captcha
                                </Text>
                              </div>
                              <FormControl required>
                                <FormControl.Label>
                                  <Text size="100" variant="muted">
                                    I hereby accept the{' '}
                                    <InlineLink size="100" href="https://github.com/customer-terms" target="_blank">
                                      GitHub Customer Agreement
                                    </InlineLink>{' '}
                                    on behalf of my organization and confirm that I have the authority to do so. For
                                    more information about GitHub&apos;s privacy practices, see the{' '}
                                    <InlineLink
                                      size="100"
                                      href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                                      target="_blank"
                                    >
                                      GitHub Privacy Statement.
                                    </InlineLink>{' '}
                                  </Text>
                                </FormControl.Label>

                                <Checkbox />
                              </FormControl>
                              <Box marginBlockStart={16}>
                                <Stack direction="horizontal" padding="none" justifyContent="flex-end">
                                  <Button variant="subtle">Skip trial and upgrade</Button>
                                  <Button variant="primary" type="submit">
                                    Start trial
                                  </Button>
                                </Stack>
                              </Box>
                            </Stack>
                          </Box>
                        </>
                      </form>
                    </Box>
                  </Grid.Column>
                </Grid>
              </section>
            </Grid.Column>
          </Grid>
        </Box>
      </div>
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
