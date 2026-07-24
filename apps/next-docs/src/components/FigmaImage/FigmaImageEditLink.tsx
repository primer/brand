'use client'

import {useColorMode} from '@primer/doctocat-nextjs/components/context/color-modes/useColorMode'
import {PencilIcon} from '@primer/octicons-react'
import {Button} from '@primer/react-brand'
import type {ResolvedFigmaImageSource} from './FigmaImage.types'
import {getActiveFigmaEditUrl} from './FigmaImage.utils'
import styles from './FigmaImage.module.css'

type FigmaImageEditLinkProps = {
  lightSource: ResolvedFigmaImageSource
  darkSource?: ResolvedFigmaImageSource
}

export function FigmaImageEditLink({lightSource, darkSource}: FigmaImageEditLinkProps) {
  const {colorMode} = useColorMode()
  // eslint-disable-next-line i18n-text/no-en
  const editLinkLabel = 'Edit in Figma'

  return (
    <Button
      as="a"
      variant="secondary"
      size="small"
      leadingVisual={PencilIcon}
      className={styles['FigmaImage__edit-link']}
      href={getActiveFigmaEditUrl(colorMode, lightSource, darkSource)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {editLinkLabel}
    </Button>
  )
}
