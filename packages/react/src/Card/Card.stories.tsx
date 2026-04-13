import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Card, CardCTAVariants, CardIconColors, CardLabelVariants, CardTokenPositions, CardVariants} from '.'
import {CopilotIcon} from '@primer/octicons-react'
import {Token} from '../Token'
import placeholderImage from '../fixtures/images/placeholder.png'
import {MicrosoftLogo} from '../fixtures/third-party-logos/MicrosoftLogo'

type StoryProps = {
  align: 'start' | 'center'
  ctaText: string
  ctaVariant: (typeof CardCTAVariants)[number]
  disableAnimation: boolean
  href: string
  iconColor: (typeof CardIconColors)[number]
  iconHasBackground: boolean
  imagePosition: 'block-start' | 'block-end'
  labelVariant: (typeof CardLabelVariants)[number]
  heading: string
  description: string
  media: 'icon' | 'leadingVisual' | 'image' | 'none'
  label?: string
  showDescription: boolean
  showTokens: boolean
  primaryToken: string
  secondaryToken: string
  tokensPosition: (typeof CardTokenPositions)[number]
  hasBorder?: boolean
  fullWidth?: boolean
  variant: (typeof CardVariants)[number]
}

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    align: 'start',
    ctaText: 'Learn more',
    ctaVariant: 'text',
    disableAnimation: false,
    href: 'https://github.com',
    iconColor: 'default',
    iconHasBackground: true,
    imagePosition: 'block-start',
    label: '',
    labelVariant: 'muted',
    heading: 'Collaboration is the key to DevOps success',
    description: 'Everything you need to know about getting started with GitHub Actions.',
    media: 'icon',
    primaryToken: 'Topic',
    secondaryToken: 'DEC.25',
    showDescription: true,
    showTokens: false,
    fullWidth: false,
    hasBorder: false,
    tokensPosition: 'block-start',
    variant: 'default',
  },
  argTypes: {
    align: {
      description: 'Aligns the card content.',
      control: {
        type: 'inline-radio',
      },
      options: ['start', 'center'],
    },
    variant: {
      description: 'Alternative card appearance.',
      control: {
        type: 'inline-radio',
      },
      options: [...CardVariants],
    },
    href: {
      description: 'Destination URL for the card.',
      control: {
        type: 'text',
      },
    },
    ctaText: {
      description: 'Visible CTA text when `ctaVariant="text"` is used.',
      control: {
        type: 'text',
      },
    },
    iconColor: {
      name: 'color',
      description: 'Color of Icon',
      control: {
        type: 'inline-radio',
      },
      options: [...CardIconColors],
      table: {
        category: 'Icon',
      },
    },
    media: {
      description: 'Choose the optional visual treatment for the card.',
      control: {
        type: 'inline-radio',
      },
      options: ['icon', 'leadingVisual', 'image', 'none'],
      table: {
        category: 'Media',
      },
    },
    imagePosition: {
      description: 'Placement of the image when image media is selected.',
      control: {
        type: 'inline-radio',
      },
      options: ['block-start', 'block-end'],
      table: {
        category: 'Media',
      },
    },
    iconHasBackground: {
      name: 'hasBackground',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Icon',
      },
    },
    ctaVariant: {
      description: 'Presentation of the Card call-to-action.',
      control: {
        type: 'inline-radio',
      },
      options: [...CardCTAVariants],
    },
    disableAnimation: {
      description: 'Disable the default hover animation.',
      control: {
        type: 'boolean',
      },
    },
    label: {
      description: 'Optional eyebrow content rendered above the heading.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Label',
      },
    },
    labelVariant: {
      name: 'variant',
      description: 'Variant of the Card label.',
      control: {
        type: 'inline-radio',
      },
      options: [...CardLabelVariants],
      table: {
        category: 'Label',
      },
    },
    showTokens: {
      description: 'Render the Card.Tokens slot.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Tokens',
      },
    },
    primaryToken: {
      description: 'Primary token label.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Tokens',
      },
    },
    secondaryToken: {
      description: 'Secondary token label rendered with the outline variant.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Tokens',
      },
    },
    tokensPosition: {
      description: 'Places tokens at block-start or block-end relative to the copy.',
      control: {
        type: 'inline-radio',
      },
      options: [...CardTokenPositions],
      table: {
        category: 'Tokens',
      },
    },
    hasBorder: {
      name: 'hasBorder',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
    },
    heading: {
      name: 'heading',
      description: 'Card heading`.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
        value: 'Collaboration is the key to DevOps success',
      },
    },
    description: {
      name: 'description',
      description: 'Card description`.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
        value: 'Everything you need to know about getting started with GitHub Actions.',
      },
    },
    showDescription: {
      description: 'Render the Card.Description slot.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    fullWidth: {
      name: 'fullWidth',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<typeof Card>

export default meta
type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: () => (
    <Card href="https://github.com">
      <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
      <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
    </Card>
  ),
}

export const Playground: Story = {
  render: args => {
    const tokens = args.showTokens ? (
      <Card.Tokens position={args.tokensPosition}>
        {args.primaryToken ? <Token>{args.primaryToken}</Token> : null}
        {args.secondaryToken ? <Token variant="outline">{args.secondaryToken}</Token> : null}
      </Card.Tokens>
    ) : null

    return (
      <div style={{width: '24rem'}}>
        <Card
          href={args.href}
          align={args.align}
          ctaText={args.ctaText}
          ctaVariant={args.ctaVariant}
          disableAnimation={args.disableAnimation}
          hasBorder={args.hasBorder}
          fullWidth={args.fullWidth}
          variant={args.variant}
          leadingVisual={args.media === 'leadingVisual' ? <MicrosoftLogo /> : undefined}
        >
          {args.media === 'image' ? (
            <Card.Image
              src={placeholderImage}
              alt="placeholder, blank area with an gray background color"
              position={args.imagePosition}
            />
          ) : null}
          {args.media === 'icon' ? (
            <Card.Icon hasBackground={args.iconHasBackground} icon={CopilotIcon} color={args.iconColor} />
          ) : null}
          {args.tokensPosition === 'block-start' ? tokens : null}
          {args.label ? <Card.Label variant={args.labelVariant}>{args.label}</Card.Label> : null}
          <Card.Heading>{args.heading}</Card.Heading>
          {args.showDescription ? <Card.Description>{args.description}</Card.Description> : null}
          {args.tokensPosition === 'block-end' ? tokens : null}
        </Card>
      </div>
    )
  },
}
