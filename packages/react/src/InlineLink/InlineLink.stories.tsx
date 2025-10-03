import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Text, Heading, Stack, UnorderedList} from '../'
import {InlineLink} from '.'

const meta = {
  title: 'Components/InlineLink',
  component: InlineLink,
} satisfies Meta<typeof InlineLink>

export default meta
type Story = StoryObj<typeof InlineLink>

export const Default: Story = {
  render: args => <InlineLink {...args} />,
  args: {
    children: 'An inline link',
    href: '#',
  },
}

export const Example: Story = {
  render: () => (
    <>
      <Text as="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id pretium et sit imperdiet rhoncus vel. Sit pharetra
        mi in massa. Pulvinar habitant <InlineLink href="#">condimentum nulla donec blandit</InlineLink> faugibus at
        morbi enim. Urna, diam vulputate ultricies elementum suspendisse risus.
      </Text>
    </>
  ),
}

export const SizeInheritence: Story = {
  render: () => (
    <Stack gap="spacious">
      <Heading size="1">
        This is a <InlineLink href="#">Header</InlineLink> component!
      </Heading>
      <Text as="p" size="600">
        This is a Text component. <InlineLink href="#">This is a an InlineLink</InlineLink>. It should be the same size
        as the rest of the text.
      </Text>
      <Text as="em">
        It also matches font decorations, like <InlineLink href="#">this</InlineLink>.
      </Text>

      <Text weight="extrabold">
        And font <InlineLink href="#">weights</InlineLink> too!
      </Text>

      <UnorderedList>
        <UnorderedList.Item>foo</UnorderedList.Item>
        <UnorderedList.Item>
          <InlineLink href="#">bar</InlineLink>
        </UnorderedList.Item>
        <UnorderedList.Item>baz</UnorderedList.Item>
      </UnorderedList>

      <Text>
        Links can be made different sizes or given different styles by wrapping them in an inner
        <Text size="700">
          <InlineLink href="#">Text</InlineLink>
        </Text>{' '}
        tag.
      </Text>
    </Stack>
  ),
}
