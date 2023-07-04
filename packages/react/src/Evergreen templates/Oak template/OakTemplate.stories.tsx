import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {OakTemplate, type OakTemplateProps} from './OakTemplate'
// import {Grid, Prose} from '../../'
import {ImageIcon, PeopleIcon, TerminalIcon} from '@primer/octicons-react'

export default {
  title: 'Evergreen templates/Oak',
  component: OakTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof OakTemplate>

const example1 = {
  siteMetadata: {
    title: 'Desktop',
  } as OakTemplateProps['siteMetadata'],
  theme: {
    colorMode: 'dark',
    accentColor: 'blue',
    background: {
      image: {
        src: 'https://github.com/primer/brand/assets/175638/e06188f2-c49d-48fa-a6d9-0c71f6bb711d',
        size: '100%',
      },
    },
  } as OakTemplateProps['theme'],
  navigation: {
    items: [
      {
        title: 'Release notes',
        href: '#',
      },
      {
        title: 'Help',
        href: '#',
      },
    ],
  } as OakTemplateProps['navigation'],
  content: {
    sections: {
      header: {
        isRootSection: true,
        blocks: {
          headerHero: {
            heading: 'GitHub Desktop',
            description:
              "Focus on what matters instead of fighting with Git. Whether you're new to Git or a seasoned user, GitHub Desktop simplifies your development workflow.",
            primaryCTA: {
              title: 'Download for MacOS',
              href: '#',
            },
          },
          featuredMedia: {
            type: 'image',
            src: 'https://github.com/primer/brand/assets/175638/45465a63-2dcc-4f68-aaac-b1214d0ff6cb',
            alt: 'The GitHub desktop user interface',
            dimensions: {
              width: 2748,
              height: 1772,
            },
          },
          headerActions: {
            items: {
              item1: {
                heading: 'Feeling brave?',
                description: "Try new features in the Beta Channel before they're released.",
                cta: {href: '#', label: 'Download the beta'},
              },
              item2: {
                heading: 'Apple silicon?',
                description: 'Download for an Apple silicon Mac. See the Apple docs about Apple vs Intel chips.',
                cta: {href: '#', label: 'Download for Apple Silicon'},
              },
              item3: {
                heading: 'Windows?',
                description: 'Download the Windows version of the GitHub Desktop app.',
                cta: {href: '#', label: 'Download for Windows'},
              },
            },
          },
        },
      },
      showcase: {
        id: 'features',
        title: 'Features',
        description: 'GitHub Desktop is open source now!',
        isRootSection: false,
        blocks: {
          showcase: {
            items: [
              {
                heading: 'Attribute commits with collaborators easily',
                content:
                  'Quickly add co-authors to your commit. Great for pairing and excellent for sending a little love/credit to that special someone who helped fix that gnarly bug of yours. See the attribution on the history page, undo an accidental attribution, and see the co-authors on github.com',
                imageSrc: 'https://desktop.github.com/images/upgrade/co-authoring.png',
                imageAlt: 'Image of Co-Authoring Feature for Desktop',
              },

              {
                heading: 'Checkout branches with pull requests and view CI statuses',
                content:
                  "See all open pull requests for your repositories and check them out as if they were a local branch, even if they're from upstream branches or forks. See which pull requests pass commit status checks, too!",
                imageSrc: 'https://desktop.github.com/images/upgrade/pr-checks.png',
                imageAlt: 'Image of Pull Request List and CI Check Feature',
              },

              {
                heading: 'Syntax highlighted diffs',
                content:
                  'The new GitHub Desktop supports syntax highlighting when viewing diffs for a variety of different languages.',
                imageSrc: 'https://desktop.github.com/images/upgrade/syntax-highlighting.png',
                imageAlt: 'Image of Syntax Highlighted Diff Feature',
              },
            ],
          },
          contentStack: {
            items: [
              {
                heading: 'Expanded image diff support',
                description:
                  'Easily compare changed images. See the before and after, swipe or fade between the two, or look at just the changed parts.',
                icon: ImageIcon,
              },
              {
                heading: 'Extensive editor & shell integrations',
                description:
                  'Open your favorite editor or shell from the app, or jump back to GitHub Desktop from your shell. GitHub Desktop is your springboard for work.',
                icon: TerminalIcon,
              },

              {
                heading: 'Community supported',
                description:
                  'GitHub Desktop is open source now! Check out our roadmap, contribute, and help us make collaboration even easier.',
                icon: PeopleIcon,
              },
            ],
          },
        },
      },
      footer: {
        isRootSection: true,
        blocks: {
          footerBanner: {
            heading: 'Get started now with GitHub Desktop',
            description: 'Try out all the latest features in the app built just for desktop.',
            primaryCTA: {
              href: '#',
              label: 'Download for MacOS',
            },
          },
        },
      },
    },
  } as OakTemplateProps['content'],
}

export const Example1: StoryFn<typeof OakTemplate> = () => <OakTemplate {...example1} />
Example1.storyName = 'Example 1'
