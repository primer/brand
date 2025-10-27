import React from 'react'
import {clsx} from 'clsx'

import {GlobeIcon, ZapIcon} from '@primer/octicons-react'

import {
  AnchorNav,
  Bento,
  Box,
  BreakoutBanner,
  Card,
  Grid,
  Heading,
  Icon,
  Image,
  InlineLink,
  Link,
  LogoSuite,
  Pillar,
  PricingOptions,
  Prose,
  RiverStoryScroll,
  Section,
  SectionIntro,
  Stack,
  Statistic,
  Text,
} from '../../..'

import pinterestLogo from '../../../fixtures/images/logos/pinterest.png'
import shopifyLogo from '../../../fixtures/images/logos/shopify.png'
import twilioLogo from '../../../fixtures/images/logos/twilio.png'
import uberLogo from '../../../fixtures/images/logos/uber.png'
import vercelLogo from '../../../fixtures/images/logos/vercel.png'
import placeholderImage from '../../../fixtures/images/placeholder.png'
import lightNarrowBg from '../../../fixtures/images/light-vertical-banner.png'
import lightWideBg from '../../../fixtures/images/light-horizontal-banner.png'

import styles from './FlexSection.module.css'
import {FlexSectionTestimonials, ContentfulRiver, ContentfulRiverBreakout, ContentfulRiverAccordion} from './components'

type FlexSectionProps = {
  component
  className?: string
}

