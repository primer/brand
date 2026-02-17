import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Statistic, StatisticProps} from '.'
import {Box} from '../Box'
import {Grid} from '../Grid'
import {Card} from '../Card'
import placeholderImage from '../fixtures/images/placeholder.png'
import {Stack} from '../Stack'

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
              <Card href="https://github.com" fullWidth variant="minimal" disableAnimation>
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
                    <Statistic.Heading weight="normal" size="800" style={{color: 'var(--brand-color-accent-primary)'}}>
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
                    <Statistic.Heading weight="normal" size="800" style={{color: 'var(--brand-color-accent-primary)'}}>
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
                    <Statistic.Heading weight="normal" size="800" style={{color: 'var(--brand-color-accent-primary)'}}>
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
