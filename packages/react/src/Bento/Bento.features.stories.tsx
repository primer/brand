import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {Bento} from '.'
import {Heading, Text, Link} from '../'
import placeholderImage from '../fixtures/images/placeholder-visual-universe.png'
import {CopilotIcon} from '@primer/octicons-react'

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
    <Bento.Item columnSpan={7} rowSpan={4} colorMode="dark" />
    <Bento.Item columnSpan={5} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} />
    <Bento.Item columnSpan={12} rowSpan={4} colorMode="dark" />
  </Bento>
)

export const ResponsiveItems: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4, xlarge: 4, xxlarge: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4, xlarge: 4, xxlarge: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4, xlarge: 4, xxlarge: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4, xlarge: 4, xxlarge: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4, xlarge: 4, xxlarge: 4}}
    />
    <Bento.Item
      columnSpan={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 3, xxlarge: 2}}
      rowSpan={{xsmall: 1, small: 2, medium: 3, large: 4, xlarge: 4, xxlarge: 4}}
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
  <>
    <style>
      {`.purple-background {
                background: linear-gradient(90deg, #6C5DD3 0%, #613DB4 100%);
    	}
		.align-center {
			text-align: center;
		}
		.block-icon {
			display: block !important;
			margin-bottom: 10px;
		}
		`}
    </style>
    <Bento>
      <Bento.Item columnSpan={7} rowSpan={4} colorMode="dark" visualAsBackground className="purple-background">
        <Bento.Content padding="normal" fixedBottomLink>
          <CopilotIcon size={32} className="block-icon" />
          <Heading as="h4" size="4">
            Unlocking innovation at scale with AI-driven software development.
          </Heading>
          <Link href="#">Learn more about Copilot</Link>
        </Bento.Content>
      </Bento.Item>
      <Bento.Item columnSpan={5} rowSpan={4} colorMode="dark">
        <Bento.Content padding="normal" className="align-center">
          <Heading as="h4" size="1">
            88%
          </Heading>
          <Text>of developers experience increased productivity.</Text>
        </Bento.Content>
        <Bento.Visual padding="normal" fillMedia={false}>
          <img src={placeholderImage} alt="random" />
        </Bento.Visual>
      </Bento.Item>
      <Bento.Item columnSpan={12} rowSpan={4} visualAsBackground>
        <Bento.Visual>
          <img src={placeholderImage} alt="random" />
        </Bento.Visual>
      </Bento.Item>
      <Bento.Item columnSpan={12} rowSpan={4} flow="column" colorMode="dark">
        <Bento.Content padding="normal" fixedBottomLink>
          <Heading as="h4" size="4">
            Mercado Libre frees developers minds to focus on their missions with GitHub.
          </Heading>
          <Link href="#">Read customer story</Link>
        </Bento.Content>
        <Bento.Visual padding="condensed">
          <img src={placeholderImage} alt="random" />
        </Bento.Visual>
      </Bento.Item>
    </Bento>
  </>
)
