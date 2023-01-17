import React from 'react'
import {Stack, Button, TextInput, FormControl} from '..'

type CTAFormProps = React.HTMLProps<HTMLDivElement> & {
  formLabel: string
  buttonLabel: string
}

export const CTAForm = ({formLabel, buttonLabel, ...args}: CTAFormProps) => {
  return (
    <div {...args}>
      <Stack
        padding="none"
        gap="condensed"
        direction={{narrow: 'vertical', regular: 'horizontal', wide: 'horizontal'}}
        alignItems={{narrow: 'flex-start', regular: 'flex-end', wide: 'flex-end'}}
        justifyContent={{narrow: 'flex-start', regular: 'flex-end', wide: 'flex-end'}}
      >
        <div>
          <FormControl required fullWidth size="large">
            <FormControl.Label>{formLabel}</FormControl.Label>
            <TextInput />
          </FormControl>
        </div>
        <div>
          <Button type="submit" variant="primary">
            {buttonLabel}
          </Button>
        </div>
      </Stack>
    </div>
  )
}
