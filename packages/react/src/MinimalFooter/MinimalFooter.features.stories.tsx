import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {CheckCircleFillIcon} from '@primer/octicons-react'
import {expect, within} from 'storybook/test'
import {MinimalFooter} from '.'
import {InlineLink, Text, ThemeProvider, Token} from '..'
import {RedlineBackground} from '../component-helpers'

export default {
  title: 'Components/MinimalFooter/Features',
  component: MinimalFooter,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MinimalFooter>

type Story = StoryObj<typeof MinimalFooter>

export const MultipleFootnotes: Story = {
  render: () => (
    <MinimalFooter socialLinks={false}>
      <MinimalFooter.Footnotes>
        <Text>
          <sup>1</sup>By signing up, GitHub may use your information to personalize and measure the effectiveness of
          enterprise business ads, including those you see off of GitHub, promotional communications or marketing you
          receive related to the Enterprise Marketing Pages. We will send you relevant emails and promotional
          information based on your GitHub profile and any additional information provided in the sign-up form. If you
          change your mind, you can unsubscribe at any time (an unsubscribe link is provided in every email). For more
          information on how GitHub uses your personal information, please see the GitHub Privacy Statement.
        </Text>
        <Text>
          <sup>2</sup>By signing up, GitHub may use your information to personalize and measure the effectiveness of
          enterprise business ads, including those you see off of GitHub, promotional communications or marketing you
          receive related to the Enterprise Marketing Pages. We will send you relevant emails and promotional
          information based on your GitHub profile and any additional information provided in the sign-up form. If you
          change your mind, you can unsubscribe at any time (an unsubscribe link is provided in every email). For more
          information on how GitHub uses your personal information, please see the{' '}
          <InlineLink
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
          >
            GitHub Privacy Statement
          </InlineLink>
          .
        </Text>
      </MinimalFooter.Footnotes>
      <MinimalFooter.Link href="https://github.com/organizations/enterprise_plan">
        Try GitHub for free
      </MinimalFooter.Link>
      <MinimalFooter.Link href="https://github.com/enterprise">Enterprise</MinimalFooter.Link>
      <MinimalFooter.Link href="https://github.com/enterprise/contact">Email us</MinimalFooter.Link>
    </MinimalFooter>
  ),
}

export const MaximumLinks: Story = {
  name: 'Maximum Links (5)',
  render: () => (
    <MinimalFooter socialLinks={false}>
      <MinimalFooter.Link href="#">Link one</MinimalFooter.Link>
      <MinimalFooter.Link href="#">Link two</MinimalFooter.Link>
      <MinimalFooter.Link href="#">Link three</MinimalFooter.Link>
      <MinimalFooter.Link href="#">Link four</MinimalFooter.Link>
      <MinimalFooter.Link href="#">Link five</MinimalFooter.Link>
      <MinimalFooter.Link href="#">Link six</MinimalFooter.Link>
      <MinimalFooter.Link href="#">Link seven</MinimalFooter.Link>
    </MinimalFooter>
  ),
}

export const MixedButtonsAndLinks: Story = {
  render: () => (
    <MinimalFooter socialLinks={false}>
      <MinimalFooter.Link href="#">Link one</MinimalFooter.Link>
      <MinimalFooter.Link as="button" onClick={() => alert('You have clicked Button one')}>
        Button one
      </MinimalFooter.Link>
      <MinimalFooter.Link as="button" onClick={() => alert('You have clicked Button two')}>
        Button two
      </MinimalFooter.Link>
      <MinimalFooter.Link as="button" onClick={() => alert('You have clicked Button three')}>
        Button three
      </MinimalFooter.Link>
    </MinimalFooter>
  ),
}

export const NoSocialLinks: Story = {
  render: () => <MinimalFooter socialLinks={false} />,
}

export const FilteredSocialLinks: Story = {
  render: () => <MinimalFooter socialLinks={['facebook', 'x']} />,
}

export const ReversedSocialLinks: Story = {
  render: () => (
    <MinimalFooter socialLinks={['instagram', 'tiktok', 'twitch', 'facebook', 'youtube', 'linkedin', 'github', 'x']} />
  ),
}

export const DefaultNarrow: Story = {
  name: 'Default, narrow view (mobile)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: () => (
    <MinimalFooter>
      <MinimalFooter.Footnotes>
        <Text>
          <sup>1</sup>By signing up, GitHub may use your information to personalize and measure the effectiveness of
          enterprise business ads, including those you see off of GitHub, promotional communications or marketing you
          receive related to the Enterprise Marketing Pages. We will send you relevant emails and promotional
          information based on your GitHub profile and any additional information provided in the sign-up form. If you
          change your mind, you can unsubscribe at any time (an unsubscribe link is provided in every email). For more
          information on how GitHub uses your personal information, please see the{' '}
          <InlineLink
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
          >
            GitHub Privacy Statement
          </InlineLink>
          .
        </Text>
      </MinimalFooter.Footnotes>
      <MinimalFooter.Link href="https://github.com/organizations/enterprise_plan">
        Try GitHub for free
      </MinimalFooter.Link>
      <MinimalFooter.Link href="https://github.com/enterprise">Enterprise</MinimalFooter.Link>
      <MinimalFooter.Link href="https://github.com/enterprise/contact">Email us</MinimalFooter.Link>
    </MinimalFooter>
  ),
  play: async ({canvasElement}) => {
    const socialLinks = within(canvasElement).getByRole('list')
    const bottom = socialLinks.closest('section')
    const container = bottom?.firstElementChild

    if (!container) {
      throw new Error('Expected the social footer layout to render')
    }

    expect(socialLinks.getBoundingClientRect().right).toBeLessThanOrEqual(container.getBoundingClientRect().right)
    expect(document.documentElement.scrollWidth).toBe(document.documentElement.clientWidth)
  },
}

