import React from 'react'
import {Meta} from '@storybook/react'

import {UnorderedList} from '.'

export default {
  title: 'Components/UnorderedList/Features',
  component: UnorderedList,
} as Meta<typeof UnorderedList>

export const CheckList = () => (
  <UnorderedList variant="checked">
    <UnorderedList.Item>Automatic security and version updates</UnorderedList.Item>
    <UnorderedList.Item>GitHub Security Advisories</UnorderedList.Item>
    <UnorderedList.Item>Code and secret scanning</UnorderedList.Item>
    <UnorderedList.Item>Dependency review</UnorderedList.Item>
    <UnorderedList.Item>Automated authentication and identity management</UnorderedList.Item>
  </UnorderedList>
)
