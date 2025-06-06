'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const TooltipDirectionProps = () => <PropTableValues values={['n', 'e', 's', 'w']} commaSeparated />

export const TooltipTypeProps = () => <PropTableValues values={['description', 'label']} commaSeparated />
