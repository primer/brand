import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import PageFooter from '@primer/gatsby-theme-doctocat/src/components/page-footer'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import SourceLink from '@primer/gatsby-theme-doctocat/src/components/source-link'
import StorybookLink from '@primer/gatsby-theme-doctocat/src/components/storybook-link'
import {AccessibilityLabel} from '@primer/gatsby-theme-doctocat'
import {Box as PRCBox, Heading, Text} from '@primer/react'
import React from 'react'
import {BaseLayout} from './base-layout'
import {ComponentPageNav} from '../components/component-page-nav'

import styles from './component-layout.module.css'

/** Convert a string to sentence case. */
function sentenceCase(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })
}

export default function ComponentLayout({pageContext, children, path}) {
  const {title, description, reactId, status, a11yReviewed, source, storybook} =
    pageContext.frontmatter
  const pathParts = path.split('/')
  const isReactPage = pathParts[pathParts.length - 1] === 'react'
  const basePath = isReactPage ? pathParts.slice(0, -1).join('/') : path

  return (
    <BaseLayout title={title} description={description}>
      <PRCBox sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7], mx: 'auto'}}>
        <Heading as="h1" sx={{fontSize: 7}}>
          {title}
        </Heading>
        {description ? (
          <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
            {description}
          </Text>
        ) : null}
        <PRCBox sx={{mb: 4}}>
          <ComponentPageNav
            basePath={basePath}
            current={isReactPage ? 'react' : 'overview'}
          />
        </PRCBox>
        <PRCBox
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'start',
            gap: [null, 7, 8, 9],
          }}
        >
          <PRCBox
            sx={{
              width: 220,
              flex: '0 0 auto',
              position: 'sticky',
              top: HEADER_HEIGHT + 24,
              maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - 24px)`,
              display: ['none', null, 'block'],
            }}
          >
            {pageContext.tableOfContents.items ? (
              <>
                <Heading
                  as="h3"
                  sx={{
                    fontSize: 1,
                    display: 'inline-block',
                    fontWeight: 'bold',
                    pl: 3,
                  }}
                  id="toc-heading"
                >
                  On this page
                </Heading>
                <TableOfContents
                  aria-labelledby="toc-heading"
                  items={pageContext.tableOfContents.items}
                />
              </>
            ) : null}
          </PRCBox>
          <PRCBox sx={{minWidth: 0}}>
            {isReactPage && (
              <PRCBox
                className={styles.container}
                sx={{
                  display: 'flex',
                  flexDirection: ['column', null, null, null, 'row'],
                  gap: 3,
                  mb: 4,
                }}
              >
                {a11yReviewed && (
                  <PRCBox
                    as={'ul'}
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                      alignItems: 'center',
                      m: 0,
                      p: 0,
                      paddingInline: 0,
                      listStyle: 'none',
                      '& > li': {
                        display: 'flex',
                      },
                    }}
                  >
                    <li>
                      <AccessibilityLabel
                        a11yReviewed={a11yReviewed}
                        short={false}
                      />
                    </li>
                  </PRCBox>
                )}

                <PRCBox
                  as={'ul'}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    alignItems: 'center',
                    m: 0,
                    p: 0,
                    paddingInline: 0,
                    listStyle: 'none',
                    fontSize: 1,
                    '& > li': {
                      display: 'flex',
                    },
                  }}
                >
                  <SourceLink href={source} />
                  <StorybookLink href={storybook} />
                </PRCBox>
              </PRCBox>
            )}
            {/* Narrow table of contents */}
            {pageContext.tableOfContents.items ? (
              <PRCBox
                sx={{
                  display: ['block', null, 'none'],
                  mb: 5,
                  borderColor: 'border.muted',
                  bg: 'canvas.subtle',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: 2,
                }}
              >
                <PRCBox sx={{px: 3, py: 2}}>
                  <PRCBox
                    sx={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <Heading
                      as="h3"
                      sx={{fontSize: 1, fontWeight: 'bold'}}
                      id="toc-heading-narrow"
                    >
                      On this page
                    </Heading>
                  </PRCBox>
                </PRCBox>
                <PRCBox
                  sx={{borderTop: '1px solid', borderColor: 'border.muted'}}
                >
                  <TableOfContents
                    aria-labelledby="toc-heading-narrow"
                    items={pageContext.tableOfContents.items}
                  />
                </PRCBox>
              </PRCBox>
            ) : null}
            <PRCBox
              sx={{
                '& > :first-child': {
                  mt: 0,
                },
                '& > :last-child': {
                  mb: 0,
                },
              }}
            >
              {children}
            </PRCBox>
          </PRCBox>
        </PRCBox>
        <PageFooter
          editUrl={pageContext.editUrl}
          contributors={pageContext.contributors}
        />
      </PRCBox>
    </BaseLayout>
  )
}
