import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Card, CardVariants, CardProps, CardSizes} from '.'
import {HeadingSizes, TextSizes} from '..'

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      description: 'Variants of a Card',
      control: {
        type: 'inline-radio',
        options: [...CardVariants]
      },
      defaultValue: CardVariants[1]
    },
    link: {
      description: 'Title of the card',
      control: {
        type: 'text'
      },
      defaultValue: 'Learn more'
    },
    linkHref: {
      description: 'Title href of the card',
      control: {
        type: 'text'
      },
      defaultValue: 'https://github.com'
    },
    size: {
      description: 'Size of the card',
      control: {
        type: 'inline-radio',
        options: [...CardSizes]
      },
      defaultValue: CardSizes[1]
    },
    sizeHeading: {
      description: 'Size of the heading',
      control: {
        type: 'inline-radio',
        options: [...HeadingSizes]
      }
    },
    sizeDescription: {
      description: 'Size of the description',
      control: {
        type: 'inline-radio',
        options: [...TextSizes]
      }
    },
    height: {
      description: 'Height of the image',
      control: {
        type: 'number'
      },
      defaultValue: 64
    },
    width: {
      description: 'Width of the image',
      control: {
        type: 'number'
      },
      defaultValue: 64
    },
    fill: {
      description: 'Fill image',
      control: {
        type: 'boolean',
        options: [true, false]
      },
      defaultValue: false
    },
    fullBleedImage: {
      description: 'Full bleed image',
      control: {
        type: 'boolean',
        options: [true, false]
      },
      defaultValue: false
    },
    image: {
      description: 'Image of the card',
      control: {
        type: 'boolean',
        options: [true, false]
      },
      defaultValue: true
    }
  }
} as ComponentMeta<typeof Card>

type PlaygroundProps = CardProps & {
  sizeHeading: typeof HeadingSizes[number]
  sizeDescription: typeof TextSizes[number]
  image?: boolean
  height: number
  width: number
  size: typeof CardSizes[number]
  fill?: boolean
  fullBleedImage?: boolean
}

const Template = (args: PlaygroundProps) => {
  const {size, sizeDescription, image, sizeHeading, height, width, fullBleedImage, fill} = args
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginTop: '10vh'}}>
      <Card {...args} size={size}>
        {image && (
          <Card.Image
            fullBleed={fullBleedImage}
            fill={fill}
            height={height}
            width={width}
            src="https://user-images.githubusercontent.com/912236/213208795-ba61941e-a407-4973-86fd-d5b1697712bf.png"
            // src="https://user-images.githubusercontent.com/912236/214313071-36039019-838a-4a2a-bb6e-8ca8ca9ea232.svg"
            // src="https://user-images.githubusercontent.com/912236/214252538-194613ca-71d7-4842-9dbb-fab6570f3621.png"
            alt="Card image"
          />
        )}
        <Card.Heading customSize={sizeHeading}>Collaboration is the key to DevOps success</Card.Heading>
        <Card.Description customSize={sizeDescription}>
          Everything you need to know about getting started with GitHub Actions.
        </Card.Description>
      </Card>
      <Card {...args}>
        c
        {image && (
          <Card.Image
            fullBleed={fullBleedImage}
            fill={fill}
            height={height}
            width={width}
            src="https://user-images.githubusercontent.com/912236/213241573-5705c304-712b-465b-912e-16533592f5ed.png"
            // src="https://github.githubassets.com/images/modules/site/features/launchpad/icons/icon-sponsors.png"
            alt="Card image"
          />
        )}
        <Card.Heading customSize={sizeHeading}>GitHub Actions cheat sheet</Card.Heading>
        <Card.Description customSize={sizeDescription}>
          In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
        </Card.Description>
      </Card>
      <Card {...args}>
        {image && (
          <Card.Image
            fullBleed={fullBleedImage}
            fill={fill}
            height={height}
            width={width}
            // src="https://github.githubassets.com/images/modules/site/features/launchpad/icons/icon-electron.svg"
            src="https://user-images.githubusercontent.com/912236/213241619-ffc67a09-9f04-4ab3-9d6f-010a5cf93f1d.png"
            alt="Card image"
          />
        )}
        <Card.Heading customSize={sizeHeading}>How healthy teams build better software</Card.Heading>
        <Card.Description customSize={sizeDescription}>
          Your culture is key to recruiting and retaining the talent you need to ship exceptional customer experiences.
        </Card.Description>
      </Card>
    </div>
  )
}

export const Playground = Template.bind({})
