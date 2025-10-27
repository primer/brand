import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {Bento} from '.'
import {Box, Grid, Image, Link, ThemeProvider} from '../'

import mercardo from '../fixtures/images/bento/mercado.png'

import photoOne from '../fixtures/images/bento/1.png'
import photoTwo from '../fixtures/images/bento/2.png'
import photoThree from '../fixtures/images/bento/3.png'
import photoFour from '../fixtures/images/bento/4.png'
import photoFive from '../fixtures/images/bento/5.png'
import photoSix from '../fixtures/images/bento/6.png'
import codeWindow from '../fixtures/images/bento/code-window.png'
import copilotBadge from '../fixtures/images/bento/copilot-badge.png'
import gradientBg from '../fixtures/images/bento/gradient-bg.png'

import ciCD from '../fixtures/images/bento/ci-cd.png'
import globeBg from '../fixtures/images/bento/globe.png'
import purpleGradientBg from '../fixtures/images/bento/purple-gradient-bg.png'
import ringDownImage from '../fixtures/images/bento/ring-down.png'
import terminalImage from '../fixtures/images/bento/terminal.png'
import testingImage from '../fixtures/images/bento/testing.png'
import timerImage from '../fixtures/images/bento/timer.png'
import mixed2GradientBg from '../fixtures/images/bento/mixed-2-gradient-bg.png'

import styles from './Bento.features.stories.module.css'
import {clsx} from 'clsx'

export default {
  title: 'Components/Bento/features',
  component: Bento,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Bento>

export const LayoutExample1: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={{
        xsmall: 12,
        small: 6,
        large: 3,
      }}
      rowSpan={{
        xsmall: 4,
        large: 5,
      }}
    ></Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 12,
        small: 6,
        large: 3,
      }}
      rowSpan={{
        xsmall: 4,
        large: 3,
      }}
    ></Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 12,
        small: 6,
        large: 6,
      }}
      rowSpan={{
        xsmall: 4,
        large: 5,
      }}
    ></Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 12,
        small: 6,
        large: 3,
      }}
      rowSpan={{
        xsmall: 4,
        large: 4,
      }}
      rowStart={{
        large: 6,
      }}
    ></Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 12,
        small: 6,
        large: 3,
      }}
      rowSpan={{
        xsmall: 4,
        large: 6,
      }}
    ></Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 12,
        small: 6,
        large: 6,
      }}
      rowSpan={{
        xsmall: 4,
        large: 4,
      }}
    ></Bento.Item>
  </Bento>
)
LayoutExample1.decorators = [
  Story => (
    <Box
      style={{backgroundColor: 'var(--base-color-scale-gray-2)'}}
      paddingBlockStart="spacious"
      paddingBlockEnd="spacious"
    >
      <Grid>
        <Grid.Column>
          <Story />
        </Grid.Column>
      </Grid>
    </Box>
  ),
]

export const LayoutExample2: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={12} rowSpan={4} />
    <Bento.Item columnSpan={{xsmall: 12, small: 6, large: 7}} rowSpan={4} />
    <Bento.Item columnSpan={{xsmall: 12, small: 6, large: 5}} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
  </Bento>
)

LayoutExample2.decorators = [
  Story => (
    <Box
      style={{backgroundColor: 'var(--base-color-scale-gray-2)'}}
      paddingBlockStart="spacious"
      paddingBlockEnd="spacious"
    >
      <Grid>
        <Grid.Column>
          <Story />
        </Grid.Column>
      </Grid>
    </Box>
  ),
]

export const ImageGallery: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={{
        xsmall: 6,
        large: 3,
      }}
      rowSpan={{
        xsmall: 3,
        large: 5,
      }}
    >
      <Bento.Visual>
        <img src={photoOne} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 6,
        large: 3,
      }}
      rowSpan={{
        xsmall: 2,
        large: 2,
      }}
    >
      <Bento.Visual>
        <img src={photoTwo} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 12,
        large: 6,
      }}
      rowSpan={{
        xsmall: 3,
        large: 5,
      }}
    >
      <Bento.Visual>
        <img src={photoThree} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 6,
        large: 3,
      }}
      rowSpan={{
        xsmall: 2,
        large: 2,
      }}
      rowStart={{
        xsmall: 4,
        large: 6,
      }}
    >
      <Bento.Visual>
        <img src={photoFour} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 6,
        large: 3,
      }}
      rowSpan={{
        xsmall: 3,
        large: 5,
      }}
      rowStart={{
        xsmall: 3,
        large: undefined,
      }}
    >
      <Bento.Visual>
        <img src={photoFive} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      columnSpan={{
        xsmall: 12,
        large: 6,
      }}
      rowSpan={{
        xsmall: 3,
        large: 2,
      }}
    >
      <Bento.Visual>
        <img src={photoSix} alt="random" />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

ImageGallery.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <Box backgroundColor="subtle" paddingBlockStart="spacious" paddingBlockEnd="spacious">
        <Grid>
          <Grid.Column>
            <Story />
          </Grid.Column>
        </Grid>
      </Box>
    </ThemeProvider>
  ),
]

