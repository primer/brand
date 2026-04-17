import {CodeOfConductIcon, CpuIcon, LightBulbIcon, SparkleFillIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'
import React, {useEffect} from 'react'

import {
  Box,
  Card,
  ColorModesEnum,
  FAQ,
  FAQGroup,
  Grid,
  Hero,
  Heading,
  InlineLink,
  LogoSuite,
  Section,
  SectionIntro,
  SubNav,
  Text,
  River,
  EyebrowText,
  Link,
  Stack,
  Token,
  PricingOptions,
  Tabs,
  Tiles,
  Bento,
  Image,
  useTheme,
} from '../../..'
import {RedlineBackground} from '../../../component-helpers'
import placeholderBg from '../../../fixtures/images/dither-bg-landscape-purple.png'
import brandDividerWide from '../../../fixtures/images/brand-divider-copilot-wide.png'
import mercardo from '../../../fixtures/images/bento/mercado.png'
import copilotHeroHead from '../../../fixtures/images/copilot-mascot-head-peeking.png'
import renderUI3 from '../../../fixtures/images/copilot-vscode-agent-mode-3.png'
import renderUI3Dark from '../../../fixtures/images/copilot-vscode-agent-mode-3-dark.png'
import {logos} from '../../../LogoSuite/LogoSuite.fixtures'
import {tileItems} from '../../../Tiles/Tiles.fixtures'

import {defaultFlexSuiteAIOverviewContent, type FlexSuiteAIOverviewContent} from './FlexSuiteAIOverview.content'
import styles from './FlexSuiteAIOverview.module.css'

export type FlexSuiteAIOverviewTemplateProps = {
  content: FlexSuiteAIOverviewContent
}

const cardIcons = [CpuIcon, LightBulbIcon, CodeOfConductIcon] as const

export function FlexSuiteAIOverview() {
  return <FlexSuiteAIOverviewTemplate content={defaultFlexSuiteAIOverviewContent} />
}

export function FlexSuiteAIOverviewTemplate({content}: FlexSuiteAIOverviewTemplateProps) {
  const heroImageRef = React.useRef<HTMLDivElement>(null)
  const riverImageRefs = React.useRef<Array<HTMLDivElement | null>>([])
  const {colorMode} = useTheme()

  useEffect(() => {
    const cleanups: Array<() => void> = []

    if (heroImageRef.current) {
      cleanups.push(TempFadeInBackgroundEffect(heroImageRef.current, placeholderBg, 500))
    }

    for (const element of riverImageRefs.current) {
      if (element) {
        cleanups.push(TempFadeInBackgroundEffect(element, placeholderBg, 500))
      }
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup()
      }
    }
  }, [])

  const renderPricingOptions = () => (
    <Box borderBlockStartWidth="thin" borderColor="subtle" borderStyle="solid" marginBlockStart="spacious">
      <Box backgroundColor="default" borderBlockEndWidth="thin" borderColor="subtle" borderStyle="solid">
        <Grid>
          <Grid.Column span={12}>
            <PricingOptions style={{marginBlock: 'calc(var(--brand-borderWidth-thin) * -1)'}}>
              <PricingOptions.Item>
                <PricingOptions.Heading>{content.pricing.free.heading}</PricingOptions.Heading>
                <PricingOptions.Description>{content.pricing.free.description}</PricingOptions.Description>
                <PricingOptions.Price>{content.pricing.free.price}</PricingOptions.Price>
                <PricingOptions.FeatureList>
                  <PricingOptions.FeatureListItem>{content.pricing.free.features[0]}</PricingOptions.FeatureListItem>
                  <PricingOptions.FeatureListItem>{content.pricing.free.features[1]}</PricingOptions.FeatureListItem>
                  <PricingOptions.FeatureListItem
                    leadingVisual={SparkleFillIcon}
                    leadingVisualFill="var(--base-color-scale-purple-5)"
                  >
                    {content.pricing.free.features[2]}
                  </PricingOptions.FeatureListItem>
                </PricingOptions.FeatureList>
                <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
                  {content.pricing.free.primaryAction}
                </PricingOptions.PrimaryAction>
                {content.pricing.free.secondaryAction ? (
                  <PricingOptions.SecondaryAction as="a" href="#" variant="subtle" hasArrow={false}>
                    {content.pricing.free.secondaryAction}
                  </PricingOptions.SecondaryAction>
                ) : null}
              </PricingOptions.Item>
              <PricingOptions.Item>
                <PricingOptions.Heading>{content.pricing.pro.heading}</PricingOptions.Heading>
                {content.pricing.pro.label ? (
                  <PricingOptions.Label>{content.pricing.pro.label}</PricingOptions.Label>
                ) : null}
                <PricingOptions.Description>{content.pricing.pro.description}</PricingOptions.Description>
                <PricingOptions.Price trailingText={content.pricing.pro.trailingText}>
                  {content.pricing.pro.price}
                </PricingOptions.Price>
                <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
                  {content.pricing.pro.primaryAction}
                </PricingOptions.PrimaryAction>
                <PricingOptions.FeatureList>
                  <PricingOptions.FeatureListHeading>
                    {content.pricing.pro.featureListHeading}
                  </PricingOptions.FeatureListHeading>
                  <PricingOptions.FeatureListItem>{content.pricing.pro.features[0]}</PricingOptions.FeatureListItem>
                  <PricingOptions.FeatureListItem>{content.pricing.pro.features[1]}</PricingOptions.FeatureListItem>
                  <PricingOptions.FeatureListItem>{content.pricing.pro.features[2]}</PricingOptions.FeatureListItem>
                  <PricingOptions.FeatureListItem>{content.pricing.pro.features[3]}</PricingOptions.FeatureListItem>
                </PricingOptions.FeatureList>
                {content.pricing.pro.footnote ? (
                  <PricingOptions.Footnote>
                    {content.pricing.pro.footnote}{' '}
                    {content.pricing.pro.footnoteLinkText ? (
                      <InlineLink href="#">{content.pricing.pro.footnoteLinkText}</InlineLink>
                    ) : null}
                  </PricingOptions.Footnote>
                ) : null}
              </PricingOptions.Item>

              <PricingOptions.Item>
                <PricingOptions.Heading>{content.pricing.proPlus.heading}</PricingOptions.Heading>
                <PricingOptions.Description>{content.pricing.proPlus.description}</PricingOptions.Description>
                <PricingOptions.Price trailingText={content.pricing.proPlus.trailingText}>
                  {content.pricing.proPlus.price}
                </PricingOptions.Price>
                <PricingOptions.PrimaryAction as="a" href="#" variant="accent">
                  {content.pricing.proPlus.primaryAction}
                </PricingOptions.PrimaryAction>
                <PricingOptions.FeatureList>
                  <PricingOptions.FeatureListHeading>
                    {content.pricing.proPlus.featureListHeading}
                  </PricingOptions.FeatureListHeading>
                  <PricingOptions.FeatureListItem>{content.pricing.proPlus.features[0]}</PricingOptions.FeatureListItem>
                  <PricingOptions.FeatureListItem>{content.pricing.proPlus.features[1]}</PricingOptions.FeatureListItem>
                  <PricingOptions.FeatureListItem
                    leadingVisual={SparkleFillIcon}
                    leadingVisualFill="var(--base-color-scale-purple-5)"
                  >
                    {content.pricing.proPlus.features[2]}
                  </PricingOptions.FeatureListItem>
                  <PricingOptions.FeatureListItem>{content.pricing.proPlus.features[3]}</PricingOptions.FeatureListItem>
                </PricingOptions.FeatureList>
              </PricingOptions.Item>
            </PricingOptions>
          </Grid.Column>
        </Grid>
      </Box>
    </Box>
  )

  return (
    <>
      <Box className={styles.page} backgroundColor="default">
        <Box backgroundColor="subtle" style={{height: 72}} />

        <SubNav>
          <SubNav.Heading href="#">{content.subNav.heading}</SubNav.Heading>

          {content.subNav.links.map(link => (
            <SubNav.Link key={link} href="#">
              {link}
            </SubNav.Link>
          ))}
        </SubNav>
        <Box paddingBlockStart={{narrow: 64, wide: 40}}></Box>

        <Section paddingBlockStart="none" paddingBlockEnd="none">
          <Hero
            imageContainerRef={heroImageRef}
            enableAnimation
            variant="gridline-expressive"
            trailingComponent={() => (
              <Box className={styles.heroTrailingPeek}>
                <Text>
                  {content.hero.trailingText} <InlineLink href="#">{content.hero.trailingLinkText}</InlineLink>
                </Text>
                <Image
                  className={styles.heroTrailingPeekImage}
                  style={
                    {
                      ['--hero-peek-left' as string]: '-310px',
                      ['--hero-peek-bottom' as string]: '-65px',
                      ['--hero-peek-width' as string]: '190px',
                    } as React.CSSProperties
                  }
                  src={copilotHeroHead}
                  alt={content.hero.peekAlt}
                />
              </Box>
            )}
          >
            <Hero.Label>{content.hero.label}</Hero.Label>
            <Hero.Heading>
              {content.hero.headingLine1} <br /> {content.hero.headingLine2}
            </Hero.Heading>
            <Hero.Description>{content.hero.description}</Hero.Description>
            <Hero.PrimaryAction href="#">{content.hero.primaryAction}</Hero.PrimaryAction>
            <Hero.SecondaryAction href="#">{content.hero.secondaryAction}</Hero.SecondaryAction>
            <Hero.Image
              enableBorder={false}
              position="block-end"
              src={colorMode === ColorModesEnum.DARK ? renderUI3Dark : renderUI3}
              alt={content.hero.imageAlt}
            />
          </Hero>
        </Section>

        <LogoSuite variant="gridline-expressive">
          <LogoSuite.Heading visuallyHidden>{content.logoSuiteHeading}</LogoSuite.Heading>
          <LogoSuite.Logobar marquee={process.env.NODE_ENV !== 'test'}>{logos.slice(0, 8)}</LogoSuite.Logobar>
        </LogoSuite>

        <Box className={clsx(styles.cardGridFrame, styles.cardGridFrameNoTopBorder)}>
          <Box className={styles.cardGridContent}>
            <Grid columnGap="none" rowGap="none" enableGutters={false}>
              {content.resourceCards.map((card, index) => (
                <Grid.Column
                  key={card.heading}
                  span={{xsmall: 12, large: 4}}
                  className={clsx(styles.cardGridColumn, styles.cardGridColumnArrowHover)}
                >
                  <Box className={styles.cardGridItem} padding={24}>
                    <Card
                      href="#"
                      fullWidth
                      ctaVariant="arrow"
                      ctaText={content.common.learnMore}
                      className={styles.resourceCard}
                    >
                      <Card.Icon icon={cardIcons[index]} color="green" hasBackground size="medium" />
                      <Card.Heading>{card.heading}</Card.Heading>
                      <Card.Description>{card.description}</Card.Description>
                    </Card>
                  </Box>
                </Grid.Column>
              ))}
            </Grid>
          </Box>
        </Box>

        <Section paddingBlockStart="condensed" paddingBlockEnd="none">
          <SectionIntro align="center" fullWidth>
            <SectionIntro.Label>{content.workflow.label}</SectionIntro.Label>
            <SectionIntro.Heading>{content.workflow.heading}</SectionIntro.Heading>
            <SectionIntro.Description>{content.workflow.description}</SectionIntro.Description>
          </SectionIntro>
        </Section>
        <Section paddingBlockEnd="none">
          <Stack direction="vertical" padding="none" gap="spacious">
            <River variant="gridline">
              <River.Visual
                ref={element => {
                  riverImageRefs.current[0] = element
                }}
                imageBackgroundColor="subtle"
              >
                <picture>
                  <source
                    srcSet={colorMode === ColorModesEnum.DARK ? renderUI3Dark : renderUI3}
                    media="(max-width: 47.99rem)"
                  />
                  <img
                    src={colorMode === ColorModesEnum.DARK ? renderUI3Dark : renderUI3}
                    alt={content.rivers[0].imageAlt}
                  />
                </picture>
              </River.Visual>
              <River.Content>
                <EyebrowText>{content.rivers[0].eyebrow}</EyebrowText>
                <Heading>{content.rivers[0].heading}</Heading>
                <Text>{content.rivers[0].description}</Text>
                <Link href="#">{content.rivers[0].linkText}</Link>
              </River.Content>
            </River>
            <River variant="gridline">
              <River.Visual
                ref={element => {
                  riverImageRefs.current[1] = element
                }}
                imageBackgroundColor="subtle"
              >
                <picture>
                  <source
                    srcSet={colorMode === ColorModesEnum.DARK ? renderUI3Dark : renderUI3}
                    media="(max-width: 47.99rem)"
                  />
                  <img
                    src={colorMode === ColorModesEnum.DARK ? renderUI3Dark : renderUI3}
                    alt={content.rivers[1].imageAlt}
                  />
                </picture>
              </River.Visual>
              <River.Content>
                <EyebrowText>{content.rivers[1].eyebrow}</EyebrowText>
                <Heading>{content.rivers[1].heading}</Heading>
                <Text>{content.rivers[1].description}</Text>
                <Link href="#">{content.rivers[1].linkText}</Link>
              </River.Content>
            </River>
            <River variant="gridline">
              <River.Visual
                ref={element => {
                  riverImageRefs.current[2] = element
                }}
                imageBackgroundColor="subtle"
              >
                <picture>
                  <source
                    srcSet={colorMode === ColorModesEnum.DARK ? renderUI3Dark : renderUI3}
                    media="(max-width: 47.99rem)"
                  />
                  <img
                    src={colorMode === ColorModesEnum.DARK ? renderUI3Dark : renderUI3}
                    alt={content.rivers[2].imageAlt}
                  />
                </picture>
              </River.Visual>
              <River.Content>
                <EyebrowText>{content.rivers[2].eyebrow}</EyebrowText>
                <Heading>{content.rivers[2].heading}</Heading>
                <Text>{content.rivers[2].description}</Text>
                <Link href="#">{content.rivers[2].linkText}</Link>
              </River.Content>
            </River>
          </Stack>
        </Section>
        <Box className={styles.cardGridFrame} marginBlockStart={48}>
          <Grid enableGutters={false}>
            <Grid.Column>
              <Box className={styles.bentoInlineFrame}>
                <Bento>
                  <Bento.Item
                    bgColor="default"
                    columnSpan={12}
                    rowSpan={5}
                    flow={{xsmall: 'row', medium: 'column'}}
                    order="default"
                  >
                    <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}}>
                      <Bento.Heading as="h3" size="4" weight="semibold">
                        {content.bento.heading}
                      </Bento.Heading>
                      <Link href="#">{content.bento.linkText}</Link>
                    </Bento.Content>
                    <Bento.Visual padding="condensed" className={styles.bentoVisualNoRadius}>
                      <img className={styles.bentoVisualImageNoRadius} src={mercardo} alt={content.bento.imageAlt} />
                    </Bento.Visual>
                  </Bento.Item>
                </Bento>
              </Box>
            </Grid.Column>
          </Grid>
        </Box>
        <Stack justifyContent="center" padding="none">
          <Box borderBlockEndWidth="thin" borderColor="muted" borderStyle="solid">
            <Image src={brandDividerWide} alt={content.common.brandDividerAlt} style={{display: 'block'}} />
          </Box>
        </Stack>
        <Section paddingBlockStart="none" paddingBlockEnd="none">
          <Box paddingBlockEnd={48} paddingBlockStart={48}>
            <SectionIntro align="center" fullWidth>
              <SectionIntro.Heading>{content.organization.heading}</SectionIntro.Heading>
              <SectionIntro.Description>{content.organization.description}</SectionIntro.Description>
            </SectionIntro>
          </Box>
        </Section>

        <Box className={styles.cardGridFrame}>
          <Box className={styles.cardGridContent}>
            <Grid columnGap="none" rowGap="none" enableGutters={false}>
              {content.organization.cards.map((card, index) => (
                <Grid.Column
                  key={card.heading}
                  span={{xsmall: 12, large: 4}}
                  className={clsx(styles.cardGridColumn, styles.cardGridColumnArrowHover)}
                >
                  <Box className={styles.cardGridItem} padding={24}>
                    <Card
                      href="#"
                      fullWidth
                      ctaVariant="arrow"
                      ctaText={content.common.learnMore}
                      className={styles.resourceCard}
                    >
                      <Card.Icon icon={cardIcons[index]} color="green" hasBackground size="medium" />
                      <Card.Tokens>
                        <Token>{card.tag}</Token>
                      </Card.Tokens>
                      <Card.Heading>{card.heading}</Card.Heading>
                      <Card.Description>{card.description}</Card.Description>
                    </Card>
                  </Box>
                </Grid.Column>
              ))}
            </Grid>
          </Box>
        </Box>

        <Section paddingBlockStart="none" paddingBlockEnd="none">
          <Box paddingBlockEnd={32} paddingBlockStart={48}>
            <SectionIntro align="center" fullWidth>
              <SectionIntro.Label>{content.plans.label}</SectionIntro.Label>
              <SectionIntro.Heading>{content.plans.heading}</SectionIntro.Heading>
            </SectionIntro>
            <Tabs aria-label={content.plans.tabsAriaLabel} variant="accent">
              {content.plans.tabs.map(tab => (
                <Tabs.Item key={tab}>{tab}</Tabs.Item>
              ))}
              {content.plans.tabs.map(tab => (
                <Tabs.Panel key={tab}>{renderPricingOptions()}</Tabs.Panel>
              ))}
            </Tabs>
          </Box>
        </Section>

        <Section paddingBlockEnd="none">
          <Tiles variant="gridlines" layout="compact">
            {tileItems.slice(0, 6).map(item => (
              <Tiles.Item key={item.name} name={item.name} href={item.href}>
                {item.icon}
              </Tiles.Item>
            ))}
          </Tiles>
        </Section>

        <Section paddingBlockStart="none" paddingBlockEnd="none">
          <Box paddingBlockEnd={32} paddingBlockStart={80}>
            <SectionIntro align="center" fullWidth>
              <SectionIntro.Heading>{content.resources.heading}</SectionIntro.Heading>
            </SectionIntro>
          </Box>
        </Section>

        <Box className={styles.cardGridFrame} marginBlockEnd={80}>
          <Box className={styles.cardGridContent}>
            <Grid columnGap="none" rowGap="none" enableGutters={false}>
              {content.resources.cards.map((card, index) => (
                <Grid.Column
                  key={card.heading}
                  span={{xsmall: 12, large: 4}}
                  className={clsx(styles.cardGridColumn, styles.cardGridColumnArrowHover)}
                >
                  <Box className={styles.cardGridItem} padding={24}>
                    <Card
                      href="#"
                      fullWidth
                      ctaVariant="arrow"
                      ctaText={content.common.learnMore}
                      className={styles.resourceCard}
                    >
                      <Card.Icon icon={cardIcons[index]} color="green" hasBackground size="medium" />
                      <Card.Tokens>
                        <Token>{card.tag}</Token>
                      </Card.Tokens>
                      <Card.Heading>{card.heading}</Card.Heading>
                      <Card.Description>{card.description}</Card.Description>
                    </Card>
                  </Box>
                </Grid.Column>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box paddingBlockEnd={64}>
          <FAQGroup variant="gridline" defaultSelectedIndex={1}>
            <FAQGroup.Heading>
              {content.faq.headingLine1}
              <br />
              {content.faq.headingLine2}
            </FAQGroup.Heading>
            {content.faq.groups.map(group => (
              <FAQ key={group.heading} variant="gridline">
                <FAQ.Heading>{group.heading}</FAQ.Heading>
                {group.items.map((item, index) => (
                  <FAQ.Item key={item.question} name={`faq-${group.heading}`} open={index === 0}>
                    <FAQ.Question>{item.question}</FAQ.Question>
                    <FAQ.Answer>
                      <Text as="p" variant="muted">
                        {item.answer}
                      </Text>
                    </FAQ.Answer>
                  </FAQ.Item>
                ))}
              </FAQ>
            ))}
          </FAQGroup>
        </Box>

        <RedlineBackground style={{height: 600, display: 'flex', flexDirection: 'column', gap: 'var(--base-size-32)'}}>
          <RedlineBackground
            style={{height: 84, marginTop: 'auto', backgroundColor: 'var(--brand-color-border-default)'}}
          />
        </RedlineBackground>
      </Box>
    </>
  )
}

function TempFadeInBackgroundEffect(element: HTMLDivElement, backgroundImageUrl: string, delay = 100) {
  element.style.position = 'relative'

  const bgDiv = document.createElement('div')
  bgDiv.style.cssText = `
    position: absolute;
    inset: 0;
    background-image: url(${backgroundImageUrl});
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.5s ease-out;
    z-index: 0;
  `
  element.insertBefore(bgDiv, element.firstChild)

  const children = element.children
  for (let index = 1; index < children.length; index += 1) {
    ;(children[index] as HTMLElement).style.position = 'relative'
    ;(children[index] as HTMLElement).style.zIndex = '1'
  }

  const timer = setTimeout(() => {
    bgDiv.style.opacity = '1'
  }, delay)

  return () => {
    clearTimeout(timer)
    bgDiv.remove()
  }
}
