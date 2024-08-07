import {HeartIcon, LogoGithubIcon, MoonIcon, StackIcon, StarIcon, SunIcon} from '@primer/octicons-react'
import React, {useCallback, useEffect} from 'react'
import {
  AnimationProvider,
  Box,
  BreakoutBanner,
  Button,
  Card,
  CTABanner,
  Grid,
  Heading,
  Hero,
  Link,
  MinimalFooter,
  Statistic,
  SubdomainNavBar,
  ColorModesEnum,
  ThemeProvider,
  SectionIntro,
} from '../../..'

import lightNarrowBg from '../../../fixtures/images/light-vertical-banner.png'
import lightWideBg from '../../../fixtures/images/light-horizontal-banner.png'
import lightWideAltBG from '../../../fixtures/images/background-light-collaboration.webp'
import darkNarrowBg from '../../../fixtures/images/dark-vertical-banner.png'
import darkWideBg from '../../../fixtures/images/dark-horizontal-banner.png'

import styles from './CategoryPage.module.css'

type CategoryPageProps = {
  variant: 'size' | 'industry' | 'use-case'
  gridOverlay?: boolean
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK

  heroLabel: string
  heroTitle: string
  heroDescription: string
  heroCtaTextPrimary: string
  heroCtaTextSecondary: string

  introVariant: 'pillars' | 'editorial prose' | 'editorial list'

  [key: string]: unknown
}

