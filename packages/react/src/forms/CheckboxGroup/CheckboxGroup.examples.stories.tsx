import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {CheckboxGroup} from '.'
import {Checkbox, FormControl, Stack} from '../..'
import baseMeta, {type MetaProps} from './CheckboxGroup.stories'

const meta: Meta<MetaProps> = {...baseMeta, title: 'Components/Forms/CheckboxGroup/Examples'}
export default meta

type Story = StoryObj<MetaProps>

export const Inline: Story = {
  args: {
    labelChildren: 'Inline example',
    labelVisuallyHidden: false,
    captionChildren: 'Checkboxes can be displayed inline too',
    validationChildren: '',
  },
  render: ({labelChildren, labelVisuallyHidden, captionChildren, validationChildren, validationVariant}) => {
    return (
      <CheckboxGroup>
        <CheckboxGroup.Label visuallyHidden={labelVisuallyHidden}>{labelChildren}</CheckboxGroup.Label>
        {captionChildren ? <CheckboxGroup.Caption>{captionChildren}</CheckboxGroup.Caption> : null}

        <Stack direction="horizontal" gap="normal" padding="none" flexWrap="wrap">
          <FormControl>
            <FormControl.Label>Choice one</FormControl.Label>
            <Checkbox value="one" defaultChecked />
          </FormControl>
          <FormControl>
            <FormControl.Label>Choice two</FormControl.Label>
            <Checkbox value="two" defaultChecked />
          </FormControl>
          <FormControl>
            <FormControl.Label>Choice three</FormControl.Label>
            <Checkbox value="three" />
          </FormControl>
        </Stack>

        {validationChildren ? (
          <CheckboxGroup.Validation variant={validationVariant}>{validationChildren}</CheckboxGroup.Validation>
        ) : null}
      </CheckboxGroup>
    )
  },
}
