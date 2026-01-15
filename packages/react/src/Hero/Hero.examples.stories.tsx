import React, {useEffect} from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../fixtures/images/browser-light.png'
import placeholderBg from '../fixtures/images/dither-bg-landscape-green.png'

import {Hero} from '.'
import {Box} from '../Box'

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
  render: () => <BorderedGridCenteredExample />,
}

export const CustomBackgroundInlineEndPaddedImage: Story = {
  name: 'Custom background (inline-end-padded image)',
  render: () => <BorderedGridImageInlineEndPaddedExample />,
}

function BorderedGridCenteredExample() {
  const imageRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (imageRef.current) {
      return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
    }
  }, [])

  return (
    <Box paddingBlockEnd={24}>
      <Hero variant="bordered-grid" align="center" imageContainerRef={imageRef} enableAnimation>
        <Hero.Label>Label</Hero.Label>
        <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>

        <Hero.Image src={placeholderImage} alt="" borderRadius="small" />
      </Hero>
    </Box>
  )
}

function BorderedGridImageInlineEndPaddedExample() {
  const imageRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (imageRef.current) {
      return TempFadeInBackgroundEffect(imageRef.current, placeholderBg, 500)
    }
  }, [])

  return (
    <Hero variant="bordered-grid" align="center" imageContainerRef={imageRef} enableAnimation>
      <Hero.Label>Label</Hero.Label>

      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
      <Hero.Image position="inline-end-padded" src={placeholderImage} alt="" borderRadius="small" />
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
