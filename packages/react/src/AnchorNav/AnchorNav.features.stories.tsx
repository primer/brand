import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {expect, userEvent, within} from '@storybook/test'

import {AnchorNav} from '.'
import {Heading, Text, Stack} from '../'
import {RedlineBackground} from '../component-helpers'

type MockData = {
  [key: string]: string
}

export default {
  title: 'Components/AnchorNav/Features',
  component: AnchorNav,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
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
  enableDefaultBgColor: {
    description: 'Enable default background color',
    control: {type: 'boolean'},
    table: {
      category: 'AnchorNav',
    },
  },
} as Meta<typeof AnchorNav>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: StoryFn<typeof AnchorNav> = (_, storyArgs: any) => {
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
      <AnchorNav {...storyArgs.args}>
        {storyData.map(([key, value]) => (
          <AnchorNav.Link href={value} key={value}>
            {key}
          </AnchorNav.Link>
        ))}
        <AnchorNav.Action href="#">Get started</AnchorNav.Action>
        <AnchorNav.SecondaryAction href="#">Compare plans</AnchorNav.SecondaryAction>
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
                padding: `${storyArgs.args.sectionHeight / 2}px var(--base-size-24)`,
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

export const FewerAnchorLinks = Template.bind({})
FewerAnchorLinks.storyName = 'Fewer anchor links'
FewerAnchorLinks.args = {
  data: {
    ['GitHub vs Jenkins']: 'githubvsjenkins',
    ['GitHub vs GitLab']: 'githubvsgitlab',
    ['GitHub vs CircleCI']: 'githubvscircleci',
  },
} as never

export const ShorterLabels = Template.bind({})
ShorterLabels.storyName = 'Shorter labels'
ShorterLabels.args = {
  data: {
    ['Foo']: 'foo',
    ['Bar']: 'bar',
    ['Baz']: 'baz',
    ['Qux']: 'qux',
    ['Quux']: 'quux',
  },
} as never

export const LongerLabels = Template.bind({})
LongerLabels.storyName = 'Longer labels'
LongerLabels.args = {
  data: {
    ['Donec ultricies euismod']: 'donecultricieseuismodporttitor',
    ['Pellentesque eleifend metus']: 'pellentesqueeleifendmetus',
    ['Vestibulum consequat at']: 'vestibulumconsequatat',
  },
} as never

export const CustomBackground = ({data, ...args}: {data: MockData; offset: number}) => {
  return (
    <div style={{backgroundColor: 'var(--base-color-scale-green-0)', paddingTop: args.offset}}>
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
          <Stack
            key={value}
            id={value}
            direction="vertical"
            style={{
              padding: '500px var(--base-size-24)',
            }}
          >
            <Heading>{key}</Heading>
            <Text as="p">AnchorNav is a component that allows users to navigate to different sections of a page.</Text>
          </Stack>
        ))}
      </Stack>
    </div>
  )
}
CustomBackground.args = {
  enableDefaultBgColor: false,
}

export const NarrowView = Template.bind({})
NarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
NarrowView.storyName = 'Narrow view, menu closed (mobile)'

export const NarrowViewMenuOpen = Template.bind({})
NarrowViewMenuOpen.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
  axe: {
    timeout: 5000,
  },
}
NarrowViewMenuOpen.storyName = 'Narrow view, menu open (mobile)'
NarrowViewMenuOpen.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)
  const menubar = canvas.getByTestId(AnchorNav.testIds.menuLinks)

  await userEvent.click(canvas.getByTestId(AnchorNav.testIds.menuButton))
  await expect(menubar).toBeVisible()
}

export const RegularView = Template.bind({})
RegularView.storyName = 'Regular view, menu closed (tablet)'
RegularView.parameters = {
  viewport: {
    defaultViewport: 'ipad10p',
  },
}

export const RegularViewMenuOpen = Template.bind({})
RegularViewMenuOpen.storyName = 'Regular view, menu open (tablet)'
RegularViewMenuOpen.parameters = {
  viewport: {
    defaultViewport: 'ipad10p',
  },
  axe: {
    timeout: 5000,
  },
}
RegularViewMenuOpen.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)
  const menubar = canvas.getByTestId(AnchorNav.testIds.menuLinks)

  await userEvent.click(canvas.getByTestId(AnchorNav.testIds.menuButton))
  await expect(menubar).toBeVisible()
}

export const HideUntilSticky = Template.bind({})
HideUntilSticky.args = {
  hideUntilSticky: true,
}
HideUntilSticky.storyName = 'Hide until sticky'

export const AnchorNavPrimaryActions = () => {
  const data = ['link1', 'link2', 'link3']
  return (
    <>
      <AnchorNav>
        {data.map((link, index) => (
          <AnchorNav.Link href={link} key={index}>
            {link}
          </AnchorNav.Link>
        ))}
        <AnchorNav.Action variant="primary" href="#">
          Get started
        </AnchorNav.Action>
      </AnchorNav>
      <Stack
        direction="vertical"
        justifyContent="space-around"
        gap="none"
        style={{marginBottom: '100px'}}
        padding="none"
      >
        {data.map(key => (
          <RedlineBackground key={key}>
            <Stack
              key={key}
              id={key}
              direction="vertical"
              style={{
                padding: `${1000 / 2}px var(--base-size-24)`,
              }}
            >
              <Heading>First action as primary</Heading>
              <Text as="p">
                AnchorNav is a component that allows users to navigate to different sections of a page.
              </Text>
            </Stack>
          </RedlineBackground>
        ))}
      </Stack>
    </>
  )
}
AnchorNavPrimaryActions.storyName = 'With optional primary CTA'

export const AnchorNavLargerActions = () => {
  const data = ['link1', 'link2', 'link3']
  return (
    <>
      <AnchorNav>
        {data.map((link, index) => (
          <AnchorNav.Link href={link} key={index}>
            {link}
          </AnchorNav.Link>
        ))}
        <AnchorNav.Action size="medium" href="#">
          Primary action
        </AnchorNav.Action>
        <AnchorNav.SecondaryAction size="medium" href="#">
          Secondary action
        </AnchorNav.SecondaryAction>
      </AnchorNav>
      <Stack
        direction="vertical"
        justifyContent="space-around"
        gap="none"
        style={{marginBottom: '100px'}}
        padding="none"
      >
        {data.map(key => (
          <RedlineBackground key={key}>
            <Stack
              key={key}
              id={key}
              direction="vertical"
              style={{
                padding: `${1000 / 2}px var(--base-size-24)`,
              }}
            >
              <Heading>First action as primary</Heading>
              <Text as="p">
                AnchorNav is a component that allows users to navigate to different sections of a page.
              </Text>
            </Stack>
          </RedlineBackground>
        ))}
      </Stack>
    </>
  )
}
AnchorNavLargerActions.storyName = 'With larger CTAs'
