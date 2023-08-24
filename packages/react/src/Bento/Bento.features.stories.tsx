import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {Bento} from '.'
import {Heading, Text, Link, ColorModesEnum} from '../'
import placeholderImage from '../fixtures/images/placeholder-visual-universe.png'
import platformAI from '../fixtures/images/Platform-AI.png'
import mercardo from '../fixtures/images/mercado.png'
import analyzeAndDebug from '../fixtures/images/analyzeAndDebug.png'
import {CopilotIcon} from '@primer/octicons-react'
import styles from './Bento.features.stories.module.css'

export default {
  title: 'Components/Bento/features',
  component: Bento,
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
    <Bento.Item columnSpan={7} rowSpan={4} colorMode={ColorModesEnum.DARK} />
    <Bento.Item columnSpan={5} rowSpan={4} colorMode={ColorModesEnum.LIGHT} />
    <Bento.Item columnSpan={12} rowSpan={4} colorMode={ColorModesEnum.LIGHT} />
    <Bento.Item columnSpan={12} rowSpan={4} colorMode={ColorModesEnum.DARK} />
  </Bento>
)

export const ResponsiveItems: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4}}
    />
  </Bento>
)

export const ImageGallery: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item columnSpan={7} rowSpan={4} visualAsBackground>
      <Bento.Visual>
        <img src={placeholderImage} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={5} rowSpan={4} visualAsBackground>
      <Bento.Visual>
        <img src={placeholderImage} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={12} rowSpan={4} visualAsBackground>
      <Bento.Visual>
        <img src={placeholderImage} alt="random" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={12} rowSpan={4} visualAsBackground>
      <Bento.Visual>
        <img src={placeholderImage} alt="random" />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const Example: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={{xsmall: 12, small: 7}}
      rowSpan={{xsmall: 3, small: 4}}
      flow={{xsmall: 'row', small: 'row'}}
      colorMode={ColorModesEnum.DARK}
      visualAsBackground
      className={styles['purple-background']}
    >
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}} fixedBottomLink leadingVisual={<CopilotIcon />}>
        <Heading as="h4" size="5">
          Unlocking innovation at scale with AI-driven software development.
        </Heading>
        <Link href="#">Learn more about Copilot</Link>
      </Bento.Content>
    </Bento.Item>
    <Bento.Item columnSpan={{xsmall: 12, small: 5}} rowSpan={{xsmall: 3, small: 4}} colorMode={ColorModesEnum.DARK}>
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}} horizontalAlign={'center'}>
        <Heading as="h4" size="1">
          88%
        </Heading>
        <Text align="center">of developers experience increased productivity.</Text>
      </Bento.Content>
      <Bento.Visual padding="normal" fillMedia={false}>
        <img src={platformAI} alt="Platform Artificial Intelligence Logo" />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item columnSpan={12} rowSpan={{xsmall: 3, small: 4}} visualAsBackground>
      <Bento.Visual>
        <img
          src={analyzeAndDebug}
          alt="A green and purple gradient screen with a input that has the placeholder, ask a question or type '/' for topics"
        />
      </Bento.Visual>
    </Bento.Item>
    <Bento.Item
      columnSpan={12}
      rowSpan={{xsmall: 6, small: 4}}
      flow={{xsmall: 'row', small: 'column'}}
      colorMode={ColorModesEnum.DARK}
    >
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}} fixedBottomLink>
        <Heading as="h4" size="5">
          Mercado Libre frees developers minds to focus on their missions with GitHub.
        </Heading>
        <Link href="#">Read customer story</Link>
      </Bento.Content>
      <Bento.Visual padding="condensed">
        <img src={mercardo} alt="A white man with grey hair and a beard, running a coffee stand, waving." />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)
