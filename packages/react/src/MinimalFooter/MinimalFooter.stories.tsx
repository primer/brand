import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {MinimalFooter} from '.'
import {InlineLink, Text} from '../'

const meta = {
  title: 'Components/MinimalFooter',
  component: MinimalFooter,
} satisfies Meta<typeof MinimalFooter>

export default meta
type Story = StoryObj<typeof MinimalFooter>

export const Playground: Story = {
  render: args => <MinimalFooter {...args} />,
}

export const Default: Story = {
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
}
