import React from 'react'

import {Box, Grid, MinimalFooter, Section, SectionIntro, SubdomainNavBar, Text} from '../../..'
import {RedlineBackground} from '../../../component-helpers'

import {
  defaultEditorialResultsContent,
  type EditorialResultContent,
  type EditorialResultsContent,
} from './Results.content'
import editorialStyles from '../Editorial.module.css'
import styles from './Results.module.css'

export type ResultsTemplateProps = {
  content: EditorialResultsContent
}

export function Results() {
  return <ResultsTemplate content={defaultEditorialResultsContent} />
}

export function ResultsTemplate({content}: ResultsTemplateProps) {
  return (
    <Box className={editorialStyles.page} backgroundColor="default">
      <SubdomainNavBar title={content.navigation.title} titleHref="#" fixed={false} fullWidth />

      <div className={editorialStyles.layout}>
        <aside className={editorialStyles.sidebar} aria-label={content.sidebar.ariaLabel} />

        <main className={editorialStyles.main}>
          <Section paddingBlockStart="none" paddingBlockEnd="none" fullWidth>
            <Grid columnGap="none" rowGap="none" enableGutters={false} className={styles.resultsGrid}>
              <Grid.Column span={12} className={styles.resultsColumn}>
                <SectionIntro fullWidth className={styles.resultsHeadingFrame}>
                  <SectionIntro.Heading as="h1" size="3" weight="normal" textWrap="wrap">
                    {content.results.heading}
                  </SectionIntro.Heading>
                </SectionIntro>
              </Grid.Column>
              <Grid.Column span={12} className={styles.resultsColumn}>
                <ol className={styles.resultsList} aria-label={content.results.ariaLabel}>
                  {content.results.items.map((result, index) => (
                    <ResultItem key={`${result.heading}-${index}`} result={result} />
                  ))}
                </ol>
              </Grid.Column>
            </Grid>
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

function ResultItem({result}: {result: EditorialResultContent}) {
  return (
    <li className={styles.resultsListItem}>
      <a href={result.href} className={styles.resultLink}>
        <div className={styles.resultHeader}>
          <Text as="span" size="200" weight="semibold" className={styles.resultTitle}>
            {result.heading}
          </Text>
          <div className={styles.resultTokens}>
            {result.tokens.map(token => (
              <ResultToken key={token} token={token} />
            ))}
          </div>
        </div>
        <Text as="p" size="100" variant="muted" className={styles.resultDescription}>
          {result.description}
        </Text>
      </a>
    </li>
  )
}

function ResultToken({token}: {token: string}) {
  const hasMutedPrefix = token.startsWith('...')

  return (
    <span className={styles.resultToken}>
      <span className={styles.resultTokenText}>
        {hasMutedPrefix ? <span className={styles.overflowTokenPrefix}>...</span> : null}
        {hasMutedPrefix ? token.replace('...', '') : token}
      </span>
    </span>
  )
}
