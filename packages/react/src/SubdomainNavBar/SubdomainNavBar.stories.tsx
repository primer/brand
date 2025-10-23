import type {Meta, StoryObj} from '@storybook/react'
import {expect, userEvent, within} from 'storybook/test'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'

import React, {useEffect, useState} from 'react'
import {Hero, River, Heading, Text, Link} from '../'
import placeholderImage from '../fixtures/images/placeholder.png'

import {SubdomainNavBar, SubdomainNavBarProps} from '.'
import {waitFor} from '@testing-library/dom'

type StoryArgs = {
  showSearch: boolean
  numLinks: number
  title: string
  fullWidth: boolean
} & SubdomainNavBarProps

const meta = {
  title: 'Components/SubdomainNavBar',
  component: SubdomainNavBar as Meta<StoryArgs>['component'],
  args: {
    showSearch: true,
    numLinks: 6,
    title: 'Site title',
    titleHref: '/',
  },
  argTypes: {
    showSearch: {
      control: 'boolean',
    },
    numLinks: {
      control: 'number',
    },
    title: {
      control: 'text',
    },
    titleHref: {
      control: 'text',
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

const mockSearchData = [
  {
    title: 'How to transform your business in a digital world',
    description:
      'GitHub Enterprise empowers developers with tools they already know and love, accelerates high-quality software development and secure delivery, and enhances the speed and power of innovation.\n',
    url: 'https://resources.github.com/devops/github-enterprise-ebook',
    type: 'article',
    tags: [
      {
        slug: 'devops',
        label: 'DevOps',
        type: 'Topic',
      },
    ],
    date: '2022-08-29T00:00+02:00',
    cover: {
      url: '//images.ctfassets.net/wfutmusr1t3h/6z2nwPNKt4d23LDLfBNWES/abf9edff7d522a9143073bba12bc42f7/DevOps_Social_Main_Component__3_.png',
      description: 'DevOps Social Main Component (3)',
    },
  },
  {
    title: '6 DevOps tips to help engineering leaders deliver software at scale',
    description:
      'Learn how to deliver high-quality, secure software faster with six actionable DevOps tips drawn from high-performing enterprise companies. ',
    url: 'https://resources.github.com/devops/six-tips-faster-software-delivery',
    type: 'article',
    tags: [
      {
        slug: 'devops',
        label: 'DevOps',
        type: 'Topic',
      },
      {
        slug: 'tools',
        label: 'Tools',
        type: 'Topic',
      },
      {
        slug: 'methodology',
        label: 'Methodology',
        type: 'Topic',
      },
      {
        slug: 'innersource',
        label: 'Innersource',
        type: 'Topic',
      },
      {
        slug: 'continuous-integration-and-deployment',
        label: 'CI/CD',
        type: 'Topic',
      },
      {
        slug: 'devsecops',
        label: 'DevSecOps',
        type: 'Topic',
      },
      {
        slug: 'automation',
        label: 'Automation',
        type: 'Topic',
      },
    ],
    date: '2022-08-11T00:00-05:00',
    cover: {
      url: '//images.ctfassets.net/wfutmusr1t3h/7lchG7UlwHIvfLWnOTRpqB/d17666a630cd17c88964f4c37e398cee/Devops_image_blue.png',
    },
  },
  {
    title: 'Integrating GitHub with Sentry to Increase Speed to Resolution ',
    description:
      'Whether you’re already using Sentry and GitHub separately, or building a deployment workflow for the first time, you can follow these steps to create an automated workflow for your team',
    url: 'https://resources.github.com/actions/integrating-with-sentry',
    type: 'article',
    tags: [
      {
        slug: 'tools',
        label: 'Tools',
        type: 'Topic',
      },
      {
        slug: 'devops',
        label: 'DevOps',
        type: 'Topic',
      },
      {
        slug: 'methodology',
        label: 'Methodology',
        type: 'Topic',
      },
      {
        slug: 'pipeline',
        label: 'Pipeline',
        type: 'Topic',
      },
      {
        slug: 'automation',
        label: 'Automation',
        type: 'Topic',
      },
      {
        slug: 'integrations',
        label: 'Integrations',
        type: 'Topic',
      },
      {
        slug: 'GitHub Actions',
        label: 'GitHub Actions',
        type: 'Topic',
      },
    ],
    date: '2022-08-08T16:40-06:00',
    cover: {
      url: '//images.ctfassets.net/wfutmusr1t3h/36WISXvz6eIcz9Q7UHpDwA/f16cb7e06d459bc2c7e007de62b1b044/1200x630-GitHub-Header.png',
    },
  },
  {
    title: 'DevOps fundamentals: Defining DevOps principles',
    description:
      'From headlines to job descriptions, DevOps has emerged as an outsized buzzword over the past decade—and for good reason. Organizations that successfully adopt DevOps often see big gains in software development speeds, improved reliability, faster product iterations, and have an easier time scaling their services. ',
    url: 'https://resources.github.com/devops/fundamentals',
    type: 'article',
    tags: [
      {
        slug: 'devops',
        label: 'DevOps',
        type: 'Topic',
      },
      {
        slug: 'fundamentals',
        label: 'Fundamentals',
        type: 'Topic',
      },
      {
        slug: 'methodology',
        label: 'Methodology',
        type: 'Topic',
      },
      {
        slug: 'pipeline',
        label: 'Pipeline',
        type: 'Topic',
      },
      {
        slug: 'collaboration',
        label: 'Collaboration',
        type: 'Topic',
      },
      {
        slug: 'continuous-integration-and-deployment',
        label: 'CI/CD',
        type: 'Topic',
      },
      {
        slug: 'automation',
        label: 'Automation',
        type: 'Topic',
      },
    ],
    date: '2022-05-23T12:00+00:00',
  },
  {
    title: 'The fundamentals of continuous integration in DevOps',
    description:
      'What is continuous integration in DevOps?\n\nContinuous integration (CI) is a foundational DevOps practice where development teams integrate code changes from multiple contributors into a shared repository. Automation is used throughout this process to merge, build, and test code to facilitate a higher speed of software development. This process is often called a CI pipeline. When implemented properly, CI enables organizations to quickly identify defects and ship higher-quality software faster.',
    url: 'https://resources.github.com/devops/fundamentals/ci-cd/integration',
    type: 'article',
    tags: [
      {
        slug: 'devops',
        label: 'DevOps',
        type: 'Topic',
      },
      {
        slug: 'fundamentals',
        label: 'Fundamentals',
        type: 'Topic',
      },
      {
        slug: 'pipeline',
        label: 'Pipeline',
        type: 'Topic',
      },
      {
        slug: 'continuous-integration-and-deployment',
        label: 'CI/CD',
        type: 'Topic',
      },
      {
        slug: 'automation',
        label: 'Automation',
        type: 'Topic',
      },
    ],
    date: '2022-05-23T12:00+00:00',
    cover: {
      url: '//images.ctfassets.net/wfutmusr1t3h/p1TQNxMhE6I8lQLDho84N/860a6e761a4621c62b16019fb53fbe67/DevOps_Social_Main_Component__8_.png',
    },
  },
  {
    title: 'A guide to DevOps tools and DevOps automation toolchains',
    description:
      'What are DevOps tools? \nAs an umbrella term, DevOps tools include any number of applications that automate processes within the software development lifecycle (SDLC), improve organizational collaboration, and implement monitoring and alerts. Organizations will often invest in building out a "DevOps toolchain," or collection of tools to use in its DevOps practice, to address each stage of the SDLC.',
    url: 'https://resources.github.com/devops/tools',
    type: 'article',
    tags: [
      {
        slug: 'devops',
        label: 'DevOps',
        type: 'Topic',
      },
      {
        slug: 'tools',
        label: 'Tools',
        type: 'Topic',
      },
      {
        slug: 'fundamentals',
        label: 'Fundamentals',
        type: 'Topic',
      },
      {
        slug: 'continuous-integration-and-deployment',
        label: 'CI/CD',
        type: 'Topic',
      },
      {
        slug: 'devsecops',
        label: 'DevSecOps',
        type: 'Topic',
      },
      {
        slug: 'automation',
        label: 'Automation',
        type: 'Topic',
      },
      {
        slug: 'integrations',
        label: 'Integrations',
        type: 'Topic',
      },
    ],
    date: '2022-05-23T12:00+00:00',
    cover: {
      url: '//images.ctfassets.net/wfutmusr1t3h/3AaSVeBMSzs0D5m1ITPo5L/15ca4ee5fd0c307e6864ae5676ad7d4b/This_Grid_1200x640__5_.png',
    },
  },
  {
    title: 'What is containerization?',
    description:
      'When it’s successfully implemented, DevOps can transform software reliability by making the software development lifecycle (SDLC) more predictable through a combination of automation and cultural practices that favor deep collaboration and incremental releases. With less chance for variation, fewer code-related issues make it to production.',
    url: 'https://resources.github.com/devops/containerization',
    type: 'article',
    tags: [
      {
        slug: 'devops',
        label: 'DevOps',
        type: 'Topic',
      },
      {
        slug: 'tools',
        label: 'Tools',
        type: 'Topic',
      },
      {
        slug: 'fundamentals',
        label: 'Fundamentals',
        type: 'Topic',
      },
      {
        slug: 'continuous-integration-and-deployment',
        label: 'CI/CD',
        type: 'Topic',
      },
      {
        slug: 'automation',
        label: 'Automation',
        type: 'Topic',
      },
    ],
    date: '2022-05-23T12:00+00:00',
    cover: {
      url: '//images.ctfassets.net/wfutmusr1t3h/4IHNgqQDlRoo1l5Hn01Gkv/0044a17d743f34a337c83d676943fdf9/This_Grid_1200x640__2_.png',
    },
  },
  {
    title: 'The fundamentals of continuous deployment in DevOps',
    description:
      'What is continuous deployment?\nContinuous deployment (CD) is an automated software release practice where code changes are deployed to different stages as they pass predefined tests. The goal of CD is to facilitate faster releases by using automation to help remove the need for human intervention as much as possible during the deployment process.',
    url: 'https://resources.github.com/devops/fundamentals/ci-cd/deployment',
    type: 'article',
    tags: [
      {
        slug: 'devops',
        label: 'DevOps',
        type: 'Topic',
      },
      {
        slug: 'fundamentals',
        label: 'Fundamentals',
        type: 'Topic',
      },
      {
        slug: 'pipeline',
        label: 'Pipeline',
        type: 'Topic',
      },
      {
        slug: 'continuous-integration-and-deployment',
        label: 'CI/CD',
        type: 'Topic',
      },
      {
        slug: 'automation',
        label: 'Automation',
        type: 'Topic',
      },
    ],
    date: '2022-05-23T12:00+00:00',
    cover: {
      url: '//images.ctfassets.net/wfutmusr1t3h/5RUidzCZnzTPEao5NylGQg/572fa13977f11d9986a570ba8567614c/DevOps_Social_Main_Component__21_.png',
    },
  },
]

const SubdomainNavBarTemplate = ({showSearch, numLinks, ...args}: StoryArgs) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [searchResults, setSearchResults] = React.useState<
    {title: string; description: string; date: string; url: string}[] | undefined
  >([])

  const [searchTerm, setSearchTerm] = React.useState('')

  const handleChange = () => {
    if (!inputRef.current) return
    if (inputRef.current.value.length === 0) {
      setSearchResults(undefined)
      return
    }
    if (inputRef.current.value.length > 2) {
      setTimeout(() => setSearchResults(mockSearchData), 1000)
      setSearchTerm(inputRef.current.value)
      return
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!inputRef.current) return
    if (!inputRef.current.value) {
      alert(`Enter a value and try again.`)
      return
    }

    alert(`Name: ${inputRef.current.value}`)
  }

  return (
    <>
      <div>
        <SubdomainNavBar {...args} title={args.title}>
          {['collections', 'topics', 'articles', 'events', 'video', 'social', 'podcasts', 'books', 'guides', 'webcasts']
            .slice(0, numLinks)
            .map(link => {
              return (
                <SubdomainNavBar.Link key={link} href={`#${link}`}>
                  {link
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </SubdomainNavBar.Link>
              )
            })}
          {showSearch && (
            <SubdomainNavBar.Search
              ref={inputRef}
              searchTerm={searchTerm}
              onSubmit={handleSubmit}
              onChange={handleChange}
              searchResults={searchResults}
            />
          )}
          <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
          <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
        </SubdomainNavBar>
        <div
          style={{
            maxWidth: 1280,
            margin: '100px auto',
          }}
        >
          <Hero align="center">
            <Hero.Heading>This is my super sweet Nav Bar</Hero.Heading>
            <Hero.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Hero.Description>
            <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
            <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
          </Hero>

          {/**
           * Hack to make the page longer in the example
           */}
          <Heading as="h2" style={{textAlign: 'center'}}>
            ...
          </Heading>
          <River>
            <River.Visual>
              <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
            </River.Visual>
            <River.Content>
              <Heading>Heading</Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                sed turpis felis nam pulvinar risus elementum.
              </Text>
              <Link href="#">Call to action</Link>
            </River.Content>
          </River>
          <River align="end">
            <River.Visual>
              <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
            </River.Visual>
            <River.Content>
              <Heading>Heading</Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                sed turpis felis nam pulvinar risus elementum.
              </Text>
              <Link href="#">Call to action</Link>
            </River.Content>
          </River>
        </div>
      </div>
    </>
  )
}

const MobileNoLinksExample = () => <SubdomainNavBar title="Subdomain" />

const ReversedButtonOrderExample = () => (
  <SubdomainNavBar title="Subdomain">
    <SubdomainNavBar.Link href="#Collections">Collections</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#Topics" isExternal>
      Topics
    </SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#Articles">Articles</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#Events">Events</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#Video">Video</SubdomainNavBar.Link>

    <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
  </SubdomainNavBar>
)

const ConditionalRenderingExample = () => {
  const [links, setLinks] = useState(['collections', 'topics', 'articles', 'events', 'video'])
  const [showLinks, setShowLinks] = useState(false)

  useEffect(() => {
    setLinks([...links, 'social'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setShowLinks(true)
  }, [])

  return (
    <SubdomainNavBar title="Subdomain">
      {showLinks &&
        links.map(link => {
          const linkText = link
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          return (
            <SubdomainNavBar.Link key={linkText} href={`#${link}`}>
              {linkText}
            </SubdomainNavBar.Link>
          )
        })}

      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  )
}

const SkipToMainTagExample = () => (
  <>
    <SubdomainNavBar title="Skip to Main Tag" />
    <main
      style={{
        maxWidth: 1280,
        margin: '100px auto',
      }}
    >
      <Hero align="center">
        <Hero.Heading>This is the main content</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
      </Hero>
    </main>
  </>
)

const SkipToMainTagWithIdExample = () => (
  <>
    <SubdomainNavBar title="Skip to Main Tag with ID" />
    <main
      id="the-main-tag"
      style={{
        maxWidth: 1280,
        margin: '100px auto',
      }}
    >
      <Hero align="center">
        <Hero.Heading>This is the main content</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
      </Hero>
    </main>
  </>
)

const ExternalLinkExample = () => (
  <SubdomainNavBar title="Subdomain">
    <SubdomainNavBar.Link href="#Collections">Collections</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#Topics" isExternal>
      Topics
    </SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#Articles">Articles</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#Events">Events</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#Video">Video</SubdomainNavBar.Link>

    <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
    <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
  </SubdomainNavBar>
)

export const Playground: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  parameters: {
    a11y: {
      config: {
        rules: [{id: 'heading-order', enabled: false}],
      },
    },
  },
}

export const NoSearch: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  args: {
    showSearch: false,
  },
}

export const SearchOpen: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  parameters: {
    axe: {
      timeout: 5000,
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByLabelText('Toggle search bar'))

    await expect(canvas.getByRole('combobox')).toHaveFocus()
  },
}

export const SearchResultsVisible: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByLabelText('Toggle search bar'))
    await userEvent.type(canvas.getByRole('combobox'), 'devops')
    await expect(canvas.getByRole('combobox')).toHaveFocus()
  },
}

