import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {PricingOptions} from '.'
import {Box, Grid, InlineLink, Stack} from '..'
import imageExample from '../fixtures/images/bento/3.png'
import {SparkleFillIcon} from '@primer/octicons-react'

const decorators = Story => (
  <Box backgroundColor="default" paddingBlockStart="spacious" paddingBlockEnd="spacious" style={{minHeight: '100vh'}}>
    <Grid>
      <Grid.Column span={12}>
        <Story />
      </Grid.Column>
    </Grid>
  </Box>
)

export default {
  title: 'Components/PricingOptions/Features',
  component: PricingOptions,
  decorators: [decorators],
} satisfies Meta<typeof PricingOptions>

type Story = StoryObj<typeof PricingOptions>

export const CardsVariant: Story = {
  render: () => (
    <PricingOptions variant="cards">
      <PricingOptions.Item>
        <PricingOptions.Heading>Free</PricingOptions.Heading>
        <PricingOptions.Description>
          For developers looking to get started with GitHub Copilot.
        </PricingOptions.Description>
        <PricingOptions.Price>0</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={false} hasDivider={false}>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={false} hasDivider={false}>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          Contact sales
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList expanded={false} hasDivider={false}>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>
      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={false} hasDivider={false}>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const DefaultGradientVariant: Story = {
  render: () => (
    <PricingOptions variant="default-gradient">
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>

        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const CardsGradientVariant: Story = {
  render: () => (
    <PricingOptions variant="cards-gradient">
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>

        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const LeadingComponent: Story = {
  render: () => {
    const Image = () => (
      <Box marginBlockEnd={24}>
        <img src={imageExample} alt="Copilot Individual" />
      </Box>
    )

    return (
      <Stack direction="vertical">
        <PricingOptions variant="cards">
          <PricingOptions.Item leadingComponent={<Image />}>
            <PricingOptions.Heading>Copilot</PricingOptions.Heading>
            <PricingOptions.Description>Copilot in the coding environment.</PricingOptions.Description>
            <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
            <PricingOptions.FeatureList>
              <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
            </PricingOptions.FeatureList>
            <PricingOptions.PrimaryAction as="a" href="#">
              Buy now
            </PricingOptions.PrimaryAction>
            <PricingOptions.SecondaryAction as="a" href="#">
              Contact sales
            </PricingOptions.SecondaryAction>
          </PricingOptions.Item>
          <PricingOptions.Item leadingComponent={<Image />}>
            <PricingOptions.Label>Recommended</PricingOptions.Label>
            <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
            <PricingOptions.Description>
              Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
              Enterprise Cloud.
            </PricingOptions.Description>
            <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
            <PricingOptions.FeatureList>
              <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
              <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
            </PricingOptions.FeatureList>
            <PricingOptions.PrimaryAction as="a" href="#">
              Join waitlist
            </PricingOptions.PrimaryAction>
          </PricingOptions.Item>
        </PricingOptions>
      </Stack>
    )
  },
}

export const OneOption: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          Contact sales
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const TwoOptions: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot</PricingOptions.Heading>
        <PricingOptions.Description>Copilot in the coding environment.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          Contact sales
        </PricingOptions.SecondaryAction>
      </PricingOptions.Item>
      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const ThreeOptions: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          Contact sales
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const FourOptions: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Free</PricingOptions.Heading>
        <PricingOptions.Description>
          For developers looking to get started with GitHub Copilot.
        </PricingOptions.Description>
        <PricingOptions.Price>0</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          Contact sales
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>
      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const WithFeatureSets: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Base features</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>

          <PricingOptions.FeatureListGroupHeading>Security</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>

        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>

        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          Contact sales
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Base features</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>

          <PricingOptions.FeatureListGroupHeading>Security</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Base features</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Everything in Copilot Business</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Documentation search and summaries</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Pull request summaries</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code review skills</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListGroupHeading>Security</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const WithIncludedAndExcludedFeatures: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Chat</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Unlimited messages, interactions, and history</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Context-aware coding support and explanations</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">
            Debugging and security remediation assistance
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">
            Repository-based semantic search
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">Access your knowledge base</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListGroupHeading>Code completion</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">
            Fine-tuned models (coming soon)
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>

        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of <InlineLink href="#">popular open source</InlineLink>{' '}
          projects.
        </PricingOptions.Footnote>

        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          Contact sales
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Chat</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Unlimited messages, interactions, and history</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Context-aware coding support and explanations</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Debugging and security remediation assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Repository-based semantic search</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">Access your knowledge base</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListGroupHeading>Code completion</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">
            Fine-tuned models (coming soon)
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Chat</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Unlimited messages, interactions, and history</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Context-aware coding support and explanations</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Debugging and security remediation assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Repository-based semantic search</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Access your knowledge base</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListGroupHeading>Code completion</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Fine-tuned models (coming soon)</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const WithoutFeatures: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const CenterAligned: Story = {
  render: () => (
    <PricingOptions align="center">
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Chat</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Unlimited messages, interactions, and history</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Context-aware coding support and explanations</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Debugging and security remediation assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Repository-based semantic search</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Access your knowledge base</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListGroupHeading>Code completion</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Fine-tuned models (coming soon)</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Chat</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Unlimited messages, interactions, and history</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Context-aware coding support and explanations</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Debugging and security remediation assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Repository-based semantic search</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Access your knowledge base</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListGroupHeading>Code completion</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Fine-tuned models (coming soon)</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListGroupHeading>Chat</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Unlimited messages, interactions, and history</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Context-aware coding support and explanations</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Debugging and security remediation assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Repository-based semantic search</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Access your knowledge base</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListGroupHeading>Code completion</PricingOptions.FeatureListGroupHeading>
          <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Fine-tuned models (coming soon)</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const CollapsedFeatures: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={false}>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          Contact sales
        </PricingOptions.SecondaryAction>

        <PricingOptions.FeatureList expanded={false}>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={false}>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const WithCustomFeatureListHeading: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Base features</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#">
          Contact sales
        </PricingOptions.SecondaryAction>

        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Extended features</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Enterprise-only features</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const WithCustomFeatureListItemLeadingVisual: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList hasDivider={false}>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Code completions
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Chat in IDE and Mobile
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            CLI assistance
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Security vulnerability filter
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>

        <PricingOptions.FeatureList hasDivider={false}>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Everything in Copilot Individual plus:
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Chat in IDE and Mobile
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            CLI assistance
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Security vulnerability filter
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Code referencing
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Public code filter
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            IP indemnity
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}
export const CollapsedFeaturesNoDividers: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={false} hasDivider={false}>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>

        <PricingOptions.FeatureList expanded={false} hasDivider={false}>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={false} hasDivider={false}>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const ExpandedNarrow: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={{narrow: true, regular: true, wide: true}}>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#">
          Buy now
        </PricingOptions.PrimaryAction>

        <PricingOptions.FeatureList expanded={{narrow: true, regular: true, wide: true}}>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={{narrow: true, regular: true, wide: true}}>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const ExpandedTablet: Story = {
  ...ExpandedNarrow,
  globals: {
    viewport: {value: 'ipad'},
  },
}

export const HideFeatureListOnNarrowAndRegular: Story = {
  name: 'Hide feature list on all viewports except wide',
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList expanded={{narrow: false, regular: false, wide: true}}>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>
        <PricingOptions.PrimaryAction as="a" href="#">
          Start a free trial
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const HideFeatureListOnNarrowAndRegularNarrow = {
  ...HideFeatureListOnNarrowAndRegular,
  name: 'Hide feature list on all viewports except wide (narrow)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
}
