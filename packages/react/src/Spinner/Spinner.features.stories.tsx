import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Stack} from '../Stack'
import {Spinner} from './Spinner'
import styles from './Spinner.stories.module.css'

const meta = {
  title: 'Components/Spinner/Features',
  component: Spinner,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  render: () => (
    <Stack direction="horizontal" alignItems="center" gap="spacious">
      <Spinner size="small" className={process.env.NODE_ENV === 'test' ? styles.Spinner__pauseAnimations : undefined} />
      <Spinner
        size="medium"
        className={process.env.NODE_ENV === 'test' ? styles.Spinner__pauseAnimations : undefined}
      />
      <Spinner size="large" className={process.env.NODE_ENV === 'test' ? styles.Spinner__pauseAnimations : undefined} />
    </Stack>
  ),
}

export const Dark: Story = {
  parameters: {colorMode: 'dark'},
  render: () => <Spinner className={process.env.NODE_ENV === 'test' ? styles.Spinner__pauseAnimations : undefined} />,
}
