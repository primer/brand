'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {TooltipDelays, TooltipDirections} from '@primer/react-brand'

export const TooltipDirectionProps = () => <PropTableValues values={[...TooltipDirections]} commaSeparated />
export const TooltipDelayProps = () => <PropTableValues values={[...TooltipDelays]} commaSeparated />

export const TooltipTypeProps = () => <PropTableValues values={['description', 'label']} commaSeparated />
