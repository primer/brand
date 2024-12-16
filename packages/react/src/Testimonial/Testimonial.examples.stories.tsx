import React from 'react'
import type {StoryObj} from '@storybook/react'
import clsx from 'clsx'

import {Testimonial, TestimonialProps} from '.'
import {Box, FrostedGlassVFX, Grid, Image, Stack, ThemeProvider} from '../'
import monaAvatar from '../fixtures/images/avatar-mona.png'
import startShape from '../fixtures/images/testimonial-bg-1.png'
import endShape from '../fixtures/images/testimonial-bg-2.png'

import styles from './Testimonial.stories.module.css'

type MetaProps = TestimonialProps

const meta = {component: Testimonial, title: 'Components/Testimonial/Examples'}
export default meta

type Story = StoryObj<MetaProps>

export const WithFrostedGlass: Story = {
  parameters: {
    layout: 'full',
  },
  decorators: [
    Story => (
      <ThemeProvider colorMode="light" className={styles.container}>
        <Box backgroundColor="subtle" paddingBlockStart={128} paddingBlockEnd={128} className={styles.innerContainer}>
          <Image src={startShape} alt="Starting shape" className={clsx(styles.exampleShape)} width={612} />
          <Image src={endShape} alt="Ending shape" className={styles.exampleShape} width={612} />
          <Grid>
            <Grid.Column>
              <Story />
            </Grid.Column>
          </Grid>
        </Box>
      </ThemeProvider>
    ),
  ],
  render: () => {
    return (
      <FrostedGlassVFX>
        <Testimonial size="large" variant="default" quoteMarkColor="purple">
          <Testimonial.Quote>
            GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the
            first line of code we&apos;re writing.
          </Testimonial.Quote>
          <Testimonial.Name>David Ross</Testimonial.Name>
          <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
        </Testimonial>
      </FrostedGlassVFX>
    )
  },
}

export const Duo: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad12p',
    },
  },
  render: args => (
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
          CI/CD with GitHub Actions allows us to build, test, and deploy right from GitHub. We’ve reduced build time
          from 80 to 10 minutes.
        </Testimonial.Quote>
        <Testimonial.Name position="Pinterest">Engineering Architect</Testimonial.Name>
        <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
      </Testimonial>
    </Stack>
  ),
}

export const Trio: Story = {
  render: args => (
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
          CI/CD with GitHub Actions allows us to build, test, and deploy right from GitHub. We’ve reduced build time
          from 80 to 10 minutes.
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
  ),
}
