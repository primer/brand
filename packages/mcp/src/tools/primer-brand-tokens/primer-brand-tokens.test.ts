import {makeCatalog, makeContext} from '../../test-utils/catalog.js'
import {primerBrandTokensTool} from './primer-brand-tokens.js'

describe('primer_brand_tokens', () => {
  it('finds tokens by name', async () => {
    const result = await primerBrandTokensTool.run({query: 'accent', limit: 15}, makeContext())
    expect(result.text).toContain('--brand-color-accent-primary')
  })

  it('maps color intent (blue -> accent)', async () => {
    const result = await primerBrandTokensTool.run({query: 'blue', limit: 15}, makeContext())
    expect(result.text).toContain('--brand-color-accent-primary')
  })

  it('filters by category against token names (group: "color")', async () => {
    const result = await primerBrandTokensTool.run({query: '', group: 'color', limit: 15}, makeContext())
    expect(result.text).toContain('--brand-color-accent-primary')
    expect(result.text).not.toContain('--base-size-32')
  })

  it('maps spacing words to the size scale via the group facet (group: "space")', async () => {
    const result = await primerBrandTokensTool.run({query: '', group: 'space', limit: 15}, makeContext())
    expect(result.text).toContain('--base-size-32')
  })

  it('finds size tokens when querying for spacing', async () => {
    const result = await primerBrandTokensTool.run({query: 'spacing', limit: 15}, makeContext())
    expect(result.text).toContain('--base-size-32')
  })

  it('surfaces the border-width family above border colors for a "border" query', async () => {
    const result = await primerBrandTokensTool.run({query: 'border', limit: 15}, makeContext())
    const widthIndex = result.text.indexOf('--brand-borderWidth-thin')
    const colorIndex = result.text.indexOf('--brand-color-border-default')
    expect(widthIndex).toBeGreaterThanOrEqual(0)
    expect(widthIndex).toBeLessThan(colorIndex)
  })

  it('maps a bare "width" query to the base-size scale as well as border widths', async () => {
    const result = await primerBrandTokensTool.run({query: 'width', limit: 15}, makeContext())
    expect(result.text).toContain('--base-size-32')
    expect(result.text).toContain('--brand-borderWidth-thin')
  })

  it('maps "background" to canvas tokens (Primer calls backgrounds "canvas")', async () => {
    const result = await primerBrandTokensTool.run({query: 'background', limit: 15}, makeContext())
    expect(result.text).toContain('--brand-color-canvas-default')
  })

  it('maps "gray" to the neutral role', async () => {
    const result = await primerBrandTokensTool.run({query: 'gray', limit: 15}, makeContext())
    expect(result.text).toContain('--brand-color-neutral-emphasis')
  })

  it('reports clearly when no token data is available', async () => {
    const ctx = makeContext({catalog: makeCatalog({tokens: []})})
    const result = await primerBrandTokensTool.run({query: 'accent', limit: 15}, ctx)
    expect(result.isError).toBe(true)
  })
})
