import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {AnchorNav, AnchorNavProps} from '.'
import {Heading, Text, Stack, Button} from '../'
import {RedlineBackground} from '../component-helpers'

type ComponentAndStoryProps = AnchorNavProps & {
  data: {[key: string]: string}
  sectionHeight: number
  offset: number
}

const meta = {
  title: 'Components/AnchorNav',
  component: AnchorNav,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    enableDefaultBgColor: true,
    data: {
      ['GitHub vs Jenkins']: 'githubvsjenkins',
      ['GitHub vs GitLab']: 'githubvsgitlab',
      ['GitHub vs CircleCI']: 'githubvscircleci',
      ['GitHub vs BitBucket']: 'githubvsvsbitbucket',
      ['GitHub vs TravisCI']: 'githubvsvstravis',
    },
    sectionHeight: 1000,
    offset: 100,
  },
  argTypes: {
    data: {
      name: 'Data',
      description: 'Test data',
      control: {
        type: 'object',
      },
      table: {
        category: 'Story customization',
      },
    },
    sectionHeight: {
      name: 'Section height',
      description: 'Section height',
      control: {
        type: 'number',
      },
      table: {
        category: 'Story customization',
      },
    },
    offset: {
      name: 'Offset',
      description: 'Offset from the top of the page',
      control: {
        type: 'number',
      },
      table: {
        category: 'Story customization',
      },
    },
  },
} satisfies Meta<ComponentAndStoryProps>

export default meta
type Story = StoryObj<ComponentAndStoryProps>

export const Default: Story = {
  render: ({data, ...args}: ComponentAndStoryProps) => {
    return (
      <AnchorNav {...args}>
        <AnchorNav.Link href="#section">Section one</AnchorNav.Link>
        <AnchorNav.Link href="#section">Section two</AnchorNav.Link>
        <AnchorNav.Link href="#section">Section three</AnchorNav.Link>
        <AnchorNav.Link href="#section">Section four</AnchorNav.Link>
        <AnchorNav.Link href="#section">Section five</AnchorNav.Link>
        <AnchorNav.Action href="#">Sign up</AnchorNav.Action>
      </AnchorNav>
    )
  },
}

export const Playground: Story = {
  render: ({data, ...args}: ComponentAndStoryProps) => {
    return (
      <div style={{backgroundColor: 'var(--base-color-scale-red-0)'}}>
        <RedlineBackground height={args.offset}>
          <Stack direction="vertical" gap="none" justifyContent="center" style={{textAlign: 'center'}}>
            <Heading as="h1" size="6">
              Offset {args.offset}px from top
            </Heading>
            <Text as="p" variant="muted" size="200">
              (configure me using Storybook Controls)
            </Text>
          </Stack>
        </RedlineBackground>
        <AnchorNav {...args}>
          {Object.entries(data).map(([key, value]) => (
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
          {Object.entries(data).map(([key, value]) => (
            <RedlineBackground key={value}>
              <Stack
                key={value}
                id={value}
                direction="vertical"
                alignItems="flex-start"
                style={{
                  padding: `${args.sectionHeight / 2}px var(--base-size-24)`,
                }}
              >
                <Heading>{key}</Heading>
                <Text as="p">
                  AnchorNav is a component that allows users to navigate to different sections of a page.
                </Text>
                <Button>Learn More</Button>
              </Stack>
            </RedlineBackground>
          ))}
        </Stack>
      </div>
    )
  },
}
