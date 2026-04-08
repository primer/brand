import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../../fixtures/images/placeholder.png'
import shopifyLogo from '../../fixtures/images/logos/shopify.png'
import vercelLogo from '../../fixtures/images/logos/vercel.png'

import {RiverBreakout} from '.'
import {Box, Card, Grid, Link, Section, Stack, Statistic, Testimonial, Text, Timeline} from '../..'

const meta = {
  title: 'Components/RiverBreakout/Features',
  component: RiverBreakout,
  decorators: [
    Story => (
      <Grid>
        <Grid.Column>
          <Story />
        </Grid.Column>
      </Grid>
    ),
  ],
} satisfies Meta<typeof RiverBreakout>

export default meta

type Story = StoryObj

export const HighlightedPortion: Story = {
  render: () => (
    <Section>
      <RiverBreakout>
        <RiverBreakout.A11yHeading>River breakout highlight</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        </RiverBreakout.Visual>
        <RiverBreakout.Content
          trailingComponent={() => (
            <Timeline>
              <Timeline.Item>
                <b>GitHub Codespaces</b> offers a complete dev environment in seconds.
              </Timeline.Item>
              <Timeline.Item>
                <b>GitHub Copilot</b> is your AI pair programmer that empowers you to complete tasks.
              </Timeline.Item>
            </Timeline>
          )}
        >
          <Text>
            <b>This first sentence is a river breakout headline.</b> And this is where the body copy starts. Remember to
            keep these nice and succinct.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverBreakout.Content>
      </RiverBreakout>
    </Section>
  ),
}

export const WithoutTrailingComponent: Story = {
  render: () => (
    <Section>
      <RiverBreakout>
        <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        </RiverBreakout.Visual>
        <RiverBreakout.Content>
          <Text>
            Accelerate your workflows and scale your business fast with access to millions of open source projects on
            GitHub, the largest source code host.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverBreakout.Content>
      </RiverBreakout>
    </Section>
  ),
}

export const GridLine: Story = {
  name: 'GridLine variant',
  render: () => (
    <Section>
      <RiverBreakout variant="gridline">
        <RiverBreakout.A11yHeading>River breakout highlight</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        </RiverBreakout.Visual>
        <RiverBreakout.Content
          trailingComponent={() => (
            <Stack gap="normal">
              <Text as="p" variant="muted">
                <Text variant="default">Deals with your issues.</Text> When assigned issues, GitHub Copilot plans,
                writes, tests, and iterates.
              </Text>
              <Text as="p" variant="muted">
                <Text variant="default">Codes like an insider.</Text> GitHub Copilot hooks into MCP servers to draw on
                data from your repositories and external resources.
              </Text>
              <Text as="p" variant="muted">
                <Text variant="default">Human and agent in the loop.</Text>
                Comment to guide GitHub Copilot, polish your code for merge, or take over locally in your IDE.
              </Text>
            </Stack>
          )}
          trailingComponentDivider
        >
          <Text>
            <b>This first sentence is a river breakout headline.</b> And this is where the body copy starts. Remember to
            keep these nice and succinct.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverBreakout.Content>
      </RiverBreakout>
    </Section>
  ),
}

export const GridLineWithBackground: Story = {
  name: 'GridLine variant (with background)',
  render: () => (
    <Section>
      <RiverBreakout variant="gridline">
        <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual imageBackgroundColor="subtle">
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        </RiverBreakout.Visual>
        <RiverBreakout.Content
          trailingComponent={() => (
            <Stack gap="normal">
              <Text as="p" variant="muted">
                <Text variant="default">Deals with your issues.</Text> When assigned issues, GitHub Copilot plans,
                writes, tests, and iterates.
              </Text>
              <Text as="p" variant="muted">
                <Text variant="default">Codes like an insider.</Text> GitHub Copilot hooks into MCP servers to draw on
                data from your repositories and external resources.
              </Text>
              <Text as="p" variant="muted">
                <Text variant="default">Human and agent in the loop.</Text>
                Comment to guide GitHub Copilot, polish your code for merge, or take over locally in your IDE.
              </Text>
            </Stack>
          )}
          trailingComponentDivider
        >
          <Text>
            Accelerate your workflows and scale your business fast with access to millions of open source projects on
            GitHub, the largest source code host.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverBreakout.Content>
      </RiverBreakout>
    </Section>
  ),
}

