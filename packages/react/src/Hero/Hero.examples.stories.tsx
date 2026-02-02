import React, {useEffect} from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../fixtures/images/browser-light.png'
import placeholderBg from '../fixtures/images/dither-bg-landscape-green.png'
import posterImage from '../fixtures/images/example-poster.png'
import defaultPlaceholderImgae from '../fixtures/images/placeholder.png'

import {Hero} from '.'
import {Box} from '../Box'
import {VideoPlayer} from '../VideoPlayer'
import {Grid} from '../Grid'
import {Card} from '../Card'

import styles from './Hero.stories.module.css'
import {Text} from '../Text'
import {InlineLink} from '../InlineLink'

const meta = {
  title: 'Components/Hero/Examples',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Codespaces',
  render: () => (
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
  ),
}

export const CustomBackgroundBlockEndImage: Story = {
  name: 'Custom background (block-end image)',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Box paddingBlockEnd={24}>
        <Hero variant="gridline" align="center" imageContainerRef={imageRef} enableAnimation>
          <Hero.Label>Label</Hero.Label>
          <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>

          <Hero.Image src={placeholderImage} alt="" enableBorder={false} />
        </Hero>
      </Box>
    )
  },
}

export const CustomBackgroundInlineEndPaddedImage: Story = {
  name: 'Custom background (inline-end-padded image)',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Hero variant="gridline" align="center" imageContainerRef={imageRef} enableAnimation>
        <Hero.Label>Label</Hero.Label>
        <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
        <Hero.Image position="inline-end-padded" src={placeholderImage} alt="" enableBorder={false} />
      </Hero>
    )
  },
}

export const CustomBackgroundBlockEndVideo: Story = {
  name: 'Custom background (block-end video)',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Box paddingBlockEnd={24}>
        <Hero variant="gridline" align="center" imageContainerRef={imageRef} enableAnimation>
          <Hero.Label>Label</Hero.Label>
          <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>

          <Hero.Video enableBorder={false}>
            <VideoPlayer title="GitHub media player" poster={posterImage}>
              <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
              <VideoPlayer.Track src="./example.vtt" default />
            </VideoPlayer>
          </Hero.Video>
        </Hero>
      </Box>
    )
  },
}

export const CustomBackgroundInlineEndPaddedVideo: Story = {
  name: 'Custom background (inline-end-padded video)',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Hero variant="gridline" align="center" imageContainerRef={imageRef} enableAnimation>
        <Hero.Label>Label</Hero.Label>
        <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
        <Hero.Video position="inline-end-padded" enableBorder={false}>
          <VideoPlayer title="GitHub media player" poster={posterImage}>
            <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
            <VideoPlayer.Track src="./example.vtt" default />
          </VideoPlayer>
        </Hero.Video>
      </Hero>
    )
  },
}

