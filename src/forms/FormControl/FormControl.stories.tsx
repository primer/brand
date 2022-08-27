import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {FormControl} from '.'
import {CheckIcon, SearchIcon} from '@primer/octicons-react'
import {TextInput} from '../TextInput'

export default {
  title: 'Components/Forms/FormControl',
  component: FormControl,
  argTypes: {
    label: {
      type: 'string',
      name: 'label',
      defaultValue: 'Label of input',
      description: 'string',
      table: {
        category: 'Label'
      }
    },
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
    visuallyHidden: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        category: 'Label'
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
      defaultValue: false,
      table: {
        category: 'Input'
      }
    },

    monospace: {
      description: 'monospace text',
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        category: 'Input'
      }
    },
    inset: {
      description: 'formerly called Contrast',
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        category: 'Input'
      }
    },
    disabled: {
      description: 'disabled field',
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        category: 'Input'
      }
    },
    required: {
      description: 'required field',
      control: {type: 'boolean'},
      defaultValue: false,
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
      defaultValue: false,
      name: 'leading visual',
      description: 'Octicon',
      table: {
        category: 'Input'
      }
    },
    trailingVisual: {
      control: {type: 'boolean'},
      defaultValue: false,
      name: 'trailing visual',
      description: 'Octicon',
      table: {
        category: 'Input'
      }
    },
    className: {
      type: 'string',
      name: 'className',
      description: 'string',
      table: {
        category: 'Root'
      }
    },
    id: {
      type: 'string',
      name: 'id',
      description: 'string',
      table: {
        category: 'Root'
      }
    },
    ref: {
      type: 'function',
      name: 'ref',
      description: 'string',
      table: {
        disable: true
      }
    },
    children: {
      type: 'function',
      name: 'children',
      description: 'string',
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof FormControl>

export const Playground = args => {
  return (
    <FormControl
      id="override"
      required={args.required}
      validationStatus={args.validationStatus}
      fullWidth={args.fullWidth}
      size={args.size}
    >
      <FormControl.Label visuallyHidden={args.visuallyHidden ? true : false}>{args.label}</FormControl.Label>
      <TextInput
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
        // eslint-disable-next-line i18n-text/no-en
        <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
      )}
      {args.validationStatus && args.validationStatus === 'success' && (
        <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
      )}
    </FormControl>
  )
}

Playground.storyName = 'FormControl - Playground'
