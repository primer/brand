import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../fixtures/images/placeholder.png'
import posterImage from '../fixtures/images/example-poster.png'

import {Hero} from '.'
import {Grid} from '../Grid'
import {VideoPlayer} from '../VideoPlayer'

import styles from './Hero.stories.module.css'

const meta = {
  title: 'Components/Hero/Features/Images and Videos',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const WithImageBlockEndDefault: Story = {
  name: 'Image (left + bottom)',
  render: () => (
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
  ),
}

export const WithImageBlockEndCenter: Story = {
  name: 'Image (centered + bottom)',
  render: () => (
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
  ),
}

export const WithImageInlineEnd: Story = {
  name: 'Image (right)',
  render: () => (
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
          <Hero.Image
            position="inline-end"
            src={placeholderImage}
            alt="placeholder image, blank with gray solid fill"
          />
        </Hero>
      </Grid.Column>
    </Grid>
  ),
}

export const WithVideoBlockEndDefault: Story = {
  name: 'VideoPlayer (bottom)',
  render: () => (
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
          <Hero.Video>
            <VideoPlayer title="GitHub media player" poster={posterImage}>
              <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
              <VideoPlayer.Track src="./example.vtt" default />
            </VideoPlayer>
          </Hero.Video>
        </Hero>
      </Grid.Column>
    </Grid>
  ),
}

export const WithNativeBlockEndDefault: Story = {
  name: 'HTML video (bottom)',
  render: () => (
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
          <Hero.Video>
            <video title="Example title" controls poster={posterImage} className={styles.customVideo}>
              <source src="./example.mp4" type="video/mp4" />
              <track src="./example.vtt" kind="captions" srcLang="en" label="English" default />
              Your browser does not support the video tag.
            </video>
          </Hero.Video>
        </Hero>
      </Grid.Column>
    </Grid>
  ),
}

export const WithYoutubeVideoBlockEndDefault: Story = {
  name: 'YouTube video (bottom)',
  render: () => (
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
          <Hero.Video>
            <iframe
              src="https://www.youtube.com/embed/EPyyyB23NUU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className={styles.customVideo}
            ></iframe>
          </Hero.Video>
        </Hero>
      </Grid.Column>
    </Grid>
  ),
}

export const WithVideoInlineEnd: Story = {
  name: 'VideoPlayer (right)',
  render: () => (
    <Grid>
      <Grid.Column>
        <Hero align="center">
          <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
          <Hero.Video position="inline-end">
            <VideoPlayer title="GitHub media player" poster={posterImage}>
              <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
              <VideoPlayer.Track src="./example.vtt" default />
            </VideoPlayer>
          </Hero.Video>
        </Hero>
      </Grid.Column>
    </Grid>
  ),
}

export const WithYoutubeVideoInlineEnd: Story = {
  name: 'YouTube video (right)',
  render: () => (
    <Grid>
      <Grid.Column>
        <Hero align="center">
          <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
          <Hero.Video position="inline-end">
            <iframe
              src="https://www.youtube.com/embed/EPyyyB23NUU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className={styles.customVideo}
            ></iframe>
          </Hero.Video>
        </Hero>
      </Grid.Column>
    </Grid>
  ),
}
