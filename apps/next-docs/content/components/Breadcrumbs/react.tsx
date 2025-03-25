'use client'
import {BreadcrumbVariants} from '../../../../../packages/react/src/Breadcrumbs/Breadcrumbs'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const BreadcrumbsVariantProps = () => <PropTableValues values={[...BreadcrumbVariants]} commaSeparated />
