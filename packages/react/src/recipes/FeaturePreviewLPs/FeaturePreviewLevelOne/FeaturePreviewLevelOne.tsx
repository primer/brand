import React, {useEffect} from 'react'
import {Box, ColorModesEnum, Grid, Hero, MinimalFooter, Section, SubdomainNavBar, ThemeProvider} from '../../..'

import darkBG from '../fixtures/images/other/dark-bg.png'
import lightBG from '../fixtures/images/other/light-bg.png'
import {Themes, themeDetailsMap} from '../helpers'

import styles from './FeaturePreviewLevelOne.module.css'
import {FormExample} from './components/FormExample'

type FeaturePreviewLevelOneProps = {
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  accentColor: Themes
  formType: 'default' | 'extended'
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
      <SubdomainNavBar title={`Level 1`} fixed={false}>
        <SubdomainNavBar.PrimaryAction href="#" onClick={handleOverlay}>
          {enableGridOverlay ? 'Disable' : 'Enable'} grid
        </SubdomainNavBar.PrimaryAction>
      </SubdomainNavBar>
      <Section
        as="div"
        className={styles['FeaturePreview']}
        backgroundImagePosition="top center"
        backgroundImageSrc={bgMap[colorMode as string]}
        paddingBlockStart="none"
        paddingBlockEnd="none"
      >
        <Grid enableOverlay={enableGridOverlay}>
          <Grid.Column>
            <Hero align="center">
              {args.heroLabel && <Hero.Label animate>{args.heroLabel}</Hero.Label>}
              {args.heroTitle && <Hero.Heading>{args.heroTitle}</Hero.Heading>}
              {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
            </Hero>
          </Grid.Column>
        </Grid>

        <Section paddingBlockStart="none" paddingBlockEnd="none">
          <Grid enableOverlay={enableGridOverlay}>
            <Grid.Column>
              <Grid enableOverlay={enableGridOverlay}>
                <Grid.Column span={{small: 12, xlarge: 8}} start={{xlarge: 3}}>
                  <Box
                    backgroundColor="subtle"
                    borderRadius="large"
                    borderColor={colorMode === ColorModesEnum.LIGHT ? 'subtle' : 'default'}
                    borderWidth="thin"
                    borderStyle="solid"
                    paddingBlockStart={{narrow: 24, regular: 80}}
                    paddingBlockEnd={{narrow: 24, regular: 80}}
                    paddingInlineStart={{narrow: 24, regular: 128}}
                    paddingInlineEnd={{narrow: 24, regular: 128}}
                    marginBlockEnd={{narrow: 64, regular: 96}}
                  >
                    <FormExample type={args.formType} />
                  </Box>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </Section>
      </Section>
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
