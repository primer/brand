import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {TextInput} from '../'
import {FormControl} from '.'
import {CheckIcon, SearchIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Forms/FormControl',
  component: FormControl,
  argTypes: {
    leadingText: {
      type: 'string',
      name: 'leading text',
      description: 'string',
      table: {
        category: 'Input'
      }
    },
    trailingText: {
      type: 'string',
      name: 'trailing text',
      description: 'string',
      table: {
        category: 'Input'
      }
    },
    size: {
      options: [0, 1],
      mapping: ['medium', 'large'],
      control: {
        type: 'inline-radio',
        labels: ['medium', 'large']
      },
      table: {
        category: 'Input'
      }
    },
    validationStatus: {
      options: [0, 1, 2], // iterator
      mapping: [undefined, 'error', 'success'], // values
      control: {
        type: 'inline-radio',
        labels: ['undefined', 'error', 'success']
      },
      table: {
        category: 'Validation'
      }
    },
    validationText: {
      type: 'string',
      table: {
        category: 'Validation'
      }
    },
    fullWidth: {
      description: 'formerly called Block',
      control: {type: 'boolean'},
      table: {
        category: 'Input'
      }
    },

    monospace: {
      description: 'monospace text',
      control: {type: 'boolean'},
      table: {
        category: 'Input'
      }
    },
    inset: {
      description: 'formerly called Contrast',
      control: {type: 'boolean'},
      table: {
        category: 'Input'
      }
    },
    disabled: {
      description: 'disabled field',
      control: {type: 'boolean'},
      table: {
        category: 'Input'
      }
    },
    required: {
      description: 'required field',
      control: {type: 'boolean'},
      table: {
        category: 'Input'
      }
    },
    placeholder: {
      type: 'string',
      name: 'placeholder',
      description: 'string',
      table: {
        category: 'Input'
      }
    },
    leadingVisual: {
      control: {type: 'boolean'},
      name: 'leading visual',
      description: 'Octicon',
      table: {
        category: 'Input'
      }
    },
    trailingVisual: {
      control: {type: 'boolean'},
      name: 'trailing visual',
      description: 'Octicon',
      table: {
        category: 'Input'
      }
    }
  }
} as ComponentMeta<typeof FormControl>

const Template = args => {
  return (
    <FormControl
      id="override"
      required={args.required}
      validationStatus={args.validationStatus}
      fullWidth={args.fullWidth}
      {...args}
    >
      <FormControl.Label>Enterprise URL</FormControl.Label>
      <FormControl.TextInput
        validationStatus={args.validationStatus}
        leadingVisual={args.leadingVisual ? CheckIcon : undefined}
        leadingText={args.leadingText}
        trailingVisual={args.trailingVisual ? SearchIcon : undefined}
        trailingText={args.trailingText}
        disabled={args.disabled}
        monospace={args.monospace}
        inset={args.inset}
        size={args.size}
        placeholder={args.placeholder}
        required={args.required}
      />

      {args.validationStatus && args.validationStatus === 'error' && (
        <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
      )}
      {args.validationStatus && args.validationStatus === 'success' && (
        <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
      )}
    </FormControl>
  )
}

export const Default = Template.bind({
  title: 'Enterprise URL'
})
