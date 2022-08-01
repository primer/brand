import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {River} from '.'
import {Heading, Text, Link} from '..'
import {Container} from '../component-helpers'

import styles from './River.stories.module.css'
import clsx from 'clsx'

export default {
  title: 'Components/River',
  component: River
} as ComponentMeta<typeof River>

const PlaceholderImage = () => (
  <img
    src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
    alt="placeholder, blank area with an off-white background color"
  />
)
const Template: ComponentStory<typeof River> = args => (
  <Container>
    <River {...args}>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>Heading</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Container>
)

export const Default = Template.bind({})

export const LargerPlaceholderImage: ComponentStory<typeof River> = args => (
  <Container>
    <River {...args} imageTextRatio="60:40">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading as="h3">Heading</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Container>
)

export const Copilot: ComponentStory<typeof River> = args => (
  <Container>
    <River align="center">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>Your AI pair programmer</Heading>
        <Text variant="default">
          With GitHub Copilot, get suggestions for whole lines or entire functions right inside your editor.
        </Text>
      </River.Content>
    </River>
    <River align="start" imageTextRatio={args.imageTextRatio}>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Text variant="default">
          <strong> Convert comments to code.</strong> Write a comment describing the logic you want, and let GitHub
          Copilot assemble the code for you.
        </Text>
      </River.Content>
    </River>
    <River align="end" imageTextRatio={args.imageTextRatio}>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Text variant="default">
          <strong>Autofill for repetitive code.</strong> GitHub Copilot works great for quickly producing boilerplate
          and repetitive code patterns. Feed it a few examples and let it generate the rest!
        </Text>
      </River.Content>
    </River>
  </Container>
)

export const Video: ComponentStory<typeof River> = args => (
  <Container>
    <River imageTextRatio="60:40" {...args}>
      <River.Visual hasShadow={false}>
        <video
          playsInline
          autoPlay
          muted
          aria-hidden="true"
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
      </River.Visual>
      <River.Content>
        <Heading>Break issues into actionable tasks</Heading>
        <Text>
          Tackle complex issues with task lists and track their status with new progress indicators. Convert tasks into
          their own issues and navigate your work hierarchy.
        </Text>
      </River.Content>
    </River>
  </Container>
)

