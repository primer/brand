import React, {useCallback, useState} from 'react'
import type {Meta, StoryFn, StoryObj} from '@storybook/react'

import {
  Tabs,
  type TabsProps,
  Text,
  Box,
  InlineLink,
  PricingOptions,
  Grid,
  Animate,
  AnimationProvider,
  Image,
  Stack,
} from '..'
import {SparkleFillIcon} from '@primer/octicons-react'
import placeholder1 from '../fixtures/images/placeholder-1.png'
import placeholder2 from '../fixtures/images/placeholder-2.png'
import placeholder3 from '../fixtures/images/placeholder-3.png'

export type MetaProps = TabsProps

const meta: Meta<MetaProps> = {
  title: 'Components/Tabs/Examples',
  component: Tabs as Meta<TabsProps>['component'], // because Tabs has a discriminated union for aria-* that breaks the strict types for Storybook
}

export default meta

type Story = StoryObj<MetaProps>

export const WithPricingOptions: Story = {
  render: args => {
    const {'aria-labelledby': _, ...restArgs} = args
    return (
      <Grid>
        <Grid.Column>
          <Tabs {...restArgs} aria-label="Copilot plans" variant="accent">
            <Tabs.Item>For individuals</Tabs.Item>
            <Tabs.Item>For businesses</Tabs.Item>

            <Tabs.Panel>
              <PricingOptions variant="default-gradient">
                <PricingOptions.Item>
                  <PricingOptions.Heading>Free</PricingOptions.Heading>
                  <PricingOptions.Description>
                    A fast way to get started with GitHub Copilot.
                  </PricingOptions.Description>
                  <PricingOptions.Price>0</PricingOptions.Price>
                  <PricingOptions.FeatureList>
                    <PricingOptions.FeatureListItem>
                      50 agent mode or chat requests per month
                    </PricingOptions.FeatureListItem>
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
                    <PricingOptions.FeatureListItem>
                      Unlimited agent mode and chats with GPT-4o
                    </PricingOptions.FeatureListItem>
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
                    <PricingOptions.FeatureListItem>
                      Everything in Copilot Individual plus:
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Access to all models, including GPT-4.5
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      30x more premium requests to use latest models than Free, with the option to buy more1
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      Enterprise-grade security, safety, and privacy
                    </PricingOptions.FeatureListItem>
                  </PricingOptions.FeatureList>
                </PricingOptions.Item>
              </PricingOptions>
            </Tabs.Panel>
            <Tabs.Panel>
              <PricingOptions variant="default-gradient">
                <PricingOptions.Item>
                  <PricingOptions.Heading>Business</PricingOptions.Heading>
                  <PricingOptions.Description>Accelerate workflows with GitHub Copilot.</PricingOptions.Description>
                  <PricingOptions.Price trailingText="per user / month">19</PricingOptions.Price>
                  <PricingOptions.FeatureList>
                    <PricingOptions.FeatureListItem>
                      Unlimited agent mode and chats with GPT-4o
                    </PricingOptions.FeatureListItem>
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
                  <PricingOptions.Description>
                    Scale with AI agents and comprehensive model access.
                  </PricingOptions.Description>
                  <PricingOptions.Price trailingText="per user / month">39</PricingOptions.Price>
                  <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
                    Get started
                  </PricingOptions.PrimaryAction>
                  <PricingOptions.SecondaryAction as="a" href="#" variant="subtle" hasArrow={false}>
                    Open in VS Code
                  </PricingOptions.SecondaryAction>
                  <PricingOptions.FeatureList>
                    <PricingOptions.FeatureListHeading>Everything in Business and:</PricingOptions.FeatureListHeading>
                    <PricingOptions.FeatureListItem>
                      Access to all models, including GPT-4.5
                    </PricingOptions.FeatureListItem>
                    <PricingOptions.FeatureListItem>
                      3.33x more premium requests to use latest models than Business, with the option to buy more1
                    </PricingOptions.FeatureListItem>
                  </PricingOptions.FeatureList>
                </PricingOptions.Item>
              </PricingOptions>
            </Tabs.Panel>
          </Tabs>
        </Grid.Column>
      </Grid>
    )
  },
}

export const WithCustomPanels: StoryFn<typeof Tabs> = args => {
  const {'aria-labelledby': _, ...restArgs} = args

  const [activeTab, setActiveTab] = useState<string>('0')

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id)
  }, [])

  return (
    <AnimationProvider autoStaggerChildren={false}>
      <Stack alignItems="center">
        <Box padding="condensed">
          <Box id="panel-1-a" aria-labelledby="tab-1" role="tabpanel" tabIndex={0} hidden={activeTab !== '0'}>
            <Animate animate="slide-in-up">
              <Image
                borderRadius="medium"
                src={placeholder1}
                alt="placeholder, blank area with an orange background color and a white number 1 in the center"
              />
            </Animate>
          </Box>
          <Box id="panel-2-a" aria-labelledby="tab-2" role="tabpanel" tabIndex={0} hidden={activeTab !== '1'}>
            <Animate animate="slide-in-up">
              <Image
                borderRadius="medium"
                src={placeholder2}
                alt="placeholder, blank area with an orange background color and a white number 1 in the center"
              />
            </Animate>
          </Box>
          <Box id="panel-3-a" aria-labelledby="tab-3" role="tabpanel" tabIndex={0} hidden={activeTab !== '2'}>
            <Animate animate="slide-in-up">
              <Image
                borderRadius="medium"
                src={placeholder3}
                alt="placeholder, blank area with an orange background color and a white number 1 in the center"
              />
            </Animate>
          </Box>
        </Box>
        <Tabs {...restArgs} onChange={handleTabChange} aria-label="Software development lifecycle">
          <Tabs.Item id="tab-1" aria-controls="panel-1-a panel-1-b">
            Code
          </Tabs.Item>
          <Tabs.Item id="tab-2" aria-controls="panel-2-a panel-2-b">
            Plan
          </Tabs.Item>
          <Tabs.Item id="tab-3" aria-controls="panel-3-a panel-3-b">
            Collaborate
          </Tabs.Item>
        </Tabs>
        <Box padding="condensed">
          <Box id="panel-1-b" aria-labelledby="tab-1" role="tabpanel" tabIndex={0} hidden={activeTab !== '0'}>
            <Animate animate="slide-in-up">
              <Text size="100" variant="muted">
                Code quickly and more securely with GitHub Copilot embedded throughout your workflows.
              </Text>
            </Animate>
          </Box>
          <Box id="panel-2-b" aria-labelledby="tab-2" role="tabpanel" tabIndex={0} hidden={activeTab !== '1'}>
            <Animate animate="slide-in-up">
              <Text size="100" variant="muted">
                Track and coordinate your work with GitHub Issues, GitHub Projects, and insights.
              </Text>
            </Animate>
          </Box>
          <Box id="panel-3-b" aria-labelledby="tab-3" role="tabpanel" tabIndex={0} hidden={activeTab !== '2'}>
            <Animate animate="slide-in-up">
              <Text size="100" variant="muted">
                Collaborate in real time with your team and GitHub Copilot across GitHub Issues, GitHub Discussions, and
                pull requests.
              </Text>
            </Animate>
          </Box>
        </Box>
      </Stack>
    </AnimationProvider>
  )
}
