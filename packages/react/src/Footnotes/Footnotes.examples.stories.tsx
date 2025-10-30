import React from 'react'
import type {Meta} from '@storybook/react'
import {Footnotes} from '.'
import {Box, Grid, Heading, InlineLink, River, RiverBreakout, Section, Text, ThemeProvider, Timeline} from '../'
import placeholder1 from '../fixtures/images/placeholder-1.png'
import placeholder2 from '../fixtures/images/placeholder-2.png'
import placeholder3 from '../fixtures/images/placeholder-3.png'

const meta: Meta<typeof Footnotes> = {
  title: 'Components/Footnotes/Examples',
  component: Footnotes,
  parameters: {
    layout: 'fullscreen',
  },
}

export const RiversWithCitations = () => (
  <ThemeProvider colorMode="dark">
    <Box backgroundColor="default">
      <Section>
        <Grid>
          <Grid.Column>
            <River>
              <River.Visual>
                <img
                  src={placeholder1}
                  alt="placeholder, blank area with a orange background color and number 1 on it"
                />
              </River.Visual>
              <River.Content
                trailingComponent={() => (
                  <Box marginBlockStart={24} paddingBlockStart={24}>
                    <Heading as="h4" size="3">
                      17,000+
                    </Heading>
                    <Text as="p" size="300" weight="light" variant="muted">
                      Third-party tools support your favorite languages and frameworks{' '}
                      <Text size="100" weight="light">
                        <sup>
                          <InlineLink
                            href="#economic-impact"
                            id="economic-impact-ref"
                            style={{
                              display: 'inline-block',
                              minWidth: 'var(--base-size-12)',
                              minHeight: 'var(--base-size-24)',
                            }}
                          >
                            1
                          </InlineLink>
                        </sup>
                      </Text>
                    </Text>
                  </Box>
                )}
              >
                <Heading size="5" as="h3" weight="medium">
                  Leverage the industry&apos;s most flexible secure development platform.
                </Heading>
              </River.Content>
            </River>
            <RiverBreakout>
              <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
              <RiverBreakout.Visual>
                <img
                  src={placeholder2}
                  alt="placeholder, blank area with a violet background color and number 2 on it"
                />
              </RiverBreakout.Visual>
              <RiverBreakout.Content
                trailingComponent={() => (
                  <Timeline>
                    <Timeline.Item>
                      <Text variant="muted" size="100">
                        Fix vulnerabilities up to 7x faster than those using third-party tools.{' '}
                        <sup>
                          <InlineLink
                            href="#third-party"
                            id="third-party-ref"
                            style={{
                              display: 'inline-block',
                              minWidth: 'var(--base-size-12)',
                              minHeight: 'var(--base-size-24)',
                            }}
                          >
                            2
                          </InlineLink>
                        </sup>
                      </Text>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Text variant="muted" size="100">
                        Find leaked secrets with 2.4 fewer false positives than the industry standard.
                      </Text>
                    </Timeline.Item>
                  </Timeline>
                )}
              >
                <Text>
                  <b>Keep developers in the flow.</b> GitHub Advanced Security enables developers to stay in their
                  productivity-and-comfort zone, without demanding a high level of security expertise.
                </Text>
              </RiverBreakout.Content>
            </RiverBreakout>
            <River>
              <River.Visual>
                <img
                  src={placeholder3}
                  alt="placeholder, blank area with a green background color and number 3 on it"
                />
              </River.Visual>
              <River.Content>
                <Heading size="5" as="h3" weight="medium">
                  Unlocking innovation at scale with AI-driven software development.
                </Heading>
                <Text as="p" size="200" weight="light" variant="muted">
                  The world&apos;s most widely adopted AI developer tool.{' '}
                  <Text size="100" weight="light">
                    <sup>
                      <InlineLink href="#ai" id="ai-ref">
                        3
                      </InlineLink>
                    </sup>
                  </Text>
                </Text>
              </River.Content>
            </River>
          </Grid.Column>
        </Grid>
      </Section>
      <footer>
        <Section as="div" backgroundColor="subtle" paddingBlockStart="none" paddingBlockEnd="none">
          <Grid>
            <Grid.Column>
              <Footnotes>
                <Footnotes.Item id="economic-impact" href="#economic-impact-ref">
                  There are now 100 million developers around the world using GitHub.{' '}
                </Footnotes.Item>
                <Footnotes.Item id="third-party" href="#third-party-ref">
                  Based on data from the industry&apos;s longest running analysis of fix rates, Veracode State of
                  Software Security 2023. Developers with GitHub Advanced Security fix 48% of vulnerabilities in real
                  time, more than 7x faster than the industry average, where it takes 198 days to reach a 50% fix rate.
                </Footnotes.Item>
                <Footnotes.Item id="ai" href="#ai-ref">
                  This factor is based on data from the industry&apos;s{' '}
                  <InlineLink href="#">longest running analysis</InlineLink> by Acme Corp.
                </Footnotes.Item>
              </Footnotes>
            </Grid.Column>
          </Grid>
        </Section>
      </footer>
    </Box>
  </ThemeProvider>
)

export default meta
