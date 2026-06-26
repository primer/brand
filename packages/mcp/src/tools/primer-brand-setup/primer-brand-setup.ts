import {z} from 'zod'

import {detectFramework, type FrameworkId} from '../../brand/detect-framework.js'
import {versionNote} from '../format.js'
import type {ToolContext, ToolModule, ToolResult} from '../types.js'

const fence = '```'

const inputSchema = z.object({
  framework: z
    .enum(['auto', 'next-app', 'next-pages', 'vite', 'astro', 'remix'])
    .optional()
    .default('auto')
    .describe('Target framework. "auto" detects it from the project; override if detection is wrong.'),
})

type Input = z.infer<typeof inputSchema>

const description = `Set up the Primer Brand (@primer/react-brand) foundation that agents routinely forget: the ThemeProvider at the app root, the Mona Sans font import, the correct style import, and the \`'use client'\` boundary for React Server Components. Detects the framework (Next App/Pages, Vite, Astro, Remix) and returns tailored, copy-ready setup. Call this once before building a Primer Brand page.`

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

function build(id: FrameworkId, ctx: ToolContext): string {
  const {label, rsc} = STATIC[id]
  const snippet = id === 'unknown' ? GENERIC_SNIPPET : ROOT_SNIPPETS[id]

  const rscNote = rsc
    ? `\n\n> **RSC boundary:** \`ThemeProvider\` uses React context, so it must live in a \`'use client'\` component (the \`Providers\` wrapper above). It cannot go directly in the server-rendered \`layout.tsx\`.`
    : ''

  return [
    `# Set up Primer Brand — ${label}`,
    `## 1. Install\n${fence}bash\nnpm install @primer/react-brand\n${fence}`,
    `## 2. Root setup (the step agents usually skip)\n${fence}tsx\n${snippet}\n${fence}${rscNote}\n\n_Optional: set the theme with \`<ThemeProvider colorMode="light">\` — also accepts \`"dark"\` or \`"auto"\`._`,
    `## 3. Fonts\nPrimer Brand uses **Mona Sans / Hubot Sans**. The \`fonts.css\` import above loads them — pages without these fonts read as off-brand.`,
    `## 4. Styles\nImporting components from \`@primer/react-brand/esm\` auto-includes each component's styles. **Do not also import \`@primer/react-brand/lib/css/main.css\`** — that is the non-ESM path, and mixing the two double-loads styles.`,
    `## 5. Build the page\n- \`primer_brand_examples\` for a correct starting composition, then \`primer_brand_component\` for exact props\n- \`primer_brand_tokens\` / \`primer_brand_asset\` for colors, spacing, and icons\n- \`primer_brand_review\` on your complete output — JSX and CSS together — before you finish`,
    `## 6. Header & footer\nFor a global header use \`SubdomainNavBar\`; for the footer use \`MinimalFooter\`. Don't hand-roll a \`<header>\`, \`<nav>\`, or \`<footer>\` — call \`primer_brand_component\` with "SubdomainNavBar" or "MinimalFooter" for their APIs.`,
    versionNote(ctx),
  ].join('\n\n')
}

export const primerBrandSetupTool: ToolModule<Input> = {
  name: 'primer_brand_setup',
  title: 'Set up Primer Brand in a project',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(input, ctx): ToolResult {
    const id: FrameworkId = input.framework === 'auto' ? detectFramework().id : input.framework
    return {text: build(id, ctx)}
  },
}
