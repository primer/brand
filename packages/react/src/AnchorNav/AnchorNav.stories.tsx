import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {AnchorNav} from '.'
import {Heading, Text, Stack} from '../'
import {RedlineBackground} from '../component-helpers'

type MockData = {
  [key: string]: string
}

export default {
  title: 'Components/AnchorNav',
  component: AnchorNav,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    enableDefaultBgColor: true,
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

export const Default = ({data, ...args}: {data: MockData}) => {
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
}

export const Playground = ({data, ...args}: {data: MockData; offset: number}) => {
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
