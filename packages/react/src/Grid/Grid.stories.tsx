import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Grid, GridProps, GridColumnIndex} from './Grid'

export default {
  title: 'Components/Grid',
  component: Grid,
  args: {
    as: 'div',
    gap: 'normal',
    enableOverlay: true,
    columns: [6, 6]
  },
  argTypes: {
    enableOverlay: {
      control: 'boolean'
    },
    columns: {
      control: {
        type: 'array',
        items: {
          type: 'number'
        }
      },
      defaultValue: [6, 6],
      description:
        'An array of numbers where the index position maps to the column number and the value maps to the `span` prop.'
    }
  }
} as ComponentMeta<typeof Grid>

type PlaygroundProps = GridProps & {
  columns: GridColumnIndex[]
}

const Template: ComponentStory<typeof Grid> = args => (
  <Grid {...args}>
    {(args as PlaygroundProps).columns.map((value, i) => (
      <Grid.Column key={i} span={value}>
        &nbsp;
      </Grid.Column>
    ))}
  </Grid>
)

export const Playground = Template.bind({})

export const Default = args => (
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
)
