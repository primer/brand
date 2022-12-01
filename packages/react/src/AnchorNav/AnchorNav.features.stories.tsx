import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import {AnchorNav} from '.'
import {Heading, Text, Stack} from '../'
import {RedlineBackground} from '../component-helpers'

export default {
  title: 'Components/AnchorNav/Features',
  component: AnchorNav,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  },
  args: {
    data: {
      ['GitHub vs Jenkins']: 'githubvsjenkins',
      ['GitHub vs GitLab']: 'githubvsgitlab',
      ['GitHub vs CircleCI']: 'githubvscircleci',
      ['GitHub vs BitBucket']: 'githubvsvsbitbucket',
      ['GitHub vs TravisCI']: 'githubvsvstravis'
    },
    offset: 100
  },
  argTypes: {
    data: {
      name: 'Data',
      description: 'Test data',
      control: {
        type: 'object'
      },
      table: {
        category: 'Story customization'
      }
    },
    offset: {
      name: 'Offset',
      description: 'Offset from the top of the page',
      control: {
        type: 'number'
      },
      table: {
        category: 'Story customization'
      }
    }
  }
} as ComponentMeta<typeof AnchorNav>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<typeof AnchorNav> = (_, storyArgs: any) => {
  const storyData = Object.entries(storyArgs.args.data) as [string, string][]
  return (
    <div style={{backgroundColor: 'var(--brand-color-canvas-default)'}}>
      <RedlineBackground height={storyArgs.args.offset}>
        <Stack direction="vertical" gap="none" justifyContent="center" style={{textAlign: 'center'}}>
          <Heading as="h1" size="6">
            Offset {storyArgs.args.offset}px from top
          </Heading>
          <Text as="p" variant="muted" size="200">
            (configure me using Storybook Controls)
          </Text>
        </Stack>
      </RedlineBackground>
      <AnchorNav {...storyArgs.args.args}>
        {storyData.map(([key, value]) => (
          <AnchorNav.Link href={value} key={value}>
            {key}
          </AnchorNav.Link>
        ))}
        <AnchorNav.Action href="#">Sign up</AnchorNav.Action>
      </AnchorNav>
      {/**
       *  The following markup is provided for demonstration purposes only.
       *  It is not part of the AnchorNav component.
       */}
      <Stack
        direction="vertical"
        justifyContent="space-around"
        gap="none"
        style={{marginBottom: '100px'}}
        padding="none"
      >
        {storyData.map(([key, value]) => (
          <RedlineBackground key={key}>
            <Stack
              key={value}
              id={value}
              direction="vertical"
              style={{
                padding: '500px var(--base-size-24)'
              }}
            >
              <Heading>{key}</Heading>
              <Text as="p">
                AnchorNav is a component that allows users to navigate to different sections of a page.
              </Text>
            </Stack>
          </RedlineBackground>
        ))}
      </Stack>
    </div>
  )
}

export const NarrowView = Template.bind({})
NarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphonexr'
  }
}
