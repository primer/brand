'use client'
import {AvatarSizes, AvatarShapes} from '../../../../../packages/react/src/Avatar/Avatar'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const AvatarSizesProp = () => <PropTableValues values={[...AvatarSizes]} commaSeparated />
export const AvatarShapesProp = () => <PropTableValues values={[...AvatarShapes]} commaSeparated />