export const GridLineWithCardsTrailingComponent: Story = {
  name: 'GridLine variant (cards trailing component)',
  render: () => (
    <Section>
      <RiverBreakout variant="gridline">
        <RiverBreakout.A11yHeading>Customer stories</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        </RiverBreakout.Visual>
        <RiverBreakout.Content
          trailingComponent={() => (
            <Stack gap="normal" padding="none">
              <Box padding="normal">
                <Card href="https://github.com" variant="minimal" fullWidth disableAnimation ctaText="Learn more">
                  <Card.Image src={shopifyLogo} alt="Shopify logo" width={88} />
                  <Card.Heading>Duolingo boosts developer speed by 25% with GitHub Copilot</Card.Heading>
                </Card>
              </Box>
              <Box borderBlockStartWidth="thin" borderColor="muted" borderStyle="solid">
                <Box padding="normal" paddingBlockStart="none">
                  <Card href="https://github.com" variant="minimal" fullWidth disableAnimation ctaText="Learn more">
                    <Card.Image src={vercelLogo} alt="Vercel logo" width={88} />
                    <Card.Heading>Teams deliver secure code faster with GitHub Copilot</Card.Heading>
                  </Card>
                </Box>
              </Box>
            </Stack>
          )}
          trailingComponentDivider
        >
          <Text>
            <b>Read how teams are shipping faster with GitHub Copilot.</b> Explore customer stories and practical
            implementation details from real-world engineering organizations.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverBreakout.Content>
      </RiverBreakout>
    </Section>
  ),
}

export const GridLineWithTestimonialTrailingComponent: Story = {
  name: 'GridLine variant (testimonial trailing component)',
  render: () => (
    <Section>
      <RiverBreakout variant="gridline">
        <RiverBreakout.A11yHeading>Customer testimonial</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        </RiverBreakout.Visual>
        <RiverBreakout.Content
          trailingComponent={() => (
            <Testimonial variant="minimal" hasBorder={false} quoteMarkColor="default">
              <Testimonial.Quote>
                We have all our source code, issues, and pull requests in one place. GitHub is a platform that enables
                us to do our best work.
              </Testimonial.Quote>
              <Testimonial.Name position="IT Principal Product Manager">Jasmine Ramos</Testimonial.Name>
            </Testimonial>
          )}
          trailingComponentDivider
        >
          <Text>
            <b>Hear directly from engineering leaders using GitHub Copilot.</b> Build confidence with concise customer
            proof points that support the primary river breakout message.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverBreakout.Content>
      </RiverBreakout>
    </Section>
  ),
}

export const GridLineWithStatisticsTrailingComponent: Story = {
  name: 'GridLine variant (statistics trailing component)',
  render: () => (
    <Section>
      <RiverBreakout variant="gridline">
        <RiverBreakout.A11yHeading>Security impact metrics</RiverBreakout.A11yHeading>
        <RiverBreakout.Visual>
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        </RiverBreakout.Visual>
        <RiverBreakout.Content
          trailingComponent={() => (
            <Stack gap="normal" padding="none">
              <Box padding="normal">
                <Statistic>
                  <Statistic.Heading weight="normal" size="800" style={{color: 'var(--brand-color-text-emphasized)'}}>
                    55%
                  </Statistic.Heading>
                  <Statistic.Description font="monospace" size="100">
                    At vero eos et accusamus et iusto odio dignissimos
                  </Statistic.Description>
                </Statistic>
              </Box>
              <Box borderBlockStartWidth="thin" borderColor="muted" borderStyle="solid">
                <Box padding="normal" paddingBlockStart="spacious">
                  <Statistic>
                    <Statistic.Heading weight="normal" size="800" style={{color: 'var(--brand-color-text-emphasized)'}}>
                      90% coverage
                    </Statistic.Heading>
                    <Statistic.Description font="monospace" size="100">
                      of alert types in all supported languages with Copilot Autofix
                    </Statistic.Description>
                  </Statistic>
                </Box>
              </Box>
            </Stack>
          )}
          trailingComponentDivider
        >
          <Text>
            <b>Highlight measurable outcomes with compact stats.</b> Bring key performance and security metrics into the
            trailing slot without introducing custom layout components.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverBreakout.Content>
      </RiverBreakout>
    </Section>
  ),
}