export const OverflowMenuOpen: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await waitFor(async () => {
      const overflowMenu = await canvas.getByText('More')
      await userEvent.click(overflowMenu)
    })
  },
}

export const MobileView: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  globals: {
    viewport: {value: 'iphonex'},
  },
}

export const MobileMenuOpen: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByLabelText('Menu'))
  },
}

export const MobileMenuOpenManyItems: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  args: {numLinks: 10},
  globals: {
    viewport: {value: 'iphone5'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByLabelText('Menu'))
  },
}

export const MobileSearchResultsVisible: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByLabelText('Toggle search bar'))
    await userEvent.type(canvas.getByRole('combobox'), 'devops')
    await expect(canvas.getByRole('combobox')).toHaveFocus()
  },
}

export const MobileNoLinks: Story = {
  render: () => <MobileNoLinksExample />,
  globals: {
    viewport: {value: 'iphonex'},
  },
}

export const NoOverflow: Story = {
  name: 'No overflow menu (1 link)',
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  args: {
    numLinks: 1,
  },
}

export const LongerTitle: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  args: {
    title: 'Brand and Marketing',
  },
}

export const FullWidth: Story = {
  render: (args: StoryArgs) => <SubdomainNavBarTemplate {...args} />,
  args: {
    fullWidth: true,
  },
}

export const NoTitle: Story = {
  render: (args: StoryArgs) => <SubdomainNavBar {...args} />,
  args: {
    title: '',
  },
}

export const ConditionalRendering: Story = {
  render: () => <ConditionalRenderingExample />,
}

export const SkipToMainTag: Story = {
  render: () => <SkipToMainTagExample />,
}

export const skipToMainTagWithId: Story = {
  render: () => <SkipToMainTagWithIdExample />,
}

export const ExternalLink: Story = {
  render: () => <ExternalLinkExample />,
}

export const ReversedButtonOrder: Story = {
  render: () => <ReversedButtonOrderExample />,
}

export const ReversedButtonOrderNarrow: Story = {
  render: () => <ReversedButtonOrderExample />,
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByLabelText('Menu'))
  },
}
