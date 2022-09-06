import React from 'react'
import {FormControl} from '.'
import {Heading, Button, TextInput, Text, InlineLink, Select, Checkbox} from '../'
import {Container} from '../component-helpers'

export default {
  title: 'Components/Forms/Examples'
}

export const GitHubEnterprise = args => {
  return (
    <Container
      style={{alignItems: 'center', display: 'grid', gap: 16, maxWidth: 600, marginTop: 'var(--base-size-32)'}}
    >
      <Heading as="h4">Get started</Heading>
      <form>
        <Container
          style={{
            alignItems: 'center',
            display: 'grid',
            gap: 16,
            borderBottom: '1px solid var(--brand-color-border-default)',
            paddingBottom: 32,
            marginBottom: 32
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 16
            }}
          >
            <FormControl required fullWidth>
              <FormControl.Label>First name</FormControl.Label>
              <TextInput required />
              {args.validationStatus && args.validationStatus === 'error' && (
                // eslint-disable-next-line i18n-text/no-en
                <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
              )}
              {args.validationStatus && args.validationStatus === 'success' && (
                <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
              )}
            </FormControl>
            <FormControl required fullWidth>
              <FormControl.Label>Last name</FormControl.Label>
              <TextInput required />
              {args.validationStatus && args.validationStatus === 'error' && (
                // eslint-disable-next-line i18n-text/no-en
                <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
              )}
              {args.validationStatus && args.validationStatus === 'success' && (
                <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
              )}
            </FormControl>
          </div>

          <FormControl required fullWidth>
            <FormControl.Label>Enterprise name</FormControl.Label>
            <TextInput required />
            {args.validationStatus && args.validationStatus === 'error' && (
              // eslint-disable-next-line i18n-text/no-en
              <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
            )}
            {args.validationStatus && args.validationStatus === 'success' && (
              <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
            )}
          </FormControl>

          <FormControl required fullWidth>
            <FormControl.Label>Enterprise URL</FormControl.Label>
            <TextInput leadingText="github.com/" required />
            {args.validationStatus && args.validationStatus === 'error' && (
              // eslint-disable-next-line i18n-text/no-en
              <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
            )}
            {args.validationStatus && args.validationStatus === 'success' && (
              <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
            )}
          </FormControl>

          <FormControl required fullWidth>
            <FormControl.Label>Country</FormControl.Label>
            <Select {...args}>
              <Select.Option value="" selected disabled>
                Country
              </Select.Option>
              <Select.Option value="us">United States of America</Select.Option>
              <Select.Option value="uk">United Kingdom</Select.Option>
            </Select>
            {args.validationStatus && args.validationStatus === 'error' && (
              // eslint-disable-next-line i18n-text/no-en
              <FormControl.Validation>{args.validationText || 'This is an error message'}</FormControl.Validation>
            )}
            {args.validationStatus && args.validationStatus === 'success' && (
              <FormControl.Validation>{args.validationText || 'Great! It worked.'}</FormControl.Validation>
            )}
          </FormControl>
          <FormControl hasBorder required>
            <FormControl.Label>
              Contact me about GitHub Enterprise Server{' '}
              <FormControl.Hint>
                <Text size="200" variant="muted">
                  I&apos;m interested in learning more about{' '}
                  <InlineLink size="200" href="#">
                    GitHub Enterprise Server
                  </InlineLink>{' '}
                  and would like to be contacted by GitHub’s sales team.
                </Text>
              </FormControl.Hint>
            </FormControl.Label>
            <Checkbox />
          </FormControl>
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'var(--brand-color-border-default)',
              backgroundColor: 'var(--brand-color-canvas-inset)',
              height: 150,
              width: '100%',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text size="200" variant="muted">
              Captcha
            </Text>
          </div>
          <FormControl required>
            <FormControl.Label>
              <Text size="200" variant="muted">
                I hereby accept the{' '}
                <InlineLink size="200" href="#">
                  GitHub Customer Agreement
                </InlineLink>{' '}
                on behalf of my organization and confirm that I have the authority to do so. For more information about
                GitHub&apos;s privacy practices, see the{' '}
                <InlineLink size="200" href="#">
                  GitHub Privacy Statement.
                </InlineLink>{' '}
              </Text>
            </FormControl.Label>

            <Checkbox />
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

GitHubEnterprise.storyName = 'GitHub Enterprise sign up form'
