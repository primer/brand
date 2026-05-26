import React, {cloneElement, forwardRef} from 'react'
import {clsx} from 'clsx'

import {Heading, Text, type TextProps} from '..'
import {Pagination} from '../Pagination'
import {useId} from '../hooks/useId'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/media-playlist/colors-with-modes.css'

/** Main Stylesheet (as a CSS Module) */
import type {BaseProps} from '../component-helpers'
import styles from './MediaPlaylist.module.css'
import {type MediaPlaylistComponentTypes, useMediaPlaylist} from './useMediaPlaylist'

export type MediaPlaylistProps = React.PropsWithChildren<{
  /**
   * The index of the item to be selected by default. This is ignored if `selectedIndex` is provided.
   */
  defaultSelectedIndex?: number
  /**
   * The index of the currently selected item. This makes the component controlled.
   */
  selectedIndex?: number
  /**
   * Callback fired when the selected index changes.
   */
  onChange?: (selectedIndex: number) => void
  'data-testid'?: string
}> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>

const MediaPlaylistRoot = forwardRef<HTMLDivElement, MediaPlaylistProps>(
  ({children, className, defaultSelectedIndex = 0, onChange, selectedIndex, 'data-testid': testId, ...props}, ref) => {
    const uniqueId = useId()

    const {
      activeIndex,
      currentItemPage,
      getPaginationAttributes,
      getTabListProps,
      getTabPanelProps,
      getTabProps,
      handlePageChange,
      hasOverflowItems,
      headingChild,
      isItemSelected,
      items,
      setItemRef,
      tabListRef,
    } = useMediaPlaylist({
      children,
      components: mediaPlaylistComponents,
      defaultSelectedIndex,
      onChange,
      selectedIndex,
    })

    const headingId = headingChild?.props.id ?? `${uniqueId}-heading`

    if (!headingChild && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
      // eslint-disable-next-line no-console
      console.warn(
        'MediaPlaylist: Heading child is required. This element labels the playlist for assistive technologies.',
      )
    }

    const tabListProps = headingChild
      ? getTabListProps({labelledBy: headingId})
      : getTabListProps({label: 'Media playlist'})

    return (
      <div
        ref={ref}
        className={clsx(styles.MediaPlaylist, hasOverflowItems && styles['MediaPlaylist--overflowItems'], className)}
        data-testid={testId || testIds.root}
        {...props}
      >
        <div className={styles.MediaPlaylist__layout}>
          <div className={styles.MediaPlaylist__playlist}>
            {headingChild &&
              cloneElement(headingChild, {
                activeIndex,
                id: headingId,
                itemCount: items.length,
              })}
            <div {...tabListProps} ref={tabListRef} className={styles.MediaPlaylist__tablist}>
              {items.map((item, index) => {
                const tabProps = getTabProps<HTMLButtonElement>(String(index))

                return (
                  <div
                    key={index}
                    ref={element => {
                      setItemRef(index, element)
                    }}
                    className={clsx(
                      styles.MediaPlaylist__item,
                      isItemSelected(index) && styles['MediaPlaylist__item--selected'],
                      item.className,
                    )}
                  >
                    <button type="button" {...tabProps} className={styles.MediaPlaylist__tab}>
                      <span className={styles.MediaPlaylist__tabContent}>
                        {item.thumbnail && <span className={styles.MediaPlaylist__thumbnail}>{item.thumbnail}</span>}
                        <span className={styles.MediaPlaylist__itemHeadingContent}>{item.heading}</span>
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>

            {hasOverflowItems && (
              <Pagination
                className={styles.MediaPlaylist__pagination}
                pageCount={items.length}
                currentPage={currentItemPage}
                onPageChange={handlePageChange}
                hrefBuilder={() => '#'}
                pageAttributesBuilder={getPaginationAttributes}
                aria-label="Media playlist items"
                showPages={false}
              />
            )}
          </div>

          <div className={styles.MediaPlaylist__mediaPanels}>
            {items.map((item, index) => {
              const panelProps = getTabPanelProps(String(index))

              return (
                <div
                  key={index}
                  {...panelProps}
                  tabIndex={-1}
                  className={clsx(styles.MediaPlaylist__mediaPanel, styles.MediaPlaylist__panel)}
                >
                  {item.media}
                  <div className={styles.MediaPlaylist__panelContent}>{item.content}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  },
)

export type MediaPlaylistHeadingProps = React.PropsWithChildren<{
  as?: 'h2' | 'h3'
}> &
  BaseProps<HTMLDivElement>

type MediaPlaylistHeadingInternalProps = MediaPlaylistHeadingProps & {
  activeIndex?: number | null
  itemCount?: number
}

function MediaPlaylistHeading({
  activeIndex = null,
  as = 'h3',
  children,
  className,
  id,
  itemCount = 0,
  ...props
}: MediaPlaylistHeadingInternalProps) {
  return (
    <div className={clsx(styles.MediaPlaylist__heading, className)} {...props}>
      <Heading as={as} id={id} className={styles.MediaPlaylist__headingLabel}>
        {children}
      </Heading>
      {itemCount > 0 && activeIndex !== null && (
        <span className={styles.MediaPlaylist__headingCounter} aria-live="polite">
          {activeIndex + 1}/{itemCount}
        </span>
      )}
    </div>
  )
}

export type MediaPlaylistItemProps = React.PropsWithChildren<
  {
    /**
     * An optional thumbnail to be shown in the playlist for this item.
     */
    thumbnail?: React.ReactNode
  } & BaseProps<HTMLDivElement>
>

function MediaPlaylistItem({children}: MediaPlaylistItemProps) {
  return <>{children}</>
}

export type MediaPlaylistItemHeadingProps = Omit<TextProps, 'as' | 'children' | 'title'> & {
  children?: React.ReactNode
  description?: React.ReactNode
  title?: React.ReactNode
}

function MediaPlaylistItemHeading({
  children,
  className,
  description,
  font = 'mona-sans',
  size = '200',
  title,
  variant = 'default',
  weight = 'medium',
  ...props
}: MediaPlaylistItemHeadingProps) {
  const hasStructuredContent = title !== undefined || description !== undefined
  const headingTitle = title ?? children

  return (
    <Text
      {...props}
      as="span"
      className={clsx(styles.MediaPlaylist__itemHeading, className)}
      font={font}
      size={size}
      variant={variant}
      weight={weight}
    >
      {hasStructuredContent ? (
        <span className={styles.MediaPlaylist__itemHeadingDetails}>
          {headingTitle && <span className={styles.MediaPlaylist__itemHeadingTitle}>{headingTitle}</span>}
          {description && (
            <Text as="span" font="monospace" size="100" variant="muted">
              {description}
            </Text>
          )}
        </span>
      ) : (
        children
      )}
    </Text>
  )
}

export type MediaPlaylistItemContentProps = React.HTMLAttributes<HTMLDivElement>

function MediaPlaylistItemContent({children, className, ...props}: MediaPlaylistItemContentProps) {
  return (
    <div className={clsx(styles.MediaPlaylist__content, className)} {...props}>
      {children}
    </div>
  )
}

export const MediaPlaylistItemMediaBackgroundColors = ['default', 'subtle'] as const
export type MediaPlaylistItemMediaBackgroundColor = (typeof MediaPlaylistItemMediaBackgroundColors)[number]

export type MediaPlaylistItemMediaProps = React.HTMLAttributes<HTMLDivElement> &
  React.PropsWithChildren<{
    fillMedia?: boolean
    imageBackgroundColor?: MediaPlaylistItemMediaBackgroundColor
  }>

const MediaPlaylistItemMedia = forwardRef<HTMLDivElement, MediaPlaylistItemMediaProps>(function MediaPlaylistItemMedia(
  {children, className, fillMedia = true, imageBackgroundColor, ...props},
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx(
        styles.MediaPlaylist__media,
        fillMedia && styles['MediaPlaylist__media--fill-media'],
        imageBackgroundColor === 'subtle' && styles['MediaPlaylist__media--has-background'],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})

const mediaPlaylistComponents = {
  Heading: MediaPlaylistHeading,
  Item: MediaPlaylistItem,
  ItemHeading: MediaPlaylistItemHeading,
  ItemContent: MediaPlaylistItemContent,
  ItemMedia: MediaPlaylistItemMedia,
} satisfies MediaPlaylistComponentTypes

const testIds = {
  root: 'MediaPlaylist',
}

/**
 * Use MediaPlaylist to pair media playback with an itemized, thumbnail-backed playlist.
 */
export const MediaPlaylist = Object.assign(MediaPlaylistRoot, {
  Heading: MediaPlaylistHeading,
  Item: MediaPlaylistItem,
  ItemHeading: MediaPlaylistItemHeading,
  ItemContent: MediaPlaylistItemContent,
  ItemMedia: MediaPlaylistItemMedia,
  testIds,
})
