import {LogoGithubIcon, MoonIcon, SunIcon, ZapIcon} from '@primer/octicons-react'
import React, {useCallback, useEffect} from 'react'
import {
  AnimationProvider,
  Box,
  Card,
  Grid,
  Heading,
  Hero,
  Link,
  LogoSuite,
  MinimalFooter,
  Pillar,
  SectionIntro,
  SectionIntroStacked,
  Image,
  SubdomainNavBar,
  Text,
  River,
  Bento,
  Stack,
  Testimonial,
  CTABanner,
  Button,
  FAQ,
  Timeline,
  RiverStoryScroll,
  AnchorNav,
  VideoPlayer,
  Breadcrumbs,
  Statistic,
  PricingOptions,
  BreakoutBanner,
  TextRevealAnimation,
} from '../../..'

import pinterestLogo from '../../../fixtures/images/logos/pinterest.png'
import shopifyLogo from '../../../fixtures/images/logos/shopify.png'
import twilioLogo from '../../../fixtures/images/logos/twilio.png'
import uberLogo from '../../../fixtures/images/logos/uber.png'
import vercelLogo from '../../../fixtures/images/logos/vercel.png'
import lightHeroBg from '../../../fixtures/images/background-light-collaboration.webp'
import darkHeroBg from '../../../fixtures/images/background-dark-collaboration.webp'
import ciCdRenderImage from '../../../fixtures/images/ci-cd-render-ui.png'
import placeholderImage from '../../../fixtures/images/placeholder.png'

import lightNarrowBg from '../../../fixtures/images/light-vertical-banner.png'
import lightWideBg from '../../../fixtures/images/light-horizontal-banner.png'
import darkNarrowBg from '../../../fixtures/images/dark-vertical-banner.png'
import darkWideBg from '../../../fixtures/images/dark-horizontal-banner.png'

import {clsx} from 'clsx'

import styles from './SolutionPage.module.css'
import parallaxStyles from '../parallax.module.css'

import {ColorModesEnum, ThemeProvider} from '../../../ThemeProvider'

type SolutionPageProps = {
  variant: 'size' | 'industry' | 'use-case'
  gridOverlay?: boolean
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK

  heroImage?: boolean
  heroVideo?: boolean
  heroLabel: string
  heroTitle: string
  heroDescription: string
  heroCtaTextPrimary: string
  heroCtaTextSecondary: string

  sectionIntroText?: string
  sectionIntroCTAText?: string

  introVariant: 'pillars' | 'editorial list'

  logoBarVisible?: boolean

  jtbd1Visible?: boolean
  jtbd2Visible?: boolean
  jtbd3Visible?: boolean
  jtbdBentosVisible?: boolean

  testimonialsVisible?: boolean
  pricingOptionsVisible?: boolean
  statisticsVisible?: boolean
  breakoutBannerVisible?: boolean
  customerStoryVisible?: boolean
  riverVisible?: boolean
  faqVisible?: boolean
  breadcrumbsVisible?: boolean

  [key: string]: unknown
}

