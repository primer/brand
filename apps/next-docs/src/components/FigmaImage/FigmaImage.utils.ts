import type {ResolvedFigmaImageSource} from './FigmaImage.types'

export function getActiveFigmaSource(
  colorMode: 'light' | 'dark',
  lightSource: ResolvedFigmaImageSource,
  darkSource?: ResolvedFigmaImageSource,
) {
  if (colorMode === 'dark' && darkSource?.assetUrl) {
    return darkSource
  }

  if (lightSource.assetUrl) {
    return lightSource
  }

  if (darkSource?.assetUrl) {
    return darkSource
  }

  return colorMode === 'dark' ? darkSource ?? lightSource : lightSource
}

export function getActiveFigmaEditUrl(
  colorMode: 'light' | 'dark',
  lightSource: ResolvedFigmaImageSource,
  darkSource?: ResolvedFigmaImageSource,
) {
  if (colorMode === 'dark' && darkSource?.editUrl) {
    return darkSource.editUrl
  }

  return lightSource.editUrl
}

export function resolveImageDimensions(
  source: ResolvedFigmaImageSource,
  explicitWidth?: number,
  explicitHeight?: number,
) {
  if (explicitWidth && explicitHeight) {
    return {width: explicitWidth, height: explicitHeight}
  }

  if (explicitWidth && source.width && source.height) {
    return {
      width: explicitWidth,
      height: Math.round((explicitWidth * source.height) / source.width),
    }
  }

  if (explicitHeight && source.width && source.height) {
    return {
      width: Math.round((explicitHeight * source.width) / source.height),
      height: explicitHeight,
    }
  }

  return {
    width: explicitWidth ?? source.width,
    height: explicitHeight ?? source.height,
  }
}
