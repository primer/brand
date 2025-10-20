import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'

import {Text, InlineLink} from '../'
import {ComparisonTable} from '.'

type StoryArgs = React.ComponentProps<typeof ComparisonTable> & {
  footnote?: string
}

const meta = {
  title: 'Components/ComparisonTable',
  component: ComparisonTable as Meta<StoryArgs>['component'],
  args: {
    variant: 'default',
    as: 'section',
    footnote:
      '*** This is a biased overview of capabilities by use case, based on publicly available information as of 2022-05-16.',
    featuredColumn: 1,
  },
  argTypes: {
    as: {
      description: 'The HTML element used to render the root component.',
      control: {
        type: 'inline-radio',
        options: ['section', 'large'],
      },
      table: {
        category: 'ComparisonTable',
      },
    },
    variant: {
      control: {
        type: 'inline-radio',
        options: ['undefined', 'default', 'minimal'],
      },
      table: {
        category: 'ComparisonTable',
      },
    },
    heading: {
      type: 'string',
      table: {
        category: 'ComparisonTable',
      },
    },
    featuredColumn: {
      type: 'number',
      table: {
        category: 'ComparisonTable',
      },
    },
    footnote: {
      type: 'string',
      table: {
        category: 'ComparisonTable',
      },
    },
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<StoryArgs>

const ComparisonTableTemplate = ({footnote, ...args}: StoryArgs) => (
  <ComparisonTable {...args}>
    <ComparisonTable.Row>
      <ComparisonTable.Cell>Use case</ComparisonTable.Cell>
      <ComparisonTable.Cell>GitHub</ComparisonTable.Cell>
      <ComparisonTable.Cell>Jenkins</ComparisonTable.Cell>
    </ComparisonTable.Row>
    <ComparisonTable.Row>
      <ComparisonTable.Cell>Automation & CI/CD</ComparisonTable.Cell>
      <ComparisonTable.Cell>
        <Text as="p">Comparable native core capabilities</Text>
        <Text as="p">
          <InlineLink href="#">Over 13,000 GitHub Actions are available</InlineLink>
          &nbsp;in the GitHub Marketplace to automate your development workflow.
        </Text>
      </ComparisonTable.Cell>
      <ComparisonTable.Cell>
        <Text as="p">Comparable native capabilities</Text>
        <Text as="p">
          1,800+ community contributed Jenkins plugins <InlineLink href="#">in Jenkins Plugin Marketplace.</InlineLink>
        </Text>
      </ComparisonTable.Cell>
    </ComparisonTable.Row>
    <ComparisonTable.Row>
      <ComparisonTable.Cell>Deployment models</ComparisonTable.Cell>
      <ComparisonTable.Cell>Cloud or self-hosted</ComparisonTable.Cell>
      <ComparisonTable.Cell>
        <Text as="p">Self-hosted only</Text>
        <Text as="p">CloudBees is the cloud alternative</Text>
      </ComparisonTable.Cell>
    </ComparisonTable.Row>
    {footnote && <ComparisonTable.Footnote>{footnote}</ComparisonTable.Footnote>}
  </ComparisonTable>
)

export const Playground: Story = {
  render: args => <ComparisonTableTemplate {...args} />,
  args: {
    heading: 'GitHub vs Jenkins',
  },
}

export const PlaygroundMobile: Story = {
  render: args => <ComparisonTableTemplate {...args} />,
  args: {
    heading: 'GitHub vs Jenkins',
  },
  globals: {
    viewport: {value: 'iphonex'},
  },
  name: 'Playground (mobile)',
}

export const Minimal: Story = {
  render: () => (
    <ComparisonTable heading="What is containerization?  " variant="minimal">
      <ComparisonTable.Row>
        <ComparisonTable.Cell></ComparisonTable.Cell>
        <ComparisonTable.Cell>Containerization</ComparisonTable.Cell>
        <ComparisonTable.Cell>Virtualization</ComparisonTable.Cell>
      </ComparisonTable.Row>
      <ComparisonTable.Row>
        <ComparisonTable.Cell>Operating system (OS) </ComparisonTable.Cell>
        <ComparisonTable.Cell>
          Containers use the host OS, meaning all containers must be compatible with that OS.
        </ComparisonTable.Cell>
        <ComparisonTable.Cell>
          VMs are effectively separate computers that run their own OS. For example, a VM can run Windows even if the
          host OS is Ubuntu.
        </ComparisonTable.Cell>
      </ComparisonTable.Row>
      <ComparisonTable.Row>
        <ComparisonTable.Cell>Computing resources </ComparisonTable.Cell>
        <ComparisonTable.Cell>
          Containers are lightweight, taking only the resources needed to run the application and the container manager.{' '}
        </ComparisonTable.Cell>
        <ComparisonTable.Cell>
          VMs emulate a full computer, meaning that they replicate much of the host environment. That uses more memory,
          CPU cycles, and disk space.
        </ComparisonTable.Cell>
      </ComparisonTable.Row>
      <ComparisonTable.Row>
        <ComparisonTable.Cell>Shareability </ComparisonTable.Cell>
        <ComparisonTable.Cell>
          Container images are relatively small in size, making them easy to share.
        </ComparisonTable.Cell>
        <ComparisonTable.Cell>VM images are often much larger as they include a full OS.</ComparisonTable.Cell>
      </ComparisonTable.Row>
      <ComparisonTable.Row>
        <ComparisonTable.Cell>Security</ComparisonTable.Cell>
        <ComparisonTable.Cell>
          Containers might be isolated only very lightly from each other. A process in one container could access memory
          used by another container, for example.
        </ComparisonTable.Cell>
        <ComparisonTable.Cell>
          By running a separate OS, VMs running on the same hardware are more isolated from one another than containers.
        </ComparisonTable.Cell>
      </ComparisonTable.Row>
    </ComparisonTable>
  ),
}
