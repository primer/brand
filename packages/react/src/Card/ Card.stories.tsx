import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Card, CardVariants, CardProps, CardSizes} from '.'
import {CopilotIcon, RocketIcon, GitBranchIcon} from '@primer/octicons-react'

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
      defaultValue: false
    }
  }
} as ComponentMeta<typeof Card>

type PlaygroundProps = CardProps & {
  image?: boolean
  height: number
  width: number
  size: typeof CardSizes[number]
  fill?: boolean
  fullBleedImage?: boolean
}

const Template = (args: PlaygroundProps) => {
  const {size, image, height, width, fullBleedImage, fill} = args
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginTop: '10vh'}}>
      <Card {...args} size={size}>
        <Card.Icon
          icon={CopilotIcon}
          fill="var(--base-color-scale-blue-6)"
          background="var(--base-color-scale-blue-1)"
        />
        {image && (
          <Card.Image
            fullBleed={fullBleedImage}
            fill={fill}
            height={height}
            width={width}
            src="https://user-images.githubusercontent.com/912236/213208795-ba61941e-a407-4973-86fd-d5b1697712bf.png"
            alt="Card image"
          />
        )}
        <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
        <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
      </Card>
      <Card {...args}>
        <Card.Icon
          icon={GitBranchIcon}
          fill="var(--base-color-scale-orange-6)"
          background="var(--base-color-scale-orange-1)"
        />
        {image && (
          <Card.Image
            fullBleed={fullBleedImage}
            fill={fill}
            height={height}
            width={width}
            src="https://user-images.githubusercontent.com/912236/213241573-5705c304-712b-465b-912e-16533592f5ed.png"
            alt="Card image"
          />
        )}
        <Card.Heading>GitHub Actions cheat sheet</Card.Heading>
        <Card.Description>
          In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
        </Card.Description>
      </Card>
      <Card {...args}>
        <Card.Icon
          icon={RocketIcon}
          fill="var(--base-color-scale-purple-6)"
          background="var(--base-color-scale-purple-0)"
        />
        {image && (
          <Card.Image
            fullBleed={fullBleedImage}
            fill={fill}
            height={height}
            width={width}
            src="https://user-images.githubusercontent.com/912236/213241619-ffc67a09-9f04-4ab3-9d6f-010a5cf93f1d.png"
            alt="Card image"
          />
        )}
        <Card.Heading>How healthy teams build better software</Card.Heading>
        <Card.Description>
          Your culture is key to recruiting and retaining the talent you need to ship exceptional customer experiences.
        </Card.Description>
      </Card>
    </div>
  )
}

export const Playground = Template.bind({})
