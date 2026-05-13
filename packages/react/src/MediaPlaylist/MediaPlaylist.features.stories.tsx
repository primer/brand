import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Box, Image, Prose} from '..'
import {MediaPlaylist} from './MediaPlaylist'
import styles from './MediaPlaylist.stories.module.css'

const meta = {
  title: 'Components/MediaPlaylist/Features',
  component: MediaPlaylist,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <Box marginBlockStart={48}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof MediaPlaylist>

export default meta

type Story = StoryObj<typeof MediaPlaylist>

type GitHubVideo = {
  id: string
  duration: string
  title: string
  summary: string
}

const youtubeVideos: GitHubVideo[] = [
  {
    id: 'WldXhauP024',
    duration: '10:57',
    title: 'Getting started with open source contributions for beginners',
    summary: 'Learn how to find approachable open source projects, read a repository, and make a first contribution.',
  },
  {
    id: '2IArMAhkJcE',
    duration: '46:28',
    title: 'Open Source Friday with Spec-Kit',
    summary: 'Explore Spec Kit and how clear specs help contributors build better tools together in the open.',
  },
  {
    id: 'ITxzBiTBZW0',
    duration: '08:35',
    title: 'Getting More from Every Copilot Interaction',
    summary: 'See workflows for scoping context, choosing the right mode, and getting more focused Copilot answers.',
  },
  {
    id: 'ZlOwMiNWatQ',
    duration: '04:12',
    title: 'How the American Council of the Blind uses GitHub Copilot',
    summary: 'Watch how GitHub Copilot helped automate community operations with an accessible custom desktop app.',
  },
  {
    id: 'M7XrPNtxbvw',
    duration: '51:19',
    title: 'Rubber Duck Thursdays!',
    summary: 'Join a live developer conversation about practical project work, tooling, and building with AI.',
  },
  {
    id: 'FXu1WpzSsIU',
    duration: '42:06',
    title: 'Jueves de Quack con Lesly Zerna, desarrolladora de currículo en DeepLearning.AI',
    summary: 'A Spanish-language stream about using specs to keep coding agents aligned with a project plan.',
  },
  {
    id: 'zG6PJHVaUxs',
    duration: '38:44',
    title: 'Rubber Duck Thursdays: Building an AI agent app',
    summary: 'Follow a live build of an AI agent application from project shape toward a production-ready workflow.',
  },
  {
    id: 'BphnIxeWaJ4',
    duration: '44:31',
    title: 'Jueves de Quack con Cristian Córdova',
    summary:
      'A Spanish-language session on open source infrastructure, community, and accessible compute for developers.',
  },
  {
    id: 'CIgdAO8mbw0',
    duration: '07:16',
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

export const OneItemPlaylist: Story = {
  name: 'One item',
  render: function OneItemPlaylistStory() {
    return (
      <MediaPlaylist>
        <MediaPlaylist.Heading>Latest videos</MediaPlaylist.Heading>

        {youtubeVideos.slice(0, 1).map(video => (
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

export const OneItemPlaylistNarrow: Story = {
  name: 'One item playlist (narrow)',
  render: function OneItemPlaylistNarrowStory() {
    return (
      <MediaPlaylist>
        <MediaPlaylist.Heading>Latest videos</MediaPlaylist.Heading>

        {youtubeVideos.slice(0, 1).map(video => (
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
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const LargePlaylist: Story = {
  name: 'Large playlist',
  render: function LargePlaylistStory() {
    return (
      <MediaPlaylist>
        <MediaPlaylist.Heading>Latest videos</MediaPlaylist.Heading>

        {youtubeVideos.map(video => (
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

export const LargePlaylistNarrow: Story = {
  name: 'Large playlist (narrow)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: function LargePlaylistNarrowStory() {
    return (
      <MediaPlaylist>
        <MediaPlaylist.Heading>Latest videos</MediaPlaylist.Heading>

        {youtubeVideos.map(video => (
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
