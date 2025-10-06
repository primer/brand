import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {Grid, GridProps, GridColumnIndex} from './Grid'

type PlaygroundProps = GridProps & {
  columns: GridColumnIndex[]
}

const meta = {
  title: 'Components/Grid',
  component: Grid,
  args: {
    as: 'div',
    enableOverlay: true,
    columns: [6, 6],
  },
  argTypes: {
    enableOverlay: {
      control: 'boolean',
    },
    columns: {
      control: {
        type: 'object',
      },
      description:
        'An array of numbers where the index position maps to the column number and the value maps to the `span` prop.',
    },
  },
} satisfies Meta<PlaygroundProps>

export default meta
type Story = StoryObj<PlaygroundProps>

export const Playground: Story = {
  render: args => (
    <Grid {...args}>
      {(args as PlaygroundProps).columns.map((value, i) => (
        <Grid.Column key={i} span={value}>
          &nbsp;
        </Grid.Column>
      ))}
    </Grid>
  ),
}

export const Default: Story = {
  render: args => (
    <Grid {...args}>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
      <Grid.Column span={1}>&nbsp;</Grid.Column>
    </Grid>
  ),
}
