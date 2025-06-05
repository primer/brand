import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {HeartFillIcon, PlayIcon, StarFillIcon} from '@primer/octicons-react'
import placeholderImage from '../fixtures/images/placeholder.png'
import posterImage from '../fixtures/images/example-poster.png'

import {Hero} from '.'
import {ActionMenu} from '../ActionMenu'
import {Grid} from '../Grid'
import {EyebrowBanner} from '../EyebrowBanner'
import {VideoPlayer} from '../VideoPlayer'

import styles from './Hero.stories.module.css'

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

export const WithMutedDescriptions: StoryFn<typeof Hero> = _args => (
  <Hero align="center">
    <Hero.Label>Label</Hero.Label>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.Description variant="muted">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
  </Hero>
)

export const WithAccentButton: StoryFn<typeof Hero> = _args => (
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

export const WithVideoBlockEndDefault: StoryFn<typeof Hero> = _args => (
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
)
WithVideoBlockEndDefault.storyName = 'With a VideoPlayer (bottom)'

export const WithNativeBlockEndDefault: StoryFn<typeof Hero> = _args => (
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
)
WithNativeBlockEndDefault.storyName = 'With a HTML video (bottom)'

export const WithYoutubeVideoBlockEndDefault: StoryFn<typeof Hero> = _args => (
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
)
WithYoutubeVideoBlockEndDefault.storyName = 'With a Youtube video (bottom)'

export const WithVideoInlineEnd: StoryFn<typeof Hero> = _args => (
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
)
WithVideoInlineEnd.storyName = 'With a VideoPlayer (right)'

export const WithYoutubeVideoInlineEnd: StoryFn<typeof Hero> = _args => (
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
            style={{width: '100%', height: 'auto', aspectRatio: '16/9'}}
          ></iframe>
        </Hero.Video>
      </Hero>
    </Grid.Column>
  </Grid>
)
WithYoutubeVideoInlineEnd.storyName = 'With a Youtube video (right)'

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

export const WithTrailingComponent: StoryFn<typeof Hero> = _args => (
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

export const WithCustomHeadingAndDescriptionSizes: StoryFn<typeof Hero> = _args => (
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
)

export const WithCustomIconAndVariant: StoryFn<typeof Hero> = _args => (
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

export const Eyebrow: StoryFn<typeof Hero> = _args => (
  <Hero align={_args.align}>
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
)

export const EyebrowCentered = () => <Eyebrow align="center" />
