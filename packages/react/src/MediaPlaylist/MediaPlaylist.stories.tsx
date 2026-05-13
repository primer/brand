import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Box, Image, Prose} from '..'
import {MediaPlaylist} from './MediaPlaylist'
import styles from './MediaPlaylist.stories.module.css'

type StoryProps = React.ComponentProps<typeof MediaPlaylist>

const meta = {
  title: 'Components/MediaPlaylist',
  component: MediaPlaylist as Meta<StoryProps>['component'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    defaultSelectedIndex: 0,
  },
  decorators: [
    Story => (
      <Box marginBlockStart={48}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    defaultSelectedIndex: {
      control: {
        type: 'number',
        min: 0,
        max: 2,
        step: 1,
      },
      table: {
        category: 'MediaPlaylist',
      },
    },
    selectedIndex: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<StoryProps>

export default meta

type Story = StoryObj<StoryProps>

const videos = [
  {
    id: 'ITxzBiTBZW0',
    duration: '10:57',
    title: 'Getting More from Every Copilot Interaction',
    summary: 'See workflows for scoping context, choosing the right mode, and getting more focused Copilot answers.',
  },
  {
    id: 'CIgdAO8mbw0',
    duration: '08:35',
    title: 'How to plan projects with GitHub Copilot CLI',
    summary: 'Use GitHub Copilot CLI planning to clarify goals, map an approach, and prepare implementation work.',
  },
  {
    id: 'wS8CV85RTO8',
    duration: '12:04',
    title: 'What is TanStack AI? The new open source toolkit',
    summary: 'Get a quick look at TanStack AI and its open source approach to framework-agnostic AI tooling.',
  },
]

export const Default: Story = {
  render: function DefaultStory(args) {
    const storyKey = String(args.defaultSelectedIndex ?? 0)

    return (
      <MediaPlaylist key={storyKey} {...args}>
        <MediaPlaylist.Heading>Latest videos</MediaPlaylist.Heading>

        {videos.map(video => (
          <MediaPlaylist.Item
            key={video.id}
            thumbnail={
              <Image
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt=""
                aspectRatio="16:9"
                loading="lazy"
              />
            }
          >
            <MediaPlaylist.ItemHeading title={video.title} description={video.duration} />
            <MediaPlaylist.ItemContent>
              <Prose
                enableFullWidth
                html={`
                  <h3>${video.title}</h3>
                  <p>${video.summary}</p>
                `}
              />
            </MediaPlaylist.ItemContent>
            <MediaPlaylist.ItemMedia>
              <iframe
                className={styles.youtubeEmbed}
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </MediaPlaylist.ItemMedia>
          </MediaPlaylist.Item>
        ))}
      </MediaPlaylist>
    )
  },
}
