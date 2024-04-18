import React, {memo, PropsWithChildren, useCallback} from 'react'
import {Link} from '..'

import {default as clsx} from 'clsx'

import type {BaseProps} from '../component-helpers'
import {buildComponentData, buildPaginationModel} from './model'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pagination/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Pagination.module.css'

const testIds = {
  root: 'Pagination-root',
  get button() {
    return `${this.root}-button`
  },
}

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
  /* Defines how many pages are to to be displayed on the left and right of the component */
  marginPageCount?: number
  /* Whether to show the page numbers */
  showPages?: boolean | ResponsivePageVisibilityMap
  /* The number of pages to show on each side of the current page */
  surroundingPageCount?: number
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLElement>>

const _PaginationRoot = memo(
  ({
    id,
    children,
    className,
    pageCount,
    currentPage,
    onPageChange,
    hrefBuilder = defaultHrefBuilder,
    marginPageCount = 1,
    showPages = true,
    surroundingPageCount = 2,
    'data-testid': testId,
    ...rest
  }: PaginationProps) => {
    const navRef = React.useRef<HTMLElement>(null)
    const pageElements = usePaginationPages({
      pageCount,
      currentPage,
      onPageChange,
      hrefBuilder,
      marginPageCount,
      showPages,
      surroundingPageCount,
    })

    return (
      <nav
        ref={navRef}
        id={id}
        className={clsx(styles.Pagination, className)}
        data-testid={testId || testIds.root}
        aria-label="Pagination"
        {...rest}
      >
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
  marginPageCount: number
  showPages?: PaginationProps['showPages']
  surroundingPageCount: number
}

export function usePaginationPages({
  pageCount,
  currentPage,
  onPageChange,
  hrefBuilder,
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
    if (typeof showPages === 'boolean') {
      return !showPages ? styles['Pagination__item--hidden'] : undefined
    }

    if (typeof showPages === 'object') {
      return Object.entries(showPages).reduce<string[]>((acc, [key, value]) => {
        if (value) {
          acc.push(styles[`Pagination__item--visible-${key as 'narrow' | 'regular' | 'wide'}`])
        } else {
          acc.push(styles[`Pagination__item--hidden-${key as 'narrow' | 'regular' | 'wide'}`])
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

      if (props.rel === 'next' || props.rel === 'prev') {
        return (
          <Link
            key={key}
            arrowDirection={props.rel === 'prev' ? 'start' : 'end'}
            size="medium"
            variant="accent"
            className={clsx(styles.Pagination__item)}
            {...props}
          >
            {content}
          </Link>
        )
      }

      return (
        <Link
          key={key}
          size="medium"
          variant={props['aria-current'] ? 'accent' : 'default'}
          arrowDirection="none"
          className={clsx(styles.Pagination__item, getPagesClasses())}
          role="button"
          tabIndex={0}
          {...props}
        >
          {content}
        </Link>
      )
    })
  }, [model, hrefBuilder, pageChange, getPagesClasses])

  return children
}

function defaultHrefBuilder(pageNum: number) {
  return `#${pageNum}`
}

/**
 * Use Pagination to display a sequence of links that allow navigation to discrete, related pages.
 * @see https://primer.style/brand/components/Pagination
 */
export const Pagination = Object.assign(_PaginationRoot, {
  testIds,
})
