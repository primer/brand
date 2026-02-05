import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {FlexTemplate, type FlexTemplateProps} from './FlexTemplate'
import type {FlexTemplateSection, FlexTemplateFootnote} from './FlexTemplate.types'
import {exampleProseHTML} from './fixtures/content'

import placeholderImage from '../../fixtures/images/placeholder.png'

const meta = {
  title: 'Recipes/FlexTemplate/FlexTemplate',
  component: FlexTemplate,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  args: {
    page: {
      title: 'Flex template base',
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
          label: {text: 'My label'},
          heading: 'My super sweet hero',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.',
          imageSrc: placeholderImage,
          imagePosition: 'block-end',
          callToActionPrimary: {
            href: '#',
            text: 'Learn more',
          },
          callToActionSecondary: {
            href: '#',
            text: 'Contact us',
          },
        } satisfies FlexTemplateProps['page']['template']['hero'],
        sections: [
          {
            id: 'flex-section',
            anchorNav: false,
            sectionIntro: {
              align: 'center',
              heading: 'Section Introduction',
              headingSize: '3',
              description: 'This section showcases all available FlexSection components',
              label: {text: 'Demo'},
              linkText: 'Learn more',
              linkHref: '#',
              linkVariant: 'accent',
            },
            logoSuite: {},
            cards: {},
            pillars: {
              heading: 'Key Features',
              items: [
                {
                  heading: 'Powerful Performance',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  heading: 'Easy Integration',
                  description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
                {
                  heading: 'Secure & Reliable',
                  description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
                },
              ],
            },
            featuredBento: {
              showIcon: true,
              showFootnotes: true,
              headingLevel: 'h3',
            },
            breakoutBanner: {
              align: 'start',
              showLogo: true,
              showFootnotes: true,
              headingLevel: 'h3',
            },
            prose: {
              content: exampleProseHTML,
            },
            rivers: [
              {
                heading: 'River Heading 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                ctaText: 'Learn more',
                ctaHref: '#',
                visualType: 'image',
                imageSrc: placeholderImage,
                imageAlt: 'Placeholder image',
              },
              {
                heading: 'River Heading 2',
                description: 'In sapien sit ullamcorper id. Aliquam luctus sed turpis felis.',
                ctaText: 'Explore',
                ctaHref: '#',
                visualType: 'image',
                imageSrc: placeholderImage,
                imageAlt: 'Placeholder image',
              },
            ],
            statistics: {
              count: 3,
              variant: 'boxed',
              size: 'medium',
              showDescription: true,
              descriptionVariant: 'muted',
              showDescriptionFootnotes: true,
            },
            pricingOptions: {
              variant: 'default',
              align: 'start',
              showFootnotes: true,
              showFeatureList: true,
              headingLevel: 'h3',
            },
            segmentedControlPanel: {},
            testimonials: {
              testimonialCount: 2,
              backgroundImageVariant: 'Collaboration',
              variant: 'frosted-glass',
              displayedAuthorImage: 'logo',
              quoteMarkColor: 'purple',
            },
            visualSettings: {
              backgroundColor: 'default',
              paddingBlockStart: 'spacious',
              paddingBlockEnd: 'spacious',
              roundedCorners: false,
              verticalGap: 'normal',
              testimonialBackgroundImageVariant: 'Collaboration',
              hasBorderBottom: true,
            },
          },
        ] satisfies FlexTemplateSection[],
        footnotes: [
          {
            id: 'footnote-1',
            href: '#inline-link-1',
            copy: 'Feature usage metrics sourced from the most recent developer survey.',
          },
          {
            id: 'footnote-2',
            href: '#inline-link-2',
            copy: 'Partner logos displayed for demonstration purposes only.',
          },
          {
            id: 'footnote-4',
            href: '#inline-link-4',
            copy: 'Year-over-year growth is calculated across all active enterprise accounts.',
          },
          {
            id: 'footnote-5',
            copy: 'Timeline highlights combine roadmap milestones with customer-reported outcomes.',
          },
        ] satisfies FlexTemplateFootnote[],
      },
    } satisfies FlexTemplateProps['page'],
  },
} satisfies Meta<typeof FlexTemplate>

export default meta
type Story = StoryObj<typeof FlexTemplate>

export const Default: Story = {}
