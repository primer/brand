import React, {forwardRef, Fragment, PropsWithChildren, useMemo} from 'react'
import {clsx} from 'clsx'
import {Grid} from '../Grid'
import {Stack} from '../Stack'
import type {BaseProps} from '../component-helpers'
import {AnimationProvider} from '../animation'

import {HeroContext, heroMediaInlinePositions} from './HeroContext'
import type {HeroMediaInlinePositions, HeroAlign, HeroVariant} from './HeroContext'
import {
  HeroLabel,
  HeroHeading,
  HeroDescription,
  HeroImage,
  HeroVideo,
  HeroEyebrow,
  HeroPrimaryAction,
  HeroSecondaryAction,
} from './sub-components'
import type {HeroImageProps, HeroVideoProps} from './sub-components'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/hero/base.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Hero.module.css'

const testIds = {
  root: 'Hero',
  get video() {
    return `${this.root}-video`
  },
  get grid() {
    return `${this.root}-grid`
  },
  get imageWrapper() {
    return `${this.root}-imageWrapper`
  },
}

export type HeroProps = BaseProps<HTMLElement> & {
  align?: HeroAlign
  imageContainerClassName?: string
  imageContainerStyle?: React.CSSProperties
  imageContainerRef?: React.RefObject<HTMLDivElement | null>
  imageBackgroundColor?: 'default' | 'subtle'
  variant?: HeroVariant
  enableAnimation?: boolean
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  trailingComponent?: React.FunctionComponent
  'data-testid'?: string
}

