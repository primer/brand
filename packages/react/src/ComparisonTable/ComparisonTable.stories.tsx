import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import {Text, InlineLink} from '../'
import {ComparisonTable} from '.'

export default {
  title: 'Components/ComparisonTable',
  component: ComparisonTable,
  argTypes: {
    as: {
      description: 'The HTML element used to render the root component.',
      options: [0, 1], // iterator
      mapping: ['section', 'div'], // values
      defaultValue: 'section',
      control: {
        type: 'inline-radio',
        labels: ['section', 'div']
      },
      table: {
        category: 'ComparisonTable'
      }
    },
    variant: {
      options: [0, 1, 2], // iterator
      mapping: [undefined, 'default', 'minimal'], // values
      control: {
        type: 'inline-radio',
        labels: ['undefined', 'default', 'minimal']
      },
      table: {
        category: 'ComparisonTable'
      }
    },
    heading: {
      type: 'string',
      table: {
        category: 'ComparisonTable'
      }
    },
    featuredColumn: {
      type: 'number',
      defaultValue: 1,
      table: {
        category: 'ComparisonTable'
      }
    },
    footnote: {
      type: 'string',
      defaultValue:
        '*** This is a biased overview of capabilities by use case, based on publicly available information as of 2022-05-16.',
      table: {
        category: 'ComparisonTable'
      }
    }
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  }
} as ComponentMeta<typeof ComparisonTable>

const Template: ComponentStory<typeof ComparisonTable> = args => (
  <ComparisonTable featuredColumn={args.featuredColumn} heading={args.heading} variant={args.variant} as={args.as}>
    <ComparisonTable.Row>
      <ComparisonTable.Cell>Use case</ComparisonTable.Cell>
      <ComparisonTable.Cell>GitHub</ComparisonTable.Cell>
      <ComparisonTable.Cell>Jenkins</ComparisonTable.Cell>
    </ComparisonTable.Row>
    <ComparisonTable.Row>
      <ComparisonTable.Cell>Automation & CI/CD</ComparisonTable.Cell>
      <ComparisonTable.Cell>
        <>
          <Text as="p" size="300">
            Comparable native core capabilities
          </Text>
          <Text as="p" size="300">
            <InlineLink href="#">Over 13,000 GitHub Actions are available</InlineLink>
            &nbsp;in the GitHub Marketplace to automate your development workflow.
          </Text>
        </>
      </ComparisonTable.Cell>
      <ComparisonTable.Cell>
        <>
          <Text as="p" size="300">
            Comparable native capabilities
          </Text>
          <Text as="p" size="300">
            1,800+ community contributed Jenkins plugins{' '}
            <InlineLink href="#">in Jenkins Plugin Marketplace.</InlineLink>
          </Text>
        </>
      </ComparisonTable.Cell>
    </ComparisonTable.Row>
    <ComparisonTable.Row>
      <ComparisonTable.Cell>Deployment models</ComparisonTable.Cell>
      <ComparisonTable.Cell>Cloud or self-hosted</ComparisonTable.Cell>
      <ComparisonTable.Cell>
        <>
          <Text as="p" size="300">
            Self-hosted only
          </Text>
          <Text as="p" size="300">
            CloudBees is the cloud alternative
          </Text>
        </>
      </ComparisonTable.Cell>
    </ComparisonTable.Row>
    {args.footnote && <ComparisonTable.Footnote>{args.footnote}</ComparisonTable.Footnote>}
  </ComparisonTable>
)

export const Playground = Template.bind({})
Playground.args = {
  heading: 'GitHub vs Jenkins'
}

export const PlaygroundMobile = Template.bind({})
PlaygroundMobile.args = {
  heading: 'GitHub vs Jenkins'
}
PlaygroundMobile.parameters = {
  viewport: {
    defaultViewport: 'iphonex'
  }
}
PlaygroundMobile.storyName = 'Playground (mobile)'

export const Minimal = () => (
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
        VMs are effectively separate computers that run their own OS. For example, a VM can run Windows even if the host
        OS is Ubuntu.
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
)
