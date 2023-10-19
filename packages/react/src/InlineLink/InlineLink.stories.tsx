import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {TextSizes, Text, Heading, Prose} from '../'
import {InlineLink} from '.'

export default {
  title: 'Components/InlineLink',
  component: InlineLink,
} as Meta<typeof InlineLink>

const Template: StoryFn<typeof InlineLink> = args => <InlineLink {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'An inline link',
  href: '#',
}

export const Scale: StoryFn<typeof InlineLink> = args => (
  <>
    {TextSizes.map(size => (
      <>
        <InlineLink key={size} size={size} {...args} href="#">
          InlineLink {size}
        </InlineLink>
        <br />
      </>
    ))}
  </>
)

export const Example = () => (
  <>
    <Text as="p">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id pretium et sit imperdiet rhoncus vel. Sit pharetra mi
      in massa. Pulvinar habitant <InlineLink href="#">condimentum nulla donec blandit</InlineLink> faugibus at morbi
      enim. Urna, diam vulputate ultricies elementum suspendisse risus.
    </Text>
  </>
)

export const SizeInheritence = () => (
  <>
    <Text as="p" size="600">
      The size of the following link will be inherited from the parent, without the need for specifying additional
      `size` parameters. <InlineLink href="#">condimentum nulla donec blandit</InlineLink>.
    </Text>
  </>
)

export const InsideHeader = () => (
  <>
    <Heading size="display">
      Hey <InlineLink href="#">there</InlineLink>!
    </Heading>

    <Heading size="1">
      Hey <InlineLink href="#">there</InlineLink>!
    </Heading>

    <Heading size="2">
      Hey <InlineLink href="#">there</InlineLink>!
    </Heading>

    <Heading size="3">
      Hey <InlineLink href="#">there</InlineLink>!
    </Heading>

    <Heading size="4">
      Hey <InlineLink href="#">there</InlineLink>!
    </Heading>

    <Heading size="5">
      Hey <InlineLink href="#">there</InlineLink>!
    </Heading>

    <Heading size="6">
      Hey <InlineLink href="#">there</InlineLink>!
    </Heading>

    <Heading size="subhead-large">
      Hey <InlineLink href="#">there</InlineLink>!
    </Heading>

    <Heading size="subhead-medium">
      Hey <InlineLink href="#">there</InlineLink>!
    </Heading>
  </>
)
