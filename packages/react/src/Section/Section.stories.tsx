import React from 'react'
import {Meta} from '@storybook/react'
import {Section} from '.'
import {SectionIntro} from '..'

export default {
  title: 'Components/Section',
  component: Section,
} as Meta<typeof Section>

export const Default = () => (
  <>
    <Section>
      <SectionIntro>
        <SectionIntro.Heading>Section heading 1</SectionIntro.Heading>
        <SectionIntro.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </SectionIntro.Description>
      </SectionIntro>
    </Section>
    <Section rounded>
      <SectionIntro>
        <SectionIntro.Heading>Section heading 2</SectionIntro.Heading>
        <SectionIntro.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </SectionIntro.Description>
      </SectionIntro>
    </Section>
  </>
)
