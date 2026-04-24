import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {InfoIcon, SparkleFillIcon} from '@primer/octicons-react'

import {PricingOptions} from '.'
import {ActionMenu, Box, Grid, InlineLink, Stack, Text} from '..'
import imageExample from '../fixtures/images/bento/3.png'
import {VisualStudioCodeLogo} from '../fixtures/third-party-logos/VisualStudioCodeLogo'

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
        <PricingOptions.Heading>Pro</PricingOptions.Heading>
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
        <PricingOptions.Heading>Pro+</PricingOptions.Heading>
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
        <PricingOptions.Heading>Max</PricingOptions.Heading>
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

export const ActionsMessage: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Free</PricingOptions.Heading>
        <PricingOptions.Description>A fast way to get started with GitHub Copilot.</PricingOptions.Description>
        <PricingOptions.Price>0</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
          Get started
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#" variant="subtle" hasArrow={false}>
          Open in VS Code
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>50 agent mode or chat requests per month</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>2,000 completions per month</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Access to Haiku 4.5, GPT-5 mini, and more</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Copilot CLI</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Most popular</PricingOptions.Label>
        <PricingOptions.Heading>Pro</PricingOptions.Heading>
        <PricingOptions.Description>Accelerate workflows with GitHub Copilot.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">10</PricingOptions.Price>
        <PricingOptions.ActionsMessage leadingComponent={<InfoIcon />}>
          <Text as="p" size="100">
            <Text as="strong" size="100" weight="semibold">
              Upgrades are paused as we roll out a flexible billing experience.
            </Text>{' '}
            We know this interrupts your flow and appreciate your patience while we get this right.{' '}
            <InlineLink href="#">Learn more</InlineLink>
          </Text>
        </PricingOptions.ActionsMessage>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Everything in Free and:</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Copilot cloud agent</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Copilot code review</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Claude and Codex on GitHub and VS Code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            300 premium requests to use latest models, with the option to buy more1
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Unlimited agent mode and chats with GPT-5 mini2
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Unlimited inline suggestions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Heading>Pro+</PricingOptions.Heading>
        <PricingOptions.Description>Scale with agents and more models.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.ActionsMessage leadingComponent={<InfoIcon />}>
          <Text as="p" size="100">
            <Text as="strong" size="100" weight="semibold">
              Upgrades are paused as we roll out a flexible billing experience.
            </Text>{' '}
            We know this interrupts your flow and appreciate your patience while we get this right.{' '}
            <InlineLink href="#">Learn more</InlineLink>
          </Text>
        </PricingOptions.ActionsMessage>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Everything in Pro and:</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>
            Access to all models, including Claude Opus 4.6 and more
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            5x as many premium requests as Pro to use the latest models, with the option to buy more 1
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-3)"
          >
            Access to GitHub Spark
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const ActionsMessageWithActions: Story = {
  render: () => (
    <PricingOptions variant="cards">
      <PricingOptions.Item>
        <PricingOptions.Heading>Free</PricingOptions.Heading>
        <PricingOptions.Description>A fast way to get started with GitHub Copilot.</PricingOptions.Description>
        <PricingOptions.Price>0</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
          Get started
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#" variant="subtle" hasArrow={false}>
          Open in VS Code
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList hasDivider={false}>
          <PricingOptions.FeatureListItem>50 agent mode or chat requests per month</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>2,000 completions per month</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Access to Haiku 4.5, GPT-5 mini, and more</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Copilot CLI</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Most popular</PricingOptions.Label>
        <PricingOptions.Heading>Pro</PricingOptions.Heading>
        <PricingOptions.Description>Accelerate workflows with GitHub Copilot.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">10</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="button" variant="accent" disabled>
          Upgrade now
        </PricingOptions.PrimaryAction>
        <PricingOptions.ActionsMessage leadingComponent={<InfoIcon />}>
          <Text as="p" size="100">
            <Text as="strong" size="100" weight="semibold">
              Upgrades are paused as we roll out a flexible billing experience.
            </Text>{' '}
            We know this interrupts your flow and appreciate your patience while we get this right.{' '}
            <InlineLink href="#">Learn more</InlineLink>
          </Text>
        </PricingOptions.ActionsMessage>
        <PricingOptions.FeatureList hasDivider={false}>
          <PricingOptions.FeatureListHeading>Everything in Free and:</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Copilot cloud agent</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Copilot code review</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Claude and Codex on GitHub and VS Code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            300 premium requests to use latest models, with the option to buy more1
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Unlimited agent mode and chats with GPT-5 mini2
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Unlimited inline suggestions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>
    </PricingOptions>
  ),
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

export const WithInfoTooltips: Story = {
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
          <PricingOptions.FeatureListItem infoTooltip="Interact with Copilot using natural language.">
            Chat in IDE and Mobile
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem infoTooltip="Get help directly in your terminal.">
            CLI assistance
          </PricingOptions.FeatureListItem>
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
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem infoTooltip="Everything from Pro, and more.">
            Everything in Copilot Individual plus:
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem infoTooltip="Interact with Copilot using natural language.">
            Chat in IDE and Mobile
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem infoTooltip="Get help directly in your terminal.">
            CLI assistance
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem infoTooltip="Lipsumet dolor consectetuor elit sit amet.">
            Security vulnerability filter
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem infoTooltip="Filter out suggestions matching public code.">
            Public code filter
          </PricingOptions.FeatureListItem>
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
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem infoTooltip="Everything from Pro, and more.">
            Everything in Copilot Business plus:
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem infoTooltip="Interact with Copilot using natural language.">
            Chat in IDE and Mobile
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem infoTooltip="Get help directly in your terminal.">
            CLI assistance
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#">
          Join waitlist
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}

export const WithMenuAction: Story = {
  render: () => (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Free</PricingOptions.Heading>
        <PricingOptions.Description>A fast way to get started with GitHub Copilot.</PricingOptions.Description>
        <PricingOptions.Price>0</PricingOptions.Price>
        <PricingOptions.MenuAction>
          <ActionMenu mode="split-button">
            <ActionMenu.Button variant="secondary" as="a" href="#" leadingVisual={<VisualStudioCodeLogo />}>
              Open in your IDE
            </ActionMenu.Button>
            <ActionMenu.Overlay aria-label="More options">
              <ActionMenu.Item as="a" href="#">
                Open in VS Code
              </ActionMenu.Item>
              <ActionMenu.Item as="a" href="#">
                Open in JetBrains
              </ActionMenu.Item>
            </ActionMenu.Overlay>
          </ActionMenu>
        </PricingOptions.MenuAction>
        <PricingOptions.FeatureList expanded={false} hasDivider={false}>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>
    </PricingOptions>
  ),
}
