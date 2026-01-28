import React, {useEffect} from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../fixtures/images/browser-light.png'
import placeholderBg from '../fixtures/images/dither-bg-landscape-green.png'
import posterImage from '../fixtures/images/example-poster.png'

import {Hero} from '.'
import {Box} from '../Box'
import {VideoPlayer} from '../VideoPlayer'

const meta = {
  title: 'Components/Hero/Examples',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const CustomBackgroundBlockEndImage: Story = {
  name: 'Custom background (block-end image)',
  render: () => <GridlineCenteredExample />,
}

export const CustomBackgroundInlineEndPaddedImage: Story = {
  name: 'Custom background (inline-end-padded image)',
  render: () => <GridlineImageInlineEndPaddedExample />,
}

export const CustomBackgroundBlockEndVideo: Story = {
  name: 'Custom background (block-end video)',
  render: () => <GridlineCenteredVideoExample />,
}

export const CustomBackgroundInlineEndPaddedVideo: Story = {
  name: 'Custom background (inline-end-padded video)',
  render: () => <GridlineVideoInlineEndPaddedExample />,
}

function GridlineCenteredExample() {
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
}

function GridlineImageInlineEndPaddedExample() {
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
      <Hero.Image position="inline-end-padded" src={placeholderImage} alt="" enableBorder={false} />
    </Hero>
  )
}

function GridlineCenteredVideoExample() {
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
}

function GridlineVideoInlineEndPaddedExample() {
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
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
