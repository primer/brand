import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Heading, Hero, Link, River, SubdomainNavBar, Text} from '..'
import placeholderImage from '../fixtures/images/placeholder.png'
import {navigationLinks, searchResults} from './SubdomainNavBar.stories.fixtures'

type StoryArgs = React.ComponentProps<typeof SubdomainNavBar> & {
  showSearch: boolean
  numLinks: number
}

const meta = {
  title: 'Components/SubdomainNavBar',
  component: SubdomainNavBar as Meta<StoryArgs>['component'],
  args: {
    numLinks: 6,
    showSearch: true,
    title: 'Site title',
    titleHref: '/',
  },
  argTypes: {
    numLinks: {
      control: 'number',
    },
    showSearch: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    titleHref: {
      control: 'text',
    },
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<StoryArgs>

export const Default: Story = {
  render: () => <SubdomainNavBar title="Site title" />,
}

export const Playground: Story = {
  render: function Render({showSearch, numLinks, ...args}) {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [visibleSearchResults, setVisibleSearchResults] = React.useState<typeof searchResults | undefined>([])
    const [searchTerm, setSearchTerm] = React.useState('')

    const handleChange = () => {
      if (!inputRef.current) return
      if (inputRef.current.value.length === 0) {
        setVisibleSearchResults(undefined)
        return
      }
      if (inputRef.current.value.length > 2) {
        window.setTimeout(() => setVisibleSearchResults(searchResults), 1000)
        setSearchTerm(inputRef.current.value)
      }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!inputRef.current) return
      if (!inputRef.current.value) {
        window.alert(`Enter a value and try again.`)
        return
      }

      window.alert(`Name: ${inputRef.current.value}`)
    }

    return (
      <div>
        <SubdomainNavBar {...args}>
          {navigationLinks.slice(0, numLinks).map(link => (
            <SubdomainNavBar.Link key={link} href={`#${link}`}>
              {link
                .toLowerCase()
                .split(' ')
                .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                .join(' ')}
            </SubdomainNavBar.Link>
          ))}
          {showSearch && (
            <SubdomainNavBar.Search
              ref={inputRef}
              searchTerm={searchTerm}
              searchResults={visibleSearchResults}
              onSubmit={handleSubmit}
              onChange={handleChange}
            />
          )}
          <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
          <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
        </SubdomainNavBar>
        <div style={{maxWidth: 1280, margin: '100px auto'}}>
          <Hero align="center">
            <Hero.Heading>This is my super sweet Nav Bar</Hero.Heading>
            <Hero.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Hero.Description>
            <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
            <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
          </Hero>
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
    )
  },
  parameters: {
    a11y: {
      config: {
        rules: [{id: 'heading-order', enabled: false}],
      },
    },
  },
}
