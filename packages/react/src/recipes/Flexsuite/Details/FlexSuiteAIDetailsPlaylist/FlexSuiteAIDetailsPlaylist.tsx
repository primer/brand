import {CodeOfConductIcon, CpuIcon, LightBulbIcon, LogoGithubIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'
import type {CSSProperties} from 'react'

import {
  Box,
  Button,
  Card,
  CTABanner,
  Grid,
  Heading,
  Hero,
  Image,
  InlineLink,
  MediaPlaylist,
  Section,
  SectionIntro,
  SubNav,
  Text,
  Token,
} from '../../../..'
import {RedlineBackground} from '../../../../component-helpers'

import {
  defaultFlexSuiteAIDetailsPlaylistContent,
  type FlexSuiteAIDetailsPlaylistContent,
} from './FlexSuiteAIDetailsPlaylist.content'
import placeholderImage from '../../../../fixtures/images/placeholder.png'
import overviewStyles from '../../Overview/FlexSuiteAIOverview.module.css'

export type FlexSuiteAIDetailsPlaylistTemplateProps = {
  content: FlexSuiteAIDetailsPlaylistContent
}

const cardIcons = [CpuIcon, CodeOfConductIcon, LightBulbIcon] as const
const videoEmbedStyles: CSSProperties = {
  aspectRatio: '16 / 9',
  border: 0,
  display: 'block',
  width: '100%',
}

export function FlexSuiteAIDetailsPlaylist() {
  return <FlexSuiteAIDetailsPlaylistTemplate content={defaultFlexSuiteAIDetailsPlaylistContent} />
}

export function FlexSuiteAIDetailsPlaylistTemplate({content}: FlexSuiteAIDetailsPlaylistTemplateProps) {
  return (
    <Box className={overviewStyles.page} backgroundColor="default">
      <Box backgroundColor="subtle" style={{height: 72}} />

      <Box style={{minHeight: '56px', position: 'relative'}}>
        <SubNav>
          <SubNav.Heading href="#">{content.subNav.heading}</SubNav.Heading>

          {content.subNav.links.map((link, index) => (
            <SubNav.Link key={link} href="#" aria-current={index === 4 ? 'page' : undefined}>
              {link}
            </SubNav.Link>
          ))}
        </SubNav>
      </Box>

      <Box
        backgroundColor="subtle"
        borderInlineStartWidth="thin"
        borderInlineEndWidth="thin"
        borderColor="muted"
        borderStyle="solid"
        style={{maxInlineSize: 'var(--brand-breakpoint-xlarge)', marginInline: 'auto'}}
      >
        <Hero
          align="center"
          trailingComponent={() => (
            <Box marginBlockStart={12}>
              <Text size="100">
                {content.hero.secondaryText} <InlineLink href="#">{content.hero.secondaryLinkText}</InlineLink>
              </Text>
            </Box>
          )}
        >
          <Hero.Heading>
            {content.hero.headingPrefix}
            <br /> <b>{content.hero.headingEmphasis}</b>
          </Hero.Heading>
          <Hero.Description>{content.hero.description}</Hero.Description>
          <Hero.PrimaryAction href="#">{content.hero.primaryAction}</Hero.PrimaryAction>
        </Hero>
      </Box>

      {content.playlists.map((playlist, index) => (
        <Box
          key={playlist.heading}
          borderColor="muted"
          borderStyle="solid"
          borderBlockStartWidth={index === 0 ? 'thin' : 'none'}
        >
          <Section paddingBlockStart="condensed" paddingBlockEnd="condensed" fullWidth>
            <SectionIntro align="center" fullWidth>
              <SectionIntro.Heading size="3">{playlist.heading}</SectionIntro.Heading>
            </SectionIntro>
          </Section>
          <MediaPlaylist>
            <MediaPlaylist.Heading>{playlist.playlistHeading}</MediaPlaylist.Heading>

            {playlist.videos.map(video => (
              <MediaPlaylist.Item
                key={video.id}
                thumbnail={
                  <Image
                    src={
                      process.env.NODE_ENV === 'test'
                        ? placeholderImage
                        : `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
                    }
                    alt=""
                    aspectRatio="16:9"
                    loading="lazy"
                  />
                }
              >
                <MediaPlaylist.ItemHeading title={video.title} description={video.duration} />
                <MediaPlaylist.ItemContent>
                  <Heading as="h3" size="subhead-large">
                    {video.title}
                  </Heading>
                  <Text variant="muted">{video.summary}</Text>
                </MediaPlaylist.ItemContent>
                <MediaPlaylist.ItemMedia>
                  <iframe
                    style={videoEmbedStyles}
                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </MediaPlaylist.ItemMedia>
              </MediaPlaylist.Item>
            ))}
          </MediaPlaylist>
        </Box>
      ))}

      <Section paddingBlockStart="condensed" paddingBlockEnd="condensed" fullWidth>
        <SectionIntro align="center" fullWidth>
          <SectionIntro.Heading size="3">{content.resources.heading}</SectionIntro.Heading>
        </SectionIntro>
      </Section>

      <Box className={overviewStyles.cardGridFrame}>
        <Box className={overviewStyles.cardGridContent}>
          <Grid columnGap="none" rowGap="none" enableGutters={false}>
            {content.resources.cards.map((card, index) => (
              <Grid.Column
                key={card.heading}
                span={{xsmall: 12, large: 4}}
                className={clsx(overviewStyles.cardGridColumn, overviewStyles.cardGridColumnArrowHover)}
              >
                <Box className={overviewStyles.cardGridItem}>
                  <Card
                    href="#"
                    fullWidth
                    ctaVariant="arrow"
                    ctaText={content.common.learnMore}
                    className={overviewStyles.resourceCard}
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

      <Box paddingBlockStart={80} paddingBlockEnd={80}>
        <CTABanner align="center" hasGridLines>
          <CTABanner.Logo>
            <LogoGithubIcon size={64} />
          </CTABanner.Logo>
          <CTABanner.Heading>
            {content.cta.headingPrefix} <br /> <b>{content.cta.headingEmphasis}</b>
          </CTABanner.Heading>
          <CTABanner.Description>{content.cta.description}</CTABanner.Description>
          <CTABanner.ButtonGroup>
            <Button>{content.cta.primaryAction}</Button>
          </CTABanner.ButtonGroup>
        </CTABanner>
      </Box>

      <RedlineBackground style={{height: 600, display: 'flex', flexDirection: 'column', gap: 'var(--base-size-32)'}}>
        <RedlineBackground
          style={{height: 84, marginTop: 'auto', backgroundColor: 'var(--brand-color-border-default)'}}
        />
      </RedlineBackground>
    </Box>
  )
}
