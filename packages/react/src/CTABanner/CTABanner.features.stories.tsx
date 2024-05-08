import React from 'react'
import {Meta} from '@storybook/react'
import {ActionMenu} from '../ActionMenu'
import {Button} from '../Button'

import {CTABanner} from './CTABanner'

export default {
  title: 'Components/CTABanner/Features',
  component: CTABanner,
} as Meta<typeof CTABanner>

export const WithBorder = () => (
  <CTABanner hasBorder>
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Primary Action</Button>
      <Button>Secondary Action</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
)

export const WithNoShadow = () => (
  <CTABanner hasShadow={false}>
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Primary Action</Button>
      <Button>Secondary Action</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
)

export const AlignedCenter = () => (
  <CTABanner align="center">
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Primary Action</Button>
      <Button>Secondary Action</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
)

const ExampleTrailingComponent = () => (
  <ActionMenu>
    <ActionMenu.Button>Open menu</ActionMenu.Button>
    <ActionMenu.Overlay aria-label="GitHub features">
      <ActionMenu.Item value="Copilot" selected>
        Copilot
      </ActionMenu.Item>
      <ActionMenu.Item value="Codespaces">Codespaces</ActionMenu.Item>
      <ActionMenu.Item value="CodeQL">CodeQL</ActionMenu.Item>
    </ActionMenu.Overlay>
  </ActionMenu>
)

export const WithTrailingComponent = () => (
  <CTABanner trailingComponent={ExampleTrailingComponent}>
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
  </CTABanner>
)

const designTokenOverrides = `
  .custom-colors {
    --brand-CTABanner-shadow-color-start: var(--base-color-scale-purple-5);
    --brand-CTABanner-shadow-color-end: var(--base-color-scale-red-5);
  }
`

export const CustomShadow = () => (
  <div className="custom-colors">
    <style>{designTokenOverrides}</style>
    <CTABanner align="center">
      <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
  </div>
)
