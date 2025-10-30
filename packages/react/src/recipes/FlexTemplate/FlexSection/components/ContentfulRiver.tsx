import React from 'react'
import {clsx} from 'clsx'

import {ZapIcon} from '@primer/octicons-react'

import {Heading, InlineLink, Label, Link, River, Text, Timeline} from '../../../..'

import placeholderImage from '../../../../fixtures/images/placeholder.png'

import styles from '../FlexSection.module.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContentfulRiver({rivers, className}: any) {
  /**
   * We use an empty fragment if `props.content.cta` is not defined for compliance
   * with `River.Content` types (`River.Content` does not accept `null` as children).
   */
  const ctaLink = rivers.fields.hasCta ? (
    <Link variant={rivers.fields.ctaVariant ?? 'accent'} href="#">
      Learn more
    </Link>
  ) : (
    <></>
  )

  const getTrailingComponent = rivers.fields.hasTrailingComponent
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
    <River className={className} align={rivers.fields.align} imageTextRatio={rivers.fields.imageTextRatio}>
      <River.Visual hasShadow={rivers.fields.hasShadow} className={styles['width-full']}>
        {rivers.fields.visualType === 'image' ? (
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        ) : rivers.fields.visualType === 'video' ? (
          <video
            loop
            playsInline
            autoPlay
            muted
            poster="https://github.githubassets.com/images/modules/site/issues/issue-tasks-progress-placeholder.png"
          >
            <source
              type="video/mp4; codecs=hevc,mp4a.40.2"
              src="https://github.githubassets.com/images/modules/site/issues/issue-tasks-progress.hevc.mp4"
            />
            <source
              type="video/mp4; codecs=avc1.4D401E,mp4a.40.2"
              src="https://github.githubassets.com/images/modules/site/issues/issue-tasks-progress.h264.mp4"
            />
          </video>
        ) : null}
      </River.Visual>

      <River.Content trailingComponent={getTrailingComponent}>
        {rivers.fields.hasLabel && (
          <Label
            size={rivers.fields.labelSize}
            color={rivers.fields.labelColor}
            {...(rivers.fields.hasLeadingVisual ? {leadingVisual: <ZapIcon />} : {})}
          >
            Label
          </Label>
        )}

        <Heading>Heading</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
          <sup>
            <InlineLink
              href=""
              className={clsx(styles.footnoteInlineLink, styles.footnoteSizeSmall)}
              aria-label="Footnote 5"
            >
              5
            </InlineLink>
          </sup>{' '}
          sed turpis felis nam pulvinar risus elementum.
        </Text>

        {ctaLink}
      </River.Content>
    </River>
  )
}
