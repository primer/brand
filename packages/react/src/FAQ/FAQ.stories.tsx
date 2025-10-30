import React from 'react'
import type {Meta} from '@storybook/react'
import {FAQ} from '.'

export default {
  title: 'Components/FAQ',
  component: FAQ,
} as Meta<typeof FAQ>

export const Default = () => (
  <FAQ>
    <FAQ.Heading align="center">Frequently asked&nbsp;questions</FAQ.Heading>
    <FAQ.Subheading align="start">Subscriptions and payments</FAQ.Subheading>
    <FAQ.Item>
      <FAQ.Question>What&apos;s included in the GitHub for Startups offer?</FAQ.Question>
      <FAQ.Answer>
        <p>
          All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and 50%
          off year two. Learn more about the features and capabilities of GitHub Enterprise{' '}
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
      </FAQ.Answer>
    </FAQ.Item>
    <FAQ.Item>
      <FAQ.Question>Who is eligible to apply?</FAQ.Question>
      <FAQ.Answer>
        <p>Startups who meet the following criteria are eligible to apply for the program:</p>
        <ol>
          <li>Must be associated with a current GitHub for Startups partner.</li>
          <li>Self-funded or funded (Seed-Series A)</li>
          <li>Not a current GitHub Enterprise customer</li>
          <li>Must not have previously received credits for GitHub Enterprise</li>
        </ol>
      </FAQ.Answer>
    </FAQ.Item>
    <FAQ.Item>
      <FAQ.Question>What if my startup is not eligible? Are there other resources for me?</FAQ.Question>
      <FAQ.Answer>
        <p>
          If you&apos;re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise,
          please feel to sign up for a trial
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
      </FAQ.Answer>
    </FAQ.Item>
    <FAQ.Item>
      <FAQ.Question>How can my organization become a GitHub for Startups partner?</FAQ.Question>
      <FAQ.Answer>
        <p>
          Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups
          program.
        </p>
        <p>
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            Apply here
          </a>
          .
        </p>
      </FAQ.Answer>
    </FAQ.Item>
  </FAQ>
)