export const CustomLogos: ComponentStory<typeof River> = () => (
  <div className={styles.overflow}>
    <div className={styles.container}>
      <River align="start">
        <River.Visual hasShadow={false} autoSizeMedia={false}>
          <div className={styles['river-logos']}>
            <img
              className={styles['river-logo']}
              src="https://resources.github.com/assets/img/devops/compete/logos/swift.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/swift.png, https://resources.github.com/assets/img/devops/compete/logos/swift@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={styles['river-logo']}
              src="https://resources.github.com/assets/img/devops/compete/logos/gatsby.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/gatsby.png, https://resources.github.com/assets/img/devops/compete/logos/gatsby@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={styles['river-logo']}
              src="https://resources.github.com/assets/img/devops/compete/logos/nodejs.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/nodejs.png, https://resources.github.com/assets/img/devops/compete/logos/nodejs@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={styles['river-logo']}
              src="https://resources.github.com/assets/img/devops/compete/logos/bootstrap.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/bootstrap.png, https://resources.github.com/assets/img/devops/compete/logos/bootstrap@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={styles['river-logo']}
              src="https://resources.github.com/assets/img/devops/compete/logos/vercel.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/vercel.png, https://resources.github.com/assets/img/devops/compete/logos/vercel@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={styles['river-logo']}
              src="https://resources.github.com/assets/img/devops/compete/logos/android.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/android.png, https://resources.github.com/assets/img/devops/compete/logos/android@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={styles['river-logo']}
              src="https://resources.github.com/assets/img/devops/compete/logos/atlassian.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/atlassian.png, https://resources.github.com/assets/img/devops/compete/logos/atlassian@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/tensorflow.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/tensorflow.png, https://resources.github.com/assets/img/devops/compete/logos/tensorflow@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/angular.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/angular.png, https://resources.github.com/assets/img/devops/compete/logos/angular@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/nextjs.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/nextjs.png, https://resources.github.com/assets/img/devops/compete/logos/nextjs@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/rails.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/rails.png, https://resources.github.com/assets/img/devops/compete/logos/rails@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/linux.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/linux.png, https://resources.github.com/assets/img/devops/compete/logos/linux@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/graphql.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/graphql.png, https://resources.github.com/assets/img/devops/compete/logos/graphql@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/clojure.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/clojure.png, https://resources.github.com/assets/img/devops/compete/logos/clojure@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/react.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/react.png, https://resources.github.com/assets/img/devops/compete/logos/react@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/kubernetes.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/kubernetes.png, https://resources.github.com/assets/img/devops/compete/logos/kubernetes@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/ansible.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/ansible.png, https://resources.github.com/assets/img/devops/compete/logos/ansible@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/haskell.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/haskell.png, https://resources.github.com/assets/img/devops/compete/logos/haskell@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/python.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/python.png, https://resources.github.com/assets/img/devops/compete/logos/python@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/bash.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/bash.png, https://resources.github.com/assets/img/devops/compete/logos/bash@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            <img
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              src="https://resources.github.com/assets/img/devops/compete/logos/ember.png"
              srcSet="https://resources.github.com/assets/img/devops/compete/logos/ember.png, https://resources.github.com/assets/img/devops/compete/logos/ember@2x.png 2x"
              width="80"
              height="80"
              alt=""
            />
            {/* <svg
              className={styles['river-logo']}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>
            <svg
              className={styles['river-logo']}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>

            <svg
              className={styles['river-logo']}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>

            <svg
              className={styles['river-logo']}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>

            <svg
              className={styles['river-logo']}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>
            <svg
              className={styles['river-logo']}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>
            <svg
              className={styles['river-logo']}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-two'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.984 29.29a17.209 17.209 0 0 1 17.21-17.21v17.21H1.985Z" fill="#442781" />
              <path d="M1.984 29.29a17.21 17.21 0 0 0 17.21 17.21V29.29H1.985Z" fill="#61459C" />
              <path
                d="M36.404 29.29a17.212 17.212 0 0 1-10.624 15.9 17.209 17.209 0 0 1-6.585 1.31V29.29h17.21Z"
                fill="#A992DB"
              />
              <path
                d="M47.016 14.422c0 7.137-5.786 12.922-12.922 12.922H21.171V14.422c0-7.137 5.785-12.922 12.921-12.922 7.137 0 12.923 5.785 12.923 12.922Z"
                fill="#FF7917"
              />
            </svg>
            <svg
              className={clsx(styles['river-logo'], styles['river-logo--row-three'])}
              viewBox="0 0 80px 80px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.963 19.463 24 13.25 24H2V12.75C2 6.537 7.037 1.5 13.25 1.5S24.5 6.537 24.5 12.75ZM24.5 35.25C24.5 29.037 29.537 24 35.75 24H47v11.25c0 6.213-5.037 11.25-11.25 11.25S24.5 41.463 24.5 35.25ZM2 35.25C2 41.463 7.037 46.5 13.25 46.5H24.5V35.25C24.5 29.037 19.463 24 13.25 24S2 29.037 2 35.25ZM47 12.75C47 6.537 41.963 1.5 35.75 1.5H24.5v11.25C24.5 18.963 29.537 24 35.75 24S47 18.963 47 12.75Z"
                fill="#17CF97"
              />
            </svg> */}
          </div>
        </River.Visual>
        <River.Content>
          <Heading>Home to the world&apos;s largest open source registry</Heading>
          <Text>
            Accelerate your workflows and scale your business fast with access to millions of open source projects on
            GitHub, the largest source code host.
          </Text>
        </River.Content>
      </River>
    </div>
  </div>
)
