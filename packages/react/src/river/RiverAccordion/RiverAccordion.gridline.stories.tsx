import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {CopilotIcon} from '@primer/octicons-react'

import {Icon, Image, Link, RiverAccordion, Section, Text} from '../../'
import renderUI1 from '../../fixtures/images/copilot-vscode-agent-mode-1.png'
import renderUI2 from '../../fixtures/images/copilot-vscode-agent-mode-2.png'
import renderUI3 from '../../fixtures/images/copilot-vscode-agent-mode-3.png'
import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'
import placeholder3 from '../../fixtures/images/placeholder-3.png'

const meta: Meta<typeof RiverAccordion> = {
  title: 'Components/RiverAccordion/Features/Gridline variants',
  component: RiverAccordion,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof RiverAccordion>

export const GridLine: Story = {
  name: 'Gridline variant',
  render: () => (
    <Section>
      <RiverAccordion variant="gridline">
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual>
            <Image
              src={placeholder1}
              alt="placeholder, blank area with an orange background color and a white number 1 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual>
            <Image
              src={placeholder2}
              alt="placeholder, blank area with a purple background color and a white number 2 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 3</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual>
            <Image
              src={placeholder3}
              alt="placeholder, blank area with a green background color and a white number 3 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>
    </Section>
  ),
}

export const GridLineEnd: Story = {
  name: 'Gridline variant (end)',
  render: () => (
    <Section>
      <RiverAccordion variant="gridline" align="end">
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual>
            <Image
              src={placeholder1}
              alt="placeholder, blank area with an orange background color and a white number 1 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual>
            <Image
              src={placeholder2}
              alt="placeholder, blank area with a purple background color and a white number 2 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 3</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual>
            <Image
              src={placeholder3}
              alt="placeholder, blank area with a green background color and a white number 3 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>
    </Section>
  ),
}

export const GridLineWithoutVisualBackground: Story = {
  name: 'Gridline without visual background',
  render: () => (
    <Section>
      <RiverAccordion variant="gridline">
        <RiverAccordion.Item>
          <RiverAccordion.Heading leadingVisual={<Icon icon={CopilotIcon} />}>Heading 1</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual hasBackground={false}>
            <Image src={renderUI1} alt="Visual Studio Code showing GitHub Copilot agent mode" />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading leadingVisual={<Icon icon={CopilotIcon} />}>Heading 2</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual hasBackground={false}>
            <Image src={renderUI2} alt="Visual Studio Code showing GitHub Copilot agent mode" />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading leadingVisual={<Icon icon={CopilotIcon} />}>Heading 3</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual hasBackground={false}>
            <Image src={renderUI3} alt="Visual Studio Code showing GitHub Copilot agent mode" />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>
    </Section>
  ),
}

export const GridlineTablet: Story = {
  name: 'Gridline (tablet)',
  globals: {
    viewport: {value: 'ipad10p'},
  },
  render: GridLine.render,
}

export const GridlineWithoutVisualBackgroundNarrow: Story = {
  name: 'Gridline without visual background (narrow)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: GridLineWithoutVisualBackground.render,
}
