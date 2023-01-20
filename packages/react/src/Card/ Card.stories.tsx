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
      defaultValue: CardVariants[0]
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
    // sizeHeading: {
    //   description: 'Size of the heading',
    //   control: {
    //     type: 'inline-radio',
    //     options: [...HeadingSizes]
    //   },
    //   defaultValue: HeadingSizes[3]
    // },
    // sizeDescription: {
    //   description: 'Size of the description',
    //   control: {
    //     type: 'inline-radio',
    //     options: [...TextSizes]
    //   },
    //   defaultValue: TextSizes[4]
    // },
    heightImage: {
      description: 'Height of the image',
      control: {
        type: 'number'
      },
      defaultValue: 200
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
  heightImage: number
  fullBleedImage?: boolean
}

const Template = (args: PlaygroundProps) => {
  const {sizeDescription, image, sizeHeading, heightImage, fullBleedImage} = args
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginTop: '10vh'}}>
      <Card {...args}>
        {image && (
          <Card.Image
            fullBleed={fullBleedImage}
            height={heightImage}
            src="https://user-images.githubusercontent.com/912236/213208795-ba61941e-a407-4973-86fd-d5b1697712bf.png"
            alt="Card image"
          />
        )}
        <Card.Heading size={sizeHeading}>Collaboration is the key to DevOps success</Card.Heading>
        <Card.Description size={sizeDescription}>
          Everything you need to know about getting started with GitHub Actions.
        </Card.Description>
      </Card>
      <Card {...args}>
        c
        {image && (
          <Card.Image
            fullBleed={fullBleedImage}
            height={heightImage}
            src="https://user-images.githubusercontent.com/912236/213241573-5705c304-712b-465b-912e-16533592f5ed.png"
            alt="Card image"
          />
        )}
        <Card.Heading size={sizeHeading}>GitHub Actions cheat sheet</Card.Heading>
        <Card.Description size={sizeDescription}>
          In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
        </Card.Description>
      </Card>
      <Card {...args}>
        {image && (
          <Card.Image
            fullBleed={fullBleedImage}
            height={heightImage}
            src="https://user-images.githubusercontent.com/912236/213241619-ffc67a09-9f04-4ab3-9d6f-010a5cf93f1d.png"
            alt="Card image"
          />
        )}
        <Card.Heading size={sizeHeading}>How healthy teams build better software</Card.Heading>
        <Card.Description size={sizeDescription}>
          Your culture is key to recruiting and retaining the talent you need to ship exceptional customer experiences.
        </Card.Description>
      </Card>
    </div>
  )
}

export const Playground = Template.bind({})
