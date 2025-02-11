import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {RadioGroup} from '.'
import {Radio, FormControl, Stack} from '../..'
import baseMeta, {type MetaProps} from './RadioGroup.stories'

const meta: Meta<MetaProps> = {...baseMeta, title: 'Components/Forms/RadioGroup/Examples'}
export default meta

type Story = StoryObj<MetaProps>

export const Inline: Story = {
  args: {
    labelChildren: 'Inline example',
    labelVisuallyHidden: false,
    captionChildren: 'Radios can be displayed inline too',
    validationChildren: '',
  },
  render: ({labelChildren, labelVisuallyHidden, captionChildren, validationChildren, validationVariant}) => {
    return (
      <RadioGroup>
        <RadioGroup.Label visuallyHidden={labelVisuallyHidden}>{labelChildren}</RadioGroup.Label>
        {captionChildren ? <RadioGroup.Caption>{captionChildren}</RadioGroup.Caption> : null}

        <Stack direction="horizontal" gap="normal" padding="none" flexWrap="wrap">
          <FormControl>
            <FormControl.Label>0-99</FormControl.Label>
            <Radio name="demo" value="one" />
          </FormControl>
          <FormControl>
            <FormControl.Label>100-999</FormControl.Label>
            <Radio name="demo" value="two" defaultChecked />
          </FormControl>
          <FormControl>
            <FormControl.Label>1000+</FormControl.Label>
            <Radio name="demo" value="three" />
          </FormControl>
        </Stack>

        {validationChildren ? (
          <RadioGroup.Validation variant={validationVariant}>{validationChildren}</RadioGroup.Validation>
        ) : null}
      </RadioGroup>
    )
  },
}
