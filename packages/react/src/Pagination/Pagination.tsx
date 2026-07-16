import React, {memo, useCallback} from 'react'
import {Button, useWindowSize} from '..'

import {clsx} from 'clsx'

import {ExpandableArrow} from '../ExpandableArrow'
import {buildPaginationModel, PaginationPageType} from './model'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Pagination.module.css'

export type PaginationProps = {
  /* The total number of pages */
  pageCount: number
  /* The current page number */
  currentPage: number
  /* Callback function for when the page changes */
  onPageChange?: (e: React.MouseEvent, n: number) => void
  /* Function to build the href for each page */
  hrefBuilder?: (n: number) => string
  /* Function to forward custom attributes for each pagination item */
  pageAttributesBuilder?: (n: number, page: PaginationPageType) => {[attributeName: string]: string}
  /* Defines how many pages are to be displayed on the left and right of the component */
  marginPageCount?: number
  /* Whether to show the page numbers */
  showPages?: boolean
  /* The number of pages to show on each side of the current page */
  surroundingPageCount?: number
  /* Custom text labels for the pagination controls. Use for localization. */
  labels?: {
    prev?: string
    next?: string
    prevAriaLabel?: string
    nextAriaLabel?: string
  }
  'data-testid'?: string
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>

const defaultPaginationLabels = {
  prev: 'Previous',
  next: 'Next',
  prevAriaLabel: 'Previous Page',
  nextAriaLabel: 'Next Page',
}

/**
 * Use Pagination to display a sequence of links that allow navigation to discrete, related pages.
 * @see https://primer.style/brand/components/Pagination
 */
export const Pagination = memo(
  ({
    id,
    className,
    pageCount,
    currentPage,
    onPageChange,
    hrefBuilder = defaultHrefBuilder,
    pageAttributesBuilder,
    marginPageCount = 1,
    showPages = true,
    surroundingPageCount = 2,
    labels,
    'aria-label': ariaLabel,
    'data-testid': testId,
    ...rest
  }: PaginationProps) => {
    // On mobile, limit the number of visible numbers
    const {width} = useWindowSize()
    if (width && width < 768) {
      marginPageCount = 1
      surroundingPageCount = 0
    }

    const prevLabel = labels?.prev ?? defaultPaginationLabels.prev
    const nextLabel = labels?.next ?? defaultPaginationLabels.next
    const prevAriaLabel = labels?.prevAriaLabel ?? defaultPaginationLabels.prevAriaLabel
    const nextAriaLabel = labels?.nextAriaLabel ?? defaultPaginationLabels.nextAriaLabel

    const navRef = React.useRef<HTMLElement>(null)

    const pageChange = useCallback(
      (n: number) => (e: React.MouseEvent) => {
        if (onPageChange) {
          onPageChange(e, n)
        }
      },
      [onPageChange],
    )

    const paginationItems = React.useMemo(() => {
      const model = buildPaginationModel(pageCount, currentPage, showPages, marginPageCount, surroundingPageCount)

      return model.map(page => {
        return (
          <PaginationItem
            key={`${page.type}-${page.num}`}
            page={page}
            hrefBuilder={hrefBuilder}
            pageAttributesBuilder={pageAttributesBuilder}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
            prevAriaLabel={prevAriaLabel}
            nextAriaLabel={nextAriaLabel}
            onClick={pageChange(page.num)}
          />
        )
      })
    }, [
      pageCount,
      currentPage,
      showPages,
      marginPageCount,
      surroundingPageCount,
      hrefBuilder,
      pageAttributesBuilder,
      prevLabel,
      nextLabel,
      prevAriaLabel,
      nextAriaLabel,
      pageChange,
    ])

    return (
      <nav
        ref={navRef}
        id={id}
        className={clsx(styles.Pagination, className)}
        data-testid={testId}
        aria-label={ariaLabel || 'Pagination'}
        {...rest}
      >
        <div className={clsx(styles.Pagination__inner)}>{paginationItems}</div>
      </nav>
    )
  },
)

type PaginationItemProps = {
  page: PaginationPageType
  hrefBuilder: (n: number) => string
  pageAttributesBuilder?: (n: number, page: PaginationPageType) => {[key: string]: string}
  prevLabel: string
  nextLabel: string
  prevAriaLabel: string
  nextAriaLabel: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const PaginationItem = ({
  page,
  hrefBuilder,
  pageAttributesBuilder,
  prevLabel,
  nextLabel,
  prevAriaLabel,
  nextAriaLabel,
  onClick,
}: PaginationItemProps) => {
  const [isArrowExpanded, setIsArrowExpanded] = React.useState(false)

  const baseProps = {
    role: 'button',
    size: 'small' as const,
    variant: 'subtle' as const,
    onClick: page.disabled ? undefined : onClick,
  }

  const customProps = pageAttributesBuilder?.(page.num, page)
  const {className: customClassName, ...customAttributes} = customProps ?? {}

  switch (page.type) {
    case 'PREV': {
      return (
        <Button
          {...baseProps}
          as="a"
          rel="prev"
          href={page.disabled ? undefined : hrefBuilder(page.num)}
          aria-disabled={page.disabled || undefined}
          aria-label={prevAriaLabel}
          {...customAttributes}
          className={clsx(styles.Pagination__controlItem, customClassName)}
          onMouseEnter={() => setIsArrowExpanded(true)}
          onMouseLeave={() => setIsArrowExpanded(false)}
          onFocus={() => setIsArrowExpanded(true)}
          onBlur={() => setIsArrowExpanded(false)}
        >
          <span className={styles.Pagination__controlContent}>
            <span
              className={clsx(
                styles.Pagination__controlArrowWrapper,
                styles['Pagination__controlArrowWrapper--previous'],
              )}
            >
              <ExpandableArrow
                hidden
                reverse
                expanded={!page.disabled && isArrowExpanded}
                className={styles.Pagination__controlArrow}
              />
            </span>
            <span className={styles.Pagination__controlText}>{prevLabel}</span>
          </span>
        </Button>
      )
    }
    case 'NEXT': {
      return (
        <Button
          {...baseProps}
          as="a"
          rel="next"
          href={page.disabled ? undefined : hrefBuilder(page.num)}
          aria-disabled={page.disabled || undefined}
          aria-label={nextAriaLabel}
          {...customAttributes}
          className={clsx(styles.Pagination__controlItem, customClassName)}
          onMouseEnter={() => setIsArrowExpanded(true)}
          onMouseLeave={() => setIsArrowExpanded(false)}
          onFocus={() => setIsArrowExpanded(true)}
          onBlur={() => setIsArrowExpanded(false)}
        >
          <span className={styles.Pagination__controlContent}>
            <span className={styles.Pagination__controlText}>{nextLabel}</span>
            <span
              className={clsx(styles.Pagination__controlArrowWrapper, styles['Pagination__controlArrowWrapper--next'])}
            >
              <ExpandableArrow
                hidden
                expanded={!page.disabled && isArrowExpanded}
                className={styles.Pagination__controlArrow}
              />
            </span>
          </span>
        </Button>
      )
    }
    case 'NUM': {
      return (
        /**
         * Append "..." to the aria-label for pages that precede a break because screen readers will change the
         * tone the text is read in. This is a slightly nicer experience than skipping a bunch of numbers unexpectedly.
         */
        <Button
          {...baseProps}
          as="a"
          variant={page.selected ? 'primary' : 'subtle'}
          className={clsx(styles.Pagination__pageItem, customClassName)}
          href={hrefBuilder(page.num)}
          aria-label={`Page ${page.num}${page.precedesBreak ? '...' : ''}`}
          aria-current={page.selected ? 'page' : undefined}
          {...customAttributes}
        >
          {page.num}
        </Button>
      )
    }
    case 'BREAK': {
      return (
        <Button
          {...baseProps}
          as="a"
          className={clsx(styles.Pagination__pageItem, customClassName)}
          variant="subtle"
          role="presentation"
          href={undefined}
          onClick={undefined}
          {...customAttributes}
        >
          …
        </Button>
      )
    }
  }
}

function defaultHrefBuilder(pageNum: number) {
  return `#${pageNum}`
}
