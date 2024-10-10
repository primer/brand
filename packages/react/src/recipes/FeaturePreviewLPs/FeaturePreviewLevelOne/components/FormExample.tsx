import React from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Heading,
  InlineLink,
  Link,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '../../../../'
import {PeopleIcon} from '@primer/octicons-react'
import {ColorModesEnum} from '../../../../ThemeProvider'

type FormExampleProps = {
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  type?: 'default' | 'extended'
}

export function FormExample({type = 'default', colorMode = ColorModesEnum.LIGHT}: FormExampleProps) {
  return (
    <form>
      <>
        <Stack direction="vertical" padding="none" gap={24}>
          <Box
            borderWidth="thin"
            borderStyle="solid"
            borderColor="default"
            backgroundColor="subtle"
            padding="condensed"
            borderRadius="medium"
            marginBlockEnd={24}
          >
            <Stack padding="none" alignItems="flex-start" gap={8}>
              <Text>Are you an administrator for an organization using GitHub Enterprise Cloud or GitHub Copilot?</Text>
              <Link href="#">Sign in to skip ahead</Link>
            </Stack>
          </Box>
          {type === 'extended' && (
            <Heading as="h2" size="subhead-large">
              Tell us about your enterprise
            </Heading>
          )}
          <Box marginBlockEnd={16}>
            <Text as="p" size="100">
              All fields marked with an asterisk (*) are required
            </Text>
          </Box>

          {type === 'extended' && (
            <>
              <FormControl required fullWidth>
                <FormControl.Label>Enterprise name</FormControl.Label>
                <TextInput required placeholder="e.g. Acme Inc." />
              </FormControl>

              <FormControl required fullWidth>
                <FormControl.Label>Enterprise URL slug</FormControl.Label>
                <TextInput required placeholder="e.g. acme-inc." />
              </FormControl>

              <FormControl required fullWidth>
                <FormControl.Label>Industry</FormControl.Label>
                <Select>
                  <Select.Option value="it">Information Technology</Select.Option>
                  <Select.Option value="bs">Business services</Select.Option>
                </Select>
              </FormControl>

              <FormControl required fullWidth>
                <FormControl.Label>Number of employees</FormControl.Label>
                <Select>
                  <Select.Option value="0-50">0-50</Select.Option>
                  <Select.Option value="50-100">50-100</Select.Option>
                </Select>
              </FormControl>

              <Box
                borderColor="default"
                borderStyle="solid"
                borderWidth="thin"
                backgroundColor="subtle"
                padding="normal"
                borderRadius="medium"
              >
                <Stack direction="vertical" padding="none">
                  <Heading as="h3" size="subhead-medium">
                    <Stack
                      direction="horizontal"
                      padding="none"
                      gap={8}
                      style={{color: 'var(--brand-InlineLink-color-rest)'}}
                    >
                      <PeopleIcon size={20} />
                      About Enterprise Managed Users
                    </Stack>
                  </Heading>
                  <Text as="p" variant="muted">
                    GitHub Enterprise lets developers use their personal accounts for work and it supports SAML SSO from
                    various identity providers. Or, if you want to control access through an external identity
                    management system, you can use Enterprise Managed Users.
                  </Text>
                  <Heading as="h4" size="subhead-medium">
                    Interested in a trial with Enterprise Managed Users? <InlineLink href="#">Contact Us</InlineLink>
                  </Heading>
                </Stack>
              </Box>

              <FormControl required fullWidth>
                <FormControl.Label>Organization</FormControl.Label>
                <Select>
                  <Select.Option value="scranton-engineering">Scranton Engineering</Select.Option>
                </Select>
                <FormControl.Hint>
                  Note: Billing for any selected organization will be delegated to the enterprise account.{' '}
                  <InlineLink href="#">Learn about changes to your billing during trial.</InlineLink>
                </FormControl.Hint>
              </FormControl>

              <Box marginBlockStart={16}>
                <Heading as="h2" size="subhead-large">
                  Contact information
                </Heading>
              </Box>
            </>
          )}

          <FormControl id="fullname" required fullWidth>
            <FormControl.Label>Name</FormControl.Label>
            <TextInput required placeholder="First and last name" autoComplete="name" />
          </FormControl>

          <FormControl required fullWidth>
            <FormControl.Label>Work email</FormControl.Label>
            <TextInput required placeholder="e.g. name@company.com" autoComplete="email" />
          </FormControl>

          {type === 'default' && (
            <FormControl required fullWidth>
              <FormControl.Label>Company</FormControl.Label>
              <TextInput required placeholder="e.g. Acme Inc." />
            </FormControl>
          )}

          {type === 'default' && (
            <FormControl fullWidth>
              <FormControl.Label>Phone Number</FormControl.Label>
              <TextInput type="tel" autoComplete="tel" />
            </FormControl>
          )}

          {type === 'extended' && (
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
          )}
          {type === 'default' && (
            <FormControl fullWidth>
              <FormControl.Label>Message</FormControl.Label>
              <Textarea placeholder="Describe your project, needs and timeline." />
            </FormControl>
          )}
        </Stack>

        <Box marginBlockStart={{narrow: 16, regular: 32}} marginBlockEnd={{narrow: 16, regular: 32}}>
          <Stack direction="vertical" padding="none" gap={24}>
            {type === 'default' && (
              <Box backgroundColor={colorMode === ColorModesEnum.LIGHT ? 'default' : 'subtle'} marginBlockEnd={16}>
                <FormControl required>
                  <Checkbox />
                  <FormControl.Label>
                    <Text weight="medium" size="100">
                      Yes, I would like to be emailed with the latest news and happenings, products, and special offers
                      from GitHub.
                    </Text>
                    <FormControl.Hint>
                      <Text weight="normal" variant="muted" size="100">
                        If you change your mind, you can <InlineLink href="#">unsubscribe</InlineLink> at any time.
                      </Text>
                    </FormControl.Hint>
                  </FormControl.Label>
                </FormControl>
              </Box>
            )}
            <Stack padding="none" direction="vertical">
              <Heading as="h2" size="subhead-medium">
                Verify your account
              </Heading>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'var(--brand-control-color-border-default)',
                  backgroundColor: 'var(--brand-color-canvas-inset)',
                  width: '100%',
                  borderRadius: 6,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Stack direction="vertical" padding="spacious" alignItems="center">
                  <Text size="100" variant="muted" align="center">
                    Please solve this puzzle so we know you are a real person
                  </Text>
                  <Button variant="secondary">Verify</Button>
                </Stack>
              </div>
            </Stack>
            {type === 'extended' && (
              <Box backgroundColor={colorMode === ColorModesEnum.LIGHT ? 'default' : 'subtle'}>
                <FormControl required>
                  <Checkbox />
                  <FormControl.Label>
                    <Text weight="medium" size="100">
                      I understand that <InlineLink href="#">certain features</InlineLink> are unavailable during the
                      trial experience.
                    </Text>
                  </FormControl.Label>
                </FormControl>
              </Box>
            )}
            {type === 'extended' && (
              <Box backgroundColor={colorMode === ColorModesEnum.LIGHT ? 'default' : 'subtle'}>
                <FormControl required>
                  <Checkbox />
                  <FormControl.Label>
                    <Text weight="medium" size="100">
                      I hereby accept the <InlineLink href="#">GitHub Customer Agreement</InlineLink> and confirm that I
                      have the authority to do so on behalf of my organization. For more information about GitHub&apos;s
                      privacy practices, see the <InlineLink href="#">GitHub Privacy Statement</InlineLink>.
                    </Text>
                  </FormControl.Label>
                </FormControl>
              </Box>
            )}

            <Box marginBlockStart={16}>
              <Button variant="primary" type="submit" block>
                {type === 'default' ? 'Contact Sales' : 'Create your enterprise'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </>
    </form>
  )
}
