import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {HeartFillIcon, StarFillIcon} from '@primer/octicons-react'
import placeholderImage from '../fixtures/images/placeholder-600x400.png'

import {Hero} from '.'
import {Grid} from '../Grid'

export default {
  title: 'Components/Hero/Features',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof Hero>

export const Centered: StoryFn<typeof Hero> = _args => (
  <Hero align="center">
    <Hero.Label>Label</Hero.Label>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
  </Hero>
)

export const WithImageBlockEndDefault: StoryFn<typeof Hero> = _args => (
  <Grid>
    <Grid.Column>
      <Hero>
        <Hero.Label>Label</Hero.Label>
        <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.Image src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
      </Hero>
    </Grid.Column>
  </Grid>
)
WithImageBlockEndDefault.storyName = 'With an image (left + bottom)'

export const WithImageBlockEndCenter: StoryFn<typeof Hero> = _args => (
  <Grid>
    <Grid.Column>
      <Hero align="center">
        <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.Image src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
      </Hero>
    </Grid.Column>
  </Grid>
)
WithImageBlockEndCenter.storyName = 'With an image (centered + bottom)'

export const WithImageInlineEnd: StoryFn<typeof Hero> = _args => (
  <Grid>
    <Grid.Column>
      <Hero align="center">
        <Hero.Label>Label</Hero.Label>
        <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.Image position="inline-end" src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
      </Hero>
    </Grid.Column>
  </Grid>
)
WithImageInlineEnd.storyName = 'With an image (right)'

export const WithoutDescription: StoryFn<typeof Hero> = _args => (
  <Hero>
    <Hero.Label>Label</Hero.Label>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
  </Hero>
)

export const WithSecondaryAction: StoryFn<typeof Hero> = _args => (
  <Hero>
    <Hero.Label>Label</Hero.Label>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
  </Hero>
)

export const Codespaces: StoryFn<typeof Hero> = _args => (
  <Hero align="center">
    <Hero.Label>Codespaces</Hero.Label>
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

export const Issues: StoryFn<typeof Hero> = _args => (
  <Hero align="center">
    <Hero.Label>Projects</Hero.Label>
    <Hero.Heading>Project planning for developers</Hero.Heading>
    <Hero.Description>
      Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize
      large projects as spreadsheets or boards, and automate everything with code.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Watch video</Hero.PrimaryAction>
    <Hero.SecondaryAction href="#">Start using project tables</Hero.SecondaryAction>
  </Hero>
)

export const WithCustomClassnames: StoryFn<typeof Hero> = _args => (
  <Hero className="test-class" align="center">
    <Hero.Label>Label</Hero.Label>
    <Hero.Heading className="test-class">This is my super sweet hero heading</Hero.Heading>
    <Hero.Description className="test-class">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#" className="test-class">
      Primary action
    </Hero.PrimaryAction>
    <Hero.SecondaryAction href="#" className="test-class">
      Secondary action
    </Hero.SecondaryAction>
  </Hero>
)

export const WithCustomIconAndVariant: StoryFn<typeof Hero> = _args => (
  <Hero align="center">
    <Hero.Label>Label</Hero.Label>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#" leadingVisual={HeartFillIcon}>
      Primary action with leading icon
    </Hero.PrimaryAction>
    <Hero.SecondaryAction href="#" trailingVisual={StarFillIcon} variant="subtle">
      Subtle action with trailing icon
    </Hero.SecondaryAction>
  </Hero>
)

WithCustomIconAndVariant.storyName = 'With custom icon and variant'

export const NarrowView: StoryFn<typeof Hero> = _args => (
  <Hero>
    <Hero.Label>Projects</Hero.Label>
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
    defaultViewport: 'iphonexr',
  },
}

export const NarrowViewCentered: StoryFn<typeof Hero> = _args => (
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
    defaultViewport: 'iphonexr',
  },
}
