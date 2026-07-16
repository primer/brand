import type {CatalogComponent} from '../catalog/types.js'

import type {ToolContext} from './types.js'

/** The fields a component is ranked against for relevance: name, description, and docs keywords. */
export function componentSearchFields(component: CatalogComponent): Array<string | undefined> {
  return [component.name, component.description, component.keywords?.join(' ')]
}

/** A short, consistent provenance line so agents (and humans) know what version answered. */
export function versionNote(ctx: ToolContext): string {
  if (ctx.brand.found && ctx.brand.version) {
    return `_Source: \`@primer/react-brand@${ctx.brand.version}\` installed in this project._`
  }
  if (ctx.catalog.generatedFromVersion !== 'unknown') {
    return `_Source: bundled snapshot of \`@primer/react-brand@${ctx.catalog.generatedFromVersion}\` (no install detected in this project)._`
  }
  return '_Source: bundled Primer Brand snapshot._'
}

/** Render a single prop as a markdown bullet. */
export function formatProp(prop: {
  name: string
  type?: string
  enum?: string[]
  required?: boolean
  default?: string
  description?: string
}): string {
  const optional = prop.required ? '' : '?'
  const valueType =
    prop.enum && prop.enum.length > 0 ? prop.enum.map(value => `'${value}'`).join(' | ') : prop.type ?? 'unknown'
  const defaultSuffix = prop.default ? ` _(default: \`${prop.default}\`)_` : ''
  const descriptionSuffix = prop.description ? ` — ${prop.description}` : ''
  return `- \`${prop.name}${optional}\`: \`${valueType}\`${defaultSuffix}${descriptionSuffix}`
}
