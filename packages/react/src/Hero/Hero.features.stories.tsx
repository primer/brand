import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {HeartFillIcon, PlayIcon, StarFillIcon} from '@primer/octicons-react'

import {Hero} from '.'
import {ActionMenu} from '../ActionMenu'
import {Grid} from '../Grid'
import {EyebrowBanner} from '../EyebrowBanner'

const meta = {
  title: 'Components/Hero/Features',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Centered: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    </Hero>
  ),
}

export const WithIncreasedContrastDescription: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description variant="default">
        This description has increased contrast for better readability. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    </Hero>
  ),
}

export const WithAnimatedLabel: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label animate animationDelay={1000}>
        Animated label
      </Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description variant="muted">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    </Hero>
  ),
}

export const WithIncreasedContrastLabel: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label animate variant="default">
        Label with higher initial contrast
      </Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description variant="muted">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    </Hero>
  ),
}

export const WithAccentButton: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label>GitHub Issues</Hero.Label>
      <Hero.Heading>Project planning for developers</Hero.Heading>
      <Hero.Description variant="muted">
        Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize
        large projects as tables, boards, or roadmaps, and automate everything with code.
      </Hero.Description>
      <Hero.PrimaryAction variant="accent" href="#" hasArrow={false}>
        Start using projects
      </Hero.PrimaryAction>
      <Hero.SecondaryAction href="#" trailingVisual={<PlayIcon />}>
        What is GitHub Issues
      </Hero.SecondaryAction>
    </Hero>
  ),
}

export const WithoutDescription: Story = {
  render: () => (
    <Hero>
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    </Hero>
  ),
}

export const WithSecondaryAction: Story = {
  render: () => (
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
  ),
}

const ExampleTrailingComponent = () => (
  <ActionMenu>
    <ActionMenu.Button>Open menu</ActionMenu.Button>
    <ActionMenu.Overlay aria-label="GitHub features">
      <ActionMenu.Item value="Copilot" selected>
        Copilot
      </ActionMenu.Item>
      <ActionMenu.Item value="Codespaces">Codespaces</ActionMenu.Item>
      <ActionMenu.Item value="CodeQL">CodeQL</ActionMenu.Item>
    </ActionMenu.Overlay>
  </ActionMenu>
)

export const WithTrailingComponent: Story = {
  render: () => (
    <Grid>
      <Grid.Column>
        <Hero trailingComponent={ExampleTrailingComponent}>
          <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
        </Hero>
      </Grid.Column>
    </Grid>
  ),
}

export const WithCustomClassnames: Story = {
  render: () => (
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
  ),
}

export const WithCustomHeadingAndDescriptionSizes: Story = {
  render: () => (
    <Hero className="test-class" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading size="4">This is my super sweet hero heading</Hero.Heading>
      <Hero.Description size="200">
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
  ),
}

export const WithCustomIconAndVariant: Story = {
  name: 'With custom icon and variant',
  render: () => (
    <Hero align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#" leadingVisual={<HeartFillIcon />}>
        Primary action with leading icon
      </Hero.PrimaryAction>
      <Hero.SecondaryAction href="#" trailingVisual={<StarFillIcon />} variant="subtle">
        Subtle action with trailing icon
      </Hero.SecondaryAction>
    </Hero>
  ),
}

export const NarrowView: Story = {
  render: () => (
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
  ),
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const NarrowViewCentered: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Heading>Project planning for developers</Hero.Heading>
      <Hero.Description>
        Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize
        large projects as spreadsheets or boards, and automate everything with code.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Watch video</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#">Start using project tables</Hero.SecondaryAction>
    </Hero>
  ),
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const Eyebrow: Story = {
  render: args => (
    <Hero align={args.align}>
      <Hero.Eyebrow>
        <EyebrowBanner href="http://githubuniverse.com/">
          <EyebrowBanner.Visual>
            <img
              width="44"
              height="44"
              alt=""
              aria-hidden="true"
              src="https://github.githubassets.com/assets/eyebrow-23@2x-563f292d9e30.png"
            />
          </EyebrowBanner.Visual>
          <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
          <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
        </EyebrowBanner>
      </Hero.Eyebrow>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    </Hero>
  ),
}

export const EyebrowCentered: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Eyebrow>
        <EyebrowBanner href="http://githubuniverse.com/">
          <EyebrowBanner.Visual>
            <img
              width="44"
              height="44"
              alt=""
              aria-hidden="true"
              src="https://github.githubassets.com/assets/eyebrow-23@2x-563f292d9e30.png"
            />
          </EyebrowBanner.Visual>
          <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
          <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
        </EyebrowBanner>
      </Hero.Eyebrow>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
    </Hero>
  ),
}
