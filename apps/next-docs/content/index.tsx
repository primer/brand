'use client'
import {Grid, Card, Stack, Text, Heading} from '@primer/react-brand/lib'
import clsx from 'clsx'
import Image from 'next/image'

import mona from '../src/images/mona-home.png'

import styles from './index.module.css'

export default function HomepageComponent() {
  return (
    <div className={clsx(styles.home, 'custom-component')}>
      <Grid>
        <Grid.Column>
          <Stack gap={{narrow: 'spacious', regular: 'normal'}}>
            <Stack
              className={styles.header}
              padding="none"
              gap="normal"
              direction="horizontal"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack gap="normal" padding="none">
                <Heading as="h2" size="3">
                  Primer Brand UI
                </Heading>
                <Text as="p" variant="muted" size="300">
                  Primer Brand is GitHub's design system for creating marketing websites and digital experiences.
                </Text>
              </Stack>
              <div className={styles.landingPageImage}>
                <Image width="256" alt="Mona" src={mona} className={styles.mona} />
              </div>
            </Stack>
            <Stack padding="none" gap="normal" className={styles.CardGridContainer}>
              <Grid>
                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <Card href="/product/getting-started" hasBorder fullWidth>
                    <Card.Heading>Getting started</Card.Heading>
                    <Card.Description>Standards, guidelines, and tools to get started with Primer.</Card.Description>
                  </Card>
                </Grid.Column>
                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <Card href="/product/components" hasBorder fullWidth>
                    <Card.Heading>Components</Card.Heading>
                    <Card.Description>Design and development guidelines for Primer components.</Card.Description>
                  </Card>
                </Grid.Column>
                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <Card href="/product/primitives" hasBorder fullWidth>
                    <Card.Heading>Primitives</Card.Heading>
                    <Card.Description>Design tokens for color, spacing, and typography.</Card.Description>
                  </Card>
                </Grid.Column>
                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <Card href="/product/ui-patterns" hasBorder fullWidth>
                    <Card.Heading>Patterns</Card.Heading>
                    <Card.Description>Design guidelines covering common user workflows.</Card.Description>
                  </Card>
                </Grid.Column>
                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <Card href="/octicons" hasBorder fullWidth>
                    <Card.Heading>Octicons</Card.Heading>
                    <Card.Description>A scalable set of icons handcrafted by GitHub for GitHub</Card.Description>
                  </Card>
                </Grid.Column>
                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <Card href="/product/contribute" hasBorder fullWidth>
                    <Card.Heading>Contributing</Card.Heading>
                    <Card.Description>Guidelines for contributing to the Product UI library.</Card.Description>
                  </Card>
                </Grid.Column>
              </Grid>
            </Stack>
            <div className={styles.footer}>
              <Text as="p" size="300">
                <Text as="span" size="300" weight="bold">
                  Need help?&nbsp;
                </Text>
                If you found a bug on this website, please{' '}
                <a href="https://github.com/github/primer-docs/issues/new?template=Blank+issue">open a new issue</a>{' '}
                with as much detail as possible.
              </Text>
            </div>
          </Stack>
        </Grid.Column>
      </Grid>
    </div>
  )
}
