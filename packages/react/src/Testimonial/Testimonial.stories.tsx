import React from 'react'
import {Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Testimonial, TestimonialProps, TestimonialQuoteMarkColors, defaultQuoteMarkColor} from '.'
import {Stack} from '../'
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

export const Avatar = () => (
  <div style={{width: 400, maxWidth: '100%'}}>
    <Testimonial>
      <Testimonial.Quote>
        GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
        line of code we&apos;re writing.
      </Testimonial.Quote>
      <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
      <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
    </Testimonial>
  </div>
)

export const Logo = () => (
  <div style={{width: 400, maxWidth: '100%'}}>
    <Testimonial>
      <Testimonial.Quote>
        GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
        line of code we&apos;re writing.
      </Testimonial.Quote>
      <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>

      <Testimonial.Logo>
        <img
          alt="GitHub Logo"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
          width={60}
        />
      </Testimonial.Logo>
    </Testimonial>
  </div>
)

export const Duo = args => (
  <Stack
    direction={{
      narrow: 'vertical',
      regular: 'horizontal',
    }}
    gap="spacious"
    alignItems="flex-start"
    padding={{
      narrow: 'condensed',
      regular: 'normal',
      wide: 'spacious',
    }}
  >
    <Testimonial {...args}>
      <Testimonial.Quote>
        GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
        line of code we&apos;re writing.
      </Testimonial.Quote>
      <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>

      <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
    </Testimonial>
    <Testimonial {...args}>
      <Testimonial.Quote>
        CI/CD with GitHub Actions allows us to build, test, and deploy right from GitHub. We’ve reduced build time from
        80 to 10 minutes.
      </Testimonial.Quote>
      <Testimonial.Name position="Pinterest">Engineering Architect</Testimonial.Name>

      <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
    </Testimonial>
  </Stack>
)
Duo.parameters = {
  viewport: {
    defaultViewport: 'ipad12p',
  },
}

export const Trio = args => (
  <Stack
    direction={{
      narrow: 'vertical',
      regular: 'horizontal',
    }}
    gap="spacious"
    alignItems="flex-start"
    padding={{
      narrow: 'condensed',
      regular: 'normal',
      wide: 'spacious',
    }}
  >
    <Testimonial {...args}>
      <Testimonial.Quote>
        GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
        line of code we&apos;re writing.
      </Testimonial.Quote>
      <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>

      <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
    </Testimonial>
    <Testimonial {...args}>
      <Testimonial.Quote>
        CI/CD with GitHub Actions allows us to build, test, and deploy right from GitHub. We’ve reduced build time from
        80 to 10 minutes.
      </Testimonial.Quote>
      <Testimonial.Name position="Pinterest">Engineering Architect</Testimonial.Name>

      <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
    </Testimonial>
    <Testimonial {...args}>
      <Testimonial.Quote>
        With GitHub, we can scale and build projects on a new level now. It’s not about how good you are alone. It’s
        about the greatness we can achieve through sharing and collaboration.
      </Testimonial.Quote>
      <Testimonial.Name position="Engie">Head of Digital Communities</Testimonial.Name>
      <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
    </Testimonial>
  </Stack>
)

export const ColoredQuoteMark = args => (
  <div style={{width: 400, maxWidth: '100%'}}>
    <Testimonial {...args}>
      <Testimonial.Quote>
        GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
        line of code we&apos;re writing.
      </Testimonial.Quote>
      <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>

      <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
    </Testimonial>
  </div>
)

ColoredQuoteMark.args = {
  quoteMarkColor: 'blue',
}

export const Large = args => (
  <div style={{width: 720, maxWidth: '100%'}}>
    <Testimonial {...args}>
      <Testimonial.Quote>
        GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
        line of code we&apos;re writing.
      </Testimonial.Quote>
      <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
      <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
    </Testimonial>
  </div>
)

Large.args = {
  size: 'large',
}

export const LargeHighlightedPortion = args => (
  <div style={{width: 720, maxWidth: '100%'}}>
    <Testimonial {...args}>
      <Testimonial.Quote>
        <b>GitHub helps us ensure that we have our security controls baked into our pipelines</b> all the way from the
        first line of code we&apos;re writing.
      </Testimonial.Quote>
      <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
      <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
    </Testimonial>
  </div>
)

LargeHighlightedPortion.args = {
  size: 'large',
}
