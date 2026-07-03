import {makeContext} from '../../test-utils/catalog.js'
import {primerBrandComponentTool} from './primer-brand-component.js'

describe('primer_brand_component', () => {
  it('lists components when no name is given', async () => {
    const result = await primerBrandComponentTool.run({}, makeContext())
    expect(result.isError).toBeFalsy()
    expect(result.text).toContain('Hero')
    expect(result.text).toContain('PricingOptions')
  })

  it('shows component descriptions in the listing', async () => {
    const result = await primerBrandComponentTool.run({}, makeContext())
    expect(result.text).toContain('Pricing tiers and plan comparison')
  })

  it('returns props, enums, sub-components and an example for a known component', async () => {
    const result = await primerBrandComponentTool.run({name: 'Hero'}, makeContext())
    expect(result.text).toContain('Hero.Heading')
    expect(result.text).toContain("'start' | 'center'")
    expect(result.text).toContain('import {Hero}')
  })

  it('is case-insensitive', async () => {
    const result = await primerBrandComponentTool.run({name: 'hero'}, makeContext())
    expect(result.text).toContain('# Hero')
  })

  it('renders a component note when present', async () => {
    const result = await primerBrandComponentTool.run({name: 'Hero'}, makeContext())
    expect(result.text).toContain('**Note:**')
    expect(result.text).toContain('Use one Hero per page')
  })

  it('renders prop descriptions', async () => {
    const result = await primerBrandComponentTool.run({name: 'Hero'}, makeContext())
    expect(result.text).toContain('Horizontal alignment of the hero content.')
  })

  it('suggests alternatives for an unknown component', async () => {
    const result = await primerBrandComponentTool.run({name: 'HeroBanner'}, makeContext())
    expect(result.isError).toBe(true)
    expect(result.text).toContain('Hero')
  })

  it('suggests via docs keywords for an unknown component', async () => {
    // "billing" is only a PricingOptions keyword, not a component name.
    const result = await primerBrandComponentTool.run({name: 'billing'}, makeContext())
    expect(result.isError).toBe(true)
    expect(result.text).toContain('PricingOptions')
  })
})
