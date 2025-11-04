import React from 'react'
import clsx from 'clsx'

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
  SectionIntroStacked,
  Stack,
  Statistic,
  Text,
  useTheme,
} from '../../..'

import pinterestLogo from '../../../fixtures/images/logos/pinterest.png'
import shopifyLogo from '../../../fixtures/images/logos/shopify.png'
import twilioLogo from '../../../fixtures/images/logos/twilio.png'
import uberLogo from '../../../fixtures/images/logos/uber.png'
import vercelLogo from '../../../fixtures/images/logos/vercel.png'
import placeholderImage from '../../../fixtures/images/placeholder.png'
import lightNarrowBg from '../../../fixtures/images/light-vertical-banner.png'
import lightWideBg from '../../../fixtures/images/light-horizontal-banner.png'
import darkNarrowBg from '../../../fixtures/images/dark-vertical-banner.png'
import darkWideBg from '../../../fixtures/images/dark-horizontal-banner.png'

import styles from './FlexSection.module.css'
import {FlexSectionTestimonials, ContentfulRiver, ContentfulRiverBreakout, ContentfulRiverAccordion} from './components'
import type {
  FlexTemplatePillarsConfig,
  FlexTemplateRiverItem,
  FlexTemplateSection,
  FlexTemplateTestimonialsConfig,
} from '../FlexTemplate.types'

type FlexSectionProps = {
  component: FlexTemplateSection
  className?: string
}

