import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import baseMeta, {type MetaProps} from './RiverAccordion.stories'

const meta: Meta<MetaProps> = {...baseMeta, title: 'Components/RiverAccordion/Features'}
export default meta

type Story = StoryObj<MetaProps>

export const AlignStart: Story = {
  args: {
    align: 'start',
  },
}

export const AlignEnd: Story = {
  args: {
    align: 'end',
  },
}
