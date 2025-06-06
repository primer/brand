import React from 'react'
import {Meta} from '@storybook/react'
import {FormControl} from '.'
import {CheckIcon, SearchIcon} from '@primer/octicons-react'
import {Checkbox, Select, TextInput, Textarea, Radio} from '../'
import {Stack} from '../../'

export default {
  title: 'Components/Forms/FormControl',
  component: FormControl,
  args: {
    label: 'Label of input',
    visuallyHidden: false,
    fullWidth: false,
    monospace: false,
    required: false,
    leadingVisual: undefined,
    trailingVisual: undefined,
    hint: 'An optional hint',
  },
  argTypes: {
    label: {
      type: 'string',
      name: 'label',
      description: 'string',
      table: {
        category: 'Label',
      },
    },
    hasBorder: {
      type: 'string',
      name: 'label',
      description: 'string',
      table: {
        category: 'Label',
      },
    },
    leadingText: {
      type: 'string',
      name: 'leading text',
      description: 'string',
      table: {
        category: 'Input',
      },
    },
    trailingText: {
      type: 'string',
      name: 'trailing text',
      description: 'string',
      table: {
        category: 'Input',
      },
    },
    visuallyHidden: {
      control: {type: 'boolean'},
      table: {
        category: 'Label',
      },
    },
    size: {
      options: [0, 1],
      mapping: ['medium', 'large'],
      control: {
        type: 'inline-radio',
        labels: ['medium', 'large'],
      },
      table: {
        category: 'Input',
      },
    },
    validationStatus: {
      options: [0, 1, 2], // iterator
      mapping: [undefined, 'error', 'success'], // values
      control: {
        type: 'inline-radio',
        labels: ['undefined', 'error', 'success'],
      },
      table: {
        category: 'Validation',
      },
    },
    validationText: {
      type: 'string',
      table: {
        category: 'Validation',
      },
    },
    fullWidth: {
      description: 'formerly called Block',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },

    monospace: {
      description: 'monospace text',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    disabled: {
      description: 'disabled field',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    required: {
      description: 'required field',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    placeholder: {
      type: 'string',
      name: 'placeholder',
      description: 'string',
      table: {
        category: 'Input',
      },
    },
    leadingVisual: {
      control: {type: 'boolean'},
      name: 'leading visual',
      description: 'Octicon',
      table: {
        category: 'Input',
      },
    },
    trailingVisual: {
      control: {type: 'boolean'},
      name: 'trailing visual',
      description: 'Octicon',
      table: {
        category: 'Input',
      },
    },
    className: {
      type: 'string',
      name: 'className',
      description: 'string',
      table: {
        category: 'Root',
      },
    },
    id: {
      type: 'string',
      name: 'id',
      description: 'string',
      table: {
        category: 'Root',
      },
    },
    ref: {
      type: 'function',
      name: 'ref',
      description: 'string',
      table: {
        disable: true,
      },
    },
    children: {
      type: 'function',
      name: 'children',
      description: 'string',
      table: {
        disable: true,
      },
    },
    hint: {
      type: 'string',
      name: 'hint',
      description: 'string',
      table: {
        category: 'Hint',
      },
    },
  },
} as Meta<typeof FormControl>

export const TextInputPlayground = args => {
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
        size={args.size}
        placeholder={args.placeholder}
        required={args.required}
      />
      {args.hint.length ? <FormControl.Hint>{args.hint}</FormControl.Hint> : null}

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
TextInputPlayground.storyName = 'w/ TextInput - Playground'

export const TextareaPlayground = args => {
  return (
    <FormControl
      id="override"
      required={args.required}
      validationStatus={args.validationStatus}
      fullWidth={args.fullWidth}
      size={args.size}
    >
      <FormControl.Label visuallyHidden={args.visuallyHidden ? true : false}>{args.label}</FormControl.Label>
      <Textarea
        disabled={args.disabled}
        monospace={args.monospace}
        size={args.size}
        placeholder={args.placeholder}
        required={args.required}
      />

      {args.hint.length ? <FormControl.Hint>{args.hint}</FormControl.Hint> : null}

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
TextareaPlayground.args = {
  label: 'Label of textarea',
}
TextareaPlayground.storyName = 'w/ Textarea - Playground'

export const SelectPlayground = args => {
  return (
    <FormControl
      id="override"
      required={args.required}
      validationStatus={args.validationStatus}
      fullWidth={args.fullWidth}
      size={args.size}
    >
      <FormControl.Label visuallyHidden={args.visuallyHidden ? true : false}>{args.label}</FormControl.Label>
      <Select defaultValue="" disabled={args.disabled}>
        <Select.Option value="" disabled>
          Country
        </Select.Option>
        <Select.Option value="us">United States of America</Select.Option>
        <Select.Option value="uk">United Kingdom</Select.Option>
      </Select>

      {args.hint.length ? <FormControl.Hint>{args.hint}</FormControl.Hint> : null}

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

SelectPlayground.storyName = 'w/ Select - Playground'

export const CheckboxPlayground = args => {
  return (
    <FormControl
      id="override"
      required={args.required}
      validationStatus={args.validationStatus}
      fullWidth={args.fullWidth}
      size={args.size}
    >
      <Checkbox disabled={args.disabled} />
      <FormControl.Label visuallyHidden={args.visuallyHidden ? true : false}>{args.label}</FormControl.Label>

      {args.hint.length ? <FormControl.Hint>{args.hint}</FormControl.Hint> : null}

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

CheckboxPlayground.storyName = 'w/ Checkbox - Playground'

export const RadioPlayground = () => (
  <>
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="condensed" padding="condensed">
      <FormControl>
        <FormControl.Label>Radio One</FormControl.Label>
        <Radio name="radio-group" value="radio one" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Radio Two</FormControl.Label>
        <Radio name="radio-group" value="radio two" />
      </FormControl>
    </Stack>
  </>
)

RadioPlayground.storyName = 'w/ Radio - Playground'

export const SuccessValidation = () => {
  return (
    <FormControl validationStatus="success">
      <FormControl.Label>Label of input</FormControl.Label>
      <TextInput validationStatus="success" />
      <FormControl.Validation>Great! It worked.</FormControl.Validation>
    </FormControl>
  )
}
SuccessValidation.storyName = 'w/ Success Validation - Playground'

export const ErrorValidation = () => {
  return (
    <FormControl validationStatus="error">
      <FormControl.Label>Label of input</FormControl.Label>
      <TextInput validationStatus="error" />
      <FormControl.Validation>This is an error message</FormControl.Validation>
    </FormControl>
  )
}
ErrorValidation.storyName = 'w/ Error Validation - Playground'

export const ErrorValidationWithCheckbox = args => <CheckboxPlayground {...args} />
ErrorValidationWithCheckbox.storyName = 'w/ Checkbox with Error Validation - Playground'
ErrorValidationWithCheckbox.args = {
  validationStatus: 'error',
  validationText: 'This is an error message',
}
