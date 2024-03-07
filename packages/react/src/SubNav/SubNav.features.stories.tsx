import React from 'react'
import {Meta} from '@storybook/react'
import {SubNav} from './SubNav'
import bgPath from '../fixtures/images/background-stars.png'
import {ThemeProvider} from '../ThemeProvider'
import {Box} from '../Box'
import {Hero} from '../Hero'
import {Grid} from '../Grid'

export default {
  title: 'Components/SubNav',
  component: SubNav,
} as Meta<typeof SubNav>

export const ExampleUsage = args => (
  <>
    <Box paddingBlockStart={64} backgroundColor="subtle"></Box>
    <SubNav {...args}>
      <SubNav.Heading>Features</SubNav.Heading>
      <SubNav.Link href="#">Actions</SubNav.Link>
      <SubNav.Link href="#">Packages</SubNav.Link>
      <SubNav.Link href="#">Security</SubNav.Link>
      <SubNav.Link href="#">Codespaces</SubNav.Link>
      <SubNav.Link href="#" aria-current="page">
        Copilot
      </SubNav.Link>
      <SubNav.Link href="#">Code review</SubNav.Link>
      <SubNav.Link href="#">Search</SubNav.Link>
      <SubNav.Link href="#">Issues</SubNav.Link>
      <SubNav.Link href="#">Discussions</SubNav.Link>
    </SubNav>
    <Grid>
      <Grid.Column>
        <Hero align="center">
          <Hero.Label>Copilot Enterprise</Hero.Label>
          <Hero.Heading>The world's most widely adopted AI tool.</Hero.Heading>

          <Hero.PrimaryAction href="#">Get started with Copilot</Hero.PrimaryAction>
        </Hero>
      </Grid.Column>
    </Grid>
  </>
)
ExampleUsage.parameters = {
  layout: 'fullscreen',
}

ExampleUsage.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <div style={{backgroundColor: 'black', height: '100%', minHeight: '100dvh', backgroundImage: `url(${bgPath})`}}>
        <Story />
      </div>
    </ThemeProvider>
  ),
]
