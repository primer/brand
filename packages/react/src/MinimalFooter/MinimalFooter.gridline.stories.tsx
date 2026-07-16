import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {MinimalFooter} from '.'
import {InlineLink, Stack, Text, ThemeProvider} from '../'

export default {
  title: 'Components/MinimalFooter/Features/GridLine variants',
  component: MinimalFooter,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MinimalFooter>

type Story = StoryObj<typeof MinimalFooter>

/**
 * Legal link labels and copyright wording below are taken verbatim from the canonical
 * Figma reference (file hUT1gnfCRTX7iPZSjOg8Vp, component set 8024:150002 "Footer -
 * Minimal") so the representative/fully-populated stories are as close a match as
 * possible for side-by-side comparison.
 */
const GridlineRepresentativeContent = () => (
  <MinimalFooter variant="gridline" logoVariant="logomark">
    <MinimalFooter.Link href="#">Sitemap</MinimalFooter.Link>
    <MinimalFooter.Link href="#">What is Git?</MinimalFooter.Link>
    <MinimalFooter.Link href="#">Manage cookies</MinimalFooter.Link>
    <MinimalFooter.Link href="#">Do not share my personal information</MinimalFooter.Link>
  </MinimalFooter>
)

export const Gridline1600: Story = {
  name: 'Gridline variant (1600px)',
  render: () => <GridlineRepresentativeContent />,
}

export const Gridline800: Story = {
  name: 'Gridline variant (800px)',
  render: () => <GridlineRepresentativeContent />,
}

export const Gridline390: Story = {
  name: 'Gridline variant (390px)',
  render: () => <GridlineRepresentativeContent />,
}

export const GridlineDark1600: Story = {
  name: 'Gridline variant (dark) (1600px)',
  render: () => (
    <ThemeProvider colorMode="dark">
      <GridlineRepresentativeContent />
    </ThemeProvider>
  ),
}

export const GridlineDark800: Story = {
  name: 'Gridline variant (dark) (800px)',
  render: () => (
    <ThemeProvider colorMode="dark">
      <GridlineRepresentativeContent />
    </ThemeProvider>
  ),
}

export const GridlineDark390: Story = {
  name: 'Gridline variant (dark) (390px)',
  render: () => (
    <ThemeProvider colorMode="dark">
      <GridlineRepresentativeContent />
    </ThemeProvider>
  ),
}

/**
 * Worst-case wrapping composition: every optional region populated at once (two
 * footnotes, Content, Back to Top), the maximum five legal links with realistic
 * (non-trivial) lengths, all eight social links, and a longer custom copyright
 * statement - to stress-test wrapping/ordering at each reference width.
 */
const GridlineFullyPopulatedContent = () => (
  <MinimalFooter
    variant="gridline"
    logoVariant="logomark"
    copyrightStatement="GitHub, Inc. © 2025. All rights reserved. A Microsoft subsidiary."
  >
    <MinimalFooter.Footnotes>
      <Text>
        <sup>1</sup>By signing up, GitHub may use your information to personalize and measure the effectiveness of
        enterprise business ads, including those you see off of GitHub, promotional communications or marketing you
        receive related to the Enterprise Marketing Pages. We will send you relevant emails and promotional information
        based on your GitHub profile and any additional information provided in the sign-up form. If you change your
        mind, you can unsubscribe at any time (an unsubscribe link is provided in every email). For more information on
        how GitHub uses your personal information, please see the{' '}
        <InlineLink
          href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
          target="_blank"
        >
          GitHub Privacy Statement
        </InlineLink>
        .
      </Text>
      <Text>
        <sup>2</sup>Additional terms and conditions may apply to specific products and services. Please review each
        product&apos;s specific terms for more information.
      </Text>
    </MinimalFooter.Footnotes>
    <MinimalFooter.Content>
      <Stack direction="horizontal" gap="condensed" padding="none">
        <Text size="200" variant="muted">
          Status:
        </Text>
        <InlineLink href="https://www.githubstatus.com">All systems operational</InlineLink>
      </Stack>
    </MinimalFooter.Content>
    <MinimalFooter.BackToTop />
    <MinimalFooter.Link href="#">Sitemap</MinimalFooter.Link>
    <MinimalFooter.Link href="#">What is Git?</MinimalFooter.Link>
    <MinimalFooter.Link href="#">Manage cookies</MinimalFooter.Link>
    <MinimalFooter.Link href="#">Do not share or sell my personal information</MinimalFooter.Link>
    <MinimalFooter.Link href="#">Terms of Service</MinimalFooter.Link>
  </MinimalFooter>
)

export const GridlineFullyPopulated1600: Story = {
  name: 'Gridline variant (fully populated) (1600px)',
  render: () => <GridlineFullyPopulatedContent />,
}

export const GridlineFullyPopulated800: Story = {
  name: 'Gridline variant (fully populated) (800px)',
  render: () => <GridlineFullyPopulatedContent />,
}

export const GridlineFullyPopulated390: Story = {
  name: 'Gridline variant (fully populated) (390px)',
  render: () => <GridlineFullyPopulatedContent />,
}

export const GridlineLogo: Story = {
  name: 'Gridline variant (logo) (1600px)',
  render: () => (
    <MinimalFooter variant="gridline" logoVariant="logo">
      <MinimalFooter.Link href="#">Sitemap</MinimalFooter.Link>
      <MinimalFooter.Link href="#">What is Git?</MinimalFooter.Link>
      <MinimalFooter.Link href="#">Manage cookies</MinimalFooter.Link>
    </MinimalFooter>
  ),
}

export const GridlineWithContent: Story = {
  name: 'Gridline variant (with Content) (1600px)',
  render: () => (
    <MinimalFooter variant="gridline" logoVariant="logomark">
      <MinimalFooter.Content>
        <Stack direction="horizontal" gap="condensed" padding="none">
          <Text size="200" variant="muted">
            Status:
          </Text>
          <InlineLink href="https://www.githubstatus.com">All systems operational</InlineLink>
        </Stack>
      </MinimalFooter.Content>
      <MinimalFooter.Link href="#">Sitemap</MinimalFooter.Link>
      <MinimalFooter.Link href="#">What is Git?</MinimalFooter.Link>
    </MinimalFooter>
  ),
}

export const GridlineWithBackToTop: Story = {
  name: 'Gridline variant (with Back to Top) (1600px)',
  render: () => (
    <MinimalFooter variant="gridline" logoVariant="logomark">
      <MinimalFooter.BackToTop />
      <MinimalFooter.Link href="#">Sitemap</MinimalFooter.Link>
      <MinimalFooter.Link href="#">What is Git?</MinimalFooter.Link>
    </MinimalFooter>
  ),
}

export const GridlineNoSocialLinks: Story = {
  name: 'Gridline variant (no social links) (1600px)',
  render: () => (
    <MinimalFooter variant="gridline" logoVariant="logomark" socialLinks={false}>
      <MinimalFooter.Link href="#">Sitemap</MinimalFooter.Link>
      <MinimalFooter.Link href="#">What is Git?</MinimalFooter.Link>
    </MinimalFooter>
  ),
}

export const GridlineFilteredSocialLinks: Story = {
  name: 'Gridline variant (filtered social links) (1600px)',
  render: () => (
    <MinimalFooter variant="gridline" logoVariant="logomark" socialLinks={['facebook', 'x']}>
      <MinimalFooter.Link href="#">Sitemap</MinimalFooter.Link>
      <MinimalFooter.Link href="#">What is Git?</MinimalFooter.Link>
    </MinimalFooter>
  ),
}

export const GridlineEmptyOptionalRegions: Story = {
  name: 'Gridline variant (empty optional regions) (1600px)',
  render: () => <MinimalFooter variant="gridline" logoVariant="logomark" />,
}