export const Mixed: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={{xsmall: 12, medium: 7}}
      rowSpan={{xsmall: 4, small: 5}}
      flow={{xsmall: 'row', small: 'row'}}
      colorMode="dark"
      visualAsBackground
      className={styles['purple-background']}
    >
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}}>
        <Bento.Heading as="h4" size="3">
          Push what&apos;s possible with GitHub Copilot, the world&apos;s most trusted and widely adopted AI developer
          tool.
        </Bento.Heading>
        <Link href="#" variant="default">
          Learn more about Copilot
        </Link>
      </Bento.Content>
    </Bento.Item>
    <Bento.Item columnSpan={{xsmall: 12, medium: 5}} rowSpan={{xsmall: 4, small: 5}} colorMode="dark" bgColor="default">
      <Bento.Content padding={{xsmall: 'normal', xlarge: 'spacious'}} horizontalAlign="center" verticalAlign="center">
        <Bento.Heading as="h4" size="display" className={styles.customStatNumber}>
          <Box
            paddingBlockStart={{
              narrow: 4,
              regular: 'spacious',
              wide: 4,
            }}
          >
            88%
          </Box>
        </Bento.Heading>
        <Bento.Heading as="h5" size="6" weight="medium" variant="muted">
          of developers experience increased productivity.
        </Bento.Heading>
      </Bento.Content>
      <Bento.Visual
        horizontalAlign="center"
        verticalAlign="center"
        padding={{
          xsmall: 'normal',
          medium: 'spacious',
        }}
        fillMedia={false}
        position="50% 100%"
      >
        <img src={copilotBadge} alt="Platform Artificial Intelligence Logo" width={112} height={112} />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={12} rowSpan={{xsmall: 5, small: 5}} visualAsBackground>
      <Bento.Visual
        style={{
          backgroundImage: `url(${gradientBg})`,
        }}
      >
        <img src={codeWindow} alt="a browser window with code in it" className={styles['Mixed1__codeWindow']} />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      bgColor="default"
      columnSpan={12}
      rowSpan={5}
      flow={{xsmall: 'row', medium: 'column'}}
      colorMode="dark"
      order="default"
    >
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}}>
        <Bento.Heading as="h4" size="4" weight="semibold">
          Mercado Libre frees developers minds to focus on their missions with GitHub.
        </Bento.Heading>
        <Link href="#">Read customer story</Link>
      </Bento.Content>
      <Bento.Visual padding="condensed">
        <img src={mercardo} alt="A white man with grey hair and a beard, running a coffee stand, waving." />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

Mixed.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <Box backgroundColor="subtle" paddingBlockStart="spacious" paddingBlockEnd="spacious" borderRadius="large">
        <Grid>
          <Grid.Column>
            <Story />
          </Grid.Column>
        </Grid>
      </Box>
    </ThemeProvider>
  ),
]

export const Mixed2: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={12}
      rowSpan={{xsmall: 5, large: 7}}
      colorMode="dark"
      style={{backgroundImage: `url(${mixed2GradientBg})`, maxHeight: 690}}
      className={styles.bentoImageBg}
    >
      <Bento.Content
        padding={{
          xsmall: 'normal',
          medium: 'spacious',
        }}
        horizontalAlign="center"
      >
        <Bento.Heading as="h3" size="3" className={styles['Mixed2__heading1']}>
          Deliver secure software fast, with enterprise-ready CI/CD using GitHub Actions.
        </Bento.Heading>
        <Link href="#" variant="default">
          Learn more about CI/CD
        </Link>
      </Bento.Content>
      <Bento.Visual fillMedia={false} verticalAlign="end">
        <img src={ciCD} alt="CI/CD interface" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      className={styles['Mixed2__item']}
      columnSpan={{
        xsmall: 12,
        small: 5,
        medium: 5,
      }}
      rowSpan={{
        xsmall: 4,
        large: 5,
      }}
      bgColor="default"
    >
      <Bento.Visual fillMedia={false} padding="spacious" horizontalAlign="center" verticalAlign="center">
        <Box marginBlockStart={24}>
          <img src={timerImage} alt="Time icon" width="112" height="100%" />
        </Box>
      </Bento.Visual>
      <Bento.Content
        padding={{
          xsmall: 'normal',
          medium: 'spacious',
        }}
        horizontalAlign="center"
        verticalAlign="center"
      >
        <Bento.Heading as="h3" size="4" style={{color: 'var(--base-color-scale-blue-6)'}}>
          Fix vulnerabilities in minutes, not months.
        </Bento.Heading>
      </Bento.Content>
    </Bento.Item>
    <Bento.Item
      colorMode="dark"
      columnSpan={{
        xsmall: 12,
        small: 7,
        medium: 7,
      }}
      rowSpan={{
        xsmall: 4,
        large: 5,
      }}
      style={{backgroundImage: `url(${mixed2GradientBg})`, maxHeight: 690}}
      className={styles.bentoImageBg}
    >
      <Bento.Content
        padding={{
          xsmall: 'normal',
          medium: 'spacious',
        }}
        horizontalAlign="center"
      >
        <Bento.Heading as="h4" size="4">
          Stay secure end-to-end
        </Bento.Heading>
        <Link href="#" variant="default">
          Learn more about actions
        </Link>
      </Bento.Content>
      <Bento.Visual fillMedia={false} horizontalAlign="end" verticalAlign="end" overflow="initial">
        <img src={testingImage} alt="UI of workflow runs" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      colorMode="dark"
      bgColor="default"
      columnSpan={12}
      rowSpan={5}
      flow={{xsmall: 'row', medium: 'column'}}
      order="default"
    >
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}}>
        <Bento.Heading as="h4" size="4" weight="semibold">
          Mercado Libre frees developers minds to focus on their missions with GitHub.
        </Bento.Heading>
        <Link href="#">Read customer story</Link>
      </Bento.Content>
      <Bento.Visual padding="condensed">
        <img src={mercardo} alt="A white man with grey hair and a beard, running a coffee stand, waving." />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

