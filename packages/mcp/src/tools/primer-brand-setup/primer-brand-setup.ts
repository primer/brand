import {z} from 'zod'
import {relative} from 'node:path'

import {detectFramework, type FrameworkId} from '../../brand/detect-framework/detect-framework.js'
import {
  resolveBrandProject,
  type BrandProjectResolution,
} from '../../brand/resolve-brand-project/resolve-brand-project.js'
import {updateAgentsMd, type AgentsMdUpdateResult} from '../../brand/update-agents-md/update-agents-md.js'
import {versionNote} from '../format.js'
import type {ToolContext, ToolModule, ToolResult} from '../types.js'

const fence = '```'

const inputSchema = z.object({
  framework: z
    .enum(['auto', 'next-app', 'next-pages', 'vite', 'astro', 'remix'])
    .optional()
    .default('auto')
    .describe('Target framework. "auto" detects it from the project; override if detection is wrong.'),
  projectDir: z
    .string()
    .min(1)
    .optional()
    .describe(
      'Workspace-relative package folder whose package.json declares @primer/react-brand. Set this when several workspace packages declare it.',
    ),
})

type Input = z.infer<typeof inputSchema>

const description = `Set up Primer Brand in an existing React project.
Call once before building a page; detects or accepts the framework and returns tailored root setup.
Also updates \`AGENTS.md\` in the package that declares \`@primer/react-brand\` so future agents use Primer Brand tools and local docs.`

const STATIC: Record<FrameworkId, {label: string; rsc: boolean}> = {
  'next-app': {label: 'Next.js (App Router)', rsc: true},
  'next-pages': {label: 'Next.js (Pages Router)', rsc: false},
  vite: {label: 'Vite + React', rsc: false},
  astro: {label: 'Astro', rsc: false},
  remix: {label: 'Remix', rsc: false},
  unknown: {label: 'a React project', rsc: false},
}

const ROOT_SNIPPETS: Record<Exclude<FrameworkId, 'unknown'>, string> = {
  'next-app': `// app/providers.tsx
'use client'
import {ThemeProvider} from '@primer/react-brand/esm'

export function Providers({children}: {children: React.ReactNode}) {
  return <ThemeProvider>{children}</ThemeProvider>
}

// app/layout.tsx
import '@primer/react-brand/fonts/fonts.css'
import {Providers} from './providers'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}`,
  'next-pages': `// pages/_app.tsx
import '@primer/react-brand/fonts/fonts.css'
import {ThemeProvider} from '@primer/react-brand/esm'
import type {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}`,
  vite: `// src/main.tsx
import '@primer/react-brand/fonts/fonts.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ThemeProvider} from '@primer/react-brand/esm'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)`,
  remix: `// app/root.tsx
import '@primer/react-brand/fonts/fonts.css'
import {ThemeProvider} from '@primer/react-brand/esm'
import {Outlet} from '@remix-run/react'

export default function App() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  )
}`,
  astro: `// src/components/BrandRoot.tsx — a React island wrapper
import '@primer/react-brand/fonts/fonts.css'
import {ThemeProvider} from '@primer/react-brand/esm'

export default function BrandRoot({children}: {children: React.ReactNode}) {
  return <ThemeProvider>{children}</ThemeProvider>
}

// In an .astro file, hydrate it: <BrandRoot client:load>...</BrandRoot>`,
}

const GENERIC_SNIPPET = `import '@primer/react-brand/fonts/fonts.css'
import {ThemeProvider} from '@primer/react-brand/esm'

// Wrap the very root of your app so theming applies everywhere:
<ThemeProvider>
  <App />
</ThemeProvider>`

type SetupAgentsMdResult = {
  action: AgentsMdUpdateResult['action']
  path: string | null
  reason?: AgentsMdUpdateResult['reason'] | BrandProjectResolution['reason']
  candidates?: string[]
}

