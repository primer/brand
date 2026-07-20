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
  Stack,
  SubdomainNavBar,
  Text,
  Token,
} from '../../..'
import {RedlineBackground} from '../../../component-helpers'

import {defaultEditorialCategoryContent, type EditorialCategoryContent} from './Category.content'
import editorialStyles from '../Editorial.module.css'
import styles from './Category.module.css'

export type CategoryTemplateProps = {
  content: EditorialCategoryContent
}

export function Category() {
  return <CategoryTemplate content={defaultEditorialCategoryContent} />
}

export function CategoryTemplate({content}: CategoryTemplateProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = useCallback((event: React.MouseEvent, pageNumber: number) => {
    event.preventDefault()
    setCurrentPage(pageNumber)
  }, [])

  return (
    <Box className={editorialStyles.page} backgroundColor="default">
      <SubdomainNavBar title={content.navigation.title} titleHref="#" fixed={false} fullWidth />

      <div className={editorialStyles.layout}>
        <aside className={editorialStyles.sidebar} aria-label={content.sidebar.ariaLabel} />

        <main className={editorialStyles.main}>
          <Section paddingBlockStart="none" paddingBlockEnd="none" className={styles.heroSection}>
            <Hero variant="gridline" className={styles.hero}>
              <Hero.Heading size="3">{content.hero.heading}</Hero.Heading>
              <Hero.Description>{content.hero.description}</Hero.Description>
              <Hero.PrimaryAction href="#">{content.hero.primaryAction}</Hero.PrimaryAction>
              <Hero.SecondaryAction href="#">{content.hero.secondaryAction}</Hero.SecondaryAction>
            </Hero>
          </Section>

          <Box className={styles.sectionSpacer} aria-hidden />

          <Section paddingBlockStart="none" paddingBlockEnd="none" fullWidth className={styles.featuredSection}>
            <CardGrid cards={content.featured.cards} heading={content.featured.heading} />
          </Section>

          <Box className={styles.sectionSpacer} aria-hidden />

          <Section paddingBlockStart="none" paddingBlockEnd="none" fullWidth>
            <CardGrid
              cards={content.resources.cards}
              heading={content.resources.heading}
              sortLabel={content.resources.sortLabel}
              footer={
                <Stack
                  className={styles.paginationFrame}
                  direction="horizontal"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text size="100" variant="muted">
                    Showing 1-12 of 330
                  </Text>

                  <Pagination
                    pageCount={10}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    aria-label={content.pagination.ariaLabel}
                  />
                </Stack>
              }
            />
          </Section>

          <RedlineBackground className={editorialStyles.redlineBackground}>
            <RedlineBackground className={editorialStyles.redlineBase} />
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
  cards: EditorialCategoryContent['featured']['cards']
  heading: string
  sortLabel?: string
  footer?: React.ReactNode
}

function CardGrid({cards, heading, sortLabel, footer}: CardGridProps) {
  const lastTabletRowStartIndex = cards.length - (cards.length % 2 || 2)
  const lastDesktopRowStartIndex = cards.length - (cards.length % 3 || 3)

  return (
    <Grid columnGap="none" rowGap="none" enableGutters={false} className={styles.cardGrid}>
      <Grid.Column span={12} className={styles.sectionHeaderColumn}>
        <Box className={clsx(styles.sectionHeader, sortLabel && styles.sectionHeaderWithSort)}>
          <Heading as="h2" size="5" weight="normal">
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
            cards.length % 2 === 1 && index === cards.length - 1 && styles.cardGridColumnTabletEndDivider,
            cards.length % 2 === 1 &&
              index >= lastTabletRowStartIndex - 2 &&
              index < lastTabletRowStartIndex &&
              styles.cardGridColumnTabletLastCompleteRow,
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
