import React from 'react'
import {ComponentMeta} from '@storybook/react'

import {UnorderedList} from './UnorderedList'

export default {
  title: 'Components/UnorderedList/Features',
  component: UnorderedList
} as ComponentMeta<typeof UnorderedList>

export const CheckList = () => (
  <UnorderedList variant="checked">
    <li>Automatic security and version updates</li>
    <li>GitHub Security Advisories</li>
    <li>Code and secret scanning</li>
    <li>Dependency review</li>
    <li>Automated authentication and identity management</li>
  </UnorderedList>
)
