import React from 'react'
import {clsx} from 'clsx'

import {InlineLink, Link, RiverBreakout, Text, Timeline} from '../../../..'

import placeholderImage from '../../../../fixtures/images/placeholder.png'

import styles from '../FlexSection.module.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContentfulRiverBreakout({rivers, className}: any) {
  /**
   * We use an empty fragment if `props.content.cta` is not defined for compliance
   * with `River.Content` types (`River.Content` does not accept `null` as children).
   */
  const ctaLink =
    rivers.ctaText && rivers.ctaHref ? (
      <Link variant={rivers.ctaVariant ?? 'accent'} href={rivers.ctaHref}>
        {rivers.ctaText}
      </Link>
    ) : (
      <></>
    )

  const getTrailingComponent = rivers.hasTrailingComponent
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
    <RiverBreakout className={className}>
      {/* eslint-disable-next-line i18n-text/no-en */}
      <RiverBreakout.A11yHeading>{rivers.a11yHeading ?? 'Accessible heading'}</RiverBreakout.A11yHeading>
      <RiverBreakout.Visual hasShadow={rivers.hasShadow ?? false}>
        {rivers.visualType === 'image' ? (
          <img
            src={rivers.imageSrc ?? placeholderImage}
            alt={rivers.imageAlt ?? 'placeholder, blank area with a gray background color'}
          />
        ) : rivers.visualType === 'video' ? (
          <video
            loop
            playsInline
            autoPlay
            muted
            poster={
              rivers.videoPoster ??
              'https://github.githubassets.com/images/modules/site/issues/issue-tasks-progress-placeholder.png'
            }
          >
            <source
              type="video/mp4; codecs=hevc,mp4a.40.2"
              src={
                rivers.videoSrcHevc ??
                'https://github.githubassets.com/images/modules/site/issues/issue-tasks-progress.hevc.mp4'
              }
            />
            <source
              type="video/mp4; codecs=avc1.4D401E,mp4a.40.2"
              src={
                rivers.videoSrcH264 ??
                'https://github.githubassets.com/images/modules/site/issues/issue-tasks-progress.h264.mp4'
              }
            />
          </video>
        ) : null}
      </RiverBreakout.Visual>
      <RiverBreakout.Content trailingComponent={getTrailingComponent}>
        {rivers.description && (
          <Text>
            {rivers.description}
            {rivers.footnoteId && rivers.footnoteHref && (
              <sup>
                <InlineLink
                  href={rivers.footnoteHref}
                  className={clsx(styles.footnoteInlineLink, styles.footnoteSizeLarge)}
                  aria-label={`Footnote ${rivers.footnoteId}`}
                >
                  {rivers.footnoteId}
                </InlineLink>
              </sup>
            )}
          </Text>
        )}

        {ctaLink}
      </RiverBreakout.Content>
    </RiverBreakout>
  )
}
