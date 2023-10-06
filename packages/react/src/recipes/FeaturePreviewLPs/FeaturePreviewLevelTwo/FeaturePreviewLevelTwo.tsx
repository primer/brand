import {ZapIcon} from '@primer/octicons-react'
import React, {useEffect} from 'react'
import {
  Box,
  Button,
  CTABanner,
  Card,
  ColorModesEnum,
  FAQ,
  FAQGroup,
  Grid,
  Heading,
  Hero,
  Image,
  Link,
  MinimalFooter,
  Pillar,
  River,
  RiverBreakout,
  SectionIntro,
  Stack,
  SubdomainNavBar,
  Testimonial,
  Text,
  ThemeProvider,
  Timeline,
} from '../../..'

import styles from './FeaturePreviewLevelTwo.module.css'

import emptyBrowser from '../fixtures/images/fg/empty-browser.png'
import emptyBrowserDark from '../fixtures/images/fg/empty-browser-dark.png'

import emptyBrowserLightFull from '../fixtures/images/fg/empty-browser-full-light.png'
import emptyBrowserDarkFull from '../fixtures/images/fg/empty-browser-full-dark.png'
import monaAvatar from '../../../fixtures/images/avatar-mona.png'
import {Themes, themeDetailsMap} from '../helpers'
import clsx from 'clsx'

type FeaturePreviewLevelTwoProps = {
  variant?: 'Maximum' | 'Minimum'
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  accentColor: Themes
  heroAlign: 'start' | 'center'
  heroBg: boolean
  showHeroVisual: boolean
  heroLabel: string
  heroTitle: string
  heroDescription: string
  heroCtaTextPrimary: string
  heroCtaTextSecondary: string

  sectionIntroAlign: 'start' | 'center'
  sectionIntroText: string | React.ReactElement[]
  sectionIntroVisible: boolean

  pillarVisibile: boolean
  pillarBackground: boolean

  riverOneVisible: boolean
  riverOneType: 'start' | 'end' | 'breakout'
  riverOneTitle: string
  riverOneDescription: string
  riverOneCtaText: string

  riverTwoVisible: boolean
  riverTwoType: 'start' | 'end' | 'breakout'
  riverTwoTitle: string
  riverTwoDescription: string
  riverTwoCtaText: string

  riverThreeVisible: boolean
  riverThreeType: 'start' | 'end' | 'breakout'
  riverThreeTitle: string
  riverThreeDescription: string
  riverThreeCtaText: string

  testimonialVisible: boolean
  testimonialQuantity: number

  ctaBannerVisible: boolean
  ctaBannerShowBg: boolean

  faqVisible: boolean
  faqType: 'group' | 'single'

  cardsVisible: boolean
}

