import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {userEvent, waitFor} from 'storybook/test'

import {Button} from '.'
import {HeartFillIcon, MarkGithubIcon, PlayIcon} from '@primer/octicons-react'
import {Grid} from '../Grid'
import {Stack} from '../Stack'

const meta = {
  title: 'Components/Button/Features',
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <Button as="a" variant="primary" size="medium" href="#">
      Primary action
    </Button>
  ),
}

export const PrimaryDisabled: Story = {
  render: () => (
    <Button as="button" disabled variant="primary">
      Disabled primary button
    </Button>
  ),
}

export const PrimaryAriaDisabled: Story = {
  name: 'Primary w/ aria-disabled',
  render: () => (
    <Button as="button" aria-disabled="true" variant="primary">
      Disabled primary button
    </Button>
  ),
}

export const PrimaryFocus: Story = {
  render: () => (
    <Button variant="primary" size="large">
      Focus
    </Button>
  ),
  play: async () => {
    await waitFor(async () => {
      await userEvent.tab()
    })
  },
}

export const PrimaryFocusNonStandardBG: Story = {
  name: 'Primary Focus w/ non-standard background',
  render: () => (
    <div style={{padding: '1rem', backgroundColor: 'red'}}>
      <Button variant="primary" size="large">
        On a non-standard background
      </Button>
    </div>
  ),
  play: async () => {
    await waitFor(async () => {
      await userEvent.tab()
    })
  },
}

export const Secondary: Story = {
  render: () => (
    <Button as="a" variant="secondary" size="medium" href="#">
      Secondary action
    </Button>
  ),
}

export const SecondaryDisabled: Story = {
  render: () => (
    <Button as="button" disabled variant="secondary">
      Disabled secondary button
    </Button>
  ),
}

export const Subtle: Story = {
  render: () => (
    <Button as="a" variant="subtle" size="medium" href="#">
      Subtle action
    </Button>
  ),
}

export const SubtleDisabled: Story = {
  render: () => (
    <Button as="button" disabled variant="subtle">
      Disabled subtle button
    </Button>
  ),
}

export const Small: Story = {
  render: () => (
    <Button as="a" variant="primary" size="small" href="#">
      Small action
    </Button>
  ),
}

export const Large: Story = {
  render: () => (
    <Button as="a" variant="primary" size="large" href="#">
      Large action
    </Button>
  ),
}

export const Block: Story = {
  render: () => (
    <Button variant="primary" block>
      Block
    </Button>
  ),
}

export const Polymorphism: Story = {
  render: () => (
    <Button
      as="button"
      variant="primary"
      // eslint-disable-next-line no-console
      onClick={() => console.log('Clicked')}
    >
      Button action
    </Button>
  ),
}

export const WithHoverInteraction: Story = {
  name: 'Primary button with hover interaction',
  render: () => (
    <Button as="a" variant="primary" href="#" data-testid="hover-enabled-primary-button">
      Hover state for button
    </Button>
  ),
  parameters: {
    pseudo: {hover: ['[data-testid="hover-enabled-primary-button"]']},
  },
}

export const SecondaryWithHoverInteraction: Story = {
  name: 'Secondary button with hover interaction',
  render: () => (
    <Button as="a" variant="secondary" href="#" data-testid="hover-enabled-secondary-button">
      Hover state for button
    </Button>
  ),
  parameters: {
    pseudo: {hover: ['[data-testid="hover-enabled-secondary-button"]']},
  },
}

export const SubtleWithHoverInteraction: Story = {
  name: 'Subtle button with hover interaction',
  render: () => (
    <Button as="a" variant="subtle" href="#" data-testid="hover-enabled-subtle-button">
      Hover state for button
    </Button>
  ),
  parameters: {
    pseudo: {hover: ['[data-testid="hover-enabled-subtle-button"]']},
  },
}

export const WithLeadingVisualSVG: Story = {
  name: 'Leading visual (native)',
  render: () => (
    <Button
      variant="primary"
      leadingVisual={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-label="Magnifying glass icon"
        >
          <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
        </svg>
      }
    >
      With leading visual
    </Button>
  ),
}

export const WithTrailingVisualSVG: Story = {
  name: 'Trailing visual (native)',
  render: () => (
    <Button
      variant="primary"
      trailingVisual={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-label="Chevron pointing down icon"
        >
          <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
        </svg>
      }
    >
      With trailing visual
    </Button>
  ),
}

export const WithLeadingAndTrailingVisualSVG: Story = {
  name: 'Leading and trailing visual (native)',
  render: () => (
    <Button
      variant="primary"
      leadingVisual={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-label="Magnifying glass icon"
        >
          <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
        </svg>
      }
      trailingVisual={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-label="Chevron pointing down icon"
        >
          <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
        </svg>
      }
    >
      With leading and trailing visual
    </Button>
  ),
}

export const WithOptionalArrows: Story = {
  name: 'Deprecated arrows',
  tags: ['!dev', '!autodocs'],
  render: () => (
    <Stack direction="horizontal">
      <Button variant="primary" hasArrow>
        Primary
      </Button>
      <Button variant="secondary" hasArrow>
        Secondary
      </Button>
      <Button variant="subtle" hasArrow>
        Subtle
      </Button>
    </Stack>
  ),
}

export const WithOcticon: Story = {
  name: 'With an Octicon',
  render: () => (
    <Button variant="subtle" leadingVisual={<PlayIcon />}>
      With Octicon
    </Button>
  ),
}

export const WithOcticonLarge: Story = {
  name: 'With an Octicon (large)',
  render: () => (
    <Button variant="primary" leadingVisual={<MarkGithubIcon size={24} />}>
      With Octicon
    </Button>
  ),
}

export const WithVisualsAndDisabled: Story = {
  name: 'With visuals and disabled',
  render: () => (
    <Button disabled variant="primary" leadingVisual={<HeartFillIcon />} trailingVisual={<HeartFillIcon />}>
      With visuals and disabled
    </Button>
  ),
}

export const WithLongerText: Story = {
  render: () => (
    <Grid>
      <Grid.Column span={2}>
        <Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id.</Button>
      </Grid.Column>
    </Grid>
  ),
}