export const DarkTheme: Story = {
  render: () => (
    <ThemeProvider colorMode="dark">
      <MinimalFooter>
        <MinimalFooter.Footnotes>
          <Text>
            <sup>1</sup>Footnotes remain visually distinct from the footer content in dark mode.
          </Text>
        </MinimalFooter.Footnotes>
      </MinimalFooter>
    </ThemeProvider>
  ),
}

export const CustomContent: Story = {
  render: () => (
    <MinimalFooter
      centerComponent={
        <Token as="a" href="https://www.githubstatus.com" variant="accent" leadingVisual={<CheckCircleFillIcon />}>
          All systems operational
        </Token>
      }
    />
  ),
}

export const BackToTop: Story = {
  render: () => (
    <main>
      <RedlineBackground style={{height: '120vh'}}>
        <Text as="p" align="center" weight="semibold">
          Scroll down to test the back-to-top functionality
        </Text>
      </RedlineBackground>
      <MinimalFooter>
        <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
      </MinimalFooter>
    </main>
  ),
}

const ResponsiveExample = ({socialLinks = true}: {socialLinks?: boolean}) => (
  <MinimalFooter
    centerComponent={
      <Token as="a" href="https://www.githubstatus.com" variant="accent" leadingVisual={<CheckCircleFillIcon />}>
        All systems operational
      </Token>
    }
    copyrightStatement="GitHub, Inc. © 2026. All rights reserved."
    socialLinks={socialLinks ? undefined : false}
  >
    <MinimalFooter.Footnotes>
      <Text>
        <sup>1</sup>Additional terms may apply. See the{' '}
        <InlineLink href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">
          GitHub Privacy Statement
        </InlineLink>
        .
      </Text>
    </MinimalFooter.Footnotes>
    <MinimalFooter.BackToTop>Back to top</MinimalFooter.BackToTop>
    <MinimalFooter.Link href="#">Sitemap</MinimalFooter.Link>
    <MinimalFooter.Link href="#">What is Git?</MinimalFooter.Link>
    <MinimalFooter.Link href="#">Manage cookies</MinimalFooter.Link>
    <MinimalFooter.Link href="#">Privacy choices</MinimalFooter.Link>
    <MinimalFooter.Link href="#">Terms of Service</MinimalFooter.Link>
  </MinimalFooter>
)

export const NarrowView: Story = {
  name: 'Narrow view (mobile)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: () => <ResponsiveExample />,
}

export const RegularView: Story = {
  name: 'Regular view (tablet)',
  globals: {
    viewport: {value: 'ipad10p'},
  },
  render: () => <ResponsiveExample />,
}

export const NarrowViewNoSocialLinks: Story = {
  name: 'Narrow view, no social links (mobile)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: () => <ResponsiveExample socialLinks={false} />,
}

export const RegularViewNoSocialLinks: Story = {
  name: 'Regular view, no social links (tablet)',
  globals: {
    viewport: {value: 'ipad10p'},
  },
  render: () => <ResponsiveExample socialLinks={false} />,
}
