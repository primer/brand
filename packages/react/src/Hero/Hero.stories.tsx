import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import {Hero} from '.'

export default {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  }
} as ComponentMeta<typeof Hero>

export const Default: ComponentStory<typeof Hero> = _args => (
  <Hero>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
  </Hero>
)

export const Centered: ComponentStory<typeof Hero> = _args => (
  <Hero align="center">
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
  </Hero>
)

export const WithoutDescription: ComponentStory<typeof Hero> = _args => (
  <Hero>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
  </Hero>
)

export const WithSecondaryAction: ComponentStory<typeof Hero> = _args => (
  <Hero>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
  </Hero>
)

export const Codespaces: ComponentStory<typeof Hero> = _args => (
  <Hero align="center">
    <Hero.Heading>
      <>
        Blazing fast cloud
        <br />
        developer environments
      </>
    </Hero.Heading>
    <Hero.Description>Visual Studio Code backed by high performance VMs that start in seconds.</Hero.Description>
    <Hero.PrimaryAction href="#">Get started</Hero.PrimaryAction>
  </Hero>
)

export const Issues: ComponentStory<typeof Hero> = _args => (
  <Hero align="center">
    <Hero.Heading>Project planning for developers</Hero.Heading>
    <Hero.Description>
      Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize
      large projects as spreadsheets or boards, and automate everything with code.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Watch video</Hero.PrimaryAction>
    <Hero.SecondaryAction href="#">Start using project tables</Hero.SecondaryAction>
  </Hero>
)

export const NarrowView: ComponentStory<typeof Hero> = _args => (
  <Hero>
    <Hero.Heading>Project planning for developers</Hero.Heading>
    <Hero.Description>
      Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize
      large projects as spreadsheets or boards, and automate everything with code.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Watch video</Hero.PrimaryAction>
    <Hero.SecondaryAction href="#">Start using project tables</Hero.SecondaryAction>
  </Hero>
)

NarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphonexr'
  }
}

export const NarrowViewCentered: ComponentStory<typeof Hero> = _args => (
  <Hero align="center">
    <Hero.Heading>Project planning for developers</Hero.Heading>
    <Hero.Description>
      Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize
      large projects as spreadsheets or boards, and automate everything with code.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Watch video</Hero.PrimaryAction>
    <Hero.SecondaryAction href="#">Start using project tables</Hero.SecondaryAction>
  </Hero>
)

NarrowViewCentered.parameters = {
  viewport: {
    defaultViewport: 'iphonexr'
  }
}
