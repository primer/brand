import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {CopilotIcon} from '@primer/octicons-react'
import {Text, Link} from '../'
import {Bento} from '.'
import placeholderImage from '../fixtures/images/placeholder-visual-universe.png'
import platformAI from '../fixtures/images/Platform-AI.png'
import mercardo from '../fixtures/images/mercado.png'
import analyzeAndDebug from '../fixtures/images/analyzeAndDebug.png'
import styles from './Bento.features.stories.module.css'

export default {
  title: 'Components/Bento/features',
  component: Bento,
  decorators: [
    Story => (
      <div className={styles['story-background-decorator']}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Bento>

export const Universe: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={3} rowSpan={8} />
    <Bento.Item columnSpan={3} rowSpan={4} />
    <Bento.Item columnSpan={6} rowSpan={8} />
    <Bento.Item columnSpan={3} rowSpan={4} rowStart={9} />
    <Bento.Item columnSpan={3} rowSpan={8} />
    <Bento.Item columnSpan={6} rowSpan={4} />
  </Bento>
)

export const EnterpriseOne: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={12} rowSpan={4} />
    <Bento.Item columnSpan={7} rowSpan={4} />
    <Bento.Item columnSpan={5} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
  </Bento>
)

export const EnterpriseTwo: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={12} rowSpan={4} />
    <Bento.Item columnSpan={5} rowSpan={4} />
    <Bento.Item columnSpan={7} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
  </Bento>
)

export const EnterpriseThree: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={7} rowSpan={4} />
    <Bento.Item columnSpan={5} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
  </Bento>
)

export const MixedThemeItems: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={7} rowSpan={4} colorMode="dark" />
    <Bento.Item columnSpan={5} rowSpan={4} colorMode="light" />
    <Bento.Item columnSpan={12} rowSpan={4} colorMode="light" />
    <Bento.Item columnSpan={12} rowSpan={4} colorMode="dark" />
  </Bento>
)

export const ResponsiveItems: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
  </Bento>
)

export const ImageGallery: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={7} rowSpan={4}>
      <Bento.Visual>
        <img src={placeholderImage} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={5} rowSpan={4}>
      <Bento.Visual>
        <img src={placeholderImage} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={12} rowSpan={4}>
      <Bento.Visual>
        <img src={placeholderImage} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={12} rowSpan={4}>
      <Bento.Visual>
        <img src={placeholderImage} alt="random" />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const Example: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={{xsmall: 12, medium: 7}}
      rowSpan={{xsmall: 3, small: 5}}
      flow={{xsmall: 'row', small: 'row'}}
      colorMode="dark"
      visualAsBackground
      className={styles['purple-background']}
    >
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}} leadingVisual={<CopilotIcon />}>
        <Bento.Heading as="h4" size="5">
          Unlocking innovation at scale with AI-driven software development.
        </Bento.Heading>
        <Link href="#" variant="default">
          Learn more about Copilot
        </Link>
      </Bento.Content>
    </Bento.Item>
    <Bento.Item columnSpan={{xsmall: 12, medium: 5}} rowSpan={{xsmall: 3, small: 5}} colorMode="dark">
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}} horizontalAlign={'center'}>
        <Bento.Heading as="h4" size="display">
          88%
        </Bento.Heading>
        <Text align="center">of developers experience increased productivity.</Text>
      </Bento.Content>
      <Bento.Visual padding="normal" fillMedia={false}>
        <img src={platformAI} alt="Platform Artificial Intelligence Logo" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={12} rowSpan={{xsmall: 3, small: 5}} visualAsBackground>
      <Bento.Visual>
        <img
          src={analyzeAndDebug}
          alt="A green and purple gradient screen with a input that has the placeholder, ask a question or type '/' for topics"
        />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      columnSpan={12}
      rowSpan={6}
      flow={{xsmall: 'row', medium: 'column'}}
      colorMode="dark"
      order={{
        xsmall: 'reversed',
        medium: 'default',
      }}
    >
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}}>
        <Bento.Heading as="h4" size="5">
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
