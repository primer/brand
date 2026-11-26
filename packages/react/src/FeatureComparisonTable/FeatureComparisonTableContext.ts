import React, {createContext, useContext} from 'react'
import type {BaseProps} from '../component-helpers'
import {type FeatureComparisonTableGroupProps} from './sub-components/FeatureComparisonTableGroup'
import {type FeatureComparisonTableItemProps} from './sub-components/FeatureComparisonTableItem'

export type FeatureComparisonTableBaseProps<T> = Omit<BaseProps<T>, 'animate' | 'id' | 'ref'>

export type FeatureComparisonTableAnimatedBaseProps<T> = Omit<BaseProps<T>, 'id' | 'ref'>

export const testIds = {
  root: 'FeatureComparisonTable',
  heading: 'FeatureComparisonTable__heading',
  narrow: 'FeatureComparisonTable__narrow',
  table: 'FeatureComparisonTable__table',
  item: 'FeatureComparisonTable__item',
  label: 'FeatureComparisonTable__label',
  price: 'FeatureComparisonTable__price',
  group: 'FeatureComparisonTable__group',
  row: 'FeatureComparisonTable__row',
  rowHeading: 'FeatureComparisonTable__rowHeading',
  cell: 'FeatureComparisonTable__cell',
}

export type BreakpointCategory = keyof Exclude<NonNullable<FeatureComparisonTableGroupProps['expanded']>, boolean>

export type TableContextValue = {
  instanceId: string
  breakpoint: BreakpointCategory
  items: Array<React.ReactElement<FeatureComparisonTableItemProps>>
  itemIndex: number
  groupIndex: number
  groupIdentity: string
  groupOpen: boolean
  onGroupOpenChange: (open: boolean) => void
  rowIdentity: string
  // Control refs are keyed by stable identities so focus can move between the narrow and wide projections.
  narrowControlsRef: React.RefObject<Record<string, HTMLElement | null>>
  tableControlsRef: React.RefObject<Record<string, HTMLElement | null>>
  rowControlGroupIdentitiesRef: React.RefObject<Record<string, string>>
  rowDescriptionsOpenRef: React.RefObject<Record<string, boolean>>
  descriptionToggleLabels: {show: string; hide: string}
}

export const TableContext = createContext<TableContextValue | undefined>(undefined)

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) throw new Error('FeatureComparisonTable subcomponents must be rendered inside FeatureComparisonTable.')
  return context
}
