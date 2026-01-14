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

export const BorderedGridCentered: Story = {
  name: 'Custom background (block-end)',
  render: () => <BorderedGridCenteredExample />,
}

export const BorderedGridImageInlineEndPadded: Story = {
  name: 'Custom background (inline-end-padded)',
  render: () => <BorderedGridImageInlineEndPaddedExample />,
}

function BorderedGridCenteredExample() {
  const imageRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.backgroundImage = `url(${placeholderBg})`
      imageRef.current.style.backgroundSize = 'cover'
      imageRef.current.style.backgroundPosition = 'center'
    }
  }, [])

  return (
    <Box paddingBlockEnd={24}>
      <Hero variant="bordered-grid" align="center" imageContainerRef={imageRef}>
        <Hero.Label animation="blinking-cursor">Label</Hero.Label>
        <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.Image src={placeholderImage} alt="" borderRadius="small" />
      </Hero>
    </Box>
  )
}

function BorderedGridImageInlineEndPaddedExample() {
  const imageRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.backgroundImage = `url(${placeholderBg})`
      imageRef.current.style.backgroundSize = 'cover'
      imageRef.current.style.backgroundPosition = 'center'
    }
  }, [])

  return (
    <Hero variant="bordered-grid" align="center" imageContainerRef={imageRef}>
      <Hero.Label animation="blinking-cursor">Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.Image position="inline-end-padded" src={placeholderImage} alt="" borderRadius="small" />
    </Hero>
  )
}
