import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {PricingCards} from '.'
import {Box, Grid, ThemeProvider} from '..'

const decorators = Story => (
  <ThemeProvider colorMode="auto">
    <Box
      backgroundColor="subtle"
      paddingBlockStart="spacious"
      paddingBlockEnd="spacious"
      style={{
        ['--brand-color-accent-primary' as string]: 'var(--base-color-scale-purple-4)',
        minHeight: '100vh',
      }}
    >
      <Grid>
        <Grid.Column span={12}>
          <Story />
        </Grid.Column>
      </Grid>
    </Box>
  </ThemeProvider>
)

export default {
  title: 'Components/PricingCards/Features',
  component: PricingCards,
  decorators: [decorators],
} as Meta<typeof PricingCards>

export const OneItem: StoryFn<typeof PricingCards> = () => {
  return (
    <PricingCards>
      <PricingCards.Item>
        <PricingCards.Heading>Copilot Individual</PricingCards.Heading>
        <PricingCards.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per month / $100 per year">
          10
        </PricingCards.Price>
        <PricingCards.PrimaryAction href="/buy">Buy now</PricingCards.PrimaryAction>
        <PricingCards.SecondaryAction href="/contact">Contact sales</PricingCards.SecondaryAction>
      </PricingCards.Item>
    </PricingCards>
  )
}

export const TwoItems: StoryFn<typeof PricingCards> = () => {
  return (
    <PricingCards>
      <PricingCards.Item>
        <PricingCards.Label>Recommended</PricingCards.Label>
        <PricingCards.Heading>Copilot</PricingCards.Heading>
        <PricingCards.Description>Copilot in the coding environment.</PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per month / $100 per year">
          10
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListItem>Everything in Copilot Business plus:</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Code completions</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
        <PricingCards.PrimaryAction href="/buy">Buy now</PricingCards.PrimaryAction>
        <PricingCards.SecondaryAction href="/contact">Contact sales</PricingCards.SecondaryAction>
      </PricingCards.Item>
      <PricingCards.Item>
        <PricingCards.Label>Recommended</PricingCards.Label>
        <PricingCards.Heading>Copilot Business</PricingCards.Heading>
        <PricingCards.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          39
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListItem>Everything in Copilot Business plus:</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Code completions</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
        <PricingCards.PrimaryAction href="/waitlist">Join waitlist</PricingCards.PrimaryAction>
      </PricingCards.Item>
    </PricingCards>
  )
}

export const ThreeItems: StoryFn<typeof PricingCards> = () => {
  return (
    <PricingCards>
      <PricingCards.Item>
        <PricingCards.Heading>Copilot Individual</PricingCards.Heading>
        <PricingCards.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per month / $100 per year">
          10
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListItem>Code completions</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Security vulnerability filter</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
        <PricingCards.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingCards.Footnote>
        <PricingCards.PrimaryAction href="/buy">Start a free trial</PricingCards.PrimaryAction>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Recommended</PricingCards.Label>
        <PricingCards.Heading>Copilot Business</PricingCards.Heading>
        <PricingCards.Description>Copilot personalized to your organization.</PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          19
        </PricingCards.Price>
        <PricingCards.PrimaryAction href="/buy">Buy now</PricingCards.PrimaryAction>
        <PricingCards.SecondaryAction href="/contact">Contact sales</PricingCards.SecondaryAction>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListItem>Everything in Copilot Individual plus:</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Security vulnerability filter</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Code referencing</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Public code filter</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>IP indemnity</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Enterprise-grade security, safety, and privacy</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Available Feb 2024</PricingCards.Label>
        <PricingCards.Heading>Copilot Enterprise</PricingCards.Heading>
        <PricingCards.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          39
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListItem>Everything in Copilot Business plus:</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Code completions</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
        <PricingCards.PrimaryAction href="/waitlist">Join waitlist</PricingCards.PrimaryAction>
      </PricingCards.Item>
    </PricingCards>
  )
}

export const CardsLayout: StoryFn<typeof PricingCards> = () => {
  return (
    <PricingCards layout="cards">
      <PricingCards.Item>
        <PricingCards.Heading>Copilot Individual</PricingCards.Heading>
        <PricingCards.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per month / $100 per year">
          10
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListItem>Code completions</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Security vulnerability filter</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
        <PricingCards.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingCards.Footnote>
        <PricingCards.PrimaryAction href="/buy">Start a free trial</PricingCards.PrimaryAction>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Recommended</PricingCards.Label>
        <PricingCards.Heading>Copilot Business</PricingCards.Heading>
        <PricingCards.Description>Copilot personalized to your organization.</PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          19
        </PricingCards.Price>
        <PricingCards.PrimaryAction href="/buy">Buy now</PricingCards.PrimaryAction>
        <PricingCards.SecondaryAction href="/contact">Contact sales</PricingCards.SecondaryAction>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListItem>Everything in Copilot Individual plus:</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Security vulnerability filter</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Code referencing</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Public code filter</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>IP indemnity</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Enterprise-grade security, safety, and privacy</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Available Feb 2024</PricingCards.Label>
        <PricingCards.Heading>Copilot Enterprise</PricingCards.Heading>
        <PricingCards.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          39
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListItem>Everything in Copilot Business plus:</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Code completions</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
        <PricingCards.PrimaryAction href="/waitlist">Join waitlist</PricingCards.PrimaryAction>
      </PricingCards.Item>
    </PricingCards>
  )
}

