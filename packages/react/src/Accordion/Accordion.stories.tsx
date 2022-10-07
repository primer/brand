import {ComponentMeta} from '@storybook/react'
import React from 'react'
import {Accordion} from '.'
import {Text, InlineLink} from '../'

export default {
  title: 'Components/Accordion',
  component: Accordion
} as ComponentMeta<typeof Accordion>

export const Default = () => (
  <Accordion>
    <Accordion.Heading>Heading</Accordion.Heading>
    <Accordion.Content>
      <p>Some description</p>
      <p>Some description</p>
    </Accordion.Content>
  </Accordion>
)

export const Composition = () => (
  <>
    <Accordion>
      <Accordion.Heading>What&apos;s included in the GitHub for Startups offer?</Accordion.Heading>
      <Accordion.Content>
        <p>
          All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and 50%
          off year two. Learn more about the features and capabilities of GitHub Enterprise{' '}
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            here
          </InlineLink>
          .
        </p>
      </Accordion.Content>
    </Accordion>
    <Accordion>
      <Accordion.Heading>Who is eligible to apply?</Accordion.Heading>
      <Accordion.Content>
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
      </Accordion.Content>
    </Accordion>
    <Accordion>
      <Accordion.Heading>What if my startup is not eligible? Are there other resources for me?</Accordion.Heading>
      <Accordion.Content>
        <p>
          If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise, please
          feel to sign up for a trial{' '}
          <InlineLink href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            here
          </InlineLink>
          .
        </p>
      </Accordion.Content>
    </Accordion>
    <Accordion>
      <Accordion.Heading>How can my organization become a GitHub for Startups partner?</Accordion.Heading>
      <Accordion.Content>
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
      </Accordion.Content>
    </Accordion>
  </>
)
