import {makeContext} from '../../test-utils/catalog.js'
import {primerBrandSetupTool} from './primer-brand-setup.js'

describe('primer_brand_setup', () => {
  it('uses the ESM import path + fonts for Vite, with no use-client boundary or lib css import', async () => {
    const result = await primerBrandSetupTool.run({framework: 'vite'}, makeContext())
    expect(result.text).toContain("from '@primer/react-brand/esm'")
    expect(result.text).toContain('@primer/react-brand/fonts/fonts.css')
    expect(result.text).toContain('main.tsx')
    expect(result.text).not.toContain("'use client'")
    expect(result.text).not.toContain("from '@primer/react-brand/lib")
  })

  it('includes a use-client boundary and RSC note for Next App Router', async () => {
    const result = await primerBrandSetupTool.run({framework: 'next-app'}, makeContext())
    expect(result.text).toContain("'use client'")
    expect(result.text).toContain('app/layout.tsx')
    expect(result.text).toContain('RSC boundary')
  })

  it('returns Pages Router setup without a use-client boundary', async () => {
    const result = await primerBrandSetupTool.run({framework: 'next-pages'}, makeContext())
    expect(result.text).toContain('pages/_app.tsx')
    expect(result.text).not.toContain("'use client'")
  })

  it('returns Remix and Astro setups', async () => {
    expect((await primerBrandSetupTool.run({framework: 'remix'}, makeContext())).text).toContain('app/root.tsx')
    expect((await primerBrandSetupTool.run({framework: 'astro'}, makeContext())).text).toContain('client:load')
  })

  it('warns against double-loading styles and notes the colorMode option', async () => {
    const result = await primerBrandSetupTool.run({framework: 'vite'}, makeContext())
    expect(result.text).toContain('main.css')
    expect(result.text).toContain('colorMode')
  })

  it('falls back to a generic root snippet + tool pointers when the framework is unknown', async () => {
    const result = await primerBrandSetupTool.run({framework: 'auto'}, makeContext())
    expect(result.text).toContain('Wrap the very root')
    expect(result.text).toContain('primer_brand_review')
  })
})
