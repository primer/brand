import React from 'react'
import {FormControl} from '.'
import {Heading, Button, TextInput, Stack, Text, InlineLink, Select, Checkbox, Radio} from '../'
import {Container} from '../component-helpers'

export default {
  title: 'Components/Forms/Examples',
  argTypes: {
    disabled: {
      description: 'disabled field',
      control: {type: 'boolean'},
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
  },
}

export const GitHubEnterprise = args => {
  return (
    <Container
      style={{alignItems: 'center', display: 'grid', gap: 16, maxWidth: 600, marginTop: 'var(--base-size-32)'}}
    >
      <Heading as="h5">Get started</Heading>
      <form>
        <Container
          style={{
            alignItems: 'center',
            display: 'grid',
            gap: 16,
            borderBottom: '1px solid var(--brand-color-border-default)',
            paddingBottom: 32,
            marginBottom: 32,
          }}
        >
          <Text as="p" variant="muted" size="100">
            All fields marked with an asterisk (*) are required
          </Text>
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            <FormControl required fullWidth validationStatus={args.validationStatus}>
              <FormControl.Label>First name</FormControl.Label>
              <TextInput disabled={args.disabled} required autoComplete="given-name" />
              {args.validationStatus && args.validationStatus === 'error' && (
                <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
              )}
              {args.validationStatus && args.validationStatus === 'success' && (
                <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
              )}
            </FormControl>
            <FormControl required fullWidth validationStatus={args.validationStatus}>
              <FormControl.Label>Last name</FormControl.Label>
              <TextInput disabled={args.disabled} required autoComplete="family-name" />
              {args.validationStatus && args.validationStatus === 'error' && (
                <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
              )}
              {args.validationStatus && args.validationStatus === 'success' && (
                <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
              )}
            </FormControl>
          </div>

          <FormControl required fullWidth validationStatus={args.validationStatus}>
            <FormControl.Label>Enterprise name</FormControl.Label>
            <TextInput disabled={args.disabled} required />
            {args.validationStatus && args.validationStatus === 'error' && (
              <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
            )}
            {args.validationStatus && args.validationStatus === 'success' && (
              <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
            )}
          </FormControl>

          <FormControl required fullWidth validationStatus={args.validationStatus}>
            <FormControl.Label>Enterprise URL</FormControl.Label>
            <TextInput disabled={args.disabled} leadingText="github.com/" required />
            {args.validationStatus && args.validationStatus === 'error' && (
              <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
            )}
            {args.validationStatus && args.validationStatus === 'success' && (
              <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
            )}
          </FormControl>

          <FormControl required fullWidth validationStatus={args.validationStatus}>
            <FormControl.Label>Country</FormControl.Label>
            <Select disabled={args.disabled} defaultValue="">
              <Select.Option value="" disabled>
                Country
              </Select.Option>
              <Select.Option value="us">United States of America</Select.Option>
              <Select.Option value="uk">United Kingdom</Select.Option>
            </Select>
            {args.validationStatus && args.validationStatus === 'error' && (
              <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
            )}
            {args.validationStatus && args.validationStatus === 'success' && (
              <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
            )}
          </FormControl>

          <Heading as="h4" size="subhead-large">
            Number of users
          </Heading>
          {/* Todo convert to a fieldset */}
          <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} padding="none">
            <FormControl>
              <FormControl.Label>0-99</FormControl.Label>
              <Radio name="user-band" value="0-99" />
            </FormControl>
            <FormControl>
              <FormControl.Label>100-499</FormControl.Label>
              <Radio name="user-band" value="100-499" />
            </FormControl>
            <FormControl>
              <FormControl.Label>500-999</FormControl.Label>
              <Radio name="user-band" value="500-999" />
            </FormControl>
            <FormControl>
              <FormControl.Label>1000+</FormControl.Label>
              <Radio name="user-band" value="1000+" />
            </FormControl>
          </Stack>
          <FormControl hasBorder required>
            <FormControl.Label>Contact me about GitHub Enterprise Server</FormControl.Label>
            <FormControl.Hint>
              <Text size="100" variant="muted">
                I&apos;m interested in learning more about{' '}
                <InlineLink href="https://github.com/enterprise" target="_blank">
                  GitHub Enterprise Server
                </InlineLink>{' '}
                and would like to be contacted by GitHub’s sales team.
              </Text>
            </FormControl.Hint>
            <Checkbox disabled={args.disabled} />
          </FormControl>
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'var(--brand-control-color-border-default)',
              backgroundColor: 'var(--brand-color-canvas-inset)',
              height: 150,
              width: '100%',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text size="100" variant="muted">
              Captcha
            </Text>
          </div>
          <FormControl required>
            <FormControl.Label>
              <Text size="100" variant="muted">
                I hereby accept the{' '}
                <InlineLink href="https://github.com/customer-terms" target="_blank">
                  GitHub Customer Agreement
                </InlineLink>{' '}
                on behalf of my organization and confirm that I have the authority to do so. For more information about
                GitHub&apos;s privacy practices, see the{' '}
                <InlineLink
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                  target="_blank"
                >
                  GitHub Privacy Statement.
                </InlineLink>{' '}
              </Text>
            </FormControl.Label>

            <Checkbox disabled={args.disabled} />
          </FormControl>
        </Container>
        <Container
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 16,
            justifyContent: 'flex-end',
          }}
        >
          <Button type="submit">Skip trial and upgrade</Button>
          <Button variant="primary" type="submit">
            Start trial
          </Button>
        </Container>
      </form>
    </Container>
  )
}

GitHubEnterprise.storyName = 'GitHub Enterprise sign up form'
