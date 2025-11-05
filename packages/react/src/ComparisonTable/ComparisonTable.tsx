import {clsx} from 'clsx'
import React, {forwardRef, type Ref, useMemo, PropsWithChildren} from 'react'
import {Heading, Text, useAnimation} from '../'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/comparison-table/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/comparison-table/comparison-table.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './ComparisonTable.module.css'

export type ComparisonTableProps<C extends React.ElementType> = BaseProps<C> & {
  as?: C
  heading?: string
  variant?: 'default' | 'minimal'
  featuredColumn?: number
} & React.ComponentPropsWithoutRef<C>

export const _ComparisonTable = forwardRef(
  <C extends React.ElementType>(
    {
      as,
      animate,
      children,
      className,
      heading,
      featuredColumn = 1,
      visuallyHiddenFeaturedLabel = 'featured',
      variant = 'default',
      style,
      ...props
    }: ComparisonTableProps<C>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const Component = as || 'section'

    const Children = useMemo(
      () =>
        React.Children.toArray(children).filter(
          (child: React.ReactNode): boolean => React.isValidElement(child) && typeof child.type !== 'string',
        ),
      [children],
    )

    const HeaderRow = Children.map((child, index) => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (child.type === Row && index === 0) {
          return React.cloneElement(child as React.ReactElement, {
            className: clsx(styles['ComparisonTable-row'], child.props.className),
            children: React.Children.map(child.props.children, (rowChild, rowChildIndex) => {
              if (rowChild.type === Cell) {
                const isFeatured = rowChildIndex === featuredColumn
                return React.cloneElement(rowChild, {
                  as: rowChild.props.children ? 'th' : 'td',
                  className: clsx(
                    styles['ComparisonTable-cell'],
                    styles[`ComparisonTable-cell-heading`],
                    styles[`ComparisonTable-cell-heading--${variant}`],
                    rowChildIndex === 0 && styles[`ComparisonTable-cell-heading--first`],
                    isFeatured && styles[`ComparisonTable-cell-heading--featured`],
                    child.props.className,
                  ),
                  children: (
                    <span
                      className={clsx(
                        rowChildIndex === featuredColumn && styles['ComparisonTable-cell-heading-label--featured'],
                      )}
                    >
                      {rowChild.props.children}
                      {isFeatured && <span className="visually-hidden">({visuallyHiddenFeaturedLabel})</span>}
                    </span>
                  ),
                })
              }
            }),
          })
        }
      }
    }).filter(Boolean)

    const headerRowNames = useMemo(
      () =>
        React.Children.map(children[0].props.children, child => {
          const {children: value = ''} = child.props

          return value
        }),
      [children],
    )

    const [, ...regularRows] = React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === Row) return child
      return null
    })

    const RegularRows = regularRows.map((child, index) => {
      return React.cloneElement(child, {
        className: clsx(styles['ComparisonTable-row'], `ComparisonTable-row--${index}`, child.props.className),
        children: React.Children.map(child.props.children, (rowChild, cellIndex) => {
          if (rowChild.type === Cell) {
            return (
              <Cell
                {...rowChild.props}
                as={cellIndex === 0 ? 'th' : 'td'}
                className={clsx(
                  styles['ComparisonTable-cell'],
                  styles[`ComparisonTable-cell--${variant}`],
                  cellIndex === 0 && styles[`ComparisonTable-cell-heading`],
                  cellIndex === 0 && styles[`ComparisonTable-cell-heading--${variant}`],
                  cellIndex === featuredColumn && styles[`ComparisonTable-cell--featured`],
                  regularRows.length - 1 === index && styles['ComparisonTable-cell--lastrow'],
                  child.props.className,
                )}
              >
                {cellIndex >= 1 && (
                  <span
                    className={clsx(
                      styles['ComparisonTable-inline-cell-label'],
                      styles['ComparisonTable--hide-element-on-narrow'],
                      cellIndex === featuredColumn && styles['ComparisonTable-cell-heading-label--featured'],
                    )}
                  >
                    {headerRowNames[cellIndex]}
                  </span>
                )}
                <span
                  className={clsx(
                    styles['ComparisonTable-cell-container'],
                    cellIndex === featuredColumn && styles['ComparisonTable-cell-container--featured'],
                  )}
                >
                  {rowChild.props.children}
                </span>
              </Cell>
            )
          }
        }),
      })
    })

    const FootnoteChild = Children.find(child => React.isValidElement(child) && child.type === Footnote)

    return (
      <Component
        ref={ref}
        className={clsx(animationClasses, className)}
        style={{...animationInlineStyles, ...style}}
        {...props}
      >
        {heading && (
          <Heading className={styles['ComparisonTable--heading']} as="h3" size="4">
            {heading}
          </Heading>
        )}
        <table className={clsx(styles.ComparisonTable, `ComparisonTable--${variant}`)}>
          {HeaderRow.length && <thead>{HeaderRow}</thead>}
          {RegularRows.length && <tbody>{RegularRows}</tbody>}
        </table>
        {FootnoteChild && <footer className={styles['ComparisonTable-footnote']}>{FootnoteChild}</footer>}
      </Component>
    )
  },
)

type RowProps = {
  header?: boolean
}

const Row = ({children, ...rest}: PropsWithChildren<RowProps>) => {
  return <tr {...rest}>{children}</tr>
}

export type CellProps = BaseProps<HTMLTableCellElement> & {
  as?: 'td' | 'th'
}

const Cell = ({as, children, ...props}: PropsWithChildren<CellProps>) => {
  const Tag = as || 'td'
  return <Tag {...props}>{children}</Tag>
}

export type FootnoteProps = BaseProps<HTMLParagraphElement>

const Footnote = ({children, ...props}: PropsWithChildren<FootnoteProps>) => {
  if (typeof children === 'string') {
    return (
      <Text as="p" size="100" variant="muted">
        {children}
      </Text>
    )
  }
  return <div {...props}>{children}</div>
}

/**
 * @description
 *  Comparison tables are used to aid decision-making by displaying a list of features and their associated qualities side-by-side.
 *  They are useful for comparing products, plans, or features in marketing pages.
 * @see https://primer.style/brand/components/ComparisonTable
 */
export const ComparisonTable = Object.assign(_ComparisonTable, {
  Row,
  Cell,
  Footnote,
})
