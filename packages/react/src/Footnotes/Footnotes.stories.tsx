import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Footnotes} from './'

const meta: Meta<typeof Footnotes> = {
  title: 'Components/Footnotes',
  component: Footnotes,
  args: {
    as: 'ol',
    visuallyHiddenHeading: 'Footnotes',
  },
  argTypes: {
    as: {
      control: {
        type: 'inline-radio',
      },
      options: ['ol', 'div'],
    },
    visuallyHiddenHeading: {
      control: {
        type: 'text',
      },
    },
  },
}

export const Playground: StoryFn<typeof Footnotes> = args => (
  <Footnotes {...args}>
    <Footnotes.Item>There are now 100 million developers around the world using GitHub. </Footnotes.Item>
    <Footnotes.Item>
      This factor is based on data from the industry&apos;s longest running analysis of fix rates Veracode State.
    </Footnotes.Item>
    <Footnotes.Item>
      Authentication with SAML single sign-on (SSO) available for organizations using GitHub Enterprise Cloud.
    </Footnotes.Item>
  </Footnotes>
)

export const Default = () => (
  <Footnotes>
    <Footnotes.Item>There are now 100 million developers around the world using GitHub. </Footnotes.Item>
  </Footnotes>
)

export default meta