export function FeaturePreviewLevelTwo({accentColor, variant, colorMode, ...args}: FeaturePreviewLevelTwoProps) {
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

  const handleMode = e => {
    e.preventDefault()
    setIsLightMode(!isLightMode)
  }

  const renderPiller = () => (
    <Pillar>
      <Pillar.Icon icon={ZapIcon} />
      <Pillar.Heading>Here is a core value proposition of this new feature on one or two lines</Pillar.Heading>
      <Pillar.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id aliquam luctus sed turpis.
      </Pillar.Description>
    </Pillar>
  )

  const renderTestimonial = (num: FeaturePreviewLevelTwoProps['testimonialQuantity']) => {
    return (
      <Testimonial size={num === 1 ? 'large' : 'small'} quoteMarkColor="default">
        <Testimonial.Quote>
          <em>We&apos;ve used GitHub from the inception of Datadog. It&apos;s a high-quality product,</em> and a lot of
          our engineers contribute to open source so there&apos;s a sense of community there. GitHub is ingrained in the
          DNA of our engineering, it&apos;s become part of the culture.”
        </Testimonial.Quote>
        <Testimonial.Name position="Staff Software Engineer">David Ross</Testimonial.Name>
        <Testimonial.Avatar src={monaAvatar} alt="circular avatar for mona, GitHub's mascot" />
      </Testimonial>
    )
  }

  return (
    <ThemeProvider
      colorMode={selectedColorMode}
      style={{
        ['--brand-Testimonial-quoteMarkColor-default' as string]: accentColorValue,
        ['--brand-Pillar-icon-color-default' as string]: accentColorValue,
        ['--brand-Label-color-default' as string]: accentColorValue,
        ['--brand-color-accent-primary' as string]: accentColorValue,
        backgroundColor: 'var(--brand-color-canvas-default)',
      }}
    >
      <SubdomainNavBar title={`Level 2 ${variant ? `- ${variant}` : ''}`} fixed={true}>
        <SubdomainNavBar.SecondaryAction href="#" onClick={handleMode}>
          Change color mode
        </SubdomainNavBar.SecondaryAction>
        <SubdomainNavBar.PrimaryAction href="#" onClick={handleOverlay}>
          {enableGridOverlay ? 'Disable' : 'Enable'} grid
        </SubdomainNavBar.PrimaryAction>
      </SubdomainNavBar>
      <div className={styles.FeaturePreview}>
        <Box
          backgroundColor={args.heroBg ? 'subtle' : 'default'}
          className={args.heroBg ? styles['FeaturePreview__heroBg'] : ''}
          paddingBlockEnd={args.heroBg ? 24 : 'none'}
          marginBlockEnd={args.heroBg ? 96 : 'none'}
        >
          <Grid enableOverlay={enableGridOverlay}>
            <Grid.Column>
              <Box
                paddingBlockEnd={{wide: 8}}
                marginBlockStart={{
                  narrow: 24,
                  regular: 64,
                  wide: 80,
                }}
              >
                <Hero
                  align={args.heroAlign}
                  className={styles.Hero}
                  imageContainerClassName={styles.FeaturePreview__heroImageContainer}
                  imageContainerStyle={{
                    backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                  }}
                >
                  {args.heroLabel && <Hero.Label>{args.heroLabel}</Hero.Label>}
                  {args.heroTitle && <Hero.Heading>{args.heroTitle}</Hero.Heading>}
                  {args.heroDescription && <Hero.Description>{args.heroDescription}</Hero.Description>}
                  {args.heroCtaTextPrimary && (
                    <Hero.PrimaryAction href="#">{args.heroCtaTextPrimary}</Hero.PrimaryAction>
                  )}
                  {args.heroCtaTextSecondary && (
                    <Hero.SecondaryAction href="#">{args.heroCtaTextSecondary}</Hero.SecondaryAction>
                  )}
                  {args.showHeroVisual && (
                    <Hero.Image
                      src={isLightMode ? emptyBrowser : emptyBrowserDark}
                      alt="placeholder, blank area with an off-white background color"
                    />
                  )}
                </Hero>
              </Box>
            </Grid.Column>
          </Grid>
        </Box>
        <Grid enableOverlay={enableGridOverlay}>
          <Grid.Column>
            <section>
              {args.sectionIntroText && args.sectionIntroVisible && (
                <Grid enableOverlay={enableGridOverlay}>
                  <Grid.Column
                    span={{medium: args.sectionIntroAlign === 'center' ? 8 : 9}}
                    start={{medium: args.sectionIntroAlign === 'center' ? 3 : 1}}
                  >
                    <Box marginBlockEnd={40}>
                      <SectionIntro fullWidth align={args.sectionIntroAlign}>
                        <SectionIntro.Heading>{args.sectionIntroText}</SectionIntro.Heading>
                      </SectionIntro>
                    </Box>
                  </Grid.Column>
                </Grid>
              )}
              {args.pillarVisibile && (
                <Box
                  marginBlockEnd={{
                    narrow: 16,
                    regular: 16,
                    wide: 48,
                  }}
                >
                  <Grid enableOverlay={enableGridOverlay}>
                    <Grid.Column span={{medium: 4}}>
                      {args.pillarBackground ? (
                        <Box
                          paddingInlineStart={32}
                          paddingInlineEnd={32}
                          paddingBlockStart={32}
                          paddingBlockEnd={8}
                          backgroundColor="subtle"
                          borderRadius="large"
                        >
                          {renderPiller()}
                        </Box>
                      ) : (
                        renderPiller()
                      )}
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      {args.pillarBackground ? (
                        <Box
                          paddingInlineStart={32}
                          paddingInlineEnd={32}
                          paddingBlockStart={32}
                          paddingBlockEnd={8}
                          backgroundColor="subtle"
                          borderRadius="large"
                        >
                          {renderPiller()}
                        </Box>
                      ) : (
                        renderPiller()
                      )}
                    </Grid.Column>
                    <Grid.Column span={{medium: 4}}>
                      {args.pillarBackground ? (
                        <Box
                          paddingInlineStart={32}
                          paddingInlineEnd={32}
                          paddingBlockStart={32}
                          paddingBlockEnd={8}
                          backgroundColor="subtle"
                          borderRadius="large"
                        >
                          {renderPiller()}
                        </Box>
                      ) : (
                        renderPiller()
                      )}
                    </Grid.Column>
                  </Grid>
                </Box>
              )}
            </section>
            <Box paddingBlockStart={48} paddingBlockEnd={80}>
              {args.riverOneVisible && (
                <>
                  {args.riverOneType === 'breakout' ? (
                    <RiverBreakout>
                      <RiverBreakout.A11yHeading as={args.sectionIntroVisible ? 'h3' : 'h2'}>
                        {args.riverOneTitle}
                      </RiverBreakout.A11yHeading>
                      <RiverBreakout.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </RiverBreakout.Visual>
                      <RiverBreakout.Content
                        trailingComponent={() => (
                          <Box>
                            <Timeline fullWidth>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                            </Timeline>
                          </Box>
                        )}
                      >
                        <Text>{args.riverOneDescription}</Text>
                        <Link href="#">{args.riverOneCtaText}</Link>
                      </RiverBreakout.Content>
                    </RiverBreakout>
                  ) : (
                    <River align={args.riverOneType}>
                      <River.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.riverVisualBgs[0]})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </River.Visual>
                      <River.Content className={clsx(args.riverOneType === 'end' && styles.RiverContent)}>
                        <Heading as={args.sectionIntroVisible ? 'h3' : 'h2'}>{args.riverOneTitle}</Heading>
                        <Text>{args.riverOneDescription}</Text>
                        <Link href="#">{args.riverOneCtaText}</Link>
                      </River.Content>
                    </River>
                  )}
                </>
              )}

              {args.riverTwoVisible && (
                <>
                  {args.riverTwoType === 'breakout' ? (
                    <RiverBreakout>
                      <RiverBreakout.A11yHeading as={args.sectionIntroVisible ? 'h3' : 'h2'}>
                        {args.riverTwoTitle}
                      </RiverBreakout.A11yHeading>
                      <RiverBreakout.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </RiverBreakout.Visual>
                      <RiverBreakout.Content
                        trailingComponent={() => (
                          <Box>
                            <Timeline fullWidth>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                            </Timeline>
                          </Box>
                        )}
                      >
                        <Text>{args.riverTwoDescription}</Text>
                        <Link href="#">{args.riverTwoCtaText}</Link>
                      </RiverBreakout.Content>
                    </RiverBreakout>
                  ) : (
                    <River align={args.riverTwoType}>
                      <River.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.riverVisualBgs[0]})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </River.Visual>
                      <River.Content className={clsx(args.riverTwoType === 'end' && styles.RiverContent)}>
                        <Heading as={args.sectionIntroVisible ? 'h3' : 'h2'}>{args.riverTwoTitle}</Heading>
                        <Text>{args.riverTwoDescription}</Text>
                        <Link href="#">{args.riverTwoCtaText}</Link>
                      </River.Content>
                    </River>
                  )}
                </>
              )}
              {args.riverThreeVisible && (
                <>
                  {args.riverThreeType === 'breakout' ? (
                    <RiverBreakout>
                      <RiverBreakout.A11yHeading as={args.sectionIntroVisible ? 'h3' : 'h2'}>
                        {args.riverThreeTitle}
                      </RiverBreakout.A11yHeading>
                      <RiverBreakout.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </RiverBreakout.Visual>
                      <RiverBreakout.Content
                        trailingComponent={() => (
                          <Box>
                            <Timeline fullWidth>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                              <Timeline.Item>
                                <em>This is what it is and it&apos;s great. </em>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                            </Timeline>
                          </Box>
                        )}
                      >
                        <Text>{args.riverThreeDescription}</Text>
                        <Link href="#">{args.riverThreeCtaText}</Link>
                      </RiverBreakout.Content>
                    </RiverBreakout>
                  ) : (
                    <River align={args.riverThreeType}>
                      <River.Visual
                        className={styles.FeaturePreview__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.riverVisualBgs[0]})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with an off-white background color"
                        />
                      </River.Visual>
                      <River.Content className={clsx(args.riverThreeType === 'end' && styles.RiverContent)}>
                        <Heading as={args.sectionIntroVisible ? 'h3' : 'h2'}>{args.riverThreeTitle}</Heading>
                        <Text>{args.riverThreeDescription}</Text>
                        <Link href="#">{args.riverThreeCtaText}</Link>
                      </River.Content>
                    </River>
                  )}
                </>
              )}
            </Box>
          </Grid.Column>
        </Grid>
        <Box
          backgroundColor="subtle"
          paddingBlockStart={128}
          paddingBlockEnd={128}
          className={styles['FeaturePreview__trailingSection']}
        >
          <Grid enableOverlay={enableGridOverlay}>
            {args.testimonialVisible && (
              <>
                {args.testimonialQuantity === 1 ? (
                  <Grid.Column start={{medium: 2}} span={{medium: 10}}>
                    <Box marginBlockEnd={112}>{renderTestimonial(args.testimonialQuantity)}</Box>
                  </Grid.Column>
                ) : (
                  <>
                    <Grid.Column span={6}>
                      <Box marginBlockEnd={112}>{renderTestimonial(args.testimonialQuantity)}</Box>
                    </Grid.Column>
                    <Grid.Column span={6}>
                      <Box marginBlockEnd={112}>{renderTestimonial(args.testimonialQuantity)}</Box>
                    </Grid.Column>
                  </>
                )}
              </>
            )}

            <Grid.Column>
              {args.ctaBannerVisible && (
                <Grid.Column>
                  <Box>
                    <CTABanner
                      className={styles.FeaturePreview__ctaBanner}
                      align="center"
                      hasShadow={false}
                      hasBackground={args.ctaBannerShowBg ? false : true}
                      style={
                        args.ctaBannerShowBg
                          ? {
                              backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.ctaBannerBg})`,
                            }
                          : {}
                      }
                    >
                      <CTABanner.Heading>Get it, it&apos;s super nice</CTABanner.Heading>
                      <CTABanner.Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar.
                      </CTABanner.Description>
                      <CTABanner.ButtonGroup>
                        <Button>Primary Action</Button>
                        <Button>Secondary Action</Button>
                      </CTABanner.ButtonGroup>
                    </CTABanner>
                  </Box>
                </Grid.Column>
              )}
              {args.cardsVisible && (
                <Box marginBlockStart={args.ctaBannerVisible ? 128 : undefined}>
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
              )}
              {args.faqVisible && (
                <Box marginBlockStart={args.cardsVisible || args.ctaBannerVisible ? 128 : undefined}>
                  {args.faqType === 'single' ? (
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
                  ) : (
                    <FAQGroup>
                      <FAQGroup.Heading>
                        Frequently asked
                        <br />
                        questions
                      </FAQGroup.Heading>
                      <FAQ>
                        <FAQ.Heading>Using GitHub Enterprise</FAQ.Heading>
                        <FAQ.Item>
                          <FAQ.Question>What is GitHub Enterprise?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                        <FAQ.Item>
                          <FAQ.Question>How can GitHub Enterprise be deployed?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                        <FAQ.Item>
                          <FAQ.Question>What is GitHub Enterprise Cloud?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                      </FAQ>

                      <FAQ>
                        <FAQ.Heading>About GitHub Enterprise</FAQ.Heading>
                        <FAQ.Item>
                          <FAQ.Question>What is the difference between GitHub and GitHub Enterprise?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                        <FAQ.Item>
                          <FAQ.Question>Why should organizations use GitHub Enterprise?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                        <FAQ.Item>
                          <FAQ.Question>Who uses GitHub Enterprise?</FAQ.Question>
                          <FAQ.Answer>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.
                              Aliquam luctus sed turpis felis nam pulvinar risus elementum.
                            </p>
                          </FAQ.Answer>
                        </FAQ.Item>
                      </FAQ>
                    </FAQGroup>
                  )}
                </Box>
              )}
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
