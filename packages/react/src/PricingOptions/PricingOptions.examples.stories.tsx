import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import {PricingOptions} from '.'
import {Box, Grid, InlineLink} from '..'
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
  title: 'Components/PricingOptions/Examples',
  component: PricingOptions,
  decorators: [decorators],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof PricingOptions>

export const Example1: StoryFn<typeof PricingOptions> = () => {
  return (
    <PricingOptions appearance="gradient">
      <PricingOptions.Item>
        <PricingOptions.Heading>Free</PricingOptions.Heading>
        <PricingOptions.Description>A fast way to get started with GitHub Copilot.</PricingOptions.Description>
        <PricingOptions.Price>0</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>50 agent mode or chat requests per month</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>2,000 completions per month</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem
            leadingVisual={SparkleFillIcon}
            leadingVisualFill="var(--base-color-scale-purple-5)"
          >
            Access to Claude 3.5 Sonnet, GPT-4o, and more
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
          Get started
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#" variant="subtle" hasArrow={false}>
          Open in VS Code
        </PricingOptions.SecondaryAction>
      </PricingOptions.Item>
      <PricingOptions.Item>
        <PricingOptions.Heading>Pro</PricingOptions.Heading>
        <PricingOptions.Label>Most popular</PricingOptions.Label>
        <PricingOptions.Description>
          Unlimited completions and chat with access to more models.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
          Get started
        </PricingOptions.PrimaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Everything in Free and:</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Unlimited agent mode and chats with GPT-4o</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Unlimited code completions</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Access to code review, Claude 3.7 Sonnet, o1, and more
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            6x more premium requests to use latest models than Free, with the option to buy more1
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.{' '}
          <InlineLink href="#">Learn more</InlineLink>
        </PricingOptions.Footnote>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Heading>Pro+</PricingOptions.Heading>
        <PricingOptions.Description>Maximum flexibility and model choice.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per month or $390 per year">39</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
          Get started
        </PricingOptions.PrimaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Everything in Pro and:</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Access to all models, including GPT-4.5</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            30x more premium requests to use latest models than Free, with the option to buy more1
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>
    </PricingOptions>
  )
}
export const Example2: StoryFn<typeof PricingOptions> = () => {
  return (
    <PricingOptions appearance="gradient">
      <PricingOptions.Item>
        <PricingOptions.Heading>Business</PricingOptions.Heading>
        <PricingOptions.Description>Accelerate workflows with GitHub Copilot.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Unlimited agent mode and chats with GPT-4o</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Access to code review, Claude 3.5/3.7 Sonnet, o1, and more
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            300 premium requests to use latest models per user, with the option to buy more1
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>User management and usage metrics</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity and data privacy</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
          Get started
        </PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Heading>Enterprise</PricingOptions.Heading>
        <PricingOptions.Label>Best value</PricingOptions.Label>
        <PricingOptions.Description>Scale with AI agents and comprehensive model access.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
          Get started
        </PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction as="a" href="#" variant="subtle" hasArrow={false}>
          Open in VS Code
        </PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Everything in Business and:</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Access to all models, including GPT-4.5</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            3.33x more premium requests to use latest models than Business, with the option to buy more1
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
      </PricingOptions.Item>
    </PricingOptions>
  )
}
