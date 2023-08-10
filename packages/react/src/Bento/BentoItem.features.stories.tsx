import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {Bento} from '.'
import {Heading, Text, Link} from '../'
import placeholderImage from '../fixtures/images/placeholder-600x400.png'

export default {
  title: 'Components/Bento/Item/features',
  component: Bento,
} as Meta<typeof Bento>

export const VisualPositionBottom: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="row-reverse">
    <Bento.Content padding="condensed">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual position="50% 100%">
      <img className="test" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)
