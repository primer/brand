import {GlobeIcon, HeartIcon, MoonIcon, StackIcon, StarIcon, SunIcon} from '@primer/octicons-react'
import React, {useCallback, useEffect} from 'react'
import {
  AnimationProvider,
  Bento,
  Box,
  Button,
  Card,
  CTABanner,
  Grid,
  Heading,
  Hero,
  Link,
  MinimalFooter,
  SectionIntro,
  Stack,
  SubdomainNavBar,
} from '../../..'

import gitlinesBgDark from '../../../fixtures/images/background-dark-gitlines-blur.png'
import darkPlaceholderImage from '../../../fixtures/images/enterprise-stack.png'

import styles from './SolutionPortal.module.css'

import {ColorModesEnum, ThemeProvider} from '../../../ThemeProvider'

type SolutionPortalProps = {
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

export function SolutionPortal({
  variant,
  gridOverlay = false,
  colorMode = ColorModesEnum.LIGHT,
  ...args
}: SolutionPortalProps) {
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
        backgroundColor: 'var(--brand-color-canvas-default)',
      }}
      {...args}
    >
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
        <ThemeProvider colorMode="dark">
          <Box
            paddingBlockEnd={24}
            className={styles.gitLinesBg}
            style={{
              backgroundImage: `url(${gitlinesBgDark})`,
            }}
          >
            <Grid enableOverlay={enableGridOverlay}>
              <Grid.Column>
                <Hero align="center">
                  {args.heroLabel && <Hero.Label>{args.heroLabel}</Hero.Label>}
                  {args.heroTitle && <Hero.Heading>{args.heroTitle}</Hero.Heading>}
                  {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
                  {args.heroCtaTextPrimary && (
                    <Hero.PrimaryAction href="#">{args.heroCtaTextPrimary}</Hero.PrimaryAction>
                  )}
                  {args.heroCtaTextSecondary && (
                    <Hero.SecondaryAction href="#">{args.heroCtaTextSecondary}</Hero.SecondaryAction>
                  )}
                  {args.heroImage && (
                    <Hero.Image
                      position="inline-end"
                      src="https://via.placeholder.com/300x200/d3d9df/d3d9df.png"
                      alt="placeholder, blank area with an off-white background color"
                    />
                  )}
                </Hero>
              </Grid.Column>
            </Grid>
          </Box>
        </ThemeProvider>
        <section className={styles.verticalOffset}>
          <Box
            backgroundColor="default"
            paddingBlockStart={{narrow: 64, regular: 96}}
            paddingBlockEnd={64}
            borderRadius="xlarge"
            className={styles.noBottomRadius}
          >
            <Grid enableOverlay={enableGridOverlay}>
              <Grid.Column>
                <Box marginBlockEnd={40}>
                  <SectionIntro align="center">
                    <SectionIntro.Heading size="3">{args.sectionIntroText}</SectionIntro.Heading>
                    <SectionIntro.Link href="#">View all</SectionIntro.Link>
                  </SectionIntro>
                </Box>

                <Box
                  marginBlockEnd={{
                    narrow: 16,
                    regular: 16,
                    wide: 48,
                  }}
                >
                  <Grid enableOverlay={enableGridOverlay}>
                    <Grid.Column span={{medium: 4}}>
                      <Box animate="fade-in">
                        <Card href="#" hasBorder fullWidth>
                          <Card.Icon icon={<StackIcon />} color="indigo" hasBackground />
                          <Card.Heading>Teams</Card.Heading>
                          <Card.Description>
                            Build like the best teams on the planet. With CI/CD, Dependabot, and the world&apos;s
                            largest developer community, GitHub gives your team everything they need to ship better
                            software faster.
                          </Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      <Box animate="fade-in">
                        <Card href="#" hasBorder fullWidth>
                          <Card.Icon icon={<StarIcon />} color="indigo" hasBackground />
                          <Card.Heading>Startups</Card.Heading>
                          <Card.Description>
                            GitHub for Startups helps your startup go from idea to IPO on the world&apos;s largest and
                            most advanced developer platform. Eligible startups receive 20 seats of GitHub Enterprise
                            free for 12 months.
                          </Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      <Box animate="fade-in">
                        <Card href="#" hasBorder fullWidth>
                          <Card.Icon icon={<HeartIcon />} color="indigo" hasBackground />
                          <Card.Heading>Non-Profit</Card.Heading>
                          <Card.Description>
                            Empowering the next generation of developers. GitHub Education bridges the gap between
                            coding education and a tech career, and is accessible to everyone globally at no cost.
                          </Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                  </Grid>
                </Box>
                <ThemeProvider colorMode="dark">
                  <Box paddingBlockEnd={128}>
                    <Bento>
                      <Bento.Item
                        rowSpan={5}
                        flow={{
                          xsmall: 'row',
                          small: 'row',
                          medium: 'column',
                          large: 'column',
                          xlarge: 'column',
                          xxlarge: 'column',
                        }}
                      >
                        <Bento.Content leadingVisual={<GlobeIcon />}>
                          <Bento.Heading size="4">
                            The enterprise-ready platform that developers know and love.
                          </Bento.Heading>
                          <Link href="#" size="large">
                            Learn more
                          </Link>
                        </Bento.Content>
                        <Bento.Visual position="50% 100%" padding="normal">
                          <img alt="placeholder, blank area with an gray background color" src={darkPlaceholderImage} />
                        </Bento.Visual>
                      </Bento.Item>
                    </Bento>
                  </Box>
                </ThemeProvider>
              </Grid.Column>
            </Grid>
          </Box>
        </section>
        <section className={styles.verticalOffset}>
          <Box
            backgroundColor="subtle"
            paddingBlockStart={{narrow: 64, regular: 96}}
            paddingBlockEnd={64}
            borderRadius="xlarge"
            className={styles.noBottomRadius}
          >
            <Grid enableOverlay={enableGridOverlay}>
              <Grid.Column>
                <Box marginBlockEnd={40}>
                  <SectionIntro align="center">
                    <SectionIntro.Heading size="3">{args.sectionIntroText}</SectionIntro.Heading>
                    <SectionIntro.Link href="#">View all</SectionIntro.Link>
                  </SectionIntro>
                </Box>
                <Box
                  marginBlockEnd={{
                    narrow: 64,
                    regular: 64,
                    wide: 112,
                  }}
                >
                  <Grid enableOverlay={enableGridOverlay}>
                    <Grid.Column span={{medium: 4}}>
                      <Box animate="fade-in">
                        <Card href="#" fullWidth>
                          <Card.Icon icon={<StackIcon />} color="indigo" hasBackground />
                          <Card.Heading>DevSecOps</Card.Heading>
                          <Card.Description>
                            With comprehensive security tools built into the developer workflow, you can build, secure,
                            and ship all in one place.
                          </Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      <Box animate="fade-in">
                        <Card href="#" fullWidth>
                          <Card.Icon icon={<StarIcon />} color="indigo" hasBackground />
                          <Card.Heading>DevOps</Card.Heading>
                          <Card.Description>
                            Build, scale, and deliver more secure software with GitHub&apos;s unified AI-powered
                            developer platform.
                          </Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      <Box animate="fade-in">
                        <Card href="#" fullWidth>
                          <Card.Icon icon={<HeartIcon />} color="indigo" hasBackground />
                          <Card.Heading>CI/CD</Card.Heading>
                          <Card.Description>
                            Build, test, and deploy software with simple and secure enterprise CI/CD, all on the
                            complete development platform.
                          </Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                  </Grid>
                </Box>
              </Grid.Column>
            </Grid>
          </Box>
        </section>
        <section className={styles.verticalOffset}>
          <Box
            backgroundColor="default"
            paddingBlockStart={{narrow: 64, regular: 96}}
            paddingBlockEnd={64}
            borderRadius="xlarge"
            className={styles.noBottomRadius}
          >
            <Grid enableOverlay={enableGridOverlay}>
              <Grid.Column>
                <Box marginBlockEnd={40}>
                  <SectionIntro align="center">
                    <SectionIntro.Heading>{args.sectionIntroText}</SectionIntro.Heading>
                    <SectionIntro.Link href="#">View all</SectionIntro.Link>
                  </SectionIntro>
                </Box>
                <Box
                  marginBlockEnd={{
                    narrow: 64,
                    regular: 64,
                    wide: 112,
                  }}
                >
                  <Grid enableOverlay={enableGridOverlay}>
                    <Grid.Column span={{medium: 4}}>
                      <Box animate="fade-in">
                        <Card href="#" fullWidth hasBorder>
                          <Card.Icon icon={<StackIcon />} color="indigo" hasBackground />
                          <Card.Heading>DevSecOps</Card.Heading>
                          <Card.Description>
                            With comprehensive security tools built into the developer workflow, you can build, secure,
                            and ship all in one place.
                          </Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      <Box animate="fade-in">
                        <Card href="#" fullWidth hasBorder>
                          <Card.Icon icon={<StarIcon />} color="indigo" hasBackground />
                          <Card.Heading>DevOps</Card.Heading>
                          <Card.Description>
                            Build, scale, and deliver more secure software with GitHub&apos;s unified AI-powered
                            developer platform.
                          </Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      <Box animate="fade-in">
                        <Card href="#" fullWidth hasBorder>
                          <Card.Icon icon={<HeartIcon />} color="indigo" hasBackground />
                          <Card.Heading>CI/CD</Card.Heading>
                          <Card.Description>
                            Build, test, and deploy software with simple and secure enterprise CI/CD, all on the
                            complete development platform.
                          </Card.Description>
                        </Card>
                      </Box>
                    </Grid.Column>
                  </Grid>
                </Box>
                <Stack direction="vertical" padding="none" alignItems="center" gap={64}>
                  <Heading as="h4" size="4">
                    Adopted by the world&apos;s leading organizations
                  </Heading>
                  <Box
                    className={styles.portalCustomerCards}
                    marginBlockEnd={{
                      narrow: 64,
                      regular: 64,
                      wide: 128,
                    }}
                  >
                    <Grid enableOverlay={enableGridOverlay}>
                      <Grid.Column span={{medium: 4}}>
                        <Box>
                          <Card href="#" fullWidth variant="minimal">
                            <Card.Image
                              src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
                              alt="placeholder, blank area with an gray background color"
                              aspectRatio="16:9"
                            />
                            <Card.Heading>
                              3M transforms its software toolchain to bring cutting-edge science to customers, faster.
                            </Card.Heading>
                          </Card>
                        </Box>
                      </Grid.Column>
                      <Grid.Column span={{medium: 4}}>
                        <Box>
                          <Card href="#" fullWidth variant="minimal">
                            <Card.Image
                              src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
                              alt="placeholder, blank area with an gray background color"
                              aspectRatio="16:9"
                            />
                            <Card.Heading>
                              Shopify keeps pushing eCommerce forward with help from GitHub tools.
                            </Card.Heading>
                          </Card>
                        </Box>
                      </Grid.Column>
                      <Grid.Column span={{medium: 4}}>
                        <Box>
                          <Card href="#" fullWidth variant="minimal">
                            <Card.Image
                              src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
                              alt="placeholder, blank area with an gray background color"
                              aspectRatio="16:9"
                            />
                            <Card.Heading>
                              Automotive excellence at Mercedes-Benz is powered by a seamless developer experience on
                              GitHub.
                            </Card.Heading>
                          </Card>
                        </Box>
                      </Grid.Column>
                    </Grid>
                  </Box>
                </Stack>
              </Grid.Column>
            </Grid>
          </Box>
        </section>
        <section className={styles.verticalOffset}>
          <ThemeProvider colorMode="dark">
            <Box
              backgroundColor="default"
              paddingBlockStart={96}
              paddingBlockEnd={112}
              borderRadius="xlarge"
              className={styles.noBottomRadius}
            >
              <Grid>
                <Grid.Column>
                  <CTABanner hasBorder hasShadow={false} align="center" className={styles.ctaBanner}>
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
          </ThemeProvider>
        </section>
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
      </AnimationProvider>
      <ThemeProvider colorMode="dark">
        <MinimalFooter />
      </ThemeProvider>
    </ThemeProvider>
  )
}
