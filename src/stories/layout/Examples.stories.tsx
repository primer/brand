import React from 'react'
import {AllClosed as FAQ} from '../../FAQ/FAQ.fixtures.stories'
import {AlternatingLayout as River} from '../../River/River.fixtures.stories'
import {WithSecondaryAction as Hero, withSecondaryActionArgs} from '../../Hero/Hero.stories'
import {Container} from '../../component-helpers'

export default {
  title: 'Layout/Examples'
}

const Template = () => (
  <Container>
    <Hero {...withSecondaryActionArgs} align="center" />
    <River>{/* Alternating River Layout */}</River>
    <FAQ>{/* Default FAQ with closed answers */}</FAQ>
  </Container>
)

export const Default = Template.bind({})
