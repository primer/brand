import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {Bento} from '.'
import placeholderImage from '../fixtures/images/placeholder-600x400.png'

export default {
  title: 'Components/Bento/features',
  component: Bento,
} as Meta<typeof Bento>

export const Universe: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={3} rowSpan={8} />
    <Bento.Item columnSpan={3} rowSpan={4} />
    <Bento.Item columnSpan={6} rowSpan={8} />
    <Bento.Item columnSpan={3} rowSpan={4} rowStart={9} />
    <Bento.Item columnSpan={3} rowSpan={8} />
    <Bento.Item columnSpan={6} rowSpan={4} />
  </Bento>
)

export const EnterpriseOne: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={12} rowSpan={4} />
    <Bento.Item columnSpan={7} rowSpan={4} />
    <Bento.Item columnSpan={5} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
  </Bento>
)

export const EnterpriseTwo: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={12} rowSpan={4} />
    <Bento.Item columnSpan={5} rowSpan={4} />
    <Bento.Item columnSpan={7} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
  </Bento>
)

export const EnterpriseThree: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={7} rowSpan={4} />
    <Bento.Item columnSpan={5} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
  </Bento>
)
