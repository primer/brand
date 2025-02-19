import React, {memo, PropsWithChildren, useCallback} from 'react'
import {Link, Text} from '..'

import {default as clsx} from 'clsx'

import type {BaseProps} from '../component-helpers'
import {buildComponentData, buildPaginationModel} from './model'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pagination/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Pagination.module.css'

type ResponsivePageVisibilityMap = {
  narrow?: boolean
  regular?: boolean
  wide?: boolean
}

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
  pageAttributesBuilder?: (n: number) => {[attributeName: string]: string}
  /* Defines how many pages are to to be displayed on the left and right of the component */
  marginPageCount?: number
  /* Whether to show the page numbers */
  showPages?: boolean | ResponsivePageVisibilityMap
  /* The number of pages to show on each side of the current page */
  surroundingPageCount?: number
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLElement>> &
  React.HTMLAttributes<HTMLElement>

/**
 * Use Pagination to display a sequence of links that allow navigation to discrete, related pages.
 * @see https://primer.style/brand/components/Pagination
 */
export const Pagination = memo(
  ({
    id,
    children,
    className,
    pageCount,
    currentPage,
    onPageChange,
    hrefBuilder = defaultHrefBuilder,
    pageAttributesBuilder,
    marginPageCount = 1,
    showPages = {narrow: false, regular: true, wide: true},
    surroundingPageCount = 2,
    'aria-label': ariaLabel,
    'data-testid': testId,
    ...rest
  }: PaginationProps) => {
    const navRef = React.useRef<HTMLElement>(null)
    const pageElements = usePaginationPages({
      pageCount,
      currentPage,
      onPageChange,
      hrefBuilder,
      pageAttributesBuilder,
      marginPageCount,
      showPages,
      surroundingPageCount,
    })

    const getSummaryClasses = useCallback(() => {
      if (showPages === true) {
        return styles['Pagination__hidden']
      } else if (typeof showPages === 'object') {
        return Object.entries(showPages).reduce<string[]>((acc, [key, value]) => {
          if (value) {
            acc.push(styles[`Pagination__hidden-${key as 'narrow' | 'regular' | 'wide'}`])
          } else {
            acc.push(styles[`Pagination__visible-${key as 'narrow' | 'regular' | 'wide'}`])
          }
          return acc
        }, [])
      }

      return styles['Pagination__visible']
    }, [showPages])

    return (
      <nav
        ref={navRef}
        id={id}
        className={clsx(styles.Pagination, className)}
        data-testid={testId}
        aria-label={ariaLabel || 'Pagination'}
        {...rest}
      >
        <Text className={clsx(styles.Pagination__summary, getSummaryClasses())}>
          {`Showing page ${currentPage} of ${pageCount}`}
        </Text>
        <div className={clsx(styles.Pagination__inner)}>{pageElements}</div>
      </nav>
    )
  },
)

type UsePaginationPagesParameters = {
  pageCount: number
  currentPage: number
  onPageChange?: (e: React.MouseEvent, n: number) => void
  hrefBuilder: (n: number) => string
  pageAttributesBuilder?: (n: number) => {[key: string]: string}
  marginPageCount: number
  showPages: PaginationProps['showPages']
  surroundingPageCount: number
}

export function usePaginationPages({
  pageCount,
  currentPage,
  onPageChange,
  hrefBuilder,
  pageAttributesBuilder,
  marginPageCount,
  showPages,
  surroundingPageCount,
}: UsePaginationPagesParameters) {
  const pageChange = useCallback(
    (n: number) => (e: React.MouseEvent) => {
      if (onPageChange) {
        onPageChange(e, n)
      }
    },
    [onPageChange],
  )

  const getPagesClasses = useCallback(() => {
    if (showPages === false) {
      return styles['Pagination--hidden']
    }

    if (typeof showPages === 'object') {
      return Object.entries(showPages).reduce<string[]>((acc, [key, value]) => {
        if (value) {
          acc.push(styles[`Pagination__visible-${key as 'narrow' | 'regular' | 'wide'}`])
        } else {
          acc.push(styles[`Pagination__hidden-${key as 'narrow' | 'regular' | 'wide'}`])
        }
        return acc
      }, [])
    }
  }, [showPages])

  const model = React.useMemo(() => {
    return buildPaginationModel(pageCount, currentPage, !!showPages, marginPageCount, surroundingPageCount)
  }, [pageCount, currentPage, showPages, marginPageCount, surroundingPageCount])

  const children = React.useMemo(() => {
    return model.map(page => {
      const {props, key, content} = buildComponentData(page, hrefBuilder, pageChange(page.num))

      const customAttributes = pageAttributesBuilder ? pageAttributesBuilder(page.num) : {}

      if (props.rel === 'next' || props.rel === 'prev') {
        return (
          <Link
            key={key}
            arrowDirection={props.rel === 'prev' ? 'start' : 'end'}
            size="medium"
            className={clsx(styles.Pagination__item)}
            {...props}
            {...customAttributes}
          >
            {content}
          </Link>
        )
      }

      return (
        <Link
          key={key}
          size="medium"
          arrowDirection="none"
          className={clsx(styles.Pagination__item, getPagesClasses())}
          role="button"
          tabIndex={0}
          {...props}
          {...customAttributes}
        >
          {content}
        </Link>
      )
    })
  }, [model, hrefBuilder, pageChange, getPagesClasses, pageAttributesBuilder])

  return children
}

function defaultHrefBuilder(pageNum: number) {
  return `#${pageNum}`
}
