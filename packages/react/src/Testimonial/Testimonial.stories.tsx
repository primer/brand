import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {useTranslation} from 'react-i18next'
import {
  Testimonial,
  TestimonialProps,
  TestimonialQuoteMarkColors,
  TestimonialVariants,
  defaultQuoteMarkColor,
  defaultTestimonialVariant,
} from '.'
import hubotAvatar from '../fixtures/images/avatar-hubot.png'

type StoryArgs = {
  type: string
  position?: string
  width: number
  name: string
  quote: string
} & TestimonialProps

const meta = {
  title: 'Components/Testimonial',
  component: Testimonial as Meta<StoryArgs>['component'],
  args: {
    quoteMarkColor: defaultQuoteMarkColor,
    name: 'Hubot',
    position: 'Chief Automation Officer',
    quote:
      'I automated the repetitive work. Then I automated telling everyone that I automated the repetitive work. Mona has now asked me to automate being a little more modest.',
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
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<StoryArgs>

export const Default: Story = {
  render: function DefaultExample() {
    const {t} = useTranslation('Testimonial')

    return (
      <Testimonial>
        <Testimonial.Quote>{t('automationQuote')}</Testimonial.Quote>
        <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name: 'Hubot'})} />
        <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
      </Testimonial>
    )
  },
}

export const Playground: Story = {
  render: function PlaygroundExample({type, width, name, position, quote, ...args}) {
    const {t} = useTranslation('Testimonial')
    const resolvedQuote = quote === meta.args.quote ? t('automationQuote') : quote
    const resolvedPosition = position === meta.args.position ? t('position') : position

    return (
      <div style={{width, maxWidth: '100%'}}>
        <Testimonial {...args}>
          <Testimonial.Quote>{resolvedQuote}</Testimonial.Quote>
          {type === 'avatar' && <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', {name})} />}
          {type === 'logo' && (
            <Testimonial.Logo>
              <img
                alt={t('logoAlt')}
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
                width={60}
              />
            </Testimonial.Logo>
          )}
          <Testimonial.Name position={resolvedPosition}>{name}</Testimonial.Name>
        </Testimonial>
      </div>
    )
  },
}
