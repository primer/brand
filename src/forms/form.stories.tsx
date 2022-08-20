import React from 'react'
import {ComponentMeta, ComponentStory, Meta, Story} from '@storybook/react'
import {FormControl, FormControlProps} from '.'
import {CheckIcon, SearchIcon} from '@primer/octicons-react'
import {Heading, Button} from '../'
import {Container} from '../component-helpers'

export default {
  title: 'Components/Forms/Examples'
}

export const GitHubEnterprise = args => {
  return (
    <Container
      style={{alignItems: 'center', display: 'grid', gap: 16, maxWidth: 390, marginTop: 'var(--base-size-32)'}}
    >
      <Heading as="h4">Get started</Heading>
      <form onSubmit={() => console.log('done')}>
        <Container
          style={{
            alignItems: 'center',
            display: 'grid',
            gap: 16,
            borderBottom: '1px solid var(--brand-color-border-default',
            paddingBottom: 32,
            marginBottom: 32
          }}
        >
          <FormControl required fullWidth size="large">
            <FormControl.Label>Full name</FormControl.Label>
            <FormControl.TextInput required />
            {args.validationStatus && args.validationStatus === 'error' && (
              // eslint-disable-next-line i18n-text/no-en
              <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
            )}
            {args.validationStatus && args.validationStatus === 'success' && (
              <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
            )}
          </FormControl>

          <FormControl required fullWidth size="large">
            <FormControl.Label>Enterprise name</FormControl.Label>
            <FormControl.TextInput required />
            {args.validationStatus && args.validationStatus === 'error' && (
              // eslint-disable-next-line i18n-text/no-en
              <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
            )}
            {args.validationStatus && args.validationStatus === 'success' && (
              <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
            )}
          </FormControl>

          <FormControl required fullWidth size="large">
            <FormControl.Label>Enterprise URL</FormControl.Label>
            <FormControl.TextInput leadingText="github.com/" required />
            {args.validationStatus && args.validationStatus === 'error' && (
              // eslint-disable-next-line i18n-text/no-en
              <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
            )}
            {args.validationStatus && args.validationStatus === 'success' && (
              <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
            )}
          </FormControl>
        </Container>
        <Container
          style={{
            alignItems: 'center',
            display: 'grid',
            gap: 16
          }}
        >
          <Button variant="primary" type="submit">
            Start trial
          </Button>
          <Button type="submit">Skip trial and upgrade</Button>
        </Container>
      </form>
    </Container>
  )
}

GitHubEnterprise.storyName = 'GitHub Enterprise'
