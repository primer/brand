import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {PricingOptions} from '.'
import {Box, Grid, ThemeProvider} from '..'

const decorators = (Story, context) => (
  <ThemeProvider colorMode={context.parameters.darkMode ? 'dark' : 'light'}>
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
  title: 'Components/PricingOptions/Features',
  component: PricingOptions,
  decorators: [decorators],
} as Meta<typeof PricingOptions>

export const DefaultPresentation: StoryFn<typeof PricingOptions> = () => {
  return (
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
        <PricingOptions.PrimaryAction href="/buy">Start a free trial</PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
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
        <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}

export const CardsPresentation: StoryFn<typeof PricingOptions> = () => {
  return (
    <PricingOptions presentation="cards">
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
        <PricingOptions.PrimaryAction href="/buy">Start a free trial</PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
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
        <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}

export const OneItem: StoryFn<typeof PricingOptions> = () => {
  return (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}

export const TwoItems: StoryFn<typeof PricingOptions> = () => {
  return (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot</PricingOptions.Heading>
        <PricingOptions.Description>Copilot in the coding environment.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
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
        <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}

export const ThreeItems: StoryFn<typeof PricingOptions> = () => {
  return (
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
        <PricingOptions.PrimaryAction href="/buy">Start a free trial</PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
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
        <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}

export const DarkColorMode: StoryFn<typeof PricingOptions> = () => {
  return (
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
        <PricingOptions.PrimaryAction href="/buy">Start a free trial</PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
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
        <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}

DarkColorMode.parameters = {
  darkMode: true,
}

export const WithFeatureSets: StoryFn<typeof PricingOptions> = () => {
  return (
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

          <PricingOptions.FeatureListHeading>Security</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>

        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>

        <PricingOptions.PrimaryAction href="/buy">Start a free trial</PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Base features</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Everything in Copilot Individual</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code referencing</PricingOptions.FeatureListItem>

          <PricingOptions.FeatureListHeading>Security</PricingOptions.FeatureListHeading>
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
          <PricingOptions.FeatureListHeading>Base features</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Everything in Copilot Business</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Documentation search and summaries</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Pull request summaries</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Code review skills</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListHeading>Security</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Security vulnerability filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Public code filter</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>IP indemnity</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>
            Enterprise-grade security, safety, and privacy
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}

export const WithIncludedAndExcludedFeatures: StoryFn<typeof PricingOptions> = () => {
  return (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Chat</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Unlimited messages, interactions, and history</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Context-aware coding support and explanations</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">
            Debugging and security remediation assistance
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">
            Repository-based semantic search
          </PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">Access your knowledge base</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListHeading>Code completion</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">
            Fine-tuned models (coming soon)
          </PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>

        <PricingOptions.Footnote>
          Free for verified students, teachers, and maintainers of popular open source projects.
        </PricingOptions.Footnote>

        <PricingOptions.PrimaryAction href="/buy">Start a free trial</PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
        <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
        <PricingOptions.FeatureList>
          <PricingOptions.FeatureListHeading>Chat</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Unlimited messages, interactions, and history</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Context-aware coding support and explanations</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Debugging and security remediation assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Repository-based semantic search</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem variant="excluded">Access your knowledge base</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListHeading>Code completion</PricingOptions.FeatureListHeading>
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
          <PricingOptions.FeatureListHeading>Chat</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Unlimited messages, interactions, and history</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Context-aware coding support and explanations</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Debugging and security remediation assistance</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Repository-based semantic search</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Access your knowledge base</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListHeading>Code completion</PricingOptions.FeatureListHeading>
          <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
          <PricingOptions.FeatureListItem>Fine-tuned models (coming soon)</PricingOptions.FeatureListItem>
        </PricingOptions.FeatureList>
        <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}
export const WithoutFeatures: StoryFn<typeof PricingOptions> = () => {
  return (
    <PricingOptions>
      <PricingOptions.Item>
        <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
        <PricingOptions.Description>
          Code completions, Chat, and more for indie developers and freelancers.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/buy">Start a free trial</PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Recommended</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
        <PricingOptions.Description>Copilot personalized to your organization.</PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
      </PricingOptions.Item>

      <PricingOptions.Item>
        <PricingOptions.Label>Available Feb 2024</PricingOptions.Label>
        <PricingOptions.Heading>Copilot Enterprise</PricingOptions.Heading>
        <PricingOptions.Description>
          Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
          Enterprise Cloud.
        </PricingOptions.Description>
        <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
        <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
      </PricingOptions.Item>
    </PricingOptions>
  )
}
