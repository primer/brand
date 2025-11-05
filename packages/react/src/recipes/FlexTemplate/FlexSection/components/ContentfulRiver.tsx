import React from 'react'
import {clsx} from 'clsx'

import {ZapIcon} from '@primer/octicons-react'

import {Heading, InlineLink, Label, Link, River, Text, Timeline} from '../../../..'

import placeholderImage from '../../../../fixtures/images/placeholder.png'

import styles from '../FlexSection.module.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContentfulRiver({river, className}: any) {
  /**
   * We use an empty fragment if `props.content.cta` is not defined for compliance
   * with `River.Content` types (`River.Content` does not accept `null` as children).
   */
  const ctaLink =
    river.ctaText && river.ctaHref ? (
      <Link variant={river.ctaVariant ?? 'accent'} href={river.ctaHref}>
        {river.ctaText}
      </Link>
    ) : (
      <></>
    )

  const getTrailingComponent = river.hasTrailingComponent
    ? () => (
        <Timeline>
          <Timeline.Item>
            GitHub Codespaces offers a complete dev environment in seconds, so you can code, build, test, and open pull
            requests from any repo anywhere.
          </Timeline.Item>
          <Timeline.Item>
            GitHub Copilot is your AI pair programmer that empowers you to complete tasks 55% faster by turning natural
            language prompts into coding suggestions.
          </Timeline.Item>
          <Timeline.Item>
            GitHub Actions automates your build, test, and deployment workflow with simple and secure CI/CD.
          </Timeline.Item>
        </Timeline>
      )
    : undefined

  return (
    <River className={className} align={river.align ?? 'start'} imageTextRatio={river.imageTextRatio ?? '50:50'}>
      <River.Visual hasShadow={river.hasShadow ?? false} className={styles['width-full']}>
        {river.visualType === 'image' ? (
          <img
            src={river.imageSrc ?? placeholderImage}
            alt={river.imageAlt ?? 'placeholder, blank area with a gray background color'}
          />
        ) : river.visualType === 'video' ? (
          <video
            loop
            playsInline
            autoPlay
            muted
            poster={
              river.videoPoster ??
              'https://github.githubassets.com/images/modules/site/issues/issue-tasks-progress-placeholder.png'
            }
          >
            <source
              type="video/mp4; codecs=hevc,mp4a.40.2"
              src={
                river.videoSrcHevc ??
                'https://github.githubassets.com/images/modules/site/issues/issue-tasks-progress.hevc.mp4'
              }
            />
            <source
              type="video/mp4; codecs=avc1.4D401E,mp4a.40.2"
              src={
                river.videoSrcH264 ??
                'https://github.githubassets.com/images/modules/site/issues/issue-tasks-progress.h264.mp4'
              }
            />
          </video>
        ) : null}
      </River.Visual>

      <River.Content trailingComponent={getTrailingComponent}>
        {river.label && (
          <Label
            size={river.labelSize ?? 'medium'}
            color={river.labelColor ?? 'default'}
            {...(river.hasLeadingVisual ? {leadingVisual: <ZapIcon />} : {})}
          >
            {river.label}
          </Label>
        )}

        {river.heading && <Heading>{river.heading}</Heading>}
        {river.description && (
          <Text>
            {river.description}
            {river.footnoteId && river.footnoteHref && (
              <sup>
                <InlineLink
                  href={river.footnoteHref}
                  className={clsx(styles.footnoteInlineLink, styles.footnoteSizeSmall)}
                  aria-label={`Footnote ${river.footnoteId}`}
                >
                  {river.footnoteId}
                </InlineLink>
              </sup>
            )}
          </Text>
        )}

        {ctaLink}
      </River.Content>
    </River>
  )
}
