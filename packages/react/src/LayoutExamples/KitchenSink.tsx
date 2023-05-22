import React from 'react'
import {
  Hero,
  River,
  FAQ,
  Heading,
  Text,
  InlineLink,
  Link,
  FormControl,
  TextInput,
  ThemeProvider,
  Image,
  Checkbox,
  Select,
  Button,
  SubdomainNavBar,
  Stack,
  Testimonial,
  Radio,
  Grid,
  Card,
  ComparisonTable,
  AnimationProvider,
  SectionIntro,
  Animate
} from '..'
import {CopilotIcon, RocketIcon, GitBranchIcon} from '@primer/octicons-react'

type KitchenSinkProps = React.HTMLAttributes<HTMLDivElement>

export function KitchenSink(props: KitchenSinkProps) {
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
      <AnimationProvider runOnce={false}>
        <SubdomainNavBar title="Subdomain" {...props}>
          <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#">Topics</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#">Events</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#">Video</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#">Social</SubdomainNavBar.Link>
          <SubdomainNavBar.SecondaryAction href="#" onClick={handleMode}>
            Change color mode
          </SubdomainNavBar.SecondaryAction>
          <SubdomainNavBar.PrimaryAction href="#" onClick={handleOverlay}>
            {enableGridOverlay ? 'Disable' : 'Enable'} grid
          </SubdomainNavBar.PrimaryAction>
        </SubdomainNavBar>
        <Grid style={{paddingTop: 'var(--base-size-40)', paddingBottom: '200px'}} enableOverlay={false}>
          <Grid.Column>
            <div style={{marginTop: 'var(--base-size-80)'}}>
              <Hero align="center">
                <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
                <Hero.Description>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                  sed turpis felis nam pulvinar risus elementum.
                </Hero.Description>
                <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
                <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
              </Hero>
            </div>
            <section>
              <SectionIntro align="center" animate="slide-in-up">
                <SectionIntro.Heading>Section intro</SectionIntro.Heading>
                <SectionIntro.Description>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                  sed turpis felis nam pulvinar risus elementum.
                </SectionIntro.Description>
              </SectionIntro>

              <River>
                <River.Visual>
                  <Image
                    src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
                    alt="placeholder, blank area with an off-white background color"
                  />
                </River.Visual>
                <River.Content
                  animate={{
                    variant: 'slide-in-right'
                  }}
                >
                  <Heading>Heading</Heading>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                    luctus sed turpis felis nam pulvinar risus elementum.
                  </Text>
                  <Link href="#">Call to action</Link>
                </River.Content>
              </River>
              <River align="end">
                <River.Visual>
                  <Image
                    src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
                    alt="placeholder, blank area with an off-white background color"
                  />
                </River.Visual>
                <River.Content
                  animate={{
                    variant: 'slide-in-left'
                  }}
                >
                  <Heading>Heading</Heading>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                    luctus sed turpis felis nam pulvinar risus elementum.
                  </Text>
                  <Link href="#">Call to action</Link>
                </River.Content>
              </River>
              <River align="center">
                <River.Visual>
                  <Image
                    src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
                    alt="placeholder, blank area with an off-white background color"
                  />
                </River.Visual>
                <River.Content
                  animate={{
                    variant: 'slide-in-up'
                  }}
                >
                  <Heading>Heading</Heading>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam
                    luctus sed turpis felis nam pulvinar risus elementum.
                  </Text>
                  <Link href="#">Call to action</Link>
                </River.Content>
              </River>
            </section>

            <Stack
              id="comparejenkins"
              gap="spacious"
              padding="none"
              justifyContent="space-evenly"
              direction={{narrow: 'vertical', regular: 'horizontal', wide: 'horizontal'}}
              style={{margin: 'var(--base-size-96) auto'}}
            >
              <ComparisonTable featuredColumn={1} heading="Comparison table">
                <ComparisonTable.Row>
                  <ComparisonTable.Cell>Use case</ComparisonTable.Cell>
                  <ComparisonTable.Cell>GitHub</ComparisonTable.Cell>
                  <ComparisonTable.Cell>Jenkins</ComparisonTable.Cell>
                </ComparisonTable.Row>
                <ComparisonTable.Row>
                  <ComparisonTable.Cell>Automation & CI/CD</ComparisonTable.Cell>
                  <ComparisonTable.Cell>
                    <Text as="p" size="300">
                      Comparable native core capabilities
                    </Text>
                    <Text as="p" size="300">
                      <InlineLink href="#">Over 13,000 GitHub Actions are available</InlineLink>
                      &nbsp;in the GitHub Marketplace to automate your development workflow.
                    </Text>
                  </ComparisonTable.Cell>
                  <ComparisonTable.Cell>
                    <Text as="p" size="300">
                      Comparable native capabilities
                    </Text>
                    <Text as="p" size="300">
                      1,800+ community contributed Jenkins plugins{' '}
                      <InlineLink href="#">in Jenkins Plugin Marketplace.</InlineLink>
                    </Text>
                  </ComparisonTable.Cell>
                </ComparisonTable.Row>
                <ComparisonTable.Row>
                  <ComparisonTable.Cell>Deployment models</ComparisonTable.Cell>
                  <ComparisonTable.Cell>Cloud or self-hosted</ComparisonTable.Cell>
                  <ComparisonTable.Cell>
                    <Text as="p" size="300">
                      Self-hosted only
                    </Text>
                    <Text as="p" size="300">
                      CloudBees is the cloud alternative
                    </Text>
                  </ComparisonTable.Cell>
                </ComparisonTable.Row>
                <ComparisonTable.Footnote>
                  *** This is a biased overview of capabilities by use case, based on publicly available information as
                  of 2022-05-16.
                </ComparisonTable.Footnote>
              </ComparisonTable>
            </Stack>
            <Stack direction="vertical" padding="none" gap="spacious" style={{gap: 'var(--base-size-96)'}}>
              <Grid style={{justifyItems: 'center'}}>
                <Grid.Column>
                  <Stack alignItems="center">
                    <Heading as="h2" size="3">
                      Cards
                    </Heading>
                  </Stack>
                </Grid.Column>
                <Grid.Column
                  span={{
                    xsmall: 12,
                    large: 4
                  }}
                >
                  <Animate animate="scale-in-up">
                    <Card href="https://github.com">
                      <Card.Icon icon={CopilotIcon} color="indigo" hasBackground />
                      <Card.Label>Limited</Card.Label>
                      <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
                      <Card.Description>
                        Everything you need to know about getting started with GitHub Actions.
                      </Card.Description>
                    </Card>
                  </Animate>
                </Grid.Column>
                <Grid.Column
                  span={{
                    xsmall: 12,
                    large: 4
                  }}
                >
                  <Animate animate="scale-in-up">
                    <Card href="https://github.com">
                      <Card.Icon icon={RocketIcon} hasBackground color="blue" />
                      <Card.Label>Limited</Card.Label>
                      <Card.Heading>GitHub Actions cheat sheet and more</Card.Heading>
                      <Card.Description>
                        In a recent study, 70% of organizations reported they had adopted DevOps.
                      </Card.Description>
                    </Card>
                  </Animate>
                </Grid.Column>
                <Grid.Column
                  span={{
                    xsmall: 12,
                    large: 4
                  }}
                >
                  <Animate animate="scale-in-up">
                    <Card href="https://github.com">
                      <Card.Icon icon={GitBranchIcon} color="teal" hasBackground />
                      <Card.Label>Limited</Card.Label>
                      <Card.Heading>How healthy teams build better software</Card.Heading>
                      <Card.Description>
                        Everything you need to know about getting started with GitHub Actions.
                      </Card.Description>
                    </Card>
                  </Animate>
                </Grid.Column>
              </Grid>
              <FAQ animate="scale-in-up">
                <FAQ.Heading>Frequently asked questions</FAQ.Heading>
                <FAQ.Item>
                  <FAQ.Question>What&apos;s included in the GitHub for Startups offer?</FAQ.Question>
                  <FAQ.Answer>
                    <p>
                      All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year
                      one and 50% off year two. Learn more about the features and capabilities of GitHub Enterprise{' '}
                      <InlineLink href="https://www.github.com" target="_blank" rel="noreferrer">
                        here
                      </InlineLink>
                      .
                    </p>
                  </FAQ.Answer>
                </FAQ.Item>
                <FAQ.Item>
                  <FAQ.Question>Who is eligible to apply?</FAQ.Question>
                  <FAQ.Answer>
                    <p>Startups who meet the following criteria are eligible to apply for the program:</p>
                    <ol>
                      <li>
                        <Text size="300" variant="muted">
                          Must be associated with a current GitHub for Startups partner.
                        </Text>
                      </li>
                      <li>
                        <Text size="300" variant="muted">
                          Self-funded or funded (Seed-Series A)
                        </Text>
                      </li>
                      <li>
                        <Text size="300" variant="muted">
                          Not a current GitHub Enterprise customer
                        </Text>
                      </li>
                      <li>
                        <Text size="300" variant="muted">
                          Must not have previously received credits for GitHub Enterprise
                        </Text>
                      </li>
                    </ol>
                  </FAQ.Answer>
                </FAQ.Item>
                <FAQ.Item>
                  <FAQ.Question>What if my startup is not eligible? Are there other resources for me?</FAQ.Question>
                  <FAQ.Answer>
                    <p>
                      If you’re not currently eligible for the GitHub for Startups but would like to try GitHub
                      Enterprise, please feel to sign up for a trial
                      <InlineLink href="https://www.github.com" target="_blank" rel="noreferrer">
                        here
                      </InlineLink>
                      .
                    </p>
                  </FAQ.Answer>
                </FAQ.Item>
                <FAQ.Item>
                  <FAQ.Question>How can my organization become a GitHub for Startups partner?</FAQ.Question>
                  <FAQ.Answer>
                    <p>
                      Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for
                      Startups program.
                    </p>
                    <p>
                      <InlineLink href="https://www.github.com" target="_blank" rel="noreferrer">
                        Apply here
                      </InlineLink>
                      .
                    </p>
                  </FAQ.Answer>
                </FAQ.Item>
              </FAQ>
            </Stack>
            <Stack
              direction="vertical"
              padding="none"
              gap="spacious"
              style={{gap: 'var(--base-size-96)', margin: 'var(--base-size-96) auto 0'}}
            >
              <Grid style={{justifyItems: 'center'}}>
                <Grid.Column>
                  <Stack alignItems="center">
                    <Heading as="h2" size="3">
                      Testimonials
                    </Heading>
                  </Stack>
                </Grid.Column>
                <Grid.Column>
                  <Grid enableOverlay={enableGridOverlay}>
                    <Grid.Column
                      span={{
                        xsmall: 12,
                        large: 8
                      }}
                      start={{
                        xsmall: 1,
                        large: 3
                      }}
                    >
                      <Testimonial
                        size="large"
                        animate={{
                          variant: 'slide-in-left'
                        }}
                      >
                        <Testimonial.Quote>
                          GitHub helps us ensure that we have our security controls baked into our pipelines all the way
                          from the first line of code we&apos;re writing.
                        </Testimonial.Quote>
                        <Testimonial.Name>David Ross</Testimonial.Name>
                        <Testimonial.Logo>
                          <Image
                            alt="GitHub Logo"
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
                            width={60}
                          />
                        </Testimonial.Logo>
                      </Testimonial>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid>
            </Stack>

            <Grid enableOverlay={enableGridOverlay} style={{margin: 'var(--base-size-96) auto 0'}}>
              <Grid.Column
                span={{
                  xsmall: 12,
                  large: 4
                }}
              >
                <Testimonial
                  animate={{
                    variant: 'slide-in-right'
                  }}
                >
                  <Testimonial.Quote>
                    GitHub helps us ensure that we have our security controls baked into our pipelines all the way from
                    the first line of code we&apos;re writing.
                  </Testimonial.Quote>
                  <Testimonial.Name>David Ross</Testimonial.Name>
                  <Testimonial.Logo>
                    <Image
                      alt="GitHub Logo"
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
                      width={60}
                    />
                  </Testimonial.Logo>
                </Testimonial>
              </Grid.Column>
              <Grid.Column
                span={{
                  xsmall: 12,
                  large: 4
                }}
              >
                <Testimonial
                  animate={{
                    variant: 'slide-in-right'
                  }}
                >
                  <Testimonial.Quote>
                    GitHub helps us ensure that we have our security controls baked into our pipelines all the way from
                    the first line of code we&apos;re writing.
                  </Testimonial.Quote>
                  <Testimonial.Name>David Ross</Testimonial.Name>
                  <Testimonial.Logo>
                    <Image
                      alt="GitHub Logo"
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
                      width={60}
                    />
                  </Testimonial.Logo>
                </Testimonial>
              </Grid.Column>
              <Grid.Column
                span={{
                  xsmall: 12,
                  large: 4
                }}
              >
                <Testimonial
                  animate={{
                    variant: 'slide-in-right'
                  }}
                >
                  <Testimonial.Quote>
                    GitHub helps us ensure that we have our security controls baked into our pipelines all the way from
                    the first line of code we&apos;re writing.
                  </Testimonial.Quote>
                  <Testimonial.Name>David Ross</Testimonial.Name>
                  <Testimonial.Logo>
                    <Image
                      alt="GitHub Logo"
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
                      width={60}
                    />
                  </Testimonial.Logo>
                </Testimonial>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </AnimationProvider>
      <AnimationProvider runOnce={false}>
        <ThemeProvider colorMode="dark">
          <div
            style={{
              backgroundColor: 'var(--brand-color-canvas-default)',
              paddingTop: 'var(--base-size-24)',
              paddingBottom: 'var(--base-size-24)',
              marginTop: 'var(--base-size-64)'
            }}
          >
            <Grid enableOverlay={enableGridOverlay} style={{margin: 'var(--base-size-96) auto'}}>
              <Grid.Column
                span={{
                  xsmall: 12,
                  large: 6
                }}
                start={{
                  xsmall: 1,
                  large: 4
                }}
              >
                <form
                  style={{
                    margin: '3rem auto 5rem'
                  }}
                >
                  <Stack direction="vertical" padding="none" gap="normal">
                    <Heading as="h3">Get started</Heading>

                    <Grid enableOverlay={enableGridOverlay}>
                      <Grid.Column
                        span={{
                          xsmall: 3,
                          small: 2,
                          large: 3
                        }}
                      >
                        <FormControl fullWidth>
                          <FormControl.Label>Title</FormControl.Label>
                          <Select defaultValue="">
                            <Select.Option value="" disabled>
                              Title
                            </Select.Option>
                            <Select.Option value="miss">Miss</Select.Option>
                            <Select.Option value="mr">Mr</Select.Option>
                            <Select.Option value="mrs">Mrs</Select.Option>
                            <Select.Option value="mx">Mx</Select.Option>
                          </Select>
                        </FormControl>
                      </Grid.Column>
                      <Grid.Column
                        span={{
                          xsmall: 4,
                          small: 5,
                          large: 4
                        }}
                      >
                        <FormControl fullWidth required>
                          <FormControl.Label>First name</FormControl.Label>
                          <TextInput required />
                        </FormControl>
                      </Grid.Column>
                      <Grid.Column
                        span={{
                          xsmall: 5,
                          small: 5,
                          large: 5
                        }}
                      >
                        <FormControl fullWidth required>
                          <FormControl.Label>Last name</FormControl.Label>
                          <TextInput required />
                        </FormControl>
                      </Grid.Column>
                    </Grid>

                    <FormControl fullWidth required>
                      <FormControl.Label>Enterprise name</FormControl.Label>
                      <TextInput required />
                    </FormControl>

                    <FormControl fullWidth required>
                      <FormControl.Label>Enterprise URL</FormControl.Label>
                      <TextInput leadingText="github.com/" required />
                    </FormControl>

                    <FormControl fullWidth required>
                      <FormControl.Label>Country</FormControl.Label>
                      <Select defaultValue="">
                        <Select.Option value="" disabled>
                          Country
                        </Select.Option>
                        <Select.Option value="us">United States of America</Select.Option>
                        <Select.Option value="uk">United Kingdom</Select.Option>
                      </Select>
                    </FormControl>
                    <Heading as="h4" size="6">
                      Number of users
                    </Heading>
                    {/* Todo convert to a fieldset */}
                    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} padding="none">
                      <FormControl>
                        <FormControl.Label>0-99</FormControl.Label>
                        <Radio name="user-band" value="0-99" />
                      </FormControl>
                      <FormControl>
                        <FormControl.Label>100-499</FormControl.Label>
                        <Radio name="user-band" value="100-499" />
                      </FormControl>
                      <FormControl>
                        <FormControl.Label>500-999</FormControl.Label>
                        <Radio name="user-band" value="500-999" />
                      </FormControl>
                      <FormControl>
                        <FormControl.Label>1000+</FormControl.Label>
                        <Radio name="user-band" value="1000+" />
                      </FormControl>
                    </Stack>
                    <FormControl hasBorder required>
                      <FormControl.Label>
                        Contact me about GitHub Enterprise Server{' '}
                        <FormControl.Hint>
                          <Text size="200" variant="muted">
                            I&apos;m interested in learning more about{' '}
                            <InlineLink size="200" href="https://github.com/enterprise" target="_blank">
                              GitHub Enterprise Server
                            </InlineLink>{' '}
                            and would like to be contacted by GitHub’s sales team.
                          </Text>
                        </FormControl.Hint>
                      </FormControl.Label>
                      <Checkbox />
                    </FormControl>
                    <div
                      style={{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'var(--brand-control-color-border-default)',
                        backgroundColor: 'var(--brand-color-canvas-inset)',
                        height: 150,
                        width: '100%',
                        borderRadius: 6,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Text size="200" variant="muted">
                        Captcha
                      </Text>
                    </div>
                    <FormControl required>
                      <FormControl.Label>
                        <Text size="200" variant="muted">
                          I hereby accept the{' '}
                          <InlineLink size="200" href="https://github.com/customer-terms" target="_blank">
                            GitHub Customer Agreement
                          </InlineLink>{' '}
                          on behalf of my organization and confirm that I have the authority to do so. For more
                          information about GitHub&apos;s privacy practices, see the{' '}
                          <InlineLink
                            size="200"
                            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                            target="_blank"
                          >
                            GitHub Privacy Statement.
                          </InlineLink>{' '}
                        </Text>
                      </FormControl.Label>

                      <Checkbox />
                    </FormControl>
                    <Grid enableOverlay={enableGridOverlay}>
                      <Grid.Column
                        span={{
                          xsmall: 12,
                          medium: 4
                        }}
                        start={{
                          xsmall: 1,
                          medium: 9
                        }}
                      >
                        <Button variant="primary" type="submit" style={{width: '100%'}}>
                          Start trial
                        </Button>
                      </Grid.Column>
                    </Grid>
                  </Stack>
                </form>
              </Grid.Column>
            </Grid>
          </div>
        </ThemeProvider>
      </AnimationProvider>
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
            height: '100%'
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
