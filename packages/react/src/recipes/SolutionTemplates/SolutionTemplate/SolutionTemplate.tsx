import {MoonIcon, SunIcon, ZapIcon} from '@primer/octicons-react'
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
  Prose,
  Timeline,
  RiverStoryScroll,
  FormControl,
  Checkbox,
  AnchorNav,
  PricingOptions,
} from '../../..'

import pinterestLogo from '../../../fixtures/images/logos/pinterest.png'
import shopifyLogo from '../../../fixtures/images/logos/shopify.png'
import twilioLogo from '../../../fixtures/images/logos/twilio.png'
import uberLogo from '../../../fixtures/images/logos/uber.png'
import vercelLogo from '../../../fixtures/images/logos/vercel.png'

import styles from './SolutionTemplate.module.css'

import {ColorModesEnum, ThemeProvider} from '../../../ThemeProvider'

type SolutionTemplateProps = {
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

export function SolutionTemplate({
  variant,
  gridOverlay = false,
  colorMode = ColorModesEnum.LIGHT,
  ...args
}: SolutionTemplateProps) {
  console.log('args', args)
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
        <Box backgroundColor="subtle" paddingBlockEnd={24}>
          <Grid enableOverlay={enableGridOverlay}>
            <Grid.Column span={{medium: args.heroImage ? 12 : 8}}>
              <Box marginBlockStart={20}>
                <Link href="#" arrowDirection="start">
                  Back
                </Link>
              </Box>
              <Hero>
                {args.heroLabel && <Hero.Label>{args.heroLabel}</Hero.Label>}
                {args.heroTitle && <Hero.Heading fullWidth>{args.heroTitle}</Hero.Heading>}
                {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
                {args.heroCtaTextPrimary && <Hero.PrimaryAction href="#">{args.heroCtaTextPrimary}</Hero.PrimaryAction>}
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
        <Grid>
          <Grid.Column>
            <section>
              {args.introVariant === 'pillars' && (
                <>
                  <Grid enableOverlay={enableGridOverlay}>
                    <Grid.Column span={{medium: 8}}>
                      <Box paddingBlockStart={{narrow: 64, regular: 128}} marginBlockEnd={40}>
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
              {(args.introVariant === 'editorial prose' || args.introVariant === 'editorial list') && (
                <Box paddingBlockStart={{narrow: 64, regular: 128}} marginBlockEnd={40}>
                  <Grid>
                    <Grid.Column span={{medium: 5}}>
                      <Box className={styles.sectionIntro}>
                        <Box marginBlockEnd={24}>
                          <Heading as="h2" size="3">
                            {args.sectionIntroText}
                          </Heading>
                        </Box>

                        <Link>{args.sectionIntroCTAText}</Link>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{medium: 6}} start={{medium: 7}}>
                      {args.introVariant === 'editorial prose' && (
                        // eslint-disable-next-line github/unescaped-html-literal
                        <Prose html="<p>CI/CD automates many of the tasks involved in getting code from developers to production, such as building, testing, and deploying. This can significantly speed up the software delivery process, allowing enterprises to release new features and bug fixes more quickly. By having a common pipeline for building, testing, and deploying code, all teams can work together more effectively. This helps to ensure that higher quality software is released to production.</p><p>In short, an optimal CI/CD pipeline can help enterprises deliver high quality software faster and more cheaply. It can also improve developer productivity and collaboration, while reducing risks.</p>" />
                      )}
                      {args.introVariant === 'editorial list' && (
                        <Stack direction="vertical" padding="none" gap={24}>
                          <Text as="p" variant="muted">
                            <Text variant="default">Lorem ipsum dolor sit amet,</Text> consectetur adipiscing elit. In
                            sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar.
                          </Text>
                          <Text as="p" variant="muted">
                            <Text variant="default">Lorem ipsum dolor sit amet,</Text> consectetur adipiscing elit. In
                            sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar.
                          </Text>
                          <Text as="p" variant="muted">
                            <Text variant="default">Lorem ipsum dolor sit amet,</Text> consectetur adipiscing elit. In
                            sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar.
                          </Text>
                        </Stack>
                      )}
                    </Grid.Column>
                  </Grid>
                </Box>
              )}
            </section>
            {args.logoBarVisible && (
              <Box
                marginBlockStart={96}
                paddingBlockStart={64}
                paddingBlockEnd={80}
                borderBlockStartWidth={variant === 'industry' ? 'thin' : undefined}
                borderBlockEndWidth={variant === 'use-case' ? 'thin' : undefined}
                borderColor={variant === 'industry' || variant === 'use-case' ? 'muted' : undefined}
                borderStyle={variant === 'industry' || variant === 'use-case' ? 'solid' : undefined}
              >
                <LogoSuite hasDivider={false}>
                  <LogoSuite.Logobar>
                    <Image alt="Uber" src={uberLogo} />
                    <Image alt="Vercel" src={vercelLogo} />
                    <Image alt="Shopify" src={shopifyLogo} />
                    <Image alt="Pinterest" src={pinterestLogo} />
                    <Image alt="Twilio" src={twilioLogo} />
                  </LogoSuite.Logobar>
                </LogoSuite>
              </Box>
            )}
          </Grid.Column>
        </Grid>
        {variant === 'size' && (
          <div className={styles.verticalOffset}>
            {args.jtbd1Visible && (
              <ThemeProvider colorMode="dark">
                <Box backgroundColor="default" paddingBlockStart={16} paddingBlockEnd={64} borderRadius="xlarge">
                  <Grid>
                    <Grid.Column>
                      <AnchorNav>
                        <AnchorNav.Link href="#basic-section1">Section one</AnchorNav.Link>
                        <AnchorNav.Link href="#basic-section2">Section two</AnchorNav.Link>
                        <AnchorNav.Link href="#basic-section3">Section three</AnchorNav.Link>
                        <AnchorNav.Link href="#basic-section4">Section four</AnchorNav.Link>
                        <AnchorNav.Link href="#basic-section5">Section five</AnchorNav.Link>
                        <AnchorNav.Action href="#">Sign up</AnchorNav.Action>
                      </AnchorNav>
                      <Box marginBlockStart={96}>
                        <StoryScrollExample align="start" bentoVisible={args.jtbdBentosVisible} />
                      </Box>
                    </Grid.Column>
                  </Grid>
                </Box>
              </ThemeProvider>
            )}
            {args.jtbd2Visible && (
              <Box backgroundColor="subtle" paddingBlockStart={64} paddingBlockEnd={64} borderRadius="xlarge">
                <Grid>
                  <Grid.Column>
                    <StoryScrollExample align="end" bentoVisible={args.jtbdBentosVisible} />
                  </Grid.Column>
                </Grid>
              </Box>
            )}
            {args.jtbd3Visible && (
              <Box backgroundColor="default" paddingBlockStart={64} paddingBlockEnd={64} borderRadius="xlarge">
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
              <River>
                <River.Visual>
                  <img
                    src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
                    alt="placeholder, blank area with an off-white background color"
                  />
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
            )}

            {args.riverVisible && (
              <>
                <River align="end">
                  <River.Visual>
                    <img
                      src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
                      alt="placeholder, blank area with an off-white background color"
                    />
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
                    <img
                      src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
                      alt="placeholder, blank area with an off-white background color"
                    />
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
              </>
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
                      <Bento.Heading size="3">
                        <em>This is my super-sweet</em> bento heading
                      </Bento.Heading>
                      <Link href="#">Call to action</Link>
                    </Bento.Content>
                    <Bento.Visual position="50% 100%">
                      <img
                        alt="placeholder, blank area with an gray background color"
                        src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
                      />
                    </Bento.Visual>
                  </Bento.Item>
                </Bento>
              </Box>
            )}
            {args.statisticsVisible && (
              <Box paddingBlockStart={64} paddingBlockEnd={128}>
                <Stack
                  direction={{narrow: 'vertical', regular: 'horizontal'}}
                  padding="none"
                  gap={48}
                  justifyContent="space-evenly"
                >
                  <BoxedStatisticExample heading="$2M+" description="Given back to our maintainers" />
                  <BoxedStatisticExample heading="30K+" description="Sponsored maintainers and projects" />
                  <BoxedStatisticExample heading="3.5K+" description="Companies actively sponsoring" />
                </Stack>
              </Box>
            )}
            {variant === 'size' && (
              <Box paddingBlockStart={64} paddingBlockEnd={128}>
                <Stack direction="vertical" gap={64} alignItems="center" padding="none">
                  <Heading as="h4">You’re in good company</Heading>
                  <Grid>
                    <Grid.Column span={{xsmall: 12, medium: 4}}>
                      <Card href="https://github.com" variant="minimal" fullWidth>
                        <Card.Image
                          src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
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
                          src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
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
                          src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
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
            <Box backgroundColor="default" paddingBlockStart={128} paddingBlockEnd={112} borderRadius="xlarge">
              <Grid>
                <Grid.Column>
                  <Stack direction="vertical" padding="none" gap={{narrow: 64, regular: 112}}>
                    {args.testimonialsVisible && (
                      <Grid>
                        <Grid.Column span={{medium: 10}} start={{medium: 2}}>
                          <Testimonial size="large">
                            <Testimonial.Quote>
                              GitHub helps us ensure that we have our security controls baked into our pipelines all the
                              way from the first line of code we&apos;re writing.
                            </Testimonial.Quote>
                            <Testimonial.Name position="Staff Software Engineer">David Ross</Testimonial.Name>
                          </Testimonial>
                        </Grid.Column>
                      </Grid>
                    )}
                    {variant === 'industry' || variant === 'use-case' ? (
                      <CTABanner hasBorder hasShadow={false}>
                        <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
                        <CTABanner.Description>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                          luctus sed turpis felis nam pulvinar risus elementum.
                        </CTABanner.Description>
                        <CTABanner.ButtonGroup>
                          <Button>Primary Action</Button>
                          <Button>Secondary Action</Button>
                        </CTABanner.ButtonGroup>
                      </CTABanner>
                    ) : (
                      <PricingOptions variant="cards">
                        <PricingOptions.Item>
                          <PricingOptions.Label>Recommended</PricingOptions.Label>
                          <PricingOptions.Heading>FREE</PricingOptions.Heading>
                          <PricingOptions.Description>Copilot in the coding environment.</PricingOptions.Description>
                          <PricingOptions.Price currencySymbol="$" trailingText="per month / $100 per year">
                            10
                          </PricingOptions.Price>
                          <PricingOptions.FeatureList>
                            <PricingOptions.FeatureListItem>
                              Everything in Copilot Business plus:
                            </PricingOptions.FeatureListItem>
                            <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
                            <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
                            <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
                          </PricingOptions.FeatureList>
                          <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
                          <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
                        </PricingOptions.Item>

                        <PricingOptions.Item>
                          <PricingOptions.Label>Recommended</PricingOptions.Label>
                          <PricingOptions.Heading>GitHub for teams</PricingOptions.Heading>
                          <PricingOptions.Description>
                            Copilot personalized to your organization throughout the software development lifecycle.
                            Requires GitHub Enterprise Cloud.
                          </PricingOptions.Description>
                          <PricingOptions.Price currencySymbol="$" trailingText="per user / month">
                            39
                          </PricingOptions.Price>
                          <PricingOptions.FeatureList>
                            <PricingOptions.FeatureListItem>
                              Everything in Copilot Business plus:
                            </PricingOptions.FeatureListItem>
                            <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
                            <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
                            <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
                          </PricingOptions.FeatureList>
                          <PricingOptions.PrimaryAction href="/buy">Join waitlist</PricingOptions.PrimaryAction>
                        </PricingOptions.Item>
                      </PricingOptions>
                    )}
                    <Box>
                      <Stack direction="vertical" padding="none" gap={64} alignItems="center">
                        <Heading as="h3" size="3">
                          Go further with these
                        </Heading>
                        <Grid>
                          <Grid.Column span={{medium: 4}}>
                            <Card href="#">
                              <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                              <Card.Description>
                                Everything you need to know about getting started with GitHub Actions.
                              </Card.Description>
                            </Card>
                          </Grid.Column>
                          <Grid.Column span={{medium: 4}}>
                            <Card href="#">
                              <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                              <Card.Description>
                                Everything you need to know about getting started with GitHub Actions.
                              </Card.Description>
                            </Card>
                          </Grid.Column>
                          <Grid.Column span={{medium: 4}}>
                            <Card href="#">
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
      <MinimalFooter />
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

function BoxedStatisticExample({heading, description}: {heading: string; description: string}) {
  return (
    <Box backgroundColor="subtle" padding={32} borderRadius="large" style={{width: '100%'}}>
      <Stack direction="vertical" gap="normal" padding="none">
        <Heading as="h4" size="display" font="hubot-sans" weight="medium" stretch="condensed">
          {heading}
        </Heading>
        <Text as="p" variant="muted">
          {description}
        </Text>
      </Stack>
    </Box>
  )
}

function PillarExample() {
  return (
    <Pillar>
      <Pillar.Icon color="blue" icon={<ZapIcon />} />
      <Pillar.Heading>Here is a core value proposition of this new feature on one or two lines</Pillar.Heading>
      <Pillar.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id aliquam luctus sed turpis.
      </Pillar.Description>
    </Pillar>
  )
}

function StoryScrollExample({align, bentoVisible}) {
  const [collapsedMode, setCollapsedMode] = React.useState(false)

  return (
    <section>
      <SectionIntro align="center">
        <SectionIntro.Label>Label</SectionIntro.Label>
        <SectionIntro.Heading size="2" className={styles.topOfStack}>
          Lorem ipsum of all sizes dolor sit amet
        </SectionIntro.Heading>

        {/* <form>
          <FormControl>
            <FormControl.Label>Collapsed mode</FormControl.Label>
            <Checkbox onChange={() => setCollapsedMode(!collapsedMode)} />
          </FormControl>
        </form> */}
      </SectionIntro>

      <RiverStoryScroll align={align} disable={collapsedMode}>
        <River align={align}>
          <River.Visual>
            <img
              src="https://placehold.co/600x400/FF5733/ffffff?text=1"
              alt="placeholder, blank area with an off-white background color"
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
              alt="placeholder, blank area with an off-white background color"
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
              alt="placeholder, blank area with an off-white background color"
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
                <Bento.Heading size="3">
                  How the healthcare giant Doctolib drove digital improved efficiency by more than 80%
                </Bento.Heading>
                <Link href="#">Call to action</Link>
              </Bento.Content>
              <Bento.Visual position="50% 100%">
                <img
                  alt="placeholder, blank area with an gray background color"
                  src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
                />
              </Bento.Visual>
            </Bento.Item>
          </Bento>
        </Box>
      )}
    </section>
  )
}