const Root = forwardRef<HTMLElement, PropsWithChildren<HeroProps>>(
  (
    {
      className,
      align = 'start',
      children,
      imageContainerClassName,
      imageContainerStyle,
      imageContainerRef,
      imageBackgroundColor,
      variant = 'default',
      trailingComponent: TrailingComponent,
      enableAnimation = false,
      'data-testid': testId,
      ...rest
    },
    ref,
  ) => {
    const {HeroActions, HeroChildren, HeroImageChild, HeroVideoChild} = useMemo(() => {
      const result = React.Children.toArray(children).reduce<{
        HeroActions: React.ReactElement[]
        HeroImageChild?: React.ReactElement<HeroImageProps>
        HeroVideoChild?: React.ReactElement<HeroVideoProps>
        HeroChildren: React.ReactElement[]
      }>(
        (acc, child) => {
          if (React.isValidElement(child)) {
            if (child.type === HeroPrimaryAction || child.type === HeroSecondaryAction) {
              acc.HeroActions.push(child)
            } else if (child.type === HeroImage) {
              acc.HeroImageChild = child as React.ReactElement<HeroImageProps>
            } else if (child.type === HeroVideo) {
              acc.HeroVideoChild = child as React.ReactElement<HeroVideoProps>
            } else {
              acc.HeroChildren.push(child)
            }
          }
          return acc
        },
        {HeroActions: [], HeroChildren: [], HeroImageChild: undefined, HeroVideoChild: undefined},
      )

      // Users shouldn't be able to have two types of media, prefer Hero.Image
      if (result.HeroImageChild && result.HeroVideoChild) {
        result.HeroVideoChild = undefined
      }

      return result
    }, [children])

    const mediaPositionProp = HeroImageChild?.props.position || HeroVideoChild?.props.position
    const mediaPosition = mediaPositionProp || 'block-end'
    const hasInlineMedia = heroMediaInlinePositions.includes(mediaPosition as HeroMediaInlinePositions)
    const inlineMediaPosition = hasInlineMedia ? mediaPosition : undefined
    const mediaChild = HeroImageChild || HeroVideoChild
    const isBorderedGrid = variant === 'bordered-grid'
    const isBlockEndPosition = mediaPosition === 'block-end' || mediaPosition === 'block-end-padded'
    const isBlockEndPadded = mediaPosition === 'block-end-padded'

    const Tag = isBorderedGrid && enableAnimation ? AnimationProvider : Fragment
    const tagProps =
      isBorderedGrid && enableAnimation
        ? {
            autoStaggerChildren: false,
            animationTrigger: 'immediate' as const,
          }
        : {}

    const useContainedLayout = isBorderedGrid && isBlockEndPosition
    const useInlineBorderedGrid = isBorderedGrid && hasInlineMedia

    const heroLayoutClass = HeroImageChild ? styles['Hero--layout-image'] : styles['Hero--layout-default']
    const isInlineStart = mediaPosition === 'inline-start' || mediaPosition === 'inline-start-padded'

    const textColumn = (
      <Grid.Column span={{large: mediaChild && hasInlineMedia ? 6 : 12}}>
        <Stack
          className={clsx(
            useInlineBorderedGrid && styles['Hero-text-column--inline-bordered-grid'],
            useInlineBorderedGrid && styles['Hero-contentColumn--bordered-inline'],
          )}
          direction="vertical"
          gap="none"
          padding="none"
          alignItems={hasInlineMedia ? 'flex-start' : align === 'start' ? 'flex-start' : 'center'}
          justifyContent={hasInlineMedia ? undefined : align === 'start' ? 'flex-start' : 'center'}
        >
          {HeroChildren}
          {HeroActions.length > 0 && <div className={styles['Hero-actions']}>{HeroActions}</div>}
          {TrailingComponent && (
            <div className={styles['Hero-trailing']}>
              <TrailingComponent />
            </div>
          )}
        </Stack>
      </Grid.Column>
    )

    const mediaColumn =
      mediaChild && !useContainedLayout ? (
        <Grid.Column
          ref={imageContainerRef}
          span={{large: hasInlineMedia ? 6 : 12}}
          className={clsx(
            imageBackgroundColor && styles[`Hero-imageContainer--bg-${imageBackgroundColor}`],
            useInlineBorderedGrid &&
              inlineMediaPosition?.includes('padded') &&
              styles['Hero-imageContainer--inline-bg-padded'],
            useInlineBorderedGrid && styles['Hero-imageContainer--inline-bordered'],
          )}
        >
          <div className={clsx(styles['Hero-mediaContainer'], imageContainerClassName)} style={imageContainerStyle}>
            {mediaChild}
          </div>
        </Grid.Column>
      ) : null

    return (
      <Tag {...tagProps}>
        <HeroContext.Provider value={{imagePosition: mediaPosition, variant, align, hasInlineMedia, enableAnimation}}>
          <section
            className={clsx(
              styles.Hero,
              styles[`Hero--variant-${variant}`],
              !hasInlineMedia && styles[`Hero--align-${align}`],
              heroLayoutClass,
              (HeroImageChild || HeroVideoChild) && styles[`Hero--image-pos-${mediaPosition}`],
              (HeroImageChild || HeroVideoChild) && hasInlineMedia && styles['Hero--image-pos-inline'],
              useInlineBorderedGrid && styles['Hero--variant-inline-bordered-grid'],
              className,
            )}
            ref={ref}
            aria-labelledby="hero-section-brand-heading"
            data-testid={testId || testIds.root}
            {...rest}
          >
            <Grid
              fullWidth={!useContainedLayout && !useInlineBorderedGrid}
              data-testid={testIds.grid}
              className={clsx(
                styles['Hero-grid'],
                styles[`Hero-grid--${mediaPosition}`],
                useContainedLayout && styles['Hero-grid--contained'],
                useInlineBorderedGrid && styles['Hero-grid--bordered-inline'],
              )}
            >
              {/* For inline-start, image comes first in DOM for accessibility */}
              {isInlineStart ? (
                <>
                  {mediaColumn}
                  {textColumn}
                </>
              ) : (
                <>
                  {textColumn}
                  {mediaColumn}
                </>
              )}
            </Grid>
            {mediaChild && useContainedLayout && (
              <div
                ref={imageContainerRef}
                data-testid={testIds.imageWrapper}
                className={clsx(
                  styles['Hero-imageWrapper'],
                  isBlockEndPadded && styles['Hero-imageWrapper--block-end-padded'],
                  imageContainerClassName,
                  imageBackgroundColor && styles[`Hero-imageWrapper--bg-${imageBackgroundColor}`],
                )}
                style={imageContainerStyle}
              >
                <div
                  className={clsx(
                    styles['Hero-imageWrapper-inner'],
                    isBlockEndPadded && styles['Hero-imageWrapper-inner--padded'],
                  )}
                >
                  {mediaChild}
                </div>
              </div>
            )}
          </section>
        </HeroContext.Provider>
      </Tag>
    )
  },
)

export const Hero = Object.assign(Root, {
  Heading: HeroHeading,
  Description: HeroDescription,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
  Image: HeroImage,
  Video: HeroVideo,
  Label: HeroLabel,
  Eyebrow: HeroEyebrow,
  testIds,
})
