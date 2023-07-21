import React from 'react'
import {Grid, CTABanner, Button} from '../../..'

export type FooterBannerBlockProps = {
  heading: string
  description: string
  primaryCTA: {
    href: string
    label: string
  }
  secondaryCTA?: {
    href: string
    label: string
  }
}

export const FooterBannerBlock = ({
  heading,
  description,
  primaryCTA,
}: //secondaryCTA
FooterBannerBlockProps) => {
  return (
    // TODO replace with Box component when available to avoid style overrides
    <Grid style={{paddingBlock: 'var(--base-size-96)'}}>
      <Grid.Column>
        <CTABanner align="center">
          <CTABanner.Heading>{heading}</CTABanner.Heading>
          <CTABanner.Description>{description}</CTABanner.Description>

          <CTABanner.ButtonGroup>
            <Button href={primaryCTA.href}>{primaryCTA.label}</Button>
            {/* TODO Fix TS error */}
            {/* {secondaryCTA && <Button href={secondaryCTA.href}>{secondaryCTA.label}</Button>} */}
          </CTABanner.ButtonGroup>
        </CTABanner>
      </Grid.Column>
    </Grid>
  )
}
