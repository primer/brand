import {z} from 'zod'

import type {CatalogComponent} from '../../catalog/types.js'
import {rank} from '../../util/text.js'
import {componentSearchFields, versionNote} from '../format.js'
import type {ToolModule, ToolResult} from '../types.js'

const inputSchema = z.object({
  goal: z
    .string()
    .optional()
    .describe(
      'What you are building, e.g. "education landing page" or "pricing section". Omit for a foundational starter set.',
    ),
})

type Input = z.infer<typeof inputSchema>

const description = `Get ranked, copy-and-adapt examples of correct Primer Brand usage for a goal, taken from the component library's own tested Storybook stories. 
Pass a target use-case like "pricing section" or "education landing page" for the closest matches; with no match you get a default foundational set. 
Examples come verbatim from stories, so they may include Storybook scaffolding (\`{...args}\` spreads, imported demo assets) — treat that as placeholders to fill with real props and content, not literal code to copy. 
Use it to start from approved patterns instead of hand-building.`

/** Foundational sections that anchor almost every GitHub landing page, in composition order. */
const DEFAULT_COMPONENTS = ['Hero', 'SectionIntro', 'River', 'Pillar', 'CTABanner']

function exampleCode(component: CatalogComponent): string | undefined {
  return component.examples.find(entry => entry.code)?.code?.trim()
}

export const primerBrandExamplesTool: ToolModule<Input> = {
  name: 'primer_brand_examples',
  title: 'Primer Brand usage examples',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(input, ctx): ToolResult {
    const goal = input.goal?.trim() || 'landing page'
    // Only surface components that actually have a tested example — never emit a stub.
    const withExamples = ctx.catalog.components.filter(component => exampleCode(component))
    if (withExamples.length === 0) {
      return {
        text: `No usage examples are available yet. Call \`primer_brand_component\` to explore component APIs.\n\n${versionNote(
          ctx,
        )}`,
        isError: true,
      }
    }

    const matched = rank(goal, withExamples, componentSearchFields)
      .slice(0, 6)
      .map(entry => entry.item)
    const useDefault = matched.length === 0
    const defaultSet = DEFAULT_COMPONENTS.map(name => withExamples.find(component => component.name === name)).filter(
      (component): component is CatalogComponent => Boolean(component),
    )
    // Guarantee content even if none of the default components have an example yet.
    const shown = useDefault ? (defaultSet.length > 0 ? defaultSet : withExamples.slice(0, 5)) : matched

    const note = useDefault
      ? `No example matched "${goal}", so here is the default foundational set — compose these in order and adapt the copy and props to your theme.`
      : `Closest tested examples for "${goal}". Adapt the copy and props to your theme; don't paste verbatim.`

    const examples = shown
      .map(component => `### ${component.name}\n\`\`\`tsx\n${exampleCode(component)}\n\`\`\``)
      .join('\n\n')
    return {text: [`# Examples for "${goal}"`, note, examples, versionNote(ctx)].join('\n\n')}
  },
}