export function FlexSection({component, className}: FlexSectionProps) {
  const {colorMode} = useTheme()
  const [selectedSegmentedControlItem, setSelectedSegmentedControlItem] = React.useState(0)
  const {
    breakoutBanner,
    cards,
    featuredBento,
    id,
    anchorNav,
    logoSuite,
    pillars,
    prose,
    pricingOptions,
    rivers,
    sectionIntro,
    sectionIntroStacked,
    segmentedControlPanel,
    statistics,
    testimonials,
    visualSettings,
  } = component

  const testimonialsFields = testimonials as FlexTemplateTestimonialsConfig | undefined

  const {
    backgroundColor = 'default',
    paddingBlockStart = 'spacious',
    paddingBlockEnd = 'spacious',
    roundedCorners = false,
    verticalGap = 'normal',
    backgroundImage,
    backgroundImagePosition,
    backgroundImageSize,
    hasBorderBottom = false,
    enableRiverStoryScroll = false,
  } = visualSettings ?? {}

  const pillarsFields = pillars as FlexTemplatePillarsConfig | undefined

  return (
    <Section
      className={clsx(
        className,
        styles.section,
        testimonialsFields?.['variant'] === 'frosted-glass' && styles['overflow-hidden'],
      )}
      backgroundColor={backgroundColor}
      backgroundImageSrc={backgroundImage?.file.url}
      backgroundImagePosition={backgroundImagePosition}
      backgroundImageSize={backgroundImageSize}
      rounded={roundedCorners}
      id={id}
      paddingBlockEnd="none"
      paddingBlockStart={paddingBlockStart === 'none' ? 'none' : paddingBlockStart}
    >
      <Box
        borderBlockEndWidth="thin"
        borderColor="muted"
        borderStyle={hasBorderBottom ? 'solid' : 'none'}
        paddingBlockEnd={paddingBlockEnd}
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

          {sectionIntroStacked && (
            <Grid className={styles.sectionIntro}>
              <Grid.Column>
                <SectionIntroStacked className={styles.normalizePadding}>
                  {sectionIntroStacked.heading ? (
                    <SectionIntroStacked.Heading size={sectionIntroStacked.headingSize ?? '5'}>
                      {sectionIntroStacked.heading}
                    </SectionIntroStacked.Heading>
                  ) : null}
                  {sectionIntroStacked.linkText && sectionIntroStacked.linkHref ? (
                    <SectionIntroStacked.Link
                      variant={sectionIntroStacked.linkVariant ?? 'accent'}
                      href={sectionIntroStacked.linkHref}
                    >
                      {sectionIntroStacked.linkText}
                    </SectionIntroStacked.Link>
                  ) : null}
                  {sectionIntroStacked.items && sectionIntroStacked.items.length > 0 ? (
                    <SectionIntroStacked.Items>
                      {sectionIntroStacked.items.map((item, index) => (
                        <SectionIntroStacked.Item key={index}>{item.text}</SectionIntroStacked.Item>
                      ))}
                    </SectionIntroStacked.Items>
                  ) : null}
                </SectionIntroStacked>
              </Grid.Column>
            </Grid>
          )}

          {sectionIntro && (
            <Grid className={styles.sectionIntro}>
              <Grid.Column>
                <SectionIntro
                  className={styles.normalizePadding}
                  align={sectionIntro.align ?? 'start'}
                  fullWidth={sectionIntro.fullWidth ?? false}
                >
                  {sectionIntro.label ? (
                    <SectionIntro.Label
                      size={sectionIntro.labelSize ?? 'medium'}
                      color={sectionIntro.labelColor ?? 'default'}
                    >
                      {typeof sectionIntro.label === 'string' ? sectionIntro.label : sectionIntro.label.text}
                    </SectionIntro.Label>
                  ) : null}
                  {sectionIntro.heading ? (
                    <SectionIntro.Heading size={sectionIntro.headingSize ?? '3'}>
                      {sectionIntro.heading}
                    </SectionIntro.Heading>
                  ) : null}
                  {sectionIntro.description ? (
                    <SectionIntro.Description>{sectionIntro.description}</SectionIntro.Description>
                  ) : null}
                  {sectionIntro.linkText && sectionIntro.linkHref ? (
                    <SectionIntro.Link variant={sectionIntro.linkVariant ?? 'accent'} href={sectionIntro.linkHref}>
                      {sectionIntro.linkText}
                    </SectionIntro.Link>
                  ) : null}
                </SectionIntro>
              </Grid.Column>
            </Grid>
          )}

          {pillars && pillarsFields?.items && (
            <Grid className={styles.normalizeMargin}>
              {(pillarsFields.heading || pillarsFields.description) && (
                <Grid.Column span={12}>
                  <Stack direction="vertical" gap="condensed">
                    {pillarsFields.heading && (
                      <Heading as={pillarsFields.headingLevel ?? 'h3'} size="4">
                        {pillarsFields.heading}
                      </Heading>
                    )}
                    {pillarsFields.description && (
                      <Text variant="muted" size="300">
                        {pillarsFields.description}
                      </Text>
                    )}
                  </Stack>
                </Grid.Column>
              )}

              {pillarsFields.items.map((pillarItem, index) => {
                const heading = pillarItem.heading ?? pillarItem.title
                const itemBackgroundColor =
                  pillarItem.backgroundColor ??
                  pillarsFields.itemBackgroundColor ??
                  (backgroundColor === 'default' ? 'subtle' : 'default')

                return (
                  <Grid.Column
                    key={heading ?? pillarItem.description ?? `pillar-${index}`}
                    span={{xsmall: 12, small: 12, medium: 6, large: 4, xlarge: 4, xxlarge: 4}}
                  >
                    <Box
                      className={styles.heightFull}
                      borderRadius="large"
                      paddingBlockStart={32}
                      paddingBlockEnd={40}
                      paddingInlineStart={32}
                      paddingInlineEnd={32}
                      backgroundColor={itemBackgroundColor}
                    >
                      <Pillar
                        align={pillarItem.align ?? pillarsFields.align ?? 'start'}
                        hasBorder={pillarItem.hasBorder ?? false}
                      >
                        {pillarItem.icon && (
                          <Pillar.Icon color={pillarItem.iconColor ?? 'default'} icon={pillarItem.icon} />
                        )}
                        {heading && (
                          <Pillar.Heading as={pillarItem.headingLevel ?? pillarsFields.headingLevel ?? 'h3'}>
                            {heading}
                          </Pillar.Heading>
                        )}
                        {pillarItem.description && <Pillar.Description>{pillarItem.description}</Pillar.Description>}
                        {pillarItem.linkHref && pillarItem.linkText && (
                          <Pillar.Link href={pillarItem.linkHref}>{pillarItem.linkText}</Pillar.Link>
                        )}
                      </Pillar>
                    </Box>
                  </Grid.Column>
                )
              })}
            </Grid>
          )}

          {logoSuite && (
            <Grid className={styles.normalizeMargin}>
              <Grid.Column>
                <LogoSuite align="start" hasDivider={false}>
                  {logoSuite.heading && (
                    <LogoSuite.Heading as="h3" size="6">
                      {logoSuite.heading}
                    </LogoSuite.Heading>
                  )}

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
              {(cards.items && cards.items.length > 0 ? cards.items : Array(3).fill({})).map((card, index) => (
                <Grid.Column
                  key={index}
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
                    <Card href={card.href ?? '#'} hasBorder={false} fullWidth>
                      <Card.Image
                        src={card.imageSrc ?? placeholderImage}
                        // eslint-disable-next-line i18n-text/no-en
                        alt={card.imageAlt ?? 'Placeholder card image'}
                        aspectRatio="16:9"
                      />
                      {/* eslint-disable-next-line i18n-text/no-en */}
                      <Card.Heading>{card.heading ?? `Card Title ${index + 1}`}</Card.Heading>
                      {/* eslint-disable-next-line i18n-text/no-en */}
                      <Card.Description>{card.description ?? 'Card description'}</Card.Description>
                    </Card>
                  </Box>
                </Grid.Column>
              ))}
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
                          featuredBento.showIcon ? (
                            <Icon icon={GlobeIcon} color="purple" size="medium" hasBackground />
                          ) : undefined
                        }
                        padding={{
                          xsmall: 'normal',
                          small: 'spacious',
                        }}
                      >
                        <Bento.Heading as={featuredBento.headingLevel} size="4">
                          {featuredBento.heading ?? (
                            <>
                              <em>Lorem ipsum dolor sit</em> amet consectetur adipiscing elit
                            </>
                          )}
                          {featuredBento.showFootnotes ? (
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
                        <Link href={featuredBento.linkHref ?? '#'} variant="accent">
                          {/* eslint-disable-next-line i18n-text/no-en  */}
                          {featuredBento.linkText ?? 'Learn more'}
                        </Link>
                      </Bento.Content>
                      <Bento.Visual className={styles.featuredBentoVisual} position="50% 100%" padding="normal">
                        <picture className={styles.imageFillMedia}>
                          <img
                            className={styles.imageFillMedia}
                            src={featuredBento.imageSrc ?? placeholderImage}
                            alt={featuredBento.imageAlt ?? 'Placeholder'}
                          />
                        </picture>
                      </Bento.Visual>
                    </Bento.Item>
                  </Bento>
                </Box>
              </Grid.Column>
            </Grid>
          )}

          {prose && prose.content && (
            <Grid className={styles.normalizeMargin}>
              <Grid.Column>
                <Prose html={prose.content} />
              </Grid.Column>
            </Grid>
          )}

          {rivers && rivers.length > 0 && (
            <RiverStoryScroll disabled={!enableRiverStoryScroll}>
              {rivers.map((river: FlexTemplateRiverItem, i: number) => {
                const riverType = river.type ?? 'river'

                if (riverType === 'riverAccordion') {
                  return (
                    <ContentfulRiverAccordion
                      key={i}
                      className={clsx(styles.normalizeMargin, styles.normalizePadding, styles['px-3'])}
                      rivers={river}
                    />
                  )
                }

                if (riverType === 'riverBreakout') {
                  return (
                    <ContentfulRiverBreakout
                      key={i}
                      className={clsx(styles.normalizeMargin, styles.normalizePadding, styles['px-3'], {
                        [styles.riverBreakoutNoCta]: !river.ctaText,
                      })}
                      rivers={river}
                    />
                  )
                }

                return (
                  <ContentfulRiver
                    key={i}
                    className={clsx(styles.normalizeMargin, styles.normalizePadding, styles['px-3'])}
                    river={river}
                  />
                )
              })}
            </RiverStoryScroll>
          )}

          {testimonialsFields && testimonialsFields.testimonialCount && testimonialsFields.testimonialCount > 0 && (
            <FlexSectionTestimonials testimonials={testimonialsFields} className={styles.normalizeMargin} />
          )}

          {breakoutBanner && (
            <Grid className={clsx(styles.normalizeMargin, styles['mx-0'])}>
              <Grid.Column>
                <BreakoutBanner
                  className={clsx(styles.wrapper, styles.normalizeMargin)}
                  align={breakoutBanner.align}
                  backgroundColor={backgroundColor}
                  backgroundImageSrc={{
                    narrow: colorMode === 'dark' ? darkNarrowBg : lightNarrowBg,
                    regular: colorMode === 'dark' ? darkWideBg : lightWideBg,
                    wide: colorMode === 'dark' ? darkWideBg : lightWideBg,
                  }}
                  backgroundImagePosition={{
                    narrow: 'bottom',
                    regular: 'right',
                    wide: 'right',
                  }}
                  {...(breakoutBanner.showLogo && {
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
                  <BreakoutBanner.Heading as={breakoutBanner.headingLevel}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    {breakoutBanner.showFootnotes ? (
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
              {(statistics.items && statistics.items.length > 0
                ? statistics.items
                : Array(statistics.count ?? 3)
                    .fill(null)
                    .map(() => ({
                      value: '$2M+',
                      description: 'Given back to our maintainers',
                    }))
              ).map((stat, i) => (
                <Grid.Column span={{medium: 6, large: (statistics.count ?? 3) === 3 ? 4 : 3}} key={i}>
                  <Statistic
                    className={styles.statistic}
                    variant={statistics.variant}
                    size={statistics.size}
                    style={{
                      backgroundColor:
                        statistics.variant === 'boxed'
                          ? `var(--brand-color-canvas-${backgroundColor === 'default' ? 'subtle' : 'default'})`
                          : undefined,
                    }}
                  >
                    <Statistic.Heading as="p">{stat.value ?? '$2M+'}</Statistic.Heading>
                    {statistics.showDescription && (
                      <Statistic.Description variant={statistics.descriptionVariant}>
                        {/* eslint-disable-next-line i18n-text/no-en */}
                        {stat.description ?? 'Given back to our maintainers'}
                        {statistics.showDescriptionFootnotes ? (
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
                <PricingOptions variant={pricingOptions.variant} align={pricingOptions.align}>
                  {Array.from({length: 3}).map((_, i) => (
                    <PricingOptions.Item key={i}>
                      <PricingOptions.Label>Label</PricingOptions.Label>
                      <PricingOptions.Heading as={pricingOptions.headingLevel}>Heading</PricingOptions.Heading>
                      <PricingOptions.Description>Description</PricingOptions.Description>

                      <PricingOptions.Price
                        currencyCode="USD"
                        currencySymbol="$"
                        originalPrice="10"
                        trailingText="per month / $90 per year"
                      >
                        8
                      </PricingOptions.Price>

                      {pricingOptions.showFeatureList && (
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

                      {pricingOptions.showFootnotes && (
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
