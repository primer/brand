import React, {useEffect} from 'react'
import {
  Box,
  ColorModesEnum,
  Grid,
  Heading,
  Hero,
  MinimalFooter,
  Stack,
  SubdomainNavBar,
  ThemeProvider,
  UnorderedList,
} from '../../..'

import {Themes, themeDetailsMap} from '../helpers'

import styles from './FeaturePreviewLevelOne.module.css'
import {FormExample} from './components/FormExample'

type FeaturePreviewLevelOneSideBySideProps = {
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  accentColor: Themes
  heroLabel: string
  heroTitle: string
  heroDescription: string
}

export function FeaturePreviewLevelOneSideBySide({
  accentColor,
  colorMode,
  ...args
}: FeaturePreviewLevelOneSideBySideProps) {
  const [enableGridOverlay, setEnableGridOverlay] = React.useState(false)
  const [isLightMode, setIsLightMode] = React.useState(colorMode === ColorModesEnum.LIGHT)
  const selectedColorMode = isLightMode ? ColorModesEnum.LIGHT : ColorModesEnum.DARK
  const accentColorValue = themeDetailsMap[accentColor][selectedColorMode].color

  useEffect(() => {
    setIsLightMode(colorMode === ColorModesEnum.LIGHT)
  }, [colorMode])

  useEffect(() => {
    const mainContent = document.querySelector('.main-content') as HTMLDivElement | null
    const splitLayout = document.querySelector(`.${styles.FeaturePreview__heroBg}`) as HTMLDivElement | null

    const handleResize = () => {
      if (mainContent && splitLayout) {
        if (window.innerWidth >= 1280) {
          splitLayout.style.height = `${mainContent.clientHeight}px`
        } else {
          splitLayout.style.height = 'auto'
        }
      }
    }

    handleResize() // Set initial height on mount

    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('resize', handleResize) // Update height on window resize

    return () => {
      window.removeEventListener('resize', handleResize) // Remove event listener on unmount
    }
  }, [])

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
      <Grid fullWidth enableOverlay={enableGridOverlay} className={styles.FeaturePreview__splitLayout}>
        <Grid.Column span={{large: 6}} className={styles.FeaturePreview__heroBg} />
        <Grid.Column span={{large: 6}} />
      </Grid>
      <Box className="main-content">
        <Grid enableOverlay={enableGridOverlay} className={styles.FeaturePreview__mainContentGrid}>
          <Grid.Column span={{large: 6}} className={styles.FeaturePreview__hero}>
            <Stack padding="none" justifyContent={{wide: 'flex-end'}}>
              <Box padding={24}>
                <ThemeProvider colorMode="dark">
                  <Hero align="start">
                    {args.heroLabel && <Hero.Label color="blue-purple">{args.heroLabel}</Hero.Label>}
                    {args.heroTitle && (
                      <Hero.Heading size="3">
                        Set up your <br /> enterprise trial
                      </Hero.Heading>
                    )}
                    {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
                    <Box marginBlockStart={48}>
                      <UnorderedList variant="checked">
                        <UnorderedList.Item>Access to core collaboration features</UnorderedList.Item>
                        <UnorderedList.Item>Unlimited public repositories</UnorderedList.Item>
                        <UnorderedList.Item>Community support</UnorderedList.Item>
                      </UnorderedList>
                    </Box>
                  </Hero>
                </ThemeProvider>
              </Box>
            </Stack>
          </Grid.Column>
          <Grid.Column span={{large: 5}} start={{xlarge: 8}}>
            <Box
              padding={24}
              marginBlockStart={{
                wide: 128,
              }}
            >
              <Stack direction="vertical" padding="none">
                <Heading as="h2" size="6">
                  Get started
                </Heading>
                <FormExample />
              </Stack>
            </Box>
          </Grid.Column>
        </Grid>
      </Box>
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
