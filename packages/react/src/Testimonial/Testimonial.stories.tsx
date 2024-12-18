import React from 'react'
import {Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {
  Testimonial,
  TestimonialProps,
  TestimonialQuoteMarkColors,
  TestimonialVariants,
  defaultQuoteMarkColor,
  defaultTestimonialVariant,
} from '.'
import monaAvatar from '../fixtures/images/avatar-mona.png'

export default {
  title: 'Components/Testimonial',
  component: Testimonial,
  args: {
    quoteMarkColor: defaultQuoteMarkColor,
    name: 'David Ross',
    position: 'Staff Security Engineer',
    quote:
      'GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first line of code we’re writing.',
    size: 'small',
    type: 'avatar',
    width: 400,
    variant: defaultTestimonialVariant,
  },
  argTypes: {
    quoteMarkColor: {
      control: {
        type: 'radio',
        options: TestimonialQuoteMarkColors,
      },
    },
    name: {
      control: {type: 'text'},
    },
    position: {
      control: {type: 'text'},
    },
    quote: {
      control: {type: 'text'},
    },
    size: {
      options: ['small', 'large'],
    },
    type: {
      options: ['avatar', 'logo'],
      control: {type: 'radio'},
    },
    width: {
      control: {
        type: 'range',
        min: 250,
        max: 1200,
        step: 10,
      },
    },
    variant: {
      options: [...TestimonialVariants],
      control: {type: 'radio'},
    },
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof Testimonial>

type PlaygroundProps = TestimonialProps & {
  type: string
  position?: string
  width: number
  name: string
  quote: string
}

const Template = (args: PlaygroundProps) => {
  const {type, width, name, position, quote} = args
  return (
    <div style={{width, maxWidth: '100%'}}>
      <Testimonial {...args}>
        <Testimonial.Quote>{quote}</Testimonial.Quote>
        {type === 'avatar' && (
          <Testimonial.Avatar src={monaAvatar} alt={`Circular avatar from ${name}'s GitHub profile`} />
        )}
        {type === 'logo' && (
          <Testimonial.Logo>
            <img
              alt="GitHub Logo"
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
              width={60}
            />
          </Testimonial.Logo>
        )}
        <Testimonial.Name position={position}>{name}</Testimonial.Name>
      </Testimonial>
    </div>
  )
}

export const Playground = Template.bind({})
