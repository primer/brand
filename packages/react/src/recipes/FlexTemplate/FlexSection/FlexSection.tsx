import React, {useEffect} from 'react'
import clsx from 'clsx'

import {ZapIcon} from '@primer/octicons-react'

import {
  Bento,
  Box,
  Button,
  Card,
  ColorModesEnum,
  CTABanner,
  Grid,
  Heading,
  IDE,
  Image,
  Link,
  LogoSuite,
  Pillar,
  Prose,
  River,
  RiverBreakout,
  Section,
  SectionIntro,
  Stack,
  Testimonial,
  Text,
  ThemeProvider,
  Timeline,
} from '../../..'

import {defaultFiles} from '../../../IDE/fixtures/content'
import monaAvatar from '../../../fixtures/images/avatar-mona.png'
import pinterestLogo from '../../../fixtures/images/logos/pinterest.png'
import shopifyLogo from '../../../fixtures/images/logos/shopify.png'
import twilioLogo from '../../../fixtures/images/logos/twilio.png'
import uberLogo from '../../../fixtures/images/logos/uber.png'
import vercelLogo from '../../../fixtures/images/logos/vercel.png'
import placeholderImage from '../../../fixtures/images/placeholder.png'

import {Themes, themeDetailsMap} from '../helpers'
import emptyBrowserDarkFull from '../fixtures/images/fg/empty-browser-full-dark.png'
import emptyBrowserLightFull from '../fixtures/images/fg/empty-browser-full-light.png'

import styles from './FlexSection.module.css'

type FlexSectionProps = {
  gridOverlay?: boolean
  variant?: 'Default' | 'Maximum' | 'Minimum'
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  accentColor: Themes

  sectionIntroAlign: 'start' | 'center'
  sectionIntroText: string | React.ReactElement[]
  sectionIntroVisible: boolean

  pillarVisible: boolean
  pillarBackground: boolean

  logoSuiteVisible: boolean

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

  cardsVisible: boolean
}

