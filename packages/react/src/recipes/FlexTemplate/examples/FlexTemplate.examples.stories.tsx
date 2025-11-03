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
} satisfies Meta<typeof FlexTemplate>

export default meta
type Story = StoryObj<typeof FlexTemplate>

export const Agents: Story = {}
Agents.args = {
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
            itemBackgroundColor: 'subtle',
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
}

export const CopilotBusiness: Story = {}
CopilotBusiness.args = {
  page: {
    title: 'Copilot Business',
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
        label: 'Copilot for Business',
        heading: "Build what's next with GitHub Copilot",
        imagePosition: 'block-end',
        imageSrc: placeholderImage,
        callToActionPrimary: {
          href: '#view-plans',
          text: 'View plans & pricing',
        },
        callToActionSecondary: {
          href: '#contact-sales',
          text: 'Contact sales',
        },
      } satisfies FlexTemplateProps['page']['template']['hero'],
      heroBackgroundImage: {
        image: {
          description: 'Background gradient',
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
          sectionIntroStacked: {
            heading:
              "GitHub Copilot equips you to build the future, whether you're charged with scaling operations or boosting developer productivity.",
            items: [
              {
                text: 'AI that grows with you. Use your code as context while setting boundaries for what to exclude and governance on use.',
              },
              {
                text: 'Velocity with quality. Developers want tools without toil, and GitHub Copilot provides AI assistance from the IDE to GitHub to the CLI and more, with agents to review and suggest.',
              },
              {
                text: 'Choose your AI adventure. From choice of model to third-party integrations, GitHub Copilot meets your challenges your way.',
              },
            ],
          },
          visualSettings: {
            paddingBlockStart: 'normal',
            paddingBlockEnd: 'normal',
          },
        },
        {
          id: 'logo-suite',
          anchorNav: false,
          logoSuite: {},
          visualSettings: {
            paddingBlockStart: 'normal',
            paddingBlockEnd: 'normal',
            hasBorderBottom: true,
          },
        },
        {
          id: 'competitive-advantage',
          sectionIntro: {
            align: 'center',
            heading: 'The competitive advantage developers ask for by name',
            fullWidth: false,
          },
          cards: {
            items: [
              {
                heading: "Quantifying GitHub Copilot's impact",
                description:
                  "Since bringing GitHub Copilot to market, we've conducted several lab studies to discover its impact on developer efficiency, developer satisfaction, and overall code quality.",
                href: 'https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/',
                imageSrc: placeholderImage,
                imageAlt: 'Quantifying GitHub Copilot impact',
              },
              {
                heading: 'A Leader in the Gartner® Magic Quadrant for AI Code Assistants',
                description:
                  'For the second year in a row Gartner has recognized GitHub as highest and furthest on both Ability to Execute and Completeness of Vision for AI Code Assistant.',
                href: 'https://www.gartner.com/reprints/?id=1-2LVTG7RP&ct=250915&st=sb',
                imageSrc: placeholderImage,
                imageAlt: 'Gartner Magic Quadrant report',
              },
              {
                heading: 'Committed to your privacy, security, and trust',
                description: 'GitHub is committed to building secure defaults for developers and organizations.',
                href: 'https://github.com/trust-center?locale=en-US',
                imageSrc: placeholderImage,
                imageAlt: 'GitHub Trust Center',
              },
            ],
          },
          visualSettings: {
            paddingBlockStart: 'normal',
            paddingBlockEnd: 'normal',
          },
        },
        {
          id: 'thomson-reuters',
          anchorNav: false,
          featuredBento: {
            showIcon: false,
            showFootnotes: false,
            headingLevel: 'h3',
            heading: 'How Thomson Reuters successfully adopted AI —and how your organization can, too',
            linkText: 'Read more',
            linkHref:
              'https://www.linkedin.com/pulse/how-thomson-reuters-successfully-adopted-ai-your-organization-can-3krpf/',
            imageSrc: placeholderImage,
            imageAlt: 'Thomson Reuters case study',
          },
          statistics: {
            count: 3,
            variant: 'boxed',
            size: 'medium',
            showDescription: true,
            items: [
              {
                value: '55%',
                description: 'faster coding',
              },
              {
                value: '39%',
                description: 'improvement in code quality',
              },
              {
                value: '68%',
                description: 'had a positive experience',
              },
            ],
          },
          visualSettings: {
            backgroundColor: 'default',
            paddingBlockStart: 'normal',
            paddingBlockEnd: 'normal',
          },
        },

        {
          id: 'resources',
          sectionIntro: {
            align: 'center',
            heading: 'Resources and insights',
            fullWidth: true,
          },
          cards: {
            items: [
              {
                heading: "Stay ahead with GitHub's latest innovations",
                description:
                  'See how our recent and upcoming releases can help your organization drive efficiency, security, and innovation.',
                href: 'https://github.com/roadmap-webinar-series?locale=en-US',
                imageSrc: placeholderImage,
                imageAlt: 'GitHub roadmap webinar series',
              },
              {
                heading: 'Measuring the impact of GitHub Copilot',
                description:
                  'Many enterprises quite reasonably ask, "How do I know Copilot is conferring these benefits for my team?" To answer that question, this guide will walk you through a framework for evaluating impact across four stages.',
                href: 'https://resources.github.com/learn/pathways/copilot/essentials/measuring-the-impact-of-github-copilot/',
                imageSrc: placeholderImage,
                imageAlt: 'Measuring Copilot impact guide',
              },
              {
                heading: 'How developers spend the time they save thanks to AI coding tools',
                description:
                  'Developers tell us how GitHub Copilot and other AI coding tools are transforming their work and changing how they spend their days.',
                href: 'https://github.blog/ai-and-ml/generative-ai/how-developers-spend-the-time-they-save-thanks-to-ai-coding-tools/',
                imageSrc: placeholderImage,
                imageAlt: 'Developer productivity with AI coding tools',
              },
            ],
          },
          visualSettings: {
            paddingBlockStart: 'normal',
            paddingBlockEnd: 'normal',
          },
        },
        {
          id: 'get-approved',
          sectionIntro: {
            align: 'center',
            heading: 'Get approved once',
            fullWidth: true,
          },
          cards: {
            items: [
              {
                heading: 'Hands-on consulting, guided workshops, and training',
                description:
                  'Insights, best practices, and knowledge to help you adopt GitHub quickly and efficiently.',
                href: 'https://github.com/services?locale=en-US',
                imageSrc: placeholderImage,
                imageAlt: 'GitHub Expert Services',
              },
              {
                heading: 'Meet the companies who build with GitHub',
                description: 'Leading organizations choose GitHub to plan, build, secure and ship software.',
                href: 'https://github.com/customer-stories?locale=en-US',
                imageSrc: placeholderImage,
                imageAlt: 'GitHub customer stories',
              },
              {
                heading: 'Executive insights, curated just for you',
                description:
                  'Thought leadership from subject matter experts that extends beyond tooling into business impact.',
                href: 'https://github.com/solutions/executive-insights?locale=en-US',
                imageSrc: placeholderImage,
                imageAlt: 'GitHub Executive Insights',
              },
            ],
          },
          visualSettings: {
            paddingBlockStart: 'normal',
            paddingBlockEnd: 'normal',
          },
        },
        {
          id: 'testimonial-quote',
          anchorNav: false,
          testimonials: {
            testimonialCount: 1,
            backgroundImageVariant: 'Collaboration',
            variant: 'frosted-glass',
            displayedAuthorImage: 'logo',
            quoteMarkColor: 'purple',
          },
          visualSettings: {
            backgroundColor: 'default',
            paddingBlockStart: 'spacious',
            paddingBlockEnd: 'spacious',
          },
        },
      ] satisfies FlexTemplateSection[],
      ctaBanner: {
        align: 'center',
        heading: "Build what's next",
        description:
          "Whether you're charged with scaling enterprise operations or boosting developer productivity, GitHub Copilot equips you to build what's next.",
        backgroundColor: 'subtle',
        callToActionPrimary: {
          text: 'View plans & pricing',
          variant: 'accent',
        },
        callToActionSecondary: {
          text: 'Contact sales',
        },
      },
      faq: {
        heading: 'Frequently asked questions',
        faqs: [
          {
            blocks: [
              {
                questions: [
                  {
                    question:
                      'Can I use code hosting platforms other than GitHub for my repositories and still use GitHub Copilot?',
                    answer:
                      'Yes, GitHub Copilot works with various code hosting platforms and IDEs, allowing you to use it regardless of where your code is hosted.',
                  },
                  {
                    question: "Does GitHub use Copilot Business or Enterprise data to train GitHub's model?",
                    answer:
                      'No, GitHub does not use Copilot Business or Enterprise customer data to train its models. Your code and data remain private and secure.',
                  },
                  {
                    question: 'Does GitHub Copilot include a filtering mechanism to mitigate risk?',
                    answer:
                      'Yes, GitHub Copilot includes content filtering and security features to help mitigate risks and ensure code quality.',
                  },
                  {
                    question: 'Does GitHub Copilot support compliance with the GDPR and other data protection laws?',
                    answer:
                      'Yes, GitHub Copilot is designed to support compliance with GDPR and other major data protection regulations.',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  } satisfies FlexTemplateProps['page'],
}
