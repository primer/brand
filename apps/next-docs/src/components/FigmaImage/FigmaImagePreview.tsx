'use client'

import {useColorMode} from '@primer/doctocat-nextjs/components/context/color-modes/useColorMode'
import {clsx} from 'clsx'
import type {ResolvedFigmaImageSource} from './FigmaImage.types'
import {getActiveFigmaSource, resolveImageDimensions} from './FigmaImage.utils'
import styles from './FigmaImage.module.css'

type FigmaImagePreviewProps = {
  lightSource: ResolvedFigmaImageSource
  darkSource?: ResolvedFigmaImageSource
  alt: string
  presentation: boolean
  width?: number
  height?: number
  fullWidth: boolean
}

export function FigmaImagePreview({
  lightSource,
  darkSource,
  alt,
  presentation,
  width,
  height,
  fullWidth,
}: FigmaImagePreviewProps) {
  const {colorMode} = useColorMode()
  const activeSource = getActiveFigmaSource(colorMode, lightSource, darkSource)
  // eslint-disable-next-line i18n-text/no-en
  const previewUnavailableText = 'Figma preview unavailable.'
  // eslint-disable-next-line i18n-text/no-en
  const defaultPreviewFallbackText = 'This page build does not include a generated preview for the selected frame.'
  const previewFallbackText = activeSource.missingReason ?? defaultPreviewFallbackText

  if (!activeSource.assetUrl) {
    return (
      <div className={styles['FigmaImage__missing-preview']} role="note">
        <p className={styles['FigmaImage__missing-preview-title']}>{previewUnavailableText}</p>
        <p className={styles['FigmaImage__missing-preview-body']}>{previewFallbackText}</p>
      </div>
    )
  }

  const dimensions = resolveImageDimensions(activeSource, width, height)

  return (
    <img
      className={clsx(styles.FigmaImage__image, fullWidth && styles['FigmaImage__image--full-width'])}
      src={activeSource.assetUrl}
      alt={presentation ? '' : alt}
      aria-hidden={presentation ? true : undefined}
      role={presentation ? 'presentation' : undefined}
      width={dimensions.width}
      height={dimensions.height}
    />
  )
}
