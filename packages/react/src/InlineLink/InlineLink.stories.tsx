import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {TextSizes, Text} from '../'
import {InlineLink} from '.'

export default {
  title: 'Components/InlineLink',
  component: InlineLink
} as ComponentMeta<typeof InlineLink>

const Template: ComponentStory<typeof InlineLink> = args => <InlineLink {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'An inline link',
  href: '#'
}

export const Scale: ComponentStory<typeof InlineLink> = args => (
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
