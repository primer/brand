import {ZapIcon} from '@primer/octicons-react'
import React from 'react'
import {
  Box,
  Button,
  CTABanner,
  FAQ,
  Grid,
  Heading,
  Hero,
  Link,
  MinimalFooter,
  Pillar,
  River,
  SectionIntro,
  Stack,
  SubdomainNavBar,
  Testimonial,
  Text,
  ThemeProvider,
  Timeline,
} from '../..'

import styles from './FeaturePreviewLevelTwo.module.css'

import placeholderImage from '../../fixtures/images/placeholder-600x400.png'

export function FeaturePreviewLevelTwo() {
  const [enableGridOverlay, setEnableGridOverlay] = React.useState(false)
  const [isLightMode, setIsLightMode] = React.useState(true)

  const handleOverlay = e => {
    e.preventDefault()
    setEnableGridOverlay(!enableGridOverlay)
  }

  const handleMode = e => {
    e.preventDefault()
    setIsLightMode(!isLightMode)
  }

  return (
    <ThemeProvider
      colorMode={isLightMode ? 'light' : 'dark'}
      style={{backgroundColor: 'var(--brand-color-canvas-default)'}}
    >
      <SubdomainNavBar title="Preview">
        <SubdomainNavBar.SecondaryAction href="#" onClick={handleMode}>
          Change color mode
        </SubdomainNavBar.SecondaryAction>
        <SubdomainNavBar.PrimaryAction href="#" onClick={handleOverlay}>
          {enableGridOverlay ? 'Disable' : 'Enable'} grid
        </SubdomainNavBar.PrimaryAction>
      </SubdomainNavBar>
      <main className={styles.FeaturePreview}>
        <Grid enableOverlay={enableGridOverlay}>
          <Grid.Column>
            <Hero>
              <Hero.Label>Label</Hero.Label>
              <Hero.Heading>Expressive headline about a sweet feature</Hero.Heading>
              <Hero.Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                sed turpis felis nam pulvinar.
              </Hero.Description>
              <Hero.PrimaryAction href="#">Primary CTA</Hero.PrimaryAction>
              <Hero.SecondaryAction href="#">Secondary CTA</Hero.SecondaryAction>
              <Hero.Image src={placeholderImage} alt="placeholder, blank area with an off-white background color" />
            </Hero>
            <section>
              <Grid enableOverlay={enableGridOverlay}>
                <Grid.Column span={9}>
                  <Box marginBlockEnd={64}>
                    <SectionIntro>
                      <SectionIntro.Heading className={styles['SectionIntro__heading--no-max-width']}>
                        <em>Here we explain why this came to be.</em> This is a short statement about the intention of
                        the feature and why we think it&apos;s cool, keep it real.
                      </SectionIntro.Heading>
                    </SectionIntro>{' '}
                  </Box>
                </Grid.Column>
              </Grid>
              <Box
                marginBlockEnd={{
                  narrow: 24,
                  regular: 64,
                  wide: 112,
                }}
              >
                <Grid enableOverlay={enableGridOverlay}>
                  <Grid.Column span={{medium: 4}}>
                    <Pillar>
                      <Pillar.Icon icon={ZapIcon} />
                      <Pillar.Heading>
                        Here is a core value proposition of this new feature on one or two lines
                      </Pillar.Heading>
                      <Pillar.Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id aliquam
                        luctus sed turpis.
                      </Pillar.Description>
                    </Pillar>
                  </Grid.Column>
                  <Grid.Column span={{medium: 4}}>
                    <Pillar>
                      <Pillar.Icon icon={ZapIcon} />
                      <Pillar.Heading>Bam, another value proposition of this neat new feature</Pillar.Heading>
                      <Pillar.Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id aliquam
                        luctus sed turpis.
                      </Pillar.Description>
                    </Pillar>
                  </Grid.Column>
                  <Grid.Column span={{medium: 4}}>
                    <Pillar>
                      <Pillar.Icon icon={ZapIcon} />
                      <Pillar.Heading>
                        And - Boom - yet a third value proposition of this neat new feature
                      </Pillar.Heading>
                      <Pillar.Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id aliquam
                        luctus sed turpis.
                      </Pillar.Description>
                    </Pillar>
                  </Grid.Column>
                </Grid>
              </Box>
            </section>

            <River align="end">
              <River.Visual>
                <img src={placeholderImage} alt="placeholder, blank area with an off-white background color" />
              </River.Visual>
              <River.Content className={styles.RiverContent}>
                <Heading>
                  Dive into the first sub <br />
                  feature with a river
                </Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                  sed turpis felis nam pulvinar risus elementum.
                </Text>
                <Link href="#">Learn more</Link>
              </River.Content>
            </River>
            {/* TODO REPLACE WITH RIVER BREAKOUT */}
            <Box
              marginBlockStart={{
                narrow: 24,
                regular: 96,
              }}
              marginBlockEnd={{
                narrow: 24,
                regular: 96,
              }}
            >
              <Grid as="section">
                <Grid.Column span={12}>
                  <Box borderRadius="large">
                    <River.Visual>
                      <img src={placeholderImage} alt="placeholder, blank area with an off-white background color" />
                    </River.Visual>
                  </Box>
                </Grid.Column>
                <Grid.Column span={{small: 12, medium: 7}}>
                  <Stack direction="vertical" padding="none" alignItems="flex-start">
                    <SectionIntro>
                      <SectionIntro.Heading size="5" className={styles['SectionIntro__heading--no-max-width']}>
                        <em>Here we explain why this came to be.</em> This is a short statement about the intention of
                        the feature and why we think it&apos;s cool, keep it real.
                      </SectionIntro.Heading>
                    </SectionIntro>
                    <Link href="#">Learn more</Link>
                  </Stack>
                </Grid.Column>
                <Grid.Column span={{small: 12, medium: 5}}>
                  <Box marginBlockStart={24}>
                    <Timeline>
                      <Timeline.Item>
                        <em>This is what it is and it’s great. </em>That’s why and how the greatness happens here, we
                        love sub bullets, they allow for more specific technical details.
                      </Timeline.Item>
                      <Timeline.Item>
                        <em>This is what it is and it’s great. </em>That’s why and how the greatness happens here, we
                        love sub bullets, they allow for more specific technical details.
                      </Timeline.Item>
                    </Timeline>
                  </Box>
                </Grid.Column>
              </Grid>
            </Box>
            <River align="end">
              <River.Visual>
                <img src={placeholderImage} alt="placeholder, blank area with an off-white background color" />
              </River.Visual>
              <River.Content className={styles.RiverContent}>
                <Heading>
                  Dive into the second sub <br />
                  feature with a river
                </Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                  sed turpis felis nam pulvinar risus elementum.
                </Text>
                <Link href="#">Learn more</Link>
              </River.Content>
            </River>
          </Grid.Column>
        </Grid>
        <Box
          backgroundColor="subtle"
          paddingBlockStart={128}
          paddingBlockEnd={128}
          className={styles['FeaturePreviewLevelTwo__trailingSection']}
        >
          <Grid enableOverlay={enableGridOverlay}>
            <Grid.Column start={2} span={10}>
              <Box marginBlockEnd={128}>
                <Testimonial size="large">
                  <Testimonial.Quote>
                    We’ve used GitHub from the inception of Datadog. It’s a high-quality product, and a lot of our
                    engineers contribute to open source so there’s a sense of community there. GitHub is ingrained in
                    the DNA of our engineering, it’s become part of the culture.”
                  </Testimonial.Quote>
                  <Testimonial.Name position="Staff Software Engineer">David Ross</Testimonial.Name>
                </Testimonial>
              </Box>
            </Grid.Column>
            <Grid.Column>
              <CTABanner align="center" hasShadow={false}>
                <CTABanner.Heading>Get it, it’s super nice</CTABanner.Heading>
                <CTABanner.Description>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                  sed turpis felis nam pulvinar.
                </CTABanner.Description>
                <CTABanner.ButtonGroup>
                  <Button>Primary Action</Button>
                  <Button>Secondary Action</Button>
                </CTABanner.ButtonGroup>
              </CTABanner>
            </Grid.Column>
            <Grid.Column>
              <Box marginBlockStart={128}>
                <FAQ>
                  <FAQ.Heading>Frequently asked questions</FAQ.Heading>
                  <FAQ.Item>
                    <FAQ.Question>What is this feature?</FAQ.Question>
                    <FAQ.Answer>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </p>
                    </FAQ.Answer>
                  </FAQ.Item>
                  <FAQ.Item>
                    <FAQ.Question>When is it release planned?</FAQ.Question>
                    <FAQ.Answer>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </p>
                    </FAQ.Answer>
                  </FAQ.Item>
                  <FAQ.Item>
                    <FAQ.Question>Where is it available?</FAQ.Question>
                    <FAQ.Answer>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </p>
                    </FAQ.Answer>
                  </FAQ.Item>
                  <FAQ.Item>
                    <FAQ.Question>Who is it for?</FAQ.Question>
                    <FAQ.Answer>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </p>
                    </FAQ.Answer>
                  </FAQ.Item>
                  <FAQ.Item>
                    <FAQ.Question>What can I expect?</FAQ.Question>
                    <FAQ.Answer>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </p>
                    </FAQ.Answer>
                  </FAQ.Item>
                  <FAQ.Item>
                    <FAQ.Question>What’s the difference between this & that?</FAQ.Question>
                    <FAQ.Answer>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </p>
                    </FAQ.Answer>
                  </FAQ.Item>
                  <FAQ.Item>
                    <FAQ.Question>Is this free?</FAQ.Question>
                    <FAQ.Answer>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </p>
                    </FAQ.Answer>
                  </FAQ.Item>
                  <FAQ.Item>
                    <FAQ.Question>Is this release invite-only?</FAQ.Question>
                    <FAQ.Answer>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                        luctus sed turpis felis nam pulvinar risus elementum.
                      </p>
                    </FAQ.Answer>
                  </FAQ.Item>
                </FAQ>
              </Box>
            </Grid.Column>
          </Grid>
        </Box>
      </main>
      <MinimalFooter>
        <MinimalFooter.Link href="https://github.com/organizations/enterprise_plan">
          Try GitHub for free
        </MinimalFooter.Link>
        <MinimalFooter.Link href="https://github.com/enterprise">Enterprise</MinimalFooter.Link>
        <MinimalFooter.Link href="https://github.com/enterprise/contact">Email us</MinimalFooter.Link>
      </MinimalFooter>
    </ThemeProvider>
  )
}
