import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {AiModelIcon, ZapIcon} from '@primer/octicons-react'
import {useTranslation} from 'react-i18next'
import {expect, userEvent, waitFor, within} from 'storybook/test'

import {Image, Link, RiverBreakoutTabs, Section, Text} from '../..'
import placeholderBg from '../../fixtures/images/dither-bg-landscape-green.png'
import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'
import {MinimalVideoPlayerExample} from './RiverBreakoutTabs.examples.stories'

const meta = {
  title: 'Components/RiverBreakoutTabs/Features',
  component: RiverBreakoutTabs,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RiverBreakoutTabs>

export default meta

type Story = StoryObj<typeof RiverBreakoutTabs>

export const TwoItems: Story = {
  render: function TwoItemsRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const FullBleedBackgroundVisual: Story = {
  name: 'Full bleed background visual',
  render: function FullBleedBackgroundVisualRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs
          backgroundVisual={
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${placeholderBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          }
          imagePosition="block-end"
          backgroundVisualFullBleed
        >
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const WithoutActionLinks: Story = {
  render: function WithoutActionLinksRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const UncontrolledMode: Story = {
  render: function UncontrolledModeRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs defaultSelectedIndex={1}>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const ControlledMode: Story = {
  render: function ControlledModeRender() {
    const {t} = useTranslation('RiverBreakoutTabs')
    const [selectedIndex, setSelectedIndex] = useState(1)

    return (
      <Section>
        <RiverBreakoutTabs selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <RiverBreakoutTabs.A11yHeading>{t('controlled_selected_index_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const Narrow: Story = {
  name: 'Narrow viewport',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: function NarrowRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const Tablet: Story = {
  name: 'Tablet viewport',
  globals: {
    viewport: {value: 'ipad'},
  },
  render: function TabletRender() {
    const {t} = useTranslation('RiverBreakoutTabs')

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('two_card_layout_a11y')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} />
            <RiverBreakoutTabs.Heading>{t('code_quickly_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('code_quickly_body')}</Text>
              <Link href="#">{t('start_coding_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder1} alt={t('alt_placeholder_1')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ZapIcon} />
            <RiverBreakoutTabs.Heading>{t('review_with_context_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('review_with_context_body')}</Text>
              <Link href="#">{t('open_review_flow_cta')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual>
              <Image src={placeholder2} alt={t('alt_placeholder_2')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const MinimalVideoPlayerAutoplayOnTabChange: Story = {
  name: 'MinimalVideoPlayer autoplay on tab change',
  render: () => <MinimalVideoPlayerExample />,
  play: handleMinimalVideoPlayerChange,
}

export const MinimalVideoPlayerAutoplayOnAccordionChange: Story = {
  name: 'MinimalVideoPlayer autoplay on accordion change',
  render: () => <MinimalVideoPlayerExample />,
  globals: {
    viewport: {value: 'iphonexr'},
  },
  play: handleMinimalVideoPlayerChange,
}

/**
 * The iframe width determines whether RiverBreakoutTabs renders tabs or an accordion.
 */
async function handleMinimalVideoPlayerChange({canvasElement}: {canvasElement: HTMLElement}) {
  const canvas = within(canvasElement)
  const getVideos = () => Array.from(canvasElement.querySelectorAll('video'))

  if (window.innerWidth >= 1012) {
    // The component renders the accordion first and upgrades to tabs after measuring the viewport.
    await waitFor(() => expect(canvas.getAllByRole('tab')).toHaveLength(3))
    await waitFor(() => expect(getVideos()).toHaveLength(3))

    // Only the video in the visible panel plays; the others sit in `hidden` panels.
    await waitFor(() => {
      const videos = getVideos()
      expect(videos[0].paused).toBe(false)
      expect(videos[1].paused).toBe(true)
    })

    await userEvent.click(canvas.getAllByRole('tab')[1])

    await waitFor(() => {
      const videos = getVideos()
      expect(videos[0].paused).toBe(true)
      expect(videos[1].paused).toBe(false)
    })

    await userEvent.click(canvas.getAllByRole('tab')[0])

    await waitFor(() => {
      const videos = getVideos()
      expect(videos[0].paused).toBe(false)
      expect(videos[1].paused).toBe(true)
    })

    return
  }

  await waitFor(() => expect(canvasElement.querySelectorAll('details').length).toBeGreaterThan(1))
  await waitFor(() => expect(getVideos()).toHaveLength(1))

  const initialVideo = getVideos()[0]
  await waitFor(() => expect(initialVideo.paused).toBe(false))

  const nextTrigger = canvasElement.querySelectorAll('details')[1].querySelector('summary')
  await expect(nextTrigger).not.toBeNull()
  await userEvent.click(nextTrigger as HTMLElement)

  // The narrow layout mounts a single visual, so the previous video is unmounted entirely.
  await waitFor(() => {
    const videos = getVideos()
    expect(videos).toHaveLength(1)
    expect(videos[0]).not.toBe(initialVideo)
    expect(videos[0].paused).toBe(false)
  })
  await expect(initialVideo.isConnected).toBe(false)

  const secondVideo = getVideos()[0]
  const initialTrigger = canvasElement.querySelectorAll('details')[0].querySelector('summary')
  await expect(initialTrigger).not.toBeNull()
  await userEvent.click(initialTrigger as HTMLElement)

  await waitFor(() => {
    const videos = getVideos()
    expect(videos).toHaveLength(1)
    expect(videos[0]).not.toBe(secondVideo)
    expect(videos[0].paused).toBe(false)
  })
  await expect(secondVideo.isConnected).toBe(false)
}