export const WithFeatureSets: StoryFn<typeof PricingCards> = () => {
  return (
    <PricingCards>
      <PricingCards.Item>
        <PricingCards.Heading>Copilot Individual</PricingCards.Heading>
        <PricingCards.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per month / $100 per year">
          10
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListHeading>Base features</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Code completions</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>

          <PricingCards.FeatureListHeading>Security</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Security vulnerability filter</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>

        <PricingCards.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingCards.Footnote>

        <PricingCards.PrimaryAction href="/buy">Start a free trial</PricingCards.PrimaryAction>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Recommended</PricingCards.Label>
        <PricingCards.Heading>Copilot Business</PricingCards.Heading>
        <PricingCards.Description>Copilot personalized to your organization.</PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          19
        </PricingCards.Price>
        <PricingCards.PrimaryAction href="/buy">Buy now</PricingCards.PrimaryAction>
        <PricingCards.SecondaryAction href="/contact">Contact sales</PricingCards.SecondaryAction>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListHeading>Base features</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Everything in Copilot Individual</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Code referencing</PricingCards.FeatureListItem>

          <PricingCards.FeatureListHeading>Security</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Security vulnerability filter</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Public code filter</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>IP indemnity</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Enterprise-grade security, safety, and privacy</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Available Feb 2024</PricingCards.Label>
        <PricingCards.Heading>Copilot Enterprise</PricingCards.Heading>
        <PricingCards.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          39
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListHeading>Base features</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Everything in Copilot Business</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Documentation search and summaries</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Pull request summaries</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Code review skills</PricingCards.FeatureListItem>
          <PricingCards.FeatureListHeading>Security</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Security vulnerability filter</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Public code filter</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>IP indemnity</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Enterprise-grade security, safety, and privacy</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
        <PricingCards.PrimaryAction href="/waitlist">Join waitlist</PricingCards.PrimaryAction>
      </PricingCards.Item>
    </PricingCards>
  )
}

export const WithIncludedAndExcludedFeatures: StoryFn<typeof PricingCards> = () => {
  return (
    <PricingCards>
      <PricingCards.Item>
        <PricingCards.Heading>Copilot Individual</PricingCards.Heading>
        <PricingCards.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per month / $100 per year">
          10
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListHeading>Chat</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Unlimited messages, interactions, and history</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Context-aware coding support and explanations</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem variant="excluded">
            Debugging and security remediation assistance
          </PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem variant="excluded">
            Repository-based semantic search
          </PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem variant="excluded">Access your knowledge base</PricingCards.FeatureListItem>
          <PricingCards.FeatureListHeading>Code completion</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Code suggestions as you type</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Comments to code</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem variant="excluded">
            Fine-tuned models (coming soon)
          </PricingCards.FeatureListItem>
        </PricingCards.FeatureList>

        <PricingCards.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingCards.Footnote>

        <PricingCards.PrimaryAction href="/buy">Start a free trial</PricingCards.PrimaryAction>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Recommended</PricingCards.Label>
        <PricingCards.Heading>Copilot Business</PricingCards.Heading>
        <PricingCards.Description>Copilot personalized to your organization.</PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          19
        </PricingCards.Price>
        <PricingCards.PrimaryAction href="/buy">Buy now</PricingCards.PrimaryAction>
        <PricingCards.SecondaryAction href="/contact">Contact sales</PricingCards.SecondaryAction>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListHeading>Chat</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Unlimited messages, interactions, and history</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Context-aware coding support and explanations</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Debugging and security remediation assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Repository-based semantic search</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem variant="excluded">Access your knowledge base</PricingCards.FeatureListItem>
          <PricingCards.FeatureListHeading>Code completion</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Code suggestions as you type</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Comments to code</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem variant="excluded">
            Fine-tuned models (coming soon)
          </PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Available Feb 2024</PricingCards.Label>
        <PricingCards.Heading>Copilot Enterprise</PricingCards.Heading>
        <PricingCards.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          39
        </PricingCards.Price>
        <PricingCards.FeatureList>
          <PricingCards.FeatureListHeading>Chat</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Unlimited messages, interactions, and history</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Context-aware coding support and explanations</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Debugging and security remediation assistance</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Repository-based semantic search</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Access your knowledge base</PricingCards.FeatureListItem>
          <PricingCards.FeatureListHeading>Code completion</PricingCards.FeatureListHeading>
          <PricingCards.FeatureListItem>Code suggestions as you type</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Comments to code</PricingCards.FeatureListItem>
          <PricingCards.FeatureListItem>Fine-tuned models (coming soon)</PricingCards.FeatureListItem>
        </PricingCards.FeatureList>
        <PricingCards.PrimaryAction href="/waitlist">Join waitlist</PricingCards.PrimaryAction>
      </PricingCards.Item>
    </PricingCards>
  )
}
export const WithoutFeatures: StoryFn<typeof PricingCards> = () => {
  return (
    <PricingCards>
      <PricingCards.Item>
        <PricingCards.Heading>Copilot Individual</PricingCards.Heading>
        <PricingCards.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per month / $100 per year">
          10
        </PricingCards.Price>
        <PricingCards.PrimaryAction href="/buy">Start a free trial</PricingCards.PrimaryAction>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Recommended</PricingCards.Label>
        <PricingCards.Heading>Copilot Business</PricingCards.Heading>
        <PricingCards.Description>Copilot personalized to your organization.</PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          19
        </PricingCards.Price>
        <PricingCards.PrimaryAction href="/buy">Buy now</PricingCards.PrimaryAction>
      </PricingCards.Item>

      <PricingCards.Item>
        <PricingCards.Label>Available Feb 2024</PricingCards.Label>
        <PricingCards.Heading>Copilot Enterprise</PricingCards.Heading>
        <PricingCards.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingCards.Description>
        <PricingCards.Price currencySymbol="$" trailingText="per user / month">
          39
        </PricingCards.Price>
        <PricingCards.PrimaryAction href="/waitlist">Join waitlist</PricingCards.PrimaryAction>
      </PricingCards.Item>
    </PricingCards>
  )
}
