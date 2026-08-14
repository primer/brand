import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Statistic, StatisticProps} from '.'
import {Box} from '../Box'
import {Grid} from '../Grid'
import {Card} from '../Card'
import placeholderImage from '../fixtures/images/placeholder.png'
import {Stack} from '../Stack'
import {Section} from '../Section'
import {SectionIntro} from '../SectionIntro'
import styles from './Statistic.stories.shared.module.css'

type StoryProps = {
  heading: string
  description: string
} & StatisticProps

const meta = {
  title: 'Components/Statistic/Examples',
  component: Statistic as Meta<StoryProps>['component'], // because Statistic applies forwardRef,
  args: {
    heading: '100M+',
    description: 'Developers',
  },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

export const Gridline: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const gridlineStatistics = [
      {heading: '7X', description: 'faster coding'},
      {heading: '1B+', description: 'improvement in code quality'},
      {heading: '500%', description: 'had a positive experience'},
    ] as const

    return (
      <Section fullWidth paddingBlockStart="condensed" paddingBlockEnd="normal">
        <Stack direction="vertical" padding="none" gap="spacious">
          <SectionIntro align="center" fullWidth>
            <SectionIntro.Heading as="h3" size="3">
              H3 Heading 100 Characters Max
            </SectionIntro.Heading>
          </SectionIntro>

          <Box className={styles.gridFrame}>
            <Box className={styles.gridContent}>
              <Grid columnGap="none" rowGap="none" enableGutters={false}>
                {gridlineStatistics.map(statistic => (
                  <Grid.Column key={statistic.heading} span={{xsmall: 12, large: 4}} className={styles.gridColumn}>
                    <Box className={styles.gridItem} padding={{narrow: 32, wide: 48}}>
                      <Statistic>
                        <Statistic.Heading
                          font="monospace"
                          weight="normal"
                          size="700"
                          style={{color: 'var(--brand-color-accent-primary)'}}
                        >
                          {statistic.heading}
                        </Statistic.Heading>
                        <Statistic.Description font="monospace" size="100">
                          {statistic.description}
                        </Statistic.Description>
                      </Statistic>
                    </Box>
                  </Grid.Column>
                ))}
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Section>
    )
  },
}

export const SocialProof: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <>
      <Box
        marginBlockStart="normal" /* This is for demo purposes only to reveal the initial gridline */
        borderBlockEndWidth="thin"
        borderBlockStartWidth="thin"
        borderColor="muted"
        borderStyle="solid"
      >
        <Grid enableGutters={false} columnGap="none" rowGap="none">
          <Grid.Column span={{large: 8}}>
            <Box
              padding={{
                narrow: 32,
                regular: 32,
                wide: 64,
              }}
              backgroundColor="subtle"
              borderInlineStartWidth={{
                wide: 'thin',
              }}
              borderInlineEndWidth={{
                wide: 'thin',
              }}
              borderColor="muted"
              borderStyle="solid"
              style={{height: '100%'}}
            >
              <Card href="https://github.com" fullWidth variant="minimal">
                <Card.Label>Resources</Card.Label>
                <Card.Heading size="5">
                  How Thomson Reuters successfully adopted AI —and how your organization can, too
                </Card.Heading>
                <Card.Image
                  position="block-end"
                  aspectRatio="16:10"
                  src={placeholderImage}
                  alt="placeholder, blank area with a gray background color"
                />
              </Card>
            </Box>
          </Grid.Column>
          <Grid.Column span={{large: 4}}>
            <Box
              borderInlineEndWidth={{
                wide: 'thin',
              }}
              borderColor="muted"
              borderStyle="solid"
              style={{height: '100%'}}
            >
              <Stack direction="vertical" padding="none" gap="none" style={{height: '100%'}}>
                <Box
                  padding={{
                    narrow: 32,
                    wide: 64,
                  }}
                  borderBlockStartWidth={{
                    narrow: 'thin',
                    wide: 'none',
                  }}
                  borderColor="muted"
                  borderStyle="solid"
                  style={{flex: 1, display: 'flex', alignItems: 'center'}}
                >
                  <Statistic>
                    <Statistic.Heading weight="normal" size="800" style={{color: 'var(--brand-color-text-emphasized)'}}>
                      55%
                    </Statistic.Heading>
                    <Statistic.Description font="monospace" size="100">
                      At vero eos et accusamus et iusto odio dignissimos
                    </Statistic.Description>
                  </Statistic>
                </Box>
                <Box
                  padding={{
                    narrow: 'normal',
                    wide: 64,
                  }}
                  borderBlockStartWidth="thin"
                  borderColor="muted"
                  borderStyle="solid"
                  style={{flex: 1, display: 'flex', alignItems: 'center'}}
                >
                  <Statistic>
                    <Statistic.Heading weight="normal" size="800" style={{color: 'var(--brand-color-text-emphasized)'}}>
                      39%
                    </Statistic.Heading>
                    <Statistic.Description font="monospace" size="100">
                      Sed ut perspiciatis unde omnis iste natus voluptatem
                    </Statistic.Description>
                  </Statistic>
                </Box>
                <Box
                  padding={{
                    narrow: 'normal',
                    wide: 64,
                  }}
                  borderBlockStartWidth="thin"
                  borderColor="muted"
                  borderStyle="solid"
                  style={{flex: 1, display: 'flex', alignItems: 'center'}}
                >
                  <Statistic>
                    <Statistic.Heading weight="normal" size="800" style={{color: 'var(--brand-color-text-emphasized)'}}>
                      39%
                    </Statistic.Heading>
                    <Statistic.Description font="monospace" size="100">
                      Sed ut perspiciatis unde omnis iste natus error sit
                    </Statistic.Description>
                  </Statistic>
                </Box>
              </Stack>
            </Box>
          </Grid.Column>
        </Grid>
      </Box>
    </>
  ),
}
