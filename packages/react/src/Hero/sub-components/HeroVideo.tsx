import React, {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../../component-helpers'
import type {HeroMediaPositions} from '../HeroContext'
import {useProvidedRefOrCreate} from '../../hooks/useRef'

import styles from '../Hero.module.css'
import {Box, Image, Text} from '../..'
import {PlayIcon} from '../../VideoPlayer/components/PlayIcon'
import {MarkGithubIcon} from '@primer/octicons-react'

type HeroVideoBaseProps = {
  position?: HeroMediaPositions
  enableBorder?: boolean
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLDivElement>>

// discriminated union to ensure that if one poster* prop is set, all are required
type PosterProps =
  | {poster?: never; posterAltText?: never; posterTitle?: never}
  | {poster: string; posterAltText: string; posterTitle: string}

export type HeroVideoProps = HeroVideoBaseProps & PosterProps

export const HeroVideo = forwardRef<HTMLDivElement, HeroVideoProps>(
  (
    {
      className,
      children,
      position = 'block-end',
      poster,
      posterTitle,
      posterAltText,
      enableBorder,
      'data-testid': testId,
      ...rest
    }: HeroVideoProps,
    ref,
  ) => {
    const [showVideo, setShowVideo] = React.useState(poster ? false : true)
    const containerRef = useProvidedRefOrCreate(ref as React.RefObject<HTMLDivElement>)
    const isInlinePosition = position.startsWith('inline')
    const isInlinePadded = position.endsWith('-padded')

    const mediaClasses = clsx(
      styles['Hero-video'],
      styles['Hero-media'],
      styles[`Hero-media--pos-${position}`],
      isInlinePosition && styles['Hero-media--pos-inline'],
      isInlinePosition && isInlinePadded && styles['Hero-media--pos-inline-padded'],
      className,
    )

    const handlePosterClick = () => setShowVideo(true)

    const videoContent = (
      <div className={mediaClasses} ref={containerRef} data-testid={testId || 'Hero-video'} {...rest}>
        {children}
      </div>
    )

    if (showVideo) {
      return videoContent
    }

    return (
      <PosterImage
        posterSrc={poster!}
        posterAlt={posterAltText!}
        posterTitle={posterTitle!}
        onClick={handlePosterClick}
        className={mediaClasses}
      />
    )
  },
)

type PosterImageProps = {
  posterSrc: string
  posterAlt: string
  posterTitle: string
  onClick: () => void
  className?: string
}

function PosterImage({posterSrc, posterAlt, posterTitle, onClick, className}: PosterImageProps) {
  return (
    <Box className={className}>
      <button aria-label="Play video" onClick={onClick} className={styles['Hero-video-poster-button']}>
        <Image src={posterSrc} alt={posterAlt} className={styles['Hero-video-poster-image']} />
        <PlayIcon className={styles['Hero-video-poster-icon']} />
        <span className={styles['Hero-video-poster-header']}>
          <MarkGithubIcon size={48} className={styles['Hero-video-header-poster-icon']} />
          <Text size="350" className={styles['Hero-video-poster-text']}>
            {posterTitle}
          </Text>
        </span>
      </button>
    </Box>
  )
}
