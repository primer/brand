import {useEffect} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {AiModelIcon, CopilotIcon, ShieldCheckIcon} from '@primer/octicons-react'
import {useTranslation} from 'react-i18next'

import {Heading, Image, Link, River, RiverBreakoutTabs, Section, Stack, Text} from '../..'
import renderUI1 from '../../fixtures/images/copilot-vscode-agent-mode-1.png'
import renderUI2 from '../../fixtures/images/copilot-vscode-agent-mode-2.png'
import renderUI3 from '../../fixtures/images/copilot-vscode-agent-mode-3.png'
import placeholderBg from '../../fixtures/images/dither-bg-landscape-green.png'
import posterImage from '../../fixtures/images/example-poster.png'
import {useWindowSize} from '../../hooks/useWindowSize'
import {VideoPlayer} from '../../VideoPlayer'

const meta = {
  title: 'Components/RiverBreakoutTabs/Examples',
  component: RiverBreakoutTabs,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RiverBreakoutTabs>

export default meta

type Story = StoryObj<typeof RiverBreakoutTabs>

export const WithImages: Story = {
  name: 'With images',
  render: function WithImagesRender() {
    const {t} = useTranslation('RiverBreakoutTabs')
    const {isLarge} = useWindowSize()

    useEffect(() => {
      const visuals = Array.from(document.querySelectorAll('[data-river-tabs-dither-bg]')).filter(
        (value): value is HTMLDivElement => value instanceof HTMLDivElement,
      )

      const cleanups = visuals.map(visualElement => TempFadeInBackgroundEffect(visualElement, placeholderBg, 500))

      return () => {
        for (const cleanup of cleanups) {
          cleanup()
        }
      }
    }, [isLarge])

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('with_images_a11y_heading')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} color="green" />
            <RiverBreakoutTabs.Heading>{t('with_images_item_plan_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('with_images_item_plan_body')}</Text>
              <Link href="https://github.com/features/copilot">{t('with_images_item_plan_link')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
              <Image src={renderUI1} alt={t('alt_ai_plan_editor')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={CopilotIcon} color="green" />
            <RiverBreakoutTabs.Heading>{t('with_images_item_refine_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('with_images_item_refine_body')}</Text>
              <Link href="https://github.com/features/copilot/chat">{t('with_images_item_refine_link')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
              <Image src={renderUI2} alt={t('alt_chat_guiding_edits')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ShieldCheckIcon} color="green" />
            <RiverBreakoutTabs.Heading>{t('with_images_item_merge_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('with_images_item_merge_body')}</Text>
              <Link href="https://github.com/features/copilot/plans">{t('with_images_item_merge_link')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
              <Image src={renderUI3} alt={t('alt_checks_before_merge')} />
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

export const WithVideos: Story = {
  name: 'With videos',
  render: function WithVideosRender() {
    const {t} = useTranslation('RiverBreakoutTabs')
    const {isLarge} = useWindowSize()

    useEffect(() => {
      const visuals = Array.from(document.querySelectorAll('[data-river-tabs-dither-bg]')).filter(
        (value): value is HTMLDivElement => value instanceof HTMLDivElement,
      )

      const cleanups = visuals.map(visualElement => TempFadeInBackgroundEffect(visualElement, placeholderBg, 500))

      return () => {
        for (const cleanup of cleanups) {
          cleanup()
        }
      }
    }, [isLarge])

    return (
      <Section>
        <RiverBreakoutTabs>
          <RiverBreakoutTabs.A11yHeading>{t('with_videos_a11y_heading')}</RiverBreakoutTabs.A11yHeading>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={AiModelIcon} color="green" />
            <RiverBreakoutTabs.Heading>{t('with_videos_item_backlog_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('with_videos_item_backlog_body')}</Text>
              <Link href="https://github.com/features/copilot">{t('with_videos_item_backlog_link')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
              <VideoPlayer title={t('video_title_planning')} poster={posterImage} style={{height: '100%'}}>
                <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
                <VideoPlayer.Track src="./example.vtt" default />
              </VideoPlayer>
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={CopilotIcon} color="green" />
            <RiverBreakoutTabs.Heading>{t('with_videos_item_workflow_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('with_videos_item_workflow_body')}</Text>
              <Link href="https://github.com/features/copilot/chat">{t('with_videos_item_workflow_link')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
              <VideoPlayer title={t('video_title_coding')} poster={posterImage} style={{height: '100%'}}>
                <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
                <VideoPlayer.Track src="./example.vtt" default />
              </VideoPlayer>
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>

          <RiverBreakoutTabs.Item>
            <RiverBreakoutTabs.Icon icon={ShieldCheckIcon} color="green" />
            <RiverBreakoutTabs.Heading>{t('with_videos_item_confidence_heading')}</RiverBreakoutTabs.Heading>
            <RiverBreakoutTabs.Content>
              <Text>{t('with_videos_item_confidence_body')}</Text>
              <Link href="https://github.com/features/copilot/plans">{t('with_videos_item_confidence_link')}</Link>
            </RiverBreakoutTabs.Content>
            <RiverBreakoutTabs.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
              <VideoPlayer title={t('video_title_merge_confidence')} poster={posterImage} style={{height: '100%'}}>
                <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
                <VideoPlayer.Track src="./example.vtt" default />
              </VideoPlayer>
            </RiverBreakoutTabs.Visual>
          </RiverBreakoutTabs.Item>
        </RiverBreakoutTabs>
      </Section>
    )
  },
}

/**
 * This helper mirrors the temporary fade-in background approach used in Hero and River examples.
 */
function TempFadeInBackgroundEffect(element: HTMLDivElement, backgroundImageUrl: string, delay = 100) {
  element.style.position = 'relative'

  const bgDiv = document.createElement('div')
  bgDiv.style.cssText = `
    position: absolute;
    inset: 0;
    background-image: url(${backgroundImageUrl});
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.5s ease-out;
    z-index: 0;
  `
  element.insertBefore(bgDiv, element.firstChild)

  const children = element.children
  for (let i = 1; i < children.length; i++) {
    ;(children[i] as HTMLElement).style.position = 'relative'
    ;(children[i] as HTMLElement).style.zIndex = '1'
  }

  const timer = setTimeout(() => {
    bgDiv.style.opacity = '1'
  }, delay)

  return () => {
    clearTimeout(timer)
    bgDiv.remove()
  }
}

export const WithRivers: Story = {
  name: 'With rivers',
  render: function WithRiversRender() {
    const {t} = useTranslation('RiverBreakoutTabs')
    const {isLarge} = useWindowSize()

    useEffect(() => {
      const visuals = Array.from(document.querySelectorAll('[data-river-tabs-dither-bg]')).filter(
        (value): value is HTMLDivElement => value instanceof HTMLDivElement,
      )

      const cleanups = visuals.map(visualElement => TempFadeInBackgroundEffect(visualElement, placeholderBg, 500))

      return () => {
        for (const cleanup of cleanups) {
          cleanup()
        }
      }
    }, [isLarge])

    return (
      <Section>
        <Stack padding="none" gap={64}>
          <River variant="gridline">
            <River.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
              <Image src={renderUI1} alt={t('with_rivers_top_visual_alt')} />
            </River.Visual>
            <River.Content>
              <Heading>{t('with_rivers_top_heading')}</Heading>
              <Text variant="default">{t('with_rivers_top_body')}</Text>
            </River.Content>
          </River>

          <RiverBreakoutTabs>
            <RiverBreakoutTabs.A11yHeading>{t('with_images_a11y_heading')}</RiverBreakoutTabs.A11yHeading>

            <RiverBreakoutTabs.Item>
              <RiverBreakoutTabs.Icon icon={AiModelIcon} color="green" />
              <RiverBreakoutTabs.Heading>{t('with_images_item_plan_heading')}</RiverBreakoutTabs.Heading>
              <RiverBreakoutTabs.Content>
                <Text>{t('with_images_item_plan_body')}</Text>
                <Link href="https://github.com/features/copilot">{t('with_images_item_plan_link')}</Link>
              </RiverBreakoutTabs.Content>
              <RiverBreakoutTabs.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
                <Image src={renderUI1} alt={t('alt_ai_plan_editor')} />
              </RiverBreakoutTabs.Visual>
            </RiverBreakoutTabs.Item>

            <RiverBreakoutTabs.Item>
              <RiverBreakoutTabs.Icon icon={CopilotIcon} color="green" />
              <RiverBreakoutTabs.Heading>{t('with_images_item_refine_heading')}</RiverBreakoutTabs.Heading>
              <RiverBreakoutTabs.Content>
                <Text>{t('with_images_item_refine_body')}</Text>
                <Link href="https://github.com/features/copilot/chat">{t('with_images_item_refine_link')}</Link>
              </RiverBreakoutTabs.Content>
              <RiverBreakoutTabs.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
                <Image src={renderUI2} alt={t('alt_chat_guiding_edits')} />
              </RiverBreakoutTabs.Visual>
            </RiverBreakoutTabs.Item>

            <RiverBreakoutTabs.Item>
              <RiverBreakoutTabs.Icon icon={ShieldCheckIcon} color="green" />
              <RiverBreakoutTabs.Heading>{t('with_images_item_merge_heading')}</RiverBreakoutTabs.Heading>
              <RiverBreakoutTabs.Content>
                <Text>{t('with_images_item_merge_body')}</Text>
                <Link href="https://github.com/features/copilot/plans">{t('with_images_item_merge_link')}</Link>
              </RiverBreakoutTabs.Content>
              <RiverBreakoutTabs.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
                <Image src={renderUI3} alt={t('alt_checks_before_merge')} />
              </RiverBreakoutTabs.Visual>
            </RiverBreakoutTabs.Item>
          </RiverBreakoutTabs>

          <River variant="gridline">
            <River.Visual data-river-tabs-dither-bg imageBackgroundColor="subtle">
              <Image src={renderUI3} alt={t('with_rivers_bottom_visual_alt')} />
            </River.Visual>
            <River.Content>
              <Text size="300">
                <b>{t('with_rivers_bottom_body_bold')}</b> {t('with_rivers_bottom_body_text')}
              </Text>
            </River.Content>
          </River>
        </Stack>
      </Section>
    )
  },
}
