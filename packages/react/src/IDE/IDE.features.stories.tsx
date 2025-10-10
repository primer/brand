import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {IDE, IDEDefaultIconMap} from './IDE'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

import {Box} from '../Box'
import {Grid} from '../Grid'
import {Heading} from '../Heading'
import {Link} from '../Link'
import backgroundImageDark from '../recipes/FeaturePreviewLPs/fixtures/images/productivity/river-bg-dark-1.png'
import backgroundImageLight1 from '../recipes/FeaturePreviewLPs/fixtures/images/productivity/river-bg-light-1.png'
import backgroundImageLight2 from '../recipes/FeaturePreviewLPs/fixtures/images/productivity/river-bg-light-2.png'
import {River, RiverBreakout} from '../river'
import {Text} from '../Text'
import {ThemeProvider, useTheme} from '../ThemeProvider'
import {Timeline} from '../Timeline'
import {chatScript, chatScriptAlt, files, singleFile} from './fixtures/content'
import storyStyles from './IDE.stories.module.css'

import './IDE.stories.hljs.theme.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)

const meta = {
  title: 'Components/IDE/Features',
  component: IDE,
  decorators: [
    Story => (
      <>
        <link rel="stylesheet" href="https://unpkg.com/highlight.js@11.9.0/styles/default.css" />
        <Story />
      </>
    ),
  ],
  parameters: {
    a11y: {
      config: {
        rules: [
          // disable color-contrast rule as the IDE is presentational
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
  },
} satisfies Meta<typeof IDE>

export default meta
type Story = StoryObj<typeof IDE>

export const EditorOnly: Story = {
  render: args => (
    <IDE {...args}>
      <IDE.Editor size="large" activeTab={0} files={files} />
    </IDE>
  ),
}

export const EditorCustomIcons: Story = {
  render: args => (
    <IDE {...args}>
      <IDE.Editor
        size="large"
        activeTab={0}
        files={files}
        tabIcons={{
          ...Object.keys(IDEDefaultIconMap).reduce((acc, key) => {
            acc[key] = 'https://github.com/primer/brand/assets/13340707/fede56eb-578f-4d17-b045-5f6fdfae28cf'
            return acc
          }, {}),
        }}
      />
    </IDE>
  ),
}

export const ChatOnly: Story = {
  render: args => (
    <IDE {...args}>
      <IDE.Chat script={chatScript} alternativeText={chatScriptAlt}></IDE.Chat>
    </IDE>
  ),
}

const WithRiverTemplate = args => {
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
                  backgroundImage: `url(${colorMode === 'dark' ? backgroundImageDark : backgroundImageLight1})`,
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
                    <b>Optionally use a timeline </b> to provide context or additional information.
                  </Timeline.Item>
                  <Timeline.Item>
                    <b>Keep it concise</b> to ensure the user can quickly understand the content.
                  </Timeline.Item>
                </Timeline>
              )}
            >
              <Text>
                <b>Editor in River Breakout</b> <br />
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
                  backgroundImage: `url(${colorMode === 'dark' ? backgroundImageDark : backgroundImageLight2})`,
                }}
                className={storyStyles.riverVisual}
              >
                <IDE {...args} height={530} variant="glass">
                  <IDE.Editor files={singleFile} triggerAnimation={animationPlaying} />
                </IDE>
              </Box>
            </River.Visual>
            <River.Content>
              <Heading>Editor example</Heading>
              <Link href="#" onClick={handleReplay}>
                Replay animation
              </Link>
            </River.Content>
          </River>
          <River imageTextRatio="60:40">
            <River.Visual>
              <Box
                padding={48}
                borderRadius="large"
                style={{
                  backgroundImage: `url(${colorMode === 'dark' ? backgroundImageDark : backgroundImageLight2})`,
                }}
                className={storyStyles.riverVisual}
              >
                <IDE {...args} height={700} variant="glass">
                  <IDE.Chat script={chatScript} alternativeText={chatScriptAlt}></IDE.Chat>
                </IDE>
              </Box>
            </River.Visual>
            <River.Content>
              <Heading>Chat example</Heading>
            </River.Content>
          </River>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export const WithRiver: Story = {
  render: WithRiverTemplate,
  parameters: {
    layout: 'fullscreen',
  },
}

export const PerspectiveExample: Story = {
  render: args => (
    <IDE {...args} className={storyStyles.perspective}>
      <IDE.Editor size="large" activeTab={0} files={files} />
    </IDE>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <ThemeProvider colorMode="dark">
        <div style={{backgroundColor: 'black', minHeight: '100dvh', overflow: 'hidden'}}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export const PerspectiveExampleLight: Story = {
  render: args => (
    <IDE {...args} className={storyStyles.perspective}>
      <IDE.Editor size="large" activeTab={0} files={files} />
    </IDE>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <ThemeProvider colorMode="light">
        <div style={{backgroundColor: 'white', minHeight: '100dvh', overflow: 'hidden'}}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export const AllGlass: Story = {
  render: args => (
    <IDE {...args} variant="glass">
      <IDE.Chat script={chatScript} alternativeText={chatScriptAlt}></IDE.Chat>
      <IDE.Editor size="large" files={files} />
    </IDE>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <ThemeProvider colorMode="light">
        <div
          style={{
            backgroundImage: `url(https://github.com/primer/brand/assets/13340707/7fe496dc-f6e0-417e-9453-32cec638ca68)`,
            backgroundSize: 'cover',
            minHeight: '100dvh',
            overflow: 'hidden',
            paddingTop: 'var(--base-size-112)',
          }}
          className={storyStyles.riverVisual}
        >
          <Grid>
            <Grid.Column>
              <Story />
            </Grid.Column>
          </Grid>
        </div>
      </ThemeProvider>
    ),
  ],
}
