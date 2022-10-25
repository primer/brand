import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
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

export const Minimal = Template.bind({})
Minimal.args = {
  variant: 'minimal'
}
