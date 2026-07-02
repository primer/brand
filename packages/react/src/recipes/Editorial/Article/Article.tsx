import {clsx} from 'clsx'
import {MarkGithubIcon, XIcon} from '@primer/octicons-react'
import React from 'react'

import {
  ActionMenu,
  Box,
  Card,
  Grid,
  Heading,
  Hero,
  InlineLink,
  MinimalFooter,
  Prose,
  Section,
  Stack,
  SubdomainNavBar,
  Text,
  Token,
} from '../../..'
import {RedlineBackground} from '../../../component-helpers'

import {defaultEditorialArticleContent, type EditorialArticleContent} from './Article.content'
import editorialStyles from '../Editorial.module.css'
import styles from './Article.module.css'

export type ArticleTemplateProps = {
  content: EditorialArticleContent
}

export function Article() {
  return <ArticleTemplate content={defaultEditorialArticleContent} />
}

export function ArticleTemplate({content}: ArticleTemplateProps) {
  return (
    <Box className={editorialStyles.page} backgroundColor="default">
      <SubdomainNavBar title={content.navigation.title} titleHref="#" fixed={false} fullWidth />

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label={content.sidebar.ariaLabel} />

        <main className={styles.main}>
          <article>
            <Section paddingBlockStart="none" paddingBlockEnd="none" className={styles.headerSection}>
              <Hero variant="gridline" className={styles.articleHero}>
                <Stack alignItems="flex-start" gap="normal">
                  <ActionMenu mode="split-button" size="small">
                    <ActionMenu.Button variant="secondary" as="a" href="#copy-markdown">
                      {content.article.copyMarkdownLabel}
                    </ActionMenu.Button>
                    <ActionMenu.Overlay aria-label={content.article.copyMarkdownMenuLabel}>
                      {content.article.copyMarkdownOptions.map(option => (
                        <ActionMenu.Item key={option.label} as="a" href={option.href}>
                          {option.label}
                        </ActionMenu.Item>
                      ))}
                    </ActionMenu.Overlay>
                  </ActionMenu>
                  <Hero.Heading size="3" weight="normal">
                    {content.article.heading}
                  </Hero.Heading>
                </Stack>

                <Hero.Description size="300">{content.article.description}</Hero.Description>
              </Hero>
            </Section>

            <Box className={styles.sectionSpacer} aria-hidden />

            <Section paddingBlockStart="none" paddingBlockEnd="none" fullWidth className={styles.bodySection}>
              <div className={styles.articleBody}>
                {content.article.introSections.map(section => (
                  <ArticleContentBlock key={section.heading} heading={section.heading} body={section.body} />
                ))}

                <Grid columnGap="none" rowGap="none" className={styles.articleGrid}>
                  <Grid.Column span={12} className={styles.articleColumn}>
                    <div className={styles.contentBlock}>
                      <div className={styles.steps}>
                        {content.article.steps.map(step => (
                          <ArticleStep key={step.number} step={step} />
                        ))}
                      </div>

                      <CodeExample codeExample={content.article.codeExample} />
                      <ProTip proTip={content.article.proTip} />
                    </div>
                  </Grid.Column>
                </Grid>

                <Grid columnGap="none" rowGap="none" className={styles.articleGrid}>
                  <Grid.Column span={12} className={styles.articleColumn}>
                    <RelatedArticles related={content.article.related} />
                  </Grid.Column>
                </Grid>
              </div>
            </Section>
          </article>

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

        <aside
          className={clsx(styles.sidebar, styles.secondarySidebar)}
          aria-label={content.secondarySidebar.ariaLabel}
        />
      </div>
    </Box>
  )
}

