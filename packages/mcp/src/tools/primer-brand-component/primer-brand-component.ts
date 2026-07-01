import {z} from 'zod'

import type {CatalogComponent} from '../../catalog/types.js'
import {rank} from '../../util/text.js'
import {componentSearchFields, formatProp, versionNote} from '../format.js'
import type {ToolContext, ToolModule, ToolResult} from '../types.js'

const inputSchema = z.object({
  name: z
    .string()
    .optional()
    .describe('Component name to look up (e.g. "Hero"). Omit to list every available component.'),
})

type Input = z.infer<typeof inputSchema>

const description = `Primer Brand (@primer/react-brand) component reference for GitHub marketing and landing pages. Omit \`name\` to list every approved component; pass a \`name\` for its import, sub-components, props with allowed values, and a canonical example. The example is a real story snippet, so it may include Storybook \`{...args}\` spreads or imported demo assets to adapt rather than copy verbatim. Use this to avoid invented components or props. This is Primer Brand, not @primer/react product UI.`

function listComponents(ctx: ToolContext): ToolResult {
  const {components} = ctx.catalog
  if (components.length === 0) {
    return {text: `No component catalog is available.\n\n${versionNote(ctx)}`, isError: true}
  }
  const lines = [...components]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(component => `- \`${component.name}\`${component.description ? ` — ${component.description}` : ''}`)
  return {
    text: `${
      components.length
    } Primer Brand components are available. Call \`primer_brand_component\` with a \`name\` for full details.\n\n${lines.join(
      '\n',
    )}\n\n${versionNote(ctx)}`,
  }
}

function describeComponent(component: CatalogComponent, ctx: ToolContext): ToolResult {
  const sections: string[] = [`# ${component.name} — \`${component.module}\``]

  sections.push(`\`\`\`tsx\nimport {${component.name}} from '${component.module}'\n\`\`\``)

  if (component.note) {
    sections.push(`> **Note:** ${component.note}`)
  }

  if (component.subcomponents.length > 0) {
    sections.push(`**Sub-components:** ${component.subcomponents.map(name => `\`${name}\``).join(', ')}`)
  }

  if (component.props.length > 0) {
    const props = [...component.props].sort((a, b) => a.name.localeCompare(b.name)).map(formatProp)
    sections.push(`## Props\n${props.join('\n')}`)
  } else {
    sections.push(
      '## Props\n_No prop metadata was extracted for this component; check the docs with `primer_brand_docs`._',
    )
  }

  const example = component.examples.find(entry => entry.code)
  if (example?.code) {
    sections.push(`## Example\n\`\`\`tsx\n${example.code.trim()}\n\`\`\``)
  }

  sections.push(versionNote(ctx))
  return {text: sections.join('\n\n')}
}

function getComponent(name: string, ctx: ToolContext): ToolResult {
  const {components} = ctx.catalog
  const match = components.find(component => component.name.toLowerCase() === name.toLowerCase())
  if (match) return describeComponent(match, ctx)

  const suggestions = rank(name, components, componentSearchFields)
    .slice(0, 5)
    .map(entry => `\`${entry.item.name}\``)
  const hint =
    suggestions.length > 0
      ? `Did you mean: ${suggestions.join(', ')}?`
      : 'Call `primer_brand_component` with no arguments to list every component.'
  return {
    text: `There is no Primer Brand component named \`${name}\`. ${hint}\n\n${versionNote(ctx)}`,
    isError: true,
  }
}

export const primerBrandComponentTool: ToolModule<Input> = {
  name: 'primer_brand_component',
  title: 'Primer Brand component reference',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(input, ctx) {
    return input.name ? getComponent(input.name, ctx) : listComponents(ctx)
  },
}
