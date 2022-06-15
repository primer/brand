import {ComponentMeta} from '@storybook/react'
import React from 'react'
import {FAQ} from '.'
import {Text} from '..'

export default {
  title: 'Components/FAQ',
  component: FAQ
} as ComponentMeta<typeof FAQ>

export const Default = () => (
  <FAQ>
    <FAQ.Heading align="center">Frequently asked&nbsp;questions</FAQ.Heading>
    <FAQ.Subheading align="left">Subscriptions and payments</FAQ.Subheading>
    <FAQ.Question>
      <FAQ.Question.Heading>What&apos;s included in the GitHub for Startups offer?</FAQ.Question.Heading>
      <FAQ.Question.Answer>
        <p>
          All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and 50%
          off year two. Learn more about the features and capabilities of GitHub Enterprise{' '}
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
      </FAQ.Question.Answer>
    </FAQ.Question>
    <FAQ.Question>
      <FAQ.Question.Heading>Who is eligible to apply?</FAQ.Question.Heading>
      <FAQ.Question.Answer>
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
      </FAQ.Question.Answer>
    </FAQ.Question>
    <FAQ.Question>
      <FAQ.Question.Heading>What if my startup is not eligible? Are there other resources for me?</FAQ.Question.Heading>
      <FAQ.Question.Answer>
        <p>
          If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise, please
          feel to sign up for a trial
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
      </FAQ.Question.Answer>
    </FAQ.Question>
    <FAQ.Question>
      <FAQ.Question.Heading>How can my organization become a GitHub for Startups partner?</FAQ.Question.Heading>
      <FAQ.Question.Answer>
        <p>
          Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups
          program.
        </p>
        <p>
          {' '}
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            Apply here
          </a>
          .
        </p>
      </FAQ.Question.Answer>
    </FAQ.Question>
  </FAQ>
)
