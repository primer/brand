import {z} from 'zod'

import {allRules, brandComponentsUsed} from '../../review/rules.js'
import type {Finding} from '../../review/types.js'
import {versionNote} from '../format.js'
import type {ToolContext, ToolModule, ToolResult} from '../types.js'

const inputSchema = z.object({
  code: z
    .string()
    .describe(
      'Your COMPLETE output to check: the JSX/TSX AND all CSS/stylesheets together. Include App.css and any *.module.css — hardcoded px/hex usually live there.',
    ),
  filename: z.string().optional().describe('Optional filename, used only to label the report.'),
})

type Input = z.infer<typeof inputSchema>

const description = `The final on-brand gate. Before you finish, paste your COMPLETE output in one call — the JSX/TSX AND every stylesheet (App.css, *.module.css, styled blocks) together — because hardcoded sizes/colors and raw HTML most often hide in CSS. Flags non-compliant components or sub-components, invalid prop values, headings left at their oversized default (a \`Heading\` with no explicit \`size\`), raw HTML where a brand component exists, hardcoded colors/sizes that should be tokens, and off-brand visual tells (purple gradients, pill buttons, glassmorphism, placeholder copy). Run it on everything you wrote and fix what it reports rather than guessing.`

function formatFindings(label: string, findings: Finding[]): string {
  if (findings.length === 0) return ''
  const lines = findings.map(finding => {
    const evidenceLine = finding.evidence ? `\n  > \`${finding.evidence}\`` : ''
    return `- **${finding.rule}**: ${finding.message}${evidenceLine}`
  })
  return `## ${label}\n${lines.join('\n')}`
}

const hasJsx = (code: string): boolean => /<[A-Za-z][A-Za-z0-9.]*[\s/>]/.test(code)
// Clearly a stylesheet: a class/id/at-rule selector carrying CSS declarations (not a TS object/type).
const hasStylesheet = (code: string): boolean =>
  /[.#][\w-]+[^{}]*\{[^{}]*:[^{}]*;/.test(code) || /@(?:media|font-face|keyframes|supports|import)\b/.test(code)

/** Nudge agents to include their CSS — where most hardcoded px/hex and raw elements actually hide. */
function cssGateReminder(code: string): string {
  if (!hasJsx(code) || hasStylesheet(code)) return ''
  return '> **Include your CSS.** This looks like JSX/TSX only. Hardcoded `px`/hex and raw elements most often live in a separate stylesheet — re-run `primer_brand_review` with the JSX **and** every stylesheet (`App.css`, `*.module.css`, styled blocks) together. This is the final gate over your COMPLETE output.'
}

export const primerBrandReviewTool: ToolModule<Input> = {
  name: 'primer_brand_review',
  title: 'Review code against Primer Brand',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(input, ctx: ToolContext): ToolResult {
    const findings = allRules.flatMap(rule => rule.run(input.code, ctx.catalog))
    const errors = findings.filter(finding => finding.severity === 'error')
    const warnings = findings.filter(finding => finding.severity === 'warning')
    const used = brandComponentsUsed(input.code, ctx.catalog)

    const header = input.filename ? `# Brand review — \`${input.filename}\`` : '# Brand review'
    const reminder = cssGateReminder(input.code)
    const usedLine =
      used.length > 0
        ? `Approved Primer Brand components used: ${used.map(component => `\`${component.name}\``).join(', ')}.`
        : 'No `@primer/react-brand` components were imported. Build from Primer Brand components rather than raw HTML.'

    if (findings.length === 0) {
      return {
        text: [header, reminder, `No issues found. ${usedLine}`, versionNote(ctx)].filter(Boolean).join('\n\n'),
      }
    }

    const summary = `${errors.length} error(s), ${warnings.length} warning(s).`
    const blocks = [
      header,
      reminder,
      summary,
      usedLine,
      formatFindings('Errors', errors),
      formatFindings('Warnings', warnings),
      versionNote(ctx),
    ].filter(Boolean)

    return {text: blocks.join('\n\n')}
  },
}
