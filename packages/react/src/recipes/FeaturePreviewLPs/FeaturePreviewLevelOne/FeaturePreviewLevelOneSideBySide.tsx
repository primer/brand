import React, {useCallback, useEffect} from 'react'
import {
  Box,
  ColorModesEnum,
  Grid,
  Heading,
  InlineLink,
  Label,
  MinimalFooter,
  Stack,
  SubdomainNavBar,
  Text,
  ThemeProvider,
} from '../../..'

import {Themes, themeDetailsMap} from '../helpers'
import {FormExample} from './components/FormExample'
import enterpriseVideo from '../fixtures/images/other/enterprise.mp4'

import styles from './FeaturePreviewLevelOne.module.css'
import clsx from 'clsx'
import {useWindowSize} from '../../../hooks/useWindowSize'

type FeaturePreviewLevelOneSideBySideProps = {
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  formType?: 'default' | 'extended'
  accentColor: Themes
  heroLabel: string
  heroTitle: string
  heroDescription: string
  isEnterprise: boolean
}

export function FeaturePreviewLevelOneSideBySide({
  accentColor,
  colorMode,
  isEnterprise = false,
  ...args
}: FeaturePreviewLevelOneSideBySideProps) {
  const {isLarge} = useWindowSize()
  const [enableGridOverlay, setEnableGridOverlay] = React.useState(false)
  const [isLightMode, setIsLightMode] = React.useState(colorMode === ColorModesEnum.LIGHT)
  const selectedColorMode = isLightMode ? ColorModesEnum.LIGHT : ColorModesEnum.DARK
  const accentColorValue = themeDetailsMap[accentColor][selectedColorMode].color

  const handleHeroContentVerticalAlignment = useCallback(() => {
    if (!isLarge) return
    const formControlFullnameEl = document.querySelector('#fullname') as HTMLDivElement | null
    const heroContentEl = document.querySelector('#hero-content-inner-sticky') as HTMLDivElement | null

    const distanceFromTop = formControlFullnameEl?.getBoundingClientRect().top as number

    const labelOffset = 28 + 16 // Label height + margin

    if (heroContentEl) {
      heroContentEl.style.top = `${distanceFromTop - labelOffset}px`
      heroContentEl.style.margin = `0px`
      heroContentEl.style.padding = `0px`
    }
  }, [isLarge])

  useEffect(() => {
    setIsLightMode(colorMode === ColorModesEnum.LIGHT)
  }, [colorMode])

  useEffect(() => {
    const mainContent = document.querySelector(`.${styles.FeaturePreview__mainContent}`) as HTMLDivElement | null
    const splitLayout = document.querySelector(`.${styles.FeaturePreview__splitLayout}`) as HTMLDivElement | null

    const handleResize = () => {
      if (mainContent && splitLayout) {
        if (window.innerWidth >= 1012) {
          splitLayout.style.height = `${mainContent.clientHeight}px`
        } else {
          splitLayout.style.height = 'unset'
        }
      }

      if (args.formType === 'default') {
        handleHeroContentVerticalAlignment()
      }
    }

    handleResize() // Set initial height on mount

    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('resize', handleResize) // Update height on window resize

    return () => {
      window.removeEventListener('resize', handleResize) // Remove event listener on unmount
    }
  }, [args.formType, handleHeroContentVerticalAlignment])

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
      <ThemeProvider colorMode="dark">
        <SubdomainNavBar title={`Level 1`}>
          <SubdomainNavBar.PrimaryAction href="#" onClick={handleOverlay}>
            {enableGridOverlay ? 'Disable' : 'Enable'} grid
          </SubdomainNavBar.PrimaryAction>
        </SubdomainNavBar>
      </ThemeProvider>
      <Box
        className={styles.FeaturePreview__splitLayoutBg}
        style={{
          backgroundImage: !isEnterprise
            ? `url(${themeDetailsMap[accentColor][selectedColorMode].images.sideBySideFormBg})`
            : 'none',
        }}
      />
      <Grid
        fullWidth
        enableOverlay={enableGridOverlay}
        className={clsx(
          styles.FeaturePreview__splitLayout,
          isEnterprise && styles.FeaturePreview__splitLayoutEnterprise,
        )}
      >
        <Grid.Column span={{large: 6}} className={styles.FeaturePreview__heroBg}>
          {isEnterprise && (
            <>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video className={styles.FeaturePreview__enterpriseVideo} autoPlay muted>
                <source src={enterpriseVideo} type="video/mp4" />
              </video>
              <div className={styles.FeaturePreview__enterpriseVideoOverlayTop} />
              <div className={styles.FeaturePreview__enterpriseVideoOverlayLeft} />
              <div className={styles.FeaturePreview__enterpriseVideoOverlayRight} />
            </>
          )}
        </Grid.Column>
        <Grid.Column span={{large: 6}} className={styles.FeaturePreview__formContent} />
      </Grid>
      <Box className={styles['FeaturePreview__mainContent']}>
        <Grid enableOverlay={enableGridOverlay} className={styles.FeaturePreview__mainContentGrid}>
          <Grid.Column span={{large: 6}} className={styles.FeaturePreview__hero}>
            <Stack padding="none" justifyContent={{wide: 'flex-end'}}>
              <Box padding={24} className={styles.FeaturePreview__heroContent}>
                <ThemeProvider colorMode="dark" className={styles.FeaturePreview__heroContentInnerSticky}>
                  <Box
                    id="hero-content-inner-sticky"
                    className={styles.FeaturePreview__heroContentInnerStickyContent}
                    paddingBlockStart={{
                      narrow: 80,
                      wide: 'none',
                    }}
                    paddingBlockEnd={{
                      narrow: 80,
                      wide: 'none',
                    }}
                    marginBlockStart={{
                      wide: 128,
                    }}
                  >
                    <Stack
                      direction="vertical"
                      gap={args.formType === 'default' ? 40 : 24}
                      padding="none"
                      alignItems="flex-start"
                    >
                      {args.formType === 'default' && (
                        <>
                          <Stack direction="vertical" padding="none" gap={16} alignItems="flex-start">
                            {args.heroLabel && <Label>{args.heroLabel}</Label>}
                            {args.heroTitle && <Heading size="3">Talk to our sales team</Heading>}
                          </Stack>
                          <Box marginBlockStart={8}>
                            <Stack direction="vertical" gap={8} padding="none">
                              <Heading as="h2" size="subhead-medium">
                                Need customer support?
                              </Heading>
                              <Text as="p">
                                Questions about your existing GitHub Enterprise Installations? <br />
                                <InlineLink href="#">Contact Enterprise Support</InlineLink>
                              </Text>
                            </Stack>
                          </Box>
                          {!isEnterprise && (
                            <Stack direction="vertical" gap={8} padding="none">
                              <Heading as="h2" size="subhead-medium">
                                GitHub mailing address
                              </Heading>
                              <Text as="p">
                                88 Colin P Kelly Jr St
                                <br />
                                San Francisco, CA 94107
                                <br />
                                United States
                              </Text>
                            </Stack>
                          )}
                        </>
                      )}
                      {args.formType === 'extended' && (
                        <>
                          <Stack direction="vertical" padding="none" gap={16} alignItems="flex-start">
                            {args.heroLabel && <Label>{args.heroLabel}</Label>}
                            {args.heroTitle && (
                              <Heading size="3">
                                Set up your <br />
                                Enterprise trial
                              </Heading>
                            )}
                          </Stack>
                          <Text as="p" variant="muted" size="300">
                            Try GitHub Enterprise Cloud free for 30 days.
                          </Text>
                        </>
                      )}
                    </Stack>
                  </Box>
                </ThemeProvider>
              </Box>
            </Stack>
          </Grid.Column>
          <Grid.Column span={{large: 6}} start={{xlarge: 8}}>
            <Box
              padding={24}
              paddingBlockStart={{narrow: 64, regular: 128, wide: 48}}
              paddingBlockEnd={{narrow: 24, regular: 80}}
              marginBlockStart={{
                wide: 128,
              }}
            >
              <FormExample type={args.formType} colorMode={colorMode} />
            </Box>
          </Grid.Column>
        </Grid>
      </Box>
      <MinimalFooter className={styles.FeaturePreview__footer}>
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
