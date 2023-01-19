import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Card, CardVariants, CardProps} from '.'
import {Button, Link, HeadingSizes, TextSizes} from '..'

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
    sizeHeading: {
      description: 'Size of the heading',
      control: {
        type: 'inline-radio',
        options: [...HeadingSizes]
      },
      defaultValue: HeadingSizes[3]
    },
    sizeDescription: {
      description: 'Size of the description',
      control: {
        type: 'inline-radio',
        options: [...TextSizes]
      },
      defaultValue: TextSizes[4]
    },
    link: {
      description: 'Add a link to the card',
      control: {
        type: 'boolean',
        options: [true, false]
      },
      defaultValue: false
    },
    heightImage: {
      description: 'Height of the image',
      control: {
        type: 'number'
      },
      defaultValue: 300
    },
    fullBleedImage: {
      description: 'Full bleed image',
      control: {
        type: 'boolean',
        options: [true, false]
      },
      defaultValue: false
    }
  }
} as ComponentMeta<typeof Card>

type PlaygroundProps = CardProps & {
  sizeHeading: typeof HeadingSizes[number]
  sizeDescription: typeof TextSizes[number]
  link?: boolean
  heightImage: number
  fullBleedImage?: boolean
}

const Template = (args: PlaygroundProps) => {
  const {variant, sizeDescription, sizeHeading, heightImage, link, fullBleedImage} = args
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginTop: '10vh'}}>
      <Card variant={variant}>
        <Card.Image
          fullBleed={fullBleedImage}
          height={heightImage}
          src="https://user-images.githubusercontent.com/912236/213208795-ba61941e-a407-4973-86fd-d5b1697712bf.png"
          alt="Card image"
        />
        <Card.Heading size={sizeHeading}>Collaboration is the key to DevOps success</Card.Heading>
        <Card.Description size={sizeDescription}>
          Everything you need to know about getting started with GitHub Actions.
        </Card.Description>
        <Card.Action>{link ? <Link href="#">Call to action</Link> : <Button>Call to action</Button>}</Card.Action>
      </Card>
      <Card variant={variant}>
        <Card.Image
          fullBleed={fullBleedImage}
          height={heightImage}
          src="https://user-images.githubusercontent.com/912236/213241573-5705c304-712b-465b-912e-16533592f5ed.png"
          alt="Card image"
        />
        <Card.Heading size={sizeHeading}>GitHub Actions cheat sheet</Card.Heading>
        <Card.Description size={sizeDescription}>
          In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
        </Card.Description>
        <Card.Action>{link ? <Link href="#">Call to action</Link> : <Button>Call to action</Button>}</Card.Action>{' '}
      </Card>
      <Card variant={variant}>
        <Card.Image
          fullBleed={fullBleedImage}
          height={heightImage}
          src="https://user-images.githubusercontent.com/912236/213241619-ffc67a09-9f04-4ab3-9d6f-010a5cf93f1d.png"
          alt="Card image"
        />
        <Card.Heading size={sizeHeading}>How healthy teams build better software</Card.Heading>
        <Card.Description size={sizeDescription}>
          Your culture is key to recruiting and retaining the talent you need to ship exceptional customer experiences.
        </Card.Description>
        <Card.Action>
          <Card.Action>{link ? <Link href="#">Call to action</Link> : <Button>Call to action</Button>}</Card.Action>
        </Card.Action>
      </Card>
    </div>
  )
}

export const Playground = Template.bind({})
