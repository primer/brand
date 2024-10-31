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
  Image,
  Link,
  MinimalFooter,
  SectionIntro,
  Stack,
  SubdomainNavBar,
} from '../../..'
import {Icon} from '../../../Icon'

import darkHeroBg from '../../../fixtures/images/background-dark-collaboration.webp'
import darkPlaceholderImage from '../../../fixtures/images/enterprise-stack.png'
import placeholderImage from '../../../fixtures/images/placeholder-600x400.png'

import styles from './SolutionsOverview.module.css'
import parallaxStyles from '../parallax.module.css'

import {ColorModesEnum, ThemeProvider} from '../../../ThemeProvider'

type SolutionsOverviewProps = {
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

export function SolutionsOverview({
  variant,
  gridOverlay = false,
  colorMode = ColorModesEnum.LIGHT,
  ...args
}: SolutionsOverviewProps) {
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
      <ThemeProvider colorMode="dark">
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
      </ThemeProvider>
      <AnimationProvider runOnce visibilityOptions={0.2}>
        <ThemeProvider colorMode="dark">
          <section>
            <header className={parallaxStyles.hero}>
              <Box className={parallaxStyles.parallax} paddingBlockStart={{regular: 48}}>
                <div className={parallaxStyles.background}>
                  <Image
                    className={parallaxStyles.heroImage}
                    animate="fade-in"
                    alt="placeholder image"
                    src={darkHeroBg}
                  />
                  <div className={parallaxStyles.heroImageOverlay}></div>
                </div>
                <Grid enableOverlay={enableGridOverlay} className={parallaxStyles.foreground}>
                  <Grid.Column>
                    <Hero align={args.heroAlign ? 'center' : 'start'}>
                      {args.heroLabel && <Hero.Label>{args.heroLabel}</Hero.Label>}
                      {args.heroTitle && <Hero.Heading>{args.heroTitle}</Hero.Heading>}
                      {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
                      {args.heroCtaTextPrimary && (
                        <Hero.PrimaryAction href="#">{args.heroCtaTextPrimary}</Hero.PrimaryAction>
                      )}
                      {args.heroCtaTextSecondary && (
                        <Hero.SecondaryAction href="#">{args.heroCtaTextSecondary}</Hero.SecondaryAction>
                      )}
                    </Hero>
                  </Grid.Column>
                </Grid>
              </Box>
            </header>
          </section>
        </ThemeProvider>
        <div className={parallaxStyles.articleContents}>
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
                      narrow: 32,
                      regular: 32,
                      wide: 48,
                    }}
                  >
                    <Grid enableOverlay={enableGridOverlay}>
                      <Grid.Column span={{large: 4}}>
                        <Box animate="fade-in" className={styles.fullHeight}>
                          <Card href="#" hasBorder fullWidth>
                            <Card.Icon icon={StackIcon} color="indigo" hasBackground />
                            <Card.Heading>Teams</Card.Heading>
                            <Card.Description>
                              Build like the best teams on the planet. With CI/CD, Dependabot, and the world&apos;s
                              largest developer community, GitHub gives your team everything they need to ship better
                              software faster.
                            </Card.Description>
                          </Card>
                        </Box>
                      </Grid.Column>
                      <Grid.Column span={{large: 4}}>
                        <Box animate="fade-in" className={styles.fullHeight}>
                          <Card href="#" hasBorder fullWidth>
                            <Card.Icon icon={StarIcon} color="indigo" hasBackground />
                            <Card.Heading>Startups</Card.Heading>
                            <Card.Description>
                              GitHub for Startups helps your startup go from idea to IPO on the world&apos;s largest and
                              most advanced developer platform. Eligible startups receive 20 seats of GitHub Enterprise
                              free for 12 months.
                            </Card.Description>
                          </Card>
                        </Box>
                      </Grid.Column>
                      <Grid.Column span={{large: 4}}>
                        <Box animate="fade-in" className={styles.fullHeight}>
                          <Card href="#" hasBorder fullWidth>
                            <Card.Icon icon={HeartIcon} color="indigo" hasBackground />
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
                          flow={{
                            xsmall: 'row',
                            small: 'column',
                            medium: 'column',
                            large: 'column',
                            xlarge: 'column',
                            xxlarge: 'column',
                          }}
                          rowSpan={4}
                        >
                          <Bento.Content
                            padding={{
                              xsmall: 'normal',
                              medium: 'spacious',
                            }}
                            leadingVisual={<Icon icon={GlobeIcon} />}
                          >
                            <Bento.Heading size="4">
                              The enterprise-ready platform that developers know and love.
                            </Bento.Heading>
                            <Link href="#" size="large">
                              Learn more
                            </Link>
                          </Bento.Content>
                          <Bento.Visual position="50% 100%" padding="normal">
                            <img
                              alt="placeholder, blank area with an gray background color"
                              src={darkPlaceholderImage}
                            />
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
                        <Box animate="fade-in" className={styles.fullHeight}>
                          <Card href="#" fullWidth>
                            <Card.Icon icon={StackIcon} color="indigo" hasBackground />
                            <Card.Heading>DevSecOps</Card.Heading>
                            <Card.Description>
                              With comprehensive security tools built into the developer workflow, you can build,
                              secure, and ship all in one place.
                            </Card.Description>
                          </Card>
                        </Box>
                      </Grid.Column>
                      <Grid.Column span={{medium: 4}}>
                        <Box animate="fade-in" className={styles.fullHeight}>
                          <Card href="#" fullWidth>
                            <Card.Icon icon={StarIcon} color="indigo" hasBackground />
                            <Card.Heading>DevOps</Card.Heading>
                            <Card.Description>
                              Build, scale, and deliver more secure software with GitHub&apos;s unified AI-powered
                              developer platform.
                            </Card.Description>
                          </Card>
                        </Box>
                      </Grid.Column>
                      <Grid.Column span={{medium: 4}}>
                        <Box animate="fade-in" className={styles.fullHeight}>
                          <Card href="#" fullWidth>
                            <Card.Icon icon={HeartIcon} color="indigo" hasBackground />
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
                        <Box animate="fade-in" className={styles.fullHeight}>
                          <Card href="#" fullWidth hasBorder>
                            <Card.Icon icon={StackIcon} color="indigo" hasBackground />
                            <Card.Heading>DevSecOps</Card.Heading>
                            <Card.Description>
                              With comprehensive security tools built into the developer workflow, you can build,
                              secure, and ship all in one place.
                            </Card.Description>
                          </Card>
                        </Box>
                      </Grid.Column>
                      <Grid.Column span={{medium: 4}}>
                        <Box animate="fade-in" className={styles.fullHeight}>
                          <Card href="#" fullWidth hasBorder>
                            <Card.Icon icon={StarIcon} color="indigo" hasBackground />
                            <Card.Heading>DevOps</Card.Heading>
                            <Card.Description>
                              Build, scale, and deliver more secure software with GitHub&apos;s unified AI-powered
                              developer platform.
                            </Card.Description>
                          </Card>
                        </Box>
                      </Grid.Column>
                      <Grid.Column span={{medium: 4}}>
                        <Box animate="fade-in" className={styles.fullHeight}>
                          <Card href="#" fullWidth hasBorder>
                            <Card.Icon icon={HeartIcon} color="indigo" hasBackground />
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
                      <Grid className={styles.customerCards} enableOverlay={enableGridOverlay}>
                        <Grid.Column span={{medium: 4}}>
                          <Box>
                            <Card href="#" fullWidth variant="minimal">
                              <Card.Image
                                src={placeholderImage}
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
                                src={placeholderImage}
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
                                src={placeholderImage}
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
                paddingBlockStart={{narrow: 64, regular: 96}}
                paddingBlockEnd={{narrow: 64, regular: 112}}
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
      </AnimationProvider>
      <ThemeProvider colorMode="dark">
        <MinimalFooter />
      </ThemeProvider>
    </ThemeProvider>
  )
}
