import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {SectionIntro} from '.'

export default {
  title: 'Components/SectionIntro/Features',
  component: SectionIntro
} as ComponentMeta<typeof SectionIntro>

export const HeadingOnly = () => (
  <SectionIntro>
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
  </SectionIntro>
)

export const WithDescription = () => (
  <SectionIntro>
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
    <SectionIntro.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
      pulvinar risus elementum.
    </SectionIntro.Description>
  </SectionIntro>
)

export const WithAction = () => (
  <SectionIntro>
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
    <SectionIntro.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
      pulvinar risus elementum.
    </SectionIntro.Description>
    <SectionIntro.Action href="#">Call to action</SectionIntro.Action>
  </SectionIntro>
)

export const WithSecondaryAction = () => (
  <SectionIntro>
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
    <SectionIntro.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
      pulvinar risus elementum.
    </SectionIntro.Description>
    <SectionIntro.Action href="#" variant="secondary">
      Call to action
    </SectionIntro.Action>
  </SectionIntro>
)

export const AlignedCenter = () => (
  <SectionIntro align="center">
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
    <SectionIntro.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
      pulvinar risus elementum.
    </SectionIntro.Description>
    <SectionIntro.Action href="#">Call to action</SectionIntro.Action>
  </SectionIntro>
)
