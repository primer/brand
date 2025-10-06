import React from 'react'
import clsx from 'clsx'

import {InlineLink, Link, RiverBreakout, Text, Timeline} from '../../../..'

import placeholderImage from '../../../../fixtures/images/placeholder.png'

import styles from '../FlexSection.module.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContentfulRiverBreakout({rivers, className}: any) {
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
    <RiverBreakout className={className}>
      <RiverBreakout.A11yHeading>Accessible heading</RiverBreakout.A11yHeading>
      <RiverBreakout.Visual hasShadow={rivers.fields.riverHasShadow}>
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
      </RiverBreakout.Visual>
      <RiverBreakout.Content trailingComponent={getTrailingComponent}>
        <Text>
          <em>Accelerate your workflows</em> and scale your business fast with access to millions of open source
          projects on GitHub, the largest
          <sup>
            <InlineLink
              href=""
              className={clsx(styles.footnoteInlineLink, styles.footnoteSizeLarge)}
              aria-label="Footnote 6"
            >
              6
            </InlineLink>
          </sup>{' '}
          source code host.
        </Text>

        {ctaLink}
      </RiverBreakout.Content>
    </RiverBreakout>
  )
}
