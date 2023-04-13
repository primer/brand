import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Label} from '.'
import {CopilotIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Label/Features',
  component: Label
} as ComponentMeta<typeof Label>

export const Small = () => <Label size="small">Small</Label>

export const Large = () => <Label size="large">Large</Label>

export const Color = () => (
  <>
    <Label>Default</Label>
    <Label color="blue">Blue</Label>
    <Label color="blue-purple">Blue purple</Label>
    <Label color="coral">Coral</Label>
    <Label color="green">Green</Label>
    <Label color="green-blue">Green blue</Label>
    <Label color="gray">Gray</Label>
    <Label color="indigo">Indigo</Label>
    <Label color="lemon">Lemon</Label>
    <Label color="lime">Lime</Label>
    <Label color="orange">Orange</Label>
    <Label color="pink">Pink</Label>
    <Label color="pink-blue">Pink blue</Label>
    <Label color="purple">Purple</Label>
    <Label color="purple-red">Purple red</Label>
    <Label color="red">Red</Label>
    <Label color="red-orange">Red orange</Label>
    <Label color="teal">Teal</Label>
    <Label color="yellow">Yellow</Label>
  </>
)

export const WithLeadingVisualSVG = () => (
  <Label
    leadingVisual={
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <path
          d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"
          fill="currentColor"
        ></path>
      </svg>
    }
  >
    With leading visual
  </Label>
)
WithLeadingVisualSVG.storyName = 'Leading visual (native)'

export const WithOcticon = () => <Label leadingVisual={CopilotIcon}>With Octicon</Label>
WithOcticon.storyName = 'With an Octicon'

export const WithOcticonLarge = () => (
  <Label size="large" leadingVisual={() => <CopilotIcon size={24} />}>
    With Octicon
  </Label>
)
WithOcticonLarge.storyName = 'With an Octicon (large)'

export const WithOcticonColor = () => (
  <Label color="blue-purple" leadingVisual={CopilotIcon}>
    With Octicon
  </Label>
)
WithOcticonColor.storyName = 'With an Octicon and color'
