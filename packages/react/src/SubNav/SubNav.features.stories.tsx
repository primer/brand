import React from 'react'
import {Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import {SubNav} from './SubNav'
import bgPath from '../fixtures/images/background-stars.png'
import {ThemeProvider} from '../ThemeProvider'
import {Box} from '../Box'
import {Hero} from '../Hero'
import {Grid} from '../Grid'

export default {
  title: 'Components/SubNav/Features',
  component: SubNav,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof SubNav>

export const ExampleUsage = ({hasShadow, ...args}) => (
  <main>
    <Box paddingBlockStart={64} backgroundColor="subtle" style={{position: 'relative', zIndex: 32}}></Box>
    <SubNav {...args} hasShadow={hasShadow}>
      <SubNav.Heading href="#">Features</SubNav.Heading>
      <SubNav.Link href="#">Actions</SubNav.Link>
      <SubNav.Link href="#">Packages</SubNav.Link>
      <SubNav.Link href="#">Security</SubNav.Link>
      <SubNav.Link href="#">Codespaces</SubNav.Link>
      <SubNav.Link href="#" aria-current="page">
        Copilot
        <SubNav.SubMenu>
          <SubNav.Link href="#">Copilot feature page one</SubNav.Link>
          <SubNav.Link href="#">Copilot feature page two</SubNav.Link>
          <SubNav.Link href="#">Copilot feature page three</SubNav.Link>
          <SubNav.Link href="#">Copilot feature page four</SubNav.Link>
        </SubNav.SubMenu>
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
          <Hero.Heading>The world&apos;s most widely adopted AI tool.</Hero.Heading>
          <Hero.PrimaryAction href="#">Get started with Copilot</Hero.PrimaryAction>
        </Hero>
      </Grid.Column>
    </Grid>
  </main>
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

export const NarrowExampleUsage = args => <ExampleUsage {...args} />
NarrowExampleUsage.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'iphonex',
  },
}

NarrowExampleUsage.decorators = [Story => <Story />]

export const WithShadow = args => <ExampleUsage {...args} hasShadow={true} />
WithShadow.parameters = {
  layout: 'fullscreen',
}