Mixed2.decorators = [
  Story => (
    <ThemeProvider colorMode="light">
      <Box backgroundColor="subtle" paddingBlockStart="spacious" paddingBlockEnd="spacious" borderRadius="large">
        <Grid>
          <Grid.Column>
            <Story />
          </Grid.Column>
        </Grid>
      </Box>
    </ThemeProvider>
  ),
]

export const Mixed3: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={12}
      rowSpan={{
        xsmall: 7,
        large: 6,
      }}
      flow={{
        xsmall: 'row',
        large: 'column',
      }}
      colorMode="dark"
      className={clsx(styles.bentoImageBg, styles['Mixed3__customColumns'])}
      style={{backgroundImage: `url(${purpleGradientBg})`}}
    >
      <Bento.Content
        padding={{
          xsmall: 'normal',
          medium: 'spacious',
        }}
      >
        <Bento.Heading as="h3" size="3" weight="semibold">
          Migrate, scale, and use cloud-based compute to accelerate digital transformation.
        </Bento.Heading>
        <Link href="#" variant="default">
          Learn more about GEI
        </Link>
      </Bento.Content>
      <Bento.Visual verticalAlign="end" horizontalAlign="end" overflow="initial">
        <img className={styles['Mixed3__image']} src={terminalImage} alt="A terminal showcasing the GitHub CLI" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={{xsmall: 12, large: 7}} rowSpan={{xsmall: 4, large: 5}} visualAsBackground colorMode="dark">
      <Bento.Visual position="90% 90%">
        <Image src={globeBg} alt="An illustration of the globe" />
      </Bento.Visual>
      <Bento.Content
        padding={{
          xsmall: 'normal',
          medium: 'spacious',
        }}
      >
        <Bento.Heading as="h3" size="4" weight="semibold">
          Reliability when it matters most with GitHub’s distributed architecture.
        </Bento.Heading>
      </Bento.Content>
    </Bento.Item>
    <Bento.Item columnSpan={{xsmall: 12, large: 5}} rowSpan={{xsmall: 5, large: 5}} order="reversed" bgColor="default">
      <Bento.Content
        padding={{
          xsmall: 'normal',
          medium: 'spacious',
        }}
        verticalAlign="end"
      >
        <Bento.Heading as="h3" size="display" className={styles.customStatNumber}>
          <span style={{color: 'var(--base-color-scale-purple-7)'}}>75%</span>
        </Bento.Heading>
        <Bento.Heading as="h4" size="6" weight="medium" variant="muted">
          Reduced time spent
          <br />
          managing tools.
        </Bento.Heading>
      </Bento.Content>
      <Bento.Visual
        fillMedia={false}
        padding={{
          xsmall: 'normal',
          medium: 'spacious',
        }}
      >
        <Image src={ringDownImage} alt="An icon illustrating reduction" width="112" height="112" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item bgColor="default" columnSpan={12} rowSpan={5} flow={{xsmall: 'row', medium: 'column'}} order="default">
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}}>
        <Bento.Heading as="h4" size="4" weight="semibold">
          Mercado Libre frees developers minds to focus on their missions with GitHub.
        </Bento.Heading>
        <Link href="#">Read customer story</Link>
      </Bento.Content>
      <Bento.Visual padding="condensed">
        <img src={mercardo} alt="A white man with grey hair and a beard, running a coffee stand, waving." />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

Mixed3.decorators = [
  Story => (
    <ThemeProvider colorMode="light">
      <Box
        backgroundColor="subtle"
        paddingBlockStart="spacious"
        paddingBlockEnd="spacious"
        borderRadius="large"
        className={styles.Mixed3}
      >
        <Grid>
          <Grid.Column>
            <Story />
          </Grid.Column>
        </Grid>
      </Box>
    </ThemeProvider>
  ),
]
