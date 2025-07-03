'use client'
import {Grid, Card, Stack, InlineLink, Text, Heading} from '@primer/react-brand/lib'
import clsx from 'clsx'
import Image from 'next/image'
import NextLink from 'next/link'

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
                <Heading as="h1" size="3">
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
                  <NextLink href="/introduction/getting-started" legacyBehavior passHref>
                    <Card href="/introduction/getting-started" hasBorder fullWidth>
                      <Card.Heading as="h2">Getting started</Card.Heading>
                      <Card.Description>
                        Standards, guidelines, and tools to get started with Primer Brand.
                      </Card.Description>
                    </Card>
                  </NextLink>
                </Grid.Column>
                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <NextLink href="/components" legacyBehavior passHref>
                    <Card href="/components" hasBorder fullWidth>
                      <Card.Heading as="h2">Components</Card.Heading>
                      <Card.Description>
                        Design and development guidelines for Primer Brand components.
                      </Card.Description>
                    </Card>
                  </NextLink>
                </Grid.Column>

                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <NextLink href="/introduction/theming" legacyBehavior passHref>
                    <Card href="/introduction/theming" hasBorder fullWidth>
                      <Card.Heading as="h2">Theming</Card.Heading>
                      <Card.Description>Learn how to use Primer Brand's built-in color modes.</Card.Description>
                    </Card>
                  </NextLink>
                </Grid.Column>

                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <NextLink href="/introduction/animation" legacyBehavior passHref>
                    <Card href="/introduction/animation" hasBorder fullWidth>
                      <Card.Heading as="h2">Animation</Card.Heading>
                      <Card.Description>
                        Add visual interest and interactivity to a web page or application.
                      </Card.Description>
                    </Card>
                  </NextLink>
                </Grid.Column>

                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <Card href="https://primer.style/foundations/icons" hasBorder fullWidth>
                    <Card.Heading as="h2">Octicons</Card.Heading>
                    <Card.Description>A scalable set of icons handcrafted by GitHub for GitHub</Card.Description>
                  </Card>
                </Grid.Column>
                <Grid.Column span={{xsmall: 12, large: 6, xlarge: 4}}>
                  <Card href="https://github.com/primer/brand/blob/main/CONTRIBUTING.md" hasBorder fullWidth>
                    <Card.Heading as="h2">Contributing</Card.Heading>
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
                <InlineLink href="https://github.com/primer/brand/issues/new?template=BUG-REPORT.yml">
                  open a new issue
                </InlineLink>{' '}
                with as much detail as possible.
              </Text>
            </div>
          </Stack>
        </Grid.Column>
      </Grid>
    </div>
  )
}
