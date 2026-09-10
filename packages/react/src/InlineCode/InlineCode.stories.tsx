import type {Meta, StoryObj} from '@storybook/react'
import {InlineCode} from '.'

const meta = {
  title: 'Components/InlineCode',
  component: InlineCode,
} satisfies Meta<typeof InlineCode>

export default meta
type Story = StoryObj<typeof InlineCode>

export const Default: Story = {
  args: {
    children: 'npm install @primer/react-brand',
  },
}

export const Playground: Story = {
  args: {
    children: 'npm install @primer/react-brand',
  },
}
