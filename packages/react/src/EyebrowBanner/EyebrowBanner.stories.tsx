import React from 'react'
import type {Meta} from '@storybook/react'
import {SparkleFillIcon} from '@primer/octicons-react'

import {EyebrowBanner, EyebrowBannerIconColors} from '.'
import placeholderEyebrow from '../fixtures/images/eyebrow.png'

export default {
  title: 'Components/EyebrowBanner',
  component: EyebrowBanner,
  args: {
    heading: 'GitHub Universe: Dive in to AI, security, and DevEx',
    subHeading: 'Get your tickets now to join us on Nov. 8-9.',
    visualVisibility: true,
    variant: 'img',
    showLeadingLabel: false,
    leadingLabelText: 'NEW',
    visualImageSrc: placeholderEyebrow,
    iconColor: 'blue',
    iconHasBackground: true,
  },
  argTypes: {
    heading: {
      name: 'text',
      control: {
        type: 'text',
      },
      table: {
        category: 'EyebrowBanner.Heading',
      },
    },
    subHeading: {
      name: 'text',
      control: {
        type: 'text',
      },
      table: {
        category: 'EyebrowBanner.Subheading',
      },
    },
    visualVisibility: {
      name: 'visible',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'EyebrowBanner.Visual',
      },
    },
    variant: {
      name: 'variant',
      control: {
        type: 'inline-radio',
      },
      options: ['img', 'icon'],
      table: {
        category: 'EyebrowBanner.Visual',
      },
    },
    visualImageSrc: {
      name: 'image src',
      control: {
        type: 'text',
      },
      table: {
        category: 'EyebrowBanner.Visual',
      },
    },
    iconColor: {
      description: 'Color of Icon',
      control: {
        type: 'inline-radio',
      },
      options: [...EyebrowBannerIconColors],
      table: {
        category: 'EyebrowBanner.Visual',
      },
    },
    iconHasBackground: {
      name: 'iconHasBackground',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
      table: {
        category: 'EyebrowBanner.Visual',
      },
    },
    showLeadingLabel: {
      name: 'visible',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'EyebrowBanner.Label',
      },
    },
    leadingLabelText: {
      name: 'text',
      control: {
        type: 'text',
      },
      table: {
        category: 'EyebrowBanner.Label',
      },
    },
  },
} as Meta<typeof EyebrowBanner>

export const Playground = args => (
  <EyebrowBanner href="/">
    {args.visualVisibility && (
      <EyebrowBanner.Visual
        icon={args.variant === 'icon' && <SparkleFillIcon />}
        color={args.variant === 'icon' && args.iconColor}
        hasBackground={args.variant === 'icon' && args.iconHasBackground}
      >
        {args.visualImageSrc && <img src={args.visualImageSrc} alt="GitHub logo" />}
      </EyebrowBanner.Visual>
    )}
    {args.showLeadingLabel && <EyebrowBanner.Label>{args.leadingLabelText}</EyebrowBanner.Label>}
    <EyebrowBanner.Heading>{args.heading}</EyebrowBanner.Heading>
    <EyebrowBanner.SubHeading>{args.subHeading}</EyebrowBanner.SubHeading>
  </EyebrowBanner>
)

export const Default = () => (
  <EyebrowBanner href="/">
    <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
    <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
  </EyebrowBanner>
)
