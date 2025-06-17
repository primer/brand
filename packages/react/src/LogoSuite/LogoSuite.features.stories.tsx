import React from 'react'
import {Meta} from '@storybook/react'
import {userEvent, within} from '@storybook/test'
import {LogoSuite} from './LogoSuite'
import {Grid} from '../Grid'
import {Image} from '../'
import pinterestLogo from '../fixtures/images/logos/pinterest.png'
import shopifyLogo from '../fixtures/images/logos/shopify.png'
import twilioLogo from '../fixtures/images/logos/twilio.png'
import uberLogo from '../fixtures/images/logos/uber.png'
import vercelLogo from '../fixtures/images/logos/vercel.png'
import {logos} from './LogoSuite.fixtures'

export default {
  title: 'Components/LogoSuite/Features',
  component: LogoSuite,
} as Meta<typeof LogoSuite>

export const AlignStart = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite align="start">
        <LogoSuite.Heading>Start alignment</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>uu
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const AlignCenter = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite align="center">
        <LogoSuite.Heading>Center alignment</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const AlignJustify = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite align="justify">
        <LogoSuite.Heading>Justified alignment</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const DefaultVariant = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const EmphasisVariant = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar variant="emphasis">{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const MutedVariant = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar variant="muted">{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const WithoutDivider = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite hasDivider={false}>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const CondensedGap = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar gap="condensed">{logos.slice(0, 6)}</LogoSuite.Logobar>
      </LogoSuite>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar gap="condensed" marquee marqueeSpeed="idle">
          {logos.slice(0, 12)}
        </LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const Marquee = () => (
  <LogoSuite>
    <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar marquee>{logos.slice(0, 12)}</LogoSuite.Logobar>
  </LogoSuite>
)

Marquee.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)

  await new Promise(resolve => setTimeout(resolve, 3000))

  const pauseButton = canvas.getByLabelText('Pause animation')
  await userEvent.click(pauseButton)
}

export const IdleMarqueeSpeed = () => (
  <LogoSuite>
    <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar marquee marqueeSpeed="idle">
      {logos.slice(0, 12)}
    </LogoSuite.Logobar>
  </LogoSuite>
)

export const SlowerMarqueeSpeed = () => (
  <LogoSuite>
    <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar marquee marqueeSpeed="slow">
      {logos.slice(0, 12)}
    </LogoSuite.Logobar>
  </LogoSuite>
)

export const VisibleHeading = () => (
  <LogoSuite>
    <LogoSuite.Heading>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
  </LogoSuite>
)

export const HeadingLevel = () => (
  <LogoSuite>
    <LogoSuite.Heading as="h4">Heading</LogoSuite.Heading>
    <LogoSuite.Description>The heading above is rendered as a h4</LogoSuite.Description>
    <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
  </LogoSuite>
)

export const VisibleHeadingWithDescription = () => (
  <LogoSuite>
    <LogoSuite.Heading>Heading</LogoSuite.Heading>
    <LogoSuite.Description>
      Trusted by more than 90% of Fortune 100 companies, over 100 million users, and backed by Microsoft
    </LogoSuite.Description>
    <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
  </LogoSuite>
)

export const WithRasterLogos = () => (
  <LogoSuite>
    <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar>
      <Image alt="Uber" src={uberLogo} />
      <Image alt="Vercel" src={vercelLogo} />
      <Image alt="Shopify" src={shopifyLogo} />
      <Image alt="Pinterest" src={pinterestLogo} />
      <Image alt="Twilio" src={twilioLogo} />
    </LogoSuite.Logobar>
  </LogoSuite>
)
