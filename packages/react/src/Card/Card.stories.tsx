import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Card, CardCTAVariants, CardIconColors, CardLabelVariants, CardTokenPositions, CardVariants} from '.'
import {CopilotIcon} from '@primer/octicons-react'
import {useTranslation} from 'react-i18next'
import {Token} from '../Token'
import placeholderImage from '../fixtures/images/placeholder.png'
import {MicrosoftLogo} from '../fixtures/third-party-logos/MicrosoftLogo'

const defaultCTAText = 'Learn more'
const defaultHeading = 'Collaboration is the key to DevOps success'
const defaultDescription = 'Everything you need to know about getting started with GitHub Actions.'
const defaultPrimaryToken = 'Topic'
const defaultSecondaryToken = 'DEC.25'

function getLocalizedArgValue(value: string, fallbackValue: string, localizedValue: string) {
  return value === fallbackValue ? localizedValue : value
}

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
    ctaText: defaultCTAText,
    ctaVariant: 'text',
    disableAnimation: false,
    href: 'https://github.com',
    iconColor: 'default',
    iconHasBackground: true,
    imagePosition: 'block-start',
    label: '',
    labelVariant: 'token',
    heading: defaultHeading,
    description: defaultDescription,
    media: 'icon',
    primaryToken: defaultPrimaryToken,
    secondaryToken: defaultSecondaryToken,
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
      description: 'Presentation of the Card label.',
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
        value: defaultHeading,
      },
    },
    description: {
      name: 'description',
      description: 'Card description`.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
        value: defaultDescription,
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
  render: function DefaultComponent() {
    const {t} = useTranslation('Card')

    return (
      <Card href="https://github.com">
        <Card.Heading>{t('default_heading')}</Card.Heading>
        <Card.Description>{t('default_description')}</Card.Description>
      </Card>
    )
  },
}

export const Playground: Story = {
  render: function PlaygroundComponent(args) {
    const {t} = useTranslation('Card')
    const resolvedCTAText = getLocalizedArgValue(args.ctaText, defaultCTAText, t('learn_more'))
    const resolvedHeading = getLocalizedArgValue(args.heading, defaultHeading, t('default_heading'))
    const resolvedDescription = getLocalizedArgValue(args.description, defaultDescription, t('default_description'))
    const resolvedPrimaryToken = getLocalizedArgValue(args.primaryToken, defaultPrimaryToken, t('topic'))
    const resolvedSecondaryToken = getLocalizedArgValue(args.secondaryToken, defaultSecondaryToken, t('dec_25'))

    const tokens = args.showTokens ? (
      <Card.Tokens position={args.tokensPosition}>
        {resolvedPrimaryToken ? <Token>{resolvedPrimaryToken}</Token> : null}
        {resolvedSecondaryToken ? <Token variant="outline">{resolvedSecondaryToken}</Token> : null}
      </Card.Tokens>
    ) : null

    return (
      <div style={{width: '24rem'}}>
        <Card
          href={args.href}
          align={args.align}
          ctaText={resolvedCTAText}
          ctaVariant={args.ctaVariant}
          disableAnimation={args.disableAnimation}
          hasBorder={args.hasBorder}
          fullWidth={args.fullWidth}
          variant={args.variant}
          leadingVisual={args.media === 'leadingVisual' ? <MicrosoftLogo /> : undefined}
        >
          {args.media === 'image' ? (
            <Card.Image src={placeholderImage} alt={t('placeholder_alt')} position={args.imagePosition} />
          ) : null}
          {args.media === 'icon' ? (
            <Card.Icon hasBackground={args.iconHasBackground} icon={CopilotIcon} color={args.iconColor} />
          ) : null}
          {args.tokensPosition === 'block-start' ? tokens : null}
          {args.label ? <Card.Label variant={args.labelVariant}>{args.label}</Card.Label> : null}
          <Card.Heading>{resolvedHeading}</Card.Heading>
          {args.showDescription ? <Card.Description>{resolvedDescription}</Card.Description> : null}
          {args.tokensPosition === 'block-end' ? tokens : null}
        </Card>
      </div>
    )
  },
}
