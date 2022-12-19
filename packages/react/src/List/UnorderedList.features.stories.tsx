import React from 'react'
import {ComponentMeta} from '@storybook/react'

import {UnorderedList, ListItem} from '.'

export default {
  title: 'Components/UnorderedList/Features',
  component: UnorderedList
} as ComponentMeta<typeof UnorderedList>

export const CheckList = () => (
  <UnorderedList variant="checked">
    <ListItem>Automatic security and version updates</ListItem>
    <ListItem>GitHub Security Advisories</ListItem>
    <ListItem>Code and secret scanning</ListItem>
    <ListItem>Dependency review</ListItem>
    <ListItem>Automated authentication and identity management</ListItem>
  </UnorderedList>
)
