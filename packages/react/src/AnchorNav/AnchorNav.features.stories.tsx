import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {expect, userEvent, within} from 'storybook/test'

import {AnchorNav} from '.'
import {Heading, Text, Stack} from '../'
import {RedlineBackground} from '../component-helpers'

const meta = {
  title: 'Components/AnchorNav/Features',
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
    enableDefaultBgColor: {
      description: 'Enable default background color',
      control: {type: 'boolean'},
      table: {
        category: 'AnchorNav',
      },
    },
  },
} satisfies Meta<typeof AnchorNav>

export default meta
type Story = StoryObj<typeof meta>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderTemplate = (args: any) => {
  const storyData = Object.entries(args.data) as [string, string][]
  return (
    <div style={{backgroundColor: 'var(--brand-color-canvas-default)'}}>
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
                padding: `${args.sectionHeight / 2}px var(--base-size-24)`,
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

export const FewerAnchorLinks: Story = {
  name: 'Fewer anchor links',
  render: renderTemplate,
  args: {
    data: {
      ['GitHub vs Jenkins']: 'githubvsjenkins',
      ['GitHub vs GitLab']: 'githubvsgitlab',
      ['GitHub vs CircleCI']: 'githubvscircleci',
    },
  },
}

export const ShorterLabels: Story = {
  name: 'Shorter labels',
  render: renderTemplate,
  args: {
    data: {
      ['Foo']: 'foo',
      ['Bar']: 'bar',
      ['Baz']: 'baz',
      ['Qux']: 'qux',
      ['Quux']: 'quux',
    },
  },
}

export const LongerLabels: Story = {
  name: 'Longer labels',
  render: renderTemplate,
  args: {
    data: {
      ['Donec ultricies euismod']: 'donecultricieseuismodporttitor',
      ['Pellentesque eleifend metus']: 'pellentesqueeleifendmetus',
      ['Vestibulum consequat at']: 'vestibulumconsequatat',
    },
  },
}

export const CustomBackground: Story = {
  render: ({data, ...args}: {data: {[key: string]: string}; offset: number}) => {
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
              <Text as="p">
                AnchorNav is a component that allows users to navigate to different sections of a page.
              </Text>
            </Stack>
          ))}
        </Stack>
      </div>
    )
  },
  args: {
    enableDefaultBgColor: false,
  },
}

export const NarrowView: Story = {
  name: 'Narrow view, menu closed (mobile)',
  render: renderTemplate,
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const NarrowViewMenuOpen: Story = {
  name: 'Narrow view, menu open (mobile)',
  render: renderTemplate,
  globals: {
    viewport: {value: 'iphonexr'},
  },
  parameters: {
    axe: {
      timeout: 5000,
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const menubar = canvas.getByTestId(AnchorNav.testIds.menuLinks)

    await userEvent.click(canvas.getByTestId(AnchorNav.testIds.menuButton))
    await expect(menubar).toBeVisible()
  },
}

export const RegularView: Story = {
  name: 'Regular view, menu closed (tablet)',
  render: renderTemplate,
  globals: {
    viewport: {value: 'ipad10p'},
  },
}

export const RegularViewMenuOpen: Story = {
  name: 'Regular view, menu open (tablet)',
  render: renderTemplate,
  globals: {
    viewport: {value: 'ipad10p'},
  },
  parameters: {
    axe: {
      timeout: 5000,
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const menubar = canvas.getByTestId(AnchorNav.testIds.menuLinks)

    await userEvent.click(canvas.getByTestId(AnchorNav.testIds.menuButton))
    await expect(menubar).toBeVisible()
  },
}

export const HideUntilSticky: Story = {
  name: 'Hide until sticky',
  render: renderTemplate,
  args: {
    hideUntilSticky: true,
  },
}

export const AnchorNavPrimaryActions: Story = {
  name: 'With optional primary CTA',
  render: () => {
    const data = ['link1', 'link2', 'link3']
    return (
      <div style={{backgroundColor: 'var(--brand-color-canvas-default)'}}>
        <RedlineBackground height={75}></RedlineBackground>
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
      </div>
    )
  },
}

export const AnchorNavLargerActions: Story = {
  name: 'With larger CTAs',
  render: () => {
    const data = ['link1', 'link2', 'link3']
    return (
      <div style={{backgroundColor: 'var(--brand-color-canvas-default)'}}>
        <RedlineBackground height={75}></RedlineBackground>
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
      </div>
    )
  },
}
