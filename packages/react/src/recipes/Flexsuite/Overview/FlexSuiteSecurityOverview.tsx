import {CodeOfConductIcon, CpuIcon, LightBulbIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'

import {
  Box,
  Card,
  Grid,
  Hero,
  LogoSuite,
  Section,
  SectionIntro,
  Stack,
  SubNav,
  Image,
  Token,
  Testimonial,
  CTABanner,
  Button,
  Text,
} from '../../..'
import {logos} from '../../../LogoSuite/LogoSuite.fixtures'
import placeholderBg from '../../../fixtures/images/security-banner-wide.png'
import placeholderImage from '../../../fixtures/images/placeholder.png'
import monaAvatar from '../../../fixtures/images/avatar-mona.png'
import brandDividerWide from '../../../fixtures/images/brand-divider-security-wide.png'

import {
  defaultFlexSuiteSecurityOverviewContent,
  type FlexSuiteSecurityOverviewContent,
} from './FlexSuiteSecurityOverview.content'
import styles from './FlexSuiteAIOverview.module.css'
import {RedlineBackground} from '../../../component-helpers'
import {LockIcon} from '@primer/octovisuals-react'

export type FlexSuiteSecurityOverviewTemplateProps = {
  content: FlexSuiteSecurityOverviewContent
}

const cardIcons = [CpuIcon, LightBulbIcon, CodeOfConductIcon] as const

export function FlexSuiteSecurityOverview() {
  return <FlexSuiteSecurityOverviewTemplate content={defaultFlexSuiteSecurityOverviewContent} />
}

export function FlexSuiteSecurityOverviewTemplate({content}: FlexSuiteSecurityOverviewTemplateProps) {
  return (
    <Box className={styles.page} backgroundColor="default">
      <Box backgroundColor="subtle" style={{height: 72}} />

      <SubNav>
        <SubNav.Heading href="#" aria-current="page">
          {content.subNav.heading}
        </SubNav.Heading>

        {content.subNav.links.map(link => (
          <SubNav.Link key={link} href="#">
            {link}
          </SubNav.Link>
        ))}
      </SubNav>

      <Section paddingBlockStart="none" paddingBlockEnd="none">
        <Hero align="center">
          <Hero.Label>{content.hero.label}</Hero.Label>
          <Hero.Heading>{content.hero.heading}</Hero.Heading>
          <Hero.PrimaryAction href="#">{content.hero.primaryAction}</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">{content.hero.secondaryAction}</Hero.SecondaryAction>
        </Hero>
      </Section>
      <Stack justifyContent="center" padding="none" style={{marginTop: 'calc(var(--base-size-64) * -1)'}}>
        <Box borderBlockEndWidth="thin" borderColor="muted" borderStyle="solid">
          <Image src={placeholderBg} alt={content.common.heroImageAlt} style={{display: 'block', width: '100%'}} />
        </Box>
      </Stack>
      <Box
        className={clsx(styles.cardGridFrame)}
        marginBlockStart={{narrow: 24, wide: 80}}
        marginBlockEnd={{narrow: 24, wide: 64}}
      >
        <Box className={styles.cardGridContent}>
          <Grid columnGap="none" rowGap="none" enableGutters={false}>
            {content.highlights.map((card, index) => (
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
                    {card.tag ? (
                      <Card.Tokens>
                        <Token>{card.tag}</Token>
                      </Card.Tokens>
                    ) : null}
                    <Card.Heading>{card.heading}</Card.Heading>
                    <Card.Description>{card.description}</Card.Description>
                  </Card>
                </Box>
              </Grid.Column>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box borderBlockStartWidth="thin" borderColor="muted" borderStyle="solid">
        <LogoSuite variant="gridline-expressive">
          <LogoSuite.Heading visuallyHidden>{content.logoSuiteHeading}</LogoSuite.Heading>
          <LogoSuite.Logobar marquee={process.env.NODE_ENV !== 'test'}>{logos.slice(0, 8)}</LogoSuite.Logobar>
        </LogoSuite>
      </Box>

      <Section paddingBlockEnd="none" paddingBlockStart="condensed">
        <SectionIntro align="center">
          <SectionIntro.Label>{content.workflow.label}</SectionIntro.Label>
          <SectionIntro.Heading>{content.workflow.heading}</SectionIntro.Heading>
        </SectionIntro>
      </Section>

      <Box className={styles.cardGridFrame} marginBlockStart={48}>
        <Box className={styles.cardGridContent}>
          <Grid columnGap="none" rowGap="none" enableGutters={false}>
            {content.capabilities.map(card => (
              <Grid.Column
                key={card.heading}
                span={{xsmall: 12, large: 6}}
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
                    <Card.Image aspectRatio="16:10" src={placeholderImage} alt="" />
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
          <SectionIntro.Label>{content.customerStories.label}</SectionIntro.Label>
          <SectionIntro.Heading>{content.customerStories.heading}</SectionIntro.Heading>
        </SectionIntro>
      </Section>

      <Box className={styles.cardGridFrame} marginBlockStart={48}>
        <Box className={styles.cardGridContent}>
          <Grid columnGap="none" rowGap="none" enableGutters={false}>
            {content.customerStories.cards.map(card => (
              <Grid.Column
                key={card.heading}
                span={{xsmall: 12, large: 4}}
                className={clsx(styles.cardGridColumn, styles.cardGridColumnArrowHover)}
              >
                <Box className={styles.cardGridItem} padding={24}>
                  <Card href="#" fullWidth ctaVariant="arrow" className={styles.resourceCard}>
                    {card.tag ? (
                      <Card.Tokens>
                        <Token>{card.tag}</Token>
                      </Card.Tokens>
                    ) : null}
                    <Card.Heading>{card.heading}</Card.Heading>
                    <Card.Description>{card.description}</Card.Description>
                  </Card>
                </Box>
              </Grid.Column>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box
        paddingInlineStart={48}
        paddingInlineEnd={48}
        borderBlockEndWidth="thin"
        borderColor="muted"
        borderStyle="solid"
      >
        <Section>
          <Testimonial variant="expressive" size="large">
            <Testimonial.Quote>
              {content.testimonial.quoteLead} <em>{content.testimonial.quoteEmphasis}</em>{' '}
              {content.testimonial.quoteTrailing}
            </Testimonial.Quote>
            <Testimonial.Link href="#">{content.testimonial.linkText}</Testimonial.Link>
            <Testimonial.Avatar src={monaAvatar} alt={content.testimonial.avatarAlt} />
            <Testimonial.Name position={content.testimonial.position}>{content.testimonial.name}</Testimonial.Name>
          </Testimonial>
        </Section>
      </Box>

      <Section paddingBlockStart="condensed" paddingBlockEnd="condensed">
        <SectionIntro align="center" fullWidth>
          <SectionIntro.Heading>{content.resources.heading}</SectionIntro.Heading>
        </SectionIntro>
      </Section>

      <Box className={styles.cardGridFrame} marginBlockEnd={80}>
        <Box className={styles.cardGridContent}>
          <Grid columnGap="none" rowGap="none" enableGutters={false}>
            {content.resources.cards.map(card => (
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
                    {card.tag ? (
                      <Card.Tokens>
                        <Token>{card.tag}</Token>
                      </Card.Tokens>
                    ) : null}
                    <Card.Heading>{card.heading}</Card.Heading>
                    <Card.Description>{card.description}</Card.Description>
                  </Card>
                </Box>
              </Grid.Column>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box
        borderBlockStartWidth="thin"
        borderBlockEndWidth="thin"
        borderColor="muted"
        borderStyle="solid"
        marginBlockEnd="spacious"
      >
        <Section paddingBlockEnd="none" paddingBlockStart="none">
          <CTABanner
            leadingComponent={() => (
              <Text>
                <LockIcon size={64} />
              </Text>
            )}
          >
            <CTABanner.Heading>{content.cta.heading}</CTABanner.Heading>

            <CTABanner.ButtonGroup>
              <Button>{content.cta.primaryAction}</Button>
              <Button>{content.cta.secondaryAction}</Button>
            </CTABanner.ButtonGroup>
          </CTABanner>
        </Section>
      </Box>
      <Stack justifyContent="center" padding="none">
        <Box borderBlockEndWidth="thin" borderColor="muted" borderStyle="solid">
          <Image src={brandDividerWide} alt="" style={{display: 'block'}} />
        </Box>
      </Stack>
      <RedlineBackground style={{height: 600, display: 'flex', flexDirection: 'column', gap: 'var(--base-size-32)'}}>
        <RedlineBackground
          style={{height: 84, marginTop: 'auto', backgroundColor: 'var(--brand-color-border-default)'}}
        />
      </RedlineBackground>
    </Box>
  )
}
