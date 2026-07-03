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

const description = `Get ranked, copy-and-adapt examples of correct Primer Brand usage for a goal. Component-level snippets come from the library's own tested Storybook stories; for page-level goals you also get a full-page template — the actual current-brand recipe source from \`@primer/react-brand\`.
Pass a target use-case like "pricing section", "category page", or "education landing page" for the closest matches; with no match you get a default foundational set.
Examples are real source, so they may carry demo scaffolding (a \`content\` object, internal fixture imports, CSS-module class names, repo-relative imports, \`{...args}\` spreads) — mirror the composition and props, then rebuild with your own content and \`@primer/react-brand\` imports. Don't paste verbatim.`

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
      : `Closest tested component examples for "${goal}". Adapt the copy and props to your theme; don't paste verbatim.`

    const componentExamples = shown
      .map(component => `### ${component.name}\n\`\`\`tsx\n${exampleCode(component)}\n\`\`\``)
      .join('\n\n')

    // For page-level goals, lead with the closest full-page recipe. It's the real source (single
    // source of truth in @primer/react-brand), so tell the agent to look past its demo scaffolding.
    const matchedRecipes = rank(goal, ctx.catalog.recipes, recipe => [recipe.title, recipe.keywords.join(' ')]).map(
      entry => entry.item,
    )
    const topRecipe = matchedRecipes[0]

    const sections = [`# Examples for "${goal}"`]
    if (topRecipe) {
      const otherRecipes = matchedRecipes.slice(1)
      const also = otherRecipes.length
        ? ` Other full-page templates for this goal: ${otherRecipes.map(recipe => recipe.title).join(', ')}.`
        : ''
      sections.push(
        [
          `## Full-page template — start here: ${topRecipe.title}`,
          `This is the **actual current-brand recipe source** from \`@primer/react-brand\`, wired for our demo harness: a \`content\` object supplies the copy, imagery comes from internal fixtures, styling uses internal CSS-module class names, and imports are repo-relative. Ignore that scaffolding — mirror the composition, section order, and component props (e.g. the \`gridline\` / \`gridline-expressive\` variants and the bordered card-grid frame), then rebuild it with your own content, assets, and \`@primer/react-brand\` imports.${also}`,
          `\`\`\`tsx\n${topRecipe.source}\n\`\`\``,
        ].join('\n\n'),
      )
    }
    sections.push(note, componentExamples, versionNote(ctx))
    return {text: sections.join('\n\n')}
  },
}
