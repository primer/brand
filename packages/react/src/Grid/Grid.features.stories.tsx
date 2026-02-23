import type {Meta} from '@storybook/react'
import React from 'react'
import {Grid} from './Grid'
import {Text} from '../Text'

import styles from './Grid.stories.module.css'

export default {
  title: 'Components/Grid/Features',
  component: Grid,
  // add default props
  args: {
    as: 'div',
    enableOverlay: true,
  },
} as Meta<typeof Grid>

export const Asymmetry = args => {
  const ColumnNumber = ({children}) => (
    <Text className={styles['centered-label']} size="100">
      {children}
    </Text>
  )
  return (
    <>
      <Grid {...args}>
        <Grid.Column span={1}>
          <ColumnNumber>1</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={11}>
          <ColumnNumber>11</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={2}>
          <ColumnNumber>2</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={10}>
          <ColumnNumber>10</ColumnNumber>
        </Grid.Column>
      </Grid>
      <Grid {...args}>
        <Grid.Column span={3}>
          <ColumnNumber>3</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={9}>
          <ColumnNumber>9</ColumnNumber>
        </Grid.Column>
      </Grid>
      <Grid {...args}>
        <Grid.Column span={4}>
          <ColumnNumber>4</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={8}>
          <ColumnNumber>8</ColumnNumber>
        </Grid.Column>
      </Grid>
      <Grid {...args}>
        <Grid.Column span={5}>
          <ColumnNumber>5</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={7}>
          <ColumnNumber>7</ColumnNumber>
        </Grid.Column>
      </Grid>
      <Grid {...args}>
        <Grid.Column span={6}>
          <ColumnNumber>6</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={6}>
          <ColumnNumber>6</ColumnNumber>
        </Grid.Column>
      </Grid>
      <Grid {...args}>
        <Grid.Column span={7}>
          <ColumnNumber>7</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={5}>
          <ColumnNumber>5</ColumnNumber>
        </Grid.Column>
      </Grid>
      <Grid {...args}>
        <Grid.Column span={8}>
          <ColumnNumber>8</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={4}>
          <ColumnNumber>4</ColumnNumber>
        </Grid.Column>
      </Grid>
      <Grid {...args}>
        <Grid.Column span={9}>
          <ColumnNumber>9</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={3}>
          <ColumnNumber>3</ColumnNumber>
        </Grid.Column>
      </Grid>
      <Grid {...args}>
        <Grid.Column span={10}>
          <ColumnNumber>10</ColumnNumber>
        </Grid.Column>
        <Grid.Column span={2}>
          <ColumnNumber>2</ColumnNumber>
        </Grid.Column>
      </Grid>
    </>
  )
}

export const Nesting = args => {
  return (
    <Grid {...args}>
      <Grid.Column>
        <Grid {...args}>
          <Grid.Column span={{xsmall: 12, medium: 6}}>
            <Grid {...args}>
              <Grid.Column span={{xsmall: 12, medium: 6}}></Grid.Column>
              <Grid.Column span={{xsmall: 12, medium: 6}}></Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column span={{xsmall: 12, medium: 6}}></Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  )
}

export const Responsive = args => {
  return (
    <Grid {...args}>
      <Grid.Column span={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 6, small: 6, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 6, small: 6, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 6, small: 6, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 6, small: 6, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 6, small: 6, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 6, small: 6, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 6, small: 6, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
      <Grid.Column span={{xsmall: 6, small: 6, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}></Grid.Column>
    </Grid>
  )
}

export const Centering = args => {
  return (
    <Grid {...args}>
      <Grid.Column span={6} start={4}></Grid.Column>
    </Grid>
  )
}

export const FiftyFifty = args => {
  return (
    <Grid {...args}>
      <Grid.Column span={6}></Grid.Column>
      <Grid.Column span={6}></Grid.Column>
    </Grid>
  )
}
FiftyFifty.storyName = 'Ratio: 50:50'

export const SixtyForty = args => {
  return (
    <Grid {...args}>
      <Grid.Column span={7}></Grid.Column>
      <Grid.Column span={5}></Grid.Column>
    </Grid>
  )
}
SixtyForty.storyName = 'Ratio: 60:40'

export const FortySixty = args => {
  return (
    <Grid {...args}>
      <Grid.Column span={5}></Grid.Column>
      <Grid.Column span={7}></Grid.Column>
    </Grid>
  )
}
FortySixty.storyName = 'Ratio: 40:60'

export const ResponsiveMinWidth = args => {
  return (
    <Grid {...args}>
      <Grid.Column
        span={{
          large: 6,
        }}
      ></Grid.Column>
      <Grid.Column
        span={{
          xsmall: 3,
          large: 6,
        }}
      ></Grid.Column>
    </Grid>
  )
}

export const DisableGutters = args => {
  return (
    <Grid {...args} enableGutters={false}>
      <Grid.Column span={6}>Column one</Grid.Column>
      <Grid.Column span={6}>Column two</Grid.Column>
    </Grid>
  )
}
