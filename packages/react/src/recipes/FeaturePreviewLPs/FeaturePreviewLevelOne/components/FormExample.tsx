import React from 'react'
import {Box, Button, Checkbox, FormControl, InlineLink, Select, Stack, Text, TextInput, Textarea} from '../../../../'
import styles from '../FeaturePreviewLevelOne.module.css'

export function FormExample() {
  return (
    <form>
      <>
        <Stack direction="vertical" padding="none" gap={24}>
          <Box marginBlockEnd={16}>
            <Text as="p" size="100">
              All fields marked with an asterisk (*) are required
            </Text>
          </Box>
          <FormControl required fullWidth>
            <FormControl.Label>Full name</FormControl.Label>
            <TextInput required />
          </FormControl>

          <FormControl required fullWidth>
            <FormControl.Label>Enterprise name</FormControl.Label>
            <TextInput required />
          </FormControl>

          <FormControl required fullWidth>
            <FormControl.Label>Enterprise URL</FormControl.Label>
            <TextInput leadingText="github.com/" required />
          </FormControl>

          <FormControl required fullWidth>
            <FormControl.Label>Country</FormControl.Label>
            <Select defaultValue="">
              <Select.Option value="" disabled>
                Country
              </Select.Option>
              <Select.Option value="us">United States of America</Select.Option>
              <Select.Option value="uk">United Kingdom</Select.Option>
            </Select>
          </FormControl>
          <FormControl required fullWidth>
            <FormControl.Label>Message</FormControl.Label>
            <Textarea />
          </FormControl>
        </Stack>

        <Box
          className={styles.FeaturePreview__contactMe}
          paddingBlockStart={{narrow: 16, regular: 24}}
          marginBlockStart={{narrow: 16, regular: 24}}
          paddingBlockEnd={{narrow: 16, regular: 24}}
          marginBlockEnd={{narrow: 16, regular: 24}}
        >
          <Stack direction="vertical" padding="none" gap={24}>
            <Box backgroundColor="default">
              <FormControl hasBorder required>
                <FormControl.Label>
                  Contact me about GitHub Enterprise Server{' '}
                  <FormControl.Hint>
                    <Text size="100" variant="muted">
                      I&apos;m interested in learning more about{' '}
                      <InlineLink size="100" href="https://github.com/enterprise" target="_blank">
                        GitHub Enterprise Server
                      </InlineLink>{' '}
                      and would like to be contacted by GitHub’s sales team.
                    </Text>
                  </FormControl.Hint>
                </FormControl.Label>
                <Checkbox />
              </FormControl>
            </Box>
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
                  <InlineLink size="100" href="https://github.com/customer-terms" target="_blank">
                    GitHub Customer Agreement
                  </InlineLink>{' '}
                  on behalf of my organization and confirm that I have the authority to do so. For more information
                  about GitHub&apos;s privacy practices, see the{' '}
                  <InlineLink
                    size="100"
                    href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                    target="_blank"
                  >
                    GitHub Privacy Statement.
                  </InlineLink>{' '}
                </Text>
              </FormControl.Label>

              <Checkbox />
            </FormControl>
            <Box marginBlockStart={16}>
              <Stack
                direction={{
                  narrow: 'vertical',
                  regular: 'horizontal',
                }}
                padding="none"
                justifyContent={{
                  narrow: 'flex-start',
                  regular: 'flex-end',
                }}
              >
                <Button variant="subtle">Skip trial and upgrade</Button>
                <Button variant="primary" type="submit">
                  Start trial
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </>
    </form>
  )
}
