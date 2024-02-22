import React from 'react'
import {Meta} from '@storybook/react'
import {PricingCards} from '.'
import {Box, Grid, ThemeProvider} from '..'

export default {
  title: 'Components/PricingCards',
  component: PricingCards,
} as Meta<typeof PricingCards>

export const Default = () => (
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
                <PricingCards.FeatureListItem>
                  Unlimited messages, interactions, and history
                </PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem>
                  Context-aware coding support and explanations
                </PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem variant="excluded">
                  Debugging and security remediation assistance
                </PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem variant="excluded">
                  Repository-based semantic search
                </PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem variant="excluded">
                  Access your knowledge base
                </PricingCards.FeatureListItem>
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

            <PricingCards.Item featured>
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
                <PricingCards.FeatureListItem>
                  Unlimited messages, interactions, and history
                </PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem>
                  Context-aware coding support and explanations
                </PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem>
                  Debugging and security remediation assistance
                </PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem>Repository-based semantic search</PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem variant="excluded">
                  Access your knowledge base
                </PricingCards.FeatureListItem>
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
                <PricingCards.FeatureListItem>
                  Unlimited messages, interactions, and history
                </PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem>
                  Context-aware coding support and explanations
                </PricingCards.FeatureListItem>
                <PricingCards.FeatureListItem>
                  Debugging and security remediation assistance
                </PricingCards.FeatureListItem>
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
        </Grid.Column>
      </Grid>
    </Box>
  </ThemeProvider>
)