function ArticleContentBlock({
  heading,
  body,
}: {
  heading: string
  body: EditorialArticleContent['article']['introSections'][number]['body']
}) {
  const headingId = `editorial-article-${heading.toLowerCase().replace(/\W+/g, '-')}`
  const proseHtml = [
    // eslint-disable-next-line github/unescaped-html-literal
    '<h2 id="',
    escapeHtml(headingId),
    '">',
    escapeHtml(heading),
    '</h2><p>',
    escapeHtml(body),
    '</p>',
  ].join('')

  return (
    <Grid columnGap="none" rowGap="none" className={styles.articleGrid}>
      <Grid.Column span={12} className={styles.articleColumn}>
        <Prose variant="editorial" enableFullWidth html={proseHtml} />
      </Grid.Column>
    </Grid>
  )
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function ArticleStep({step}: {step: EditorialArticleContent['article']['steps'][number]}) {
  return (
    <div className={styles.step}>
      <span className={styles.stepNumber}>{step.number}</span>
      <div className={styles.stepContent}>
        {step.text ? (
          <Text as="p" size="200">
            {step.text}
          </Text>
        ) : (
          <Text as="p" size="200">
            {step.beforeText} {step.code ? <code className={styles.inlineCode}>{step.code}</code> : null}{' '}
            {step.afterText} {step.strongText ? <strong>{step.strongText}</strong> : null}.
          </Text>
        )}

        {step.image ? (
          <figure className={styles.imageFigure}>
            <div className={styles.imagePlaceholder}>
              <Text as="span" size="100">
                {step.image.label}
              </Text>
            </div>
            <figcaption>
              <Text as="span" size="100" variant="muted">
                {step.image.caption}
              </Text>
            </figcaption>
          </figure>
        ) : null}

        {step.list ? (
          <ul className={styles.stepList}>
            {step.list.map(item => (
              <li key={item}>
                <Text as="span" size="200">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

function CodeExample({codeExample}: {codeExample: EditorialArticleContent['article']['codeExample']}) {
  return (
    <section className={styles.codeExample} aria-labelledby="editorial-article-code-example">
      <div className={styles.codeExampleHeader}>
        <Heading as="h2" size="6" id="editorial-article-code-example">
          {codeExample.title}
        </Heading>
        <div className={styles.codeExampleTabs} aria-hidden="true">
          <span>{codeExample.tabs.inline}</span>
          <span className={styles.codeExampleTabSelected}>{codeExample.tabs.beside}</span>
        </div>
      </div>
      <div className={styles.codeExampleBody}>
        <ol className={styles.codeLines}>
          {codeExample.lines.map((line, index) => (
            <li key={`${line}-${index}`}>
              <code>{line || ' '}</code>
            </li>
          ))}
        </ol>
        <div className={styles.codeExampleAside}>
          <Text as="p" size="100">
            {codeExample.aside.description}
          </Text>
          <Text as="p" size="100">
            <InlineLink href={codeExample.aside.linkHref}>{codeExample.aside.linkLabel}</InlineLink>{' '}
            {codeExample.aside.continuation}
          </Text>
          <Text as="p" size="100">
            {codeExample.aside.snippetLabel}
            <br />
            <code>{codeExample.aside.snippet}</code>
          </Text>
          <Text as="p" size="100">
            {codeExample.aside.footer}
          </Text>
        </div>
      </div>
    </section>
  )
}

function ProTip({proTip}: {proTip: EditorialArticleContent['article']['proTip']}) {
  return (
    <aside className={styles.proTip}>
      <div className={styles.proTipHeader}>
        <span className={styles.proTipTitle}>
          <MarkGithubIcon size={20} aria-hidden="true" />
          <Text as="span" size="200" weight="semibold">
            {proTip.title}
          </Text>
        </span>
        <button className={styles.iconButton} type="button" aria-label={proTip.dismissLabel}>
          <XIcon size={16} aria-hidden="true" />
        </button>
      </div>
      <div className={styles.proTipBody}>
        <Text as="p" size="100">
          {proTip.snippetLabel} <code className={styles.inlineCode}>{proTip.snippet}</code> {proTip.suffix}
        </Text>
        <Text as="p" size="100">
          {proTip.body}
        </Text>
        <InlineLink href={proTip.linkHref}>{proTip.linkLabel}</InlineLink>
      </div>
    </aside>
  )
}

function RelatedArticles({related}: {related: EditorialArticleContent['article']['related']}) {
  return (
    <section className={styles.relatedArticles} aria-labelledby="editorial-article-related">
      <div className={styles.relatedArticlesHeader}>
        <Heading as="h2" size="6" weight="normal" id="editorial-article-related">
          {related.heading}
        </Heading>
      </div>
      <div className={styles.relatedCards}>
        {related.cards.map(card => (
          <Card key={card.heading} href={card.href} fullWidth ctaVariant="none" backgroundColor="none">
            <Card.Tokens>
              {card.tokens.map((token, index) => (
                <Token key={`${token}-${index}`}>{token}</Token>
              ))}
            </Card.Tokens>
            <Card.Heading size="6">{card.heading}</Card.Heading>
            <Card.Description>{card.description}</Card.Description>
          </Card>
        ))}
      </div>
    </section>
  )
}
