import React from 'react'
import type {StoryFn, Meta} from '@storybook/react'

import {River} from '.'
import {Grid, Heading, Text, Link, Image} from '../../'
import {Container} from '../../component-helpers'
import placeholderImage from '../../fixtures/images/placeholder.png'

import styles from './River.stories.module.css'
import {clsx} from 'clsx'

export default {
  title: 'Components/River',
  component: River,
} as Meta<typeof River>

const PlaceholderImage = () => <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
const Template: StoryFn<typeof River> = args => (
  <>
    <Grid enableOverlay>
      <Grid.Column span={12}>
        <River {...args} align="start">
          <River.Visual>
            <PlaceholderImage />
          </River.Visual>
          <River.Content>
            <Heading size="5">Heading</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>
      </Grid.Column>
    </Grid>

    <Grid enableOverlay>
      <Grid.Column span={12}>
        <River {...args} align="end">
          <River.Visual>
            <PlaceholderImage />
          </River.Visual>
          <River.Content>
            <Heading size="5">Heading</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>
      </Grid.Column>
    </Grid>
  </>
)

export const Default = Template.bind({})

export const LargerPlaceholderImage: StoryFn<typeof River> = args => (
  <Container>
    <River {...args} imageTextRatio="60:40">
      <River.Visual>
        <Image as="picture" src={placeholderImage} alt="placeholder, blank area with a gray background color" />
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

export const Copilot: StoryFn<typeof River> = args => (
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
        <Text size="300">
          <b> Convert comments to code.</b> Write a comment describing the logic you want, and let GitHub Copilot
          assemble the code for you.
        </Text>
      </River.Content>
    </River>
    <River align="end" imageTextRatio={args.imageTextRatio}>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Text size="300">
          <b>Autofill for repetitive code.</b> GitHub Copilot works great for quickly producing boilerplate and
          repetitive code patterns. Feed it a few examples and let it generate the rest!
        </Text>
      </River.Content>
    </River>
  </Container>
)

export const Video: StoryFn<typeof River> = args => (
  <Container>
    <River imageTextRatio="60:40" {...args}>
      <River.Visual hasShadow={false}>
        <video
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

export const CustomLogos: StoryFn<typeof River> = () => (
  <div className={styles.overflow}>
    <div className={styles.container}>
      <River align="start">
        <River.Visual hasShadow={false} fillMedia={false}>
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