export const WithCards: Story = {
  name: 'Hero with cards',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Box
        ref={imageRef}
        marginBlockEnd={64}
        borderBlockEndWidth="thin"
        borderStyle="solid"
        borderColor="muted"
        backgroundColor="overlay"
        style={{'--brand-Hero-bgColor-gridlineGridInner': 'var(--brand-color-canvas-default)'} as React.CSSProperties}
        className={styles.heroWithCardsExample}
      >
        <Hero align="center" variant="gridline">
          <Hero.Label>Projects</Hero.Label>
          <Hero.Heading>Project planning for developers</Hero.Heading>
          <Hero.Description>
            Create issues, break them into tasks, track relationships, add custom fields, and have conversations.
            Visualize large projects as spreadsheets or boards, and automate everything with code.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Watch video</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">Start using project tables</Hero.SecondaryAction>
        </Hero>

        <Grid style={{paddingInline: 0}}>
          <Grid.Column>
            <Box
              backgroundColor="var(--customCardsBackgroundColor)"
              borderColor="muted"
              borderStyle="solid"
              borderBlockStartWidth="thin"
              borderInlineEndWidth={{regular: 'thin'}}
              borderInlineStartWidth={{regular: 'thin'}}
            >
              <Grid
                style={{
                  ['--brand-Grid-spacing-row' as string]: '0',
                  ['--brand-Grid-spacing-column-gap' as string]: '0',
                }}
              >
                <Grid.Column span={{xsmall: 12, large: 4}}>
                  <Box padding={{narrow: 32, regular: 48}}>
                    <Card href="#" variant="minimal" fullWidth>
                      <Card.Heading as="h2">Code search & code view</Card.Heading>
                      <Card.Description>
                        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
                      </Card.Description>
                      <Card.Image
                        position="block-end"
                        src={defaultPlaceholderImgae}
                        alt="placeholder, blank area with an gray background color"
                      />
                    </Card>
                  </Box>
                </Grid.Column>

                <Grid.Column span={{xsmall: 12, large: 4}}>
                  <Box
                    padding={{narrow: 32, regular: 48}}
                    borderColor="muted"
                    borderStyle="solid"
                    borderBlockEndWidth={{narrow: 'thin', wide: 'none'}}
                    borderBlockStartWidth={{narrow: 'thin', wide: 'none'}}
                    borderInlineEndWidth={{wide: 'thin'}}
                    borderInlineStartWidth={{wide: 'thin'}}
                  >
                    <Card href="#" variant="minimal" fullWidth>
                      <Card.Image
                        position="block-end"
                        src={defaultPlaceholderImgae}
                        alt="placeholder, blank area with an gray background color"
                      />
                      <Card.Heading as="h2">Code search & code view</Card.Heading>
                      <Card.Description>
                        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
                      </Card.Description>
                    </Card>
                  </Box>
                </Grid.Column>

                <Grid.Column span={{xsmall: 12, large: 4}}>
                  <Box padding={{narrow: 32, regular: 48}}>
                    <Card href="#" variant="minimal" fullWidth>
                      <Card.Image
                        position="block-end"
                        src={defaultPlaceholderImgae}
                        alt="placeholder, blank area with an gray background color"
                      />
                      <Card.Heading as="h2">Code search & code view</Card.Heading>
                      <Card.Description>
                        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
                      </Card.Description>
                    </Card>
                  </Box>
                </Grid.Column>
              </Grid>
            </Box>
          </Grid.Column>
        </Grid>
      </Box>
    )
  },
}

export const GridlineExpressiveBlockEndPaddedTrailingComponent: Story = {
  name: 'GitHub Copilot - expressive gridline',
  render: function Render() {
    const imageRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (imageRef.current) {
        return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
      }
    }, [])

    return (
      <Hero
        imageContainerRef={imageRef}
        enableAnimation
        variant="gridline-expressive"
        trailingComponent={() => (
          <Text>
            Already have Visual Studio Code? <InlineLink href="#">Open now</InlineLink>
          </Text>
        )}
      >
        <Hero.Label>GitHub Copilot</Hero.Label>
        <Hero.Heading>Command your craft</Hero.Heading>
        <Hero.Description>Your AI accelerator for every workflow, from the editor to the enterprise.</Hero.Description>
        <Hero.PrimaryAction href="#">Try Copilot now</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">See plans & pricing</Hero.SecondaryAction>
        <Hero.Image
          enableBorder={false}
          position="block-end"
          src={placeholderImage}
          alt="placeholder image, blank with gray solid fill"
        />
      </Hero>
    )
  },
}

/**
 * This is just an example, and will be replaced with a built-in fade effect in the
 * WebGL animations.
 */
function TempFadeInBackgroundEffect(element: HTMLDivElement, backgroundImageUrl: string, delay = 100) {
  element.style.position = 'relative'

  const bgDiv = document.createElement('div')
  bgDiv.style.cssText = `
    position: absolute;
    inset: 0;
    background-image: url(${backgroundImageUrl});
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.5s ease-out;
    z-index: 0;
  `
  element.insertBefore(bgDiv, element.firstChild)

  const children = element.children
  for (let i = 1; i < children.length; i++) {
    ;(children[i] as HTMLElement).style.position = 'relative'
    ;(children[i] as HTMLElement).style.zIndex = '1'
  }

  const timer = setTimeout(() => {
    bgDiv.style.opacity = '1'
  }, delay)

  return () => {
    clearTimeout(timer)
    bgDiv.remove()
  }
}
