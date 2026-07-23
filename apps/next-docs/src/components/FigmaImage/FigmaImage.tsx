import {clsx} from 'clsx'
import type {ReactNode} from 'react'
import {FigmaImageEditLink} from './FigmaImageEditLink'
import {FigmaImagePreview} from './FigmaImagePreview'
import type {ResolvedFigmaImageSource} from './FigmaImage.types'
import styles from './FigmaImage.module.css'
// eslint-disable-next-line import/extensions
import {resolveFigmaImageSource} from './FigmaImage.server.mjs'

type FigmaImageProps = {
  src: string
  darkModeSrc?: string
  alt?: string
  role?: 'presentation'
  caption?: ReactNode
  children?: ReactNode
  width?: number
  height?: number
  fullWidth?: boolean
  className?: string
}

function getAccessibleAlt(alt?: string, role?: 'presentation') {
  if (role === 'presentation') {
    return {alt: '', presentation: true}
  }

  const trimmedAlt = alt?.trim()

  if (trimmedAlt) {
    return {alt: trimmedAlt, presentation: false}
  }

  return {
    alt: '',
    presentation: false,
    missingReason: 'Add descriptive alt text or set presentation for decorative Figma images.',
  }
}

export function FigmaImage({
  src,
  darkModeSrc,
  alt,
  role,
  caption,
  children,
  width,
  height,
  fullWidth = false,
  className,
}: FigmaImageProps) {
  const lightSource: ResolvedFigmaImageSource = resolveFigmaImageSource(src)
  const darkSource: ResolvedFigmaImageSource | undefined = darkModeSrc
    ? resolveFigmaImageSource(darkModeSrc)
    : undefined
  const accessibleImage = getAccessibleAlt(alt, role)
  const captionContent = caption ?? children
  const figureClassName = clsx(
    'custom-component',
    styles.FigmaImage,
    fullWidth && styles.FigmaImageFullWidth,
    className,
  )

  const previewLightSource = accessibleImage.missingReason
    ? {
        ...lightSource,
        assetUrl: undefined,
        missingReason: accessibleImage.missingReason,
      }
    : lightSource

  const previewDarkSource =
    accessibleImage.missingReason && darkSource
      ? {
          ...darkSource,
          assetUrl: undefined,
          missingReason: accessibleImage.missingReason,
        }
      : darkSource

  return (
    <figure className={figureClassName}>
      <div className={styles.PreviewContainer}>
        <FigmaImagePreview
          lightSource={previewLightSource}
          darkSource={previewDarkSource}
          alt={accessibleImage.alt}
          presentation={accessibleImage.presentation}
          width={width}
          height={height}
          fullWidth={fullWidth}
        />
      </div>
      <FigmaImageEditLink lightSource={lightSource} darkSource={darkSource} />
      {captionContent ? (
        <figcaption className={styles.Caption}>
          <div className={styles.CaptionText}>{captionContent}</div>
        </figcaption>
      ) : null}
    </figure>
  )
}
