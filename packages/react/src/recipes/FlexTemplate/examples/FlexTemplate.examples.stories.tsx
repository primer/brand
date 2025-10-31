import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {FlexTemplate, type FlexTemplateProps} from '../FlexTemplate'
import type {FlexTemplateSection} from '../FlexTemplate.types'

import agentsHero from '../fixtures/images/agents-hero.png'
import placeholderImage from '../../../fixtures/images/placeholder.png'
import {CopilotIcon, TasklistIcon, WorkflowIcon} from '@primer/octicons-react'

const meta = {
  title: 'Recipes/FlexTemplate/Examples',
  component: FlexTemplate,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  args: {
    page: {
      title: 'Agents',
      template: {
        subnav: {
          hasShadow: false,
          heading: {
            href: '#',
            text: 'AI',
          },
          subheading: {
            href: '#',
            text: 'GitHub Copilot',
          },
          links: [
            {href: '#', text: 'Copilot in VS Code'},
            {href: '#', text: 'Agents on GitHub'},
            {href: '#', text: 'Copilot CLI'},
            {href: '#', text: 'For business'},
            {href: '#', text: 'Tutorials'},
            {href: '#', text: 'Plans & pricing'},
          ],
        },
        hero: {
          align: 'center',
          heading: "Your code's favorite coding agents",
          description:
            "From clearing your backlog to reviewing code, let GitHub Copilot handle the busywork so you can focus on what's next.",
          imageSrc: agentsHero,
          imagePosition: 'block-end',
          callToActionPrimary: {
            href: '#primary-action',
            text: 'Get started for free',
          },
          callToActionSecondary: {
            href: '#secondary-action',
            text: 'See plans & pricing',
          },
        } satisfies FlexTemplateProps['page']['template']['hero'],
        heroBackgroundImage: {
          image: {
            description: 'Placeholder collage representing flexible content blocks',
            file: {
              url: placeholderImage,
            },
          },
          focus: 'center',
        },
        sections: [
          {
            id: 'overview',
            anchorNav: false,
            pillars: {
              itemBackgroundColor: 'inset',
              items: [
                {
                  icon: <CopilotIcon />,
                  iconColor: 'purple',
                  heading: 'Put Copilot to work in the background',
                  description:
                    'As your team codes, Copilot writes pull requests, handles edits, and responds to @mentions in real time.',
                },
                {
                  icon: <WorkflowIcon />,
                  iconColor: 'purple',
                  heading: 'Choose the right agent for the job',
                  description:
                    'Some tasks need a specialist. Choose from Copilot or custom agents to get the work done right.',
                },
                {
                  icon: <TasklistIcon />,
                  iconColor: 'purple',
                  heading: 'Manage agents and tasks together',
                  description:
                    'See and steer tasks from one unified view. It’s like a mission control center for everything your agents touch.',
                },
              ],
            },
            visualSettings: {
              paddingBlockStart: 'none',
              paddingBlockEnd: 80,
              hasBorderBottom: true,
            },
          },
          {
            id: 'features',
            sectionIntro: {
              align: 'center',
              label: 'Features',
              heading: 'Your backlog doesn’t stand a chance',
              description:
                'Assign issues, automate tasks, and watch your backlog disappear as Copilot turns plans into pull requests in the background.',
              fullWidth: true,
            },
            rivers: [
              {
                align: 'start',
                imageTextRatio: '50:50',
                hasShadow: false,
                visualType: 'image',
                imageSrc: placeholderImage,
                imageAlt: 'Azure, GitHub, and integration logos',
                heading: 'Connect Copilot to your workflow',
                description:
                  'From GitHub Issues, Azure Boards, Raycast, or Linear, assign Copilot to an issue and your full planning context travels with it. You can also delegate from your favorite IDE, such as VS Code, or the CLI.',
                ctaText: 'Explore Copilot integrations',
                ctaHref: '#',
              },
              {
                align: 'start',
                imageTextRatio: '50:50',
                hasShadow: false,
                visualType: 'image',
                imageSrc: placeholderImage,
                imageAlt: 'Slack and Microsoft Teams logos',
                heading: 'Copilot has entered the chat',
                description:
                  'Assign tasks to Copilot from Slack or Teams. It pulls context from the conversation, including decisions, links, and code, so you can skip extra tickets and long prompts.',
                ctaText: 'Learn more',
                ctaHref: '#',
              },
              {
                align: 'start',
                imageTextRatio: '50:50',
                hasShadow: false,
                visualType: 'image',
                imageSrc: placeholderImage,
                imageAlt: 'Code review interface showing Copilot suggestions',
                heading: 'Keep your reviews moving with Copilot',
                description:
                  'Get AI-assisted reviews right in your editor or pull requests. @Mention Copilot to suggest edits, fix issues, and keep code moving.',
                ctaText: 'Explore code review',
                ctaHref: '#',
              },
            ],
            visualSettings: {
              backgroundColor: 'default',
              paddingBlockStart: 'normal',
              paddingBlockEnd: 'none',
              roundedCorners: false,
              verticalGap: 'normal',
              enableRiverStoryScroll: false,
            },
          },
        ] satisfies FlexTemplateSection[],
        ctaBanner: {
          align: 'center',
          heading: "Build what's next with Copilot",
          description:
            'From edits to pull requests, the world’s best coding agents work beside you so nothing slows you down.',
          backgroundColor: 'subtle',
          callToActionPrimary: {
            text: 'Get started for free',
            variant: 'accent',
          },
          callToActionSecondary: {
            text: 'Contact sales',
          },
          sectionIntro: {
            align: 'start',
            heading: 'Get the most out of GitHub Copilot',
            fullWidth: true,
            headingSize: '4',
          },
          cards: [
            {
              heading: 'Get started with agentic workflows',
              description: 'Receive an introduction on Copilot coding agent and how to use it to be more efficient.',
              href: '#get-started',
              ctaText: 'Explore the article',
            },
            {
              heading: 'Explore more ways to integrate coding agent into your work',
              description: 'Already familiar with Copilot coding agent? Learn 5 ways to go beyond the basics.',
              href: '#integrations',
              ctaText: 'Explore the article',
            },
            {
              heading: 'Visit our docs to learn more about agents',
              description: 'Explore our docs for the full overview and technical breakdown of Copilot coding agent.',
              href: '#docs',
              ctaText: 'Read the docs',
            },
          ],
        },
        faq: {
          heading: 'Frequently asked questions',
          faqs: [
            {
              blocks: [
                {
                  questions: [
                    {
                      question: 'What are GitHub Copilot Agents?',
                      answer:
                        'GitHub Copilot Agents are AI-powered assistants that can handle various development tasks autonomously, from reviewing code to managing issues across your workflow.',
                    },
                    {
                      question: 'How do I get started with Copilot Agents?',
                      answer:
                        'You can start using Copilot Agents by enabling them in your GitHub settings. They work with GitHub Issues, Azure Boards, and popular IDEs like VS Code.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    } satisfies FlexTemplateProps['page'],
  },
} satisfies Meta<typeof FlexTemplate>

export default meta
type Story = StoryObj<typeof FlexTemplate>

export const Agents: Story = {}
