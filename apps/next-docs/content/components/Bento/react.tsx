'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const BentoColumnIndexProps = () => (
  <PropTableValues
    values={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'ResponsiveColumnIndex']}
    commaSeparated
  />
)

export const BentoRowIndexProps = () => <PropTableValues values={['number', 'ResponsiveRowIndex']} commaSeparated />

export const BentoFlowProps = () => <PropTableValues values={['"row"', '"column"', 'ResponsiveFlow']} commaSeparated />

export const BentoColorModeProps = () => <PropTableValues values={['"light"', '"dark"']} commaSeparated />

export const BentoOrderProps = () => (
  <PropTableValues values={['"default"', '"reversed"', 'ResponsiveOrder']} commaSeparated />
)

export const BentoPaddingProps = () => (
  <PropTableValues values={['"condensed"', '"normal"', '"spacious"', 'ResponsivePadding']} commaSeparated />
)

export const BentoAlignProps = () => (
  <PropTableValues values={['"start"', '"center"', '"end"', 'ResponsiveAlign']} commaSeparated />
)
