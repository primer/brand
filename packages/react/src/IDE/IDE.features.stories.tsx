import {Meta} from '@storybook/react'
import React from 'react'
import {IDE} from './IDE'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

import {Box} from '../Box'
import {Grid} from '../Grid'
import {Heading} from '../Heading'
import {Link} from '../Link'
import backgroundImageDark2 from '../recipes/FeaturePreviewLPs/fixtures/images/ai/river-bg-dark-2.png'
import backgroundImageLight2 from '../recipes/FeaturePreviewLPs/fixtures/images/ai/river-bg-light-2.png'
import backgroundImageDark1 from '../recipes/FeaturePreviewLPs/fixtures/images/security/river-bg-dark-1.png'
import backgroundImageLight1 from '../recipes/FeaturePreviewLPs/fixtures/images/security/river-bg-light-1.png'
import {River, RiverBreakout} from '../river'
import {Text} from '../Text'
import {ThemeProvider, useTheme} from '../ThemeProvider'
import {Timeline} from '../Timeline'
import storyStyles from './IDE.stories.module.css'
import {chatScript, files, singleFile} from './fixtures/content'

import './IDE.stories.hljs.theme.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)

export default {
  title: 'Components/IDE/features',
  component: IDE,
  decorators: [
    Story => (
      <>
        <link rel="stylesheet" href="https://unpkg.com/highlight.js@11.9.0/styles/default.css" />
        <Story />
      </>
    ),
  ],
} as Meta<typeof IDE>

export const EditorOnly = args => {
  return (
    <IDE {...args}>
      <IDE.Editor size="large" activeTab={0} files={files} />
    </IDE>
  )
}

export const ChatOnly = args => {
  return (
    <IDE {...args}>
      <IDE.Chat script={chatScript}></IDE.Chat>
    </IDE>
  )
}

export const WithRiver = args => {
  const [animationPlaying, setAnimationPlaying] = React.useState(false)
  const handleReplay = e => {
    e.preventDefault()
    setAnimationPlaying(prev => !prev)
  }

  const {colorMode} = useTheme()

  return (
    <div style={{backgroundColor: 'var(--brand-color-canvas-default)', minHeight: '100dvh', overflow: 'hidden'}}>
      <Grid>
        <Grid.Column>
          <RiverBreakout>
            <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
            <RiverBreakout.Visual>
              <Box
                paddingBlockStart={{narrow: 24, regular: 48}}
                paddingBlockEnd={{narrow: 24, regular: 48}}
                paddingInlineStart={{narrow: 24, regular: 128}}
                paddingInlineEnd={{narrow: 24, regular: 128}}
                borderRadius="large"
                style={{
                  backgroundImage: `url(${colorMode === 'dark' ? backgroundImageDark1 : backgroundImageLight1})`,
                }}
                className={storyStyles.riverVisual}
              >
                <IDE {...args} variant="glass" height={630}>
                  <IDE.Editor size="large" activeTab={0} files={files} triggerAnimation={animationPlaying} />
                </IDE>
              </Box>
            </RiverBreakout.Visual>
            <RiverBreakout.Content
              trailingComponent={() => (
                <Timeline>
                  <Timeline.Item>
                    <em>GitHub Codespaces</em> offers a complete dev environment in seconds.
                  </Timeline.Item>
                  <Timeline.Item>
                    <em>GitHub Copilot</em> is your AI pair programmer that empowers you to complete tasks.
                  </Timeline.Item>
                </Timeline>
              )}
            >
              <Text>
                <em>This first sentence is a river breakout headline.</em> And this is where the body copy starts.
                Remember to keep these nice and succinct.
              </Text>
              <Link href="#" onClick={handleReplay}>
                Replay animation
              </Link>
            </RiverBreakout.Content>
          </RiverBreakout>
          <River imageTextRatio="60:40">
            <River.Visual>
              <Box
                padding={48}
                borderRadius="large"
                style={{
                  backgroundImage: `url(${colorMode === 'dark' ? backgroundImageDark2 : backgroundImageLight2})`,
                }}
                className={storyStyles.riverVisual}
              >
                <IDE {...args} height={530} variant="glass">
                  <IDE.Editor size="large" files={singleFile} triggerAnimation={animationPlaying} />
                </IDE>
              </Box>
            </River.Visual>
            <River.Content>
              <Heading>Heading</Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                sed turpis felis nam pulvinar risus elementum.
              </Text>
              <Link href="#" onClick={handleReplay}>
                Replay animation
              </Link>
            </River.Content>
          </River>
        </Grid.Column>
      </Grid>
    </div>
  )
}
WithRiver.parameters = {
  layout: 'fullscreen',
}

export const PerspectiveExample = args => {
  return (
    <IDE {...args} className={storyStyles.perspective}>
      <IDE.Editor size="large" activeTab={0} files={files} />
    </IDE>
  )
}

PerspectiveExample.parameters = {
  layout: 'fullscreen',
}

PerspectiveExample.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <div style={{backgroundColor: 'black', minHeight: '100dvh', overflow: 'hidden'}}>
        <Story />
      </div>
    </ThemeProvider>
  ),
]

export const PerspectiveExampleLight = () => <PerspectiveExample />

PerspectiveExampleLight.decorators = [
  Story => (
    <ThemeProvider colorMode="light">
      <div style={{backgroundColor: 'white', minHeight: '100dvh', overflow: 'hidden'}}>
        <Story />
      </div>
    </ThemeProvider>
  ),
]
