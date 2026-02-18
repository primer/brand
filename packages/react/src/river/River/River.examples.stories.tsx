import React, {useEffect} from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../../fixtures/images/browser-light.png'
import placeholderBg from '../../fixtures/images/dither-bg-landscape-green.png'
import posterImage from '../../fixtures/images/example-poster.png'

import {River, type RiverProps} from '.'
import {EyebrowText, Section, Heading, Link, Text} from '../../'
import {VideoPlayer} from '../../VideoPlayer'

export type MetaProps = RiverProps

const meta: Meta<MetaProps> = {
  title: 'Components/River/Examples',
  component: River,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<MetaProps>

export const CustomBackgroundStart: Story = {
  name: 'Custom background (start)',
  render: () => <GridLineWithBackgroundExample align="start" />,
}

export const CustomBackgroundEnd: Story = {
  name: 'Custom background (end)',
  render: () => <GridLineWithBackgroundExample align="end" />,
}

export const CustomBackgroundStartVideo: Story = {
  name: 'Custom background (start, video)',
  render: () => <GridLineWithBackgroundVideoExample />,
}

function GridLineWithBackgroundExample({align}: {align: 'start' | 'end'}) {
  const visualRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visualRef.current) {
      return TempFadeInBackgroundEffect(visualRef.current, placeholderBg, 500)
    }
  }, [])

  return (
    <Section>
      <River variant="gridline" align={align}>
        <River.Visual ref={visualRef} imageBackgroundColor="subtle">
          <img src={placeholderImage} alt="Browser window showing GitHub interface" />
        </River.Visual>
        <River.Content>
          <EyebrowText>Feature</EyebrowText>
          <Heading>GridLine with custom background</Heading>
          <Text>
            The imageBackgroundColor prop creates a full-bleed container that can be enhanced with a custom animated
            background using the ref prop on River.Visual.
          </Text>
          <Link href="#">Learn more</Link>
        </River.Content>
      </River>
    </Section>
  )
}

function GridLineWithBackgroundVideoExample() {
  const visualRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visualRef.current) {
      return TempFadeInBackgroundEffect(visualRef.current, placeholderBg, 500)
    }
  }, [])

  return (
    <Section>
      <River variant="gridline" align="start">
        <River.Visual ref={visualRef} imageBackgroundColor="subtle">
          <VideoPlayer title="GitHub media player" poster={posterImage}>
            <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
            <VideoPlayer.Track src="./example.vtt" default />
          </VideoPlayer>
        </River.Visual>
        <River.Content>
          <EyebrowText>Video</EyebrowText>
          <Heading>GridLine with video</Heading>
          <Text>
            The imageBackgroundColor prop also works with video content. The video is centered within the full-bleed
            container with padding around it.
          </Text>
          <Link href="#">Watch the video</Link>
        </River.Content>
      </River>
    </Section>
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