export function CategoryPage({
  variant,
  gridOverlay = false,
  colorMode = ColorModesEnum.LIGHT,
  ...args
}: CategoryPageProps) {
  const [enableGridOverlay, setGridOverlay] = React.useState(gridOverlay)
  const [isLightMode, setIsLightMode] = React.useState(colorMode === ColorModesEnum.LIGHT)
  const selectedColorMode = isLightMode ? ColorModesEnum.LIGHT : ColorModesEnum.DARK

  useEffect(() => {
    setIsLightMode(colorMode === ColorModesEnum.LIGHT)
  }, [colorMode])

  const handleMode = e => {
    e.preventDefault()
    setIsLightMode(!isLightMode)
  }

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'G') {
        setGridOverlay(!enableGridOverlay)
      }
    },
    [enableGridOverlay],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [enableGridOverlay, handleKeyPress])

  return (
    <ThemeProvider
      colorMode={selectedColorMode}
      style={{
        backgroundColor:
          colorMode === 'light' ? 'var(--brand-color-canvas-default)' : 'var(--brand-color-canvas-subtle)',
      }}
      {...args}
    >
      <div className={styles.hideHorizontalOverflow}>
        <SubdomainNavBar title="" fixed={false}>
          <SubdomainNavBar.SecondaryAction
            aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            href="#"
            onClick={handleMode}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            variant="invisible"
          >
            {isLightMode ? <MoonIcon size={24} /> : <SunIcon size={24} />}
          </SubdomainNavBar.SecondaryAction>
        </SubdomainNavBar>
        <AnimationProvider runOnce visibilityOptions={0.2}>
          <Box marginBlockStart={20}>
            <Grid>
              <Grid.Column>
                <Link href="#" arrowDirection="start">
                  Solutions
                </Link>
              </Grid.Column>
            </Grid>
          </Box>
          <Box className={styles.customHero}>
            <Grid enableOverlay={enableGridOverlay} className={styles.relative}>
              <Grid.Column>
                <Hero>
                  {args.heroLabel && <Hero.Label>{args.heroLabel}</Hero.Label>}
                  {args.heroTitle && <Hero.Heading>{args.heroTitle}</Hero.Heading>}
                  {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
                </Hero>
              </Grid.Column>
            </Grid>
          </Box>
          <Box
            marginBlockEnd={{
              narrow: 16,
              regular: 16,
              wide: 48,
            }}
          >
            <Grid enableOverlay={enableGridOverlay} className={styles.subtleCards}>
              <Grid.Column span={{large: 12}}>
                <SectionIntro>
                  <SectionIntro.Heading>Focus on solving bigger problems</SectionIntro.Heading>
                  <SectionIntro.Description>
                    Spend less time creating boilerplate and repetitive code patterns, and more time on what matters:
                    building great software. Write a comment describing the logic you want and GitHub Copilot will
                    immediately suggest code to implement the solution.
                  </SectionIntro.Description>
                  <SectionIntro.Link href="#">Explore docs</SectionIntro.Link>
                </SectionIntro>
              </Grid.Column>
            </Grid>
          </Box>
          <section>
            <Grid enableOverlay={enableGridOverlay} className={styles.subtleCards}>
              <Grid.Column>
                <Box marginBlockStart={{narrow: 32, regular: 96}}>
                  <BreakoutBanner
                    leadingVisual={<LogoGithubIcon size="medium" fill="var(--brand-color-text-default)" />}
                    backgroundImageSrc={{
                      narrow: colorMode === 'light' ? lightNarrowBg : darkNarrowBg,
                      regular: colorMode === 'light' ? lightWideBg : darkWideBg,
                      wide: colorMode === 'light' ? lightWideBg : darkWideBg,
                    }}
                  >
                    <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>
                    <BreakoutBanner.LinkGroup>
                      <Link href="#">Primary action</Link>
                    </BreakoutBanner.LinkGroup>
                  </BreakoutBanner>
                </Box>

                <Box marginBlockStart={{narrow: 64, regular: 128}} marginBlockEnd={{narrow: 64, regular: 128}}>
                  <Grid>
                    <Grid.Column span={{medium: 6, large: 3}}>
                      <Box paddingBlockEnd={{narrow: 24, regular: 'none'}}>
                        <Statistic size="medium" animate="fade-in">
                          <Statistic.Heading size="1">$2M+</Statistic.Heading>
                          <Statistic.Description>Given back to our maintainers</Statistic.Description>
                        </Statistic>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 6, large: 3}}>
                      <Box paddingBlockEnd={{narrow: 24, regular: 'none'}}>
                        <Statistic size="medium" animate="fade-in">
                          <Statistic.Heading size="1">~25%</Statistic.Heading>
                          <Statistic.Description>increase in developer speed with GitHub Copilot</Statistic.Description>
                        </Statistic>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 6, large: 3}}>
                      <Box paddingBlockEnd={{narrow: 24, regular: 'none'}}>
                        <Statistic size="medium" animate="fade-in">
                          <Statistic.Heading size="1">1min</Statistic.Heading>
                          <Statistic.Description>set-up time for largest repo with Codespaces</Statistic.Description>
                        </Statistic>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 6, large: 3}}>
                      <Statistic size="medium" animate="fade-in">
                        <Statistic.Heading size="1">3.5K+</Statistic.Heading>
                        <Statistic.Description>Companies actively sponsoring</Statistic.Description>
                      </Statistic>
                    </Grid.Column>
                  </Grid>
                </Box>
              </Grid.Column>
            </Grid>
          </section>
        </AnimationProvider>
        <div>
          <Box
            backgroundColor={colorMode === 'light' ? 'default' : 'subtle'}
            paddingBlockEnd={112}
            borderRadius="xlarge"
          >
            <Grid>
              <Grid.Column>
                <CTABanner hasBorder={!isLightMode} hasBackground hasShadow={false} className={styles.ctaBanner}>
                  <CTABanner.Heading>Get started</CTABanner.Heading>
                  <CTABanner.Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                    luctus sed turpis felis nam pulvinar risus elementum.
                  </CTABanner.Description>
                  <CTABanner.ButtonGroup>
                    <Button>Primary Action</Button>
                    <Button>Secondary Action</Button>
                  </CTABanner.ButtonGroup>
                </CTABanner>
              </Grid.Column>
            </Grid>
          </Box>
        </div>
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
        <MinimalFooter />
      </div>
    </ThemeProvider>
  )
}
