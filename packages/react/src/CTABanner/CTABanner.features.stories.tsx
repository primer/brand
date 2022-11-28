import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Playground} from './CTABanner.stories'

import {CTABanner} from './CTABanner'

export default {
  title: 'Components/CTABanner/Features',
  component: CTABanner
} as ComponentMeta<typeof CTABanner>

export const WithBorder = Playground.bind({})
WithBorder.args = {
  hasBorder: true
}

export const WithNoShadow = Playground.bind({})
WithNoShadow.args = {
  hasShadow: false
}

export const AlignedCenter = Playground.bind({})
AlignedCenter.args = {
  align: 'center'
}
