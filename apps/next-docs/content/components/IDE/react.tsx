'use client'

import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {IDEFileExtensions} from '../../../../../packages/react/src/IDE/IDE'

export const IDEVariantProp = () => <PropTableValues values={['default', 'glass']} addLineBreaks />
export const IDEEditorSizeProp = () => <PropTableValues values={['small', 'medium', 'large']} addLineBreaks />

export const IDEFileExtensionsList = () => (
  <PropTableValues values={IDEFileExtensions} removeApostrophes commaSeparated />
)
