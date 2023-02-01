import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {userEvent, waitFor, within} from '@storybook/testing-library'

import {Button} from '.'

export default {
  title: 'Components/Button/Features',
  component: Button
} as ComponentMeta<typeof Button>

export const Primary = () => (
  <Button as="a" variant="primary" size="medium" href="#">
    Primary action
  </Button>
)

export const PrimaryDisabled = () => (
  <Button as="button" disabled variant="primary" href="#">
    Disabled primary button
  </Button>
)

export const PrimaryFocus = () => (
  <Button variant="primary" size="large" href="#">
    Focus
  </Button>
)
PrimaryFocus.play = async () => {
  await waitFor(async () => {
    userEvent.tab()
  })
}

export const PrimaryFocusNonStandardBG = () => (
  <div style={{padding: '1rem', backgroundColor: 'red'}}>
    <Button variant="primary" size="large" href="#">
      On a non-standard background
    </Button>
  </div>
)
PrimaryFocusNonStandardBG.storyName = 'Primary Focus w/ non-standard background'
PrimaryFocusNonStandardBG.play = async () => {
  await waitFor(async () => {
    userEvent.tab()
  })
}

export const Secondary = () => (
  <Button as="a" variant="secondary" size="medium" href="#">
    Secondary action
  </Button>
)

export const SecondaryDisabled = () => (
  <Button as="button" disabled variant="secondary" href="#">
    Disabled secondary button
  </Button>
)

export const Subtle = () => (
  <Button as="a" variant="subtle" size="medium" href="#">
    Subtle action
  </Button>
)

export const SubtleDisabled = () => (
  <Button as="button" disabled variant="subtle" href="#">
    Disabled subtle button
  </Button>
)

export const Large = () => (
  <Button as="a" variant="primary" size="large" href="#">
    Large action
  </Button>
)

export const Polymorphism = () => (
  <Button
    as="button"
    variant="primary"
    href="#"
    // eslint-disable-next-line no-console
    onClick={() => console.log('Clicked')}
  >
    Button action
  </Button>
)

/* 
  Storybook Interactions cannot natively simulate hover state on CSS pseudo-class. 
  Only simulates JS-based state.
  TODO: Investigate perf impact of using "https://storybook.js.org/addons/storybook-addon-pseudo-states"
*/
export const WithHoverInteraction = () => (
  <Button as="a" variant="primary" href="#">
    Hover state for button
  </Button>
)
WithHoverInteraction.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)

  await waitFor(async () => {
    await userEvent.hover(canvas.getByText('Hover state for button'))
  })
}
WithHoverInteraction.storyName = 'Primary button with hover interaction'

/* 
  Storybook Interactions cannot natively simulate hover state on CSS pseudo-class. 
  Only simulates JS-based state.
  TODO: Investigate perf impact of using "https://storybook.js.org/addons/storybook-addon-pseudo-states"
*/
export const SecondaryWithHoverInteraction = () => (
  <Button as="a" variant="secondary" href="#">
    Hover state for button
  </Button>
)
SecondaryWithHoverInteraction.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)

  await waitFor(async () => {
    await userEvent.hover(canvas.getByText('Hover state for button'))
  })
}
SecondaryWithHoverInteraction.storyName = 'Secondary button with hover interaction'

/* 
  Storybook Interactions cannot natively simulate hover state on CSS pseudo-class. 
  Only simulates JS-based state.
  TODO: Investigate perf impact of using "https://storybook.js.org/addons/storybook-addon-pseudo-states"
*/
export const SubtleWithHoverInteraction = () => (
  <Button as="a" variant="subtle" href="#">
    Hover state for button
  </Button>
)
SubtleWithHoverInteraction.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)

  await waitFor(async () => {
    await userEvent.hover(canvas.getByText('Hover state for button'))
  })
}
SubtleWithHoverInteraction.storyName = 'Subtle button with hover interaction'
