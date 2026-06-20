import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {clsx} from 'clsx'
import {CpuIcon, HeartIcon, LightBulbIcon} from '@primer/octicons-react'

import gridStyles from '../Card/Card.stories.shared.module.css'
import {Pillar} from '.'
import {Box, Grid, Section, SectionIntro, Stack} from '..'

type StoryProps = Record<string, never>

const meta = {
  title: 'Components/Pillar/Examples',
  component: Pillar as unknown as Meta<StoryProps>['component'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

const educationPillars = [
  {
    icon: CpuIcon,
    heading: 'Unlimited repositories',
    description: 'Private repos with advanced collaboration tools to keep your projects in one place.',
  },
  {
    icon: LightBulbIcon,
    heading: 'Build anywhere',
    description: '3K Actions minutes and 180 Codespaces hours per month.',
  },
  {
    icon: HeartIcon,
    heading: 'More room for ideas',
    description: '2 GB Packages storage and 20 GB Codespaces storage.',
  },
] as const

export const Gridline: Story = {
  render: function GridlineComponent() {
    return (
      <Section fullWidth paddingBlockStart="condensed" paddingBlockEnd="normal">
        <Stack direction="vertical" padding="none" gap="spacious">
          <SectionIntro align="center" fullWidth>
            <SectionIntro.Heading as="h2" size="3">
              Empower your whole school to build and learn with GitHub
            </SectionIntro.Heading>
          </SectionIntro>

          <Box className={gridStyles.gridFrame}>
            <Box className={clsx(gridStyles.gridContent, gridStyles.gridContentWide)}>
              <Grid columnGap="none" rowGap="none" enableGutters={false}>
                {educationPillars.map(pillar => {
                  return (
                    <Grid.Column key={pillar.heading} span={{xsmall: 12, large: 4}} className={gridStyles.gridColumn}>
                      <Box
                        className={gridStyles.gridItem}
                        paddingBlockStart={{narrow: 48, regular: 64}}
                        paddingBlockEnd={{narrow: 48, regular: 64}}
                        paddingInlineStart={{narrow: 32, regular: 64}}
                        paddingInlineEnd={{narrow: 32, regular: 64}}
                      >
                        <Pillar>
                          <Pillar.Icon icon={pillar.icon} />
                          <Pillar.Heading>{pillar.heading}</Pillar.Heading>
                          <Pillar.Description>{pillar.description}</Pillar.Description>
                        </Pillar>
                      </Box>
                    </Grid.Column>
                  )
                })}
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Section>
    )
  },
}
