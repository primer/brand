import {z} from 'zod'

import type {CatalogComponent, CatalogRecipe} from '../../catalog/types.js'
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

const description = `Get ranked, tested Primer Brand examples for a component or page goal.
Use when you need a starting composition; page goals can include a current-brand full-page reference.
Use \`primer_brand_component\` for exact component APIs.`

/** Foundational sections that anchor almost every GitHub landing page, in composition order. */
const DEFAULT_COMPONENTS = ['Hero', 'SectionIntro', 'River', 'Pillar', 'CTABanner']

function exampleCode(component: CatalogComponent): string | undefined {
  return component.examples.find(entry => entry.code)?.code?.trim()
}

function formatComponentExample(component: CatalogComponent): string {
  const example = component.examples.find(entry => entry.code)
  if (!example?.code) return ''
  const sections = [`### ${component.name}\n\`\`\`tsx\n${example.code.trim()}\n\`\`\``]
  if (example.styles) sections.push(`\`\`\`css\n${example.styles.trim()}\n\`\`\``)
  return sections.join('\n\n')
}

export const primerBrandExamplesTool: ToolModule<Input> = {
  name: 'primer_brand_examples',
  title: 'Primer Brand usage examples',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(input, ctx): ToolResult {
    const adaptationGuidance = `## How to use these examples
These are real source and may include demo scaffolding such as content objects, fixture imports, CSS-module class names, repo-relative imports, or Storybook argument spreads. Adapt the copy, assets, and imports while preserving component composition and gridline geometry. Use built-in gridline variants or props when available. When a grouped Card or Pillar example includes companion CSS, carry its page-width frame and cell rules with the JSX.`

    const goal = input.goal?.trim() || 'landing page'
    const genericPageTerms = new Set([
      'feature',
      'features',
      'full',
      'landing',
      'lp',
      'marketing',
      'page',
      'pages',
      'product',
      'site',
      'template',
      'templates',
      'website',
    ])
    const meaningfulGoal = goal
      .toLowerCase()
      .split(/\s+/)
      .map(term => term.replace(/^[^a-z0-9]+|[^a-z0-9-]+$/g, ''))
      .filter(term => term && !genericPageTerms.has(term))
      .join(' ')
    const isPageGoal =
      !input.goal?.trim() ||
      /\b(page|pages|landing|homepage|home|website|site|template|lp|overview|category|details?)\b/i.test(goal)

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

    const matched = (meaningfulGoal ? rank(meaningfulGoal, withExamples, componentSearchFields) : [])
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

    const componentExamples = shown.map(formatComponentExample).join('\n\n')

    // For page-level goals, lead with the closest full-page recipe. It's the real source (single
    // source of truth in @primer/react-brand), so tell the agent to look past its demo scaffolding.
    const recipeSearchFields = (recipe: CatalogRecipe): string[] => [
      recipe.name,
      recipe.title,
      recipe.keywords.join(' '),
    ]
    const specificRecipes =
      isPageGoal && meaningfulGoal
        ? rank(meaningfulGoal, ctx.catalog.recipes, recipeSearchFields).map(entry => entry.item)
        : []
    const defaultRecipe = ctx.catalog.recipes.find(recipe => recipe.name === 'FlexSuiteAIOverview')
    const useDefaultRecipe = isPageGoal && specificRecipes.length === 0 && Boolean(defaultRecipe)
    const matchedRecipes =
      specificRecipes.length > 0 ? specificRecipes : useDefaultRecipe && defaultRecipe ? [defaultRecipe] : []
    const topRecipe = matchedRecipes[0]

    const sections = [`# Examples for "${goal}"`, adaptationGuidance]
    if (topRecipe) {
      const otherRecipes = matchedRecipes.slice(1)
      const also = otherRecipes.length
        ? ` Other full-page templates for this goal: ${otherRecipes.map(recipe => recipe.title).join(', ')}.`
        : ''
      sections.push(
        [
          `## Full-page template — ${
            useDefaultRecipe ? 'default FlexSuite overview recipe source' : 'goal-matched recipe source'
          }: ${topRecipe.title}`,
          `This is the **actual current-brand recipe source** from \`@primer/react-brand\`. Use it for overall page composition, then use the goal-specific component examples below for deeper context.${also}`,
          `\`\`\`tsx\n${topRecipe.source}\n\`\`\``,
        ].join('\n\n'),
      )
    }
    sections.push(note, componentExamples, versionNote(ctx))
    return {text: sections.join('\n\n')}
  },
}
