import React, {useCallback, useEffect, useState} from 'react'
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'
import {Box, Button, Heading, HeadingProps, Stack, Text} from '../../../'

import styles from './Article.module.css'
import {contentMap} from './article-shared'

const AsideHeading = ({as = 'h2', ...props}: HeadingProps) => (
  <Heading as={as} size="subhead-medium" font="monospace" className={styles.asideHeading} weight="normal" {...props} />
)

export const ArticleToC = ({content = 'real-world'}) => {
  const [currVisibleHeading, setCurrVisibleHeading] = React.useState<string | undefined>()

  const allContent = contentMap[content]
  const [narrowMenuOpen, setNarrowMenuOpen] = useState(false)
  const [narrowScrolledPastHeading, setNarrowScrolledPastHeading] = useState(false)

  const mergedContent = allContent.join('')
  const headings = mergedContent.match(/<h[2-4].*?>(.*?)<\/h[2-6]>/g) || []
  const toc = headings.map(heading => {
    const sanitizeHTML = (input: string) => {
      const doc = new DOMParser().parseFromString(input, 'text/html')
      const scripts = doc.querySelectorAll('script')
      for (const script of scripts) {
        script.remove()
      }
      return doc.body.textContent || ''
    }

    const level = parseInt(heading[2])
    const text = sanitizeHTML(heading)

    return {
      level,
      text,
      id: text
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\s-]/g, ''), // Remove special chars like ? and !
    }
  })

  const handleNarrowMenu = () => {
    setNarrowMenuOpen(!narrowMenuOpen)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrVisibleHeading(entry.target.id || undefined)
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.5,
      },
    )

    const chosenHeadings = Array.from(document.querySelectorAll('h2, h3, h4'))
    for (const heading of chosenHeadings) {
      observer.observe(heading)
    }
  }, [])

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setNarrowMenuOpen(false)
      }
    }

    if (narrowMenuOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => window.removeEventListener('keydown', handleEscape)
  }, [narrowMenuOpen])

  useEffect(() => {
    const threshold = 0
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      setNarrowScrolledPastHeading(scrollY > lastScrollY ? false : true)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkPress = useCallback(() => {
    setNarrowMenuOpen(!narrowMenuOpen)
  }, [setNarrowMenuOpen, narrowMenuOpen])

  return (
    <nav aria-labelledby="table-of-contents-heading">
      <Stack
        direction="vertical"
        gap={64}
        padding="none"
        className={clsx(
          styles.asideContent,
          narrowMenuOpen && styles['asideContent--open'],
          narrowScrolledPastHeading && styles['asideContent--visible'],
        )}
      >
        <Stack direction="vertical" padding="none" gap={24}>
          <Stack direction="horizontal" padding="none" justifyContent="space-between" alignItems="center">
            <AsideHeading id="table-of-contents-heading">Table of contents</AsideHeading>
            <button className={styles.tableOfContentsMenuToggle} onClick={handleNarrowMenu}>
              {narrowMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
          </Stack>
          <div className={clsx(styles.tableOfContentsNav, narrowMenuOpen && styles['tableOfContentsNav--visible'])}>
            <ol className={styles.tableOfContentsList}>
              {toc.map(({text, id}) => {
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={handleLinkPress}
                      aria-current={currVisibleHeading === id ? 'location' : undefined}
                    >
                      <Text
                        variant={currVisibleHeading === id ? 'default' : 'muted'}
                        size="100"
                        weight={currVisibleHeading === id ? 'medium' : 'normal'}
                      >
                        {text}
                      </Text>
                    </a>
                  </li>
                )
              })}
            </ol>
          </div>
        </Stack>

        <Box
          paddingBlockStart={8}
          borderBlockStartWidth="thin"
          borderStyle="solid"
          borderColor="muted"
          className={clsx(
            styles.tableOfContentsFeaturesBox,
            narrowMenuOpen && styles['tableOfContentsFeaturesBox--visible'],
          )}
        >
          <AsideHeading as="h3">Featured</AsideHeading>
          <Box marginBlockStart={24}>
            <Box marginBlockEnd={4}>
              <Heading as="h4" size="subhead-medium">
                GitHub Copilot
              </Heading>
            </Box>
            <Text as="p" size="100" variant="muted">
              AI coding assistant elevating developer workflows
            </Text>
          </Box>
          <Box marginBlockStart={16}>
            <Button size="small" variant="primary">
              Try Copilot
            </Button>
          </Box>
        </Box>
      </Stack>
    </nav>
  )
}
