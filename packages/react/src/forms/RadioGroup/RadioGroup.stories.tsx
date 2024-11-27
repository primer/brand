import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {RadioGroup, type RadioGroupProps} from '.'
import {Radio, FormControl, type FormValidationStatus} from '../..'

type RadioGroupStoryProps = {
  labelChildren: string
  labelVisuallyHidden: boolean
  captionChildren: string
  validationChildren: string
  validationVariant: FormValidationStatus
}

export type MetaProps = RadioGroupProps & RadioGroupStoryProps

const meta: Meta<MetaProps> = {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  args: {
    labelChildren: 'Number of users',
    labelVisuallyHidden: false,
    captionChildren: 'You can always change this later.',
    validationChildren: `That's the perfect number!`,
    validationVariant: 'success',
  },
  argTypes: {
    labelChildren: {
      name: 'Text',
      control: 'text',
      table: {
        category: 'Label',
      },
    },
    labelVisuallyHidden: {
      name: 'Visually hidden',
      control: 'boolean',
      table: {
        category: 'Label',
      },
    },
    captionChildren: {
      name: 'Text',
      control: 'text',
      table: {
        category: 'Caption',
      },
    },
    validationChildren: {
      name: 'Text',
      control: 'text',
      table: {
        category: 'Validation',
      },
    },
    validationVariant: {
      name: 'Variant',
      options: ['error', 'success'],
      control: {type: 'inline-radio'},
      table: {
        category: 'Validation',
      },
    },
  },
}

export default meta

type Story = StoryObj<MetaProps>

export const Playground: Story = {
  render: ({labelChildren, labelVisuallyHidden, captionChildren, validationChildren, validationVariant}) => {
    return (
      <RadioGroup>
        <RadioGroup.Label visuallyHidden={labelVisuallyHidden}>{labelChildren}</RadioGroup.Label>
        {captionChildren ? <RadioGroup.Caption>{captionChildren}</RadioGroup.Caption> : null}

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

        {validationChildren ? (
          <RadioGroup.Validation variant={validationVariant}>{validationChildren}</RadioGroup.Validation>
        ) : null}
      </RadioGroup>
    )
  },
}