export function SolutionPage({
  variant,
  gridOverlay = false,
  colorMode = ColorModesEnum.LIGHT,
  ...args
}: SolutionPageProps) {
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
        <section>
          {(variant === 'industry' || variant === 'use-case') && (
            <Box className={styles.hideHorizontalOverflow}>
              <Grid enableOverlay={enableGridOverlay} className={clsx({[styles.heroVideoGlow]: args.heroVideo})}>
                <Grid.Column>
                  <Box marginBlockStart={20}>
                    <Breadcrumbs>
                      <Breadcrumbs.Item href="/">Solutions</Breadcrumbs.Item>
                      <Breadcrumbs.Item href="/copilot">By {variant}</Breadcrumbs.Item>
                    </Breadcrumbs>
                  </Box>
                  <Hero
                    className={clsx(styles.relative)}
                    align={args.heroAlign ? 'center' : 'start'}
                    trailingComponent={args.heroVideo ? HeroVideo : undefined}
                  >
                    {args.heroLabel && <Hero.Label animate>{args.heroLabel}</Hero.Label>}
                    {args.heroTitle && <Hero.Heading>{args.heroTitle}</Hero.Heading>}
                    {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
                    {args.heroCtaTextPrimary && (
                      <Hero.PrimaryAction href="#">{args.heroCtaTextPrimary}</Hero.PrimaryAction>
                    )}
                    {args.heroCtaTextSecondary && (
                      <Hero.SecondaryAction href="#" variant="subtle">
                        {args.heroCtaTextSecondary}
                      </Hero.SecondaryAction>
                    )}
                    {args.heroImage && (
                      <Hero.Image
                        position="block-end"
                        src={ciCdRenderImage}
                        alt="placeholder, blank area with a gray background color"
                      />
                    )}
                  </Hero>
                </Grid.Column>
              </Grid>
            </Box>
          )}
          {variant === 'size' && (
            <header className={parallaxStyles.hero}>
              <div className={parallaxStyles.parallax}>
                <div className={parallaxStyles.background}>
                  <Image
                    className={parallaxStyles.heroImage}
                    animate="fade-in"
                    alt="placeholder image"
                    src={isLightMode ? lightHeroBg : darkHeroBg}
                  />
                  <div className={parallaxStyles.heroImageOverlay}></div>
                </div>
                <Grid enableOverlay={enableGridOverlay} className={parallaxStyles.foreground}>
                  <Grid.Column>
                    <Box marginBlockStart={96}>
                      <Breadcrumbs>
                        <Breadcrumbs.Item href="/">Solutions</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="/copilot">By {variant}</Breadcrumbs.Item>
                      </Breadcrumbs>
                    </Box>
                    <Box className={styles.breadcrumbsOffset}>
                      <Hero
                        className={clsx(styles.relative, parallaxStyles.centeredHero)}
                        align={args.heroAlign ? 'center' : 'start'}
                        trailingComponent={args.heroVideo ? HeroVideo : undefined}
                      >
                        {args.heroLabel && <Hero.Label animate>{args.heroLabel}</Hero.Label>}
                        {args.heroTitle && <Hero.Heading>{args.heroTitle}</Hero.Heading>}
                        {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
                        {args.heroCtaTextPrimary && (
                          <Hero.PrimaryAction href="#">{args.heroCtaTextPrimary}</Hero.PrimaryAction>
                        )}
                        {args.heroCtaTextSecondary && (
                          <Hero.SecondaryAction href="#" variant="subtle">
                            {args.heroCtaTextSecondary}
                          </Hero.SecondaryAction>
                        )}
                        {args.heroImage && (
                          <Hero.Image
                            position="block-end"
                            src={ciCdRenderImage}
                            alt="placeholder, blank area with a gray background color"
                          />
                        )}
                      </Hero>
                    </Box>
                  </Grid.Column>
                </Grid>
              </div>
            </header>
          )}
        </section>
        <div className={clsx(styles.relative, {[parallaxStyles.articleContents]: variant === 'size'})}>
          <Grid>
            <Grid.Column>
              <section>
                <Box
                  paddingBlockStart={variant === 'size' ? {narrow: 64, regular: 96} : undefined}
                  paddingBlockEnd={64}
                >
                  {args.introVariant === 'pillars' && (
                    <>
                      <Grid enableOverlay={enableGridOverlay}>
                        <Grid.Column span={{medium: 8}}>
                          <Box marginBlockEnd={40}>
                            <SectionIntro fullWidth align="start">
                              <SectionIntro.Heading>{args.sectionIntroText}</SectionIntro.Heading>
                            </SectionIntro>
                          </Box>
                        </Grid.Column>
                      </Grid>
                      <Box
                        marginBlockEnd={{
                          narrow: 16,
                          regular: 16,
                          wide: 48,
                        }}
                      >
                        <Grid enableOverlay={enableGridOverlay}>
                          <Grid.Column span={{medium: 4}}>
                            <Box>
                              <PillarExample />
                            </Box>
                          </Grid.Column>
                          <Grid.Column span={{medium: 4}}>
                            <Box>
                              <PillarExample />
                            </Box>
                          </Grid.Column>
                          <Grid.Column span={{medium: 4}}>
                            <Box>
                              <PillarExample />
                            </Box>
                          </Grid.Column>
                        </Grid>
                      </Box>
                    </>
                  )}
                  {args.introVariant === 'editorial list' && (
                    <Box marginBlockEnd={40}>
                      <SectionIntroStacked>
                        <SectionIntroStacked.Heading>{args.sectionIntroText}</SectionIntroStacked.Heading>
                        <SectionIntroStacked.Link href="#">{args.sectionIntroCTAText}</SectionIntroStacked.Link>
                        <SectionIntroStacked.Items>
                          <SectionIntroStacked.Item>
                            <b>Lorem ipsum dolor sit amet,</b> consectetur adipiscing elit. In sapien sit ullamcorper
                            id. Aliquam luctus sed turpis felis nam pulvinar.
                          </SectionIntroStacked.Item>
                          <SectionIntroStacked.Item>
                            <b>Lorem ipsum dolor sit amet,</b> consectetur adipiscing elit. In sapien sit ullamcorper
                            id. Aliquam luctus sed turpis felis nam pulvinar.
                          </SectionIntroStacked.Item>
                          <SectionIntroStacked.Item>
                            <b>Lorem ipsum dolor sit amet,</b> consectetur adipiscing elit. In sapien sit ullamcorper
                            id. Aliquam luctus sed turpis felis nam pulvinar.
                          </SectionIntroStacked.Item>
                        </SectionIntroStacked.Items>
                      </SectionIntroStacked>
                    </Box>
                  )}
                </Box>
              </section>
              {args.logoBarVisible && (
                <AnimationProvider visibilityOptions={0.5}>
                  <Box paddingBlockEnd={80} borderBlockEndWidth={'thin'} borderColor={'muted'} borderStyle={'solid'}>
                    <LogoSuite hasDivider={false} align="justify">
                      <LogoSuite.Logobar>
                        <Box animate="slide-in-right">
                          <Image alt="Uber" src={uberLogo} />
                        </Box>
                        <Box animate="slide-in-right">
                          <Image alt="Vercel" src={vercelLogo} />
                        </Box>
                        <Box animate="slide-in-right">
                          <Image alt="Shopify" src={shopifyLogo} />
                        </Box>
                        <Box animate="slide-in-right">
                          <Image alt="Pinterest" src={pinterestLogo} />
                        </Box>
                        <Box animate="slide-in-right">
                          <Image alt="Twilio" src={twilioLogo} />
                        </Box>
                      </LogoSuite.Logobar>
                    </LogoSuite>
                  </Box>
                </AnimationProvider>
              )}
            </Grid.Column>
          </Grid>
          {variant === 'size' && (
            <div className={styles.verticalOffset}>
              {args.jtbd1Visible && (
                <ThemeProvider colorMode="dark">
                  <Box
                    backgroundColor="default"
                    paddingBlockStart={16}
                    paddingBlockEnd={128}
                    borderRadius="xlarge"
                    className={styles.noBottomRadius}
                  >
                    <Grid>
                      <Grid.Column>
                        <AnchorNav>
                          <AnchorNav.Link href="#section1">Section 1</AnchorNav.Link>
                          {args.jtbd2Visible && <AnchorNav.Link href="#section2">Section 2</AnchorNav.Link>}
                          {args.jtbd3Visible && <AnchorNav.Link href="#section3">Section 3</AnchorNav.Link>}
                          <AnchorNav.Action href="#">Start trial</AnchorNav.Action>
                          <AnchorNav.SecondaryAction href="#">Contact sales</AnchorNav.SecondaryAction>
                        </AnchorNav>
                        <Box marginBlockStart={96} id="section1">
                          <StoryScrollExample align="start" bentoVisible={args.jtbdBentosVisible} />
                        </Box>
                      </Grid.Column>
                    </Grid>
                  </Box>
                </ThemeProvider>
              )}
              {args.jtbd2Visible && (
                <Box
                  className={styles.jtbd2Section}
                  id="section2"
                  backgroundColor="subtle"
                  paddingBlockStart={64}
                  paddingBlockEnd={128}
                  borderRadius="xlarge"
                >
                  <Grid>
                    <Grid.Column>
                      <StoryScrollExample align="end" bentoVisible={args.jtbdBentosVisible} />
                    </Grid.Column>
                  </Grid>
                </Box>
              )}
              {args.jtbd3Visible && (
                <Box
                  id="section3"
                  backgroundColor="default"
                  paddingBlockStart={64}
                  paddingBlockEnd={64}
                  borderRadius="xlarge"
                >
                  <Grid>
                    <Grid.Column>
                      <StoryScrollExample align="start" bentoVisible={args.jtbdBentosVisible} />
                    </Grid.Column>
                  </Grid>
                </Box>
              )}
            </div>
          )}
          <Grid>
            <Grid.Column>
              {args.riverVisible && (
                <Box paddingBlockEnd={64}>
                  <River>
                    <River.Visual>
                      <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
                    </River.Visual>
                    <River.Content trailingComponent={variant === 'use-case' ? TimelineExample : undefined}>
                      <Heading>Heading</Heading>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </Text>
                      <Link href="#" variant={variant === 'industry' ? 'accent' : 'default'}>
                        Call to action
                      </Link>
                    </River.Content>
                  </River>
                  <River>
                    <River.Visual>
                      <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
                    </River.Visual>
                    <River.Content trailingComponent={variant === 'use-case' ? TimelineExample : undefined}>
                      <Heading>Heading</Heading>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </Text>
                      <Link href="#" variant={variant === 'industry' ? 'accent' : 'default'}>
                        Call to action
                      </Link>
                    </River.Content>
                  </River>
                  <River>
                    <River.Visual>
                      <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
                    </River.Visual>
                    <River.Content trailingComponent={variant === 'use-case' ? TimelineExample : undefined}>
                      <Heading>Heading</Heading>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </Text>
                      <Link href="#" variant={variant === 'industry' ? 'accent' : 'default'}>
                        Call to action
                      </Link>
                    </River.Content>
                  </River>
                </Box>
              )}

              {args.customerStoryVisible && (
                <Box paddingBlockStart={64} paddingBlockEnd={128}>
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
                      <Bento.Content>
                        <Bento.Heading size="4">
                          <b>This is my super-sweet</b> bento heading
                        </Bento.Heading>
                        <Link href="#">Read customer story</Link>
                      </Bento.Content>
                      <Bento.Visual position="50% 100%" padding="normal">
                        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
                      </Bento.Visual>
                    </Bento.Item>
                  </Bento>
                </Box>
              )}
              {args.statisticsVisible && (
                <Box paddingBlockEnd={{narrow: 48, regular: 128}}>
                  <Stack
                    direction={{narrow: 'vertical', regular: 'horizontal'}}
                    padding="none"
                    gap={48}
                    justifyContent="space-between"
                  >
                    <Statistic variant="boxed">
                      <Statistic.Heading>$2M+</Statistic.Heading>
                      <Statistic.Description variant="accent">Given back to our maintainers</Statistic.Description>
                    </Statistic>
                    <Statistic variant="boxed">
                      <Statistic.Heading>30K+</Statistic.Heading>
                      <Statistic.Description variant="accent">Sponsored maintainers and projects</Statistic.Description>
                    </Statistic>
                    <Statistic variant="boxed">
                      <Statistic.Heading>3.5K+</Statistic.Heading>
                      <Statistic.Description variant="accent">Companies actively sponsoring</Statistic.Description>
                    </Statistic>
                  </Stack>
                </Box>
              )}
              {args.breakoutBannerVisible && variant === 'use-case' && (
                <Box marginBlockEnd={{narrow: 48, regular: 128}}>
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
              )}
              {variant === 'size' && (
                <Box paddingBlockStart={64} paddingBlockEnd={128}>
                  <Stack direction="vertical" gap={64} alignItems="center" padding="none">
                    <Heading as="h4">You&apos;re in good company</Heading>
                    <Grid className={styles.cards}>
                      <Grid.Column span={{xsmall: 12, medium: 4}}>
                        <Card href="https://github.com" variant="minimal" fullWidth>
                          <Card.Image
                            src={placeholderImage}
                            alt="placeholder, blank area with an gray background color"
                            aspectRatio="16:9"
                          />
                          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                          <Card.Description>
                            Everything you need to know about getting started with GitHub Actions.
                          </Card.Description>
                        </Card>
                      </Grid.Column>
                      <Grid.Column span={{xsmall: 12, medium: 4}}>
                        <Card href="https://github.com" variant="minimal" fullWidth>
                          <Card.Image
                            src={placeholderImage}
                            alt="placeholder, blank area with an gray background color"
                            aspectRatio="16:9"
                          />
                          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                          <Card.Description>
                            Everything you need to know about getting started with GitHub Actions.
                          </Card.Description>
                        </Card>
                      </Grid.Column>
                      <Grid.Column span={{xsmall: 12, medium: 4}}>
                        <Card href="https://github.com" variant="minimal" fullWidth>
                          <Card.Image
                            src={placeholderImage}
                            alt="placeholder, blank area with an gray background color"
                            aspectRatio="16:9"
                          />
                          <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                          <Card.Description>
                            Everything you need to know about getting started with GitHub Actions.
                          </Card.Description>
                        </Card>
                      </Grid.Column>
                    </Grid>
                  </Stack>
                </Box>
              )}
            </Grid.Column>
          </Grid>
          <div className={styles.verticalOffset}>
            <ThemeProvider colorMode="dark">
              <Box
                backgroundColor="default"
                paddingBlockStart={128}
                paddingBlockEnd={112}
                borderRadius="xlarge"
                className={styles.noBottomRadius}
              >
                <Grid>
                  <Grid.Column>
                    <Stack direction="vertical" padding="none" gap={{narrow: 64, regular: 112}}>
                      {args.testimonialsVisible && (
                        <Grid>
                          <Grid.Column span={{medium: 10}} start={{medium: 2}}>
                            <Box animate="fade-in">
                              <Testimonial size="large" quoteMarkColor="green">
                                <Testimonial.Quote>
                                  <TextRevealAnimation>
                                    GitHub helps us ensure that we have our security controls baked into our pipelines
                                    all the way from the first line of code we&apos;re writing.
                                  </TextRevealAnimation>
                                </Testimonial.Quote>
                                <Testimonial.Name position="Staff Software Engineer">David Ross</Testimonial.Name>
                              </Testimonial>
                            </Box>
                          </Grid.Column>
                        </Grid>
                      )}
                      {variant === 'size' && args.pricingOptionsVisible && (
                        <PricingOptions variant="cards">
                          <PricingOptions.Item>
                            <PricingOptions.Heading>Lorem ipsum</PricingOptions.Heading>
                            <PricingOptions.Description>Lorem ipsum dolor sit amet</PricingOptions.Description>
                            <PricingOptions.Price currencySymbol="$" originalPrice="20" trailingText="per user / month">
                              10
                            </PricingOptions.Price>
                            <PricingOptions.FeatureList>
                              <PricingOptions.FeatureListItem>Item included</PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem>Item included</PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem>Item included</PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem variant="excluded">
                                Item not included
                              </PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem variant="excluded">
                                Item not included
                              </PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem variant="excluded">
                                Item not included
                              </PricingOptions.FeatureListItem>
                            </PricingOptions.FeatureList>
                            <PricingOptions.SecondaryAction as="a" href="/contact">
                              Contact sales
                            </PricingOptions.SecondaryAction>
                          </PricingOptions.Item>

                          <PricingOptions.Item>
                            <PricingOptions.Label>Recommended</PricingOptions.Label>
                            <PricingOptions.Heading>Lorem ipsum</PricingOptions.Heading>
                            <PricingOptions.Description>Lorem ipsum dolor sit amet</PricingOptions.Description>
                            <PricingOptions.Price currencySymbol="$" trailingText="per user / month" originalPrice="49">
                              39
                            </PricingOptions.Price>
                            <PricingOptions.FeatureList>
                              <PricingOptions.FeatureListItem>Item included</PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem>Item included</PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem>Item included</PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem>Item included</PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem>Item included</PricingOptions.FeatureListItem>
                              <PricingOptions.FeatureListItem>Item included</PricingOptions.FeatureListItem>
                            </PricingOptions.FeatureList>
                            <PricingOptions.PrimaryAction as="a" href="/buy">
                              Primary action
                            </PricingOptions.PrimaryAction>
                          </PricingOptions.Item>
                        </PricingOptions>
                      )}
                      {variant !== 'size' && args.pricingOptionsVisible && (
                        <CTABanner hasBorder hasShadow={false} className={styles.ctaBanner} align="center">
                          <CTABanner.Heading>Get started</CTABanner.Heading>
                          <CTABanner.Description>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                            Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                          </CTABanner.Description>
                          <CTABanner.ButtonGroup>
                            <Button>Primary Action</Button>
                            <Button>Secondary Action</Button>
                          </CTABanner.ButtonGroup>
                        </CTABanner>
                      )}
                      <Box>
                        <Stack direction="vertical" padding="none" gap={64} alignItems="center">
                          <Heading as="h3" size="3">
                            Go further with these
                          </Heading>
                          <Grid>
                            <Grid.Column span={{medium: 4}}>
                              <Card href="#" variant="torchlight">
                                <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                                <Card.Description>
                                  Everything you need to know about getting started with GitHub Actions.
                                </Card.Description>
                              </Card>
                            </Grid.Column>
                            <Grid.Column span={{medium: 4}}>
                              <Card href="#" variant="torchlight">
                                <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                                <Card.Description>
                                  Everything you need to know about getting started with GitHub Actions.
                                </Card.Description>
                              </Card>
                            </Grid.Column>
                            <Grid.Column span={{medium: 4}}>
                              <Card href="#" variant="torchlight">
                                <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                                <Card.Description>
                                  Everything you need to know about getting started with GitHub Actions.
                                </Card.Description>
                              </Card>
                            </Grid.Column>
                          </Grid>
                        </Stack>
                      </Box>
                      {args.faqVisible && (
                        <Box>
                          <FAQ>
                            <FAQ.Heading>Frequently asked questions</FAQ.Heading>
                            <FAQ.Item>
                              <FAQ.Question>What is this feature?</FAQ.Question>
                              <FAQ.Answer>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                                  Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                </p>
                              </FAQ.Answer>
                            </FAQ.Item>
                            <FAQ.Item>
                              <FAQ.Question>When is it release planned?</FAQ.Question>
                              <FAQ.Answer>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                                  Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                </p>
                              </FAQ.Answer>
                            </FAQ.Item>
                            <FAQ.Item>
                              <FAQ.Question>Where is it available?</FAQ.Question>
                              <FAQ.Answer>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                                  Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                </p>
                              </FAQ.Answer>
                            </FAQ.Item>
                            <FAQ.Item>
                              <FAQ.Question>Who is it for?</FAQ.Question>
                              <FAQ.Answer>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                                  Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                </p>
                              </FAQ.Answer>
                            </FAQ.Item>
                            <FAQ.Item>
                              <FAQ.Question>What can I expect?</FAQ.Question>
                              <FAQ.Answer>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                                  Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                </p>
                              </FAQ.Answer>
                            </FAQ.Item>
                            <FAQ.Item>
                              <FAQ.Question>What&apos;s the difference between this & that?</FAQ.Question>
                              <FAQ.Answer>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                                  Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                </p>
                              </FAQ.Answer>
                            </FAQ.Item>
                            <FAQ.Item>
                              <FAQ.Question>Is this free?</FAQ.Question>
                              <FAQ.Answer>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                                  Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                </p>
                              </FAQ.Answer>
                            </FAQ.Item>
                            <FAQ.Item>
                              <FAQ.Question>Is this release invite-only?</FAQ.Question>
                              <FAQ.Answer>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                                  Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                                </p>
                              </FAQ.Answer>
                            </FAQ.Item>
                          </FAQ>
                        </Box>
                      )}
                    </Stack>
                  </Grid.Column>
                </Grid>
              </Box>
            </ThemeProvider>
          </div>
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

function TimelineExample() {
  return (
    <Timeline>
      <Timeline.Item>Increase developer velocity</Timeline.Item>
      <Timeline.Item>Faster feedback loops</Timeline.Item>
      <Timeline.Item>Secure every build</Timeline.Item>
    </Timeline>
  )
}

function PillarExample() {
  return (
    <Pillar>
      <Pillar.Icon color="green" icon={<ZapIcon />} />
      <Pillar.Heading>Here is a core value proposition of this new feature on one or two lines</Pillar.Heading>
      <Pillar.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id aliquam luctus sed turpis.
      </Pillar.Description>
    </Pillar>
  )
}

function StoryScrollExample({align, bentoVisible}) {
  const [collapsedMode] = React.useState(false)

  return (
    <section>
      <SectionIntro align="center">
        <SectionIntro.Label>Label</SectionIntro.Label>
        <SectionIntro.Heading size="2" className={styles.topOfStack}>
          Lorem ipsum of all sizes dolor sit amet
        </SectionIntro.Heading>
      </SectionIntro>

      <RiverStoryScroll align={align} disabled={collapsedMode}>
        <River align={align}>
          <River.Visual>
            <img
              src="https://placehold.co/600x400/FF5733/ffffff?text=1"
              alt="placeholder, blank area with a gray background color"
            />
          </River.Visual>
          <River.Content trailingComponent={TimelineExample}>
            <Heading>Build fast, stay secure</Heading>
            <Text>
              Easy-to-set-up and simple-to-maintain CI/CD that helps your developers build more secure code from the
              start without sacrificing speed.
            </Text>
            <Link href="#">Explore GitHub Advanced Security</Link>
          </River.Content>
        </River>
        <River align={align}>
          <River.Visual>
            <img
              src="https://placehold.co/600x400/AF7AC5/ffffff?text=2"
              alt="placeholder, blank area with a gray background color"
            />
          </River.Visual>
          <River.Content trailingComponent={TimelineExample}>
            <Heading>Build fast, stay secure</Heading>
            <Text>
              Easy-to-set-up and simple-to-maintain CI/CD that helps your developers build more secure code from the
              start without sacrificing speed.
            </Text>
            <Link href="#">Explore GitHub Advanced Security</Link>
          </River.Content>
        </River>
        <River align={align}>
          <River.Visual>
            <img
              src="https://placehold.co/600x400/FFC300/ffffff?text=3"
              alt="placeholder, blank area with a gray background color"
            />
          </River.Visual>
          <River.Content trailingComponent={TimelineExample}>
            <Heading>Build fast, stay secure</Heading>
            <Text>
              Easy-to-set-up and simple-to-maintain CI/CD that helps your developers build more secure code from the
              start without sacrificing speed.
            </Text>
            <Link href="#">Explore GitHub Advanced Security</Link>
          </River.Content>
        </River>
      </RiverStoryScroll>
      {bentoVisible && (
        <ThemeProvider colorMode="dark">
          <Box paddingBlockStart={{narrow: 'none', regular: 128}} paddingBlockEnd={{narrow: 'none', regular: 24}}>
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
                <Bento.Content padding={{xsmall: 'condensed', medium: 'spacious'}}>
                  <Bento.Heading size="3">
                    How the healthcare giant Doctolib drove digital improved efficiency by more than 80%
                  </Bento.Heading>
                  <Link href="#">Call to action</Link>
                </Bento.Content>
                <Bento.Visual position="50% 100%" padding="normal">
                  <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
                </Bento.Visual>
              </Bento.Item>
            </Bento>
          </Box>
        </ThemeProvider>
      )}
    </section>
  )
}

function HeroVideo() {
  return (
    <AnimationProvider staggerDelayIncrement={1000} runOnce visibilityOptions={0.2}>
      <Box marginBlockStart={32} animate="scale-in-up">
        <VideoPlayer visuallyHiddenTitle title="GitHub media player">
          <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
          <VideoPlayer.Track src="./example.vtt" default />
        </VideoPlayer>
      </Box>
    </AnimationProvider>
  )
}
