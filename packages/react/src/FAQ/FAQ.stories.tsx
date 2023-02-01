import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {FAQ} from '.'
import {Text, InlineLink} from '..'

export default {
  title: 'Components/FAQ',
  component: FAQ
} as ComponentMeta<typeof FAQ>

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
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
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
          If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise, please
          feel to sign up for a trial
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
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
          Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups
          program.
        </p>
        <p>
          {' '}
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            Apply here
          </InlineLink>
          .
        </p>
      </FAQ.Answer>
    </FAQ.Item>
    <FAQ.Item>
      <FAQ.Question>What&apos;s included in the GitHub for Startups offer?</FAQ.Question>
      <FAQ.Answer>
        <p>
          All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and 50%
          off year two. Learn more about the features and capabilities of GitHub Enterprise{' '}
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
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
          If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise, please
          feel to sign up for a trial
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            here
          </InlineLink>
          .
        </p>
      </FAQ.Answer>
    </FAQ.Item>
    <FAQ.Item id="test">
      <FAQ.Question>This is a test of an anchored link to a FAQ item</FAQ.Question>
      <FAQ.Answer>
        <p>
          Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups
          program. If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise,
          please feel to sign up for a trial.
        </p>
        <p>
          Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups
          program. If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise,
          please feel to sign up for a trial.
        </p>
        <p>
          Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups
          program. If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise,
          please feel to sign up for a trial.
        </p>
        <p>
          Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups
          program. If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise,
          please feel to sign up for a trial.
        </p>
        <p>
          Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups
          program. If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise,
          please feel to sign up for a trial. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit
          libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh
          ultricies vehicula ut id elit. Nullam id
        </p>
        <p>
          {' '}
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            Apply here
          </InlineLink>
          .
        </p>
      </FAQ.Answer>
    </FAQ.Item>
  </FAQ>
)
