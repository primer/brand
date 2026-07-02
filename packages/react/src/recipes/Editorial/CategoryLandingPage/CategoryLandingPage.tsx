import {clsx} from 'clsx'
import React, {useCallback, useState} from 'react'

import {
  Box,
  Card,
  Grid,
  Heading,
  Hero,
  MinimalFooter,
  Pagination,
  Section,
  SubdomainNavBar,
  Text,
  Token,
} from '../../..'
import {RedlineBackground} from '../../../component-helpers'

import {
  defaultEditorialCategoryLandingPageContent,
  type EditorialCategoryLandingPageContent,
} from './CategoryLandingPage.content'
import styles from './CategoryLandingPage.module.css'

export type CategoryLandingPageTemplateProps = {
  content: EditorialCategoryLandingPageContent
}

export function CategoryLandingPage() {
  return <CategoryLandingPageTemplate content={defaultEditorialCategoryLandingPageContent} />
}

export function CategoryLandingPageTemplate({content}: CategoryLandingPageTemplateProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = useCallback((event: React.MouseEvent, pageNumber: number) => {
    event.preventDefault()
    setCurrentPage(pageNumber)
  }, [])

  return (
    <Box className={styles.page} backgroundColor="default">
      <SubdomainNavBar title={content.navigation.title} titleHref="#" fixed={false} fullWidth />

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label={content.sidebar.ariaLabel} />

        <main className={styles.main}>
          <Section paddingBlockStart="none" paddingBlockEnd="none" className={styles.heroSection}>
            <Hero variant="gridline" className={styles.hero}>
              <Hero.Heading size="3">{content.hero.heading}</Hero.Heading>
              <Hero.Description>{content.hero.description}</Hero.Description>
              <Hero.PrimaryAction href="#">{content.hero.primaryAction}</Hero.PrimaryAction>
              <Hero.SecondaryAction href="#">{content.hero.secondaryAction}</Hero.SecondaryAction>
            </Hero>
          </Section>

          <section aria-labelledby="editorial-featured-heading" className={styles.featuredSection}>
            <CardGrid
              cards={content.featured.cards}
              heading={content.featured.heading}
              headingId="editorial-featured-heading"
            />
          </section>

          <Box className={styles.sectionSpacer} aria-hidden />

          <section aria-labelledby="editorial-resources-heading">
            <CardGrid
              cards={content.resources.cards}
              heading={content.resources.heading}
              headingId="editorial-resources-heading"
              sortLabel={content.resources.sortLabel}
              footer={
                <Box className={styles.paginationFrame}>
                  <Pagination
                    pageCount={10}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    aria-label={content.pagination.ariaLabel}
                  />
                </Box>
              }
            />
          </section>

          <RedlineBackground className={styles.redlineBackground}>
            <RedlineBackground className={styles.redlineBase} />
          </RedlineBackground>

          <MinimalFooter socialLinks={false}>
            {content.footer.links.map(link => (
              <MinimalFooter.Link key={link} href="#">
                {link}
              </MinimalFooter.Link>
            ))}
          </MinimalFooter>
        </main>
      </div>
    </Box>
  )
}

type CardGridProps = {
  cards: EditorialCategoryLandingPageContent['featured']['cards']
  heading: string
  headingId: string
  sortLabel?: string
  footer?: React.ReactNode
}

function CardGrid({cards, heading, headingId, sortLabel, footer}: CardGridProps) {
  const lastTabletRowStartIndex = cards.length - (cards.length % 2 || 2)
  const lastDesktopRowStartIndex = cards.length - (cards.length % 3 || 3)

  return (
    <Grid columnGap="none" rowGap="none" enableGutters={false} className={styles.cardGrid}>
      <Grid.Column span={12} className={styles.sectionHeaderColumn}>
        <Box className={clsx(styles.sectionHeader, sortLabel && styles.sectionHeaderWithSort)}>
          <Heading id={headingId} as="h2" size="5" weight="normal">
            {heading}
          </Heading>
          {sortLabel ? (
            <Text size="100" variant="muted" className={styles.sortLabel}>
              {sortLabel}
            </Text>
          ) : null}
        </Box>
      </Grid.Column>
      {cards.map((card, index) => (
        <Grid.Column
          key={card.heading}
          span={{xsmall: 12, medium: 6, large: 4}}
          className={clsx(
            styles.cardGridColumn,
            styles.cardGridColumnArrowHover,
            index % 2 === 1 && styles.cardGridColumnTabletDivider,
            index % 3 !== 0 && styles.cardGridColumnDesktopStartDivider,
            index > 0 && index < cards.length - 1 && styles.cardGridColumnMiddleMobileRow,
            index >= 2 && index < lastTabletRowStartIndex && styles.cardGridColumnMiddleTabletRow,
            index >= 3 && index < lastDesktopRowStartIndex && styles.cardGridColumnMiddleDesktopRow,
          )}
        >
          <Box className={styles.cardGridItem}>
            <Card href={card.href} fullWidth ctaVariant="none" className={styles.resourceCard} backgroundColor="none">
              <Card.Tokens>
                {card.tokens.map((token, tokenIndex) => (
                  <Token key={`${token}-${tokenIndex}`}>{token}</Token>
                ))}
              </Card.Tokens>
              <Card.Heading size="6">{card.heading}</Card.Heading>
              <Card.Description>{card.description}</Card.Description>
            </Card>
          </Box>
        </Grid.Column>
      ))}
      {footer ? (
        <Grid.Column span={12} className={styles.cardGridFooterColumn}>
          {footer}
        </Grid.Column>
      ) : null}
    </Grid>
  )
}