function build(id: FrameworkId, ctx: ToolContext, agentsMd: SetupAgentsMdResult): string {
  const {label, rsc} = STATIC[id]
  const snippet = id === 'unknown' ? GENERIC_SNIPPET : ROOT_SNIPPETS[id]

  const rscNote = rsc
    ? `\n\n> **RSC boundary:** \`ThemeProvider\` uses React context, so it must live in a \`'use client'\` component (the \`Providers\` wrapper above). It cannot go directly in the server-rendered \`layout.tsx\`.`
    : ''

  const agentsMdResult = (() => {
    switch (agentsMd.action) {
      case 'created':
        return 'Created `AGENTS.md` beside the selected package.json with local docs routing instructions.'
      case 'updated':
        return 'Updated the managed Primer Brand instructions beside the selected package.json; existing content was preserved.'
      case 'unchanged':
        return 'The selected package already has the current managed Primer Brand instructions in `AGENTS.md`.'
      case 'skipped':
        if (agentsMd.reason === 'ambiguous-brand-project') {
          const candidates = agentsMd.candidates
            ?.map(candidate => {
              const relativeCandidate = ctx.workspaceDir ? relative(ctx.workspaceDir, candidate) : candidate
              return relativeCandidate || '.'
            })
            .join(', ')
          return `Skipped \`AGENTS.md\`: multiple package.json files declare \`@primer/react-brand\`${
            candidates ? ` (${candidates})` : ''
          }. Rerun \`primer_brand_setup\` with \`projectDir\` set to the intended package folder.`
        }
        if (agentsMd.reason === 'invalid-brand-project') {
          return 'Skipped `AGENTS.md`: `projectDir` must identify a folder inside the workspace whose package.json declares `@primer/react-brand`.'
        }
        if (agentsMd.reason === 'brand-package-not-found') {
          return 'Skipped `AGENTS.md`: no package.json declaring `@primer/react-brand` was found in the workspace.'
        }
        if (agentsMd.reason === 'incorrect-filename-case') {
          return 'Skipped `AGENTS.md`: rename the existing case-insensitive match to exactly `AGENTS.md`, then rerun setup.'
        }
        if (agentsMd.reason === 'malformed-managed-block') {
          return 'Skipped `AGENTS.md`: the Primer Brand managed markers are malformed or duplicated; repair or remove that block, then rerun setup.'
        }
        if (agentsMd.reason === 'unsafe-agents-path') {
          return 'Skipped `AGENTS.md`: the existing path is a symbolic link or resolves outside the selected package. Replace it with a regular file inside the package, then rerun setup.'
        }
        return 'Skipped `AGENTS.md`: no project root was detected.'
    }
  })()

  return [
    `# Set up Primer Brand — ${label}`,
    `## 1. Install\n${fence}bash\nnpm install @primer/react-brand\n${fence}`,
    `## 2. Root setup (the step agents usually skip)\n${fence}tsx\n${snippet}\n${fence}${rscNote}\n\n_Optional: set the theme with \`<ThemeProvider colorMode="light">\` — also accepts \`"dark"\` or \`"auto"\`._`,
    `## 3. Fonts\nPrimer Brand uses **Mona Sans / Hubot Sans**. The \`fonts.css\` import above loads them — pages without these fonts read as off-brand.`,
    `## 4. Styles\nImporting components from \`@primer/react-brand/esm\` auto-includes each component's styles. **Do not also import \`@primer/react-brand/lib/css/main.css\`** — that is the non-ESM path, and mixing the two double-loads styles.`,
    `## 5. Build the page\n- \`primer_brand_page_design\` first for page-design patterns and the current-brand reference templates to start from\n- \`primer_brand_examples\` for a correct starting composition, then \`primer_brand_component\` for exact props\n- \`primer_brand_tokens\` / \`primer_brand_asset\` for colors, spacing, and icons\n- \`primer_brand_review\` on your complete output — JSX and CSS together — before you finish`,
    `## 6. Header & footer\nFor a global header use \`SubdomainNavBar\`; for the footer use \`MinimalFooter\`. Don't hand-roll a \`<header>\`, \`<nav>\`, or \`<footer>\` — call \`primer_brand_component\` with "SubdomainNavBar" or "MinimalFooter" for their APIs.`,
    `## 7. Add/update AGENTS.md pointer\n${agentsMdResult}`,
    versionNote(ctx),
  ].join('\n\n')
}

export const primerBrandSetupTool: ToolModule<Input> = {
  name: 'primer_brand_setup',
  title: 'Set up Primer Brand in a project',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false},
  run(input, ctx): ToolResult {
    const brandProject = resolveBrandProject(ctx.workspaceDir, input.projectDir)
    const id: FrameworkId =
      input.framework === 'auto'
        ? brandProject.projectDir
          ? detectFramework(brandProject.projectDir).id
          : ctx.framework.id
        : input.framework
    const agentsMd: SetupAgentsMdResult = brandProject.projectDir
      ? updateAgentsMd(brandProject.projectDir)
      : {
          action: 'skipped',
          path: null,
          reason: brandProject.reason,
          candidates: brandProject.candidates,
        }
    return {text: build(id, ctx, agentsMd)}
  },
}