export function FlexSection({accentColor, variant, gridOverlay = false, colorMode, ...args}: FlexSectionProps) {
  const [enableGridOverlay, setGridOverlay] = React.useState(gridOverlay)
  const [isLightMode, setIsLightMode] = React.useState(colorMode === ColorModesEnum.LIGHT)
  const selectedColorMode = isLightMode ? ColorModesEnum.LIGHT : ColorModesEnum.DARK
  const accentColorValue = themeDetailsMap[accentColor][selectedColorMode].color

  useEffect(() => {
    setGridOverlay(gridOverlay)
  }, [gridOverlay])

  useEffect(() => {
    setIsLightMode(colorMode === ColorModesEnum.LIGHT)
  }, [colorMode])

  const renderPiller = () => (
    <Pillar>
      <Pillar.Icon icon={<ZapIcon />} />
      <Pillar.Heading as="h3">Here is a core value proposition of this new feature on one or two lines</Pillar.Heading>
      <Pillar.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id aliquam luctus sed turpis.
      </Pillar.Description>
    </Pillar>
  )

  const renderTestimonial = (num: FlexSectionProps['testimonialQuantity']) => {
    return (
      <Testimonial size={num === 1 ? 'large' : 'small'} quoteMarkColor="default">
        <Testimonial.Quote>
          <b>We&apos;ve used GitHub from the inception of Datadog. It&apos;s a high-quality product,</b> and a lot of
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
      <div className={styles.FlexSection}>
        <Section>
          <Grid enableOverlay={enableGridOverlay}>
            <Grid.Column>
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

              {args.pillarVisible && (
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
            </Grid.Column>
          </Grid>
        </Section>

        {args.logoSuiteVisible && (
          <Section paddingBlockStart="condensed" paddingBlockEnd="none">
            <Grid>
              <Grid.Column>
                <LogoSuite align="start" hasDivider={true}>
                  <LogoSuite.Heading as="h3" size="6" visuallyHidden>
                    Trusted by devs across the world
                  </LogoSuite.Heading>
                  <LogoSuite.Logobar variant="muted" marquee={process.env.NODE_ENV !== 'test'}>
                    <Image alt="Uber" src={uberLogo} />
                    <Image alt="Vercel" src={vercelLogo} />
                    <Image alt="Shopify" src={shopifyLogo} />
                    <Image alt="Pinterest" src={pinterestLogo} />
                    <Image alt="Twilio" src={twilioLogo} />
                  </LogoSuite.Logobar>
                </LogoSuite>
              </Grid.Column>
            </Grid>
          </Section>
        )}

        {args.cardsVisible && (
          <Box marginBlockStart={args.ctaBannerVisible ? 128 : undefined}>
            <Stack direction="vertical" padding="none" gap={64} alignItems="center">
              <Grid>
                <Grid.Column span={{medium: 4}}>
                  <Card href="#" hasBorder>
                    <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                    <Card.Description>
                      Everything you need to know about getting started with GitHub Actions.
                    </Card.Description>
                  </Card>
                </Grid.Column>
                <Grid.Column span={{medium: 4}}>
                  <Card href="#" hasBorder>
                    <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                    <Card.Description>
                      Everything you need to know about getting started with GitHub Actions.
                    </Card.Description>
                  </Card>
                </Grid.Column>
                <Grid.Column span={{medium: 4}}>
                  <Card href="#" hasBorder>
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

        <Section paddingBlockStart="normal" paddingBlockEnd="normal">
          <Box>
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
        </Section>

        <Section paddingBlockStart="normal" paddingBlockEnd="normal">
          <Stack alignItems={'center'}>
            <Prose
              html={`
                <p>
                  <a href="https://docs.github.com/en/enterprise-server@3.5/admin/overview/about-github-enterprise-server">GitHub Enterprise Server</a>
                  is the self-hosted version of GitHub Enterprise. It is installed on-premises or on a private
                  cloud and provides organizations with a secure and customizable source code management and
                  collaboration platform.
                </p>

                <p>
                  One of the key advantages of GitHub Enterprise Server is that it provides organizations with
                  complete control over their source code and data. Organizations can choose where to store their
                  repositories and can control who has access to them. Administrators can also customize the
                  platform to meet specific needs, such as integrating other tools or implementing custom
                  workflows.
                </p>

                <p>
                  GitHub Enterprise Server also offers enhanced security and compliance features. Organizations
                  can configure their instance to meet their specific security requirements, such as using LDAP or
                  SAML for authentication, setting up two-factor authentication, or implementing network security
                  measures. Compliance features are also included, such as audit logs, access controls, and
                  vulnerability scanning.
                </p>
              `}
            />
          </Stack>
        </Section>

        <Section paddingBlockStart="condensed">
          <Grid enableOverlay={enableGridOverlay}>
            <Grid.Column>
              {args.riverOneVisible && (
                <>
                  {args.riverOneType === 'breakout' ? (
                    <RiverBreakout>
                      <RiverBreakout.A11yHeading as={args.sectionIntroVisible ? 'h3' : 'h2'}>
                        {args.riverOneTitle}
                      </RiverBreakout.A11yHeading>
                      <RiverBreakout.Visual
                        className={styles.FlexSection__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with a gray background color"
                        />
                      </RiverBreakout.Visual>

                      <RiverBreakout.Content
                        trailingComponent={() => (
                          <Box>
                            <Timeline fullWidth>
                              <Timeline.Item>
                                <b>This is what it is and it&apos;s great. </b>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                              <Timeline.Item>
                                <b>This is what it is and it&apos;s great. </b>That&apos;s why and how the greatness
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
                        className={styles.FlexSection__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.riverVisualBgs[0]})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with a gray background color"
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
                    <RiverBreakout id="breakout-with-ide">
                      <RiverBreakout.A11yHeading as={args.sectionIntroVisible ? 'h3' : 'h2'}>
                        {args.riverTwoTitle}
                      </RiverBreakout.A11yHeading>
                      <RiverBreakout.Visual
                        className={styles.FlexSection__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                        }}
                      >
                        <Box padding={48} paddingBlockEnd={4}>
                          <IDE height={600} variant="glass">
                            <IDE.Editor files={defaultFiles} />
                          </IDE>
                        </Box>
                      </RiverBreakout.Visual>
                      <RiverBreakout.Content
                        trailingComponent={() => (
                          <Box>
                            <Timeline fullWidth>
                              <Timeline.Item>
                                <b>This is what it is and it&apos;s great. </b>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                              <Timeline.Item>
                                <b>This is what it is and it&apos;s great. </b>That&apos;s why and how the greatness
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
                        className={styles.FlexSection__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.riverVisualBgs[0]})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with a gray background color"
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
                        className={styles.FlexSection__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.heroVisualBg})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with a gray background color"
                        />
                      </RiverBreakout.Visual>
                      <RiverBreakout.Content
                        trailingComponent={() => (
                          <Box>
                            <Timeline fullWidth>
                              <Timeline.Item>
                                <b>This is what it is and it&apos;s great. </b>That&apos;s why and how the greatness
                                happens here, we love sub bullets, they allow for more specific technical details.
                              </Timeline.Item>
                              <Timeline.Item>
                                <b>This is what it is and it&apos;s great. </b>That&apos;s why and how the greatness
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
                        className={styles.FlexSection__heroImageContainer}
                        style={{
                          backgroundImage: `url(${themeDetailsMap[accentColor][selectedColorMode].images.riverVisualBgs[0]})`,
                        }}
                      >
                        <Image
                          src={isLightMode ? emptyBrowserLightFull : emptyBrowserDarkFull}
                          alt="placeholder, blank area with a gray background color"
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
            </Grid.Column>
          </Grid>
        </Section>

        <Section
          backgroundColor="subtle"
          paddingBlockStart="spacious"
          paddingBlockEnd="spacious"
          className={styles['FlexSection__trailingSection']}
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
                      className={styles.FlexSection__ctaBanner}
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
            </Grid.Column>
          </Grid>
        </Section>
      </div>
    </ThemeProvider>
  )
}