export function FlexSection({component, className}: FlexSectionProps) {
  const [selectedSegmentedControlItem, setSelectedSegmentedControlItem] = React.useState(0)
  const {
    breakoutBanner,
    cards,
    featuredBento,
    id,
    anchorNav,
    introContent,
    logoSuite,
    pillars,
    prose,
    pricingOptions,
    rivers,
    segmentedControlPanel,
    statistics,
    testimonials,
    visualSettings,
  } = component.fields

  const {
    backgroundColor = 'default',
    paddingBlockStart = 'spacious',
    paddingBlockEnd = 'spacious',
    roundedCorners = false,
    verticalGap = 'normal',
    backgroundImage,
    backgroundImagePosition,
    backgroundImageSize,
    testimonialBackgroundImageVariant,
    hasBorderBottom = false,
    enableRiverStoryScroll = false,
  } = visualSettings?.fields ?? {}

  return (
    <Section
      className={clsx(className, styles.section, testimonialBackgroundImageVariant && 'overflow-hidden')}
      backgroundColor={backgroundColor}
      backgroundImageSrc={backgroundImage?.fields.file.url}
      backgroundImagePosition={backgroundImagePosition}
      backgroundImageSize={backgroundImageSize}
      paddingBlockStart={paddingBlockStart}
      paddingBlockEnd="none"
      rounded={roundedCorners}
      id={id}
    >
      <Box
        borderBlockEndWidth="thin"
        borderColor="muted"
        borderStyle={hasBorderBottom ? 'solid' : 'none'}
        className={styles[`paddingBottom-${paddingBlockEnd}`]}
      >
        <Stack padding="none" gap={verticalGap} direction="vertical">
          {anchorNav && (
            <AnchorNav>
              <AnchorNav.Link href="#basic-section1">Section one</AnchorNav.Link>
              <AnchorNav.Link href="#basic-section2">Section two</AnchorNav.Link>
              <AnchorNav.Link href="#basic-section3">Section three</AnchorNav.Link>
              <AnchorNav.Link href="#basic-section4">Section four</AnchorNav.Link>
              <AnchorNav.Link href="#basic-section5">Section five</AnchorNav.Link>
              <AnchorNav.Action href="#">Sign up</AnchorNav.Action>
            </AnchorNav>
          )}

          {introContent && (
            <>
              {introContent.sys.contentType.sys.id === 'introStackedItems' && (
                <Box marginBlockEnd={40} style={{['--brand-Grid-spacing-row' as string]: 'var(--base-size-48)'}}>
                  <Grid>
                    <Grid.Column span={{large: 5}}>
                      <Box className={styles.sectionIntro}>
                        <Heading className={styles.stackedItemHeading} as="h2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Heading>
                        <Link href="#">Learn more</Link>
                      </Box>
                    </Grid.Column>
                    <Grid.Column span={{large: 6}} start={{large: 7}}>
                      <Stack direction="vertical" padding="none">
                        <Text as="p" className={styles.stackedItemText} variant="muted">
                          <Text className={styles.stackedItemText} weight="semibold">
                            Lorem ipsum dolor sit amet,
                          </Text>{' '}
                          consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam
                          pulvinar.
                        </Text>
                        <Text as="p" className={styles.stackedItemText} variant="muted">
                          <Text className={styles.stackedItemText} weight="semibold">
                            Lorem ipsum dolor sit amet,
                          </Text>{' '}
                          consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam
                          pulvinar.
                        </Text>
                        <Text as="p" className={styles.stackedItemText} variant="muted">
                          <Text className={styles.stackedItemText} weight="semibold">
                            Lorem ipsum dolor sit amet,
                          </Text>{' '}
                          consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam
                          pulvinar.
                        </Text>
                      </Stack>
                    </Grid.Column>
                  </Grid>
                </Box>
              )}

              {introContent.sys.contentType.sys.id === 'primerComponentSectionIntro' && (
                <Grid className={styles.sectionIntro}>
                  <Grid.Column>
                    <SectionIntro className={styles.normalizePadding} align="start" fullWidth={false}>
                      <SectionIntro.Label size="medium" color="default">
                        ContentfulSectionIntro
                      </SectionIntro.Label>
                      <SectionIntro.Heading size="3">
                        Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>
                      </SectionIntro.Heading>
                      <SectionIntro.Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                      </SectionIntro.Description>
                      <SectionIntro.Link variant="accent" href="#">
                        Learn more about our features
                      </SectionIntro.Link>
                    </SectionIntro>
                  </Grid.Column>
                </Grid>
              )}
            </>
          )}

          {pillars && (
            <Grid className={styles.normalizeMargin}>
              <Grid.Column
                span={{
                  xsmall: 12,
                  small: 12,
                  medium: 6,
                  large: 4,
                  xlarge: 4,
                  xxlarge: 4,
                }}
              >
                <Box
                  borderRadius="large"
                  paddingBlockStart={32}
                  paddingBlockEnd={40}
                  backgroundColor={backgroundColor === 'default' ? 'subtle' : 'default'}
                  style={{
                    height: '100%',
                    paddingInlineStart: 32,
                    paddingInlineEnd: 32,
                  }}
                >
                  <Pillar align="start">
                    <Pillar.Icon color="default" icon={<ZapIcon />} />
                    <Pillar.Heading as="h3">Powerful Performance</Pillar.Heading>
                    <Pillar.Description>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </Pillar.Description>
                    <Pillar.Link href="#">Learn more</Pillar.Link>
                  </Pillar>
                </Box>
              </Grid.Column>
              <Grid.Column
                span={{
                  xsmall: 12,
                  small: 12,
                  medium: 6,
                  large: 4,
                  xlarge: 4,
                  xxlarge: 4,
                }}
              >
                <Box
                  borderRadius="large"
                  paddingBlockStart={32}
                  paddingBlockEnd={40}
                  backgroundColor={backgroundColor === 'default' ? 'subtle' : 'default'}
                  style={{
                    height: '100%',
                    paddingInlineStart: 32,
                    paddingInlineEnd: 32,
                  }}
                >
                  <Pillar align="start">
                    <Pillar.Icon color="default" icon={<ZapIcon />} />
                    <Pillar.Heading as="h3">Easy Integration</Pillar.Heading>
                    <Pillar.Description>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </Pillar.Description>
                    <Pillar.Link href="#">Get started</Pillar.Link>
                  </Pillar>
                </Box>
              </Grid.Column>
              <Grid.Column
                span={{
                  xsmall: 12,
                  small: 12,
                  medium: 6,
                  large: 4,
                  xlarge: 4,
                  xxlarge: 4,
                }}
              >
                <Box
                  borderRadius="large"
                  paddingBlockStart={32}
                  paddingBlockEnd={40}
                  backgroundColor={backgroundColor === 'default' ? 'subtle' : 'default'}
                  style={{
                    height: '100%',
                    paddingInlineStart: 32,
                    paddingInlineEnd: 32,
                  }}
                >
                  <Pillar align="start">
                    <Pillar.Icon color="default" icon={<ZapIcon />} />
                    <Pillar.Heading as="h3">Secure & Reliable</Pillar.Heading>
                    <Pillar.Description>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur.
                    </Pillar.Description>
                    <Pillar.Link href="#">Read more</Pillar.Link>
                  </Pillar>
                </Box>
              </Grid.Column>
            </Grid>
          )}

          {logoSuite && (
            <Grid className={styles.normalizeMargin}>
              <Grid.Column>
                <LogoSuite align="start">
                  <LogoSuite.Heading as="h3" size="6">
                    Trusted by devs across the world
                  </LogoSuite.Heading>
                  <LogoSuite.Logobar variant="muted" marquee={process.env.NODE_ENV !== 'test'}>
                    <Image alt="Uber" src={uberLogo} />
                    <Image alt="Vercel" src={vercelLogo} />
                    <Image alt="Shopify" src={shopifyLogo} />
                    <Image alt="Pinterest" src={pinterestLogo} />
                    <Image alt="Twilio" src={twilioLogo} />
                  </LogoSuite.Logobar>
                </LogoSuite>
              </Grid.Column>
            </Grid>
          )}

          {cards && (
            <Grid className={styles.normalizeMargin}>
              <Grid.Column
                span={{
                  xsmall: 12,
                  small: 12,
                  medium: 6,
                  large: 4,
                  xlarge: 4,
                  xxlarge: 4,
                }}
              >
                <Box className={styles.heightFull}>
                  <Card href="#" hasBorder={false} fullWidth>
                    <Card.Image src={placeholderImage} alt="Placeholder card image" aspectRatio="16:9" />
                    <Card.Heading>Card Title One</Card.Heading>
                    <Card.Description>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                    </Card.Description>
                  </Card>
                </Box>
              </Grid.Column>
              <Grid.Column
                span={{
                  xsmall: 12,
                  small: 12,
                  medium: 6,
                  large: 4,
                  xlarge: 4,
                  xxlarge: 4,
                }}
              >
                <Box className={styles.heightFull}>
                  <Card href="#" hasBorder={false} fullWidth>
                    <Card.Image src={placeholderImage} alt="Placeholder card image" aspectRatio="16:9" />
                    <Card.Heading>Card Title Two</Card.Heading>
                    <Card.Description>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                    </Card.Description>
                  </Card>
                </Box>
              </Grid.Column>
              <Grid.Column
                span={{
                  xsmall: 12,
                  small: 12,
                  medium: 6,
                  large: 4,
                  xlarge: 4,
                  xxlarge: 4,
                }}
              >
                <Box className={styles.heightFull}>
                  <Card href="#" hasBorder={false} fullWidth>
                    <Card.Image src={placeholderImage} alt="Placeholder card image" aspectRatio="16:9" />
                    <Card.Heading>Card Title Three</Card.Heading>
                    <Card.Description>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                    </Card.Description>
                  </Card>
                </Box>
              </Grid.Column>
            </Grid>
          )}

          {featuredBento && (
            <Grid className={styles.normalizeMargin}>
              <Grid.Column>
                <Box className={styles.normalizeMargin}>
                  <Bento>
                    <Bento.Item
                      className={styles.featuredBentoItem}
                      bgColor={backgroundColor === 'default' ? 'subtle' : 'default'}
                      flow={{
                        xsmall: 'row',
                        small: 'row',
                        medium: 'column',
                        large: 'column',
                        xlarge: 'column',
                        xxlarge: 'column',
                      }}
                      rowSpan={5}
                    >
                      <Bento.Content
                        className={styles.featuredBentoContent}
                        leadingVisual={
                          featuredBento.fields.showIcon ? (
                            <Icon icon={GlobeIcon} color="purple" size="medium" hasBackground />
                          ) : undefined
                        }
                        padding={{
                          xsmall: 'normal',
                          small: 'spacious',
                        }}
                      >
                        <Bento.Heading as={featuredBento.fields.headingLevel} size="4">
                          <em>Lorem ipsum dolor sit</em> amet consectetur adipiscing elit
                          {featuredBento.fields.showFootnotes ? (
                            <>
                              {' '}
                              <InlineLink
                                id="inline-link-1"
                                href="#footnote-1"
                                className={clsx(styles.footnoteInlineLink, styles.footnoteSizeLarge)}
                                aria-label="Footnote 1"
                              >
                                1
                              </InlineLink>
                            </>
                          ) : null}
                        </Bento.Heading>
                        <Link href="#" variant="accent">
                          Learn more
                        </Link>
                      </Bento.Content>
                      <Bento.Visual className={styles.featuredBentoVisual} position="50% 100%" padding="normal">
                        <picture className={styles.imageFillMedia}>
                          <img className={styles.imageFillMedia} src={placeholderImage} alt="Placeholder" />
                        </picture>
                      </Bento.Visual>
                    </Bento.Item>
                  </Bento>
                </Box>
              </Grid.Column>
            </Grid>
          )}

          {prose && (
            <Grid className={styles.normalizeMargin}>
              <Grid.Column>
                <Prose html={prose.fields.content} />
              </Grid.Column>
            </Grid>
          )}

          {rivers && (
            <RiverStoryScroll disabled={!enableRiverStoryScroll}>
              {rivers.fields.type === 'riverAccordion'
                ? [
                    <ContentfulRiverAccordion
                      key="0"
                      className={clsx(styles.normalizeMargin, styles.normalizePadding, 'px-3')}
                      rivers={rivers}
                    />,
                  ]
                : rivers.fields.type === 'riverBreakout'
                ? Array.from({length: 3}).map((_, i) => (
                    <ContentfulRiverBreakout
                      key={i}
                      className={clsx(styles.normalizeMargin, styles.normalizePadding, 'px-3', {
                        [styles.riverBreakoutNoCta]: !rivers.fields.riverHasCta,
                      })}
                      rivers={rivers}
                    />
                  ))
                : rivers.fields.type === 'river'
                ? Array.from({length: 3}).map((_, i) => (
                    <ContentfulRiver
                      key={i}
                      className={clsx(styles.normalizeMargin, styles.normalizePadding, 'px-3')}
                      rivers={rivers}
                    />
                  ))
                : []}
            </RiverStoryScroll>
          )}

          {testimonials && testimonials.fields.testimonialCount > 0 && (
            <FlexSectionTestimonials testimonials={testimonials} className={styles.normalizeMargin} />
          )}

          {breakoutBanner && (
            <Grid className={clsx(styles.normalizeMargin, styles['mx-0'])}>
              <Grid.Column>
                <BreakoutBanner
                  className={clsx(styles.wrapper, styles.normalizeMargin)}
                  align={breakoutBanner.fields.align}
                  backgroundColor={backgroundColor}
                  backgroundImageSrc={{
                    narrow: lightNarrowBg,
                    regular: lightWideBg,
                    wide: lightWideBg,
                  }}
                  backgroundImagePosition={{
                    narrow: 'bottom',
                    regular: 'right',
                    wide: 'right',
                  }}
                  {...(breakoutBanner.fields.showLogo && {
                    leadingVisual: (
                      <Box className={styles.logoWrapper}>
                        <img
                          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
                          alt="GitHub logo"
                          height={32}
                        />
                      </Box>
                    ),
                  })}
                >
                  <BreakoutBanner.Heading as={breakoutBanner.fields.headingLevel}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    {breakoutBanner.fields.showFootnotes ? (
                      <>
                        {' '}
                        <InlineLink
                          id="inline-link-2"
                          href="#footnote-2"
                          className={clsx(styles.footnoteInlineLink, styles.footnoteSizeLarge)}
                          aria-label="Footnote 2"
                        >
                          2
                        </InlineLink>
                      </>
                    ) : null}
                  </BreakoutBanner.Heading>
                  <BreakoutBanner.LinkGroup>
                    <Link href="#">Learn more</Link>
                  </BreakoutBanner.LinkGroup>
                </BreakoutBanner>
              </Grid.Column>
            </Grid>
          )}

          {statistics && (
            <Grid className={styles.normalizeMargin} fullWidth>
              {Array(statistics.fields.count)
                .fill(null)
                .map((_, i) => (
                  <Grid.Column span={{medium: 6, large: statistics.fields.count === 3 ? 4 : 3}} key={i}>
                    <Statistic
                      className={styles.statistic}
                      variant={statistics.fields.variant}
                      size={statistics.fields.size}
                      style={{
                        backgroundColor:
                          statistics.fields.variant === 'boxed'
                            ? `var(--brand-color-canvas-${backgroundColor === 'default' ? 'subtle' : 'default'})`
                            : undefined,
                      }}
                    >
                      <Statistic.Heading as="p">$2M+</Statistic.Heading>
                      {statistics.fields.showDescription && (
                        <Statistic.Description variant={statistics.fields.descriptionVariant}>
                          Given back to our maintainers
                          {statistics.fields.showDescriptionFootnotes ? (
                            <>
                              {' '}
                              <InlineLink
                                id="inline-link-4"
                                href="#footnote-4"
                                className={clsx(styles.footnoteInlineLink, styles.footnoteSizeSmall)}
                                aria-label="Footnote 4"
                              >
                                4
                              </InlineLink>
                            </>
                          ) : null}
                        </Statistic.Description>
                      )}
                    </Statistic>
                  </Grid.Column>
                ))}
            </Grid>
          )}

          {pricingOptions && (
            <Grid className={styles.normalizeMargin}>
              <Grid.Column>
                <PricingOptions variant={pricingOptions.fields.variant} align={pricingOptions.fields.align}>
                  {Array.from({length: 3}).map((_, i) => (
                    <PricingOptions.Item key={i}>
                      <PricingOptions.Label>Label</PricingOptions.Label>
                      <PricingOptions.Heading as={pricingOptions.fields.headingLevel}>Heading</PricingOptions.Heading>
                      <PricingOptions.Description>Description</PricingOptions.Description>

                      <PricingOptions.Price
                        currencyCode="USD"
                        currencySymbol="$"
                        originalPrice="10"
                        trailingText="per month / $90 per year"
                      >
                        8
                      </PricingOptions.Price>

                      {pricingOptions.fields.showFeatureList && (
                        <PricingOptions.FeatureList>
                          <PricingOptions.FeatureListHeading>Heading</PricingOptions.FeatureListHeading>

                          <PricingOptions.FeatureListGroupHeading>Chat</PricingOptions.FeatureListGroupHeading>
                          <PricingOptions.FeatureListItem
                            leadingVisual={ZapIcon}
                            leadingVisualFill="var(--base-color-scale-purple-5)"
                          >
                            Unlimited messages, interactions, and history
                          </PricingOptions.FeatureListItem>
                          <PricingOptions.FeatureListItem>
                            Context-aware coding support and explanations
                          </PricingOptions.FeatureListItem>
                          <PricingOptions.FeatureListItem>
                            Debugging and security remediation assistance
                          </PricingOptions.FeatureListItem>
                          <PricingOptions.FeatureListItem>
                            Repository-based semantic search
                          </PricingOptions.FeatureListItem>
                          <PricingOptions.FeatureListItem variant="excluded">
                            Access your knowledge base
                          </PricingOptions.FeatureListItem>
                          <PricingOptions.FeatureListGroupHeading>
                            Code completion
                          </PricingOptions.FeatureListGroupHeading>
                          <PricingOptions.FeatureListItem>Code suggestions as you type</PricingOptions.FeatureListItem>
                          <PricingOptions.FeatureListItem>Comments to code</PricingOptions.FeatureListItem>
                          <PricingOptions.FeatureListItem variant="excluded">
                            Fine-tuned models (coming soon)
                          </PricingOptions.FeatureListItem>
                        </PricingOptions.FeatureList>
                      )}

                      <PricingOptions.PrimaryAction as="a" href="#" hasArrow={false} variant="accent">
                        Buy now
                      </PricingOptions.PrimaryAction>
                      <PricingOptions.SecondaryAction as="a" href="#" hasArrow={false} variant="subtle">
                        Contact sales
                      </PricingOptions.SecondaryAction>

                      {pricingOptions.fields.showFootnotes && (
                        <PricingOptions.Footnote>
                          Lorem ipsum dolor sit amet <InlineLink href="#">consectetur adipiscing</InlineLink> elit.
                        </PricingOptions.Footnote>
                      )}
                    </PricingOptions.Item>
                  ))}
                </PricingOptions>
              </Grid.Column>
            </Grid>
          )}

          {segmentedControlPanel && (
            <Grid className={styles.normalizeMargin}>
              <Grid.Column>
                <Grid className={styles.segmentedControlPanelGrid}>
                  <Grid.Column span={12}>
                    <div
                      className={styles.segmentedControlContainer}
                      role="tablist"
                      aria-label="Demo segmented control panel"
                    >
                      {Array.from({length: 3}).map((_, i) => (
                        <button
                          key={i}
                          className={`${styles.segmentedControlButton} ${
                            selectedSegmentedControlItem === i ? styles.active : ''
                          }`}
                          id={`${i}-tab`}
                          onClick={() => setSelectedSegmentedControlItem(i)}
                          role="tab"
                          aria-selected={selectedSegmentedControlItem === i}
                          aria-controls={`${i}-tab-panel`}
                        >
                          Label {i}
                        </button>
                      ))}
                    </div>
                  </Grid.Column>
                  <Grid.Column span={12}>
                    {Array.from({length: 3}).map((_, i) => (
                      <div
                        key={`${i}-tab-panel`}
                        id={`${i}-tab-panel`}
                        role="tabpanel"
                        aria-labelledby={`${i}-tab`}
                        hidden={selectedSegmentedControlItem !== i}
                      >
                        <Text>Content for tab {i}</Text>
                      </div>
                    ))}
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
          )}
        </Stack>
      </Box>
    </Section>
  )
}
