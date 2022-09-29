import {useRef} from 'react'
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
  Checkbox,
  Select,
  Button,
  SubdomainNavBar
} from './'
import '@primer/react-brand/lib/css/main.css'

export default function KitchenSink() {
  const inputRef = useRef()

  const mockHandler = () => {}

  return (
    <>
      <SubdomainNavBar title="Subdomain">
        <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#">Topics</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#">Events</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#">Video</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#">Social</SubdomainNavBar.Link>
        <SubdomainNavBar.Search ref={inputRef} onChange={mockHandler} onSubmit={mockHandler} />
        <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
        <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
      </SubdomainNavBar>
      <div style={{maxWidth: 1280, margin: '0 auto'}}>
        <Hero
          heading="This is my super sweet hero heading"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum."
          primaryAction={{
            text: 'Primary action',
            href: '#'
          }}
          secondaryAction={{
            text: 'Secondary action',
            href: '#'
          }}
          align="center"
        />
        <River>
          <River.Visual>
            <img
              src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
              alt="placeholder, blank area with an off-white background color"
            />
          </River.Visual>
          <River.Content>
            <Heading>Heading</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>
        <River align="end">
          <River.Visual>
            <img
              src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
              alt="placeholder, blank area with an off-white background color"
            />
          </River.Visual>
          <River.Content>
            <Heading>Heading</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>
        <River align="center">
          <River.Visual>
            <img
              src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
              alt="placeholder, blank area with an off-white background color"
            />
          </River.Visual>
          <River.Content>
            <Heading>Heading</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>
        <FAQ>
          <FAQ.Heading>Frequently asked questions</FAQ.Heading>
          <FAQ.Item>
            <FAQ.Question>What&apos;s included in the GitHub for Startups offer?</FAQ.Question>
            <FAQ.Answer>
              <p>
                All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and
                50% off year two. Learn more about the features and capabilities of GitHub Enterprise{' '}
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
                If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise,
                please feel to sign up for a trial
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
      </div>
      <ThemeProvider colorMode="dark">
        <div
          style={{
            backgroundColor: 'var(--brand-color-canvas-default)',
            padding: 'var(--base-size-24)',
            marginTop: 'var(--base-size-64)'
          }}
        >
          <form
            style={{
              margin: '3rem auto 5rem',
              maxWidth: 600,
              alignItems: 'center',
              display: 'grid',
              gap: 48
            }}
          >
            <Heading as="h3">Get started</Heading>
            <div
              style={{
                alignItems: 'center',
                display: 'grid',
                gap: 16,
                paddingBottom: 3
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '0.5fr 1fr 1fr',
                  gap: 16
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
                <FormControl fullWidth required>
                  <FormControl.Label>First name</FormControl.Label>
                  <TextInput required />
                </FormControl>
                <FormControl fullWidth required>
                  <FormControl.Label>Last name</FormControl.Label>
                  <TextInput required />
                </FormControl>
              </div>

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
                    on behalf of my organization and confirm that I have the authority to do so. For more information
                    about GitHub&apos;s privacy practices, see the{' '}
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
              <div
                style={{
                  justifyContent: 'end',
                  display: 'inline-grid',
                  gap: 16
                }}
              >
                <Button variant="primary" type="submit">
                  Start trial
                </Button>
              </div>
            </div>
          </form>
        </div>
      </ThemeProvider>
    </>
  )
}
