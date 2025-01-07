import {Meta} from '@storybook/react'
import React from 'react'
import {Accordion, AccordionToggleColors} from '.'
import {Box, Grid, ThemeProvider, UnorderedList} from '../'

export default {
  title: 'Components/Accordion',
  component: Accordion,
} as Meta<typeof Accordion>

export const Default = () => (
  <Accordion>
    <Accordion.Heading>Heading</Accordion.Heading>
    <Accordion.Content>
      <p>Some description</p>
      <p>Some description</p>
    </Accordion.Content>
  </Accordion>
)

export const ToggleColors = () => (
  <Grid>
    <Grid.Column span={{xsmall: 12, medium: 6}}>
      <ThemeProvider colorMode="light">
        <Box backgroundColor="default" padding="condensed">
          {AccordionToggleColors.map(color => (
            <Accordion key={color}>
              <Accordion.Heading toggleColor={color}>Toggle color: {color}</Accordion.Heading>
              <Accordion.Content>
                <p>Description</p>
              </Accordion.Content>
            </Accordion>
          ))}
        </Box>
      </ThemeProvider>
    </Grid.Column>
    <Grid.Column span={{xsmall: 12, medium: 6}}>
      <ThemeProvider colorMode="dark">
        <Box backgroundColor="default" padding="condensed">
          {AccordionToggleColors.map(color => (
            <Accordion key={color}>
              <Accordion.Heading toggleColor={color}>Toggle color: {color}</Accordion.Heading>
              <Accordion.Content>
                <p>Description</p>
              </Accordion.Content>
            </Accordion>
          ))}
        </Box>
      </ThemeProvider>
    </Grid.Column>
  </Grid>
)

export const Composition = () => (
  <>
    <Accordion>
      <Accordion.Heading>What&apos;s included in the GitHub for Startups offer?</Accordion.Heading>
      <Accordion.Content>
        <p>
          All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and 50%
          off year two. Learn more about the features and capabilities of GitHub Enterprise{' '}
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
      </Accordion.Content>
    </Accordion>
    <Accordion>
      <Accordion.Heading>Who is eligible to apply?</Accordion.Heading>
      <Accordion.Content>
        <p>Startups who meet the following criteria are eligible to apply for the program:</p>
        <UnorderedList>
          <UnorderedList.Item>Must be associated with a current GitHub for Startups partner.</UnorderedList.Item>
          <UnorderedList.Item>Self-funded or funded (Seed-Series A)</UnorderedList.Item>
          <UnorderedList.Item>Not a current GitHub Enterprise customer</UnorderedList.Item>
          <UnorderedList.Item>Must not have previously received credits for GitHub Enterprise</UnorderedList.Item>
        </UnorderedList>
      </Accordion.Content>
    </Accordion>
    <Accordion>
      <Accordion.Heading>What if my startup is not eligible? Are there other resources for me?</Accordion.Heading>
      <Accordion.Content>
        <p>
          If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise, please
          feel to sign up for a trial{' '}
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            here
          </a>
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
          <a href="https://copilot.github.com/" target="_blank" rel="noreferrer">
            Apply here
          </a>
          .
        </p>
      </Accordion.Content>
    </Accordion>
  </>
)
