import React from 'react'

import type {EvergreenTemplate, Content, Section, Slot, Settings} from '../EvergreenTemplate'

import {AnchorNav, Grid, MinimalFooter, SectionIntro, Stack, SubdomainNavBar, ThemeProvider} from '../..'
import {ContentStackBlock, type ContentStackBlockProps} from '../Blocks/ContentStackBlock'
import {FAQBlock, type FAQBlockProps} from '../Blocks/FAQBlock'
import {FeaturedMediaBlock, type FeaturedMediaBlockProps} from '../Blocks/FeaturedMediaBlock'
import {FooterBannerBlock, type FooterBannerBlockProps} from '../Blocks/FooterBannerBlock'
import {HeaderActionsBlock, type HeaderActionsBlockProps} from '../Blocks/HeaderActionsBlock'
import {HeaderHeroBlock, type HeaderHeroBlockProps} from '../Blocks/HeaderHeroBlock'
import {ShowcaseBlock, type ShowcaseBlockProps} from '../Blocks/ShowcaseBlock'

type OakSettings = Settings & {
  showAnchorNav?: boolean
}

type OakContent = Content & {
  sections: {
    header: Section & {
      isRootSection: true
      blocks: {
        headerHero: HeaderHeroBlockProps
        headerActions?: HeaderActionsBlockProps
        featuredMedia?: FeaturedMediaBlockProps
      }

      slots?: {
        header?: Slot
      }
    }

    showcase?: Section & {
      id: string
      title: string
      description: string
      isRootSection: false
      blocks: {
        showcase?: ShowcaseBlockProps
        contentStack?: ContentStackBlockProps
      }
      slots?: {
        showcase?: Slot
      }
    }

    main?: {
      id: string
      title: string
      isRootSection: false
      isCustomContent: true
      content: Section[]
    }

    footer?: Section & {
      isRootSection: true
      blocks: {
        faq?: FAQBlockProps
        footerBanner?: FooterBannerBlockProps
      }
      slots?: {
        footer?: Slot
      }
    }
  }
}

export type OakTemplateProps = EvergreenTemplate & {
  settings?: OakSettings
  content: OakContent
}

export const oakDefaultSettings: OakSettings = {
  showAnchorNav: false,
}

export const oakDefaultTheme: OakTemplateProps['theme'] = {
  colorMode: 'light',
}

export function OakTemplate({
  content,
  navigation,
  siteMetadata,
  settings = oakDefaultSettings,
  theme = oakDefaultTheme,
}: OakTemplateProps) {
  const nonRootSections = Object.values(content.sections).filter(s => !s.isRootSection)
  const {
    header: headerSection,
    showcase: showcaseSection,
    // customSections: customSections,
    footer: footerSection,
  } = content.sections
  const _settings = {...oakDefaultSettings, ...settings}
  const _theme = {...oakDefaultTheme, ...theme}

  const themeStyles = {
    backgroundColor: _theme.background?.color || 'var(--brand-color-canvas-default)',
    backgroundImage: _theme.background?.image && `url(${_theme.background.image.src})`,
    backgroundRepeat: _theme.background?.image?.repeat ? 'repeat' : 'no-repeat',
    backgroundSize: _theme.background?.image?.size || 'cover',
    backgroundPosition: _theme.background?.image?.position || 'top center',
  }

  return (
    <ThemeProvider colorMode={_theme.colorMode} style={themeStyles}>
      {/* TODO replace with Box component when available to avoid style overrides */}
      <Stack gap="none" padding="none" style={{paddingBlockStart: 80}}>
        {/* Page header ----------------------------------------------- */}
        <SubdomainNavBar title={siteMetadata.title}>
          {navigation.items &&
            navigation.items.map(({href, title}, index) => (
              <SubdomainNavBar.Link key={index} href={href}>
                {title}
              </SubdomainNavBar.Link>
            ))}
        </SubdomainNavBar>
        {/* Main content ----------------------------------------------- */}
        <main role="main" aria-label="Content">
          <Stack gap={128} padding="none">
            <Stack gap="none" padding="none">
              {/* Header hero */}
              <HeaderHeroBlock {...headerSection.blocks.headerHero} />

              {/* Featured media */}
              {headerSection.blocks.featuredMedia && <FeaturedMediaBlock {...headerSection.blocks.featuredMedia} />}

              {/* AnchorNav */}
              {_settings.showAnchorNav && nonRootSections.length > 1 && (
                <AnchorNav aria-label="Anchor navigation">
                  {nonRootSections.map(({id, title}) => (
                    <AnchorNav.Link key={id} href={`#${id}`}>
                      {title}
                    </AnchorNav.Link>
                  ))}
                </AnchorNav>
              )}

              {/* Header actions */}
              {headerSection.blocks.headerActions && (
                // TODO replace with Box component when available to avoid style overrides
                <Stack gap="none" padding="none" style={{paddingBlockStart: 128}}>
                  <HeaderActionsBlock {...headerSection.blocks.headerActions} />
                </Stack>
              )}

              {/* Header slot */}
              {headerSection.slots?.header}
            </Stack>

            {/* Showcase section */}

            {showcaseSection && (
              <section key={showcaseSection.id} id={showcaseSection.id}>
                <Stack gap="none" padding="none">
                  <Grid>
                    <Grid.Column>
                      <SectionIntro align="center">
                        <SectionIntro.Heading>{showcaseSection.title}</SectionIntro.Heading>
                        <SectionIntro.Description>{showcaseSection.description}</SectionIntro.Description>
                      </SectionIntro>
                    </Grid.Column>
                  </Grid>

                  <Stack gap={96} padding="none">
                    {/* Showcase */}
                    {showcaseSection.blocks.showcase && <ShowcaseBlock {...showcaseSection.blocks.showcase} />}

                    {/* Content stack */}
                    {showcaseSection.blocks.contentStack && (
                      <ContentStackBlock accentColor={_theme.accentColor} {...showcaseSection.blocks.contentStack} />
                    )}
                  </Stack>
                </Stack>
              </section>
            )}

            {/* Page header ----------------------------------------------- */}

            {footerSection && (
              <Stack gap={96} padding="none">
                {/* Footer slot */}
                {footerSection.slots?.footer}

                {/* FAQ */}
                {footerSection.blocks.faq && <FAQBlock {...footerSection.blocks.faq} />}

                {/* Footer banner */}
                {footerSection.blocks.footerBanner && <FooterBannerBlock {...footerSection.blocks.footerBanner} />}
              </Stack>
            )}
          </Stack>
        </main>
        {/* Page footer ----------------------------------------------- */}
        {/* TODO replace with Box component when available to avoid style overrides */}
        <Stack gap="none" padding="none" style={{paddingBlockStart: 128}}>
          <MinimalFooter />
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}
