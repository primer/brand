import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Footnotes} from './'

const meta = {
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
} satisfies Meta<typeof Footnotes>

export default meta
type Story = StoryObj<typeof Footnotes>

export const Playground: Story = {
  render: args => (
    <Footnotes {...args}>
      <Footnotes.Item>There are now 100 million developers around the world using GitHub. </Footnotes.Item>
      <Footnotes.Item>
        This factor is based on data from the industry&apos;s longest running analysis of fix rates Veracode State.
      </Footnotes.Item>
      <Footnotes.Item>
        Authentication with SAML single sign-on (SSO) available for organizations using GitHub Enterprise Cloud.
      </Footnotes.Item>
    </Footnotes>
  ),
}

export const Default: Story = {
  render: () => (
    <Footnotes>
      <Footnotes.Item>There are now 100 million developers around the world using GitHub. </Footnotes.Item>
    </Footnotes>
  ),
}
