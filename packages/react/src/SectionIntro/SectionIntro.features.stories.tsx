import React from 'react'
import type {Meta} from '@storybook/react'
import {SectionIntro} from '.'
import {CopilotIcon} from '@primer/octicons-react'

export default {
  title: 'Components/SectionIntro/Features',
  component: SectionIntro,
} as Meta<typeof SectionIntro>

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
    <SectionIntro.Link href="#">My link</SectionIntro.Link>
  </SectionIntro>
)

export const WithSecondaryAction = () => (
  <SectionIntro>
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
    <SectionIntro.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
      pulvinar risus elementum.
    </SectionIntro.Description>
    <SectionIntro.Link href="#">My link</SectionIntro.Link>
  </SectionIntro>
)

export const WithLabel = () => (
  <SectionIntro>
    <SectionIntro.Label>Label</SectionIntro.Label>
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
    <SectionIntro.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
      pulvinar risus elementum.
    </SectionIntro.Description>
    <SectionIntro.Link href="#">My link</SectionIntro.Link>
  </SectionIntro>
)

export const AlignedCenter = () => (
  <SectionIntro align="center">
    <SectionIntro.Label>Label</SectionIntro.Label>
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
    <SectionIntro.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
      pulvinar risus elementum.
    </SectionIntro.Description>
    <SectionIntro.Link href="#">My link</SectionIntro.Link>
  </SectionIntro>
)

export const WithEmphasizedText = () => (
  <SectionIntro>
    <SectionIntro.Heading>
      <b>Expressive headline</b> about an exclusive set of features.
    </SectionIntro.Heading>
  </SectionIntro>
)

export const FullWidth = () => (
  <SectionIntro fullWidth>
    <SectionIntro.Heading>
      <b>Expressive headline</b> about an exclusive set of features.
    </SectionIntro.Heading>
  </SectionIntro>
)

export const LeadingComponent = () => {
  const Image = () => <CopilotIcon size={40} />

  return (
    <SectionIntro leadingComponent={Image} align="center">
      <SectionIntro.Heading>
        <b>Expressive headline</b> about an exclusive set of features.
      </SectionIntro.Heading>
    </SectionIntro>
  )
}
