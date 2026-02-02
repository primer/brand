import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../fixtures/images/placeholder.png'
import posterImage from '../fixtures/images/example-poster.png'

import {Hero} from '.'

import styles from './Hero.stories.module.css'
import {Text} from '../Text'
import {InlineLink} from '../InlineLink'

const meta = {
  title: 'Components/Hero/Features/GridLine variants',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Gridline: Story = {
  name: 'Gridline default variant:',
  render: () => (
    <Hero variant="gridline">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Image src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
    </Hero>
  ),
}

export const GridlineCentered: Story = {
  name: 'Gridline default variant: Centered',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Image src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
    </Hero>
  ),
}

export const GridlineImageInlineEnd: Story = {
  name: 'Gridline default variant: Inline-end image',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Image position="inline-end" src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
    </Hero>
  ),
}

export const GridlineImageInlineStart: Story = {
  name: 'Gridline default variant: Inline-start image',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Image position="inline-start" src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
    </Hero>
  ),
}

export const GridlineImageInlineEndPadded: Story = {
  name: 'Inline-end-padded image',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Image
        position="inline-end-padded"
        src={placeholderImage}
        alt="placeholder image, blank with gray solid fill"
      />
    </Hero>
  ),
}

export const GridlineImageInlineStartPadded: Story = {
  name: 'Gridline default variant: Inline-start-padded image',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Image
        position="inline-start-padded"
        src={placeholderImage}
        alt="placeholder image, blank with gray solid fill"
      />
    </Hero>
  ),
}

export const GridlineImageBlockEndPadded: Story = {
  name: 'Gridline default variant: Block-end-padded image',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Image
        position="block-end-padded"
        src={placeholderImage}
        alt="placeholder image, blank with gray solid fill"
      />
    </Hero>
  ),
}

export const GridlineYoutubeVideoBlockEnd: Story = {
  name: 'Gridline default variant: Block-end YouTube video',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Video
        poster={posterImage}
        posterAltText="Mona the Octocat"
        posterTitle="Introducing the GitHub Copilot coding agent "
      >
        <iframe
          src="https://www.youtube.com/embed/EPyyyB23NUU?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={styles.customVideo}
        ></iframe>
      </Hero.Video>
    </Hero>
  ),
}

export const GridlineYoutubeVideoInlineEnd: Story = {
  name: 'Gridline default variant: Inline-end YouTube video',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Video
        position="inline-end"
        poster={posterImage}
        posterAltText="Mona the Octocat"
        posterTitle="Introducing the GitHub Copilot coding agent "
      >
        <iframe
          src="https://www.youtube.com/embed/EPyyyB23NUU?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={styles.customVideo}
        ></iframe>
      </Hero.Video>
    </Hero>
  ),
}

export const GridlineYoutubeVideoBlockEndWithPoster: Story = {
  name: 'Gridline default variant: Block-end YouTube video + poster',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Video
        poster={posterImage}
        posterAltText="Mona the Octocat"
        posterTitle="Introducing the GitHub Copilot coding agent "
      >
        <iframe
          src="https://www.youtube.com/embed/EPyyyB23NUU?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={styles.customVideo}
        ></iframe>
      </Hero.Video>
    </Hero>
  ),
}

export const GridlineYoutubeVideoBlockEndPadded: Story = {
  name: 'Gridline default variant: Block-end-padded YouTube video',
  render: () => (
    <Hero variant="gridline" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Video
        position="block-end-padded"
        poster={posterImage}
        posterAltText="Mona the Octocat"
        posterTitle="Introducing the GitHub Copilot coding agent "
      >
        <iframe
          src="https://www.youtube.com/embed/EPyyyB23NUU?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={styles.customVideo}
        ></iframe>
      </Hero.Video>
    </Hero>
  ),
}

export const GridlineExpressive: Story = {
  name: 'Expressive variant',
  render: () => (
    <Hero variant="gridline-expressive">
      <Hero.Label>Eyebrow</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, quae inventore.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Get started for free</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#">See plans & pricing</Hero.SecondaryAction>
      <Hero.Image src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
    </Hero>
  ),
}

export const GridlineExpressiveNarrow: Story = {
  name: 'Expressive variant (narrow)',
  render: () => (
    <Hero variant="gridline-expressive">
      <Hero.Label>Eyebrow</Hero.Label>
      <Hero.Heading>Display et sed perspiciatis</Hero.Heading>
      <Hero.Description>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, quae inventore.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Get started for free</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#">See plans & pricing</Hero.SecondaryAction>
      <Hero.Image src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
    </Hero>
  ),
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const GridlineExpressiveWithTrailing: Story = {
  name: 'Expressive variant: Inline-end image',
  render: () => (
    <Hero variant="gridline-expressive">
      <Hero.Label>Eyebrow</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, quae inventore.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Buy now</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#">Learn more</Hero.SecondaryAction>
      <Hero.Image position="inline-end" src={placeholderImage} alt="placeholder image, blank with gray solid fill" />
    </Hero>
  ),
}

export const GridlineExpressiveBlockEndPadded: Story = {
  name: 'Expressive variant: Block-end-padded image',
  render: () => (
    <Hero variant="gridline-expressive">
      <Hero.Label>Eyebrow</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, quae inventore.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Get started for free</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#">See plans & pricing</Hero.SecondaryAction>
      <Hero.Image
        position="block-end-padded"
        src={placeholderImage}
        alt="placeholder image, blank with gray solid fill"
      />
    </Hero>
  ),
}

export const GridlineExpressiveBlockEndPaddedTrailingComponent: Story = {
  name: 'Expressive variant: With trailing component',
  render: () => (
    <Hero
      variant="gridline-expressive"
      trailingComponent={() => (
        <Text>
          Already have Visual Studio Code? <InlineLink href="#">Open now</InlineLink>
        </Text>
      )}
    >
      <Hero.Label>Eyebrow</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>

      <Hero.PrimaryAction href="#">Get started for free</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#">See plans & pricing</Hero.SecondaryAction>
      <Hero.Image
        position="block-end-padded"
        src={placeholderImage}
        alt="placeholder image, blank with gray solid fill"
      />
    </Hero>
  ),
}
