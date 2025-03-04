'use client'
import {
  BoxSpacingValues,
  BoxBackgroundColors,
  BoxBorderColorOptions,
  BoxBorderRadiusOptions,
  BoxBorderWidthOptions,
} from '../../../../../packages/react/src/Box/Box'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const BoxSpacingValueProp = () => <PropTableValues values={[...BoxSpacingValues]} commaSeparated />
export const BoxBackgroundColorProp = () => <PropTableValues values={[...BoxBackgroundColors]} commaSeparated />
export const BoxBorderColorProp = () => <PropTableValues values={[...BoxBorderColorOptions]} commaSeparated />
export const BoxBorderRadiusProp = () => <PropTableValues values={[...BoxBorderRadiusOptions]} commaSeparated />
export const BoxBorderWidthProp = () => <PropTableValues values={[...BoxBorderWidthOptions]} commaSeparated />
