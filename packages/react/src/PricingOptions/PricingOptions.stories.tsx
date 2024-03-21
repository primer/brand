import React from 'react'
import {Meta} from '@storybook/react'
import {PricingOptions} from '.'
import {Box, Grid, ThemeProvider} from '..'

export default {
  title: 'Components/PricingOptions',
  component: PricingOptions,
} as Meta<typeof PricingOptions>

export const Default = () => (
  <ThemeProvider colorMode="auto">
    <Box
      backgroundColor="subtle"
      paddingBlockStart="spacious"
      paddingBlockEnd="spacious"
      style={{
        ['--brand-color-accent-primary' as string]: 'var(--base-color-scale-purple-5)',
        minHeight: '100vh',
      }}
    >
      <Grid>
        <Grid.Column span={12}>
          <PricingOptions>
            <PricingOptions.Item>
              <PricingOptions.Heading>Copilot Individual</PricingOptions.Heading>
              <PricingOptions.Description>
                Code completions, Chat, and more for indie developers and freelancers.
              </PricingOptions.Description>
              <PricingOptions.Price trailingText="per month / $100 per year">10</PricingOptions.Price>
              <PricingOptions.FeatureList>
                <PricingOptions.FeatureListHeading>Chat</PricingOptions.FeatureListHeading>
                <PricingOptions.FeatureListItem>
                  Unlimited messages, interactions, and history
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>
                  Context-aware coding support and explanations
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem variant="excluded">
                  Debugging and security remediation assistance
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem variant="excluded">
                  Repository-based semantic search
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem variant="excluded">
                  Access your knowledge base
                </PricingOptions.FeatureListItem>
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
                <PricingOptions.FeatureListHeading>Chat</PricingOptions.FeatureListHeading>
                <PricingOptions.FeatureListItem>
                  Unlimited messages, interactions, and history
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>
                  Context-aware coding support and explanations
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>
                  Debugging and security remediation assistance
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>Repository-based semantic search</PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem variant="excluded">
                  Access your knowledge base
                </PricingOptions.FeatureListItem>
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
                <PricingOptions.FeatureListItem>
                  Unlimited messages, interactions, and history
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>
                  Context-aware coding support and explanations
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>
                  Debugging and security remediation assistance
                </PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>Repository-based semantic search</PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>Access your knowledge base</PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListHeading>Code completion</PricingOptions.FeatureListHeading>
                <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
                <PricingOptions.FeatureListItem>Fine-tuned models (coming soon)</PricingOptions.FeatureListItem>
              </PricingOptions.FeatureList>
              <PricingOptions.PrimaryAction as="a" href="#">
                Join waitlist
              </PricingOptions.PrimaryAction>
            </PricingOptions.Item>
          </PricingOptions>
        </Grid.Column>
      </Grid>
    </Box>
  </ThemeProvider>
)
