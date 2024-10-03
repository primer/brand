import {Icon} from '@primer/octicons-react'
import type {ReactElement} from 'react'
import {HeadingProps} from '../'

import type {BaseProps} from '../component-helpers'

export type BreakoutBannerResponsiveMap<T> = {
  narrow?: T
  regular?: T
  wide?: T
}

export const BreakoutBannerBackgroundColors = ['default', 'subtle'] as const

export type BreakoutBannerResponsiveBackgroundImageSrcMap = BreakoutBannerResponsiveMap<string | string[]>
export type BreakoutBannerBackgroundColors = (typeof BreakoutBannerBackgroundColors)[number] | AnyString
export type BreakoutBannerResponsiveBackgroundColorMap = BreakoutBannerResponsiveMap<BreakoutBannerBackgroundColors>
export type BreakoutBannerResponsiveBackgroundImagePositionMap = BreakoutBannerResponsiveMap<string | string[]>
export type BreakoutBannerResponsiveBackgroundImageSizeMap = BreakoutBannerResponsiveMap<string | string[]>

export type BreakoutBannerProps = BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode | React.ReactNode[]
    /**
     * The alignment of the content within the banner
     */
    align?: 'start' | 'center'
    /**
     * Optional, custom background color
     */
    backgroundColor?: BreakoutBannerBackgroundColors | BreakoutBannerResponsiveBackgroundColorMap
    /**
     * Optional, custom background image
     */
    backgroundImageSrc?: string | BreakoutBannerResponsiveBackgroundImageSrcMap
    /**
     * Optional, custom background position
     */
    backgroundImagePosition?: string | BreakoutBannerResponsiveBackgroundImagePositionMap
    /**
     * Optional, custom background size
     */
    backgroundImageSize?: string | BreakoutBannerResponsiveBackgroundImageSizeMap
    /**
     * An optional leading visual that appears before the heading
     */
    leadingVisual?: ReactElement | Icon
  }

export type BreakoutBannerHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
} & HeadingProps

export type BreakoutBannerDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: React.ReactNode | React.ReactNode[]
}
